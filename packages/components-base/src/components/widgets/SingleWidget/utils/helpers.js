import { TUDN_STATUS } from '@univision/fe-commons/dist/constants/matchStatus';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import { isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import { getScoreData } from '../../../cards/SquareCards/SquareCard/SquareScoreCard/scoreCardUtils';

/**
 * Extractor in order to get stautus for match
 * @param {string} eventStatus - status match
 * @returns {*}
 */
export function getMatchCMSStatus(eventStatus) {
  const defaultStatus = TUDN_STATUS.PRE;
  switch (eventStatus) {
    case 'post-event':
    case 'halted':
      return TUDN_STATUS.POST;
    case 'delayed':
    case 'mid-event':
    case 'intermission':
      return TUDN_STATUS.LIVE;
    default:
      return defaultStatus;
  }
}

/**
 * Extractor in ordet to get score values for teams
 * @param {JSON} response - proxy uri
 * @returns {*}
 */
function extractorTeams(response) {
  if (!isValidObject(response)) return {};
  const teams = response['sports-content']['sports-event'].team.map((team) => {
    const { alignment } = team['team-metadata'];
    const { score } = team['team-stats'];
    const penalty = team['team-stats']['penalty-stats'].count;
    return {
      alignment,
      scoreValue: {
        score,
        penalty,
      },
    };
  });
  return teams;
}

/**
 * Extractor in ordet to get score values for teams
 * @param {JSON} response - proxy uri
 * @param {number} matchId - proxy uri
 * @returns {*}
 */
export function extractorRelevantEvent(response, matchId) {
  if (!isValidObject(response)) return {};
  const events = response['sports-content'].schedule[0]['sports-event'];
  const matchEvents = events.map((event) => {
    const mainEvent = event['event-metadata'];
    const eventId = mainEvent['event-key'];
    const statusMatch = event['event-metadata']['event-status'];
    const sportsProperty = event['event-metadata']['sports-property'];
    const hasLiveStream = sportsProperty.find((property) => {
      if (property && (property['formal-name'] === 'livestream-enabled')) {
        return property.value;
      }
      return false;
    });
    const playerSettings = event['match-player-event-info'];
    const hasBroadcastEvent = playerSettings ? playerSettings.hasBroadcastEvent : false;
    const hasMcpLiveStreamId = playerSettings ? playerSettings.hasMcpLiveStreamId : false;

    return {
      eventId,
      hasLiveStream,
      statusMatch,
      hasBroadcastEvent,
      hasMcpLiveStreamId,
    };
  });
  const soccerMatch = matchEvents.find((match) => {
    return match.eventId === matchId.toString();
  });
  const statusMatch = getMatchCMSStatus(soccerMatch?.statusMatch);
  const hasLiveStream = (soccerMatch?.hasLiveStream?.value === 'true');
  const hasBroadcastEvent = soccerMatch?.hasBroadcastEvent || false;
  const hasMcpLiveStreamId = soccerMatch?.hasMcpLiveStreamId || false;
  return {
    statusMatch,
    hasLiveStream,
    hasBroadcastEvent,
    hasMcpLiveStreamId,
  };
}

/**
 * get teams data for soccer match
 * @param {Object} singleWidgetData - component props
 * @returns {Object}
 */
export const getDataTeams = (singleWidgetData) => {
  const matchData = {};
  const {
    soccerCompetitionSeason,
    homeTeamSeason,
    awayTeamSeason,
    fetchedMatch,
    updateDate,
  } = singleWidgetData;
  const scoreData = getScoreData(
    matchData,
    soccerCompetitionSeason,
    homeTeamSeason,
    awayTeamSeason,
    fetchedMatch,
    updateDate,
  );
  const teams = {
    home: scoreData.home,
    away: scoreData.away,
  };
  return teams;
};

/**
 * Retrieves the world cup schedule from SDS
 * @param {string} matchId - match Id
 * @param {string} proxyUri - proxy uri
 * @returns {*}
 */
export async function getScoreSoccerMatch(matchId, proxyUri) {
  let scoreValues;
  try {
    const response = await fetchSportApi({
      uri: `/v1/commentary/soccer/${matchId}`,
      proxyUri,
    });
    return extractorTeams(response);
  } catch (e) {
    scoreValues = {};
  }
  return scoreValues;
}

/**
 * Retrieves the world cup schedule from SDS
 * @param {string} matchId - match Id
 * @param {string} proxyUri - proxy uri
 * @returns {*}
 */
export async function getPropsMatch(matchId, proxyUri) {
  let matchSettings = null;
  try {
    const responseEvent = await fetchSportApi({
      uri: `/v1/schedule-results/soccer/${matchId}`,
      proxyUri,
    });
    matchSettings = extractorRelevantEvent(responseEvent, matchId);
    return matchSettings;
  } catch (e) {
    matchSettings = {};
  }
  return matchSettings;
}
