/**
 * @module helpers/date/formatDigit
 */

/**
 * Formatting numbers as two digits
 * @param {number} digit number to format
 * @returns {string} the number if less than zero with an appended 0 before actual value
 * or returns just the number
 */
export default function getFormattedDigit(digit) {
  const value = parseInt(digit, 10);
  return value < 10 ? `0${value}` : `${value}`;
}
