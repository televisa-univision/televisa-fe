import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import classnames from 'classnames';

// eslint-disable-next-line no-restricted-imports
import Store from '@univision/fe-commons/dist/store/store';
import setCacheBuster from '@univision/fe-utilities/helpers/content/setCacheBuster';
import features from '@univision/fe-commons/dist/config/features';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import { VISIBILITY_SENSOR_SCROLL_THROTTLE } from '@univision/fe-commons/dist/constants/spa';
import {
  imageCacheBusterSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';

import Picture from '@univision/fe-components-base/dist/components/Picture';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import * as ratios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';

import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { VIDEO_INLINE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/videoInlineCard';
import { LANDSCAPE } from '@univision/fe-commons/dist/constants/cardTypes';
import Styles from './Slide.scss';

const deviceSizeOverrides = {
  xl: sizes.MEDIUM,
  lg: sizes.MEDIUM,
};

/**
 * Slide component
 */
class Slide extends React.Component {
  /**
   * Flag to store the tracked status.
   * @type {boolean}
   */
  tracked = false;

  /**
   * Creates tracking event data for a slide change in vertical slideshows
   * @param {boolean} isVisible true or false
   */
  handleSlideVisibilityChange = (isVisible) => {
    if (isVisible) {
      SlideshowTracker.track(
        SlideshowTracker.events.change,
        this.createSlideChangeEventData(),
      );
      if (!this.tracked) {
        comScoreManager.beacon();
      }
      this.tracked = true;
    }
  }

  /**
   * Creates tracking event data for a slide change in vertical slideshows
   * @returns {Object}
   */
  createSlideChangeEventData = () => {
    const {
      depth,
      index,
      primaryTag,
      slide,
      slidesLength,
      title,
      uid,
    } = this.props;
    const content = getKey(slide, 'content', slide.image);
    const eventData = {
      activeSlide: slide,
      activeSlideNumber: index + 1,
      primaryTag,
      slidesLength,
      title,
      type: content?.type,
      uid,
      vertical: true,
    };

    if (features.slideshows.vertical.stitchingEnabled()) {
      eventData.slideshowDepth = depth;
    }

    return eventData;
  };

  /**
   * Return Video component
   * @returns {JSX.Element}
   */
  renderVideo () {
    const { slide, primaryTag } = this.props;
    const content = getKey(slide, 'content', {});
    const disableVideoAds = getKey(content, 'adSettings.disableVideoAds', false);

    return (
      <div className={classnames(Styles.wrapper)}>
        <VideoPlayer
          allowAnchor
          autoplay={false}
          disableVideoAds={disableVideoAds}
          hideMeta
          hidePlaylist
          primaryTag={primaryTag}
          overrideImageUrl={
            getRenditionUrl(
              getKey(content, 'image.renditions.original', {}), VIDEO_INLINE_CARD_RATIOS[LANDSCAPE],
            )
          }
          widgetData={content}
        />
      </div>
    );
  }

  /**
   * Return Image component
   * @returns {JSX.Element}
   */
  renderImage () {
    const { slide } = this.props;
    const content = slide.content || slide.image;
    const imageCacheBuster = imageCacheBusterSelector(Store.getState());
    const contentWidth = getKey(content, 'renditions.original.width', content.width);
    const contentHeight = getKey(content, 'renditions.original.height', content.height);
    const isContentVertical = contentWidth !== 0 && contentWidth <= contentHeight;
    const overrideImageUrl = imageCacheBuster
      ? setCacheBuster(getKey(content, 'renditions.original.href'))
      : null;

    return (
      <div className={Styles.pictureWrapper}>
        <Picture
          alt={content.caption}
          image={content}
          deviceSizeOverrides={deviceSizeOverrides}
          aspectRatio={ratios.ASPECT_RATIO_VERTICAL_SLIDESHOW}
          overrideImageUrl={overrideImageUrl}
          className={
            classnames(
              Styles.picture,
              isContentVertical ? Styles.portrait : Styles.landscape,
            )
          }
        />
      </div>
    );
  }

  /**
   * Slide slideshow component.
   * @returns {JSX}
   */
  render () {
    const { slide } = this.props;
    const content = slide.content || slide.image;

    return (
      <VisibilitySensor
        partialVisibility
        minTopValue={300}
        scrollCheck
        intervalCheck={false}
        scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
        onChange={isVisible => this.handleSlideVisibilityChange(isVisible)}
      >
        <div className={classnames(Styles.image, 'row no-gutters')}>
          <div className={classnames(Styles.imageWrap, 'col-md-10')}>
            <FullWidth breakpoints={['xxs']}>
              {content.type === 'video' && this.renderVideo()}
              {content.type === 'image' && this.renderImage()}
            </FullWidth>
          </div>
        </div>
      </VisibilitySensor>
    );
  }
}

/**
 * propTypes
 * @property {number} index slide index
 * @property {Object} primaryTag Slideshow primary tag
 * @property {Object} slide current slide
 * @property {number} slidesLength length
 * @property {string} title for the content
 * @property {string} uid content uid
 */
Slide.propTypes = {
  depth: PropTypes.number,
  index: PropTypes.number.isRequired,
  primaryTag: PropTypes.object.isRequired,
  slide: PropTypes.object.isRequired,
  slidesLength: PropTypes.number.isRequired,
  title: PropTypes.string,
  uid: PropTypes.string,
};

export default Slide;
