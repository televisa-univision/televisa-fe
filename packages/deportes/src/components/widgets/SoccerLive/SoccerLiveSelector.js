import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists } from '@univision/fe-commons/dist/utils/helpers';

const MAX_LANDING_VISIBLE_ITEMS = 8;

/**
 * Group events by date
 * @param {Object} events - the soccer events list
 * @access private
 * @returns {string}
 */
const getEventsByDate = (events) => {
  const eventsByDate = new Map();
  events.forEach((e) => {
    if (e.date) {
      const eDay = new Date(e.date).getDate();
      if (eventsByDate.has(eDay)) {
        eventsByDate.get(eDay).events.push(e);
      } else {
        eventsByDate.set(eDay, { date: e.date, events: [e] });
      }
    }
  });

  return Array.from(eventsByDate, ([, event]) => event);
};

/**
 * Connector to be called when state change
 * @param {string} widgetId of the page
 * @param {Object} state  redux state
 * @returns {Oject}
 */
const getSoccerLiveExtradata = (widgetId, state) => {
  const widget = getWidgetById(state.page, widgetId);
  if (widget && exists(widget.extraData)) {
    return widget.extraData;
  }
  return {};
};

/**
* Connector to be called when state change
* @param {string} widgetId of the page
* @param {Object} state  redux state
* @returns {Oject}
*/
const selectSoccerLiveEvenData = (widgetId, state) => {
  const { events = [], ready } = getSoccerLiveExtradata(widgetId, state);
  const eventGroups = getEventsByDate(events);
  const maxItemsReached = events.length > MAX_LANDING_VISIBLE_ITEMS;
  return { ready, eventGroups, maxItemsReached };
};

export default selectSoccerLiveEvenData;
