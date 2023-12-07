import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import toDeburr from '@univision/fe-utilities/helpers/string/toDeburr';
import getDurationStatus from '@univision/fe-utilities/helpers/date/getDurationStatus';
import matchCardExtractor from '@univision/shared-components/dist/extractors/matchCardExtractor';
import { RED } from '@univision/fe-utilities/styled/constants';
import { MX, US } from '@univision/fe-commons/dist/constants/userLocation';

const LIVE_CONTENT = 'liveContent';
const LIVESTREAM = 'livestream';
const LIVE_GAME = 'EN VIVO';
const NOW_PLAYING = 'EN JUEGO';
const PRE = 'PREVIA';
const POST = 'RESUMEN';
const MATCH_DURATION = 120;

/**
 * Get match team  cards
 * @param {Object} matchData - the match data from cms
 * @access public
 * @returns {string}
 */
export function getMatchTeamCards(matchData) {
  if (isValidObject(matchData)) {
    return matchCardExtractor(matchData);
  }
  return {};
}

/**
 * Get match data
 * @param {Object} data - the data from score cells widget
 * @param {number} matchId - the match id to get data for
 * @access public
 * @returns {string}
 */
export function getMatchData(data, matchId) {
  if (isValidObject(data)) {
    const matches = data?.extraData;
    return isValidArray(matches) ? matches.find(match => match.key === `${matchId}`) || {} : {};
  }
  return {};
}

/**
 * Get fetched match
 * @param {array} contents - the contents to search in
 * @param {number} id - the content id to get the data from
 * @access public
 * @returns {string}
 */
export function getFetchedMatch(contents, id) {
  if (isValidArray(contents)) {
    const content = contents.find(cont => cont.uid === id);
    return content?.extraData || {};
  }
  return {};
}

/**
 * Get label text
 * @param {bool} hasLiveStream - if match has live stream
 * @param {string} status - the current match status
 * @access public
 * @returns {string}
 */
function getLabelText(hasLiveStream, status) {
  return getFromMap(status, {
    pre: PRE,
    'pre-match': PRE,
    live: hasLiveStream ? LIVE_GAME : NOW_PLAYING,
    default: POST,
  });
}
/**
 * Get score data
 * @param {Object} match - the match data retrieved from score cells widget
 * @param {Object} competition - the cms soccer competition season
 * @param {Object} homeTeam - the cms data from home team season
 * @param {Object} awayTeam - the cms data from away team season
 * @param {Object} liveStream - the cms data from live stream match
 * @param {Object} fetchedMatch - fetched match from redux action
 * @param {string} updateDate - the latest update of the card
 * @access public
 * @returns {string}
 */
export function getScoreData(
  match, competition, homeTeam, awayTeam, liveStream, fetchedMatch, updateDate,
) {
  const leagueName = competition?.soccerCompetition?.league?.abbreviation || '';
  const matchData = {
    ...getMatchTeamCards({
      homeTeamSeason: homeTeam,
      awayTeamSeason: awayTeam,
      soccerCompetitionSeason: competition,
    }),
    date: updateDate || '',
    leagueName,
  };
  const { league } = matchData;
  if (isValidObject(liveStream)) {
    return {
      ...getMatchTeamCards(liveStream),
      date: updateDate || '',
      leagueName,
    };
  }
  if (isValidObject(match)) {
    return {
      ...match,
      league,
    };
  }
  if (isValidObject(fetchedMatch)) {
    const { teams: { home, away } } = fetchedMatch;
    return {
      home,
      away,
      league,
      ...fetchedMatch,
    };
  }
  return matchData;
}

/**
 * getLabelProps
 * @param {Object} props - the props
 * @param {number} props.matchId - the opta match id
 * @param {Object} props.scoreData - the data from score cells widget
 * @param {Object} props.liveStream - the data from live stream card
 * @param {array} props.matchHierarchy - the match hierarchy
 * @param {string} props.uri - the match uri
 * @param {string} props.cardLabel - the card label manually set from bex
 * @param {string} props.matchTime - the match start time
 * @param {Object} [props.theme] - the theme object
 * @access public
 * @returns {string}
 */
export function getScoreCardLabelProps({
  matchId, scoreData, liveStream, matchHierarchy, uri = '', cardLabel = '', matchTime, theme = {},
}) {
  let isLive = false;
  let type = 'default';
  let leagueText = '';
  let legueUri = '';
  const labelColor = theme?.secondary;
  const href = uri;

  if (isValidArray(matchHierarchy)) {
    leagueText = matchHierarchy[matchHierarchy.length - 1]?.name;
    legueUri = matchHierarchy[matchHierarchy.length - 1]?.uri;
  }

  if (!isValidValue(matchId) && !isValidValue(cardLabel)) {
    const durationStatus = getDurationStatus(matchTime, MATCH_DURATION);
    isLive = durationStatus === 'active';
    const labelText = getLabelText(true, isLive ? 'live' : durationStatus);
    return {
      text: labelText,
      type: isLive ? LIVESTREAM : type,
      href,
      defaultColor: isLive ? RED : labelColor,
    };
  }
  if (isValidValue(cardLabel) && !isValidValue(matchId)) {
    isLive = cardLabel === LIVE_GAME || cardLabel === NOW_PLAYING;

    if (cardLabel === LIVE_GAME) {
      type = LIVESTREAM;
    }

    if (cardLabel === NOW_PLAYING) {
      type = LIVE_CONTENT;
    }
    return {
      text: cardLabel,
      type,
      href,
      defaultColor: isLive ? RED : labelColor,
    };
  }
  if (isValidObject(liveStream)) {
    isLive = liveStream?.status === 'LIVE';
    return {
      text: LIVE_GAME,
      type: isLive ? LIVESTREAM : LIVE_CONTENT,
      href,
      defaultColor: isLive ? RED : labelColor,
    };
  }
  if (isValidObject(scoreData)) {
    const { status, hasLiveStream } = scoreData;
    const deburrStatus = toDeburr(status, { lowercase: true });
    const fetchedText = getLabelText(hasLiveStream, deburrStatus);
    isLive = deburrStatus === 'live';
    if (hasLiveStream && isLive) {
      type = LIVESTREAM;
    }
    if (!hasLiveStream && isLive) {
      type = LIVE_CONTENT;
    }
    return {
      text: fetchedText,
      type,
      href,
      defaultColor: isLive ? RED : labelColor,
    };
  }

  return {
    text: leagueText,
    type,
    href: legueUri,
    defaultColor: labelColor,
  };
}

/**
 * getLabelProps
 * @param {Object} props - the props
 * @param {number} props.matchId - the opta match id
 * @param {Object} props.scoreData - the data  from score cells widget
 * @param {Object} props.liveStream - the data from live stream card
 * @param {array} props.matchHierarchy - the match hierarchy
 * @param {string} props.uri - the match uri
 * @param {string} props.cardLabel - the card label manually set from bex
 * @param {string} props.matchTime - the match start time
 * @param {Object} [props.theme] - the theme object
 * @access public
 * @returns {string}
 */
export function getCardLabelProps({
  matchId, scoreData, matchHierarchy, uri = '', cardLabel = '', matchTime, theme = {}, userLocation = US,
}) {
  let isLive = false;
  let type = 'default';
  let leagueText = '';
  let legueUri = '';
  const labelColor = theme?.secondary;
  const href = uri;
  if (isValidArray(matchHierarchy)) {
    leagueText = matchHierarchy[matchHierarchy.length - 1]?.name;
    legueUri = matchHierarchy[matchHierarchy.length - 1]?.uri;
  }

  if (!isValidValue(matchId) && !isValidValue(cardLabel)) {
    const durationStatus = getDurationStatus(matchTime, MATCH_DURATION);
    isLive = durationStatus === 'active';
    const labelText = getLabelText(true, isLive ? 'live' : durationStatus);
    return {
      text: labelText,
      type: isLive ? LIVESTREAM : type,
      href,
      defaultColor: isLive ? RED : labelColor,
    };
  }
  if (isValidValue(cardLabel) && !isValidValue(matchId)) {
    isLive = cardLabel === LIVE_GAME || cardLabel === NOW_PLAYING;

    if (cardLabel === LIVE_GAME) {
      type = LIVESTREAM;
    }

    if (cardLabel === NOW_PLAYING) {
      type = LIVE_CONTENT;
    }
    return {
      text: cardLabel,
      type,
      href,
      defaultColor: isLive ? RED : labelColor,
    };
  }

  if (isValidObject(scoreData)) {
    const {
      status,
      hasBroadcastEvent,
      hasMcpLiveStreamId,
    } = scoreData;
    const { hasLiveStream } = scoreData;
    let hasLiveStreamMatch = false;
    const deburrStatus = toDeburr(status, { lowercase: true });
    isLive = deburrStatus === 'live';
    if (userLocation === US && isLive && hasLiveStream) {
      hasLiveStreamMatch = hasMcpLiveStreamId;
    }
    if (userLocation === MX && isLive && hasLiveStream) {
      hasLiveStreamMatch = hasBroadcastEvent;
    }
    if (!hasLiveStream && userLocation === MX && hasBroadcastEvent) {
      hasLiveStreamMatch = true;
    }
    if (!hasLiveStream && userLocation === US && hasMcpLiveStreamId) {
      hasLiveStreamMatch = true;
    }
    const fetchedText = getLabelText(hasLiveStreamMatch, deburrStatus);
    if (hasLiveStreamMatch && isLive) {
      type = LIVESTREAM;
    }
    if (!hasLiveStreamMatch && isLive) {
      type = LIVE_CONTENT;
    }
    return {
      text: fetchedText,
      type,
      href,
      defaultColor: isLive ? RED : labelColor,
    };
  }

  return {
    text: leagueText,
    type,
    href: legueUri,
    defaultColor: labelColor,
  };
}

/**
 * Get league link from league Object with soccer Competition and league
 * @param {Object} league - the league to get the uri from
 * @access public
 * @returns {Object}
 */
export function getLeagueLinkData(league) {
  const href = league?.soccerCompetition?.league?.uri
    || league?.soccerCompetitionSeason?.soccerCompetition?.league?.uri;

  return { ...(isValidValue(href) && { href, target: '_blank' }) };
}
