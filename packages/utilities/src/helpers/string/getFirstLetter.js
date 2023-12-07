/**
 * @module helpers/string/getFirstLetter
 */
import isValidString from '../common/isValidString';

/**
 * get first letter of string
 * @example
 * ('hello' -> 'h')
 * @param {string} str - string to transform
 * @returns {string}
 */
export default function getFirstLetter(str) {
  if (!isValidString(str)) {
    return '';
  }
  return str.replace(/[^a-zA-Z]/g, '').charAt(0);
}
