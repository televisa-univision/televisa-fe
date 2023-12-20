/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { SCRIPT_PLAIN_TYPE } from '../../constants/oneTrust';
import {
  MULHER_SITE,
  TASAUDAVEL_SITE,
  ZAPPEANDO_SITE,
  DELICIOSO_SITE,
} from '../../constants/sites';

/**
 * OneTrust Manager
 * The script for OneTrust loads in sync with the PageHead as it is needed as
 * soon as the page loads
 */
const oneTrustManager = {
  allowOneTrust: true,
  /**
   * We allow OneTrust only in specific sections
   * @param {string} trackingData tracking data
   * @param {string} site current site
   * @returns {void}
   */
  setPageSection(trackingData, site) {
    if (!trackingData) {
      this.allowOneTrust = false;
      return;
    }
    const {
      content_vertical, section, section_level1, section_level2,
    } = trackingData;
    this.allowOneTrust = [content_vertical, section_level1, section, section_level2].includes('local')
      && ![MULHER_SITE, TASAUDAVEL_SITE, ZAPPEANDO_SITE, DELICIOSO_SITE].includes(site);
  },
  /**
   * Returns the type of script to 'text/javascript' if the category is already active
   * because some scripts don't initialize correctly
   * @param {string} categoryClass script category of its cookies
   * @returns {string}
   */
  getScriptType(categoryClass) {
    if (!this.allowOneTrust) return 'text/javascript';
    if (!categoryClass || typeof categoryClass !== 'string'
      || !(global && global.window) || !window) return SCRIPT_PLAIN_TYPE;
    const { OnetrustActiveGroups } = global.window;
    const categoryId = categoryClass.split('optanon-category-').slice(-1)[0].split('-');
    let scriptFlag = false;
    categoryId.forEach((category) => {
      const isCurrentCategoryActive = OnetrustActiveGroups
        && typeof OnetrustActiveGroups === 'string'
        && OnetrustActiveGroups.includes(category);
      if (isCurrentCategoryActive) scriptFlag = true;
    });
    return scriptFlag ? 'text/javascript' : SCRIPT_PLAIN_TYPE;
  },

  /**
 * Wait for DOM to load to check for OneTrust Active Categories
 * that are set by the initialization of OneTrust Script on the window
 * @param {Function} callback script category of its cookies
 * @returns {Promise}
 */
  waitForOneTrustGroupsActive(callback) {
    return new Promise((resolve) => {
      const intervalTime = 1000;
      let checkOneTrustDomInterval = null;
      let oneTrustTimer = null;
      /**
       * Validating One Trust Script is ready
       * this will give us time to have sample variable value set
       */
      const checkOneTrustDom = () => {
        const OnetrustActiveGroups = global?.window?.OnetrustActiveGroups;
        if (OnetrustActiveGroups && OnetrustActiveGroups !== ',,') {
          clearInterval(checkOneTrustDomInterval);
          resolve(callback());
          clearTimeout(oneTrustTimer);
        }
      };
      checkOneTrustDomInterval = setInterval(checkOneTrustDom, intervalTime);
      // Setting a time out if OneTrust isn't loading
      oneTrustTimer = setTimeout(() => {
        clearInterval(checkOneTrustDomInterval);
        resolve(callback());
        clearTimeout(oneTrustTimer);
      }, 3000);
    });
  },

  /**
   * Returns OneTrust active categories from the cookie
   * @param {string} cookie cookie value of onetrust
   * @returns {void}
   */
  getCookieActiveGroups(cookie) {
    if (!cookie || !global || !global.window) return;
    const optanonValues = cookie // in case there are no params
      .split('&') // create array of param key-value pairs
      .filter(x => !!x); // remove empty items
    const index = optanonValues.findIndex(x => x.startsWith('groups='));
    if (index >= 0) {
      const groupsValue = optanonValues[index].split('=')[1];
      const groups = groupsValue.replace(/%3A/g, '=').split(/%2C/g);
      let activeCategories = ',';
      groups.forEach((category) => {
        const activeCategory = category.split('=');
        if (activeCategory[1] === '1') {
          activeCategories += `${activeCategory[0]},`;
        }
      });
      global.window.OnetrustActiveGroups = activeCategories;
    }
  },
};

export default oneTrustManager;
