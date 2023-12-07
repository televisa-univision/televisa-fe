import React from 'react';
import LazyLoad from 'react-lazyload';

import DFPAd from '../../../components/ads/dfp/DFPAd';
import adHelper from '../adHelper';
import { hasKey } from '../../helpers';
import AdSettings from '../adSettings.json';
import * as AdTypes from '../ad-types';

/**
 * Dfp Ads utility to handle top ads
 * Dependencies:
 * Any ad implementation requires:
 *  BreakPointIndicator (on top of the page) to detect device
 *  Ad interval settings
 *  Redux as single source of truth
*/
const slideshowAds = {

  /**
   * Helper to build Ad component
   * @param {number} id of slide
   * @param {boolean} hasBg if the slide has pattern background
   * @returns {Object}
   */
  getInlineAd(id, hasBg = false) {
    const adSettings = AdSettings[AdTypes.SLIDESHOW_INLINE_AD];
    const settings = adHelper.getSettings(adSettings);
    settings.hasBg = hasBg;
    // Using 300 X 250 size on mobile every third slide
    if (hasKey(settings, 'sizeMapping.mobile') && id !== 0 && !(id % 3)) {
      settings.sizeMapping.mobile = [[300, 250]];
    }
    return (
      <LazyLoad key={`ad-${id}`} height={100} offset={400} once>
        <DFPAd {...settings} />
      </LazyLoad>
    );
  },

  /**
   * Inject every 3rd slide
   * @param {array} slides group
   * @returns {array}
   */
  injectAds(slides) {
    if (Array.isArray(slides)) {
      const newSlides = [];
      let newSlide = [];
      slides.forEach((s, i) => {
        newSlide = Object.assign(s, { id: i });
        if (i !== 0 && !(i % 3)) {
          newSlides.push({
            type: 'ad',
            index: i,
          }, newSlide);
        } else {
          newSlides.push(newSlide);
        }
      });
      return newSlides;
    }
    return slides;
  },
};

export default slideshowAds;
