/* eslint-disable import/prefer-default-export */
import getKey from '@univision/fe-utilities/helpers/object/getKey';

/**
 * Wait for GTM dom to be ready
 * @returns {Promise}
 */
export function waitForGtmDomReady() {
  return new Promise((resolve) => {
    const intervalTime = 500;
    let checkGtmDomInterval = null;
    /**
     * Validating tag manager is ready
     * this will give us time to have sample variable value set
     * otherwise this event will no go to GA cause is expecting that var
     * to traffic sampling
     */
    const checkGtmDom = () => {
      if (getKey(window, 'google_tag_manager.dataLayer.gtmDom')) {
        clearInterval(checkGtmDomInterval);
        resolve(true);
      }
    };
    checkGtmDomInterval = setInterval(checkGtmDom, intervalTime);
  });
}
