/**
 * @module helpers/date/getDaysDiff
 */

/**
 * Get number of days between two dates
 * @param {number} initialTime initial date timestamp
 * @param {number} endTime final date timestamp
 * @returns {number}
 */
export default function getDaysDiff(initialTime, endTime) {
  return (endTime - initialTime) / (1000 * 3600 * 24);
}
