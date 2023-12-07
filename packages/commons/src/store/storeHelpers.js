import url from 'url';

// eslint-disable-next-line import/no-cycle
import {
  exists,
  getKey,
  hasKey,
  isValidArray,
  isInArray,
  isValidObject,
  toAbsoluteUrl,
  toRelativeUrl,
  isValidFunction,
  isValidString,
  deburrToLowerCase,
} from '../utils/helpers';
// eslint-disable-next-line import/no-cycle
import Brandable from '../utils/brandable';
import contentTypes from '../constants/contentTypes.json';
import { SHOW } from '../constants/pageCategories';
import {
  UNIVISION_DEFAULT_HOST,
  TUDN_SITE,
  UNIVISION_SITE,
  TELEVISA_SITE,
} from '../constants/sites';
import { US } from '../constants/userLocation';
import VERTICAL_HOME_LIST from '../constants/verticals';
import defaultTab from '../config/data/shows/defaultTab.json';
// eslint-disable-next-line import/no-cycle
import features from '../config/features';
// eslint-disable-next-line import/no-cycle
import localization from '../utils/localization/LocalizationManager';

/**
 * Get api, env, device and other data
 * @param {Object} Store of the page or initial state
 * @param {Object} state - to avoid call the Store on reducer or when already have state data
 * @returns {Object}
 */
export function getPageData(Store, state) {
  let storeState = state;
  if (!isValidObject(storeState)) {
    storeState = Store && isValidFunction(Store.getState) && Store.getState();
  }
  return getKey(storeState, 'page') || Store || null;
}

/**
 * Get a value from the Store using the given key
 * @param {Object} Store Store
 * @param {string} key in the store
 * @returns {*}
 */
export function getEntryByKey(Store, key) {
  return getKey(getPageData(Store), key, null);
}

/**
 * Get config required by the client.
 * @param {Object} Store Store
 * @param {string} key Config key
 * @returns {Object}
 */
export function getConfig(Store, key = '') {
  if (key) {
    return getKey(getPageData(Store), `config.${key}`, null);
  }
  return getKey(getPageData(Store), 'config', {});
}

/**
 * Get page url from api
 * @param {Object} Store of the page
 * @returns {string|null}
 */
export function getPageUrl(Store) {
  const uri = getKey(getPageData(Store), 'data.uri', null);
  return toRelativeUrl(uri);
}

/**
 * Get page uid from api
 * @param {Object} Store of the page
 * @returns {string} uid of current page
 */
export function getPageId(Store) {
  return getKey(getPageData(Store), 'data.uid', '');
}

/**
 * Get page title from api
 * @param {Object} Store of the page
 * @returns {string} page title
 */
export function getPageTitle(Store) {
  return getKey(getPageData(Store), 'data.title', '');
}

/**
 * Get theme from the store
 * @deprecated use 'themeSelector' instead {@link selectors/page-selectors.js#themeSelector}
 * @param {Object} Store of the page
 * @returns {Object}
 */
export function getTheme(Store) {
  return getKey(getPageData(Store), 'theme', {});
}

/**
 * Get page sharing options from page API
 * @param {Object} Store of the page
 * @returns {Object} the sharing options
 */
export function getSharingOptions(Store) {
  return getKey(getPageData(Store), 'data.sharing.options', {});
}

/**
 * Get the {@link Brandable} from store
 * @deprecated use 'useBrandable' hook instead {@link hooks/useBrandable.js#useBrandable}
 * @param {Object} Store of the page
 * @returns {Brandable}
 */
export function getBrandable(Store) {
  return new Brandable(getKey(getPageData(Store), 'data', {}));
}

/**
 * Get device from store
 * @param {Object} Store of the page
 * @returns {string} the device type
 */
export function getDevice(Store) {
  return getKey(getPageData(Store), 'device', 'mobile');
}

/**
 * Returns true if device is desktop
 * @param {Object} Store of the page
 * @returns {string} the device type
 */
export function isDesktop(Store) {
  return getDevice(Store) === 'desktop';
}

/**
 * Get running environment
 * @param {Object} Store of the page
 * @returns {string}
 */
export function getEnv(Store) {
  return getKey(getPageData(Store), 'env', 'production');
}

/**
 * Get ad settings from the store
 * @param {Object} Store of the page
 * @returns {string}
 */
export function getAdSettings(Store) {
  return getKey(getPageData(Store), 'data.adSettings', null);
}

/**
 * Get common tracking info from the store
 * @param {Object} Store of the page
 * @returns {Object} never null/undefined.
 */
export function getCommonTracking(Store) {
  return getKey(getPageData(Store), 'data.analyticsData.web.common', {});
}

/**
 * Get nielsen tracking info from the store
 * @param {Object} Store of the page
 * @returns {Object} never null/undefined.
 */
export function getNielsenTracking(Store) {
  return getKey(getPageData(Store), 'data.analyticsData.web.nielsen', {});
}

/**
 * Get content specific tracking info from the store
 * @param {Object} Store of the page
 * @returns {Object} never null/undefined.
 */
export function getContentSpecificTracking(Store) {
  return getKey(getPageData(Store), 'data.analyticsData.web.contentSpecific', {});
}

/**
 * Get tracking from the store
 * @param {Object} Store of the page
 * @returns {Object} never null/undefined.
 */
export function getTracking(Store) {
  return {
    ...getCommonTracking(Store),
    ...getContentSpecificTracking(Store),
  };
}

/**
 * Get request parameters from api
 * @param {Object} Store of the page
 * @returns {Object}
 */
export function getRequestParams(Store) {
  return getKey(getPageData(Store), 'requestParams') || {};
}

/**
 * Get request parameters from api
 * @param {Object} Store of the page
 * @param {string} expectedKey Querystring param name.
 * @param {string} expectedValue Querystring param value.
 * @returns {Object}
 */
export function hasFeatureFlag(Store, expectedKey, expectedValue = 'true') {
  return getKey(getPageData(Store), `requestParams.${expectedKey}`) === expectedValue;
}

/**
 * Get particular feature flag
 * @param {Object} Store of the page
 * @param {string} key Querystring param name.
 * @returns {Object}
 */
export function getFeatureFlag(Store, key) {
  return getKey(getPageData(Store), `requestParams.${key}`);
}

/**
 * Returns a query string using the request params in the Store.
 * The query string won't have a leading question mark (?)
 * @param {Object} Store of the page
 * @returns {Object}
 */
export function getQueryString(Store) {
  const query = getKey(getPageData(Store), 'requestParams', null);
  return query ? url.format({ query }).substring(1) : '';
}

/**
 * Get current page category
 * @param {Object} Store of the page
 * @returns {string}
 */
export function getPageCategory(Store) {
  return getKey(getPageData(Store), 'pageCategory', null);
}

/**
 * Get pre-loaded components
 * @param {Object} Store of the page
 * @returns {Object}
 */
export function getPreloadedComponents(Store) {
  return getKey(getPageData(Store), 'loadableComponents') || {};
}

/**
 * Get content type from the store
 * @param {Object} Store of the page
 * @returns {string}
 */
export function getContentType(Store) {
  return getKey(getPageData(Store), 'data.type', null);
}

/**
 * Check if widget has particular id
 * @param {Object} widget to check
 * @param {number} id to find
 * @returns {boolean}
 */
export function isWidgetId(widget, id) {
  if (hasKey(widget, 'settings.uid')) {
    return widget.settings.uid === id;
  }
  return false;
}

/**
 * Get widget index based on id from state
 * @param {Object} state of the page
 * @param {number} id to find
 * @returns {number}
 */
export function getWidgetIndexById(state, id) {
  let widgetIndex = -1;
  if (hasKey(state, 'data.widgets') && isValidArray(state.data.widgets)) {
    widgetIndex = state.data.widgets.findIndex(w => isWidgetId(w, id));
  }
  return widgetIndex;
}

/**
 * Get widget based on id from state
 * @param {Object} state of the page
 * @param {number} id to find
 * @returns {Object}
 */
export function getWidgetById(state, id) {
  let widget = null;
  if (hasKey(state, 'data.widgets') && isValidArray(state.data.widgets)) {
    widget = state.data.widgets.find(w => isWidgetId(w, id));
  }
  return widget;
}

/**
 * Check if widget has particular type
 * @param {Object} widget to check
 * @param {string} type to find
 * @returns {boolean}
 */
export function isWidgetType(widget, type) {
  if (hasKey(widget, 'type')) {
    return widget.type === type;
  }
  return false;
}

/**
 * Get widget index based on type from state
 * @param {Object} data of the page
 * @param {string} type to find
 * @returns {Object}
 */
export function getWidgetIndexByType(data, type) {
  let widgetIndex = -1;
  if (hasKey(data, 'widgets') && isValidArray(data.widgets)) {
    widgetIndex = data.widgets.findIndex(w => isWidgetType(w, type));
  }
  return widgetIndex;
}

/**
 * Merge previous widgets based on IUD and type
 * to keep the "extraData" information
 * @param {Object[]} nextWidgets the new widgets data
 * @param {Object[]} prevWidgets the previous widgets data
 * @returns {Object[]}
 */
export function mergeWidgets(nextWidgets, prevWidgets) {
  if (!isValidArray(nextWidgets)) {
    return prevWidgets;
  }

  if (!isValidArray(prevWidgets)) {
    return nextWidgets;
  }

  return nextWidgets.map((widgetData) => {
    const prevDataWidget = prevWidgets.find((data) => {
      return (
        hasKey(data, 'settings.uid')
        && hasKey(widgetData, 'settings.uid')
        && data.settings.uid === widgetData.settings.uid
        && data.type === widgetData.type
      );
    });
    // Merge with previous widget data
    return { ...widgetData, ...prevDataWidget };
  });
}

/**
 * Returns true if the page is a vertical home
 * @param {Object} Store of the page
 * @param {string} uri uri override to read directly
 * @returns {boolean}
 */
export function isVerticalHome(Store, uri) {
  if (uri) {
    return isInArray(toRelativeUrl(uri), VERTICAL_HOME_LIST);
  }

  return isInArray(getPageUrl(Store), VERTICAL_HOME_LIST);
}

/**
 * Returns true if the current page is in the pages list
 * @param {Object} Store of the page
 * @param {string} pages list of pages to check for
 * @returns {boolean}
 */
export function isCurrentPage(Store, pages) {
  if (!isValidArray(pages)) {
    return false;
  }

  return isInArray(getPageUrl(Store), pages);
}

/**
 * Returns device type - supported devices: ios, android
 * @param {Object} Store of the page
 * @returns {string} - ios or android
 */
export function getDeviceType(Store) {
  const userAgent = getKey(getPageData(Store), 'userAgent');
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'ios';
  }
  return '';
}

/**
 * Returns if the browser is safari mobile
 * @param {Object} Store of the page
 * @returns {boolean} - true if safari mobile
 */
export function isSafariMobile(Store) {
  const { userAgent, uaDevice } = getPageData(Store) || {};
  if (uaDevice) {
    return /safari/i.test(uaDevice);
  }
  return /version\/([\w.]+).+?mobile\/\w+\s(safari)/i.test(userAgent);
}

/**
 * Returns the vertical value of the page
 * @param {Object} Store - page store
 * @returns {?string}
 */
export function getVertical(Store) {
  const vertical = getKey(getPageData(Store), 'data.vertical', null);
  return isValidString(vertical) ? vertical.toLowerCase() : null;
}

/**
 * Returns value if request parameter mode is found
 * @param {Object} Store of the page
 * @returns {string} mode parameter value
 */
export function getModeParam(Store) {
  return getKey(getPageData(Store), 'requestParams.mode', '');
}

/**
 * Returns value of requestId if found in the Store
 * @param {Object} Store of the page
 * @returns {string} requestId UUID for current request
 */
export function getRequestId(Store) {
  return getKey(getPageData(Store), 'requestId', '');
}

/**
 * Returns true if the Video SDK is ready
 * @param {Object} Store of the page
 * @returns {boolean}
 */
export function isVideoSDKReady(Store) {
  return getKey(Store.getState(), 'video.fmgReady', false);
}

/**
 * Returns true if the current request is for an AMP page
 * @param {Object} Store of the page
 * @returns {boolean} is AMP page
 */
export function isAmp(Store) {
  return getKey(getPageData(Store), 'isAmp', false);
}

/**
 * Returns true if the current request is for an SPA page
 * @param {Object} Store of the page
 * @returns {boolean} is SPA page
 */
export function isSpa(Store) {
  return getKey(getPageData(Store), 'isSpa', false);
}

/**
 * Returns the count of navigations in the SPA.
 * @param {Object} Store of the page
 * @returns {number} how many times the user has navigated in the SPA.
 */
export function getNavigationCount(Store) {
  return getKey(getPageData(Store), 'navigationCount', 0);
}

/**
 * Returns if the given content type (from Store or string) is allowed
 * @param {Object} Store of the page
 * @param {Array} allowableTypes array of types that will pass
 * @returns {boolean} if given type is allowed
 */
export function isContentTypeAllowed(Store, allowableTypes = []) {
  if (!isValidArray(allowableTypes) || !isValidObject(Store)) {
    return false;
  }

  return allowableTypes.indexOf(getContentType(Store)) !== -1;
}

/**
 * Returns if the given device (from Store or string) is allowed
 * @param {Object|string} Store of the page
 * @param {Array} allowableTypes array of types that will pass
 * @returns {boolean} if given type is allowed
 */
export function isDeviceAllowed(Store, allowableTypes = []) {
  if (!isValidArray(allowableTypes) || !isValidObject(Store)) {
    return false;
  }
  return allowableTypes.indexOf(getDevice(Store)) !== -1;
}

/**
 * Returns if the given url (from Store or string) is allowed
 * @param {Object|string} Store of the page
 * @param {Array} allowableURls array of types that will pass
 * @returns {boolean} if given type is allowed
 */
export function isUrlAllowed(Store, allowableURls) {
  if (!isValidArray(allowableURls) || !isValidObject(Store)) {
    return false;
  }
  return allowableURls.indexOf(getPageUrl(Store)) !== -1;
}

/**
 * Returns true if the current primary tag is included in the tag list provided to enable a feature
 * @param {Object} Store of the page
 * @param {array} tagList list of tags to be enabled
 * @returns {boolean}
 */
export function isPrimaryTagEnabled(Store, tagList = []) {
  let tags = [];
  // Just ensuring the data is an actual array
  if (isValidArray(tagList)) {
    tags = [...tagList];
  }

  const pageData = getPageData(Store);
  const primaryTag = hasKey(pageData, 'data.primaryTag.name') && getKey(pageData, 'data.primaryTag.name', '').toLowerCase();
  const bexPrimaryTagCheck = hasKey(pageData, 'data.hierarchy')
    && isValidArray(pageData.data.hierarchy)
    && getKey(pageData, `data.hierarchy[${pageData.data.hierarchy.length - 1}].name`);
  const bexPrimaryTag = exists(bexPrimaryTagCheck)
    && typeof bexPrimaryTagCheck === 'string'
    && bexPrimaryTagCheck.toLowerCase();

  return tags.includes(primaryTag) || tags.includes(bexPrimaryTag);
}

/**
 * Returns true if the current vertical has some url under Optimize test
 * @param {Object} Store of the page
 * @param {Object} urls urls by vertical
 * @returns {boolean}
 */
export function isOptimizeAntiFlickerEnabled(Store, urls = {}) {
  if (!isValidObject(urls)) {
    return false;
  }
  let isAntiFlickerEnabled = false;
  const data = getKey(getPageData(Store), 'data') || {};
  const vertical = (data.vertical || '').toLowerCase();
  const urisEnabled = urls[vertical];
  if (urisEnabled) {
    const dataUri = (toRelativeUrl(data.uri) || '').toLowerCase();
    isAntiFlickerEnabled = isValidArray(urisEnabled) && urisEnabled.includes(dataUri);
  }

  return isAntiFlickerEnabled;
}

/**
 * Returns true if the current vertical, primary tag and/or secondary tag is included
 * in the tag list provided to enable a feature
 * @param {Object} Store of the page
 * @returns {boolean}
 */
export function isInfiniteScrollingEnabled(Store) {
  const pageData = getPageData(Store);
  if ([TUDN_SITE, UNIVISION_SITE].includes(pageData?.site)
    && pageData?.data?.userLocation === US) return false;
  return getKey(pageData, 'data.isInfiniteScrollEnabled', false);
}

/**
 * Returns true if a top ad has been inserted
 * @param {Object} Store of the page
 * @returns {boolean}
 */
export function isTopAdInserted(Store) {
  return getKey(Store.getState(), 'dfpAds.topAdInserted', false);
}

/**
 * Returns the location where the top ad was inserted from
 * @param {Object} Store of the page
 * @returns {boolean}
 */
export function getTopAdInsertedFrom(Store) {
  return getKey(Store.getState(), 'dfpAds.topAdInsertedFrom', null);
}

/**
 * Helper to verify if the content has longform
 * @param {Object} Store - of the app or initial state value
 * @returns {boolean}
 */
export function isLongForm(Store) {
  return getKey(getPageData(Store), 'data.longform', false);
}

/**
 * Determine if page is `tv-en-vivo`
 * @param {Object} Store - of the app or initial state value
 * @returns {boolean}
 */
export function isLiveTvPage(Store) {
  const uri = toRelativeUrl(getEntryByKey(Store, 'data.uri'));
  const pageCategory = getPageCategory(Store);

  return pageCategory === 'local-tv' && uri && uri.includes('tv-en-vivo');
}

/**
 * Determine if page is radio page
 * @param {Object} Store - of the app or initial state value
 * @returns {boolean}
 */
export function isRadioPage(Store) {
  const pageCategory = getPageCategory(Store);

  return pageCategory === 'radio';
}

/**
 * Returns the canonical url from the feed data. Uses the seo node if present, otherwise
 * uses the page's uri.
 * @param {Object} Store - of the app or initial state value
 * @returns {string}
 */
export function getCanonicalUrl(Store) {
  const pageData = getPageData(Store) || {};
  const pageType = getKey(pageData, 'data.type');
  const canonicalUrl = getKey(pageData, 'data.seo.canonicalUrl') || toAbsoluteUrl(getPageUrl(Store), pageData.domain);

  if (pageType === contentTypes.SEARCH_PORTAL) {
    const query = getRequestParams(Store).q || '';
    try {
      const canonicalSearchUrl = new URL(canonicalUrl);
      canonicalSearchUrl.search = query && `q=${query}`;
      return canonicalSearchUrl.toString();
    } catch (e) {
      return canonicalUrl;
    }
  }

  return canonicalUrl;
}

/**
 * Return BreakPoint Device
 * @param {Object} Store - global store
 * @param {string} field - breakPoint field
 * @returns {Object}
 */
export const getBPFieldValue = (Store) => {
  return (field) => {
    return getKey(Store.getState(), `page.breakpoint.${field}`, null);
  };
};

/**
 * Returns the base domain of the webapp
 * @param {Object} Store - of the app or initial state value
 * @param {Object} state - to avoid call the Store on reducer
 * @returns {string}
 */
export function getDomain(Store, state) {
  return getKey(getPageData(Store, state), 'domain');
}

/**
 * Returns the original url to the webapp.
 * @param {Object} Store - of the app or initial state value
 * @returns {string}
 */
export function getOriginalUrl(Store) {
  return getKey(getPageData(Store), 'originalUrl');
}

/**
 * Returns available sites URLs
 * @param {Object} Store - of the app or initial state value
 * @returns {Object}
 */
export function getSites(Store) {
  return getKey(getPageData(Store), 'sites', {});
}

/**
 * Get search data
 * @param {Object} Store - of the app or initial state value
 * @returns {Object}
 */
export function getSearchData(Store) {
  return Store && Store.getState && Store.getState().search;
}

/**
 * Get current header configuration
 * @param {Object} Store of the app
 * @returns {Object} the current header configuration
 */
export function getHeaderConf(Store = {}) {
  if (!isValidFunction(Store.getState)) return {};

  return getKey(Store.getState(), 'headerConf', {});
}

/**
 * Get initial state data
 * @param {Object} Store - of the app or initial state value
 * @returns {Object}
 */
export function getInitialState(Store) {
  const initialState = getPageData(Store);
  if (isValidObject(initialState)) {
    initialState.headerConf = getHeaderConf(Store);

    // Make sure request params doesn't have multiple params with same value
    Object.keys(initialState.requestParams || {}).forEach((key) => {
      if (isValidArray(initialState.requestParams[key])) {
        initialState.requestParams[key] = [...new Set(initialState.requestParams[key])].toString();
      }
    });
  }
  if (getKey(initialState, 'data.type') === contentTypes.SEARCH_PORTAL) {
    initialState.search = getSearchData(Store);
  }

  return initialState;
}

/**
 * Get current horizontal slideshow index
 * @param {Object} Store - of the app or initial state value
 * @returns {number} the current horizontal slideshow index
 */
export function getCurrentHorizontalSlideshowIndex(Store = {}) {
  if (!isValidFunction(Store.getState)) return 0;

  return getKey(Store.getState(), 'horizontalSlideshow.currentSlideshowIndex', 0);
}

/**
 * Gets hamburger menu open flag
 * @param {Object} Store of the app
 * @returns {boolean} true if the hamburger menu is open
 */
export function isHamburgerMenuOpen(Store) {
  return getKey(getHeaderConf(Store), 'isHamburgerMenuOpen', false);
}

/**
 * Gets search field open flag
 * @param {Object} Store of the app
 * @returns {boolean} true if the search field is open
 */
export function isSearchFieldOpen(Store) {
  return getKey(getHeaderConf(Store), 'isSearchFieldOpen', false);
}

/**
 * Determine if is TUDN site/domain
 * @deprecated use page selectors instead {@link selectors/page-selectors.js}
 * @param {Object} Store - of the app or initial state value
 * @param {Object} state - to avoid call the Store on reducer
 * @returns {boolean}
 */
export function isTudnSite(Store, state) {
  const pageData = state || getPageData(Store);
  return { ...pageData }.isTudn || false;
}

/**
 * Determine if is Univision site/domain
 * @param {Object} Store - of the app or initial state value
 * @param {Object} state - to avoid call the Store on reducer
 * @returns {boolean}
 */
export function isUnivisionSite(Store, state) {
  const pageData = state || getPageData(Store);
  const { domain } = pageData || {};
  const siteRegExp = new RegExp(UNIVISION_DEFAULT_HOST);
  return siteRegExp.test(domain) && !isTudnSite(Store, pageData);
}

/**
 * Gets section URL form the store
 * @param {Object} Store of the app
 * @returns {string}
 */
export function getSectionUrl(Store) {
  return getEntryByKey(Store, 'navData.sectionUrl');
}

/**
 * Gets the pathname of the sectionUrl in the store
 * @param {Object} Store of the app
 * @returns {string}
 */
export function getSectionUrlPathname(Store) {
  const sectionUrl = getSectionUrl(Store);

  try {
    return new URL(sectionUrl).pathname;
  } catch (e) {
    return sectionUrl;
  }
}

/**
 * Gets the title for a show for tracking
 * @param {Object} Store of the app
 * @returns {string}
 */
export function getTitleShow(Store) {
  const data = getKey(getPageData(Store), 'data', {});
  const primaryTag = getKey(data, 'primaryTag.name');
  const tabIndex = defaultTab[primaryTag] === undefined ? 1 : defaultTab[primaryTag];
  const mainTabTitle = features.shows.isShortform() ? localization.get('videos') : localization.get('fullEpisodes');
  const title = `${getKey(data, 'title')} - ${tabIndex ? localization.get('newsAndMore') : mainTabTitle}`;
  return deburrToLowerCase(title);
}

/**
 * Returns true if current page is a show page
 * @param {Object} Store of the app
 * @returns {boolean} true if show page
 */
export function isShowPage(Store) {
  const pageData = getPageData(Store);
  return hasKey(pageData, 'data.show') || getPageCategory(Store) === SHOW;
}

/**
 * Returns true if page is a Section
 * @param {Object} Store of that app
 * @returns {boolean} true if page is a Section
 */
export function isSectionPage(Store) {
  return getContentType(Store) === contentTypes.SECTION;
}

/**
 * Returns true if current page is a home show page
 * @param {Object} Store of the app
 * @returns {boolean} true if show page
 */
export function isShowHomePage(Store) {
  const sectionType = getKey(getPageData(Store), 'data.sectionType', '');
  return sectionType === contentTypes.SHOW;
}

/**
 * Returns true if there is a valid video or radio stream playing.
 * @param {Object} Store of the app.
 * @returns {boolean}
 */
export function isPlayingMedia(Store) {
  const state = Store.getState();
  return hasKey(state, 'mediaPlayer.videoPlaying') || hasKey(state, 'player.anchorPlayer.stationTitle');
}

/**
 * Returns true if page is a Soccer Match
 * @param {Object} Store of that app
 * @returns {boolean} true if page is a Soccer Match
 */
export function isSoccerMatchPage(Store) {
  return getContentType(Store) === contentTypes.SOCCER_MATCH;
}
