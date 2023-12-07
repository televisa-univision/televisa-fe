import React from 'react';

import adHelper from '../adHelper';
import FWAd from '../../../components/ads/fw/Companion/FWAd';
import { exists } from '../../helpers';
import ArticleAdSettings from '../adSettings.json';
import * as AdTypes from '../ad-types';

/**
 * Dfp Ads utility to handle article ads
 * Dependencies:
 * Any ad implementation requires:
 *  BreakPointIndicator (on top of the page) to detect device
 *  Ad interval settings
 *  Redux as single source of truth
 */
const articleAds = {
  /**
   * Helper to build Ad component
   * @param {Object} leadType content type
   * @param {string} device of the user
   * @returns {Object}
   */
  getRightRailTopAd(leadType, device) {
    let adSettings;
    if (leadType === 'video' && exists(device) && device === 'desktop') {
      adSettings = ArticleAdSettings[AdTypes.RIGHT_RAIL_FW_TOP_AD_VIDEO];
      const settings = adHelper.getVideoSettings(adSettings);
      return <FWAd adSetting={settings} />;
    }
    return adHelper.getAd(AdTypes.RIGHT_RAIL_TOP_AD);
  },
};

export default articleAds;
