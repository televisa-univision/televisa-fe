import React from 'react';
import express from 'express';
import Loadable from 'react-loadable';

import ComponentWrapper from 'app/components/pages/Component/ComponentWrapper';
import logger from 'app/utils/logging/serverLogger';
import PageApi from 'server/proxy/api/page/PageApi';
import { handleError as logError, setTransactionName } from 'server/utils/serverUtils';

import { renderToString } from 'react-dom/server';
import { exists, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import BasicShell from 'components/shell/BasicShell';
import renderUtils from 'server/utils/renderUtils';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import categoryTheme from '@univision/fe-commons/dist/utils/helpers/categoryTheme';
import getDeviceForRequest from '@univision/fe-commons/dist/utils/server/deviceDetector';

import WebApiRequest from '../../webapi/WebApiRequest';

const router = express.Router();
/**
 * Time to live for the cache
 * @type {number}
 */
const ttl = 3600;

/**
 * Handles errors raised while rendering a page.
 * @param {Object} res Response object
 * @param {string} component to be render
 * @param {Object} context Context to use to log the message
 */
function handleError(res, component, context) {
  const message = `Error rendering the component ${component}`;
  logger.error(message, context);
  res.status(500).send(`<!doctype html>\n ${message}`);
}

/**
 * Parse url path to colect props
 * @param {string} path from url
 * @returns{Object} component props
 */
function getComponentProps(path) {
  const props = {};
  // path like: /component/Button/color/blue
  const subPath = path.substr(1);
  if (subPath !== '') {
    const pathArray = subPath.split('/');
    if (pathArray.length && exists(pathArray[2])) {
      const propArray = pathArray.slice(2);
      propArray.forEach((value, index) => {
        if (index === 0 || ((index % 2) === 0 && exists(propArray[index + 1]))) {
          props[value] = propArray[index + 1];
        }
      });
    }
  }
  return props;
}

/**
 * Render the response
 * @param {Object} currentAssets Assets for the request
 * @param {Object} initialState Data for the initial state
 * @param {Object} res Response object
 * @param {Object} req Request object
 */
function renderResponse(currentAssets, initialState, res, req) {
  const componentWrapper = <ComponentWrapper initialState={initialState} />;
  const page = (
    <BasicShell
      assets={currentAssets}
      page={componentWrapper}
      initialState={initialState}
    />
  );
  res.setHeader('Edge-Control', `!no-store, cache-maxage=${ttl}s`);
  res.setHeader('Cache-Control', `max-age=${ttl}`);
  Loadable.preloadAll().then(() => {
    renderUtils.newHtmlPage(page, currentAssets, req)
      .then((html) => {
        res.status(200).send(html);
      }).catch((e) => {
        logger.error(`Error preloading components. ${e}`);
        res.status(200).send(`<!doctype html>\n${renderToString(page)}`);
      });
  }).catch((e) => {
    logger.error(`Error preloading components. ${e}`);
    res.status(200).send(`<!doctype html>\n${renderToString(page)}`);
  });
}

/**
 * Route where the rendering of the React components will happen
 */
router.get('/component/:componentName/*', (req, res) => {
  const componentName = req.params.componentName || null;
  logger.info(`Requested component: ${componentName}`);

  let env = process.env.DEPLOY_ENV;
  let currentAssets = {};
  const deviceDetected = getDeviceForRequest(req) || 'mobile';
  currentAssets = renderUtils.getCurrentAssets('component', req.assets, req.path);
  logger.info(`Component name: ${componentName}`);
  if (componentName) {
    setTransactionName('component', componentName);
  }
  try {
    if (!exists(env)) {
      env = 'production';
    }
    const props = getComponentProps(req.path);
    const initialState = {
      env,
      device: deviceDetected,
      component: componentName,
      props,
    };
    if (hasKey(props, 'pageUri')) {
      const requestedUrl = props.pageUri.replace(/\./g, '/');
      req.originalUrl = requestedUrl;
      PageApi.getPage(WebApiRequest.getWebApiUrl(req), (err) => {
        logError(req, res, `[COMPONENT] error on ${componentName} data`, err);
      }).then((response) => {
        if (hasKey(response, 'data')) {
          initialState.data = response.data;
          const catTheme = categoryTheme(response.data, { requestedUrl });
          initialState.pageCategory = catTheme;
          initialState.theme = catTheme;
        }

        Store.dispatch(setPageData(initialState));
        renderResponse(currentAssets, initialState, res, req);
      });
    } else {
      renderResponse(currentAssets, initialState, res, req);
    }
  } catch (err) {
    handleError(req, componentName, { ...req.headers });
  }
});

export default router;
