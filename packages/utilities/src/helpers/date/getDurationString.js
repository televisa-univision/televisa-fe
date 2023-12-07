/**
 * @module helpers/date/getDurationString
 */
import isValidValue from '../common/isValidValue';

import formatDuration from './formatDuration';

/**
 * Gets and returns the duration of a video in string format
 * @param {number|Object} params to extract duration from
 * @returns {string} video duration
 */
export default function getDurationString(params = null) {
  if (!isValidValue(params)) return null;
  const paramsType = typeof params;
  let duration;

  switch (paramsType) {
    case 'number':
      /**
       * Typically, if `params` is a `number`, it is most likely passed from a component
       * that has received it's data from the Video SDK and will need to be converted to
       * a string with proper formatting
       */
      duration = formatDuration(params);
      break;
    case 'object':
      /**
       * Typically, if `params` is an `object`, it is most likely passed directly from
       * the Web API response containing an already properly formatted `durationString` prop,
       * however we will not assume this and will check to see if it needs to be formatted anyway
       */
      duration = formatDuration((params?.duration || params?.durationString || null));
      break;
    case 'string':
      duration = params;
      break;
    default:
      /**
       * If unsupported, return null so `DurationLabel` will render nothing
       */
      duration = null;
      break;
  }
  return duration;
}
