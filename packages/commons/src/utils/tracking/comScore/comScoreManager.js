/* eslint-disable max-len */
import {
  MULHER_SITE, DELICIOSO_SITE, ZAPPEANDO_SITE, TASAUDAVEL_SITE, LAS_ESTRELLAS_SITE, DISTRITOCOMEDIA_SITE,
} from '../../../constants/sites';
import { exists, isInArray } from '../../helpers';
import config from '../../../config';
import loadComScore from './comScoreLoader';

/**
 * Com Score configuration for Univision
 * @returns {{c1: string, c2: string}}
 */
export const comScoreConfig = () => {
  // We're accessing the page data because we cannot use redux hooks outside of functional components
  /* eslint no-underscore-dangle: 0 */
  const site = global?.window?.__NEXT_DATA__?.props?.pageProps?.initialState?.page?.site;
  const clientID = [DELICIOSO_SITE, MULHER_SITE, TASAUDAVEL_SITE, ZAPPEANDO_SITE, LAS_ESTRELLAS_SITE, DISTRITOCOMEDIA_SITE].includes(site) ? '37010446' : '14222911';
  return {
    c1: '2',
    c2: clientID,
  };
};

/**
 * Content types that have special Com Score tracking
 * @type {[*]}
 */
const nonStandardComScoreTracking = [];

/**
 * Utility to handle Com Score interactions.
 * @type {{}}
 */
const comScoreManager = {
  /**
   * Loads the Com Score SDK, delegates to comScoreLoader.
   * @param {string} contentType Type of the current content
   */
  load(contentType) {
    if (this.isLoaded()) {
      this.beacon();
    } else {
      loadComScore(comScoreConfig, this.isStandardTracking(contentType));
    }
  },

  /**
   * Facade function to the Com Score SDK function. This function is intended for
   * non-standard ComScore tracking only. Before calling this function, please make sure
   * that the content-type is included in {@link nonStandardComScoreTracking}
   */
  beacon() {
    // We're accessing the page data because we cannot use redux hooks outside of functional components
    const domain = global?.window?.__NEXT_DATA__?.props?.pageProps?.initialState?.page?.domain || '';
    const site = global?.window?.__NEXT_DATA__?.props?.pageProps?.initialState?.page?.site;
    if (this.isLoaded()) {
      window.COMSCORE.beacon(comScoreConfig());
      const urlSuffix = (site === LAS_ESTRELLAS_SITE || site === DISTRITOCOMEDIA_SITE) ? 'comscore' : 'comscore-pageview';
      fetch(`${domain}${config.routes.proxy.cached}/${urlSuffix}`);
    }
  },

  /**
   * Checks if the Com Score SDK has been loaded.
   * @returns {boolean} true if window.COMSCORE is defined.
   */
  isLoaded() {
    return exists(window.COMSCORE);
  },

  isStandardTracking(contentType) {
    return !isInArray(contentType, nonStandardComScoreTracking);
  },
};

export default comScoreManager;
