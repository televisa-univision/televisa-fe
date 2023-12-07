import * as types from '@univision/fe-commons/dist/store/actions/action-types';
import {
  breakpointSelector,
  configSelector,
  deviceSelector,
  isWebPSupportedSelector,
  uaDeviceSelector,
  navigationCountSelector,
  requestParamsSelector,
  requestHeadersSelector,
  userAgentSelector,
  userLocationSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import getHeaderConf from '@univision/fe-commons/dist/utils/header/headerConf';
import getStyledTheming from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import { SERVER_REQUEST_ERROR } from '@univision/fe-commons/dist/constants/messages';
import pickObject from '@univision/fe-utilities/helpers/object/pickObject';
import consoleLogger from '@univision/fe-utilities/utils/consola';
import isValidNumber from '@univision/fe-utilities/helpers/common/isValidNumber';
import isValidString from '@univision/fe-utilities/helpers/common/isValidString';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import { EMBED_PATH } from '@univision/fe-commons/dist/constants/video';
import {
  USER_AGENT,
  X_IS_USER_LOC_EU,
  X_UA_DEVICE,
  X_USER_LOCATION,
} from '@univision/fe-commons/dist/constants/requestHeaders';
import { VIX_SITES, VIX_HOSTS } from '@univision/fe-commons/dist/constants/vixSitesData';
import { TELEVISA_HOSTS } from '@univision/fe-commons/dist/constants/televisaSitesData';
import getUserLocationValue from '@univision/fe-commons/dist/utils/helpers/getUserLocationValue';
import {
  TELEVISA_SITE,
  TUDN_SITE,
  TELEVISA_SITES,
} from '@univision/fe-commons/dist/constants/sites';
import { MX, US } from '@univision/fe-commons/dist/constants/userLocation';

import { UNIVISION } from '@univision/fe-commons/dist/constants/pageCategories';
import { getClientConfig, appConfig } from '../../config';
import { getPage } from '../../services/webapi';
import setHeaders from '../server/setHeader';
import HttpError from './HttpError';
import { shouldIgnoreRequest, setNotFoundProps, isOpenGraphImageValid } from '../server/setupUtils';
import { contentDomains } from '../../config/contentApiUrls';

// /mx/ path regex to match mx sections
const MX_PATH_REGEX = /\/mx/;
const TUDN_PATH_REGEX = /\/tudn/;

/**
 * Get api path based on the nextjs context
 * @private
 * @param {Object} ctx - page context from Next
 * @param {Object} ctx.query - query path from context
 * @param {Object} ctx.asPath - path generated by api
 * @returns {Object}
 */
function getPathFromContext({ query, asPath }) {
  // proxy comes by default from the lambda and we don't use it
  // so we just exclude it
  const { paths, proxy, ...requestParams } = query || {};
  const path = paths ? `/${paths.join('/')}` : asPath;

  return { path, requestParams };
}

/**
 * Helper to collect device on server or from store on client
 * @private
 * @param {Object} req - next.js request if is server side
 * @param {Object} state - redux state from previous pages
 * @returns {string}
 */
async function getDevice(req, state) {
  if (req) {
    const getDeviceFromRequestModule = await import(/* webpackChunkName: "nodeDeviceDetector" */ '@univision/fe-commons/dist/utils/server/deviceDetector');
    // on server only first call
    const getDeviceFromRequest = getDeviceFromRequestModule.default;
    return getDeviceFromRequest(req);
  }
  // for subsequent pages on client
  return deviceSelector(state);
}

/**
 * Helper to collect user-agent platform/browser with device on server or from store on client
 * @private
 * @param {Object} req - next.js request if is server side
 * @param {Object} state - redux state from previous pages
 * @returns {string}
 */
function getUaDevice(req, state) {
  if (req) {
    return req.headers?.[X_UA_DEVICE];
  }
  // for subsequent pages on client
  return uaDeviceSelector(state);
}

/**
 * Helper to collect user agent on server or from store on client
 * @private
 * @param {Object} req - next.js request if is server side
 * @param {Object} state - redux state from previous pages
 * @returns {string}
 */
function getUserAgent(req, state) {
  if (req) {
    return req.headers?.[USER_AGENT];
  }
  // for subsequent pages on client
  return userAgentSelector(state);
}

/**
 * Helper to get custom headers like x-is-user-loc-eu from request or store
 * @private
 * @param {Object} req - next.js request if is server side
 * @param {Object} state - redux state from previous pages
 * @returns {string}
 */
function getRequestHeaders(req, state) {
  if (req) {
    return { [X_IS_USER_LOC_EU]: getKey(req, ['headers', X_IS_USER_LOC_EU], 'false') };
  }
  // for subsequent pages on client
  return requestHeadersSelector(state);
}

/**
 * Helper to collect breakpoint from store on client
 * @private
 * @param {Object} req - next.js request if is server side
 * @param {Object} state - redux state from previous pages
 * @returns {string}
 */
function getBreakpoint(req, state) {
  if (req) {
    return null;
  }
  // for subsequent pages on client
  return breakpointSelector(state);
}

/**
 * Collect app config on server or from store on client
 * @private
 * @param {Object} req - next.js request if is server side
 * @param {Object} state - redux state from previous pages
 * @returns {string}
 */
function getConfig(req, state) {
  if (req) {
    // We only need collect config on server side
    return getClientConfig();
  }
  return configSelector(state);
}

/**
 * Helper to get request param from store or context on server
 * only request param setup on server will be passed to subsequent pages
 * @private
 * @param {Object} req - next.js request if is server side
 * @param {Object} state - redux state from previous pages
 * @param {Object} requestParams - request params from server
 * @returns {Object}
 */
function getRequestParams(req, state, requestParams) {
  if (req && requestParams) {
    // req is only valid on server
    return requestParams;
  }
  return requestParamsSelector(state);
}

/**
 * Helper to increment SPA page count
 * @param {Object} req - next.js request if is server side
 * @param {Object} state - redux state from previous pages
 * @returns {number|*}
 */
function getNavigationCount(req, state) {
  if (req) {
    return 0;
  }
  const stateNavigationCount = navigationCountSelector(state);
  if (isValidNumber(stateNavigationCount)) {
    return stateNavigationCount + 1;
  }
  return 0;
}

/**
 * Helper to clean path
 * @param {string} path - Url path
 * @returns {string}
 */
function cleanPath(path) {
  if (isValidString(path)) {
    // Removing embed from path in case of video embeds
    return path.replace(/embed$/, '');
  }
  return '/';
}

/**
 * Returns true if the requested path is for an embedded content
 * @param {string} path the requested path
 * @returns {boolean}
 */
function isEmbeddedContent(path) {
  return isValidString(path) && path.includes(`/${EMBED_PATH}`);
}

/**
 * Redirect on client
 * @param {Object} req request object
 * @param {string} url response url
 * @returns {boolean}
 */
function checkClientRedirect(req, url) {
  if (!req && url) {
    window.location.href = url;
    return true;
  }
  return false;
}

/**
 * Checks if current client browser supports webp
 *
 * @param {Object} req request object
 * @param {Object} state redux state
 * @returns {boolean}
 */
function checkForWebPSupport(req, state) {
  if (req) {
    return !!req.headers.accept?.includes('webp');
  }

  return isWebPSupportedSelector(state);
}

/**
 * Redirect routes from origin to Akamai (www)
 * @param {Object} req request from server
 * @param {Object} res response from server
 * @returns {boolean}
 */
function redirectPage(req, res) {
  const wwwRegExp = /^www\..+/i;
  const { host } = req.headers;

  if ((VIX_HOSTS.includes(host) && !wwwRegExp.test(host))
    || (TELEVISA_HOSTS.includes(host) && !wwwRegExp.test(host))) {
    res.writeHead(301, {
      location: `https://www.${host}${req.url || ''}`,
    });

    res.end();
    return true;
  }

  return false;
}

/**
 * Returns the user location
 * @param {Object} req request from server
 * @param {Object} requestParams request params
 * @param {Object} state redux state
 * @returns {string}
 */
function getUserLocation(req, requestParams, state) {
  // we check first if the query param is set to override user location
  if (req && requestParams?.userLocation) {
    return getUserLocationValue(requestParams.userLocation);
  }

  // then we check if cloudfront header is available
  if (req && req?.headers?.[X_USER_LOCATION]) {
    return getUserLocationValue(req.headers[X_USER_LOCATION]);
  }

  // client side request, user location already set in server side
  return userLocationSelector(state);
}

/**
 * Redirects a user to the proper location based section
 * @param {Object} options - method options
 * @returns {boolean}
 */
function redirectToSection({
  config,
  country,
  path,
  res,
  siteName,
}) {
  const { apiEnv = 'prod' } = config;
  const contentDomain = contentDomains[siteName][apiEnv];
  const cleanTudnPath = path.replace(TUDN_PATH_REGEX, '');
  const redirectPath = country === MX
    ? `/mx${cleanTudnPath}`
    : cleanTudnPath.replace(MX_PATH_REGEX, '');

  const pathURL = new URL(redirectPath, contentDomain);
  // Removes the userLocation param from the redirect
  pathURL.searchParams.delete('userLocation');
  pathURL.searchParams.delete('proxy');

  res.writeHead(302, {
    Location: pathURL.href,
  });
  res.end();
  return true;
}

/**
 * Get page data, setup headers/redirects
 * and collect initial props
 * @public
 * @param {Object} ctx - page context from Next
 * @param {string} ctx.asPath - request path
 * @param {Object} ctx.store - redux store instance
 * @param {Object} ctx.req - page request just on server side
 * @param {Object} ctx.res - page response just on server side
 * @param {string} siteName - current app site
 * @returns {Object} - initial props
 */
async function setupPage(ctx, siteName) {
  if (!ctx) {
    // All throw's are handler by _error page
    throw HttpError.internal('Missing page context');
  }

  const {
    store,
    res,
    req,
    isServer,
  } = ctx;

  // Checks if page should be redirected from origin to Akamai (www)
  if (isServer && redirectPage(req, res)) {
    return {};
  }

  const { path, requestParams } = getPathFromContext(ctx);
  const state = store.getState();
  const config = getConfig(req, state);
  let pageState = {};

  // if path includes invalid patterns we don't send a request to syndicator
  // instead a 404 is returned directly
  if (res && shouldIgnoreRequest(path)) {
    consoleLogger.log(`[nextjs]: Request path ignored - ${path}`);
    pageState.error = HttpError.notFound('Invalid page');
    const page = setNotFoundProps(pageState, path);
    pageState.page = page;
    return pageState;
  }

  // Filtering to allow only query string on search page and
  // autoplay for embed videos others are not needed
  const fetchParams = pickObject(requestParams, appConfig.allowedRequestParams);
  const collectedRequestParam = getRequestParams(req, state, requestParams);
  const userLocation = getUserLocation(req, collectedRequestParam, state);
  const isWorldCupMVPEnabled = siteName === TUDN_SITE;
  const isMxPath = isWorldCupMVPEnabled
    && isValidString(path)
    && isValidArray(path.match(MX_PATH_REGEX));
  // Collect data from client/server request
  const device = await getDevice(req, state);

  const response = await getPage(cleanPath(path), {
    config,
    // pass device from client user in order to override axios (desktop) generated one
    // in web-app-state
    params: { ...fetchParams, device },
    siteName,
    country: userLocation,
  });
  const {
    status,
    message,
    type,
    url,
  } = response;

  // If MVP flag is enabled and the requested type is a section
  // ensure the user is in the correct location, if not, then trigger a
  // redirect to the proper one
  if (
    isServer
    && response?.data?.page?.data?.type === 'section'
    && isWorldCupMVPEnabled
  ) {
    let country;

    // Redirect to US section
    if (isMxPath && userLocation === US) {
      country = US;
    }

    // Redirect to MX section
    if (!isMxPath && userLocation === MX) {
      country = MX;
    }

    // Interrupt rest of the flow, if a redirect is required
    if (!!country && redirectToSection({
      config,
      country,
      path,
      req,
      res,
      siteName,
    })) {
      return {};
    }
  }

  // Hook to setHeaders and cms redirect
  // like: http://www.univision.com/censo
  setHeaders(response, res);
  // Check for redirect on the client
  if (type === 'redirectdata') {
    if (checkClientRedirect(req, url) || req) {
      // Return empty object to avoid error capturing
      // while redirecting
      return {};
    }
  }

  const initialState = response?.data ?? { page: { data: {} } };
  // Add logs
  // `Page data fetched: contentType: ${data.type} - status: ${status}`
  let { page: pageData } = initialState;
  pageData = pageData ?? {};
  const { data } = pageData;
  const is404Page = status === 404 || data?.status === 404 || !data;

  // verify if open graph image is valid
  const hasValidOgImage = await isOpenGraphImageValid(data, isServer);

  const headers = getRequestHeaders(req, state);
  const uaDevice = getUaDevice(req, state);
  const userAgent = getUserAgent(req, state);
  const breakpoint = getBreakpoint(req, state);
  const navigationCount = getNavigationCount(req, state);
  const isWebPSupported = checkForWebPSupport(req, state);

  // Extend page data
  pageData.hasValidOgImage = hasValidOgImage;
  pageData.appVersion = 2;
  pageData.site = siteName;
  pageData.device = device;
  pageData.isWebPSupported = isWebPSupported;
  pageData.uaDevice = uaDevice;
  pageData.config = config;
  pageData.breakpoint = breakpoint;
  pageData.headers = headers;
  pageData.userAgent = userAgent;
  pageData.requestParams = collectedRequestParam;
  pageData.navigationCount = navigationCount;
  // this flag is used to enable features like inline css and include resource hints
  pageData.enhancedHeader = true;
  // Adjusting content type based on path for video embed
  // this will allow picking embed layout
  if (isEmbeddedContent(path) && !is404Page) {
    pageData.data.type = contentTypes.VIDEO_EMBEDDED;
  }

  // add missing data required for search results in 404 page
  // TODO: move these values to syndicator
  if (is404Page) {
    pageData = setNotFoundProps(pageData, path);
  }

  // Override page categories for VIX sites
  if (VIX_SITES.includes(siteName)) {
    pageData.pageCategory = siteName;
  }
  // Override site and create childSite for Televisa sites
  if (TELEVISA_SITES.includes(siteName)) {
    pageData.parentSite = TELEVISA_SITE;
  }

  // The header and theme comes with assets that are processed by the webpack
  // on the express.js app, so have the paths from that configuration,
  // also eventually we will move the call to Graphql and it not will
  // have the concern about files processing.
  const headerConf = getHeaderConf(data, pageData.pageCategory);

  const theme = getStyledTheming(pageData.pageCategory, data, { isWorldCupMVPEnabled });
  pageData.theme = theme;

  // User location information
  pageData.userLocation = userLocation;

  // workaround until global store is removed to sync SPA data
  pageState = {
    ...initialState,
    page: pageData,
    headerConf,
  };

  if (!isServer) {
    store.dispatch({
      type: types.SYNC_STORE,
      data: pageState,
    });
  }

  try {
    if (is404Page) {
      pageState.error = HttpError.notFound(message);
      return pageState;
    }
    if (!data?.type) {
      const error = `${SERVER_REQUEST_ERROR} - ${status} - ${message || JSON.stringify(response)}`;
      throw HttpError.internal(error, response);
    }
  } catch (error) {
    consoleLogger.log(`[nextjs]: ${error}`);
  }

  return pageState;
}

export default setupPage;
