/**
 * @module helpers/date/is24HoursAgo
 */

/**
 * Helper to see if a date is from 24 hours ago
 * @param {Date} date Date object instance
 * @returns {bool} true if provided date is past 24 hours
 */
export default function is24HoursAgo(date) {
  const now = new Date().getTime();
  const update = new Date(date);
  update.setDate(date.getDate() + 1);
  return now > update;
}
