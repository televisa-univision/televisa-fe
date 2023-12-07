/**
 * @module helpers/url/isAbsoluteUrl
 */
import isRelativeUrl from './isRelativeUrl';

/**
 * Checks to see if given url is ABSOLUTe (i.e., with a host/protocol)
 * @param {string} url to test
 * @returns {bool} if url is ABSOLUTE, not relative
 */
export default function isAbsoluteUrl(url) {
  return !isRelativeUrl(url);
}
