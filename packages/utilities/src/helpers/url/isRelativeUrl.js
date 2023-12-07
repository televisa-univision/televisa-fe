/**
 * @module helpers/url/isRelativeUrl
 */

/**
 * Checks to see if given url is relative (i.e., without a host/protocol)
 * @param {string} url to test
 * @returns {bool} if url is relative
 */
export default function isRelativeUrl(url) {
  if (typeof url !== 'string') {
    return false;
  }
  return !/^(?:[a-z]+:|\/\/|[a-z]+\.)/i.test(url);
}
