/**
 * @module helpers/url/toRelativeUrl
 */

/**
 * Converts an absolute URL to a relative one
 * @param {string} absoluteUrl Url to be converted
 * @returns {string}
 */
export default function toRelativeUrl(absoluteUrl) {
  if (typeof absoluteUrl === 'string' && absoluteUrl.length > 0) {
    const noDomainUrlRegexp = /^.*\/\/[^/]+/;
    return absoluteUrl.replace(noDomainUrlRegexp, '') || '/';
  }
  return null;
}
