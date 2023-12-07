import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import { TV_GUIDE_FETCH_SPORT_EVENTS } from '@univision/fe-commons/dist/store/actions/tvguide/action-tv-guide-types';
import { SPORT } from '@univision/fe-commons/dist/constants/tvGuide';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import { SportActionDefinitionClass } from './sportActionDefinition';

/**
 * Sport action definition
 */
class AgendaDefinition extends SportActionDefinitionClass {
  /**
   * Helper to include event type and time to each event
   * @param {array} events - Events list
   * @returns {Array}
    */
  static tagEvents(events) {
    let taggedEvents = [];
    if (isValidArray(events)) {
      taggedEvents = events.map((item) => {
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
    return taggedEvents;
  }

  /**
   * End date getter
   * @returns {Object}
   */
  get endDate() {
    const { date } = this;
    const nextDateObj = new Date(date).setDate(new Date(date).getDate() + 3);
    return this.constructor.resetHour(nextDateObj);
  }

  /**
 * Action definition to be concatenated
 * @returns {Function}
   */
  get action() {
    const instance = new AgendaDefinition();
    return () => ({
      type: TV_GUIDE_FETCH_SPORT_EVENTS,
      payload: fetchSportApi(this.buildFetchUrl()),
      // Additional parameter to be used in reducer
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
    return this.constructor.tagEvents(events);
  }
}

export default new AgendaDefinition();
