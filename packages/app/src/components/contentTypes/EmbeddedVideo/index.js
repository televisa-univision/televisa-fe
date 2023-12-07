import PropTypes from 'prop-types';
import React from 'react';

import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import LiveStream from '@univision/fe-video/dist/components/LiveStream';
import { VIDEO_PLAY_REASON_VIEWABLE } from '@univision/fe-commons/dist/constants/video';

/**
 * Container component representing a Video page
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const EmbeddedVideo = ({ pageData }) => {
  const { requestParams, theme, data } = pageData;

  let autoplayConf = VIDEO_PLAY_REASON_VIEWABLE;
  if (requestParams?.autoplay === 'false') {
    autoplayConf = false;
  }
  const disableVideoAds = data?.adSettings?.disableVideoAds;

  const commonProps = {
    ...data,
    autoplay: autoplayConf,
    embedVideo: true,
    hideMeta: true,
    hidePlaylist: true,
    env: requestParams.mode,
    theme,
    disableVideoAds,
  };

  let videoBlock = (
    <VideoPlayer
      {...commonProps}
      widgetData={data}
    />
  );

  if (commonProps.livestreamId) {
    videoBlock = (
      <LiveStream
        embedVideo
        {...data}
        autoplay={autoplayConf}
        disableVideoAds={disableVideoAds}
      />
    );
  }

  return videoBlock;
};

/**
 * propTypes
 * @property {Array} widgets - React widgets to be rendered in the page
 */
EmbeddedVideo.propTypes = {
  pageData: PropTypes.object.isRequired,
};

export default EmbeddedVideo;
