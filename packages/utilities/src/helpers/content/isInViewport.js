/**
 * @module helpers/content/isInViewport
 */
import isValidObject from '../common/isValidObject';

/**
 * Returns true if the element is in the viewport
 * @param {Node} element DOM element to check
 * @param {number} bottom position of the element to check against in the viewport
 * @param {number} top position of the element to check against in the viewport
 * @returns {boolean}
 */
export default function isInViewport(element, bottom = 0, top) {
  if (typeof window === 'undefined' || !isValidObject(element)) {
    return false;
  }
  const bounds = { ...element?.getBoundingClientRect() };
  return bounds.top < (top || window.innerHeight) && bounds.bottom > bottom;
}
