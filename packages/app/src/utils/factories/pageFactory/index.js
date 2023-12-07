import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import {
  getKey,
  isValidArray,
} from '@univision/fe-commons/dist/utils/helpers';

import {
  bundleNameMapping,
  contentTypeComponents,
  layoutsComponents,
} from './pageFactoryComponents';

/**
 * Helper to change page type to match bundle name if necessary.
 * Webpack bundle names are generated as camelCase. Content types from the API
 * come all lowercase (even when there are two words). For content types with
 * only one word, everything is fine. But, for content types with two words,
 * like "liveblog", we need to map the name to the camelCase bundle name
 * "liveBlog". Also, there are special cases where one content type from the API
 * maps to a specific custom type (see slideshow for an example).
 * @param {Object} data the page data
 * @param {string} data.type page content type
 * @param {string} data.uri the requested path/URL
 * @returns {string}
 */
export function mapPageTypeToBundleName(data) {
  if (!data?.type) {
    return null;
  }
  // TODO: require refactor
  // this switch case is pretty redundant
  switch (data.type) {
    case contentTypes.ARTICLE:
      return contentTypes.ARTICLE;

    case contentTypes.COMPETITION:
    case contentTypes.LEAGUE:
    case contentTypes.SECTION:
    case contentTypes.SOCCER_COMPETITION:
    case contentTypes.SOCCER_TEAM:
      if (isValidArray(data?.staticWidgets)) {
        return contentTypes.SHOW;
      }
      return data.sectionType === contentTypes.RADIO_STATION
        ? contentTypes.SECTION_RADIO
        : contentTypes.SECTION;

    case contentTypes.LIVE_BLOG:
      return bundleNameMapping[contentTypes.LIVE_BLOG];

    case contentTypes.LIVE_STREAM:
      return bundleNameMapping[contentTypes.LIVE_STREAM];

    case contentTypes.RAWHTML:
      return contentTypes.RAWHTML;

    case contentTypes.SEARCH_PORTAL:
      return contentTypes.SEARCH;

    case contentTypes.SLIDESHOW:
    case contentTypes.SLIDESHOW_REACTIONS:
      return contentTypes.SLIDESHOW;

    case contentTypes.SOCCER_MATCH:
      return contentTypes.SOCCER_MATCH;

    case contentTypes.VIDEO:
      return contentTypes.VIDEO;

    case contentTypes.SOCCER_PERSON:
      return contentTypes.SOCCER_PERSON;

    default:
      return contentTypes.TAG;
  }
}

/**
 * Helper to get content type Component based on page type
 * @param {Object} pageData from api data
 * @returns {function(): JSX}
 */
export function getContentTypeComponent(pageData) {
  const contentType = mapPageTypeToBundleName(pageData);
  const Component = getKey(
    contentTypeComponents,
    contentType,
  );

  return Component;
}

/**
 * Helper to get page layout Component based on page type
 * @param {Object} pageData from api data
 * @param {string} site current page site name
 * @returns {function(): JSX}
 */
export function getLayoutComponent(pageData, site) {
  const Component = getKey(
    layoutsComponents,
    pageData?.type,
    layoutsComponents[site],
  );
  return Component;
}

/**
 * Get page layout and content type components
 * @param {Object} pageData from api data
 * @param {string} site current page site name
 * @returns {Object}
 */
export function getPageComponents(pageData, site) {
  return {
    Layout: getLayoutComponent(pageData, site),
    ContentType: getContentTypeComponent(pageData),
  };
}
