import React from 'react';
import PropTypes from 'prop-types';
import getRatioImages from '@univision/fe-components-base/dist/components/Picture/getRatioImages';
import {
  getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import VideoMetadata from '@univision/fe-video/dist/components/VideoMetadata';

/**
 * AMP embedded video
 * @returns {JSX}
 * @constructor
 */
const AmpVideo = ({
  autoplay,
  uri,
  pageData,
  playerType,
  title,
  widgetData,
  image,
}) => {
  const uriObject = new URL(uri);
  const uriPath = uriObject?.pathname;
  const uriHost = uriObject?.host;
  const ampVideoUrl = uriHost?.includes(TUDN_SITE) ? `https://tudn.com${uriPath}/embed` : `https://univision.com${uriPath}/embed`;
  const dataToQuery = MainTracking.getTrackingConfig({ data: pageData.data }) || {};
  dataToQuery.playerType = playerType;
  dataToQuery.uci_platform = 'Google AMP';
  dataToQuery.url = ampVideoUrl;
  dataToQuery.autoplay = autoplay;

  const queryString = encodeURIComponent(new URLSearchParams(dataToQuery).toString());
  const iframeUrl = `https://st1.uvnimg.com/d6/4a/84b0acc649389471e3710ea0cf5b/videoembed.html?${queryString}`;
  const iframeProps = {
    title,
    src: iframeUrl,
    width: 500,
    height: 281,
    layout: 'responsive',
    sandbox: 'allow-scripts allow-same-origin allow-popups',
    allowfullscreen: '',
    frameborder: 0,
  };

  const renditions = getKey(image, 'renditions', {});

  const images = getRatioImages({ renditions });

  return (
    <>
      <VideoMetadata page={widgetData || pageData} />
      <amp-iframe {...iframeProps}>
        <amp-img layout="fill" src={images.sm} placeholder />
      </amp-iframe>
    </>
  );
};

AmpVideo.propTypes = {
  autoplay: PropTypes.bool,
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  mcpid: PropTypes.string.isRequired,
  image: PropTypes.object,
  playerType: PropTypes.oneOf(['simple', 'playlist']),
  pageData: PropTypes.object,
  variant: PropTypes.oneOf(['dark', 'light']),
  widgetData: PropTypes.object,
};

AmpVideo.defaultProps = {
  autoplay: false,
  playerType: 'simple',
  pageData: {
    data: {
    },
  },
  variant: 'light',
};

export default AmpVideo;
