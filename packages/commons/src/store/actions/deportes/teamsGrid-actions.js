import { hasKey, getKey } from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import { proxySelector } from '../../selectors/page-selectors';

/**
 * Get & store soccer teams list data
 * @param {Object} widgetData of the widget
 * @param {Function} extractor for extract the teams data
 * @returns {Promise<Object>}
 */
export default function getTeams(widgetData, extractor) {
  const settings = getKey(widgetData, 'settings', {});
  const isFull = getKey(settings, 'displayType.value') !== 'Collapsed';
  const query = {
    limit: 100,
  };
  let seasonId;

  if (hasKey(settings, 'soccerCompetitionSeason.soccerCompetition.id')) {
    const competition = settings.soccerCompetitionSeason;

    ({ seasonId } = competition);
    query.competitionKey = competition.soccerCompetition.id;
  }

  if (!global.window || !isFull) {
    query.limit = 200;
  }

  return async (dispatch, getState) => {
    try {
      if (!settings.uid) {
        return;
      }

      if (!seasonId || !query.competitionKey) {
        dispatch(setWidgetExtraData(settings.uid, { error: new Error('Missing required params') }));
        return;
      }

      // Get soccer schedule
      const state = getState();
      const proxyUri = proxySelector(state);
      const response = await fetchSportApi({
        uri: `/v1/rosters/soccer/${seasonId}`,
        params: query,
        proxyUri,
      });

      if (hasKey(response, 'sports-content')) {
        dispatch(setWidgetExtraData(settings.uid, { data: extractor(response) }));
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
