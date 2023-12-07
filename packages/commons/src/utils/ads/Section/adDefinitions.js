import * as AdTypes from '../ad-types';

/**
 * Ads definition based on device
 * to be consistent with type and position
 */
export default {
  mobile: [
    AdTypes.TOP_AD,
    AdTypes.MID_AD,
  ],
  tablet: [
    AdTypes.TOP_AD,
    AdTypes.MID_AD,
  ],
  desktop: [
    AdTypes.TOP_AD,
    AdTypes.MID_AD,
    AdTypes.MID_AD_NO_FLEX,
  ],
};
