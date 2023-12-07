/**
 * @module helpers/date/formatLocalTime
 */
import localization from '../../localization';
import isValidString from '../common/isValidString';

const WEEKENDS = ['saturday', 'sunday'];

/**
 * dayOfWeek transform
 * @param {string} dayOfWeek day of the  week to  translate
 * @returns {?{day: string, abbreviatedDay: string}}
 */
export function dayOfWeekTransform(dayOfWeek) {
  const dayKey = dayOfWeek?.toLowerCase();
  const abbr = dayOfWeek?.substr(0, 3);
  return {
    day: localization.get(dayKey),
    abbreviatedDay: localization.get(`${dayKey}Abbreviated`, { fallback: abbr }),
    isWeekend: WEEKENDS.includes(dayKey),
  };
}

/**
 * month of the year transform, locale is not supported in all browsers
 * @param {string} month - month of the year
 * @returns {?{month: string, abbreviatedMonth: string}} { month: string, abbreviatedMonth: string}
 */
export function monthTransform(month) {
  const monthKey = month?.toLowerCase();
  const abbr = month?.substr(0, 3);

  return {
    month: localization.get(monthKey),
    abbreviatedMonth: localization.get(`${monthKey}Abbreviated`, { fallback: abbr }),
  };
}

/**
 * Format date string to a object date representation with locale date/time
 * @param {Object} options - object with options
 * @param {string} [options.date] - string with a valid time format
 * @param {string} [options.timeZone] - date time zone
 * @param {string} [options.useMilitary = false] - date time zone
 * @param {string} [options.useOneDigitForHours = false] - date time zone
 * @returns {?Object} `{
 * day: string,
 * month: {
 *  month: string,
 *  abbreviatedMonth: string
 * },
 * time: string,
 * weekDay: {
 *  day: string,
 *  abbreviatedDay: string
 * }}`
 */
export default function formatLocalTime(options) {
  const {
    date,
    timeZone: tz,
    useMilitary = false,
    useOneDigitForHours = false,
  } = options || {};

  if (date && !isValidString(date)) return null;

  const localDate = date ? new Date(date) : new Date();
  const timeUTC = localDate.getTime();
  const locale = 'en-US';
  let timeZone = tz;
  let time;

  if (Number.isNaN(timeUTC) || !localDate.toLocaleTimeString) {
    return null;
  }

  const timeOpts = {
    hour: useOneDigitForHours ? 'numeric' : '2-digit',
    minute: '2-digit',
    hour12: !useMilitary,
  };
  const dayOpts = {
    day: 'numeric',
    weekday: 'long',
  };
  const monthOpts = {
    month: 'long',
  };

  try {
    // try to use with timeZone
    // if fail as fallback run the same without timeZone,
    // if fail again that means the browser is pretty old
    // and we not support it
    time = localDate.toLocaleTimeString(locale, { timeZone, ...timeOpts });
  } catch (err) {
    timeZone = undefined;
    time = localDate.toLocaleTimeString(locale, timeOpts);
  }
  const [day, weekDay] = localDate.toLocaleString(locale, { timeZone, ...dayOpts }).split(' ');
  const month = localDate.toLocaleString(locale, { timeZone, ...monthOpts });

  return {
    day,
    month: monthTransform(month),
    time: time.toLowerCase(),
    timeUTC,
    weekDay: dayOfWeekTransform(weekDay),
  };
}
