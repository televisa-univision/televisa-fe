import {
  hasKey, getKey, isValidString,
} from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import { proxySelector } from '../../selectors/page-selectors';

const GROUP_PHASE = 'groupPhase';

/**
 * Get & store soccer competition brackets (tournament/standings) data
 * @param {Object} widgetData of the widget
 * @param {Function} extractor for extract the brackets data
 * @param {string} responseType for extract the standings or Brackets data
 * @returns {Promise<Object>}
 */
export default function getBrackets(widgetData, extractor, responseType) {
  const activeType = isValidString(responseType) ? responseType : '';
  const settings = getKey(widgetData, 'settings', {});
  const { soccerLeague } = settings;
  const data = {
    tournamentData: {
    },
    standingsData: {
    },
  };
  const query = {
    competitionKey: getKey(soccerLeague, 'soccerCompetition.id'),
    seasonKey: getKey(soccerLeague, 'seasonId'),
  };
  const url = activeType === GROUP_PHASE
    ? `/v1/standings/soccer/${query.seasonKey}/${query.competitionKey}`
    : '/v1/schedule-results/soccer';
  return async (dispatch, getState) => {
    try {
      if (!settings.uid) {
        return;
      }

      if (!query.competitionKey || !query.seasonKey) {
        dispatch(setWidgetExtraData(settings.uid, { error: new Error('Missing required params') }));
        return;
      }

      // Get team squad
      const state = getState();
      const proxyUri = proxySelector(state);
      const response = await fetchSportApi({
        uri: url,
        params: activeType !== GROUP_PHASE ? query : {},
        proxyUri,
      });
      if (hasKey(response, 'sports-content')) {
        data.tournamentData = activeType !== GROUP_PHASE
          ? extractor(response) : { roundOf16: [] };
        data.standingsData = activeType === GROUP_PHASE
          ? extractor(response) : { sections: [] };
        dispatch(setWidgetExtraData(settings.uid, data));
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
