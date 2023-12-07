/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Store from '@univision/fe-commons/dist/store/store';
import { getAdSettings } from '@univision/fe-commons/dist/store/storeHelpers';
import slideshowAds from '@univision/fe-commons/dist/utils/ads/Slideshow/slideshowAds';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import AdSlide from 'components/pages/HorizontalSlideshow/Slide/AdSlide';

import AmpSlideImage from '../../../../images/AmpSlideImage';
import {
  Caption, CaptionContainer, Counter, Credit, ImageContainer, Slide, SlideBackground, Slideshow,
} from './AmpInlineSlideshow.styles';
import adHelper from '../../../../../utils/ads/ampAdHelper';

/**
 * InlineSlideshow component
 */
class InlineSlideshow extends Component {
  /**
   * Component constructor
   */
  constructor() {
    super();
    this.advertisement = (
      <AdSlide
        inline
        advertisement={adHelper.getAd(AdTypes.IN_SLIDE_AD, getAdSettings(Store))}
        active
      />
    );
  }

  /**
   * Get the slides with ads
   * @returns {Object}
   */
  getSlides = () => {
    const { slides } = this.props;
    return slideshowAds.injectAds(slides);
  };

  /**
   * Render a slide by type
   * @param {Object} slideProps - the props for the slide
   * @returns {JSX}
   */
  renderSlide = (slideProps) => {
    const { image } = slideProps;
    const { slides } = this.props;
    let slideImage;
    switch (slideProps.type) {
      case 'ad':
        return this.advertisement;
      default:
        if (!hasKey(image, 'renditions.original.href')) {
          return null;
        }
        slideImage = <AmpSlideImage image={image} type="horizontal" />;

        return (
          <div>
            <Slide>
              <SlideBackground />
              <ImageContainer>
                { slideImage }
                {image.credit && <Credit>{image.credit}</Credit>}
              </ImageContainer>
            </Slide>
            <CaptionContainer>
              <Counter className="uvs-font-a-bold">{ slideProps.id + 1 }/{ slides.length }</Counter>
              { slideProps.caption && (
                <Caption>
                  <span>
                    {sanitizeHtml(slideProps.caption, { allowedTags: [], allowedAttributes: {} })}
                  </span>
                  {slideProps.credit && <div>{localization.get('credit')}: {slideProps.credit}</div>}
                </Caption>
              )}
            </CaptionContainer>
          </div>
        );
    }
  };

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const slides = this.getSlides();
    const { uid } = this.props;
    return (
      <Slideshow>
        <amp-carousel controls="" id={`slides-${uid}`} height="495" layout="fixed-height" type="slides">
          {slides.map((slide, idx) => (<Fragment key={`slide${idx}`}>{this.renderSlide(slide)}</Fragment>))}
        </amp-carousel>
      </Slideshow>
    );
  }
}

InlineSlideshow.propTypes = {
  uid: PropTypes.string,
  slides: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.shape({
      href: PropTypes.string,
    }),
  })),
};

InlineSlideshow.defaultProps = {
  slides: [],
};

export default InlineSlideshow;
