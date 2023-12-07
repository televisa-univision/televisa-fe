/* eslint-disable import/no-extraneous-dependencies */
import ReactDOM from 'react-dom';
import getVideoAdUserGroup from '@univision/fe-graphql-services/dist/requests/queries/getVideoAdUserGroup';
import { fetchAuthGraphQL } from '../api/graphql';

import {
  getKey,
  hasKey,
  isValidArray,
  isValidObject,
  isValidString,
  isValidValue,
} from '../helpers';
import Store from '../../store/store';
import { getContentType } from '../../store/storeHelpers';
import localStorage from '../helpers/LocalStorage';
import { fetchSportApi } from '../api/fetchApi';
import { getMatchData } from '../helpers/taxonomy/matchers/custom/soccer';
import clientLogging from '../logging/clientLogging';
import { ANON_USER_TOKEN_KEY } from '../../constants/personalization';
import { RADIO_PLAYER_ID } from '../../constants/radio';
import { AIRPLAY, CHROMECAST, VIDEO_PLAY_REASON_VIEWABLE } from '../../constants/video';
import { convertMilitaryTime } from '../helpers/dateTimeUtils';
import VideoAds from '../ads/Video/videoAdsSettings';
import VideoTracker from '../tracking/tealium/video/VideoTracker';
import contentTypes from '../../constants/contentTypes.json';
import features from '../../config/features';
import { castingEnabledSelector, castingNodeIdSelector } from '../../store/selectors/castingSelectors';

/**
 * returns native PiP running status
 * @returns {boolean}
 */
export function isPipRunning() {
  return !!document?.pictureInPictureElement;
}

/**
 * get the JWPlayer instance
 * @param {string} nodeId DOM id for a player instance
 * @returns {Object|boolean} the instance, or false if fails
 */
export function getPlayerInstance(nodeId) {
  try {
    return global.window.FMG.getJWPlayerInstance(nodeId);
  } catch (e) {
    return false;
  }
}

/**
 * Get current playing index
 * @param {string} nodeId DOM id for a player instance
 * @returns {number} current playing index
 */
export function getCurrentIndex(nodeId) {
  try {
    const player = global.window.FMG.getJWPlayerInstance(nodeId);
    return player.getPlaylistIndex();
  } catch (e) {
    return 0;
  }
}

/**
 * get the video instance
 * @param {string} nodeId DOM id for a video instance
 * @returns {Object|boolean} the instance, or false if fails
 */
export function getVideoInstance(nodeId) {
  try {
    return global.window.FMG.getInstance(nodeId);
  } catch (e) {
    return false;
  }
}

/**
 * get all JWPlayer instances
 * @returns {Object|boolean} the instance, or false if fails
 */
export function getAllPlayerInstances() {
  try {
    return global.window.FMG.getAllInstances();
  } catch (e) {
    return false;
  }
}

/**
 * returns the current player state
 * @param {string} nodeId DOM id for a player instance
 * @returns {string}
 */
export function getPlayerCurrentState(nodeId) {
  const player = getPlayerInstance(nodeId);
  if (player) {
    return player.getState();
  }
  return '';
}

/**
 * returns the current player autoplay value
 * @param {string} nodeId DOM id for a player instance
 * @returns {string}
 */
export function getPlayerAutoplayValue(nodeId) {
  const player = getVideoInstance(nodeId);

  return player?.pageLevelParams?.autoplay || false;
}

/**
 * returns the current player state
 * @param {string} nodeId DOM id for a player instance
 * @returns {string}
 */
export function getPlayerAnchorState(nodeId) {
  const player = getVideoInstance(nodeId);
  if (hasKey(player, 'modules.anchorVideo')) {
    return player.modules.anchorVideo.getState();
  }
  return false;
}

/**
 * returns the current player state
 * @param {string} nodeId DOM id for a player instance
 * @param {boolean} state new state
 */
export function setPlayerAnchorState(nodeId, state) {
  const player = getVideoInstance(nodeId);
  if (hasKey(player, 'modules.anchorVideo')) {
    player.modules.anchorVideo.setState(state);
  }
}

/**
 * Close Anchor
 * @param {string} nodeId DOM id for a player instance
 */
export function closeAnchor(nodeId) {
  const player = getVideoInstance(nodeId);
  if (hasKey(player, 'modules.anchorVideo')) {
    player.modules.anchorVideo.closeAnchor(nodeId);
  }
}

/**
 * show MVPD Modal
 * @param {string} nodeId DOM id for a player instance
 */
export function showMVPDModal(nodeId) {
  const player = getVideoInstance(nodeId);
  if (player) {
    // eslint-disable-next-line babel/no-unused-expressions
    player.adobePass?.mvpdModal?.renderProviders?.();
  }
}

/**
 * Return if radio is on Video Page.
 * @param {string} nodeId - player id.
 * @returns {boolean}
 */
export function isRadioOnVideoPage(nodeId) {
  return nodeId === RADIO_PLAYER_ID && getContentType(Store) === contentTypes.VIDEO;
}

/**
 * Check if anchor can be enabled when playing
 * @param {string} nodeId DOM id for a player instance
 * @returns {boolean}
 */
export function isPlayerBufferingOrPlaying(nodeId) {
  const playerState = getPlayerCurrentState(nodeId);
  return playerState === 'playing' || playerState === 'buffering';
}

/**
 * Checks if Picture in picture is enabled and supported by the browser
 * @returns {boolean}
 */
export function isPipSupported() {
  return typeof window !== 'undefined' && document.pictureInPictureEnabled;
}

/**
 * Check if there is a player on anchor state
 * @returns {boolean} true if there is a video on achor mode
 * @returns {Object|boolean} playerId, or false if fails
 */
export function isAnyPlayerAnchored() {
  let anchorPlayer = false;
  const players = getAllPlayerInstances();
  if (isValidObject(players)) {
    Object.keys(players).forEach((playerId) => {
      if (getPlayerAnchorState(playerId)) {
        anchorPlayer = playerId;
      }
    });
  }
  return anchorPlayer;
}

/**
 * Check if there is a player on playing state
 * @returns {boolean} true if there is a video playing
 * @returns {Object|boolean} playerId, or false if fails
 */
export function isAnyPlayerPlaying() {
  let activePlayer = false;
  const players = getAllPlayerInstances();
  if (isValidObject(players)) {
    Object.keys(players).forEach((playerId) => {
      if (isPlayerBufferingOrPlaying(playerId) && !isRadioOnVideoPage(playerId)) {
        activePlayer = playerId;
      }
    });
  }

  return activePlayer;
}

/**
 * Check if there is a player on playing state
 * @returns {boolean} true if there is a video playing
 * @returns {Object|boolean} playerId, or false if fails
 */
export function isAnyAutoplayPlayer() {
  let activePlayer = false;
  const players = getAllPlayerInstances();
  if (isValidObject(players)) {
    Object.keys(players).forEach((playerId) => {
      if (getPlayerAutoplayValue(playerId) === VIDEO_PLAY_REASON_VIEWABLE) {
        activePlayer = playerId;
      }
    });
  }

  return activePlayer;
}

/**
 * get video playlist
 * @param {string} nodeId DOM id for a player instance
 * @returns {Object|boolean} playerId, or false if fails
 */
export function getPlayerCurrentMcpid(nodeId) {
  const player = getVideoInstance(nodeId);
  if (player) {
    return getKey(player, 'currentMcpid', false);
  }
  return false;
}

/**
 * Check if there is a video playing on any player
 * @param {string} videoId video id
 * @returns {Object|boolean} playerId, or false if fails
 */
export function isVideoPlaying(videoId) {
  const playerId = isAnyPlayerPlaying();
  if (playerId && getPlayerCurrentMcpid(playerId) === videoId) {
    return playerId;
  }

  return false;
}

/**
 * Check if wrapper element exists
 * @param {string} nodeId DOM id for a video instance
 * @returns {Object} element
 */
export function getWrapperElement(nodeId) {
  return document.getElementById(`${nodeId}-wrapper`);
}

/**
 * remove wrapper element if exists
 * @param {string} nodeId DOM id for a video instance
 */
export function removeWrapperElement(nodeId) {
  const element = getWrapperElement(nodeId);
  if (element) {
    element.remove();
  }
}

/**
 * Ge Wrapper element
 * @param {string} nodeId DOM id for a video instance
 * @returns {boolean} true if element exists
 */
export function isWrapperAvailable(nodeId) {
  return !!getWrapperElement(nodeId);
}

/**
 * Remove Jwplayer Instance
 * @param {string} nodeId DOM id for a player instance
 */
export function removePlayerInstance(nodeId) {
  if (hasKey(global, 'window.FMG')) {
    global.window.FMG.removeInstance(nodeId);
  }
}

/**
 * Clear instance listeners
 * @param {string} nodeId DOM id for a player instance
 */
export function clearInstanceEvents(nodeId) {
  if (hasKey(global, 'window.FMG')) {
    global.window.FMG.clearInstanceEvents(nodeId);
  }
}

/**
 * Remove Video Instance
 * @param {string} nodeId DOM id for a video instance
 */
export function removeVideoInstance(nodeId) {
  removePlayerInstance(nodeId);
  clearInstanceEvents(nodeId);
  ReactDOM.unmountComponentAtNode(getWrapperElement(nodeId));
  removeWrapperElement(nodeId);
}

/**
 * Get Placeholder element
 * @param {string} nodeId DOM id for a video instance
 * @returns {Object} element
 */
export function getPlaceholderElement(nodeId) {
  return document.getElementById(`${nodeId}-placeholder`);
}

/**
 * Check if placeholder exists
 * @param {string} nodeId DOM id for a video instance
 * @returns {boolean} true if element exists
 */
export function isPlaceholderAvailable(nodeId) {
  return !!getPlaceholderElement(nodeId);
}

/**
 * Checks if casting is enabled and if the provided player id is the one casting
 * @param {string} playerId DOM id for a player instance
 * @returns {boolean}
 */
export function isPlayerInstanceCasting(playerId) {
  const state = Store.getState();

  return castingEnabledSelector(state)
    && castingNodeIdSelector(state) === playerId;
}

/**
 * Remove any player on anchored state
 * @param {string} nodeId DOM id for a player instance
 */
export function removeAnyPlayerAnchored(nodeId = null) {
  const players = getAllPlayerInstances();
  if (isValidObject(players)) {
    Object.keys(players).forEach((playerId) => {
      if (
        playerId !== nodeId
        && getPlayerAnchorState(playerId)
        && !isPlayerInstanceCasting(playerId)
      ) {
        // if video component exist close anchor
        if (isPlaceholderAvailable(playerId)) {
          closeAnchor(playerId);
        } else {
          removeVideoInstance(playerId);
        }
      }
    });
  }
}

/**
 * get video playlist
 * @param {string} nodeId DOM id for a player instance
 * @returns {Object|boolean} the playlist, or false if fails
 */
export function getPlayerPlaylist(nodeId) {
  const player = getVideoInstance(nodeId);
  if (player) {
    return getKey(player, 'videos', false);
  }
  return false;
}

/**
 *  get the JWPlayer instance and executes the given function if there is a valid player instance.
 * @param {string} nodeId DOM id for a player instance
 * @param {function} fn Function to execute
 */
export function doIfPlayerExists(nodeId, fn) {
  const player = getPlayerInstance(nodeId);
  if (player) {
    fn(player);
  }
}

/**
 * Return if radio player is enabled following the radio-video rules.
 * @param {string} playerId - current player id.
 * @param {string} nextPlayerId - next player id.
 * @returns {boolean}
 */
export function isRadioPlayerEnabled(playerId, nextPlayerId) {
  const isRadio = playerId === RADIO_PLAYER_ID && getContentType(Store) !== contentTypes.VIDEO;
  if (nextPlayerId) {
    const player = getPlayerInstance(nextPlayerId);
    return isRadio && !!player?.getMute?.();
  }
  return isRadio;
}

/**
 * Pause any player on playing state
 * @param {string} nodeId DOM id for a player instance
 * @param {bool} validLivestream DOM id for a player instance
 */
export function pauseAnyPlayerPlaying(nodeId = null, validLivestream = false) {
  const players = getAllPlayerInstances();
  if (isValidObject(players)) {
    Object.keys(players).forEach((playerId) => {
      if (playerId !== nodeId && getPlayerCurrentState(playerId) === 'playing') {
        doIfPlayerExists(playerId, (player) => {
          const { isLivestream, skipPause } = player.getPlaylistItem();
          const ignoreLivestream = validLivestream ? isLivestream : false;
          if (!ignoreLivestream && !isRadioPlayerEnabled(playerId, nodeId) && !skipPause) {
            player.pause(true);
          }
        });
      }
    });
  }
}

/**
 * Set Autoplay to false if Radioo player is opened
 * @param {string} nodeId DOM id for a player instance
 */
export function changeAutoplayPlayer(nodeId) {
  const players = getAllPlayerInstances();
  Object.keys(players).forEach((playerId) => {
    if (playerId !== nodeId) {
      doIfPlayerExists(playerId, (player) => {
        player.setConfig({
          autostart: false,
        });
      });
    }
  });
}

/**
 * Video/Radio interaction to close radio player for video priority
 * @param {Object} state - Store state
 * @param {string} currentVideoId - video id
 * @returns {boolean}
 */
export function closeRadioIfPlayerIsEnabled(state, currentVideoId) {
  const stationId = getKey(state, 'player.anchorPlayer.stationTitle');
  if (stationId) {
    const radioPlayer = getPlayerInstance(RADIO_PLAYER_ID);
    const videoPlayer = getPlayerInstance(currentVideoId);
    const result = radioPlayer?.getState?.() !== 'playing'
      && videoPlayer?.getState?.() === 'playing';

    if (result) {
      radioPlayer.trigger('closeRadio', {});
    }
    return result;
  }
  return false;
}

/**
 * Close anchored player from the page
 */
export function closeAnchoredPlayer() {
  const store = Store.getState();
  if (hasKey(store, 'video.nodeId') && hasKey(store, 'video.updateAnchoredState')) {
    const { nodeId, updateAnchoredState } = store.video;
    doIfPlayerExists(nodeId, (player) => {
      const analyticsData = global.window.FMG.getAnalyticsData(player.id);
      player.pause(true);
      VideoTracker.track(VideoTracker.events.anchorVideoClose, {
        video_player_position: 'anchor',
        ...analyticsData,
      });
      // Make sure we update the player UI
      setTimeout(player.resize, 1500);
      global.window.FMG.trigger('SDK.anchorEnabled', null, { anchored: false, nodeId }, nodeId);
      updateAnchoredState(false);
    });
  }
}

/**
 *  Get ad breaks
 * @param {Object} state current redux state
 * @returns {function}
 */
export function getVideoUserGroup(state) {
  /**
   * Sends a request to graphql to get video ad breaks
   * @param {number} videoDuration current video duration
   * @returns {Object}
   */
  return async () => {
    try {
      const token = state?.user?.accessToken
        || localStorage.getObject(ANON_USER_TOKEN_KEY)?.accessToken;

      const serverUri = state?.page?.config?.graphql;

      // Don't do anything if not valid duration or no user token
      if (!token) return null;

      // get access token from local storage anonUserToken
      const response = await fetchAuthGraphQL({
        query: getVideoAdUserGroup,
        token,
        serverUri,
      });

      return response;
    } catch (err) {
      err.message = `getVideoAdUserGroup rejected: ${err.message}`;
      clientLogging(err);
      return {};
    }
  };
}

/**
 * Maps broadcast status to event status
 * @param {string} broadcastStatus status
 * @returns {string}
 */
export function getMappedEventStatus(broadcastStatus) {
  const playerState = broadcastStatus?.toLowerCase();
  const stateMap = {
    pre: 'pre',
    on: 'live',
    post: 'post',
    error: 'post',
  };

  return stateMap[playerState] || 'post';
}

/**
  * Check the status of the match, and if its over add it to the state
  * This function is used only on client side.
  * @param {string} optaId handles the response
  * @param {function} callback handles the response
  * @param {string} proxyUri the proxy uri
  * @param {string} uid current id
  * @param {boolean} isBroadcastEvent should check broadcast status
  * @param {boolean} isVixPlayerMx should check vixPlayerMx status
  * @param {boolean} isVixPlayerUs should check vixPlayerUs status
  * @param {boolean} syndicatorUri syndicator uri
  */
export async function checkMatchStatus(
  optaId,
  callback,
  proxyUri,
  uid,
  isBroadcastEvent,
  isVixPlayerMx,
  isVixPlayerUs,
  syndicatorUri
) {
  if (typeof callback !== 'function') return;

  const postEvent = 'post-event';
  const forceLive = features.video.isEnableSoccerGame();

  try {
    let response = {};

    if (optaId) {
      response = await fetchSportApi({
        uri: `/v1/schedule-results/soccer/${optaId}`,
        proxyUri,
      });
    }

    let broadcastStatus = null;
    let vixPlayerStatus = null;

    if (isBroadcastEvent || isVixPlayerMx || isVixPlayerUs) {
      const apiResponse = await fetch(`${syndicatorUri}/api/match-info/${uid}`, {
        method: 'POST',
      });
      const apiData = await apiResponse.json();

      broadcastStatus = apiData?.data?.match?.broadcastEvent?.playerState;

      if (isVixPlayerMx) {
        vixPlayerStatus = apiData?.data?.match?.vixPlayerMx?.status;
      }

      if (isVixPlayerUs) {
        vixPlayerStatus = apiData?.data?.match?.vixPlayerUs?.status;
      }
    }

    let matchData = getMatchData(response);

    if (forceLive) {
      matchData = { ...matchData, eventStatus: 'live' };
      broadcastStatus = 'ON';
      vixPlayerStatus = 'ON';
    }

    callback({ ...matchData, broadcastStatus, vixPlayerStatus });
  } catch (e) {
    callback({ eventStatus: postEvent, broadcastStatus: postEvent, vixPlayerStatus: postEvent });
  }
}

/**
 * Parse VLL Schedule
 * @param {array} schedule current schedule
 * @returns {array}
 */
export const parseVLLSchedule = (schedule) => {
  const events = [
    getKey(schedule, 'current_event'),
    getKey(schedule, 'next_event'),
    ...getKey(schedule, 'upcoming_events', []),
  ];
  const nowDate = new Date();
  const formatOptions = {
    timeZone: 'America/New_York', hour12: false, hour: '2-digit', minute: '2-digit',
  };
  return events.reduce((acc, event) => {
    if (isValidObject(event)) {
      const { ts_start: start, ts_end: end, ...rest } = event;
      const startTime = (new Date(+start * 1000));
      const endTime = (new Date(+end * 1000));
      const startTimeDisplay = startTime.toLocaleTimeString('en-US', formatOptions);
      const endTimeDisplay = endTime.toLocaleTimeString('en-US', formatOptions);
      acc.push({
        nowDate,
        startTime: startTimeDisplay,
        endTime: endTimeDisplay,
        startTimeDisplay: convertMilitaryTime(startTimeDisplay),
        endTimeDisplay: convertMilitaryTime(endTimeDisplay),
        timezoneDisplay: 'ET',
        ...rest,
      });
    }
    return acc;
  }, []);
};

/**
 * Get Page data from initial state
 * @returns {Object}
 */
export function getPageData() {
  const pageData = getKey.bind(null, window);
  return pageData('__INITIAL_STATE__', pageData('__NEXT_DATA__.props.pageProps.initialState.page'));
}

/**
 * Get video env from legacy or nextjs
 * @returns {string}
 */
export function getEnv() {
  return getKey(getPageData(), 'env', 'production');
}

/**
 * Get video env from legacy or nextjs
 * @returns {string}
 */
export function getVideoEnv() {
  return getKey(getPageData(), 'config.videoHub.env', 'prod');
}

/**
 * Get video performance flag or return null if disableAds true
 * @returns {bool}
 */
export function getVideoAds() {
  const pageData = getPageData();

  let videoAds;

  // if ads enable and video layout return ad values
  if (!pageData?.data?.adSettings?.disableAds) {
    videoAds = VideoAds.getDFPSettings(pageData);
  }

  return videoAds;
}

/**
 * Get video NodeId
 * @param {Object} [settings] - video settings
 * @returns {?string}
 */
export function getNodeId(settings) {
  if (settings) {
    const { uid } = settings;
    return `player-${uid ?? 1}`;
  }

  const data = getKey(getPageData(), 'data');
  let uid;

  if (data?.type === 'video') {
    // if video layout return uid
    uid = data?.uid;
  } else if (data?.lead?.type === 'video') {
    // if article + video lead return uid
    uid = data?.lead?.uid;
  } else if (data?.type === 'livestream') {
    // if livestream layout return uid
    // TODO create same pattern for livestreams
    uid = data?.livestreamId;
    return uid ? `livestream-${uid}` : null;
  }

  return uid ? `player-${uid}` : null;
}

/**
 * Sync the expand with the video playlist.
 * @param {string} nodeId - player ID value
 * @param {bool} expandedState - Expanded value
 */
export function checkExpandOnPlaylistChange(nodeId, expandedState) {
  doIfPlayerExists(nodeId, (player) => {
    const container = player.getContainer?.();
    const expandButton = container?.parentNode?.querySelector('.anchor-expand');
    // eslint-disable-next-line babel/no-unused-expressions
    expandButton?.classList.toggle('is-expanded', expandedState);
  });
}

/**
 * Retrieves the casting receiver id from page data configuration
 *
 * @returns {string}
 */
export function getCastingReceiverId() {
  return getPageData()?.config?.castingReceiverId;
}

/**
 * Send airplay or chromecast value depending on the browser's user agent
 * @returns {string}
 */
export function getCastingPlatform() {
  const { userAgent = '' } = global?.window?.navigator || {};

  // Edge and Firefox should return empty value since they're not supported
  if (userAgent.includes('Edg') || userAgent.includes('Firefox')) {
    return null;
  }

  if (userAgent.includes('Chrome')) {
    return CHROMECAST;
  }

  if (userAgent.includes('Safari')) {
    return AIRPLAY;
  }

  return null;
}

/**
 * Returns the time formatted to a valid Date
 * @param {Date} timeInstance a valid date
 * @param {string} time - time to format
 * @returns {Date}
 */
export const getShowTime = (timeInstance, time) => {
  if (!isValidString(time) || !(timeInstance instanceof Date)) {
    return null;
  }

  const [hours, minutes] = time.split(':');
  const formattedTime = new Date(
    timeInstance.getFullYear(),
    timeInstance.getMonth(),
    timeInstance.getDate(),
    hours,
    minutes,
    0
  );
  return formattedTime;
};

/**
 * Returns a valid Eastern time string
 * @param {*} options - format options
 * @returns {string}
 */
export const convertTimeToEastern = (options) => {
  const { dateInstance, time, timeZone } = options;

  if (!isValidString(time) || !(dateInstance instanceof Date)) {
    return null;
  }

  const [hours, minutes] = time.split(':');

  const day = dateInstance.getDate().toString().padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateInstance);
  const year = dateInstance.getFullYear();

  return `${day} ${month} ${year} ${hours}:${minutes}:00`;
};

/**
 * Returns the show in local users time
 * @param {string} time - date in eastern time
 * @returns {string}
 */
export const getShowToLocalTime = (time) => {
  if (!isValidValue(time)) return null;

  const localTime = new Date(time).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const timeFormatted = localTime.split(':');
  const hours = parseInt(timeFormatted[0], 10);

  if (!isValidValue(hours) || timeFormatted.length < 2) return null;

  const [minute, ampm] = timeFormatted[1].split(' ');
  return `${hours}${minute === '00' ? '' : `:${minute}`}${ampm}`;
};

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Find current running (or next upcoming) program form schedule
 * @param {array} schedules schedules array
 * @param {date} date value
 * @returns {Object} the matching program
 */
export const getEPGSchedule = (schedules, date) => {
  if (!isValidArray(schedules)) return null;
  const timezones = {
    'US/Eastern': { displayTimezone: 'ET', timeZoneDate: 'America/New_York' },
  };

  const now = date && new Date(date) || new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });

  const nowTimeZone = now.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    timeZoneName: 'short',
  }).slice(-3);

  const todayDate = date && new Date(date) || new Date();
  const today = daysOfWeek[todayDate.getDay()];
  const hh = todayDate.getHours().toString().padStart(2, '0');
  const mm = todayDate.getMinutes().toString().padStart(2, '0');
  const todayTime = getShowTime(todayDate, `${hh}:${mm}`);
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  tomorrowDate.setHours(0, 0, 0, 0);
  const tomorrowTimeZone = tomorrowDate.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    timeZoneName: 'short',
  }).slice(-3);
  const tomorrow = daysOfWeek[tomorrowDate.getDay()];
  let currentShow = null;

  const fullSchedule = schedules.reduce((acc, show) => {
    const {
      days, timeZone, startTime, endTime,
    } = show || {};

    if (!timezones[timeZone]) return null;

    const {
      displayTimezone,
      timeZoneDate,
    } = timezones[timeZone];

    if (isValidArray(days)) {
      const filteredShow = days
        .reduce((acd, day) => {
          if (day === today) {
            const startDate = getShowTime(todayTime, startTime);
            const endDate = getShowTime(todayTime, endTime);
            const easternDateStart = convertTimeToEastern(
              { dateInstance: todayDate, time: startTime, timeZone: nowTimeZone }
            );

            const easternDateEnd = convertTimeToEastern(
              { dateInstance: todayDate, time: endTime, timeZone: nowTimeZone }
            );

            if (startDate && endDate && (todayTime >= startDate && todayTime < endDate)) {
              currentShow = {
                ...show,
                day,
                displayTimezone,
                startDate,
                easternDateStart,
                easternDateEnd,
                timeZone: timeZoneDate,
                startTimeDisplay: getShowToLocalTime(easternDateStart),
                endTimeDisplay: getShowToLocalTime(easternDateEnd),
              };
            } else if (todayTime < endDate) {
              return [...acd, {
                ...show,
                day,
                displayTimezone,
                startDate,
                easternDateStart,
                easternDateEnd,
                timeZone: timeZoneDate,
                startTimeDisplay: getShowToLocalTime(easternDateStart),
                endTimeDisplay: getShowToLocalTime(easternDateEnd),
              }];
            }
          }

          if (day === tomorrow) {
            const startDate = getShowTime(tomorrowDate, startTime);
            const easternDateStart = convertTimeToEastern(
              { dateInstance: tomorrowDate, time: startTime, timeZone: tomorrowTimeZone }
            );
            const easternDateEnd = convertTimeToEastern(
              { dateInstance: tomorrowDate, time: endTime, timeZone: tomorrowTimeZone }
            );

            return [...acd, {
              ...show,
              day,
              displayTimezone,
              startDate,
              easternDateStart,
              easternDateEnd,
              timeZone: timeZoneDate,
            }];
          }

          return acd;
        }, []);

      return [...acc, ...filteredShow];
    }

    return acc;
  }, [])
    ?.sort((a, b) => a?.startDate - b?.startDate);

  return {
    currentShow,
    nextShows: fullSchedule || [],
  };
};
