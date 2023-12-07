/**
 * @module helpers/string/toKebabCase
 */
import isValidString from '../common/isValidString';

/**
 * Converts string to kebab case
 * @see https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
 * @param {string} value - the string to convert.
 * @returns {string}
 */
export default function toKebabCase(value) {
  if (!isValidString(value)) {
    return '';
  }

  return value?.normalize?.('NFD')
    ?.replace(/[\u0300-\u036f]+|['"]+|^-+|-+$/gi, '')
    ?.trim()
    ?.replace(/\W+|(-+)/g, '-')
    ?.toLowerCase() ?? value;
}
