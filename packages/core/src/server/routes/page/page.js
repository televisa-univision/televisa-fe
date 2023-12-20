import Datadog from 'app/utils/datadog';
import express from 'express';
import fs from 'fs';
import Promise from 'bluebird';
import Loadable from 'react-loadable';

import logger from 'app/utils/logging/serverLogger';
import {
  handleError, setHeaders, isDomainAllowed, setTransactionName,
} from 'server/utils/serverUtils';

import {
  getAssets, getInlineCssPath,
} from 'app/utils/factories/pageFactory';
import {
  exists,
  getKey,
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import getStyledTheming from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import { getVerticalNav } from '@univision/fe-components-base/dist/components/Header/data/helpers';
import StoreManager from '@univision/fe-commons/dist/store/StoreManager';
import Store from '@univision/fe-commons/dist/store/store';
import categoryTheme from '@univision/fe-commons/dist/utils/helpers/categoryTheme';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import setPageData, {
  setHeaderData,
} from '@univision/fe-commons/dist/store/actions/page-actions';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';

import {
  getSiteLanguage,
  getSiteNameFromDomain,
  getSites,
  isTudnSite,
} from 'server/utils/sites';
import renderUtils from 'server/utils/renderUtils';
import ampPageFactory from 'app/AMP/utils/factories/ampPageFactory';

import getDeviceForRequest from '@univision/fe-commons/dist/utils/server/deviceDetector';
import * as messages from '@univision/fe-commons/dist/constants/messages';
import getHeaderConf from '@univision/fe-commons/dist/utils/header/headerConf';

// Real proxy API
import PageApi from 'server/proxy/api/page/PageApi';

import staticErrorPage from 'server/routes/page/error';

import WebApiRequest from '../../webapi/WebApiRequest';
import dataCollector from '../../utils/api/dataCollector';

import { getApiContent, syncStore } from '../../actionsDefinition/server-page-actions';
import {
  USER_AGENT,
  X_REQUEST_ID,
  X_UA_DEVICE,
} from '../../constants/headers';

const router = express.Router();

/**
 * Define/set the initial data for the store from the req/res
 * so that it is available in the different methods
 * that collect the data for the page.
 * NOTICE: Be aware that we are exporting this function, if you modify it please make sure to update
 * every reference to this function.
 * @param {Object} req HTTP request from express server
 * @param {Object} res HTTP response from express server
*/
export function initialStoreData(req, res) {
  const { store: requestStore, clientConfig, device } = req;
  const env = getKey(process, 'env.DEPLOY_ENV', 'production');
  const pageData = {
    env,
    // check for device in query params if not check on actual request object
    device: device || getDeviceForRequest(req) || 'mobile',
    config: clientConfig,
    uaDevice: req.headers[X_UA_DEVICE],
    userAgent: req.headers[USER_AGENT],
    requestParams: req.query,
    sites: getSites(req),
    domain: WebApiRequest.getContentDomain(req),
    headers: WebApiRequest.getHttpHeaders(req),
    originalUrl: req.originalUrl,
    requestId: res.get(X_REQUEST_ID),
  };
  requestStore.dispatch(setPageData(pageData));
  // necessary to sync the request store instance with the global Store
  Store.dispatch(syncStore(requestStore.getState()));
}

/**
 * Defines Schema from Page Data.
 * NOTICE: Be aware that we are exporting this function, if you modify it please make sure to update
 * every reference to this function.
 * @param {Object} context WebApp context
 * @param {Object} context.req httpRequest object
 * @param {string} context.type page type
 * @param {string} context.reqPath httpRequest path
 * @param {number} context.statusCode res status code
 * @param {boolean} context.isSpa True if the request is for SPA.
 * @returns {Object}
 */
export function assemblePageData({
  req,
  type,
  reqPath,
  statusCode,
  isSpa = false,
}) {
  const { store: requestStore } = req;
  const { data, domain } = getPageData(requestStore);
  const env = getKey(process, 'env.DEPLOY_ENV', 'production');
  const isTudn = isTudnSite(domain, data.uri);
  const site = getSiteNameFromDomain(domain, data.uri);
  const pageCategory = categoryTheme(data, { reqPath, site });
  const pageData = {
    data,
    env,
    language: getSiteLanguage(site, data),
    theme: getStyledTheming(pageCategory, data),
    pageCategory,
    isAmp: ampPageFactory.isAmpPage(reqPath, type),
    isSpa,
    isTudn, // legacy value, don't use it
    site,
    statusCode,
  };
  requestStore.dispatch(setPageData(pageData));
  return pageData;
}

/**
 * Update requestStore with extra data
 * @param {Object} requestStore thread safe injection
 */
export async function updateStore(requestStore) {
  const ddSpan = Datadog.addSpan('updateStore');
  const pageData = getPageData(requestStore);
  const { pageCategory } = pageData;
  setTransactionName('page-category', pageCategory);
  // Some page categories requires extra data in the Store
  const pageCategoryPromise = dataCollector.extendData(requestStore, pageCategory);
  // Some widgets requires extra data in the Store
  const PromisesCollection = dataCollector.getWidgetsActions(requestStore);

  try {
    await Promise.all([...PromisesCollection, pageCategoryPromise]);
  } catch (e) {
    const { message, stack } = e;
    pageData.data.error = { message, stack };
    requestStore.dispatch(setPageData(pageData));
  } finally {
    Datadog.closeSpan(ddSpan);
  }
}

/**
 * Set the navigation vertical object to the page
 * @param {Object} requestStore thread safe injection
 */
export async function setVerticalNavigation(requestStore) {
  const ddSpan = Datadog.addSpan('setVerticalNavigation');
  // TODO: We need to remove this once we solve the concurrency problem
  Store.dispatch(syncStore(requestStore.getState()));
  // Dispatch the initial state to the Store
  await updateStore(requestStore);
  const { pageCategory, data } = getPageData(requestStore);

  // TODO: We need to remove this once we solve the concurrency problem
  Store.dispatch(syncStore(requestStore.getState()));
  // Update the state with the header data using dynamic imports
  // TODO: remove referencee to global Store
  const navData = await getVerticalNav(
    data,
    pageCategory,
    () => Store.dispatch(syncStore(requestStore.getState())),
  );
  const headerConf = getHeaderConf(data, pageCategory);

  if (isValidObject(navData)) {
    // Set header data to requestStore to prevent tag duplication on page
    // Also added to have dynamic import on the conf files
    // see: https://github.com/televisa-univision/univision-fe/pull/1695/
    requestStore.dispatch(setHeaderData(navData));
  }

  if (isValidObject(headerConf)) {
    requestStore.dispatch(setHeaderConf(headerConf));
    Store.dispatch(syncStore(requestStore.getState()));
  }

  Datadog.closeSpan(ddSpan);
}

/**
 * Check redirect type
 * @param {Object} requestStore thread safe injection
 * @param {Object} req httpRequest object
 * @param {string} pageUrl httpRequest url
 * @returns {function}
 */
export function getRedirect(requestStore, req, pageUrl) {
  const data = getKey(getPageData(requestStore), 'data', {});
  const customRedirect = WebApiRequest.getCustomRedirect(req);
  // Redirect
  if (data.type === 'redirectdata' || customRedirect !== null) {
    const redirectData = customRedirect || data;
    if (exists(redirectData.url)) {
      const code = getKey(redirectData, 'code', 302);
      const url = getKey(redirectData, 'url');
      const triggeredBy = getKey(redirectData, 'triggeredBy');
      logger.info(`Redirecting ${pageUrl} to: ${url} with http status code: ${code}. Triggered by ${triggeredBy}.`);
      setTransactionName('get', 'redirect');
      return { code, url };
    }
  }
  return null;
}

/**
 * Async method that returns the react-Loadable assets by page
 * TODO: a lot of input arguments converts in a Object
 * @param {string} currentPage page type
 * @param {Object} assets reactLoadable assets
 * @param {string} reqPath httpRequest path
 * @returns {Array}
 */
export async function getCurrentAssets(currentPage, assets, reqPath) {
  if (ampPageFactory.isAmpPage(reqPath, currentPage)) {
    return null;
  }
  const currentAssets = renderUtils.getCurrentAssets(currentPage, assets, reqPath);
  if (currentPage) {
    setTransactionName('content-type', currentPage);
  }
  currentAssets.inlineCss = null;
  if (exists(currentAssets.styles) && process.env.NODE_ENV === 'production') {
    const ssrInlineCss = getKey(assets, `ssrInlineCss.${currentPage}_inlineCss`);
    if (ssrInlineCss) {
      currentAssets.inlineCss = ssrInlineCss;
    } else {
      const inlineCssPath = getInlineCssPath(currentAssets.styles);
      if (inlineCssPath) {
        const readFile = Promise.promisify(fs.readFile);
        currentAssets.inlineCss = await readFile(inlineCssPath, 'utf8');
      }
    }
  }
  return currentAssets;
}

/**
 * Returns SSR HTML
 * @param {Object} requestStore thread safe injection
 * @param {Object} req httpRequest object
 * @param {string} currentPage page type
 * @param {Array} currentAssets page assets
 * @returns {string}
 */
export async function getHtmlPage(requestStore, req, currentPage, currentAssets) {
  const ddSpan = Datadog.addSpan('getHtmlPage');
  Store.dispatch(syncStore(requestStore.getState()));
  const page = renderUtils.getMainShell(currentAssets, currentPage, req);
  const ddSpanPreload = Datadog.addSpan('preloadAll');
  await Loadable.preloadAll();
  Datadog.closeSpan(ddSpanPreload);
  Store.dispatch(syncStore(requestStore.getState()));
  const html = renderUtils.newHtmlPage(page, currentAssets, req);
  Datadog.closeSpan(ddSpan);
  return html;
}

/**
 * Returns SSR HTML for Error Page
 * @param {Object} req httpRequest object
 * @param {Array} currentAssets page assets
 * @returns {string}
 */
export async function getErrorPage(req, currentAssets) {
  const ddSpan = Datadog.addSpan('getErrorPage');
  try {
    // Build the Server Error Page
    Store.dispatch(syncStore(req.store.getState()));
    const assets = getAssets('errorPage', currentAssets);
    const page = renderUtils.getMainShell(assets, 'errorPage', req);
    const html = await renderUtils.newHtmlPage(page, assets, req);
    return html;
  } catch (e) {
    return staticErrorPage;
  } finally {
    Datadog.closeSpan(ddSpan);
  }
}

/**
 * Middleware to handle HEAD requests
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next express middleware callback
 * @returns {Object}
 */
export async function header(req, res, next) {
  if (isDomainAllowed(req.get('host'))) {
    const pageUrl = WebApiRequest.getWebApiUrl(req);
    let response = {};
    try {
      try {
        response = await PageApi.getHeaders(pageUrl);
      } catch (err) {
        response = {
          status: err.status || 500,
          headers: err.headers,
        };
      }
      const ttl = getKey(response.headers, 'x-cache-ttl');
      setHeaders(res, ttl);
      res.status(response.status).end();
    } catch (e) {
      next(e);
    }
  } else {
    res.status(400).send(messages.STATUS_400).end();
  }
}

/**
 * Default route where we use to the rendering the React components but
 * now we are just using this to redirect URLs according to BEX response
 * otherwise we redirect to the default sites URLs or for testing the
 * page data.
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next express middleware callback
 * @returns {Object}
 */
export async function defaultRoute(req, res, next) {
  if (res && res.headersSent) {
    logger.warn('Headers have already been sent for this request. Ignoring default page route.');
    return;
  }
  const host = req.get('host');
  if (isDomainAllowed(host)) {
    const pageUrl = WebApiRequest.getWebApiUrl(req);
    const { path: reqPath } = req;
    try {
      const StoreState = StoreManager.init();
      const requestStore = StoreState.getStore();
      // Keep a Store reference on the request
      req.store = requestStore;
      // set request data are available before anything
      initialStoreData(req, res);
      // gets bex api data
      await requestStore.dispatch(getApiContent(pageUrl, (err) => {
        handleError(req, res, `[PAGE-LEGACY] error on ${pageUrl}`, err);
      }));
      const { data, sites } = getPageData(requestStore);
      const redirect = getRedirect(requestStore, req, pageUrl);
      if (redirect) {
        const { code, url } = redirect;
        res.redirect(Number(code), url);
        return;
      }

      // render page data for testing otherwise redirect to data or site URL
      const statusCode = 301;
      const { site, env } = assemblePageData({
        req,
        reqPath,
        statusCode,
      });
      res.setHeader('X-Content-Type', `Legacy${data?.type}`);
      setHeaders(res, data?.ttl);

      if (env !== 'production' && (/^localhost/.test(host) || req.query?.showData)) {
        res.status(200).json(getPageData(requestStore));
        return;
      }
      res.redirect(statusCode, data?.uri || sites[site]);
      return;
    } catch (e) {
      next(e);
      return;
    }
  }
  res.status(400).send(messages.STATUS_400).end();
}

/**
 * Route to handle HEAD requests
 */
router.head('/*', header);

/**
 * Default route where the rendering of the React components will happen
 */
router.get('/*', defaultRoute);

export default router;
