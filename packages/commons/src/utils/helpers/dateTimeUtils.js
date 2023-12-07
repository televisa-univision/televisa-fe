import localization from '../localization/LocalizationManager';
import { getKey, isValidString, isValidArray } from '.';

/**
 * Helper for creating a formatted date string
 * @param {date} d Date object
 * @param {string} lang Language (only supports English 'en' and Spanish 'es')
 * @param {string} timeZone Time zone to use, defaults to America/New_York. Will be ignored in
 *                          unsupported browsers.
 * @returns {string} Spanish formatted date (ie: '18 Jul | 06:29 EDT')
 */
export function formatDate(d, lang = 'es', timeZone = 'America/New_York') {
  let month;
  let order;

  switch (lang) {
    case 'es':
      month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      order = `${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`;
      break;
    default:
      month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      order = `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
  let time = '';
  // Try using time zone, will throw an exception in unsupported browsers
  try {
    time = d.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone,
      timeZoneName: 'short',
    });
  } catch (e) {
    // Uses the default time zone
    time = d.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    });
  }

  return `${order} – ${time}`;
}

/**
 * Helper for formatting numbers as two digits
 * @param {number} digit number to format
 * @returns {string} the number if less than zero with an appended 0 before actual value
 * or returns just the number
 */
export function getFormattedDigit(digit) {
  return digit < 10 ? `0${digit}` : `${digit}`;
}

/**
 * Helper for creating a objetc whit date info for days, hours, minutes and seconds
 * @param {number} time in milliseconds
 * @returns {Object} Object formatted as
 * {d: daysRemaining, h: hoursRemaining, m: minutesRemaining, s: secondsRemaining}
 */
export function getTimeRemaining(time) {
  if (time > 0) {
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    days = getFormattedDigit(days);
    hours = getFormattedDigit(hours);
    minutes = getFormattedDigit(minutes);
    seconds = getFormattedDigit(seconds);
    return [
      {
        title: 'Días',
        number: days,
      },
      {
        title: 'Hrs',
        number: hours,
      },
      {
        title: 'Mins',
        number: minutes,
      },
      {
        title: 'Segs',
        number: seconds,
      },
    ];
  }
  return [
    {
      title: 'Días',
      number: '00',
    },
    {
      title: 'Hrs',
      number: '00',
    },
    {
      title: 'Mins',
      number: '00',
    },
    {
      title: 'Segs',
      number: '00',
    },
  ];
}

/**
 * Helper for getting time left between two dates
 * @param {date} futureDate Date object
 * @param {date} currentDate Date object
 * @returns {number} the number of milliseconds between the two dates
 */
export function getTimeLeft(futureDate, currentDate) {
  return futureDate.getTime() - currentDate.getTime();
}

/**
 * convert number of seconds to human readable time mm:ss
 * @param   {number} [_seconds=0] [description]
 * @returns {[type]}              [description]
 */
export function secondsToMinutes(_seconds = 0) {
  const minutes = Math.floor(_seconds / 60);
  const seconds = _seconds - minutes * 60;
  return `${minutes}:${getFormattedDigit(seconds)}`;
}

/**
 * Returns duration in properly formatted string
 * @param {number|string} duration to convert if necessary
 * @returns {string} duration
 */
export function formatDuration(duration) {
  const durType = typeof duration;
  const supportedTypes = ['number', 'string'];
  if (!supportedTypes.includes(durType)) return null;
  return durType === 'number' ? secondsToMinutes(duration) : duration;
}

/**
 * Gets and returns the duration of a video in string format
 * @param {number|Object} params to extract duration from
 * @returns {string} video duration
 */
export function getDurationString(params = null) {
  if (params === null) return null;
  const paramsType = typeof params;
  let duration;

  switch (paramsType) {
    case 'number':
      /**
       * Typically, if `params` is a `number`, it is most likely passed from a component
       * that has received it's data from the Video SDK and will need to be converted to
       * a string with proper formatting
       */
      duration = formatDuration(params);
      break;
    case 'object':
      /**
       * Typically, if `params` is an `object`, it is most likely passed directly from
       * the Web API response containing an already properly formatted `durationString` prop,
       * however we will not assume this and will check to see if it needs to be formatted anyway
       */
      duration = formatDuration(getKey(params, 'duration', getKey(params, 'durationString'), null));
      break;
    case 'string':
      duration = params;
      break;
    default:
      /* If unsupported, return null so `DurationLabel` will render nothing */
      duration = null;
      break;
  }
  return duration;
}

/**
 * Returns a 12 hour time from 24 hour time input.
 * @param {string} time - 24 hour formatted time string.
 * @returns {string} 12 hour time string in format of hh:mm A
 */
export function convertMilitaryTime(time) {
  if (!time) {
    return '';
  }
  let [hour, min] = time.split`:`;
  if (!hour && !min) return '';

  const part = hour >= 12 && +hour !== 24 ? 'pm' : 'am';
  min = min.concat('').length === 1 ? `0${min}` : min;
  hour = hour > 12 ? hour - 12 : hour;
  hour = hour.toString().length === 1 ? `0${hour}` : hour;
  return (`${hour}:${min} ${part}`);
}

/**
 * Returns a 24 hour time from 12 hour time input.
 * @param {string} time - 12 hour formatted time string.
 * @param {string} meridiem - AM or PM formatted.
 * @returns {string} 24 hour time string in format of hh:mm A
 */
export function convertStandardTime(time, meridiem) {
  const timeValid = time && time.match(/([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])/g);
  const meridiemValid = meridiem && meridiem.match(/([AP][M])/g);
  if (!timeValid && !meridiemValid) {
    return '';
  }
  const timeSplit = time.split(':');
  let hour = timeSplit[0];
  const min = timeSplit[1];
  const seg = timeSplit[2] || '00';
  if (meridiem === 'PM') {
    hour = parseInt(hour, 10);
    hour += 12;
  }
  if (!hour || !min) {
    return '';
  }
  return (`${hour}:${min}:${seg}`);
}

/**
 * dayOfWeek transform
 * @param {string} dayOfWeek day of the  week to  translate
 * @returns {?{day: string, abbreviatedDay: string}}
 */
export function dayOfWeekTransform(dayOfWeek) {
  if (!isValidString(dayOfWeek)) return null;

  switch (dayOfWeek.toUpperCase()) {
    case 'MONDAY':
      return {
        day: localization.get('monday'),
        abbreviatedDay: localization.get('mondayAbbreviated'),
      };
    case 'TUESDAY':
      return {
        day: localization.get('tuesday'),
        abbreviatedDay: localization.get('tuesdayAbbreviated'),
      };
    case 'WEDNESDAY':
      return {
        day: localization.get('wednesday'),
        abbreviatedDay: localization.get('wednesdayAbbreviated'),
      };
    case 'THURSDAY':
      return {
        day: localization.get('thursday'),
        abbreviatedDay: localization.get('thursdayAbbreviated'),
      };
    case 'FRIDAY':
      return {
        day: localization.get('friday'),
        abbreviatedDay: localization.get('fridayAbbreviated'),
      };
    case 'SATURDAY':
      return {
        day: localization.get('saturday'),
        abbreviatedDay: localization.get('saturdayAbbreviated'),
      };
    case 'SUNDAY':
      return {
        day: localization.get('sunday'),
        abbreviatedDay: localization.get('sundayAbbreviated'),
      };
    default:
      return {};
  }
}

/**
 * month of the year transform, locale is not supported in all browsers
 * @param {string} month - month of the year
 * @returns {?{month: string, abbreviatedMonth: string}} { month: string, abbreviatedMonth: string}
 */
export function monthTransform(month) {
  if (!isValidString(month)) return null;

  switch (month.toUpperCase()) {
    case 'JANUARY':
      return {
        month: localization.get('january'),
        abbreviatedMonth: localization.get('januaryAbbreviated'),
      };
    case 'FEBRUARY':
      return {
        month: localization.get('february'),
        abbreviatedMonth: localization.get('februaryAbbreviated'),
      };
    case 'MARCH':
      return {
        month: localization.get('march'),
        abbreviatedMonth: localization.get('marchAbbreviated'),
      };
    case 'APRIL':
      return {
        month: localization.get('april'),
        abbreviatedMonth: localization.get('aprilAbbreviated'),
      };
    case 'MAY':
      return {
        month: localization.get('may'),
        abbreviatedMonth: localization.get('mayAbbreviated'),
      };
    case 'JUNE':
      return {
        month: localization.get('june'),
        abbreviatedMonth: localization.get('juneAbbreviated'),
      };
    case 'JULY':
      return {
        month: localization.get('july'),
        abbreviatedMonth: localization.get('julyAbbreviated'),
      };
    case 'AUGUST':
      return {
        month: localization.get('august'),
        abbreviatedMonth: localization.get('augustAbbreviated'),
      };
    case 'SEPTEMBER':
      return {
        month: localization.get('september'),
        abbreviatedMonth: localization.get('septemberAbbreviated'),
      };
    case 'OCTOBER':
      return {
        month: localization.get('october'),
        abbreviatedMonth: localization.get('octoberAbbreviated'),
      };
    case 'NOVEMBER':
      return {
        month: localization.get('november'),
        abbreviatedMonth: localization.get('novemberAbbreviated'),
      };
    case 'DECEMBER':
      return {
        month: localization.get('december'),
        abbreviatedMonth: localization.get('decemberAbbreviated'),
      };
    default:
      return {};
  }
}

/**
 * localTimeFormat
 * @param {Object} options - object with options
 * @param {string} [options.date] - string with a valid time format
 * @param {string} [options.timeZone] - date time zone
 * @param {string} [options.useMilitary = false] - date time zone
 * @param {string} [options.useOneDigitForHours = false] - date time zone
 * @returns {?{
 * day: string,
 * month: {
 *  month: string,
 *  abbreviatedMonth: string
 * },
 * time: string,
 * weekDay: {
 *  day: string,
 *  abbreviatedDay: string
 * }}}
 */
export function localTimeFormat(options) {
  const {
    date,
    timeZone,
    useMilitary = false,
    useOneDigitForHours = false,
  } = options || {};
  if (date && !isValidString(date)) return null;

  const localDate = date ? new Date(date) : new Date();
  const timeUTC = localDate.getTime();
  const year = localDate.getFullYear();
  if (Number.isNaN(timeUTC)) {
    return null;
  }

  let minutes = localDate.toLocaleTimeString('en-US', {
    timeZone,
    minute: '2-digit',
  }).toLowerCase();
  minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  let hours = localDate.toLocaleTimeString('en-US', {
    timeZone,
    hour: '2-digit',
    hour12: false,
  }).toLowerCase();
  hours = parseInt(hours, 10);
  let part = '';

  if (!useMilitary) {
    part = hours >= 12 && hours < 24 ? ' pm' : ' am';
    hours = hours > 12 ? hours - 12 : hours;
  }

  if (!useOneDigitForHours) {
    hours = hours.toString().length === 1 ? `0${hours}` : hours;
  }
  // local is not supported in all browsers
  const weekDay = localDate.toLocaleString('en-US', {
    timeZone,
    weekday: 'long',
  });

  const month = localDate.toLocaleString('en-US', {
    timeZone,
    month: 'long',
  });
  const day = localDate.toLocaleString('en-US', {
    timeZone,
    day: 'numeric',
  });

  return {
    day,
    month: monthTransform(month),
    time: `${hours}:${minutes}${part}`,
    timeUTC,
    weekDay: dayOfWeekTransform(weekDay),
    year,
  };
}

/**
 * day Of Week (name)
 * @param {string} date Date()
 * @returns {string}
 */
export function nameDay(date) {
  if (!(date instanceof Date)) return null;
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  return days[date.getDay()];
}

/**
 * getTimeZone
 * @param {string} date date
 * @returns {string}
 */
export function getTimeZone(date) {
  if (!(date instanceof Date)) return null;
  return date.toLocaleTimeString('en-us', { timeZoneName: 'short' }).match(/[A-Z]{3,4}/)[0];
}

/**
 * Func check if the card should be rendered regarding the schedules
 * @param {Array} schedules list of schedules
 * @param {Date} date Fixed date to override the current
 * @returns {boolean}
 */
export const shouldRenderBySchedule = (schedules) => {
  if (!isValidArray(schedules)) return false;
  let shouldRender = false;
  const allowedAbbrs = {
    EST: 'US/Eastern',
    EDT: 'US/Eastern',
    CST: 'US/Central',
    CDT: 'US/Central',
    PST: 'US/Pacific',
    PDT: 'US/Pacific',
  };
  shouldRender = false;
  const now = new Date();
  const day = nameDay(now);
  const userTzAbbr = getTimeZone(now);
  schedules.forEach((schedule) => {
    // Check if the event is paused for the editor
    const pauseEvent = getKey(schedule, 'pauseEvent', false);
    if (pauseEvent) return;
    // Check if the user time zone is allowed
    const timeZone = getKey(schedule, 'timeZone', false);
    if (allowedAbbrs[userTzAbbr] !== timeZone) return;
    const nowDate = now.getTime();
    const from = getKey(schedule, 'startDate');
    const to = getKey(schedule, 'endDate');
    // Check if today is in range (startDate and endDate)
    if (nowDate >= from && nowDate <= to) {
      const daysToGoLive = getKey(schedule, 'daysToGoLive');
      if (!isValidArray(daysToGoLive) || !daysToGoLive.includes(day)) return;
      // Formats the date and time to validate
      const st = getKey(schedule, 'startTime');
      const stMeridiem = getKey(schedule, 'startMeridiem');
      const stStandard = convertStandardTime(st, stMeridiem).match(/([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])/g);
      let startTime = now.setHours('0', '00', '00');
      if (stStandard) {
        const stSplit = stStandard[0].split(':');
        startTime = now.setHours(stSplit[0], stSplit[1], stSplit[2]);
      }
      let endTime = now.setHours('23', '59', '59');
      const et = getKey(schedule, 'endTime');
      const etMeridiem = getKey(schedule, 'endMeridiem');
      const etStandard = convertStandardTime(et, etMeridiem).match(/([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])/g);
      if (etStandard) {
        const etSplit = etStandard[0].split(':');
        endTime = now.setHours(etSplit[0], etSplit[1], etSplit[2]);
      }
      // It adds one day to end Time If the end time is before that start time
      if (startTime > endTime) {
        const OnDayInMiliseconds = 1000 * 60 * 60 * 24;
        endTime += OnDayInMiliseconds;
      }
      // Check if the current time is in range to render the proper card
      /* istanbul ignore next */
      if (nowDate > startTime && nowDate < endTime) shouldRender = true;
    }
  });
  return shouldRender;
};

/**
 * Returns UTC Date time
 * @param {Object} date Datetime object
 * @returns {Object}
 */
export const getUTCDatetime = (date) => {
  if (date instanceof Date) {
    return new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  }
  return null;
};

/**
 * Compares dates to return the most recent one
 * @param {Date} maxDate cumulative most recent date
 * @param {Date} curDate current date to compare
 * @returns {Date}
 */
export const getMostRecentDate = (maxDate, curDate) => {
  if (curDate > maxDate) {
    return curDate;
  }
  return maxDate;
};

/**
 * Transform date to ISO 8601 - PT1H23M45S
 * @param {string} time - time format 1:23:45
 * @returns {string}
 */
export function getISOdate(time) {
  const timeData = time.split(':');

  switch (timeData.length) {
    case 3:
      return `PT${timeData[0]}H${timeData[1]}M${timeData[2]}S`;
    case 2:
      return `PT${timeData[0]}M${timeData[1]}S`;
    case 1:
    default:
      return `PT${timeData[0]}S`;
  }
}
