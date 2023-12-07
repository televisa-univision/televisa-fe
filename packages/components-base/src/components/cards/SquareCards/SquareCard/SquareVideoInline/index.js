import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LANDSCAPE, PORTRAIT, SQUARE } from '@univision/fe-commons/dist/constants/cardTypes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import features from '@univision/fe-commons/dist/config/features';

import { VIDEO_INLINE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/videoInlineCard';
import Title from '../../../../Title';
import Link from '../../../../Link';
import Styles from './SquareVideoInline.styles';

const Container = styled.div`
  ${Styles.container}
`;
const VideoWrapper = styled.div`
  ${Styles.videoWrapper}
`;
const VideoContainer = styled.div`
  ${Styles.videoContainer}
`;
const VideoInlineCardTitle = styled(Title).attrs({
  className: 'uvs-font-b-bold',
})`
  ${Styles.title}
`;
const LinkStyled = styled(Link)`
  ${Styles.titleLink}
`;
// Maximum amount of characters in title
const MAX_TITLE_CHARS_LENGTH = 100;

/**
 * Square Video inline
 * @param {!Object} props - Props for this component
 * @param {Object} [props.theme] - Theme for this card
 * @param {string} [props.className] - Class name override
 * @param {Object} [props.image] - Inline video image
 * @param {bool} [props.isDark = false] - true if it is in dark mode
 * @param {string} [props.mcpid] - Video mcpid
 * @param {Object} [props.sharing] - Sharing options
 * @param {string} [props.size] - the card size
 * @param {Object} [props.style] - Styles override
 * @param {string} [props.title] - Inline video title
 * @param {string} [props.type] - Type of card
 * @param {string} [props.uid] - Inline video uid
 * @param {string} [props.uri] - Inline video uri
 * @param {Object} [props.widgetContext] - Widget context
 * @param {Object} [props.adSettings] - Ad configuration settings
 * @returns {JSX}
 */
const SquareVideoInline = ({
  theme,
  className,
  image,
  isDark,
  mcpid,
  sharing,
  size,
  style,
  title,
  type,
  uid,
  uri,
  playlist,
  widgetContext,
  adSettings,
  ...mainVideo
}) => {
  const trackClick = CardTracker.onClickHandler({ uid, title }, widgetContext);
  const [playlistItem, setPlaylistItem] = useState({});
  const widgetData = {
    adSettings,
    image,
    mcpid,
    title,
    playlist,
    sharing,
    uid,
    uri,
    ...mainVideo,
  };
  const isWorldCupMVP = features.deportes.isWorldCupMVP();

  return (
    <Container className={className} style={style} size={size}>
      <VideoWrapper size={size}>
        <VideoContainer size={size}>
          <VideoPlayer
            disableVideoAds={adSettings?.disableVideoAds}
            hideMeta
            hidePlaylist
            overrideImageUrl={getRenditionUrl(
              getKey(image, 'renditions.original', {}),
              VIDEO_INLINE_CARD_RATIOS[size],
            )}
            onPlaylistItemChange={videoData => setPlaylistItem(videoData)}
            widgetData={widgetData}
          />
        </VideoContainer>
      </VideoWrapper>
      <VideoInlineCardTitle
        size={size}
        isDark={isDark}
        fontName={getKey(theme, `headlineFont.${type}`)}
        isWorldCupMVP={isWorldCupMVP}
      >
        <LinkStyled
          useExplicitNavigation
          href={playlistItem.link || uri}
          onClick={trackClick}
          size={size}
          type={type}
        >
          {truncateString(
            playlistItem.title || title,
            { maxChars: MAX_TITLE_CHARS_LENGTH }
          )}
        </LinkStyled>
      </VideoInlineCardTitle>
    </Container>
  );
};

SquareVideoInline.propTypes = {
  className: PropTypes.string,
  image: PropTypes.object,
  isDark: PropTypes.bool,
  mcpid: PropTypes.string,
  playlist: PropTypes.array,
  sharing: PropTypes.object,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  theme: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.oneOf([LANDSCAPE, PORTRAIT, SQUARE]),
  uid: PropTypes.string,
  uri: PropTypes.string,
  widgetContext: PropTypes.object,
  adSettings: PropTypes.object,
};

SquareVideoInline.defaultProps = {
  theme: {},
};

export default SquareVideoInline;
