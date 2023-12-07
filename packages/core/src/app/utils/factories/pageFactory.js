import React from 'react';
import Loadable from 'react-loadable';

import {
  exists,
  getKey,
  hasKey,
  isValidArray,
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';

import { parseWidgets, parseWidgetsWithAds, parseStaticWidgets } from './widgetFactory';

import pageFactoryComponents, {
  bundleNameMapping,
} from './pageFactoryComponents';

/**
 * Returns true if the requested path is for an embedded content
 * @param {string} path the requested path
 * @returns {boolean}
 */
function isEmbeddedContent(path) {
  return exists(path) && path.includes('/embed');
}

/**
 * Helper to change page type to match bundle name if necessary.
 * Webpack bundle names are generated as camelCase. Content types from the API
 * come all lowercase (even when there are two words). For content types with
 * only one word, everything is fine. But, for content types with two words,
 * like "liveblog", we need to map the name to the camelCase bundle name
 * "liveBlog". Also, there are special cases where one content type from the API
 * maps to a specific custom type (see slideshow for an example).
 * @param {Object} data the page data
 * @param {string} path the requested path
 * @returns {string}
 */
export function mapPageTypeToBundleName(data, path) {
  switch (data.type) {
    case contentTypes.ARTICLE:
      return data.type;

    case contentTypes.COMPETITION:
    case contentTypes.LEAGUE:
    case contentTypes.SECTION:
    case contentTypes.SOCCER_COMPETITION:
    case contentTypes.SOCCER_TEAM:
      if (exists(data.staticWidgets) && isValidArray(data.staticWidgets)) {
        return contentTypes.SHOW;
      }
      return data.sectionType === contentTypes.RADIO_STATION
        ? contentTypes.SECTION_RADIO
        : contentTypes.SECTION;

    case contentTypes.LIVE_BLOG:
      return bundleNameMapping[contentTypes.LIVE_BLOG];

    case contentTypes.LIVE_STREAM:
      return bundleNameMapping[contentTypes.LIVE_STREAM];

    case contentTypes.SEARCH_PORTAL:
      return contentTypes.SEARCH;

    case contentTypes.SLIDESHOW:
      if (exists(data.slideshowType)) {
        switch (data.slideshowType) {
          case 'horizontalslideshow':
            return contentTypes.SLIDESHOW_HORIZONTAL;
          case 'verticalslideshow':
            return contentTypes.SLIDESHOW_VERTICAL;
          case 'reactionslideshow':
            return contentTypes.SLIDESHOW_HORIZONTAL;
          default:
            break;
        }
      }
      return data.vertical
        ? contentTypes.SLIDESHOW_VERTICAL
        : contentTypes.SLIDESHOW_HORIZONTAL;

    case contentTypes.SLIDESHOW_REACTIONS:
      return contentTypes.SLIDESHOW_HORIZONTAL;

    case contentTypes.SOCCER_MATCH:
      return bundleNameMapping[contentTypes.SOCCER_MATCH];

    case contentTypes.VIDEO:
      if (isEmbeddedContent(path)) {
        return contentTypes.VIDEO_EMBEDDED;
      }
      return data.type;
    case contentTypes.COMPANY:
    default:
      return contentTypes.TAG;
  }
}

/**
 * Helper to detect page type
 * @param {Object} data from API
 * @param {string} path Requested path
 * @param {Object} context WebApp context
 * @param {boolean} context.isSpa True if the request is for SPA.
 * @returns {string}
 */
export function getCurrentPageType(data = {}, path, { isSpa } = { isSpa: false }) {
  let currentPageType = contentTypes.ERROR_PAGE;

  if (isValidObject(data) && data.type) {
    if (isSpa) {
      currentPageType = contentTypes.SPA;
    } else {
      currentPageType = mapPageTypeToBundleName(data, path);
    }
  }

  return currentPageType;
}

/**
 * Helper to separate page assets
 * @param {string} page Actual page type
 * @param {Object} assets All chunk assets
 * @returns {Object}
 */
export function getAssets(page, assets) {
  const pageAssets = {};
  // Default bundle
  let currentPage = contentTypes.ERROR_PAGE;
  if (hasKey(assets, 'javascript')) {
    if (typeof assets.javascript[page] !== 'undefined') {
      currentPage = page;
    }
    Object.keys(assets).forEach((assetsType) => {
      if (exists(assets[assetsType][currentPage])) {
        let asset = assets[assetsType][currentPage];
        if (exists(process.env.CDN_URL_OVERRIDE)) {
          asset = asset.replace(process.env.CDN_URL, process.env.CDN_URL_OVERRIDE);
        }
        pageAssets[assetsType] = asset;
      }
    });
    pageAssets.jsDependencies = [
      assets.javascript.icons,
      assets.javascript.moment,
      assets.javascript.react,
      assets.javascript.vendors,
      assets.javascript.uvn,
    ];
  }
  return pageAssets;
}

/**
 * Gets the path to use for inline css if serving assets
 * from a CDN
 * @param {string} stylesPublicPath Webpack's public path for the given css asset
 * @returns {string}
 */
export function getInlineCssPath(stylesPublicPath) {
  if (exists(process.env.CDN_URL)) {
    // Removes the CDN_URL and the CDN_URL_OVERRIDE from the asset path.
    const cssNetworkPath = stylesPublicPath.replace(process.env.CDN_URL, '')
      .replace(process.env.CDN_URL_OVERRIDE, '');
    return `./build${cssNetworkPath}`;
  }
  return null;
}

/**
 * Helper to get page Component based on page type
 * @param {string} currentPage Actual page type
 * @returns {JSX}
 */
export function getPageComponent(currentPage) {
  const pageData = getPageData(Store);
  let componentSettings = pageFactoryComponents[contentTypes.ERROR_PAGE];
  let props = {};

  if (pageData) {
    const { data } = pageData;
    const shouldParseAds = [contentTypes.SECTION, contentTypes.SHOW].includes(currentPage);
    componentSettings = getKey(pageFactoryComponents, currentPage, componentSettings);
    props = {
      store: Store,
      page: data,
      widgets: shouldParseAds ? parseWidgetsWithAds(data) : parseWidgets(data),
    };
    // Additional prop for the Show component
    if (currentPage === contentTypes.SHOW) {
      props.staticWidgets = parseStaticWidgets(data);
    }
  }
  const Component = Loadable(componentSettings);
  return <Component {...props} />;
}
