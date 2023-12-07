import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import React from 'react';

import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import dfpManager from '@univision/fe-commons/dist/utils/ads/dfpManager';
import { exists, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import AdSettings from './ampAdSettings.json';
import AmpAdWrapper from './AmpAdWrapper.styles';

/**
 * Ads utility
 */
const helper = {
  /**
   * Helper method to prepare ad props
   * @param {Object} settings from api
   * @returns {Object} ad settins
   */
  getSettings(settings) {
    if (!hasKey(settings, 'mobileSettings')) {
      return null;
    }
    const device = 'mobile';
    const deviceSetting = settings.mobileSettings;
    const width = Math.max(...deviceSetting.sizes.map(size => size.width));
    const height = Math.max(...deviceSetting.sizes.map(size => size.height));
    const targeting = {
      targeting: {
        ...this.getTargeting(settings.targeting),
        amp: true,
        pos: deviceSetting.position,
        seq: dfpManager.getSequence(device, [[width, height]]),
        contenttype: hasKey(settings, 'targeting.contenttype')
          ? settings.targeting.contenttype
          : null,
        bkpt: 320,
      },
    };
    // Include type key value pair if defined
    if (hasKey(settings, 'contentSpecificSettings.type')) {
      targeting.targeting.type = settings.contentSpecificSettings.type;
    }
    return {
      width,
      height,
      type: 'doubleclick',
      json: JSON.stringify(targeting),
      'data-slot': dfpManager.getAdName(),
      'data-loading-strategy': 1,
    };
  },

  /**
   * Returns the targeting to use.
   * @param {Object} settings Ad settings from API.
   * @returns {Object}
   */
  getTargeting(settings) {
    const targeting = {};
    if (settings instanceof Object) {
      Object.keys(settings).forEach((key) => {
        if (Array.isArray(settings[key])) {
          targeting[key] = settings[key].join(',');
        } else {
          targeting[key] = settings[key];
        }
      });
    }
    return targeting;
  },

  /**
   * Helper to build Ad component by ad type
   * @param {string} type of ad
   * @param {Object} adSettings from api
   * @returns {Object}
   */
  getAd(type, adSettings = {}) {
    /* eslint-disable react/no-this-in-sfc */
    const settings = this.getSettings({ ...AdSettings[type], ...adSettings });
    if (exists(settings)) {
      // Using 300 X 250 size on mobile every third slide
      if (
        type === AdTypes.SLIDESHOW_INLINE_AD
        && adSettings.idx > 0
        && !(adSettings.idx % 3)
      ) {
        settings.width = 300;
        settings.height = 250;
      }
      return (
        <AmpAdWrapper>
          <span>{localization.get('advertisement')}</span>
          <amp-ad {...settings} />
        </AmpAdWrapper>
      );
    }
    return null;
  },
};

export default helper;
