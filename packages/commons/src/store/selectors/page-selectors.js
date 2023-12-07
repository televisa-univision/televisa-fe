import { createSelector } from 'reselect';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import * as languages from '@univision/fe-utilities/localization/languages';
import { CONECTA, RADIO, SHOW } from '../../constants/pageCategories';
import contentTypes from '../../constants/contentTypes.json';
import { US } from '../../constants/userLocation';

import {
  LAS_ESTRELLAS_SITE, TELEVISA_SITE, DISTRITOCOMEDIA_SITE,
} from '../../constants/sites';

//
// WARNING: for selector that will return non-primitives such as objects/arrays
// use 'createSelector' to memorize those values to avoid re-renders
//

/**
 * Gets state data from the store
 * @private
 * @param {Object} state store instance or state data
 * @returns {Object} state data
 */
const getState = (state) => {
  if (!isValidObject(state)) {
    return state;
  }
  return isValidFunction(state.getState) ? state.getState() : state;
};

/**
 * Get the page/server data
 * @param {Object} state the redux state
 * @returns {Object} the page data
 */
export const pageSelector = createSelector(getState, state => getKey(state, 'page', {}));

/**
 * Get the page data
 * @param {Object} state the redux state
 * @returns {Object} the page data
 */
export const pageDataSelector = createSelector(getState, state => getKey(state, 'page.data', {}));

/**
 * Get the page data
 * @param {Object} state the redux state
 * @returns {Object} the page data
 */
export const pageWidgetsSelector = createSelector(getState, state => getKey(state, 'page.data.widgets', []));

/**
 * Gets the current headerConf from the store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const headerConfSelector = createSelector(getState, state => getKey(state, 'headerConf', {}));

/**
 * Gets the current Radio player from the store
 * @param {Object} state redux state
 * @returns {Object} current player
 */
export const playerSelector = createSelector(getState, state => getKey(state, 'player', {}));

/**
 * Gets the current page's social networks from the store
 * @param {Object} state redux state
 * @returns {Array} social networks on the page
 */
export const socialNetworksSelector = createSelector(getState, state => getKey(
  state, 'page.data.socialNetworks', [],
));

/**
 * Get the page/server config from the Store
 * @param {Object} state the redux state
 * @returns {Object} the page config
 */
export const configSelector = createSelector(getState, state => getKey(state, 'page.config', {}));

/**
 * Returns the hierarchy node that represents
 * the current page url
 * @param {Object} state redux state data
 * @returns {Object} hierarchy
 */
export const actualHierarchySelector = (state) => {
  const list = state?.page?.data?.hierarchy;
  return isValidArray(list) ? list[list.length - 1] : list;
};

/**
 * Get the page/server data
 * @param {Object} state the redux state
 * @returns {Object} the page data
 */
export const appVersionSelector = state => getKey(getState(state), 'page.appVersion', 1);

/**
 * Get the current page domain from the Store
 * @param {Object} state the redux state
 * @returns {Function} the selector function that takes the redux state as an
 * argument.
 */
export const domainSelector = state => getKey(getState(state), 'page.domain');

/**
 * Get the proxy URL from the config Store
 * @param {Object} state the redux state
 * @returns {Function} the selector function that takes the redux state as an
 * argument.
 */
export const proxySelector = state => getKey(getState(state), 'page.config.proxy');

/**
 * Get number of navigations on SPA from the Store
 * @param {Object} state the redux state
 * @returns {Function} the selector function that takes the redux state as an
 * argument.
 */
export const navigationCountSelector = state => getKey(getState(state), 'page.navigationCount');

/**
 * Get the current sites configured from the Store
 * @param {Object} state the redux state
 * @returns {Object} the sites of the page
 */
export const sitesSelector = createSelector(getState, state => getKey(state, 'page.sites', {}));

/**
 * Get the current site configured from the Store
 * @param {Object} state the redux state
 * @returns {Object} the site of the page
 */
export const siteSelector = state => getKey(state, 'page.site', '');

/**
 * Get the current page variant from the Store
 * @param {Object} state the redux state
 * @returns {string} the page variant (dark or light)
 */
export const variantSelector = state => getKey(getState(state), 'page.data.variant');

/**
 * Get the current page theme from the Store
 * @param {Object} state the redux state
 * @returns {Object} the page theme
 */
export const themeSelector = createSelector(getState, state => getKey(state, 'page.theme', {}));

/**
 * Get the current page uri from the Store
 * @param {Object} state the redux state
 * @returns {Function} the selector function that takes the redux state as an
 * argument
 */
export const pageUriSelector = state => getKey(getState(state), 'page.data.uri');

/**
 * Get the current page category from the Store
 * @param {Object} state the redux state
 * @returns {Function} the selector function that takes the redux state as an
 * argument
 */
export const pageCategorySelector = state => getKey(getState(state), 'page.pageCategory');

/**
 * Indicates if the current page data belong to a local market.
 * @param {Object} state the redux state
 * @returns {boolean} whether the page belongs to a local market or not
 */
export const isLocalMarketSelector = state => hasKey(
  getState(state), 'page.data.tvStation',
);

/**
 * Get the current local market
 * @param {Object} state the redux state
 * @returns {string}
 */
export const localMarketSelector = state => getKey(
  state, 'page.data.tvStation.call',
);

/**
 * Indicates if the current page data belong to a TUDN site.
 * @deprecated use `site` value from page data to create custom mapping or
 * data from {@link univision-fe/packages/commons/src/themes | themes} per category/site
 * @param {Object} state the redux state
 * @returns {Function} the selector function that takes the redux state as an
 * argument
 */
export const isTudnSiteSelector = state => getKey(getState(state), 'page.isTudn', false);

/**
 * Indicates if the current page data belong to Las Estrellas site from Televisa sites.
 * @deprecated use `site` value from page data to create custom mapping or
 * data from {@link univision-fe/packages/commons/src/themes | themes} per category/site
 * @param {Object} state the redux state
 * @returns {Function} the selector function that takes the redux state as an
 * argument
 */
export const isLasEstrellasSiteSelector = (state) => {
  return getKey(getState(state), 'page.site', null) === LAS_ESTRELLAS_SITE;
};

/**
 * Indicates if the current page data belong to Televisa sites.
 * @deprecated use `site` value from page data to create custom mapping or
 * data from {@link univision-fe/packages/commons/src/themes | themes} per category/site
 * @param {Object} state the redux state
 * @returns {Function} the selector function that takes the redux state as an
 * argument
 */
export const isTelevisaSiteSelector = (state) => {
  return getKey(getState(state), 'page.parentSite', null) === TELEVISA_SITE;
};

/**
 * Indicates if the current page data belong have SPA enable.
 * @param {Object} state the redux state
 * @returns {boolean} whether the current page has SPA enabled or not
 */
export const isSpaSelector = state => getKey(getState(state), 'page.isSpa', false);

/**
 * Determines if the current page has an ad skin
 * @param {Object} state the redux state
 * @returns {boolean} whether the page has an ad skin or not
 */
export const hasAdSkinSelector = state => getKey(getState(state), 'page.hasAdSkin');

/**
 * Get the current device from the Store
 * @param {Object} state the redux state
 * @returns {string} the current device ("mobile" or "desktop")
*/
export const deviceSelector = state => getKey(getState(state), 'page.device');

/**
 * Gets the isWebPSupported from the store
 * @param {Object} state the redux state
 * @returns {string} the current isWebPSupported (true or false)
 */
export const isWebPSupportedSelector = state => getKey(getState(state), 'page.isWebPSupported', false);

/**
 * Get user-agent platform/browser with device from the Store
 * @param {Object} state the redux state
 * @returns {string} the current device ("safari", "desktop")
*/
export const uaDeviceSelector = state => getKey(getState(state), 'page.uaDevice');

/**
 * Get the current breakpoint from the Store
 * @param {Object} state the redux state
 * @returns {string} the current breakpoint ({size: 'xl', width: 1440, device: 'desktop'})
 */
export const breakpointSelector = state => getKey(getState(state), 'page.breakpoint');

/**
 * Get the current userAgent from the Store
 * @param {Object} state the redux state
 * @returns {string} the current userAgent
 */
export const userAgentSelector = state => getKey(getState(state), 'page.userAgent');

/**
 * Get the request headers from the Store
 * @param {Object} state the redux state
 * @returns {string} the current userAgent
 */
export const requestHeadersSelector = state => getKey(getState(state), 'page.headers');

/**
 * Determine if the current page is the show home page
 * @param {Object} state the redux state
 * @returns {boolean} whether the current page is the show home page or not
*/
export const showHomePageSelector = (state) => {
  const sectionType = getKey(getState(state), 'page.data.sectionType', '');
  return sectionType === contentTypes.SHOW;
};

/**
 * Gets the status code from the page data
 * @param {Object} state the redux state
 * @returns {number} the status code
*/
export const statusCodeSelector = state => getKey(getState(state), 'page.data.status');

/**
 * Gets the status code from the page data
 * @param {Object} state the redux state
 * @returns {number} the status code
*/
export const isShowSelector = state => getKey(getState(state), 'page.data.show');

/**
 * Get if the current page category is show or is show home page from the Store
 * @returns {Function} the selector function that takes the redux state as an
 * argument
*/
export const showPageSelector = createSelector(
  pageCategorySelector,
  statusCodeSelector,
  isShowSelector,
  showHomePageSelector,
  (pageCategory, statusCode, isShow, isShowHomePage) => {
    const isShowCategory = isShow || [CONECTA, SHOW].includes(pageCategory);
    return isShowCategory || isShowHomePage || statusCode === 404;
  },
);

/**
 * Get the current state for the market selector from the Store
 * @returns {Function} the selector function that takes the redux state as an
 * argument
 */
export const isMarketSelectorOpenSelector = createSelector(
  headerConfSelector,
  headerConf => getKey(headerConf, 'isMarketSelectorOpen', false),
);

/**
 * Get the current market for the market selector from the Store
 * @returns {Function} the selector function that takes the redux state as an
 * argument
 */
export const marketSelectorCurrentSelector = createSelector(
  headerConfSelector,
  headerConf => getKey(headerConf, 'marketSelectorCurrent', null),
);

/**
 * Get Player selector from Stores
 * @returns {Function} the selector function that takes the redux state as an
 * argument
 */
export const radioAnchorSelector = createSelector(
  playerSelector,
  player => getKey(player, 'anchorPlayer', null),
);

/**
 * Get the current flag if an SPA page transition is ocurring from the Store
 * @param {Object} state of the store
 * @returns {Function} the selector function that takes the redux state as an
 * argument
 */
export const pageTransitionSelector = state => getKey(
  getState(state), 'page.pageTransitioning', false,
);

/**
 * Retrieves the current page params from the Store
 * @param {Object} state of the store
 * @returns {Object}
 */
export const requestParamsSelector = createSelector(
  pageSelector,
  page => getKey(page, 'requestParams', {}),
);

/**
 * Gets the current search from the store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const searchSelector = createSelector(
  getState,
  requestParamsSelector,
  (state, requestParams) => {
    const search = getKey(state, 'search', {});
    const query = search.query || requestParams.q || '';
    const dateFilter = search.dateFilter || 'all';

    return { ...search, query, dateFilter };
  },
);

/**
 * Retrieves the current global widgets from the Store
 * @param {Object} state of the store
 * @returns {Object} The global widget list
 */
export const globalWidgetSelector = createSelector(
  pageSelector,
  page => getKey(page, 'data.globalWidgets'),
);

/**
 * Retrieves the current page sharingOptions from the Store
 * @param {Object} state of the store
 * @returns {Object}
 */
export const sharingOptionsSelector = createSelector(
  pageSelector,
  page => getKey(page, 'sharing.options', {}),
);

/**
 * Retrieves the current page uid from the Store
 * @param {Object} state of the store
 * @returns {string} The current page uid
 */
export const pageUIDSelector = state => getKey(state, 'page.data.uid');

/**
 * Retrieves the current browser url excluding search path
 * this way make it works also for localhost
 * @param {Object} state of the store
 * @returns {string}
 */
export const getCurrentBrowserUrl = (state) => {
  const domain = state?.page?.domain;
  const pathName = global?.window?.location?.pathname;
  if (domain && pathName) {
    if (pathName.startsWith('/iframe.html')) {
      // This covers the case when we are using storybooks
      return `${domain}`;
    }

    return `${domain}${pathName}`;
  }
  return null;
};

/**
 * Retrieves disable3rdPartyAds from the Store
 * @param {Object} state of the store
 * @returns {bool} disable3rdPartyAds value
 */
export const disable3rdPartyAds = state => state?.page?.data?.adSettings?.disable3rdPartyAds
  || false;

/**
 * Retrieves the current addCacheBusterToImageUrls from the Store
 * @param {Object} state of the store
 * @returns {bool}
 */
export const imageCacheBusterSelector = createSelector(
  getState,
  state => getKey(state, 'page.data.addCacheBusterToImageUrls', false),
);

/**
 * Determine if page is radio page
 * @param {Object} state of the store
 * @returns {bool}
 */
export const radioPageSelector = createSelector(
  pageCategorySelector,
  pageCategory => pageCategory === RADIO,
);

/**
 * Gets the current language value from the store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const languageSelector = createSelector(getState, state => getKey(state, 'page.language', languages.ES));

/**
 * Determines if isAmpPage
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const isAmpPageSelector = state => !!state?.page?.isAmp;

/**
 * Gets the current sportData from the store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const sportsDataSelector = createSelector(
  getState,
  state => getKey(state, 'sports', {}),
);

/**
 * Gets the current content type from the store
 * @param {Object} state redux state
 * @returns {string} current content type page
 */
export const contentTypeSelector = createSelector(
  pageDataSelector,
  pageData => pageData?.type
);

/**
 * Gets the current ad settings from the store
 * @param {Object} state redux state
 * @returns {Object} current ad settings
 */
export const adSettingsSelector = createSelector(
  pageDataSelector,
  pageData => pageData?.adSettings
);

/**
 * Gets the current targeting ad settings from the store
 * @param {Object} state redux state
 * @returns {string} current targeting ad settings
 */
export const adSettingsTargetingSelector = createSelector(
  pageDataSelector,
  pageData => pageData?.adSettings?.targeting
);

/**
 * Gets the current user location from the store
 * @param {Object} state redux state
 * @returns {string} current user location
 */
export const userLocationSelector = createSelector(
  getState,
  state => getKey(state, 'page.userLocation', US)
);
