/**
 * @module helpers/common/isValidArray
 */

/**
 * Helper to determine if array is valid and not valid
 * @param {Array} array to be checked
 * @returns {boolean}
 */
export default function isValidArray(array) {
  return Array.isArray(array) && array.length > 0;
}
