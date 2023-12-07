/**
 * @module helpers/string/toCapitalize
 */
import isValidString from '../common/isValidString';

/**
 * Capitalize first letter of string
 * @example
 * ('hello word' -> 'Hello word')
 * @param {string} str - string to transform
 * @returns {string} the capitalize string
 */
export default function toCapitalize(str) {
  if (!isValidString(str)) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
