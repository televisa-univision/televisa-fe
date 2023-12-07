/**
 * @module helpers/string/toCapitalizeWord
 */
import isValidString from '../common/isValidString';

import toCapitalize from './toCapitalize';

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 * @example
 * ('hello word' -> 'Hello Word')
 * @param {string} str - the string to convert
 * @returns {string} the start cased string
 */
export default function capitalizeWord(str) {
  if (!isValidString(str)) {
    return '';
  }

  return str.replace(/\w\S*/g, toCapitalize);
}
