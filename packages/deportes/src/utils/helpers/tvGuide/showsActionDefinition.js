import { TV_GUIDE_FETCH_SHOWS_EVENTS } from '@univision/fe-commons/dist/store/actions/tvguide/action-tv-guide-types';
import {
  NETWORK_GALAVISION,
  NETWORK_UNIMAS,
  NETWORK_UNIVISION,
  GALAVISION_FETCH_URL,
  UNIMAS_FETCH_URL,
  UNIVISION_FETCH_URL,
  SHOWS,
} from '@univision/fe-commons/dist/constants/tvGuide';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import request from '@univision/fe-commons/dist/utils/api/request';
import { getShowUrl } from '..';
import ActionDefinition from './actionDefinition';

/**
 * Shows action definition
 */
class ShowsActionDefinition extends ActionDefinition {
  /**
   * Helper to include event type and time to each event
   * @param {array} events - Events list
   * @returns {Array}
   */
  static tagEvents(events) {
    let taggedItems = [];
    if (isValidArray(events)) {
      taggedItems = events.map((event) => {
        const newEvent = { ...event };
        newEvent.type = SHOWS;
        const date = getKey(event, 'sl');
        const time = new Date(date).getTime();
        if (!Number.isNaN(time)) {
          newEvent.time = time;
        }
        newEvent.url = getShowUrl(newEvent.e);

        return newEvent;
      });
    }
    return taggedItems;
  }

  /**
   * Action definition to be concatenated
   * @returns {Function}
     */
  get action() {
    const uri = this.buildFetchUrl();
    const instance = new ShowsActionDefinition();
    return uri !== ''
      ? () => ({
        type: TV_GUIDE_FETCH_SHOWS_EVENTS,
        payload: request({ uri }),
        // Aditional parameter to be used in reducer
        meta: {
          instance,
        },
      })
      : () => null;
  }

  /**
   * Extractor to be used on action reducer
   * @param {Object} data - Data received after fetching
   * @returns {*}
   */
  extractor(data) {
    const items = getKey(data, [0, 'items'], []);
    return this.constructor.tagEvents(items);
  }

  /**
   * Helper to build url
   * something like: https://neulionsmbnyc-a.akamaihd.net/u/univisionnow2/epg/export/univisionny/2018/12/04.json
   * @returns {string}
     */
  buildFetchUrl() {
    const { date, channel, makeTwoDigits } = this.constructor;
    const urlByChannel = {
      [NETWORK_GALAVISION]: GALAVISION_FETCH_URL,
      [NETWORK_UNIMAS]: UNIMAS_FETCH_URL,
      [NETWORK_UNIVISION]: UNIVISION_FETCH_URL,
    };
    let fetchUrl = '';
    const dateObj = new Date(date);
    const channelUrl = urlByChannel[channel];
    if (channelUrl) {
      const day = makeTwoDigits(dateObj.getDate());
      const month = makeTwoDigits(Number(makeTwoDigits(dateObj.getMonth())) + 1);
      const year = dateObj.getFullYear();
      fetchUrl += `${channelUrl}/${year}/${month}/${day}.json`;
    }
    return fetchUrl;
  }
}

export default new ShowsActionDefinition();
