import Url from 'url';
import express from 'express';
import cors from 'cors';

import {
  getCurrentPageType, mapPageTypeToBundleName,
} from 'app/utils/factories/pageFactory';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import StoreManager from '@univision/fe-commons/dist/store/StoreManager';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';

import { shouldSkipSpa } from '@univision/fe-commons/dist/utils/helpers/spa';
import { FROM, NEXTJS } from '@univision/fe-commons/dist/constants/nextjs';

import {
  corsOptions,
  setHeaders,
  handleError,
  isCmsValidDomain,
} from 'server/utils/serverUtils';

import { initialStoreData, assemblePageData, setVerticalNavigation } from '../page/page';
import WebApiRequest from '../../webapi/WebApiRequest';
import { getApiContent } from '../../actionsDefinition/server-page-actions';

const router = express.Router();

/**
 * Dispatch the GET_API_CONTENT action based on the requested url. It will follow syndicator
 * redirects up to 3 times.
 * @param {Object} requestStore Store for the request
 * @param {string} pageUrl Syndicator URL
 * @param {string} requestFrom Request identifier
 * @param {number} tries Attempted tries, it will follow up to 3 redirects.
 * @returns {Promise<void>}
 */
export async function dispatchGetApiContent(requestStore, pageUrl, requestFrom, tries = 1) {
  await requestStore.dispatch(getApiContent(pageUrl));
  const state = requestStore.getState();
  // Avoid extra call on nextjs requests since nextjs will handle redirect on its end
  // TODO: Remove the entire method after nextjs migration
  if (requestFrom !== NEXTJS
    && tries <= 2
    && state.page.data.type === 'redirectdata'
    // only request cms with valid domain to avoid extra call after redirect resolved
    && isCmsValidDomain(state.page.data.url)
  ) {
    await dispatchGetApiContent(requestStore, pageUrl.replace(/url=.*/, `url=${state.page.data.url}`), null, tries + 1);
  }
}

/**
 * Build the initial SSR state and send it over the Express response.
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {Object} initial state
 */
export async function sendInitialState(req, res) {
  let initialState = {};
  try {
    if (!req.query?.url) {
      throw new Error('The url argument must be of type string. Received undefined');
    }
    const StoreState = StoreManager.init();
    const requestStore = StoreState.getStore();
    // Keep a Store reference on the request
    req.store = requestStore;
    const url = Url.parse(req.query.url, true);
    // Using identifier for nextjs to avoid redirect multicall
    // TODO: Remove after migrating all sites
    const requestFrom = req.query[FROM];

    // Remove userLocation from req.query and send it as part of the webapp request
    const { userLocation } = req.query;

    if (userLocation) {
      delete req.query.userLocation;
    }

    const webappRequest = {
      ...req,
      device: req.query.device,
      originalUrl: req.query.url,
      userLocation,
      path: url.pathname,
      headers: {
        ...req.headers,
        host: url.host,
      },
    };
    const pageUrl = WebApiRequest.getWebApiUrl(webappRequest);
    await dispatchGetApiContent(requestStore, pageUrl, requestFrom);
    // set request data are available before anything
    initialStoreData(webappRequest, res);
    const isSpa = !shouldSkipSpa({ url: webappRequest.originalUrl });
    // gets bex api data
    const data = getKey(getPageData(requestStore), 'data', {});
    // Send response in case of cms redirect
    if (data?.type === 'redirectdata') {
      res.send(data);
      return data;
    }
    const { path: reqPath } = webappRequest;
    const currentPageType = getCurrentPageType(data, reqPath, { isSpa });
    const actualPageType = mapPageTypeToBundleName(data, reqPath);
    res.setHeader('X-Content-Type', `SPA${actualPageType}`);

    // Collect page data
    assemblePageData({
      req: webappRequest,
      reqPath,
      type: currentPageType,
      isSpa,
    });
    await setVerticalNavigation(requestStore);
    initialState = {
      page: requestStore.getState().page,
      headerConf: requestStore.getState().headerConf,
      local: requestStore.getState().local,
      search: requestStore.getState().search,
      sports: requestStore.getState().sports,
    };

    if (data?.error) {
      const errorState = { data: { ...initialState, ...data } };
      res.errorMessage = '[WEBAPP-STATE] error on page data';
      res.status(data.status).send(errorState);
      return errorState;
    }
    setHeaders(res, data.ttl);
  } catch (err) {
    initialState.error = `Error building initial state: ${err}`;
    handleError(req, res, `[WEBAPP-STATE] Error building initial state for url: ${req.query?.url}`, err);
  }
  // Avoid sending client nav count to user
  if (getKey(initialState, 'page.navigationCount') === 0) {
    delete initialState.page.navigationCount;
  }
  res.send({
    data: initialState,
  });
  return initialState;
}

router.get('/web-app-state', cors(corsOptions), sendInitialState);
export default router;
