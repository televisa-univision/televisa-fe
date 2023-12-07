import { TV_GUIDE_FETCH_UDN_EVENTS } from '@univision/fe-commons/dist/store/actions/tvguide/action-tv-guide-types';
import { SHOWS, UDN_EVENT, NETWORK_UDN } from '@univision/fe-commons/dist/constants/tvGuide';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import request from '@univision/fe-commons/dist/utils/api/request';
import { getShowUrl } from '..';
import showURls from './showURLs.json';
import ActionDefinition from './actionDefinition';

/**
 * UDN action definition
 */
class UdnActionDefinition extends ActionDefinition {
  /**
   * Regex to detect am / pm hours
   */
  timeRegEx = /\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/;

  /**
   * Default image for shows without one
   */
  defaultImage = 'https://cdn3.uvnimg.com/07/06/bac3bf6b4d09bc2383772e377c4c/udn-guide-default.png';

  /**
   * Removing empty keys
   * @param {array} events - Events to be cleaned
   * @returns {array}
   */
  static sanitizeEvents(events) {
    let validEvents = [];
    if (events && typeof events === 'object') {
      const eventsKeys = Object.keys(events);
      validEvents = eventsKeys.filter(key => key !== '' && events[key] !== '');
    }
    return validEvents;
  }

  /**
   * Duration calculator
   * @param {number} keyUnixTime - Current unix time
   * @param {number} nextKey - Next unix time
   * @returns {number}
   */
  static getDuration(keyUnixTime, nextKey) {
    let nextKeyUnixTime = nextKey;
    // if this is the last event (Add 30min)
    if (!nextKeyUnixTime) { nextKeyUnixTime = Math.round(new Date().setHours(23, 59, 59, 999)); }
    return ((nextKeyUnixTime - keyUnixTime) / 60000);
  }

  /**
   * Helper to sanitize string
   * @param {string} str - String to be cleaned
   * @returns {string}
   */
  static cleanString(str) {
    return str.replace(/ *\([^)]*\) */g, '');
  }

  /**
   * Action definition to be concatenated
   * @returns {Function}
   */
  get action() {
    const uri = this.buildFetchUrl();
    const instance = new UdnActionDefinition();
    return uri !== ''
      ? () => ({
        type: TV_GUIDE_FETCH_UDN_EVENTS,
        payload: this.getRequest(),
        // Aditional parameter to be used in reducer
        meta: {
          instance,
        },
      })
      : () => null;
  }

  /**
   * Request promise definition
   */
  async getRequest() {
    const uri = this.buildFetchUrl();
    const response = await request({ uri, params: {} });
    return response;
  }

  /**
   * Extractor to be used on action reducer
   * @param {Object} data - Data received after fetching
   * @returns {*}
     */
  extractor(data) {
    let events = [];
    if (isValidArray(data)) {
      events = this.getEventsByDate(this.formatEvents(data));
    }
    return events;
  }

  /**
   * Helper to adapt event to stantard format
   * @param {array} events - Events to be formatted
   * @returns {array}
   */
  formatEvents(events) {
    const formattedEvents = {};
    events.forEach((event) => {
      const weekEvents = [];
      const eventKeys = this.constructor.sanitizeEvents(event);
      if (isValidArray(eventKeys)) {
        eventKeys.sort((a, b) => {
          return this.setUnixTime(a) - this.setUnixTime(b);
        }).forEach((key, index) => {
          if (this.timeRegEx.test(key) && event[key]) {
            const unixTime = this.setUnixTime(key);
            const showTitle = this.constructor.cleanString(event[key]);
            const image = this.getShowImage(showTitle);
            const eachEvent = {
              content: event[key],
              hour: key,
              date: new Date(unixTime).toISOString(),
              time: unixTime,
              // using show image filter to define event type
              type: image === this.defaultImage ? UDN_EVENT : SHOWS,
              d: this.constructor.getDuration(unixTime, this.setUnixTime(eventKeys[index + 1])),
              isLive: this.checkIfLive(key, eventKeys[index + 1]),
              image,
              url: getShowUrl(showTitle),
            };
            weekEvents.push(eachEvent);
          }
          if (key === 'TIME') {
            formattedEvents[event[key]] = weekEvents;
          }
        });
      }
    });
    return formattedEvents;
  }

  /**
   * Parsing to get weekdat event
   * @param {Object} weekEvents - All events
   * @returns {array}
   */
  getEventsByDate(weekEvents) {
    const { weekDay } = this.constructor;
    let events = [];
    if (weekEvents[weekDay]) {
      events = weekEvents[weekDay];
    }
    return events;
  }

  /**
   * Duration calculator
   * @param {number} key - Current unix time
   * @param {number} nextKey - Next unix time
   * @returns {number}
   */
  checkIfLive(key, nextKey) {
    const now = new Date();
    const nowTime = now.getTime();
    const nowReset = now.setHours(0, 0, 0, 0);
    const storeDate = new Date(this.constructor.date).setHours(0, 0, 0, 0);
    const keyUnixTime = this.setUnixTime(key);
    const nextKeyUnixTime = this.setUnixTime(nextKey);
    return (
      // if today
      nowReset === storeDate
      // if this is the last event
      && ((keyUnixTime && nowTime >= keyUnixTime && !nextKeyUnixTime)
      || (keyUnixTime && nextKeyUnixTime && nowTime >= keyUnixTime && nowTime < nextKeyUnixTime))
    );
  }

  /**
   * Helper to build the request url
   * @returns {string}
   */
  buildFetchUrl() {
    const { channel } = this.constructor;
    let url = '';
    if (channel === NETWORK_UDN) {
      let domain = '';
      const cmsContent = '/udn-tv-guide';
      if (getKey(global, 'window.location.host') && window.location.host.match(/localhost:60[0-9]+/)) {
        // point to another side only in local storybook
        domain = 'http://localhost:8080';
      }
      url = `${domain}${cmsContent}`;
    }
    return url;
  }

  /**
   * Helper to get show url
   * @param {string} show - show title to find image url for
   * @returns {string}
   */
  getShowImage(show) {
    const showImage = showURls.find(obj => obj.title === show) || {};
    return getKey(showImage, 'img') || this.defaultImage;
  }
}

export default new UdnActionDefinition();
