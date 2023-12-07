import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { UNIVISION_SITE } from '../../../constants/sites';
import { CBP_ADS, PHASED_RELEASE_BASELINE } from '../../../constants/tracking';
import features from '../../../config/features';

/**
 * Helper to collect ad group
 * @param {Object} pageData - Page data
 * @returns {string}
 */
export default function getTestGroup(pageData) {
  let testGroup = null;
  if (getKey(pageData, 'site') === UNIVISION_SITE) {
    testGroup = PHASED_RELEASE_BASELINE;
  }

  // CBP Ads AB test
  if (features.video.enableCbpAds()) {
    testGroup = CBP_ADS;
  }

  return testGroup;
}
