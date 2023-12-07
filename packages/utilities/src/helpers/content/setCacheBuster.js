/**
 * @module helpers/content/setCacheBuster
 */
import isValidString from '../common/isValidString';

/**
 * Generates a cache buster for urls
 * @param {string} url - url to add cache buster
 * @param {number} [intervalPerHour = 4] - determine how many times the buster
 * will be applied in an hour
 * @param {number} [index = 0] - loop index
 * @returns {?string}
 */
export default function setCacheBuster(url, intervalPerHour = 4, index = 0) {
  if (!isValidString(url)) return null;

  const range = (60 / intervalPerHour) * (index + 1);
  const now = new Date();

  const checkUrlParams = url.includes('?') ? `${url}&` : `${url}?`;

  if (now.getMinutes() <= range) {
    return `${checkUrlParams}${now.getHours()}${index}`;
  }

  return setCacheBuster(url, intervalPerHour, index + 1);
}
