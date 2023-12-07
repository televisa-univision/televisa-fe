import getKey from '@univision/fe-utilities/helpers/object/getKey';

import { hasKey } from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import {
  proxySelector,
  requestParamsSelector,
  userLocationSelector,
} from '../../selectors/page-selectors';
import * as messages from '../../../constants/messages';
import { MX } from '../../../constants/userLocation';

/**
 * Get & store scorecells data
 * @param {Object} widgetData of the widget
 * @param {Object} extractor for the data
 * @returns {Object}
 */
export default function getScoreCells(widgetData, extractor) {
  const settings = getKey(widgetData, 'settings', {});
  const isWorldCupMVP = getKey(widgetData, 'widgetContext.isWorldCupMVP', false);
  const uri = '/v1/score-cells/soccer';
  const competitionKey = getKey(widgetData, 'settings.soccerCompetitionSeason.soccerCompetition.id', null);
  return async (dispatch, getState) => {
    try {
      // get score cell
      const state = getState();
      const debug = requestParamsSelector(state)?.debug || false;
      const proxyUri = proxySelector(state);
      const userLocation = userLocationSelector(state);
      const isMX = userLocation === MX;
      const response = await fetchSportApi({
        uri,
        params: {
          debug,
          ...(competitionKey && { competitionKey }),
        },
        proxyUri,
      });

      if (!settings.uid) {
        return;
      }

      if (hasKey(response, 'sports-content')) {
        dispatch(
          setWidgetExtraData(
            widgetData.settings.uid,
            extractor(response, false, isWorldCupMVP && isMX)
          )
        );
      } else if (hasKey(response, 'statusText') && response.statusText === messages.NOT_FOUND) {
        dispatch(setWidgetExtraData(settings.uid, []));
      } else {
        dispatch(setWidgetExtraData(settings.uid, { error: response || true }));
      }
    } catch (error) {
      if (hasKey(error, 'response.status')) {
        // Client side fetch
        error.statusCode = error.response.status;
      }
      if (error.statusCode === 404) {
        dispatch(setWidgetExtraData(settings.uid, []));
        return;
      }
      dispatch(setWidgetExtraData(settings.uid, { error }));
    }
  };
}
