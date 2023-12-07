import {
  hasKey, getKey, isValidArray,
} from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import { proxySelector } from '../../selectors/page-selectors';

/**
 * Get & store soccer events data
 * @param {Object} widgetData of the widget
 * @param {Object} extractor for the data
 * @returns {Object}
 */
export default function getEvents(widgetData, extractor) {
  const settings = getKey(widgetData, 'settings', {});
  let matchId = '';

  if (hasKey(widgetData, 'settings.matchId')) {
    ({ matchId } = widgetData.settings);
  }

  return async (dispatch, getState) => {
    try {
      // Get soccer events
      const state = getState();
      const proxyUri = proxySelector(state);
      const response = await fetchSportApi({
        uri: `/v1/commentary/soccer/${matchId}`,
        proxyUri,
      });
      if (!settings.uid) {
        return;
      }
      if (hasKey(response, 'sports-content')) {
        const events = extractor(response);
        if (isValidArray(events)) {
          // SSR limit
          const limit = 10;
          let eventList = events;
          if (typeof window === 'undefined') {
            eventList = events.slice(0, limit);
          }
          const extraData = {
            events: eventList,
            eventStatus: getKey(response, 'sports-content.sports-event.event-metadata.event-status', ''),
          };
          dispatch(setWidgetExtraData(settings.uid, extraData));
        }
      } else {
        dispatch(setWidgetExtraData(settings.uid, { error: response || true }));
      }
    } catch (error) {
      dispatch(setWidgetExtraData(settings.uid, { error }));
    }
  };
}
