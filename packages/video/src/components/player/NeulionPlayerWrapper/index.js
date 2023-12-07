import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import { localMarketSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { doIfPlayerExists } from '@univision/fe-commons/dist/utils/video';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import RatingValidator from './NeulionPlayerRatingValidator';

import Video from '../../Video';

/**
 * triggers match over
 * @param {Object} options - Config for playlist init
 */
export const initNeulionLivestream = (options) => {
  if (hasKey(global, 'window.FMG.playLivestream')) {
    global.window.FMG.playLivestream(options);
  }
};

/**
 * Gets relevant LiveStream metadata
 * @param {Object} props - Component properties.
 * @param {string} nodeId - Player instance id
 * @returns {*[]}
 */
export const getLivestreamData = async (props, nodeId) => {
  const {
    settings: {
      livestream,
    },
    market,
  } = props;
  const { channelId, seoName } = marketCoordinates[market];
  await RatingValidator.initLivestreamValidation(seoName, nodeId);
  const rating = RatingValidator.getCurrentRating();

  livestream.isActive = getKey(livestream, 'isActive', getKey(livestream, 'active'));
  livestream.isVertical = getKey(livestream, 'isVertical', getKey(livestream, 'vertical'));
  livestream.isAuth = getKey(livestream, 'isAuth', getKey(livestream, 'auth'));
  livestream.disableAds = getKey(livestream, 'adSettings.disableVideoAds', false);

  return {
    ...livestream,
    channelId,
    image: livestream.mainImage || getKey(livestream, 'image.renditions.original.href', ''),
    rating,
  };
};

/**
 * Execute this custom fuction here instead of calling default FMG
 * @param {Object} props - Extra options to be sent to the SDK
 * @returns {Function}
 */
export const fmgCustom = props => async (options) => {
  const { nodeId } = options;
  const livestreamData = await getLivestreamData(props, nodeId);
  const disableAds = getKey(livestreamData, 'disableAds');

  if (hasKey(global, 'window.FMG')) {
    global.window.FMG.on('mvpdCheckAuthorizationFail', ({ nodeId: playerId }) => {
      /* Stop timer validator */
      RatingValidator.clearTimer();
      /* Stop player if user doesn't pass the rating authorization */
      doIfPlayerExists(playerId, (player) => {
        player.stop();
      });
    }, nodeId);
  }

  initNeulionLivestream({
    ...livestreamData,
    ...options,
    disableAds: options.disableAds || disableAds,
    disableFirstPreroll: false,
    isNeulion: true,
  });
};

/**
 * NeulionPlayerWrapper
 * @param {Object} props - Component properties.
 * @returns {*}
 * @constructor
 */
const NeulionPlayerWrapper = (props) => {
  const videoRef = useRef(null);
  const {
    settings: { livestream },
    playlist,
  } = props;
  const market = useSelector(localMarketSelector);

  /**
   * unmount the component
   * - Release current timer rating validator
   */
  useEffect(() => () => {
    const { nodeId } = videoRef.current;
    global.window.FMG.off('mvpdCheckAuthorizationFail', nodeId);
    RatingValidator.clearTimer();
  }, []);

  return (
    <Video
      ref={videoRef}
      {...props}
      widgetData={livestream}
      image={getKey(livestream, 'image')}
      isLiveStream={getKey(livestream, 'isActive', getKey(livestream, 'active'))}
      fmgCall={{
        name: 'playLivestream',
        custom: fmgCustom({
          ...props,
          playlist,
          market,
        }),
      }}
    />
  );
};

NeulionPlayerWrapper.propTypes = {
  hidePlaylist: PropTypes.bool,
  pageData: PropTypes.object,
  playlist: PropTypes.array,
  settings: PropTypes.shape({
    livestream: PropTypes.object,
  }).isRequired,
};

export default NeulionPlayerWrapper;
