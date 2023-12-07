import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import classnames from 'classnames';

import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import slideshowAds from '@univision/fe-commons/dist/utils/ads/Slideshow/slideshowAds';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import features from '@univision/fe-commons/dist/config/features';

import Caption from '@univision/fe-components-base/dist/components/Caption';
import Truncate from '@univision/fe-components-base/dist/components/Truncate';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import ThemeStyle from '@univision/fe-commons/dist/utils/themes/ThemeStyle';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';

import getSlideShareOptions from '../../../../utils/content/getSlideShareOptions';
import lazyloadConfig from '../../../../utils/factories/widgetsFactory/lazyloadConfig.json';
import Slide from '../Slide';
import Styles, { captionWrap } from './VerticalSlideshowWrapper.scss';

/**
 * Get shortened slide content id
 * @param {string} slideContentId the id to shorten
 * @returns {string}
 */
const shortSlideContentId = slideContentId => slideContentId
  .substring(slideContentId.lastIndexOf('-') + 1, slideContentId.length);

/**
 * Get Caption of a slide
 * @param {Object} slide Object
 * @param {Object} options to be used for the caption
 * @param {Object} options.theme for the current page
 * @param {boolean} options.isVertical true or false
 * @param {string} options.device current device
 * @returns {JSX}
 */
const getCaption = (slide, { theme, isVertical, device }) => {
  if (slide.hideCaption) return null;

  const content = slide.content || slide.image;
  const caption = slide.caption || content?.caption || content?.description || content?.title;
  const credit = content?.credit || slide.credit;
  const creditSpan = credit ? `<span class="${Styles.creditCaption}">${credit}</span>` : '';

  if (!caption) return null;

  if (isVertical) {
    return (
      <Truncate
        device={device}
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

/**
 * Render Ad component
 * @param {array} filteredSlides slides
 * @param {number} index of the slide
 * @returns {JSX.Element|null}
 */
const renderAd = (filteredSlides, index) => {
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
};

/**
 * Vertical slideshow component
 * @param {number} depth index of article loaded
 * @param {Array} slides to be shown in the slideshow
 * @param {string} uid content uid
 * @param {string} title for the content
 * @param {Object} primaryTag Slideshow primary tag
 * @param {Object} theme options
 * @param {string} device users device type
 * @param {Object} sharingOptions Object containing the data to use for sharing,
 * @returns {JSX}
 */
const VerticalSlideshowWrapper = ({
  depth, slides, uid, title, primaryTag, theme, device, sharingOptions,
}) => {
  if (!isValidArray(slides)) return null;

  const shareData = {
    title,
    uid,
    primaryTag,
    vertical: true,
    type: 'slideshow',
  };

  const lazyLoaderHeight = lazyloadConfig.VerticalSlideshow[device].height;
  const lazyLoaderOffset = lazyloadConfig.VerticalSlideshow[device].offset;
  const filteredSlides = slides.filter(getContent);
  const slidesLength = filteredSlides.length;
  const isTelevisaSite = features.televisa.isTelevisaSite();

  return (
    <div className={classnames(Styles.container, 'uvs-container')}>
      <ThemeStyle parentCssElement={`.${captionWrap}`}>
        <div data-element-name={`vertical-slideshow-item-container-${depth}`} className="main">
          {filteredSlides.map((slide, idx) => {
            const content = slide.content || slide.image;
            const contentWidth = getKey(content, 'renditions.original.width', content.width);
            const contentHeight = getKey(content, 'renditions.original.height', content.height);
            const isContentVertical = contentWidth <= contentHeight;
            const renditions = content.renditions || getKey(content, 'image.renditions');

            return (
              <div
                data-element-name="vertical-slideshow-item"
                key={getKey(renditions, 'original.href')}
                id={shortSlideContentId(content.uid || '')}
              >
                <div className="row no-gutters">
                  <div className="col-sm-12">
                    <div className={classnames(Styles.slideContainer)}>
                      <div className={Styles.slide}>
                        <LazyLoad height={lazyLoaderHeight} offset={lazyLoaderOffset} once>
                          <Slide
                            depth={depth}
                            index={idx}
                            primaryTag={primaryTag}
                            slide={slide}
                            slidesLength={slidesLength}
                            title={title}
                            uid={uid}
                          />
                        </LazyLoad>
                        <div className={classnames(Styles.captionWrap, 'row no-gutters')}>
                          <div className={'col-md-8'}>
                            <div className={Styles.captionHeader}>
                              <em className={Styles.captionCount}>
                                {idx + 1}/{filteredSlides.length}
                              </em>
                              <ShareBar
                                compact
                                theme="rounded"
                                padLeft={false}
                                device={device}
                                className={isTelevisaSite
                                  ? Styles.sharingBarTelevisa : Styles.sharingBar}
                                sharingOptions={getSlideShareOptions(sharingOptions, slide)}
                                onClick={name => SocialTracker.track(
                                  SocialTracker.events.share, {
                                  name,
                                  ...shareData,
                                },
                                )}
                              />
                            </div>
                            {getCaption(slide, { theme, isVertical: isContentVertical, device })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {renderAd(filteredSlides, idx)}
              </div>
            );
          })}
        </div>
      </ThemeStyle>
    </div>
  );
};

VerticalSlideshowWrapper.propTypes = {
  depth: PropTypes.number,
  device: PropTypes.string,
  theme: PropTypes.object,
  title: PropTypes.string,
  uid: PropTypes.string,
  primaryTag: PropTypes.object.isRequired,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.oneOfType([
        PropTypes.shape({
          image: PropTypes.shape({
            renditions: PropTypes.shape({
              original: PropTypes.shape({
                href: PropTypes.string.isRequired,
              }).isRequired,
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
    }),
  ),
  sharingOptions: PropTypes.object.isRequired,
};

VerticalSlideshowWrapper.defaultProps = {
  depth: 1,
  device: 'desktop',
};

export default VerticalSlideshowWrapper;
