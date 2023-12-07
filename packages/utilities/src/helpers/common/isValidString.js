/**
 * @module helpers/common/isValidString
 */

/**
 * Determines if passed value is a sting.
 * @param {any} maybeString - value that needs to be validated
 * @returns {boolean} - returns true if value is a string, false otherwise
 */
export default function isValidString(maybeString) {
  return typeof maybeString === 'string';
}
