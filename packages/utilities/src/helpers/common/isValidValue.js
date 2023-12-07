/**
 * @module helpers/common/isValidValue
 */

/**
 * Determines if given value is not undefined, null, or ''.
 * If the value is a number, it determines if it is not NaN.
 * @param {*} value value to test
 * @returns {boolean}
 */
export default function isValidValue(value) {
  return !(typeof value === 'undefined' || value === null || value === ''
           || (typeof value === 'number' && Number.isNaN(value)));
}
