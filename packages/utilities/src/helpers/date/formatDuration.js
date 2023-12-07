/**
 * @module helpers/date/formatDuration
 */
import toMinutes from './toMinutes';

/**
 * Returns duration in properly formatted string
 * @param {number|string} duration to convert if necessary
 * @returns {string} duration
 */
export default function formatDuration(duration) {
  const durType = typeof duration;
  const supportedTypes = ['number', 'string'];
  if (!supportedTypes.includes(durType)) return null;
  return durType === 'number' ? toMinutes(duration) : duration;
}
