import * as AdTypes from './ad-types';

/**
 * Custom display rules for ad insertion
 * @type {Object}
 *  {
 *    every, - targets every (n)
 *    index, - targets ad at specific index
 *  }
 */
/* eslint-disable */
export const DisplayRules = {
  MobileEvery: {
    type: AdTypes.MID_AD,
    every: 3, // every 3rd ad,
    hasAdsCount: 1
  },
  DesktopIndex: {
    type: AdTypes.MID_AD,
    index: 1, // 2nd ad
  },
};
/* eslint-enable */
