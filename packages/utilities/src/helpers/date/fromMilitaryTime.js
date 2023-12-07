/**
 * @module helpers/date/fromMilitaryTime
 */

/**
 * Returns a 12 hour time from 24 hour time input.
 * @param {string} time - 24 hour formatted time string.
 * @returns {string} 12 hour time string in format of hh:mm A
 */
export default function fromMilitaryTime(time) {
  if (!(/\d{1,2}:\d{1,2}/.test(time))) {
    return '';
  }
  try {
    const date = new Date(`1 January 1970 ${time}`);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).toLowerCase();
  } catch (err) {
    return time;
  }
}
