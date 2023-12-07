import {
  getKey,
  isValidFunction,
  isValidObject,
  isValidURL,
  isValidArray,
} from '../helpers';
import { isLongForm } from '../../store/storeHelpers';
import * as pageCategories from '../../constants/pageCategories';
import * as contentTypes from '../../constants/contentTypes.json';
import appStore, { appsMapping } from '../../config/appstore';
import Features from '../../config/features';

/**
 * helper to evaluate if the content type is valid for deep links
 * @param {string} [contentType] - page content type
 * @param {string} pageCategory - page category
 * @access private
 * @returns {boolean}
 */
function hasValidContentType(contentType, pageCategory) {
  switch (contentType) {
    case contentTypes.ARTICLE:
    case contentTypes.SLIDESHOW:
    case contentTypes.VIDEO:
      return pageCategory !== pageCategories.RADIO && pageCategory !== pageCategories.UNIVISION_NOW;
    default:
      return false;
  }
}

/**
 * Get value from mapping object
 * @param {Object} mapping - object to map keys/value
 * @param {string} pageCategory - current page category
 * @param {string} url - current page URL
 * @access private
 * @returns {?string}
 */
export function getFromMapping(mapping, pageCategory, url = '') {
  if (!isValidObject(mapping)) {
    return null;
  }

  let valueMapping = mapping[url] || mapping[pageCategory];
  if (valueMapping) {
    return valueMapping;
  }

  if (isValidURL(url)) {
    const { pathname } = new URL(url);

    Object.entries(mapping).forEach(([key, value]) => {
      if (new RegExp(key).test(pathname)) {
        valueMapping = value;
      }
    });
  }
  return valueMapping;
}

/**
 * Creates a valid deep link
 * @param {string} [deepLink] - deep link from api
 * @param {string} contentType - page content type
 * @param {string} bannerCategory - banner category from allowed page categories/topics
 * @param {string} uid - content id
 * @access private
 * @returns {!string}
 */
function getDeepLink(deepLink, contentType, bannerCategory, uid) {
  if (deepLink || (hasValidContentType(contentType, bannerCategory) && uid)) {
    return deepLink || `${appStore[bannerCategory].prefix}://${contentType}/${uid}`;
  }

  return deepLink;
}

/**
 * Get smartLink for UNOW
 * @param {Object} smartLinks - smartLink per page category
 * @param {string} pageCategory - current page category
 * @param {string} pageUri - current page URL
 * @access private
 * @returns {?string}
 */
function getUnowLink(smartLinks, pageCategory, pageUri) {
  let linkData = getFromMapping(smartLinks, pageCategory, pageUri);
  let link;

  if (isValidObject(linkData)) {
    const {
      prefix,
      ...params
    } = linkData;
    linkData = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    linkData = `${prefix}?${linkData}`;
  }
  if (typeof linkData === 'string') {
    link = `https://smart.link/${linkData}`;
  }

  return link;
}

/**
 * Helper to obtain the smart banner category
 * @param {Object} pageData - page data from store
 * @access private
 * @returns {?string}
 */
function getSmartCategory(pageData) {
  const { pageCategory, data = {} } = pageData;

  let bannerCategory = getFromMapping(appsMapping, pageCategory, data.uri);

  if (bannerCategory) {
    return bannerCategory;
  }
  if (pageCategory === pageCategories.RADIO) {
    return pageCategories.RADIO;
  }
  if (pageCategory === pageCategories.UNIVISION_NOW || isLongForm(pageData)) {
    return pageCategories.UNIVISION_NOW;
  }
  const navData = getKey(pageData, 'navData.logoUrl');
  const navCategory = navData && navData.substring(1);
  const { vertical } = data;

  switch (navCategory) {
    case pageCategories.NEWS:
    case pageCategories.ENTERTAINMENT:
    case pageCategories.SPORTS:
      bannerCategory = navCategory;
      break;
    default:
      bannerCategory = vertical;
      break;
  }

  return bannerCategory && bannerCategory.toLowerCase();
}

/**
 * Helper to obtain the smart banner app data
 * @param {Object} pageData - page data from store
 * @access public
 * @returns {?{bannerCategory: string, contentType: string, uid: string,
 deepLink: string, storeLink: string, ios: Object, android: Object}}
*/
export function getSmartBannerData(pageData) {
  if (!isValidObject(pageData) || Features.header.hideHeaderFooter()) {
    return null;
  }

  const {
    pageCategory,
    data: {
      uri, type: contentType, uid,
    } = {},
  } = pageData;
  const bannerCategory = getSmartCategory(pageData);
  const deepLink = getKey(pageData.data, 'brandable.radioStation.deepLink');

  if (!bannerCategory) {
    return null;
  }

  let appData = appStore[bannerCategory];
  if (isValidFunction(appData)) {
    appData = appData();
  }
  if (isValidObject(appData) && isValidArray(appData.skipOn)
      && appData
        .skipOn
        .filter(urlSkip => isValidURL(uri)
        && new RegExp(urlSkip).test(new URL(uri).pathname)).length > 0) {
    return null;
  }

  return (
    (appData && contentType && {
      uid,
      contentType,
      bannerCategory,
      deepLink: getDeepLink(deepLink, contentType, bannerCategory, uid),
      ...appData,
      storeLink: bannerCategory === pageCategories.UNIVISION_NOW
        ? getUnowLink(appData.smartLinks, pageCategory, uri)
        : appData.storeLink,
    })
      || null
  );
}

/**
 * Creates a valid tracking code to iOS native smartBanner
 * @param {string} trackingId - smartBanner tracking
 * @access public
 * @returns {string}
 */
export function getTracking(trackingId) {
  if (!trackingId) {
    return '';
  }

  return `, affiliate-data=at=${appStore.itunes.affiliateId}&ct=${trackingId}`;
}
