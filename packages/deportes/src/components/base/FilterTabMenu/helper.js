import {
  SHOWS,
  SPORT,
  SERIES,
  SPORT_NON_EVENT,
  SELECT_ALL,
  SELECT_SHOWS,
  SELECT_MATCHES,
} from '@univision/fe-commons/dist/constants/tvGuide';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

const ALL_TYPE = localization.get('all');
const MATCHES_TYPE = localization.get('matches');
const SHOWS_TYPE = localization.get('shows');

const filterTypes = [
  { name: ALL_TYPE, id: '0', type: SELECT_ALL },
  { name: MATCHES_TYPE, id: '1', type: SELECT_MATCHES },
  { name: SHOWS_TYPE, id: '5', type: SELECT_SHOWS },
];

/**
 * Filter by type
 * @param {Object} event - event to filter
 * @param {string} contentType - content type
 * @returns {boolean}
 */
const filterHandler = (event, contentType) => {
  // defined / tagged type
  const eventType = getKey(event, 'type');
  // type comming from shows api
  const showType = getKey(event, 't');

  switch (contentType) {
    case SELECT_ALL:
      return true;
    case SELECT_SHOWS:
      return (eventType === SHOWS && !showType)
      || showType === SPORT_NON_EVENT
      || showType === SERIES;
    case SELECT_MATCHES:
      return eventType === SPORT;
    default:
      return false;
  }
};

export { filterTypes, filterHandler };
