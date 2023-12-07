import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { PORTRAIT } from '@univision/fe-commons/dist/constants/cardTypes';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import { VIDEO_INLINE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/videoInlineCard';

import Styles from './WeatherCardVideo.styles';

const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Renders a video player for the weather card widget
 * @param {Object} props All props object for this component
 * @param {string} props.className Optional class name for additional styling
 * @param {Object} props.image Poster image for the video
 * @param {string} props.mcpid Video mcpid
 * @param {Object} props.playlist Current video playlist
 * @param {Object} props.sharing Sharing options for this component}
 * @param {string} props.title Title for the video
 * @param {string} props.uri Video landing page URI
 * @param {Object} props.adSettings ad configuration settings
 * @returns {JSX}
 */
const WeatherCardVideo = ({
  className,
  image,
  mcpid,
  playlist,
  sharing,
  title,
  uid,
  uri,
  adSettings,
  ...mainVideo
}) => {
  const widgetData = {
    adSettings,
    image,
    mcpid,
    playlist,
    sharing,
    title,
    uid,
    uri,
    ...mainVideo,
  };

  return (
    <Wrapper className={className}>
      <VideoPlayer
        autoplay={false}
        disableVideoAds={adSettings?.disableVideoAds}
        overrideImageUrl={getRenditionUrl(
          getKey(image, 'renditions.original', {}),
          VIDEO_INLINE_CARD_RATIOS[PORTRAIT],
        )}
        hideMeta
        hidePlaylist
        widgetData={widgetData}
      />
    </Wrapper>
  );
};

WeatherCardVideo.propTypes = {
  className: PropTypes.string,
  image: PropTypes.object,
  mcpid: PropTypes.string,
  playlist: PropTypes.object,
  sharing: PropTypes.object,
  title: PropTypes.string,
  uid: PropTypes.string,
  uri: PropTypes.string,
  adSettings: PropTypes.object,
};

export default WeatherCardVideo;
