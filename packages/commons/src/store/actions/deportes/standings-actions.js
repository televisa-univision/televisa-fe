import {
  hasKey, isValidArray, getKey, isValidValue,
} from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import { proxySelector } from '../../selectors/page-selectors';

/**
 * Get & store standings data
 * @param {Object} widgetData of the widget
 * @param {Object} extractor for the data
 * @param {Object} query for the data
 * @returns {Object}
 */
export default function getStandings(widgetData, extractor, query) {
  const settings = getKey(widgetData, 'settings', {});
  let highlightedSeasons = [];
  let leagueKey = '';
  let leagueSeason = '';
  if (!hasKey(query, 'leagueId') && hasKey(widgetData, 'settings.highlightedCompetitionSeasons')) {
    highlightedSeasons = isValidArray(widgetData.settings.highlightedCompetitionSeasons)
      && widgetData.settings.highlightedCompetitionSeasons;
    leagueKey = getKey(highlightedSeasons[0], 'soccerCompetition.id');
    leagueSeason = getKey(highlightedSeasons[0], 'seasonId');
  } else if (query) {
    leagueKey = getKey(query, 'leagueId');
    leagueSeason = getKey(query, 'leagueSeasonId');
  }
  return async (dispatch, getState) => {
    try {
      if (!isValidValue(leagueKey) || !isValidValue(leagueSeason)) {
        dispatch(setWidgetExtraData(settings.uid, { error: { statusText: 'Missing required params' } }));
        return;
      }

      // get standings
      const state = getState();
      const proxyUri = proxySelector(state);
      const response = await fetchSportApi({
        uri: `/v1/standings/soccer/${leagueSeason}/${leagueKey}`,
        proxyUri,
      });

      if (!settings.uid) {
        return;
      }
      if (hasKey(response, 'sports-content')) {
        const extractorData = extractor(response);
        dispatch(setWidgetExtraData(settings.uid, extractorData));
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
