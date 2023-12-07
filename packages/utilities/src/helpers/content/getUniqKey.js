/**
 * @module helpers/content/getUniqKey
 */

/**
 * Generates a unique ID
 * @param {*} prefix - the identifier prefix to append to it
 * @returns {string}
 */
export default function getUniqKey(prefix) {
  return `${prefix || 'key'}${Date.now()}${Math.random().toString(36).substr(2, 10)}`;
}
