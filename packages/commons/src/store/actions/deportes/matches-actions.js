import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import { hasKey } from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import { proxySelector, userLocationSelector } from '../../selectors/page-selectors';
import * as messages from '../../../constants/messages';
import { MX } from '../../../constants/userLocation';

/**
 * Get & store soccer matches data
 * @param {Object} widgetData of the widget
 * @param {Function} extractor for the data
 * @param {Object} [queryData] the query to request
 * @param {Object} [options] previous matches for paging
 * @param {string} [options.direction] the paging direction to extend
 * @param {string} [options.fallbackPrev] true should try to get the last soccer events
 * @param {string} [options.showLast] true should display the last soccer event
 * @param {Object[]} [options.events] the previous soccer matches events
 * @returns {Promise<Object>}
 */
export default function getMatches(widgetData, extractor, queryData, options) {
  const settings = getKey(widgetData, 'settings', {});
  const isCollpsed = getKey(settings, 'displayType.value') !== 'Full';
  const isDateDesc = settings.sort === 'date-desc';
  const isSSR = typeof window === 'undefined';
  const {
    direction,
    fallbackPrev,
    showLast,
    events: prevEvents,
    isWorldCup,
  } = options || {};
  const hasPrevEvents = isValidArray(prevEvents);
  const isWorldCupMVP = getKey(widgetData, 'widgetContext.isWorldCupMVP', false);
  let isWorldCupSSR = false;

  let query = {};
  let today = new Date();
  let numberDays = -1;
  let sortParam = {
    prev: ['start-date-time-desc', 'endDate'],
    next: ['start-date-time-asc', 'startDate'],
  };

  if (queryData) {
    query = Object.assign(query, queryData);
  } else if (hasKey(settings, 'soccerTeamSeason.teamId')) {
    const team = settings.soccerTeamSeason;
    query.teamKey = team.teamId;
    query.seasonKey = getKey(team, 'soccerCompetitionSeason.seasonId');
  } else if (isValidArray(getKey(settings, 'highlightedCompetitionSeasons'))) {
    const competition = settings.highlightedCompetitionSeasons[0];
    query.competitionKey = getKey(competition, 'soccerCompetition.id');
    query.seasonKey = getKey(competition, 'seasonId');

    if (query.competitionKey === '4') {
      isWorldCupSSR = true;
    }
  }

  if (query.date) {
    today = new Date(query.date);
    delete query.date;
  }
  today.setHours(0, 0, 0, 0);

  if (isDateDesc) {
    numberDays = 1;
    [sortParam.prev, sortParam.next] = [sortParam.next, sortParam.prev];
  }

  sortParam = sortParam[direction] || sortParam.next;
  [query.sort] = sortParam;

  if (isCollpsed) {
    query.limit = 6;
    query[sortParam[1]] = today.toISOString();
  } else {
    query.limit = isSSR ? 10 : 50;
    query[sortParam[1]] = today.setDate(today.getDate() + numberDays) && today.toISOString();
  }

  if ((isWorldCupSSR || isWorldCup) && widgetData?.settings?.displayType?.name === 'COLLAPSED') {
    query.limit = 200;
    query.startDate = '2022-11-18T06:00:00.000Z';
  }

  return async (dispatch, getState) => {
    // If have pasts events return as last page to avoid error
    const isPrev = direction === 'prev';
    const pagingData = { last: true };
    const defaultPaging = hasPrevEvents && isPrev ? { prev: pagingData } : { next: pagingData };
    const defaultEvents = hasPrevEvents ? prevEvents : [];

    /**
     * Get fallback matches data from previous events or dispatch empty data
     */
    const getFallbackMatches = () => {
      if ((!isSSR && fallbackPrev) || isWorldCupSSR) {
        dispatch(
          getMatches(widgetData, extractor, queryData, {
            direction: 'prev',
            events: prevEvents,
            showLast: true,
          })
        );
      } else {
        dispatch(
          setWidgetExtraData(settings.uid, { events: defaultEvents, paging: defaultPaging })
        );
      }
    };

    try {
      // Get soccer schedule
      const state = getState();
      const proxyUri = proxySelector(state);
      const userLocation = userLocationSelector(state);
      const isMX = isWorldCupMVP && userLocation === MX;
      const response = await fetchSportApi({
        uri: '/v1/schedule-results/soccer',
        params: query,
        proxyUri,
      });

      if (!settings.uid) {
        return;
      }

      if (hasKey(response, 'sports-content')) {
        const { events, analytics } = extractor(response, isMX) || {};
        const paging = {};
        let newEvents = events || [];

        if (isPrev) {
          paging.prev = response.paging;
        } else {
          paging.next = response.paging;
        }

        // Merge previous events for paging support
        if (hasPrevEvents) {
          // Prevent duplicate events when join past and new events
          newEvents = newEvents.concat(
            prevEvents.filter((item) => {
              return !newEvents.some(val => val.id === item.id);
            })
          );
        }
        // Ensure display in desc order
        newEvents.sort((a, b) => {
          return isDateDesc
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
        });
        dispatch(
          setWidgetExtraData(settings.uid, {
            events: newEvents,
            paging,
            analytics,
            showLast,
          })
        );
      } else if (getKey(response, 'statusText') === messages.NOT_FOUND) {
        getFallbackMatches();
      } else {
        dispatch(setWidgetExtraData(settings.uid, { error: response || true }));
      }
    } catch (error) {
      if (hasKey(error, 'response.status')) {
        // Client side fetch
        error.statusCode = error.response.status;
      }
      if (getKey(error, 'statusCode') === 404) {
        getFallbackMatches();
      } else {
        dispatch(setWidgetExtraData(settings.uid, { error }));
      }
    }
  };
}
