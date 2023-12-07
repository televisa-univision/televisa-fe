/**
 * @module helpers/string/toCamelCase
 */
import isValidString from '../common/isValidString';

import toCapitalize from './toCapitalize';

/**
 * Convert string to camel case
 * @see https://en.wikipedia.org/wiki/Camel_case
 * @param {string} value - an text/string to convert
 * @returns {string}
 */
export default function toCamelCase(value) {
  if (value === null || typeof value === 'undefined') {
    return '';
  }
  if (!isValidString(value)) {
    return value;
  }

  const rsLower = '[a-z\\xdf-\\xf6\\xf8-\\xff]';
  const rsUpper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]';
  const rsOptContrLower = "(?:['’](?:d|ll|m|re|s|t|ve))?";
  const rsAscii = `${rsUpper}?${rsLower}+${rsOptContrLower}(?=${rsUpper}|$)`;
  const reAsciiWord = RegExp(`${rsAscii}|[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+`, 'g');
  const words = value.match(reAsciiWord);

  if (!Array.isArray(words)) {
    return '';
  }

  return words.reduce((result, val, index) => {
    const word = val.toLowerCase();
    return result + (index ? toCapitalize(word) : word);
  }, '');
}
