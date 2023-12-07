/**
 * @module styled/mixins/mediaRange
 */
import isValidValue from '../../helpers/common/isValidValue';
import { APP_BREAKPOINTS } from '../constants';

/**
 * Creates a media query for a specific range
 * @param {number|string} min Lower end of the range
 * @param {number|string} max Higher end of the range
 * @param {string} rules to be applied to this media query
 * @returns {string}
 */
export default function mediaRange (min, max, rules) {
  const minBp = APP_BREAKPOINTS[min] || min;
  const maxBp = APP_BREAKPOINTS[max] || max;

  // Check that ranges are valid numbers and positive numbers
  if (!(isValidValue(minBp) && minBp >= 0) || !(isValidValue(maxBp) && maxBp >= 0)) return '';

  return `@media only screen and (max-width: ${maxBp}px) and (min-width: ${minBp}px) {${rules}}`;
}
