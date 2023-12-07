import React from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Picture from '@univision/fe-components-base/dist/components/Picture';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import BackgroundImage from '@univision/fe-components-base/dist/components/BackgroundImage';
import Loading from '@univision/fe-components-base/dist/components/Loading';
import VideoPlayerButton from '../VideoPlayerButton';

import Styles from './VideoPlaceholder.scss';

/**
 * Renders the placeholder with a "loading" indicator
 * @type {string}
 */
export const TYPE_LOADER = 'loaderIndicator';
/**
 * Renders the placeholder with a "play" icon
 * @type {string}
 */
export const TYPE_PLAY_ICON = 'playIcon';

/**
 * Returns the fallback for the video preview.
 * @returns {*}
 */
const fallbackRender = () => <Picture />;

/**
 * Placeholder to render for a video while the SDK is loading.
 * @param {string} backgroundImageOverrideUrl Override the given image, it's optional.
 * @param {Object} image Video promo image.
 * @param {boolean} isPlayerReady True if the SDK is ready to play this video.
 * @param {Object} theme WebApp theming
 * @returns {*}
 * @constructor
 */
const VideoPlaceholder = ({
  backgroundImageOverrideUrl,
  image,
  isPlayerReady,
  placeholderType,
  theme,
}) => {
  const bgImageClass = Styles.videoStill;
  const deviceSizeOverrides = {
    xl: sizes.MEDIUM,
    lg: sizes.MEDIUM,
    md: sizes.SMALL,
    sm: sizes.X_SMALL,
    xs: sizes.XX_SMALL,
  };

  return (
    <>
      <ErrorBoundary fallbackRender={fallbackRender}>
        {image || backgroundImageOverrideUrl ? (
          <BackgroundImage
            className={bgImageClass}
            deviceSizeOverrides={deviceSizeOverrides}
            image={image}
            overrideImageUrl={backgroundImageOverrideUrl}
          />
        ) : (
          <div className={bgImageClass} />
        )}
      </ErrorBoundary>
      {!isPlayerReady && placeholderType === TYPE_LOADER && (
        <div className={Styles.loaderContainer}>
          <Loading
            className={Styles.loader}
            label={`${localization.get('loadingVideo')}...`}
            theme={theme}
          />
        </div>
      )}
      {placeholderType === TYPE_PLAY_ICON && (
        <div className={Styles.playIconContainer}>
          <VideoPlayerButton />
        </div>
      )}
    </>
  );
};

VideoPlaceholder.propTypes = {
  backgroundImageOverrideUrl: PropTypes.string,
  image: PropTypes.object,
  isPlayerReady: PropTypes.bool,
  theme: PropTypes.object,
  placeholderType: PropTypes.oneOf([TYPE_LOADER, TYPE_PLAY_ICON]),
};

VideoPlaceholder.defaultProps = {
  placeholderType: TYPE_LOADER,
  isPlayerReady: false,
  theme: {},
};

export default VideoPlaceholder;
