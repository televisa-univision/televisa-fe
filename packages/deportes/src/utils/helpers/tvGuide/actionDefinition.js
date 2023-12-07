import Store from '@univision/fe-commons/dist/store/store';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Main action definition to be extended
 */
export default class ActionDefinition {
  /**
   * Active channel getter
   * @returns {string}
   */
  static get channel() {
    return getKey(Store.getState(), 'tvGuide.channel');
  }

  /**
   * Active date getter
   * @returns {Object}
   */
  static get date() {
    return getKey(Store.getState(), 'tvGuide.date');
  }

  /**
 * Helper to get two digits number
 * @param {number} number - Number to be formatted
 * @returns {string}
   */
  static makeTwoDigits(number) {
    return (`0${number}`).slice(-2);
  }

  /**
   * Hour reseter
   * @param {Object} date - Date to be reseted to cero hour
   * @returns {Object}
   */
  static resetHour(date) {
    const formatDate = new Date(date);
    return new Date(formatDate.setHours(0, 0, 0, 0)).toISOString();
  }

  /**
   * Domain getter
   */
  static get domain() {
    return getKey(Store.getState(), 'tvGuide.channel');
  }

  /**
   * Weekday getter
   */
  static get weekDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const { date } = this;
    const d = new Date(date);
    return days[d.getDay()];
  }

  /**
   * Helper to create unix time based on a x date (this api rely on weekday
   * so actual date is irrelevant)
   * to generate a time from a date like this '2018-12-17T00:24:00.000Z'
   * @param {string} hour - Hour to be used as reference
   * @returns {Object}
   */
  setUnixTime(hour) {
    let time = null;
    if (hour) {
      const hour24 = this.convertTo24(hour);
      if (hour24) {
        const { h, m } = hour24;
        time = new Date(this.constructor.date).setHours(h, m, 0, 0);
      }
    }
    return time;
  }

  /**
   * Helper to transform time format
   * @param {string} time12h - Time to convert
   * @returns {Object|null}
   */
  convertTo24(time12h) {
    const textSpaceSplit = time12h.split(' ');
    if (textSpaceSplit.length === 2) {
      const [time, modifier] = textSpaceSplit;
      const timeSplit = time.split(':');
      if (timeSplit.length === 2) {
        let changingHours = '';
        const [hours, minutes] = timeSplit;
        // eslint-disable-next-line
        changingHours = this.constructor.makeTwoDigits(hours);
        if (changingHours === '12') {
          changingHours = '00';
        }
        if (modifier === 'pm' || modifier === 'PM') {
          changingHours = parseInt(changingHours, 10) + 12;
        }
        return { h: changingHours, m: minutes };
      }
    }
    return null;
  }
}
