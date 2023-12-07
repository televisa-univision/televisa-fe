// eslint-disable-next-line import/no-cycle
import { cloneDeep, toRelativeUrl, isValidArray } from '..';
import { DEPORTES_DEFAULT_PATH, TUDN_DEFAULT_HOST } from '../../../constants/sites';

/**
 * Returns a relative URL or especial format for TUDN support
 * @param {string} url URL to perform convert
 * @returns {string}
 */
export function toMatchUrl(url) {
  const relativeUrl = toRelativeUrl(url);
  const domainRegExp = new RegExp(`${TUDN_DEFAULT_HOST}`);

  if (domainRegExp.test(url)) {
    return `${DEPORTES_DEFAULT_PATH}${relativeUrl}`;
  }
  return relativeUrl;
}

/**
 * Returns an array containing names of the tags in the hierarchy.
 * @param {Object} tagHierarchy Tag hierarchy
 * @returns {Array}
 */
export function getTagHierarchyNames(tagHierarchy) {
  if (isValidArray(tagHierarchy)) {
    return cloneDeep(tagHierarchy)
      .reverse()
      .map(tag => tag.name);
  }

  return [];
}

/**
 * Returns an array containing the URIs of the tags in the hierarchy.
 * @param {Object} tagHierarchy Tag hierarchy
 * @returns {Array}
 */
export function getTagHierarchyUri(tagHierarchy) {
  if (isValidArray(tagHierarchy)) {
    return cloneDeep(tagHierarchy)
      .reverse()
      .map(tag => toMatchUrl(tag.url || tag.uri));
  }

  return [];
}
