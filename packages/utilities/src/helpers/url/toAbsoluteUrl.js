/**
 * @module helpers/url/toAbsoluteUrl
 */
import isRelativeUrl from './isRelativeUrl';

/**
 * Converts a relative URL to an absolute one
 * @param {string} uri Potential relative URL that needs converting
 * @param {string} domain Domain to use on the absolute URL
 * @returns {string}
 */
export default function toAbsoluteUrl(uri, domain) {
  if (typeof uri !== 'string') {
    return null;
  }
  // Only make absolute a relative url
  if (!isRelativeUrl(uri) || typeof domain !== 'string') {
    return uri;
  }

  // Removes trailing slash from domain
  const realDomain = domain.endsWith('/')
    ? domain.slice(0, -1)
    : domain;

  if (uri === '/') {
    return realDomain || uri;
  }
  if (uri.startsWith('/')) {
    return `${realDomain}${uri}`;
  }
  return `${realDomain}/${uri}`;
}
