/**
 * @module helpers/date/formatDateWithSeparator
 */
import getFormattedDigit from '../number/formatDigit';
import isValidString from '../common/isValidString';

/**
 * Helper for formatting date with separator in DD/MM/YYYY format
 * from YYYY-MM-DD format
 * @param {string} date Date string
 * @param {string} separator type of separator for the date
 * @returns {string} formatted date with separator (ie: '18/03/2018¡)
 */
export default function formatDateWithSeparator(date, separator = '/') {
  if (!isValidString(date)) {
    return '';
  }
  if (!date.match(new RegExp(/^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/))) {
    return '';
  }
  const dob = new Date(date);

  const day = getFormattedDigit(dob.getUTCDate());
  const month = getFormattedDigit(dob.getMonth() + 1);
  const year = dob.getFullYear();

  return `${day}${separator}${month}${separator}${year}`;
}
