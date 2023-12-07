import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import VisibilitySensor from 'react-visibility-sensor';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import {
  getTheme,
  getSharingOptions,
  getDevice,
} from '@univision/fe-commons/dist/store/storeHelpers';
import { LANDSCAPE } from '@univision/fe-commons/dist/constants/cardTypes';
import {
  imageCacheBusterSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Features from '@univision/fe-commons/dist/config/features';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { VIDEO_INLINE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/videoInlineCard';
import slideshowAds from '@univision/fe-commons/dist/utils/ads/Slideshow/slideshowAds';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import { VISIBILITY_SENSOR_SCROLL_THROTTLE } from '@univision/fe-commons/dist/constants/spa';
import { getSharingValues } from 'app/utils/helpers/helpers';
import setCacheBuster from '@univision/fe-utilities/helpers/content/setCacheBuster';

import Picture from '@univision/fe-components-base/dist/components/Picture';
import Caption from '@univision/fe-components-base/dist/components/Caption';
import Truncate from '@univision/fe-components-base/dist/components/Truncate';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import * as ratios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import ThemeStyle from '@univision/fe-commons/dist/utils/themes/ThemeStyle';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';

import lazyloadConfig from '../../../../utils/factories/lazyloadConfig.json';
import Styles, { captionWrap } from './VerticalSlideshowWrapper.scss';
import isValidArray from '../../../../../../../utilities/esm/helpers/common/isValidArray';

/**
 * Get shortened slide content id
 * @param {Object} slideContentId the id to shorten
 * @returns {string}
 */
const shortSlideContentId = slideContentId => slideContentId
  .substring(slideContentId.lastIndexOf('-') + 1, slideContentId.length);

/**
 * Creates tracking event data for a slide change in vertical slideshows
 * @returns {Object}
 */
const createSlideChangeEventData = ({
  depth,
  index,
  primaryTag,
  slide,
  slides,
  title,
  type,
  uid,
}) => {
  const eventData = {
    activeSlide: slide,
    activeSlideNumber: index + 1,
    primaryTag,
    slidesLength: slides.length,
    title,
    type,
    uid,
    vertical: true,
  };

  if (Features.slideshows.vertical.stitchingEnabled()) {
    eventData.slideshowDepth = depth;
  }

  return eventData;
};

/**
 * Vertical slideshow component.
 */
class VerticalSlideshowWrapper extends React.PureComponent {
  /**
   * Object to store the tracked slides.
   * @type {{}}
   */
  trackedIndexes = {};

  /**
   * Return Video component
   * @param {Object} slide content to be displayed
   * @param {string} primaryTag tag information
   * @returns {JSX.Element}
   */
  static renderVideo (slide, primaryTag) {
    const { content } = slide;
    const disableVideoAds = getKey(content, 'adSettings.disableVideoAds', false);

    return (
      <div className={classnames(Styles.wrapper)}>
        <VideoPlayer
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
   * @param {Object} slide content to be displayed
   * @param {bool} isContentVertical portrait or landscape
   * @returns {JSX.Element}
   */
  static renderImage (slide, isContentVertical) {
    const image = slide.content || slide.image;
    const imageCacheBuster = imageCacheBusterSelector(Store.getState());
    const deviceSizeOverrides = {
      xl: sizes.MEDIUM,
      lg: sizes.MEDIUM,
    };
    const overrideImageUrl = imageCacheBuster ? setCacheBuster(
      getKey(image, 'renditions.original.href')
    ) : null;

    return (
      <Picture
        className={classnames(
          isContentVertical ? Styles.portrait : Styles.landscape,
          Styles.picture,
        )}
        alt={getKey(slide, 'caption')}
        image={image}
        deviceSizeOverrides={deviceSizeOverrides}
        aspectRatio={ratios.ASPECT_RATIO_VERTICAL_SLIDESHOW}
        overrideImageUrl={overrideImageUrl}
      />
    );
  }

  /**
   * Render Ad component
   * @param {array} filteredSlides slides
   * @param {number} index of the slide
   * @returns {JSX.Element|null}
   */
  static renderAd (filteredSlides, index) {
    if (index !== filteredSlides.length - 1) {
      const currentSlide = filteredSlides[index];
      const nextSlide = filteredSlides[index + 1];
      const currentContentType = currentSlide.content?.type;
      const nextContentType = nextSlide.content?.type;
      if (currentContentType !== 'video' && nextContentType !== 'video') {
        return (
          <div className="row no-gutters">
            <FullWidth breakpoints={['xxs', 'xs', 'sm', 'md', 'xl', 'lg']}>
              <div className={classnames(Styles.adContainer, 'col-md-12')}>
                {slideshowAds.getInlineAd(index + 2, true)}
              </div>
            </FullWidth>
          </div>
        );
      }
    }
    return null;
  }

  /**
   * Vertical slideshow component.
   * @returns {JSX}
   */
  render() {
    const {
      depth, slides, uid, title, primaryTag,
    } = this.props;
    let lastTracked;

    /**
     * Handles visibility changes for Slide. If visible, then track the event
     * @param {string} type image or video
     * @param {boolean} isVisible Visibility status for the slide
     * @param {Object} slide Current slide
     * @param {number} index Slide index
     */
    const handleSlideVisibilityChange = (type, isVisible, slide, index) => {
      if (isVisible && lastTracked !== index) {
        lastTracked = index;

        SlideshowTracker.track(SlideshowTracker.events.change, createSlideChangeEventData({
          depth,
          index,
          primaryTag,
          slide,
          slides,
          title,
          type,
          uid,
        }));
        if (!this.trackedIndexes[index]) {
          comScoreManager.beacon();
        }
        this.trackedIndexes[index] = true;
      }
    };

    /**
     * Get Caption of a slide
     * @param {Object} slide Object
     * @param {Object} theme Object
     * @param {boolean} isVertical true or false
     * @returns {JSX}
     */
    const getCaption = (slide, theme, isVertical) => {
      if (slide.hideCaption) return null;

      const content = slide.content || slide.image;
      const caption = slide.caption || content?.caption || content?.description || content?.title;
      const credit = content?.credit || slide.credit;
      const creditSpan = credit ? `<span class="${Styles.creditCaption}">${credit}</span>` : '';

      if (!caption) return null;

      if (isVertical) {
        return (
          <Truncate
            text={`${caption} ${creditSpan}`}
            html={`${caption} ${creditSpan}`}
            theme={theme}
            className={Styles.captionTruncate}
            trimLength={200}
          />
        );
      }

      return (
        <Caption
          content={caption}
          credit={credit}
          theme={theme}
          type="slideshowVertical"
        />
      );
    };

    /**
     * Retrieve original object from image or video
     * @param {Object} slide slide object with image or video
     * @returns {boolean}
     */
    const getContent = (slide) => {
      const image = getKey(slide, 'content.image', slide.content) || slide.image;
      return getKey(image, 'renditions.original');
    };

    const shareData = {
      title,
      uid,
      primaryTag,
      vertical: true,
      type: 'slideshow',
    };
    const device = getDevice(Store);
    const theme = getTheme(Store);
    const sharingOptions = getSharingOptions(Store);
    const lazyLoaderHeight = lazyloadConfig.VerticalSlideshow[device].height;
    const lazyLoaderOffset = lazyloadConfig.VerticalSlideshow[device].offset;
    const filteredSlides = slides.filter(getContent);

    if (isValidArray(filteredSlides)) {
      return (
        <div className={classnames(Styles.container, 'uvs-container')}>
          <ThemeStyle parentCssElement={`.${captionWrap}`}>
            <div data-element-name={`vertical-slideshow-item-container-${depth}`} className="main">
              {filteredSlides.map((slide, index) => {
                const content = slide.content || slide.image;
                const contentWidth = getKey(content, 'renditions.original.width', content.width);
                const contentHeight = getKey(content, 'renditions.original.height', content.height);
                const isContentVertical = contentWidth <= contentHeight;
                const { renderAd, renderImage, renderVideo } = VerticalSlideshowWrapper;

                return (
                  <div
                    data-element-name="vertical-slideshow-item"
                    key={content.uid}
                    id={shortSlideContentId(content.uid || '')}
                  >
                    <LazyLoad height={lazyLoaderHeight} offset={lazyLoaderOffset} once>
                      <div className="row no-gutters">
                        <div className="col-sm-12">
                          <div className={classnames(Styles.slideContainer)}>
                            <div className={Styles.slide}>
                              <div className={classnames(Styles.content, 'row no-gutters')}>
                                <div className={classnames(Styles.contentWrap, 'col-md-10')}>
                                  <FullWidth breakpoints={['xxs']}>
                                    <VisibilitySensor
                                      partialVisibility
                                      minTopValue={300}
                                      scrollCheck
                                      intervalCheck={false}
                                      scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
                                      onChange={isVisible => handleSlideVisibilityChange(
                                        content.type,
                                        isVisible,
                                        slide,
                                        index,
                                      )}
                                    >
                                      <div className={Styles.visibilityHelper}>
                                        {content.type === 'image' && renderImage(slide, isContentVertical)}
                                        {content.type === 'video' && renderVideo(slide, primaryTag)}
                                      </div>
                                    </VisibilitySensor>
                                  </FullWidth>
                                </div>
                              </div>
                              <div className={classnames(Styles.captionWrap, 'row no-gutters')}>
                                <div className={classnames('col-md-8', !isContentVertical && Styles.wrapper)}>
                                  <div className={Styles.captionHeader}>
                                    <em className={Styles.captionCount}>
                                      {index + 1}/{filteredSlides.length}
                                    </em>
                                    <ShareBar
                                      compact
                                      theme="rounded"
                                      padLeft={false}
                                      device={device}
                                      className={Styles.sharingBar}
                                      sharingOptions={getSharingValues(sharingOptions, slide)}
                                      onClick={name => SocialTracker.track(
                                        SocialTracker.events.share, {
                                          name,
                                          ...shareData,
                                        },
                                      )}
                                    />
                                  </div>
                                  {getCaption(slide, theme, isContentVertical)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </LazyLoad>
                    {renderAd(filteredSlides, index)}
                  </div>
                );
              })}
            </div>
          </ThemeStyle>
        </div>
      );
    }

    return null;
  }
}

VerticalSlideshowWrapper.propTypes = {
  depth: PropTypes.number,
  title: PropTypes.string,
  uid: PropTypes.string,
  primaryTag: PropTypes.object.isRequired,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.oneOfType([
        PropTypes.shape({
          image: PropTypes.shape({
            original: PropTypes.shape({
              href: PropTypes.string.isRequired,
            }).isRequired,
          }),
        }).isRequired,
        PropTypes.shape({
          renditions: PropTypes.shape({
            original: PropTypes.shape({
              href: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      ]),
      hideCaption: PropTypes.bool,
      caption: PropTypes.string,
      credit: PropTypes.string,
    })
  ),
};

VerticalSlideshowWrapper.defaultProps = {
  depth: 1,
};

export default VerticalSlideshowWrapper;
