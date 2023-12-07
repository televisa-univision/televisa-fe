/**
 * @module helpers/date/getTimeLeft
 */

/**
 * Get time left between two dates
 * @param {Date} futureDate - future date object to perform comparison
 * @param {Date} currentDate - current date object to perform comparison
 * @returns {number} the number of milliseconds between the two dates
 */
export default function getTimeLeft(futureDate, currentDate) {
  if (!(futureDate instanceof Date && currentDate instanceof Date)) {
    return 0;
  }
  return futureDate.getTime() - currentDate.getTime();
}
