/**
 * @module helpers/common/isValidNumber
 */

/**
 * Validates if the number is a valid.
 * @param {number|string} value - value that needs to be validated
 * @returns {boolean} - if condition satisfy return true else returns false.
 */
export default function isValidNumber(value) {
  if (typeof value === 'number') {
    return value - value === 0;
  }
  if (typeof value === 'string' && value.trim()) {
    return Number.isFinite ? Number.isFinite(+value) : global.window.isFinite(+value);
  }
  return false;
}
