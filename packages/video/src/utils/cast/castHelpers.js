import fetch from '@univision/fe-commons/dist/utils/fetch';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';
import getKey from '@univision/fe-utilities/helpers/object/getKey';

/**
 * Returns the TVSS Domain.
 * @param {string} domain - Current Auth TVSS Domain.
 * @returns {string}
 */
function getTvssDomain(domain) {
  return !domain.includes('https') ? `https://${domain}` : domain;
}
/**
 * get TVSS data.
 * @param {string} id - unique video Id
 * @param {Object} configUrls - cast urls
 * @param {string} mcpOrigin - domain to fetch tvss video
 * @param {string} tvssDomain - domain to fetch tvss video
 * @returns {Promise}
 */
const getTVSS = async (
  id,
  configUrls,
  mcpOrigin,
  tvssDomain,
) => {
  // TODO handle auth videos (https://github.com/univision/mobile-apps/blob/c62bde8ffbf9dd94a794c788c52dec4c648371fb/packages/core/src/helpers/tvss.js#L49)
  const vodURL = `${getTvssDomain(tvssDomain || configUrls?.TVSS)}/${configUrls?.TVSS_SUFFIX}?mcpids=${id}&mcpOrigin=${mcpOrigin}`;
  const response = await fetch(vodURL);
  return getKey(response, 'data[0].renditionUrl');
};

/**
 * get ima stream request.
 * @param {Object} imaRequestData - video dai data
 * @param {any} daiApi - dai sdk
 * @returns {Object}
 */
const getStreamRequest = (imaRequestData, daiApi) => {
  let streamRequest = null;
  if (imaRequestData.daiAssetKey) {
    streamRequest = new daiApi.LiveStreamRequest();
    streamRequest.assetKey = imaRequestData.daiAssetKey;
  } else {
    streamRequest = new daiApi.VODStreamRequest();
    streamRequest.contentSourceId = imaRequestData.cmsId;
    if (imaRequestData.videoId) {
      streamRequest.videoId = `BS_${imaRequestData.videoId}${imaRequestData.mcpOrigin === MX ? `_${MX}` : ''}`;
    }
  }
  if (imaRequestData.daiToken) {
    streamRequest.ApiKey = imaRequestData.daiToken;
  }
  if (imaRequestData.googleAdTag) {
    const tagParams = new URLSearchParams(imaRequestData.googleAdTag.split('?')?.[0]);
    const tagObj = {};
    tagParams.forEach((value, key) => {
      // add /dai to iu value, to differentiate mid rolls from pre rolls
      if (key === 'iu' && imaRequestData.daiAssetKey) tagObj[key] = `${value}/dai`;
      else tagObj[key] = value;
    });
    streamRequest.adTagParameters = tagObj;
  }
  return streamRequest;
};

/**
 * get custom data by parsing the URL (web)
 * @param {Object} mediaData - video data request object
 * @returns {Object}
 */
const getCustomDataFromUrl = (mediaData) => {
  const url = getKey(mediaData, 'media.entity');
  if (!url) return null;
  const customData = {};

  const queryString = url.split('?')?.[1];
  const searchParams = new URLSearchParams(queryString);
  searchParams.forEach((value, key) => {
    customData[key] = value;
  });

  return customData;
};

/**
 * format video to be passed into the player.
 * @param {Object} mediaData - media data passed in from the client
 * @param {Object} configUrls - cast urls
 * @param {any} streamManager - google CAF DAI stream manager
 * @param {any} daiApi - CAF dai sdk
 * @returns {Promise}
 */
const formatVideoData = async (mediaData, configUrls, streamManager, daiApi) => {
  const {
    contentId,
    contentUrl,
    customData: initCustomData,
    entity,
  } = mediaData.media;

  const isLive = !!entity && entity.includes('tkx.mp.lura.live');
  let customData = initCustomData;
  if (!initCustomData && !isLive) {
    customData = getCustomDataFromUrl(mediaData);
  }

  if (!customData || isLive) return { ...mediaData, media: { ...mediaData.media, streamType: isLive ? 'LIVE' : '' } };

  const mcpOrigin = getKey(customData, 'mcpOrigin');
  const googleAdTag = getKey(customData, 'googleAdTag');
  const tvssDomain = getKey(customData, 'tvssdomain', null);
  const playLiveAds = getKey(customData, 'playLiveAds', false);
  const skipAds = getKey(customData, 'skipAds', false);
  const vmapAdsRequest = skipAds ? {} : { adTagUrl: `${configUrls?.PUBADS_ADTAG}?${googleAdTag}` };

  const daiAssetKey = getKey(customData, 'daiAssetKey');
  // MX DAI, load after pre rolls
  if (daiAssetKey && skipAds) {
    const res = await streamManager
      .requestStream(mediaData, getStreamRequest(customData, daiApi))
      .catch(() => {
        return mediaData;
      });

    return res;
  }
  if (contentUrl) {
    return {
      ...mediaData,
      media: {
        ...mediaData.media,
        vmapAdsRequest: playLiveAds ? vmapAdsRequest : {},
      },
    };
  }

  if (skipAds) {
    const tvssUrl = await getTVSS(contentId, configUrls, mcpOrigin, tvssDomain).catch(() => '');
    return {
      ...mediaData,
      media: {
        ...mediaData.media,
        contentUrl: tvssUrl,
        vmapAdsRequest,
      },
    };
  }

  // return dai stream using stream manager
  const res = await streamManager.requestStream(mediaData, getStreamRequest(customData, daiApi))
    .catch(async () => {
      // video is not DAI, get TVSS url
      const tvssUrl = await getTVSS(contentId, configUrls, tvssDomain).catch(() => '');
      return {
        ...mediaData,
        media: {
          ...mediaData.media,
          contentUrl: tvssUrl,
          vmapAdsRequest,
        },
      };
    });

  return res;
};

export default formatVideoData;
