/**
 * Method to format number to string format with K ex 1000 -> 1.0K
 * @module helpers/number/shortenLargeNumber
 * @param {number} num number to format
 * @returns {number} number formated with K
 */
export default function shortenLargeNumber(num) {
  const newNum = Math.abs(num);
  if (newNum > 999) {
    return `${(newNum / 1000).toFixed(1)}K`;
  }
  return newNum;
}
