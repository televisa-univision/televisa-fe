import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import HttpError from './HttpError';
import { getClientConfig } from '../../config';
import { getPage } from '../../services/webapi';
import { shouldIgnoreRequest, isOpenGraphImageValid } from '../server/setupUtils';

const NO_LAZY_PARAM = '&lazyload=false';

/**
 * Get AMP path based on nextjs context
 * Will try to capture the slug parameter, if not then it will fallback with the paths
 * sent by nextjs
 *
 * @param {Object} ctx - nextjs context
 * @returns {string}
 */
function getPathFromContext({ query }) {
  const { paths = [], ...requestParams } = query;
  const pathFromContext = query?.slug || paths.join('/');
  const path = pathFromContext.includes('amp/') ? pathFromContext : `/amp/${pathFromContext}`;

  return { path, requestParams };
}

/**
 * Checks if current content type if valid for amp page
 * @param {Object} pageData from api response
 * @returns {bool}
 */
function isValidAmpPage(pageData) {
  const dataType = pageData?.data?.type;
  let isValidPage = false;

  // used a switch for future support on other content types
  switch (dataType) {
    case contentTypes.ARTICLE:
      isValidPage = true;
      break;
    default:
      isValidPage = false;
  }

  return isValidPage;
}

/**
 * Redirect on ssr if not valid page
 * @param {Object} response from api
 * @param {Object} options page options
 * @param {Object} options.ctx page context
 * @param {string} options.siteName current site
 * @returns {void}
 */
function checkForRedirect(response, { ctx, siteName }) {
  let location;
  const site = `www.${siteName}.com`;
  const pageData = response?.data?.page;

  if (response?.type === 'redirectdata') {
    location = response?.url.replace(site, `${site}/amp`);
  } else if (!pageData || !isValidAmpPage(pageData)) {
    location = pageData?.data?.uri ?? `https://${site}`;
  }

  if (location) {
    ctx.res.writeHead(301, { Location: location });
    ctx.res.end();

    return true;
  }

  return false;
}

/**
 * Sets up initial data for the amp page
 *
 * @param {Object} ctx - nextjs context
 * @param {string} siteName - site name
 * @param {string} hostName - hostname of the site
 * @returns {Object}
 */
async function setupAmpPage(ctx, siteName) {
  if (!ctx) {
    throw HttpError.internal('Missing page context');
  }

  const { res } = ctx;
  const config = getClientConfig();
  const pageState = {};

  const { path, requestParams } = getPathFromContext(ctx);
  // if path includes invalid patterns we don't send a request to syndicator
  // instead a 404 is returned directly
  if (res && shouldIgnoreRequest(path) && checkForRedirect({}, { ctx, siteName })) {
    return {};
  }

  const response = await getPage(`${path}${NO_LAZY_PARAM}`, {
    config,
    params: requestParams,
    siteName,
  });

  const pageData = response?.data?.page;

  // check if redirect is needed for redirectdata, non valid amp pages
  // and invalid responses
  if (checkForRedirect(response, { ctx, siteName, path })) {
    return {};
  }

  const hasValidOgImage = await isOpenGraphImageValid(pageData, true);

  pageData.config = config;
  pageData.hasValidOgImage = hasValidOgImage;
  pageState.page = pageData;

  return pageState;
}

export default setupAmpPage;
