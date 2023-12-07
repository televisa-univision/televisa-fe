import timeAgoStringsEs from 'react-timeago/lib/language-strings/es';
import timeAgoStringsEn from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

/**
 * Round up a number every given interval
 * @param {number} number Number to round up
 * @param {number} interval Interval
 * @returns {number}
 */
export function roundUpEvery(number, interval) {
  return Math.ceil(number / interval) * interval;
}

/**
 * Returns the current seconds according to the universal time (ignoring any local timezone).
 * You can specify an interval to round the seconds.
 * @param {number} interval Interval
 * @returns {number}
 */
export function getSeconds(interval = 0) {
  const seconds = new Date().getUTCSeconds();
  return interval ? roundUpEvery(seconds, interval) : seconds;
}

/**
 * Returns the current minutes according to the universal time (ignoring any local timezone).
 * You can specify an interval to round the minutes.
 * @param {number} interval Interval
 * @returns {number}
 */
export function getMinutes(interval = 0) {
  const minutes = new Date().getUTCMinutes();
  return interval ? roundUpEvery(minutes, interval) : minutes;
}

/**
 * Returns the current hours according to the universal time (ignoring any local timezone).
 * You can specify an interval to round the hours.
 * @param {number} interval Interval
 * @returns {number}
 */
export function getHours(interval = 0) {
  const hours = new Date().getUTCHours();
  return interval ? roundUpEvery(hours, interval) : hours;
}

/**
 * Returns the current timestamp accordint to the universal time (ignoring any local timezone).
 * You can specify the intervals to round the hours/seconds/minutes
 * @param {Object} intervals Interval
 * @param {boolean} includeMilliseconds Include milliseconds
 * @returns {number}
 */
export function getTimestamp(
  { hoursInterval = 0, minutesInterval = 0, secondsInterval = 0 } = {},
  includeMilliseconds = true
) {
  const date = new Date();
  if (hoursInterval) {
    date.setUTCHours(getHours(hoursInterval));
  }

  if (minutesInterval) {
    date.setUTCMinutes(getMinutes(minutesInterval));
  }

  if (secondsInterval) {
    date.setUTCSeconds(getSeconds(secondsInterval));
  }

  if (!includeMilliseconds) {
    date.setUTCMilliseconds(0);
  }

  return date.getTime();
}

/**
 * Get the correct language time ago component formatter
 * @param {string} lang current language
 * @returns {Object} time ago formatter with corresponding language
 */
export function getTimeAgoStrings(lang) {
  const timeAgoStrings = lang === 'es' ? timeAgoStringsEs : timeAgoStringsEn;
  return timeAgoStrings;
}

/**
 * Return the formatter with the corresponding language
 * @param {string} lang current language
 * @returns {Function}
 */
export function getTimeAgoFormatter(lang) {
  const strings = getTimeAgoStrings(lang);
  return buildFormatter(strings);
}
