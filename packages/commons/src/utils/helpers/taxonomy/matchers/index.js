import Matcher, { types } from './Matcher';
// eslint-disable-next-line import/no-cycle
import {
  getKey,
  arrayIncludes,
  isValidArray,
} from '../..';
// eslint-disable-next-line import/no-cycle
import { toMatchUrl } from '../helpers';

const MX_PATH = '/mx';
/**
 * Returns a Matcher which traverses the tagHierarchy to find a tag's url equals to
 * the expected one.
 * @deprecated BEX don't support tag hierarchy, use {@link matchPageUri} instead.
 * @param {string} expectedTagUrl Expected tag URL
 * @returns {Matcher}
 */
export function matchTagUri(expectedTagUrl) {
  return new Matcher(types.TAG_HIERARCHY, ({ tag }) => {
    const tagUrl = toMatchUrl(getKey(tag, 'url') || getKey(tag, 'uri'));
    const cleanUrl = tagUrl?.replace(MX_PATH, '');
    return !!(cleanUrl && cleanUrl.endsWith(expectedTagUrl));
  });
}

/**
 * Returns a Matcher which compares the page uri with the expected one.
 * @param {string} expectedPageUrl Expected page URL
 * @returns {Matcher}
 */
export function matchPageUri(expectedPageUrl) {
  return new Matcher(types.PAGE_URI, ({ data }) => {
    const cleanUrl = getKey(data, 'uri', '').replace(MX_PATH, '');
    const uri = toMatchUrl(cleanUrl) || false;
    return (
      uri
      && arrayIncludes(uri.split('/'), expectedPageUrl.split('/'))
    );
  });
}

/**
 * Find if the page uri includes the expected path
 * @param {string} expectedPath - Expected path
 * @returns {Matcher}
 */
export function matchIncludesPath(expectedPath) {
  return new Matcher(types.PAGE_URI, ({ data }) => {
    const cleanUrl = getKey(data, 'uri', '').replace(MX_PATH, '');
    const uri = toMatchUrl(cleanUrl);

    if (!uri) {
      return false;
    }

    const uriSplit = uri.split('/').filter(item => item !== '' && item !== '*');
    const expectedPageUrlSplit = expectedPath.split('/').filter(item => item !== '' && item !== '*');

    let match = false;
    expectedPageUrlSplit.forEach((path) => {
      if (uriSplit.includes(path)) {
        match = true;
      }
    });

    return (uri && match);
  });
}

/**
 * Returns a Matcher which compares the page uri with the expected one.
 * @param {string} expectedPageUrl Expected page URL
 * @returns {Matcher}
 */
export function matchExactPageUri(expectedPageUrl) {
  return new Matcher(types.CUSTOM, ({ data }) => {
    const cleanUrl = getKey(data, 'uri', '').replace(MX_PATH, '');
    const uri = toMatchUrl(cleanUrl) || false;
    return (
      uri
      && uri === expectedPageUrl
    );
  });
}

/**
 * Returns a Matcher which compares the page portal theme with the expected one
 * @returns {Matcher}
 */
export function matchPortalTheme() {
  return new Matcher(types.PORTAL_THEME, ({ portalTheme, data }) => {
    const { vertical, hierarchy, analyticsData } = data || {};
    const portal = vertical || getKey(analyticsData, 'web.common.uci_division');
    const hierarchyUri = isValidArray(hierarchy) && toMatchUrl(hierarchy[0].uri);
    return (typeof portal === 'string' && portalTheme.indexOf(portal.toLowerCase()) !== -1)
      || portalTheme.indexOf(hierarchyUri) !== -1;
  });
}
