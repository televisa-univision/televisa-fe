/**
 * @module helpers/url/getSiteDomainFromHref
 */

import isValidString from '../common/isValidString';
import isValidObject from '../common/isValidObject';

/**
 * Get site domain from current href link from a provided site list
 * @param {string} href - url to get domain from
 * @param {Object} sites - list of available sites
 * @returns {string}
 */
export default function getSiteDomainFromHref(href, sites) {
  if (!isValidObject(sites) || !isValidString(href)) {
    return null;
  }

  const siteName = Object.keys(sites).find(
    site => href.includes(site)
  );

  return siteName ? sites[siteName] : null;
}
