import { hasKey, getKey } from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import { proxySelector } from '../../selectors/page-selectors';

/**
 * Get & store soccer team squad roster list data
 * @param {Object} widgetData of the widget
 * @param {Function} extractor for extract the teams data
 * @returns {Promise<Object>}
 */
export default function getSquad(widgetData, extractor) {
  const settings = getKey(widgetData, 'settings', {});
  const { competition, season, team } = settings;
  const query = {
    competitionKey: competition,
    teamKey: team,
  };

  return async (dispatch, getState) => {
    try {
      if (!settings.uid) {
        return;
      }

      if (!query.competitionKey || !season || !query.teamKey) {
        dispatch(setWidgetExtraData(settings.uid, { error: new Error('Missing required params') }));
        return;
      }

      // Get team squad
      const state = getState();
      const proxyUri = proxySelector(state);
      const response = await fetchSportApi({
        uri: `/v1/rosters/soccer/${season}`,
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
