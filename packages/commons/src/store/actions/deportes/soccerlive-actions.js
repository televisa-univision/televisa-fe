import {
  hasKey,
  isValidArray,
} from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import { proxySelector, userLocationSelector } from '../../selectors/page-selectors';
import { MX } from '../../../constants/userLocation';

/**
 * filter for soccer live, show matches with feature event
 * and matches that belong in the drop down leagues (highlightedCompetitionSeason)
 * without matters the feature event
 * @param {Array} events list of emaych events
 * @param {Array} leaguesList list of leagues
 * @returns {Array} events filtered
 */
const filterLiveEvents = (events, leaguesList) => {
  const leagues = isValidArray(leaguesList) ? leaguesList?.map((value) => {
    return value?.soccerCompetition.league.abbreviation;
  }) : [];
  const eventsFiltered = events.filter((event) => {
    return (event?.leagueAbbreviation && leagues?.includes(event.leagueAbbreviation)
      || event.featureEvent);
  });
  return eventsFiltered;
};

/**
 * Get & store soccer events data
 * @param {Object} widgetData data of the widget
 * @param {Object} widgetData.settings setting widget
 * @param {Object} extractor for the data
 * @returns {Object}
 */
export default function createGetSoccerLiveEventsAction({ settings }, extractor) {
  const isClient = typeof window !== 'undefined';
  const delta = new Date().getTimezoneOffset() * 1000 * 60;
  const startDate = new Date(new Date() - delta);
  const endDate = new Date(startDate);
  startDate.setUTCHours(5, 0, 0, 0);
  endDate.setUTCHours(4, 59, 59, 0);
  endDate.setDate(endDate.getDate() + 5);

  let tries = 0;
  /**
  * Create a live event fetcher with 2 days forward tries.
  * @param {function} dispatch redux dispatcher
  * @param {function} getState redux function to get current state
  */
  const fetchLiveEvents = async (dispatch, getState) => {
    let shouldTry = isClient && tries < 3;
    try {
      const queryParams = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        sort: 'start-date-time-asc',
        limit: 100,
      };

      // Get soccer events
      const state = getState();
      const proxyUri = proxySelector(state);
      const userLocation = userLocationSelector(state);
      const isMX = userLocation === MX;

      const response = await fetchSportApi({
        uri: '/v1/schedule-results/soccer',
        params: queryParams,
        proxyUri,
      });

      const { events = [] } = !hasKey(response, 'sports-content') ? {} : extractor(response, isMX);
      const filteredEvents = filterLiveEvents(events, settings?.highlightedCompetitionSeasons);
      const extraData = isValidArray(filteredEvents) ? {
        events: filteredEvents,
        ready: true,
        date: startDate,
      } : null;

      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 1);

      if (extraData || !shouldTry) {
        shouldTry = false;
        dispatch(setWidgetExtraData(settings?.uid, extraData || { events: [], ready: isClient }));
      }

      if (shouldTry) {
        tries += 1;
        fetchLiveEvents(dispatch, getState);
      }
    } catch (error) {
      dispatch(setWidgetExtraData(settings.uid, { events: [], error, ready: isClient }));
    }
  };

  return fetchLiveEvents;
}
