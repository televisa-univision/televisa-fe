import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';

import Matcher, { types } from '../Matcher';
import {
  cleanUrl,
  stripPathUrl,
} from '../../..';
import features from '../../../../../config/features';
import * as pageCategories from '../../../../../constants/pageCategories';

/**
 * Helper get pageCategory by match status from CMS api values
 * @param {string} soccerMatchStatus - match status from BEX API
 * @returns {string}
 */
export function getMatchPageCategory(soccerMatchStatus) {
  const foundStatus = getFromMap(soccerMatchStatus, {
    'HALF-TIME': 'mid',
    LIVE: 'mid',
    FULL: 'post',
    default: 'pre',
  });
  return `${pageCategories.SOCCER_MATCH}-${foundStatus}`;
}

/**
 * Helper to match type
 * @param {string} expectedType to match
 * @param {Object} data from API
 * @returns {boolean}
 */
export function matchType(expectedType, data) {
  return (hasKey(data, 'type') && data.type === expectedType)
    || getKey(data, 'sectionType') === expectedType;
}

/**
 * Helper to validate path
 * @param {string} key from vertical
 * @param {string} type of content
 * @param {string} path from node
 * @returns {boolean}
 */
export function matchPath(key, type, path) {
  if (path) {
    const prefix = `${type}-`;
    const categoryPath = key.replace(prefix, '');
    if (path.includes(`/${categoryPath}`)) {
      return true;
    }
  }
  return false;
}

/**
 * Helper to detect league type sections
 * @param {string} key category
 * @param {Object} data from API
 * @param {string} path from node
 * @returns {boolean}
 */
export function matchLeagueSection(key, data, path) {
  if (hasKey(data, 'sectionType')) {
    // league.uri/resultados|posiciones|etc has it own category, so ignore it
    return data.sectionType === 'league' && !!cleanUrl(data.uri)?.includes(stripPathUrl(path, 'deportes'));
  }
  return hasKey(data, 'competitionId') && data.type === 'section';
}

/**
 * Helper to collect category based on particular content.
 * @param {string} expectedType Expected type
 * @param {string} pathTypeOverride Override the expected type in the path.
 * Useful to use a league as a competition.
 * @returns {Matcher}
 */
export function matchSoccerType(expectedType, pathTypeOverride) {
  return new Matcher(types.CUSTOM, ({ data, key, path }) => {
    return (
      (matchType(expectedType, data) && matchPath(key, pathTypeOverride || expectedType, path))
      || matchLeagueSection(key, data, path)
    );
  });
}

/**
 * Helper to collect category based on particular content type root
 * @param {string} expectedType content type
 * @returns {Matcher}
 */
export function matchRoot(expectedType) {
  return new Matcher(types.CUSTOM, ({ data, key, path }) => {
    return (
      matchType(expectedType, data) && !matchPath(key, expectedType, path)
    );
  });
}

/**
 * Helper to collect page category based on soccer match status
 * @param {string} expectedType content type
 * @returns {Matcher}
 */
export function matchStatus(expectedType) {
  return new Matcher(types.CUSTOM, ({ data, key }) => {
    const matchPageCategory = getMatchPageCategory(data?.soccerMatchStatus);
    return (
      // Match if is a soccermatch type and page category by match status
      matchType(expectedType, data) && key.indexOf(matchPageCategory) !== -1
    );
  });
}

// ------------------------------------------------
// WARNING:
// avoid add functions/helpers not related with
// a matcher for build page categories/taxonomies
// -------------------------------------------------

/**
 * Function for getting networks/channels as array list
 * @param {Array} fields - the fields properties of the event or event metadata
 * @returns {string[]}
 */
export const getNetworkChannels = (fields) => {
  const channels = isValidArray(fields) ? fields.find(field => field['formal-name'] === 'television-coverage') : {
    value: isValidObject(fields) && fields.televisionCoverage,
  };
  return (channels && channels.value && channels.value.split(/[,|]\s*/)) || [];
};

/**
 * Helper to get the neulion status from the schedule-results API
 * We would map the neulion-gs value to check if its pre-event, live or post-event
 * Neulion-gs values:
 * -1 ( unavailable ), 0 ( upcoming ), 1 ( live ), 2 ( dvr ), 3 ( archive ), 4 ( archive not ready )
 *
 * We would map these values to:
 * -1, 0: Game hasn't started
 * 1, 2: Game is live
 * 3 or any other status: Game is over
 * @param {Array} fields - the fields properties of the event or event metadata
 * @returns {string}
 */
export const getNeulionStatus = (fields) => {
  const neulionStatus = fields.find(field => field['formal-name'] === 'neulion-gs');
  const status = getKey(neulionStatus, 'value', '-1');

  /**
   * Video SDK expects 'pre-event', 'live' or 'post-event' to show/hide the stream:
   * pre-event: Shows a default image
   * live: Loads the stream
   * post-event: Hides the stream from the playlist
   */
  switch (status) {
    case '-1':
    case '0':
      return 'pre-event';
    case '1':
    case '2':
      return 'live';
    default:
      return 'post-event';
  }
};

/**
 * Gets match status based on MCP datetimes
 * @param {Array} fields - the fields properties of the event or event metadata
 * @returns {string}
 */
export const getMCPStatus = (fields) => {
  const date = new Date();
  const startTime = new Date(
    getKey(fields.find(field => field['formal-name'] === 'mcp-stream-start-time'), 'value')
  );
  const endTime = new Date(
    getKey(fields.find(field => field['formal-name'] === 'mcp-stream-end-time'), 'value')
  );

  /**
   * Converts time to UTC by adding current timezone offset
   * @param {Object} time date object to convert
   * @returns {number}
   */
  const getUTCTime = time => (
    time.getTime() + (time.getTimezoneOffset() * 60 * 1000)
  );

  const currentTimeUTC = getUTCTime(date);
  const startTimeUTC = getUTCTime(startTime);
  const endTimeUTC = getUTCTime(endTime);

  let status = 'pre-event';

  if (currentTimeUTC > endTimeUTC) {
    status = 'post-event';
  } else if (currentTimeUTC > startTimeUTC) {
    status = 'live';
  }

  return status;
};

/**
 * Game status
 * @param {Array} metadata - the fields properties of the event or event metadata
 * @returns {string}
 */
export const getGameState = (metadata) => {
  let gameState = 'live 2nd half';
  const eventStatus = metadata['event-status'];
  const eventStatusNote = metadata['event-status-note'];

  if (eventStatus === 'post-event') {
    gameState = 'post-game';
  } else if (eventStatus === 'pre-event') {
    gameState = 'pre-game';
  } else if (eventStatus === 'mid-event' && eventStatusNote === 'First half') {
    gameState = 'live 1st half';
  } else if (eventStatus === 'intermission' && eventStatusNote === 'Half-time') {
    gameState = 'live halftime';
  }

  return gameState;
};

/**
 * Helper to get the neulion status and channel data from the schedule-results API
 * @param {Object} scheduleResultsResponse response from schedule-results API
 * @returns {string}
 */
export function getMatchData(scheduleResultsResponse) {
  let eventStatus = 'pre-event';
  let channels = [];
  let gameState = 'pre-game';
  // Get last event, which would correspond to the current match
  const events = getKey(scheduleResultsResponse, 'sports-content.schedule[0].sports-event', []);
  if (isValidArray(events)) {
    const currentEvent = events[events.length - 1];
    // Get neulion status from sports-properties
    const fields = getKey(currentEvent, 'event-metadata.sports-property', []);
    if (isValidArray(fields)) {
      eventStatus = features.video.isDAI() ? getMCPStatus(fields) : getNeulionStatus(fields);
      channels = getNetworkChannels(fields);
      gameState = getGameState(getKey(currentEvent, 'event-metadata', {}));
    }
  }

  return {
    eventStatus,
    gameState,
    channels,
  };
}
