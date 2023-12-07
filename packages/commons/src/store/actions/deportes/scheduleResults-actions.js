import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';

import { checkMatchStatus, getMappedEventStatus } from '../../../utils/video';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import {
  configSelector, pageSelector, proxySelector, userLocationSelector,
} from '../../selectors/page-selectors';

const PROD_SYNDICATOR = 'https://syndicator.univision.com';

/**
 * Get & store soccer event data
 * @param {Object} widgetData of the widget
 * @param {Function} extractor for extract the soccer match data
 * @param {string} matchId the soccer match event ID
 * @param {Object} options extra options
 * @returns {Promise<Object>}
 */
export default function getScheduleEvent(
  widgetData,
  extractor,
  matchId,
  options = { insertInContent: false }
) {
  const settings = getKey(widgetData, 'settings', {});
  const eventId = matchId || settings.matchId;
  settings.uid = !isValidObject(settings) ? getKey(widgetData, 'widgetContext.id', '') : settings.uid;
  const { insertInContent, contentId, widgetId } = options;
  return async (dispatch, getState) => {
    try {
      if (!settings.uid) {
        return;
      }
      const state = getState();
      const { data } = pageSelector(state);
      const userLocation = userLocationSelector(state);
      const config = configSelector(state);
      if (!eventId) {
        const hasSoccerData = isValidObject(data?.soccerCompetitionSeason);
        const errorData = { error: new Error('Missing required params') };
        const extraData = hasSoccerData ? extractor(data) : errorData;
        if (userLocation === 'MX' && data?.broadcastEvent && data?.uid && hasSoccerData) {
          checkMatchStatus(eventId, ({
            broadcastStatus,
          }) => {
            const eventStatus = getMappedEventStatus(broadcastStatus);
            dispatch(setWidgetExtraData(settings.uid, { ...extraData, status: eventStatus }));
          },
          null,
          data?.uid,
          isValidObject(data?.broadcastEvent),
          false,
          false,
          config?.syndicator?.uri || PROD_SYNDICATOR);
        } else {
          dispatch(setWidgetExtraData(settings.uid, extraData));
        }
        return;
      }

      const proxyUri = proxySelector(state);
      const response = await fetchSportApi({
        uri: `/v1/schedule-results/soccer/${eventId}`,
        proxyUri,
      });

      if (hasKey(response, 'sports-content')) {
        if (insertInContent) {
          dispatch(setWidgetExtraData(widgetId, extractor(response), { contentId }));
        } else {
          dispatch(setWidgetExtraData(settings.uid, extractor(response)));
        }
      } else {
        dispatch(setWidgetExtraData(settings.uid, { error: response || true }));
      }
    } catch (error) {
      if (hasKey(error, 'response.status')) {
        // Client side fetch
        error.statusCode = error.response.status;
      }
      dispatch(setWidgetExtraData(settings.uid, { error }));
    }
  };
}
