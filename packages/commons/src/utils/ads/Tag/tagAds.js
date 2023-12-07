/* eslint-disable react/no-array-index-key */
import React from 'react';
import adHelper from '../adHelper';
import Styles from './tagAds.scss';
import * as AdTypes from '../ad-types';

/**
 * Dfp Ads utility to handle top ads
 * Dependencies:
 * Any ad implementation requires:
 *  BreakPointIndicator (on top of the page) to detect device
 *  Ad interval settings
 *  Redux as single source of truth
 */
const tagAds = {
  /**
   * Helper to inject ad between widgets every 8 widgets/promoItems
   * @param {Object} settings for ad insertion
   * @returns {array}
   */
  injectFullWidthAds(settings) {
    const defaultOptions = {
      widgets: [], // widget list
      startFrom: 5, // position to start injecting ads
      injectEvery: 8, // ads interval
      numberOfAds: 10, // number of ads to insert
      type: AdTypes.MID_AD, // ad type
      lazyload: true, // enable / disable lazy load
      hasBg: true, // enable / disable background
    };
    const {
      widgets, startFrom, injectEvery, numberOfAds, type, lazyload, hasBg,
    } = Object.assign(
      defaultOptions,
      settings
    );
    let insertedAds = 0;
    if (Array.isArray(widgets) && widgets.length) {
      const readyWidgetList = [];
      widgets.forEach((w, i) => {
        if (
          insertedAds < numberOfAds
          && (i === startFrom || ((i - startFrom) % injectEvery === 0 && i > startFrom))
        ) {
          insertedAds += 1;
          readyWidgetList.push(
            <div key={`tagAd${i}`} className={`col-md-12 ${Styles.container}`}>
              <div className={Styles.adTag}>
                {adHelper.getAd(type, { isLazyLoaded: lazyload, hasBg })}
              </div>
            </div>
          );
          readyWidgetList.push(w);
        } else {
          readyWidgetList.push(w);
        }
      });
      return readyWidgetList;
    }
    return widgets;
  },
};

export default tagAds;
