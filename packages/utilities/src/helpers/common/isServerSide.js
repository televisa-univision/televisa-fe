/**
 * @module helpers/common/isServerSide
 */

/**
 * Check if it's server side / node.js
 * @returns {boolean} true is server side
 */
export default function isServerSide() {
  return typeof process !== 'undefined' && !!process.versions && !!process.versions.node;
}
