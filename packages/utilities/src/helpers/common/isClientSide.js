/**
 * @module helpers/common/isClientSide
 */

/**
 * Check if it's client side / browser
 * @returns {boolean} true is client side
 */
export default function isClientSide() {
  return typeof window !== 'undefined';
}
