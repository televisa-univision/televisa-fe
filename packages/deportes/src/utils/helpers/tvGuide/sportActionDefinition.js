import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import Store from '@univision/fe-commons/dist/store/store';
import { TV_GUIDE_FETCH_SPORT_EVENTS } from '@univision/fe-commons/dist/store/actions/tvguide/action-tv-guide-types';
import { SPORT } from '@univision/fe-commons/dist/constants/tvGuide';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import ActionDefinition from './actionDefinition';

/**
 * Sport action definition
 */
class SportActionDefinitionClass extends ActionDefinition {
  /**
   * Special date getter
   * @returns {Object}
   */
  get date() {
    return this.constructor.resetHour(getKey(Store.getState(), 'tvGuide.date'));
  }

  /**
   * End date getter
   * @returns {Object}
   */
  get endDate() {
    const { date } = this;
    const nextDateObj = new Date(date).setDate(new Date(date).getDate() + 1);
    return this.constructor.resetHour(nextDateObj);
  }

  /**
   * Action definition to be concatenated
   * @returns {Function}
     */
  get action() {
    const instance = new SportActionDefinitionClass();
    return () => ({
      type: TV_GUIDE_FETCH_SPORT_EVENTS,
      payload: fetchSportApi(this.buildFetchUrl()),
      // Aditional parameter to be used in reducer
      meta: {
        instance,
      },
    });
  }

  /**
   * Extractor to be used on action reducer
   * @param {Object} data - Data received after fetching
   * @returns {*}
     */
  extractor(data) {
    let events;
    try {
      events = matchesExtractor(data);
    } catch (e) {
      events = [];
    }
    return this.tagEvents(events);
  }

  /**
   * Helper to include event type and time to each event
   * @param {array} events - Events list
   * @returns {Array}
     */
  tagEvents(events) {
    let taggedEvents = [];
    if (isValidArray(events)) {
      const eventsByChannel = this.getEventsByChannel(events);
      if (eventsByChannel.length) {
        taggedEvents = eventsByChannel.map((item) => {
          const newItem = { ...item };
          newItem.type = SPORT;
          const date = new Date(item.date);
          const time = date.getTime();
          if (!Number.isNaN(time)) {
            newItem.time = time;
          }
          return newItem;
        });
      }
    }
    return taggedEvents;
  }

  /**
   * Events filter
   * @param {array} events - Events list
   * @returns {array}
   */
  getEventsByChannel(events) {
    const { channel } = this.constructor;
    let eventsByChannel = [];
    if (isValidArray(events)) {
      eventsByChannel = events.filter(
        event => isValidArray(event.channels) && event.channels.includes(channel)
      );
    }
    return eventsByChannel;
  }

  /**
   * Helper to construct url
   * @returns {string}
   */
  buildFetchUrl() {
    const { date, endDate } = this;
    let fetchUrl = '/v1/schedule-results/soccer?sort=start-date-time-asc&limit=100&livestreamEnabled=true&featuredEvent=true&featuredOrLive=true';
    fetchUrl += `&startDate=${encodeURIComponent(date)}`;
    fetchUrl += `&endDate=${encodeURIComponent(endDate)}`;
    return fetchUrl;
  }
}

const instance = new SportActionDefinitionClass();
export { instance as default, SportActionDefinitionClass };
