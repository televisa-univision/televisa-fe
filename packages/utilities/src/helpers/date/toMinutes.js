/**
 * @module helpers/date/toMinutes
 */
import formatDigit from '../number/formatDigit';

/**
 * Convert to human readable time mm:ss
 * @param {number} [number=0] - time to perform conversion, only support seconds
 * @returns {string} value in human readable time format
 */
export default function toMinutes(number = 0) {
  const value = parseInt(number, 10) || 0;
  const valMin = Math.floor(value / 60);
  const valSec = value - valMin * 60;
  return `${valMin}:${formatDigit(valSec)}`;
}
