import { hasKey } from '../../helpers';
import deviceUtils from '../../tracking/device';
import Store from '../../../store/store';
import { getNavigationCount, getRequestParams } from '../../../store/storeHelpers';
import getTestGroup from '../tracking/testGroups';

/**
 * FW Ads utility to handle video ads
*/
const videoAds = {

  /**
   * Generate a prefix for adSettings based on current device type
   * @returns {string} devicePrefix for ad targeting
   */
  getDevicePrefix() {
    const { userAgent } = navigator;
    const devicePrefixes = {
      mobile: 'rm.',
      default: 'rd.',
    };

    let devicePrefix = devicePrefixes.default;
    if (deviceUtils.isMobile(userAgent, 'mobile')) {
      devicePrefix = devicePrefixes.mobile;
    }

    return devicePrefix;
  },

  /**
   * Define DFP settings
   * @param {Object} pageData page api data
   * @param {boolean} disableDaiAds if we should disable ads when DAI
   * @returns {Object} DFP settings
   */
  getDFPSettings(pageData, disableDaiAds) {
    let settings = {};
    /* eslint-disable react/no-this-in-sfc */
    if (hasKey(pageData, 'data.adSettings.adTagValue')) {
      settings = {
        advalue: getRequestParams(Store)?.adTagValue || `univision_${pageData.data.adSettings.adTagValue}`,
        prefix: this.getDevicePrefix(),
      };

      if (hasKey(pageData, 'data.adSettings.targeting')) {
        settings.customParams = pageData.data.adSettings.targeting;
      }
      settings.customParams = settings.customParams || {};
      settings.customParams.spaStart = getNavigationCount(Store) === 0;
      settings.customParams.user_agent = window.navigator.userAgent;

      const testGroup = getTestGroup(pageData);
      if (testGroup) {
        settings.customParams.test_group = testGroup;
      }

      if (disableDaiAds) {
        settings.customParams.cms_disableads = true;
      }

      return settings;
    }

    return null;
  },
};

export default videoAds;
