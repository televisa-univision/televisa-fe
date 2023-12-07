/**
 * @module helpers/string/toDeburr
 */
import isValidString from '../common/isValidString';

/**
 * Convert Latin-1 Supplement and Latin Extended-A letters to
 * basic Latin letters and removing combining diacritical marks.
 * @param {string} string - the string to be sanitized
 * @param {Object} [options] - deburr option variation
 * @param {boolean} [options.lowercase=false] - return the deburred string in lowercase
 * @returns {string} returns the sanitized string or an empty string if param was invalid
 */
export default function toDeburr(string, { lowercase = false } = {}) {
  if (!isValidString(string)) return '';

  const deburr = string?.normalize?.('NFD')?.replace(/[\u0300-\u036f]/g, '') ?? string;
  return lowercase ? deburr.toLowerCase() : deburr;
}
