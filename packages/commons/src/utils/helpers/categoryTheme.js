import * as categories from '../../constants/pageCategories';
import contentTypes from '../../constants/contentTypes.json';
import portalThemes from './taxonomy/portalThemes';
// eslint-disable-next-line import/no-cycle
import deportes from './taxonomy/deportes';
// eslint-disable-next-line import/no-cycle
import famosos from './taxonomy/famosos';
// eslint-disable-next-line import/no-cycle
import entretenimiento from './taxonomy/entretenimiento';
// eslint-disable-next-line import/no-cycle
import networks from './taxonomy/networks';
// eslint-disable-next-line import/no-cycle
import noticias from './taxonomy/noticias';
// eslint-disable-next-line import/no-cycle
import programas from './taxonomy/programas';
// eslint-disable-next-line import/no-cycle
import univision from './taxonomy/univision';

import { types as matcherTypes } from './taxonomy/matchers/Matcher';
// eslint-disable-next-line import/no-cycle
import { matchPortalTheme } from './taxonomy/matchers';
// eslint-disable-next-line import/no-cycle
import {
  cleanUrl,
  cloneDeep,
  exists,
  getKey,
  isInArray,
  isValidArray,
  toRelativeUrl,
} from '.';
// eslint-disable-next-line import/no-unresolved
import { TELEVISA_SITES } from '../../constants/sites';
import getTelevisaCategory from './televisaCategoryTheme';

/**
 * Taxonomy per "Vertical"
 * @type {Object}
 */
export const verticals = {
  ...entretenimiento,
  ...famosos,
  ...networks,
  ...noticias,
  ...deportes,
  ...programas,
  ...univision,
};

/**
 * Returns the page category based on:
 * 1. Custom logic (vertical-specific logic). This will override any configuration
 * 2. Portal theme
 * 3. Tag hierarchy
 * 4. Page uri
 * @param   {Object} data page data from api
 * @param   {string} page.reqPath the request path
 * @param   {string} page.site request site name
 * @returns {string} the category
 */
export default function getPrimaryCategory(data = {}, { reqPath, site } = {}) {
  // Remove last slash to return the same page category
  // for request with or without slash
  const path = cleanUrl(reqPath);

  // Televisa Sites logic
  if (TELEVISA_SITES.includes(site)) {
    return getTelevisaCategory(data, site, path);
  }

  // Custom logic
  let pageCategory = Object
    .keys(verticals)
    .find((key) => {
      return verticals[key].some(matcher => (
        matcher.type === matcherTypes.CUSTOM && matcher.match({
          data,
          key,
          path,
          site,
        })
      ));
    });

  // The custom logic overrides all, so we need to return the category if we found one
  if (pageCategory) {
    return pageCategory;
  }

  // Search page
  if (data.type === contentTypes.SEARCH_PORTAL) {
    return categories.SEARCH;
  }

  // Portal theme
  pageCategory = Object
    .keys(portalThemes)
    .find((name) => {
      return matchPortalTheme().match({ data, portalTheme: portalThemes[name] });
    });

  // Brandable type
  if (data.radioStation) {
    return categories.RADIO;
  }

  // TODO: if you need modify this the next time create a custom matcher
  // @see: taxonomy/matchers/custom
  if (data.type === contentTypes.LIVE_STREAM) {
    switch (data?.vertical?.toLowerCase()) {
      case categories.LOCAL:
        return categories.LOCAL_LIVESTREAM;
      case categories.SPORTS:
        return categories.SPORTS_LIVESTREAM;
      case categories.NEWS:
        if (data?.isDigitalChannelLiveStream) {
          return categories.DIGITAL_CHANNEL;
        }
        return categories.LIVESTREAMS;
      default:
        return categories.LIVESTREAMS;
    }
  }

  if (data.tvStation) {
    return categories.TV;
  }

  // Radio content should keep the radio category, regardless the tag hierarchy
  // Same case for local-tv category
  if (isInArray(pageCategory, [categories.RADIO, categories.TV])) {
    // If it is a local content (radio or tv) promoted in a national context
    if (data.type !== contentTypes.SECTION && !data.radioStation
      && !data.tvStation && isValidArray(data.hierarchy)) {
      const rootSection = toRelativeUrl(getKey(data, 'hierarchy.0.uri'));
      // Use `Noticias` for TV content promoted in national sections
      if (rootSection === '/local') {
        return categories.NEWS;
      }
    }

    return pageCategory;
  }

  // Tag Hierarchy
  if (exists(data) && isValidArray(data.tagHierarchy)) {
    const tagHierarchy = cloneDeep(data.tagHierarchy);
    tagHierarchy.reverse().some((tag) => {
      return Object
        .keys(verticals)
        .some((key) => {
          const match = verticals[key].some(matcher => (
            matcher.type === matcherTypes.TAG_HIERARCHY && matcher.match({ data, tag, site })
          ));
          if (match) {
            pageCategory = key;
          }
          return match;
        });
    });
  }

  // Page uri
  pageCategory = Object
    .keys(verticals)
    .find((key) => {
      return verticals[key].some(matcher => (
        matcher.type === matcherTypes.PAGE_URI && matcher.match({
          data,
          key,
          path,
          site,
        })
      ));
    }) || pageCategory; // Fallback to the previous category

  return pageCategory;
}
