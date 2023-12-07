import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import VideoImage from '@univision/fe-video/dist/components/VideoImage';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  HORIZONTAL,
  VERTICAL,
} from '@univision/fe-commons/dist/constants/layoutTypes';
import {
  SEA_BUCKTHORN,
  GALLERY_GREY,
} from '@univision/fe-utilities/styled/constants';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import {
  LANDSCAPE,
  PORTRAIT,
  RECTANGLE,
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import PreviewVideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/PreviewVideoTracker';

import { VIDEO_PREVIEW_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/videoPreviewCard';
import Link from '../../../../Link';
import VideoProgressBar from '../../../VideoProgressBar';

import Styles from './SquareVideo.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const ProgressWrapper = styled.div`
  ${Styles.progressWrapper}
`;
const VideoCardOverlay = styled.div`
  ${Styles.videoCardOverlay}
`;
const VideoWrapper = styled.div`
  ${Styles.videoWrapper}
`;
const OverlayWrapper = styled.div`
  ${Styles.overlayWrapper}
`;

/**
 * Video with preview card component
 * @param {!Object} props - Props for this component
 * @param {string} [props.className] - The modifier class
 * @param {bool} [props.hideProgressBar = false] - true if it should hide progress bar
 * @param {Object} [props.image] - Video image
 * @param {bool} [props.isListCard = false] - true if is list card preview
 * @param {string} [props.layout] - the layout for the video preview if used in list card
 * @param {string} [props.mcpid] - Video mcpid
 * @param {bool} [props.preventFollowClick] - Adds link but prevents following it
 * @param {string} [props.size] - size of the card
 * @param {style} [props.style] - Modifier style
 * @param {string} [props.title] - Title of the video
 * @param {string} [props.type] - Type of card
 * @param {string} [props.uid] - Video preview uid
 * @param {string} [props.uri] - Video preview uri
 * @param {Object} [props.widgetContext] - Widget context
 * @returns {JSX}
 */
const SquareVideo = ({
  className,
  hideProgressBar,
  image,
  isListCard,
  layout,
  mcpid,
  preventFollowClick,
  size,
  style,
  title,
  type,
  uid,
  uri,
  widgetContext,
}) => {
  const cardTypeTracking = 'VideoCard2 preview - Square';
  const imageRatio = VIDEO_PREVIEW_CARD_RATIOS[layout || size];
  const pictureProps = {
    alt: title,
    image,
    overrideImageUrl: typeof image === 'string' ? image : getRenditionUrl(
      getKey(image, 'renditions.original', {}),
      imageRatio
    ),
    overrideImageBounds: imageRatio,
  };

  /**
   * Track clicks video preview
   */
  const trackClick = () => {
    PreviewVideoTracker.track(PreviewVideoTracker.events.trackEvent, {
      cardType: cardTypeTracking,
      title: title.toLowerCase(),
      trackEvent: 'click',
      uid,
      widgetContext: { ...widgetContext },
    });
  };

  return (
    <Wrapper
      className={className}
      isListCard={isListCard}
      layout={layout}
      style={style}
    >
      <ProgressWrapper hideProgressBar={hideProgressBar}>
        <VideoProgressBar
          mcpid={mcpid}
          strokeColor={SEA_BUCKTHORN}
          trailColor={GALLERY_GREY}
        />
      </ProgressWrapper>
      <VideoWrapper
        type={type}
        isListCard={isListCard}
        layout={layout}
      >
        <VideoImage pictureProps={pictureProps}>
          <Link
            useExplicitNavigation
            href={uri}
            onClick={trackClick}
            preventFollowClick={preventFollowClick}
          >
            <OverlayWrapper>
              <VideoCardOverlay type={type} />
            </OverlayWrapper>
          </Link>
        </VideoImage>
      </VideoWrapper>
    </Wrapper>
  );
};

SquareVideo.propTypes = {
  className: PropTypes.string,
  hideProgressBar: PropTypes.bool,
  image: PropTypes.object,
  isListCard: PropTypes.bool,
  layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  mcpid: PropTypes.string,
  preventFollowClick: PropTypes.bool,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  title: PropTypes.string,
  type: PropTypes.oneOf([
    LANDSCAPE,
    PORTRAIT,
    RECTANGLE,
    SQUARE,
  ]),
  uid: PropTypes.string,
  uri: PropTypes.string,
  widgetContext: PropTypes.object,
};

export default SquareVideo;
