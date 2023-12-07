import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Caption from '@univision/fe-components-base/dist/components/Caption';
import { VIDEO_PLAY_REASON_VIEWABLE } from '@univision/fe-commons/dist/constants/video';
import features from '@univision/fe-commons/dist/config/features';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { enableEnhancementAutoplay, isVideoAccessRuleAllowed } from '../../../helpers';

/**
 * VideoEnhancement - Video + Caption
 * @param {Object} props component propTypes
 * @returns {JSX}
 */
const VideoEnhancement = ({ theme, isFullWidth, ...enhancementData }) => {
  const enableAutoplay = enableEnhancementAutoplay(enhancementData.mcpid);
  const { adSettings: { disableVideoAds } = {} } = enhancementData;
  const videoOptions = {
    autoplay: enableAutoplay ? VIDEO_PLAY_REASON_VIEWABLE : false,
    disableVideoAds,
    hideMeta: true,
    hidePlaylist: true,
    ...enhancementData,
  };
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const accessRules = enhancementData?.accessRules;
  const userLocation = useSelector(userLocationSelector);
  const title = isWorldCupMVP && !isVideoAccessRuleAllowed(accessRules, userLocation)
    ? enhancementData?.videoFallback?.title : enhancementData?.title;
  return (
    <div>
      {isFullWidth ? (
        <FullWidth breakpoints={['xxs', 'xs', 'sm', 'md', 'lg', 'xl']}>
          <VideoPlayer {...videoOptions} widgetData={enhancementData} />
        </FullWidth>
      ) : <VideoPlayer {...videoOptions} widgetData={enhancementData} />}
      {title && <Caption content={title} type="article" theme={theme} isWorldCupMVP={isWorldCupMVP} />}
    </div>
  );
};

VideoEnhancement.propTypes = {
  isFullWidth: PropTypes.bool,
  enhancementData: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  theme: PropTypes.object,
};

VideoEnhancement.defaultProps = {
  isFullWidth: false,
};

export default VideoEnhancement;
