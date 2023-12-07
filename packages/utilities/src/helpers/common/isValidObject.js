/**
 * @module helpers/common/isValidObject
 */

/**
 * Helper to determine if object is valid and not valid
 * @param {Object} obj object to be checked
 * @returns {boolean}
 */
export default function isValidObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  return Object.keys(obj).length > 0;
}
