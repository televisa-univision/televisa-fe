import {
  getKey,
  isValidArray,
  isValidString,
  toRelativeUrl,
} from '../helpers';
import * as contentTypes from '../../constants/contentTypes';
import * as subNavTypes from '../../constants/subNavTypes';
import mvpdAllowedTypes from './data/mvpdAllowedTypes';
import temasTypes from './data/temasTypes';
import Brandable from '../brandable';
import VERTICAL_HOME_LIST, { VERTICAL_TELEVISA_LIST } from '../../constants/verticals';

/**
 * Retrieves the header title
 * @param {Object} data of the page
 * @returns {string} title for the header
 */
export function getHeaderTitle(data) {
  const {
    parent = {},
    title,
    type,
  } = data || {};

  let headerTitle = title;
  if (type !== contentTypes.SECTION && parent && parent.title) {
    headerTitle = parent.title;
  }

  return headerTitle;
}

/**
 * Returns true if (data.type) page type is a temas type
 * @param {string} type content type of the data provided
 * @returns {bool} true if (data.type) page type is a temas type
 */
export function isTemasPage(type = '') {
  return temasTypes.includes(type);
}

/**
 * Retrieves the sub nav type to be loaded
 * @param {string} type Page type
 * @returns {string} type Sub nav type of header
 */
export function getSubNavType(type) {
  if (type === contentTypes.SECTION || isTemasPage(type)) return subNavTypes.SECTION_SUBNAV;
  return subNavTypes.CONTENT_SUBNAV;
}

/**
 * Returns path of the first element available in the tag hierarchy,
 * if not available it will fallback to current uri
 * @param {Object} tagHierarchy from page data
 * @returns {string} absolute path of the first element in the hierarchy
 */
export function getActivePath({ tagHierarchy = [], uri } = {}) {
  if (isValidArray(tagHierarchy)) {
    const url = getKey(tagHierarchy, '0.uri', null);
    return url;
  }

  return uri || null;
}

/**
 * Retrieves the header link
 * @param {Object} data of the page
 * @returns {string} link for the header
 */
export function getHeaderLink(data = {}) {
  const {
    hierarchy,
    type,
    uri,
    parent,
  } = data;

  const parentUri = toRelativeUrl(getKey(parent, 'uri', uri));
  if (!isValidArray(hierarchy)) return parentUri;

  // For non sections (articles/slideshows) Header Link will always be the
  // root of the vertical
  const rootUri = toRelativeUrl(hierarchy[0].uri);
  if (type !== contentTypes.SECTION && rootUri !== '/') return rootUri;

  return parentUri;
}

/**
 * Returns whether the active page is a Content page or not
 * @param {string} type Type of page from page.data.type
 * @returns {bool} is content?
 */
export function isContentSubNav(type) {
  return type === subNavTypes.CONTENT_SUBNAV;
}

/**
 * Returns flag to whether render or not the MVPD bar, depending on the content type
 * and if that type is in the list of allowed types to render it.
 * @param {string} type content type of the data provided
 * @returns {bool} true if provided type is part of the allowed types list
 */
export function shouldRenderMvpd({ type = '' } = {}) {
  return mvpdAllowedTypes.includes(type);
}

/**
 * Returns true if the page is a vertical home
 * @param {string} uri uri override to read directly
 * @returns {boolean}
 */
export function isVerticalHomeByUri(uri) {
  return VERTICAL_HOME_LIST.includes(toRelativeUrl(uri));
}

/**
 * Returns true if the page is a vertical home
 * @param {string} uri uri override to read directly
 * @returns {boolean}
 */
export function isVerticalTelevisaByUri(uri) {
  return VERTICAL_TELEVISA_LIST.some(value => new RegExp(value).test(uri));
}

/**
 * Get the {@link Brandable} from state data
 * @param {Object} data of the page
 * @returns {Brandable}
 */
export function getBrandable(data) {
  return new Brandable(data);
}

/**
 * Helper to collect TUDN coverage level
 * @param {Object} data from api
 * @returns {string}
 */
export function getTudnCoverage(data = {}) {
  const coverage = data?.coverage
        || getKey(data?.league, 'coverage')
        || getKey(data?.soccerCompetitionSeason, 'league.coverage')
        || getKey(data?.soccerCompetition, 'league.coverage');
  if (!isValidString(coverage)) {
    return null;
  }
  return coverage;
}

/**
 * Helper to collect competition brackets support
 * @param {Object} data from api
 * @returns {string}
 */
export function getBracketsSupport(data = {}) {
  return getKey(data.soccerCompetitionSeason, 'soccerCompetition.hasBracketsSupport') || false;
}
