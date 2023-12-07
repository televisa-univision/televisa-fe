import * as bodyScrollLock from 'body-scroll-lock';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidString from '@univision/fe-utilities/helpers/common/isValidString';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import Store from '@univision/fe-commons/dist/store/store';
import { requestWithBasicAuth } from '@univision/fe-commons/dist/utils/api/request';
import { showPopup } from '@univision/fe-commons/dist/store/actions/popups-actions';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import {
  getConfig,
  getTheme,
  getPageData,
} from '@univision/fe-commons/dist/store/storeHelpers';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';

import { TUDN_MVPD_POPUP, TUDN_MVPD_POPUP_FORM } from '@univision/fe-deportes/dist/constants';
import getRatioImages from '@univision/fe-components-base/dist/components/Picture/getRatioImages';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import { FREE_PREVIEW_POPUP, VIDEO_TYPE_LIVESTREAM } from '@univision/fe-commons/dist/constants/video';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';

const MAX_TITLE_LENGTH = 75;
const DURATION_LIVE_TYPE = 'live';

/**
 * Determines if the specified access rules allow access based on the user's location.
 * @param {Array} accessRules array of access rules
 * @param {string} userLocation two digits user location
 * @returns {boolean}
 */
export const isVideoAccessRuleAllowed = (accessRules, userLocation) => {
  if (!userLocation) {
    return true;
  }

  const isAccessDenied = accessRules?.some((rule) => {
    const { access, conditions } = rule;
    const isAnyLocationConditionMatched = conditions?.some((condition) => {
      const { scope, value } = condition;
      return scope === 'country' && value === userLocation;
    });

    switch (access) {
      case 'public':
        // Public is available everywhere except any of the location conditions
        // so access is denied if the user's location matches any of the conditions
        // e.g. available everywhere except US and PR
        return isAnyLocationConditionMatched;
      case 'private':
        // Private is available only in any of the location conditions
        // so access is denied if the user's location does NOT match any of the conditions
        // e.g. available only in US or PR
        return !isAnyLocationConditionMatched;
      default:
        return false;
    }
  });

  return !isAccessDenied;
};

/**
 * Filters non MX access rules for MX users (only on soccer matches)
 * @param {Array} videos array of videos
 * @param {string} userLocation two digits user location
 * @param {boolean} isSoccerMatch checks if current playlist is from a match
 * @returns {[]}
 */
export function geoFilterVideos(videos, userLocation, isSoccerMatch) {
  if (userLocation === MX && isSoccerMatch && isValidArray(videos)) {
    return videos.filter(video => isVideoAccessRuleAllowed(video.accessRules, MX));
  }

  return videos;
}

/**
 * Returns fallback video if available and the user does not have access to the specified video.
 * @param {Object} rawVideoData raw video content
 * @param {string} overrideUserLocation override user location
 * @returns {Object} fallback video content or rawVideoData
 */
export const considerVideoFallback = (rawVideoData, overrideUserLocation) => {
  const accessRules = rawVideoData?.accessRules;
  const userLocation = overrideUserLocation || rawVideoData?.userLocation;

  if (!isVideoAccessRuleAllowed(accessRules, userLocation)) {
    const videoFallback = rawVideoData?.videoFallback;
    if (videoFallback) {
      return videoFallback;
    }
    // access is denied but there is no fallback so video will fail to play
  }

  return rawVideoData;
};

/**
 * convert into an array of objects that ContentCard and other components can consume
 * @param   {[type]} items items data from bex
 * @param   {boolean} isWorldCupMVP feature flag for WorldCup MVP
 * @param   {string} overrideUserLocation override user location
 * @returns {Array} the items converted into component-consumable props
 */
export function parsePlaylistItems(items, isWorldCupMVP = false, overrideUserLocation) {
  // Extra check, if items is null, it won't default to []
  if (!isValidArray(items)) return [];

  return items.map((item) => {
    const userLocation = overrideUserLocation || item?.userLocation;
    const currentItem = (isWorldCupMVP ? considerVideoFallback(item, overrideUserLocation)
      : item) || {};
    const {
      auth,
      isAuth,
      authRequired,
      channelId,
      eventId,
      livestreamId,
      matchId,
      mcpid,
      keywords,
      optaId,
      parent,
      rating = '',
      duration,
      durationString,
      permalink,
      streamId,
      supplier,
      title,
      uid,
      videoType,
      type,
      uri,
    } = currentItem;

    let shortTitle;

    if (isValidString(title)) {
      if (title.length > MAX_TITLE_LENGTH) {
        shortTitle = `${title.substring(0, MAX_TITLE_LENGTH)}...`;
      } else {
        // If the title has less than 75 chars let's use it as the shortTitle fallback.
        shortTitle = title;
      }
    }

    let actionId;
    if (isValidArray(keywords)) {
      actionId = keywords.find(value => isValidString(value)
        && value.toLowerCase().includes('actionid'))?.replace(/\D/g, '');
    }

    const isSoccerMatch = typeof matchId !== 'undefined';
    const isLivestream = videoType === VIDEO_TYPE_LIVESTREAM || type === VIDEO_TYPE_LIVESTREAM;
    const isMexico = userLocation === 'MX';
    const identifier = isMexico ? optaId || eventId || mcpid || livestreamId
      : optaId || channelId || streamId || livestreamId || mcpid || eventId;

    const metadata = {
      ...currentItem,
      authRequired: authRequired || isAuth || auth,
      identifier,
      isLivestream,
      isSoccerMatch,
      rating: isSoccerMatch ? 'TV-PG' : rating,
      duration: duration || DURATION_LIVE_TYPE,
      type: isLivestream ? VIDEO_TYPE_LIVESTREAM : contentTypes.VIDEO,
      durationString: durationString || DURATION_LIVE_TYPE,
      category: parent?.title,
      videoType: videoType || type,
      contentId: uid,
      shortTitle,
      uri: permalink || uri,
      source: supplier,
      sharingOptions: {
        ...currentItem?.sharing?.options,
      },
      actionId,
      caption: currentItem?.image?.caption,
      credit: currentItem?.image?.credit,
      updateDate: currentItem?.publishDate,
    };

    return metadata;
  });
}

/**
 * convert image.renditions to image/cover values that can be
 * consumed by fmg-video-sdk
 * @param {Array} content the widget content array
 * @returns {Array} the content array with image and cover properties injected
 */
export function getImagesForVideoSDK(content) {
  if (!isValidArray(content)) return [];

  const overrides = {
    xl: sizes.MEDIUM,
    lg: sizes.MEDIUM,
    md: sizes.MEDIUM,
    sm: sizes.X_SMALL,
  };

  return content.filter(c => getKey(c, 'image.renditions')).map((c) => {
    const images = getRatioImages({ renditions: c.image.renditions, overrides });
    const mcpId = getKey(c, 'mcpid', '');
    return {
      mcpId: mcpId.toString(),
      image: images.sm,
      cover: images.md,
    };
  });
}

/**
 * Load additional video metadata
 * @param {Array} mcpIds list of mcpIds to fetch
 * @returns {Object} metadata;
 */
/* istanbul ignore next */
export async function fetchVideoMetadata(mcpIds = []) { // eslint-disable-line
  let response;

  if (!(mcpIds && mcpIds.length)) {
    return [];
  }

  const reqParams = {
    mcpids: mcpIds.join(','),
  };

  const args = {
    uri: getConfig(Store, 'syndicator.video'),
    params: reqParams,
  };

  try {
    response = await requestWithBasicAuth(args);
  } catch (err) {
    return [];
  }

  if (
    !!response
    && response.status
    && response.status === 'success'
    && response.data
    && Array.isArray(response.data)
    && response.data.length
  ) {
    return response.data;
  }

  return [];
}

/**
 * Gets video placeholder image
 * @returns {string} path name to placeholder image
 */
export async function getPlaceholderImage() {
  const theme = getTheme(Store);
  const imageVariant = theme.variant === 'theme' ? 'dark' : theme.variant;
  const imagePath = `@univision/fe-commons/dist/assets/images/playlist-thumb-${imageVariant}.png`;
  const img = await import(/* webpackChunkName: "playlistThumb" */ imagePath);
  return getKey(img, 'default', img);
}

/**
 * Generates a video player id joining 'player-' with a random number between 0 - 9999999
 * @param {boolean} withPlayerPrefix wether to append 'player-' or not
 * @returns {string} video player id
 */
export function generateVideoPlayerId(withPlayerPrefix = true) {
  const random = Math.floor(Math.random() * 9999999);

  if (!withPlayerPrefix) {
    return random;
  }

  return `player-${random}`;
}

/**
 * enable autoplay for the first enhancement only
 * @param {Object} mcpId current enhancement mcpId
 * @returns {boolean}
 */
export function enableEnhancementAutoplay(mcpId) {
  const pageData = getPageData(Store);
  const leadType = getKey(pageData, 'data.leadType', null);

  if (leadType === 'video' || !getKey(pageData, 'data.body')) return false;

  const firstEnhancement = pageData.data.body.find((item) => {
    const enhancementType = getKey(item, 'objectData.type', null);
    return item.type === 'enhancement' && enhancementType === 'video';
  });

  return getKey(firstEnhancement, 'objectData.mcpid', null) === mcpId;
}

/**
 * Check for MVPD preauthorized resources if it's allowed
 * @param {Object} data - authorized data from SDK validation
 * @param {boolean} data.isAllowed - true if user isAllowed
 * @param {boolean} data.packageAllowed - true if user has the allowed package
 * @param {Array} data.userChannels - list of the user channels
 */
export function checkPreauthorizedResources({
  isAllowed,
  packageAllowed,
  userChannels,
}) {
  if (isAllowed) {
    return;
  }
  if (!packageAllowed) {
    Store.dispatch(showPopup(TUDN_MVPD_POPUP_FORM));
  } else if (!isValidArray(userChannels)) {
    Store.dispatch(showPopup(TUDN_MVPD_POPUP));
  }
}

/**
 * Check for free video preview
 * @param {Object} isFreePreview - show free
 */
export function checkFreeVideoPreview(isFreePreview) {
  if (isFreePreview) {
    Store.dispatch(showPopup(FREE_PREVIEW_POPUP));
  }
}

/**
 * call disableBodyScroll if player is expanded on mobile
 * @param {boolean} enabled true if player is expanded
 */
export const lockUnlockBody = (enabled) => {
  const targetElement = document.querySelector('#responsive-playlist-inner');
  const $body = document.querySelector('body');

  if (enabled && targetElement) {
    bodyScrollLock.disableBodyScroll(targetElement);
    $body.classList.add('lock-body');
  } else {
    bodyScrollLock.clearAllBodyScrollLocks();
    $body.classList.remove('lock-body');
  }
};

/**
 * get Language params
 * @returns {?string}
 */
export const getVideoLanguageParams = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang');
  } catch (e) {
    return null;
  }
};

/**
 * Set Video Language URL params
 * @param {string} lang - the param language to set
 * @returns {?string}
 */
export const setVideoLanguageParams = (lang) => {
  try {
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lang);
    const newURL = new URL(window.location.href);
    newURL.search = params.toString();
    window.history.replaceState({ path: newURL.href }, '', newURL.href);
    return newURL.href;
  } catch (e) {
    e.message = `Error setting video language params: ${e.message}`;
    clientLogging(e);
    return null;
  }
};
