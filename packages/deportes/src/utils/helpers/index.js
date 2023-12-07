import {
  cleanUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import {
  DEPORTES_DEFAULT_PATH,
  TUDN_SITE,
} from '@univision/fe-commons/dist/constants/sites';
import tudnCoverage from '@univision/fe-commons/dist/constants/tudnCoverage';
import {
  CMS_STATUS,
} from '@univision/fe-commons/dist/constants/matchStatus';
import Store from '@univision/fe-commons/dist/store/store';
import {
  configSelector,
  domainSelector,
  isSpaSelector,
  sitesSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidString from '@univision/fe-utilities/helpers/common/isValidString';
import toCamelCase from '@univision/fe-utilities/helpers/string/toCamelCase';
import isRelativeUrl from '@univision/fe-utilities/helpers/url/isRelativeUrl';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import toAbsoluteUrl from '@univision/fe-utilities/helpers/url/toAbsoluteUrl';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import localization from '@univision/fe-utilities/localization/tudn';
import { getStatus } from '@univision/shared-components/dist/extractors/commonsExtractor';
import { getDateBasedStatus } from '@univision/shared-components/dist/extractors/bexDataExtractor';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import { US } from '@univision/fe-commons/dist/constants/userLocation';

import shows from './tvGuide/showURLs.json';

/**
 * Check if have a valid soccer competition
 * @param {Object} league - the league data from BS API
 * @access public
 * @returns {Object}
 */
export function hasCompetition(league) {
  return hasKey(league, 'soccerCompetition.id') && hasKey(league, 'soccerCompetition.name');
}

/**
 * Get name from soccer Competition
 * @param {Object} league - the league to get the name from
 * @access public
 * @returns {string}
 */
export function getLeagueName(league) {
  return getKey(league, 'soccerCompetition.name') || '';
}

/**
 * Get short name from league Object with soccer Competition
 * @param {Object} league - the league to get the name from
 * @access public
 * @returns {string}
 */
export function getLeagueShortName(league) {
  return getKey(league, 'soccerCompetition.league.name') || getLeagueName(league);
}

/**
 * Get abbreviation name from league Object with soccer Competition
 * @param {Object} league - the league to get the name from
 * @access public
 * @returns {string}
 */
export function getLeagueAbbrName(league) {
  return getKey(league, 'soccerCompetition.league.abbreviation') || getLeagueShortName(league);
}

/**
 * Get league id from league Object with soccer Competition
 * @param {Object} league - the league to get the id from
 * @access public
 * @returns {string}
 */
export function getLeagueId(league) {
  return getKey(league, 'soccerCompetition.id') || '';
}

/**
 * Get league seasonId from league Object with soccer Competition
 * @param {Object} league - the league to get the season Id from
 * @access public
 * @returns {string}
 */
export function getSeasonId(league) {
  return getKey(league, 'seasonId') || getKey(league, 'soccerCompetitionSeason.seasonId') || '';
}

/**
 * Get league URI from league Object with soccer Competition and league
 * @param {Object} league - the league to get the uri from
 * @access public
 * @returns {string}
 */
export function getLeagueUri(league) {
  return (
    cleanUrl(
      getKey(league, 'soccerCompetition.league.uri')
      || getKey(league, 'soccerCompetitionSeason.soccerCompetition.league.uri')
    ) || ''
  );
}

/**
 * Get active soccer competition league URL from league Object with soccer Competition and league
 * @param {Object} league - the league to get the uri from
 * @access public
 * @returns {string}
 */
export function getActiveLeagueUri(league) {
  return (
    cleanUrl(
      getKey(league, 'soccerCompetition.league.activeSoccerCompetitionURL')
      || getKey(
        league,
        'soccerCompetitionSeason.soccerCompetition.league.activeSoccerCompetitionURL'
      )
    ) || getLeagueUri(league)
  );
}

/**
 * Get league coverage from league Object with soccer Competition and league
 * @param {Object} leagueData - the league to get the coverage from
 * @access public
 * @returns {string}
 */
export function getLeagueCoverage(leagueData) {
  return (
    getKey(leagueData, 'soccerCompetition.league.coverage')
    || getKey(leagueData, 'soccerCompetitionSeason.soccerCompetition.league.coverage')
    || leagueData?.associatedLeagueCoverage
    || leagueData?.league?.coverage
    || ''
  );
}

/**
 * Get is should show video to avoid video player to render
 * @param {Object} data from api
 * @returns {boolean}
 */
export function showVideoPlayer(data) {
  return data?.liveStreamEnabled && !(
    getLeagueCoverage(data) === tudnCoverage.SPECIAL && data?.soccerMatchStatus === 'FULL'
  );
}

/**
 * Helper to get event status (CMS format) with cms status
 * https://www.iptc.org/std/SportsML/2.2/documentation/SportsML-G2/sportsml-vocabulary-core_xsd.html#eventStatus.Core.Vocabulary
 * pre-event: Any time before an event begins.
 * mid-event: Any time while an event is in-play.
 * post-event: Any time after an event is finished.
 * postponed: The putting off of an event until a later date, before the event
 * has begun, for whatever reason.
 * suspended: An event is stopped with the intention of resumption at a later
 * date.
 * halted: An event is stopped and not resumed or ended.
 * forfeited: A team declines or is unable to play and loses by default. The
 * opponent is awarded the win.
 * rescheduled: An event is given a new time and date.
 * delayed: An event is held up, for example by inclement weather. Can happen
 * before or during an event.
 * canceled: An event is never played and not re-scheduled.
 * intermission: A planned or scheduled break in play after which play
 * resumes.
 * if-necessary: An event whose commencement is dependant upon the outcome of
 * prior events.
 * discarded: A cancelled event because the event was
 * unnecessary.
 *
 * @param {string} eventStatus - status coming from sport data service with opta/SportsML format
 * @returns {string}
 */
export function getMatchCMSStatus(eventStatus) {
  const defaultStatus = CMS_STATUS.PRE_MATCH;
  switch (eventStatus) {
    case 'post-event':
    case 'halted':
      return CMS_STATUS.POST_MATCH;
    case 'delayed':
    case 'mid-event':
    case 'intermission':
      return CMS_STATUS.LIVE_MATCH;
    default:
      return defaultStatus;
  }
}
/**
 * Get match center headline
 * @param {Object} openingWidget - opening match center widget data
 * @param {Object} options - additional options/data to build headline
 * @param {string} options.pageCategory - current page category
 * @param {string} options.coverage - league/match coverage value
 * @param {boolean} [options.withVideo] - true if match have video
 * @access public
 * @returns {string}
 */
export function getMatchHeadLineFromOpening(openingWidget, {
  pageCategory,
  coverage,
  withVideo,
} = {}) {
  const teamHome = getKey(openingWidget, 'extraData.teams.home.fullName');
  const teamAway = getKey(openingWidget, 'extraData.teams.away.fullName');
  const leagueCoverage = coverage || tudnCoverage.BASIC;
  if (pageCategory && teamHome && teamAway) {
    const cleanStatus = pageCategory.split('-')[1] || 'pre';
    const prefix = 'matchHeadline';
    const withVideoSufix = withVideo ? 'WidthVideo' : '';
    const key = toCamelCase(`${prefix}-${cleanStatus}${withVideoSufix}${leagueCoverage}`);
    return localization.get(key, { locals: { teamHome, teamAway } });
  }
  return null;
}

/**
 * Extract match/events status from Opta (schedule-results) or BEX for non-opta games
 * and returns in both cases opta format status and cms status format
 * @param {Object} optaData - opta data from Sport Data service API
 * @param {Object} pageData - page data from the BEX api
 * @access public
 * @returns {{optaStatus:string, cmsStatus:string}}
 */
export function extractEventStatus(optaData, pageData) {
  const optaStatus = isValidObject(optaData)
    ? getStatus(getKey(optaData['sports-content'],
      'schedule[0].sports-event', []).slice(-1)[0], { optaFormat: true, preByDate: true })
    : getDateBasedStatus(pageData, { optaFormat: true });

  return { optaStatus, cmsStatus: getMatchCMSStatus(optaStatus) };
}

/**
* Get if tv show/match is live
* @param {Date} startDate - from the api
* @param {number} duration - the show duration
* @access public
* @returns {boolean}
*/
export function isLive(startDate, duration) {
  const nowDate = new Date().getTime();
  const showStart = new Date(startDate);
  if (!Number.isNaN(showStart.getTime())) {
    const showEnd = new Date(showStart);
    showEnd.setMinutes(showStart.getMinutes() + duration);
    return (showStart.getTime() <= nowDate && showEnd.getTime() >= nowDate);
  }
  return false;
}

/**
 * Get progress of tv show match
 * @param {number} startTime - from event.time
 * @param {number} duration - the show duration
 * @access public
 * @returns {number}
 */
export function getShowProgress(startTime, duration) {
  const nowDate = new Date().getTime();
  if (!Number.isNaN(startTime) && startTime > 0) {
    return ((((nowDate - startTime) / (1000 * 60)) * 100) / duration);
  }
  return 0;
}

/**
 * Get show url from show array
 * @param {string} showTitle - show to look for
 * @access public
 * @returns {string}
 */
export function getShowUrl(showTitle) {
  const show = shows.find(obj => obj.title === showTitle) || {};
  return getKey(show, 'url') || '';
}

/**
 * Get tudn url
 * @param {string} uri - uri to change domain
 * @access public
 * @returns {string}
 */
export function getTudnUrl(uri) {
  if (!uri || !isValidString(uri)) {
    return uri;
  }
  const state = Store.getState();
  const isMultiSite = getKey(configSelector(state), 'deploy.multiSite');
  const relativeUrl = toRelativeUrl(uri);
  const tudnRegExp = new RegExp(`^${DEPORTES_DEFAULT_PATH}`);

  if (!isMultiSite || tudnRegExp.test(relativeUrl) || isRelativeUrl(uri)) {
    // this is more for lower environments without multisite/multidomain enable like integration
    // or URL from SDS dev that comes with univision domain and /deportes
    // or Team URLs relative that is built
    const site = sitesSelector(state)[TUDN_SITE];
    // the sites only comes relative when multisite is disabled,
    // for example in local/integration environment so left relative to easily test MPA,
    // on SPA append the domain because is required
    const domain = domainSelector(state);
    const siteDomain = isRelativeUrl(site) && isSpaSelector(state) ? `${domain}${site}` : site;

    const tudnUrl = toAbsoluteUrl(relativeUrl.replace(tudnRegExp, ''), siteDomain);
    return tudnUrl;
  }
  return uri;
}

/**
 * Get prende match headline
 * @param {Object} openingWidget - opening match center widget data
 * @access public
 * @returns {string}
 */
export function getPrendeMatchHeadLine(openingWidget) {
  const teamHome = getKey(openingWidget, 'extraData.teams.home.fullName');
  const teamAway = getKey(openingWidget, 'extraData.teams.away.fullName');
  if (teamHome && teamAway) {
    return localization.get('matchVersus', { locals: { teamHome, teamAway } });
  }
  return null;
}

/**
 * Will rename prende channel to vix
 * @param {array} channels - list of channels
 * @param {*} isVixEnabled - vix feature flag
 * @returns {array}
 */
export function renamePrendeChannelToVix(channels, isVixEnabled) {
  if (!isValidArray(channels)) {
    return [];
  }

  if (!isVixEnabled) {
    return channels;
  }

  return channels.map((channel) => {
    if (channel === 'prende') {
      return 'vix';
    }
    return channel;
  });
}

/**
 * Filter and rename channels depending on feature flags
 * @param {Object} options - method options
 * @param {array} options.channels - channels list
 * @param {boolean} options.isVixEnabled - isVixEnabled feature flag
 * @param {boolean} options.isWorldCupMVP - MVP feature flag
 * @returns {array} op
 */
export function filterChannels({
  channels,
  isVixEnabled,
  userLocation,
  isWorldCupMVP,
}) {
  // Legacy logic, renames prende to vix if vix feature flag is enabled
  const filteredChannels = renamePrendeChannelToVix(channels, isVixEnabled)
    // Removes duplicates
    .filter((item, idx, self) => {
      return self.indexOf(item) === idx;
    });

  // If MVP is not enabled, don't filter out channels
  if (!isWorldCupMVP) {
    return filteredChannels;
  }

  // Only allow ViX channels if user is in MX
  return userLocation === US
    ? filteredChannels
    : filteredChannels.filter(item => ['vix', 'vix-plus'].includes(item));
}
