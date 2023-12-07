import React from 'react';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import { exists, hasKey } from '../../helpers';
import adHelper from '../adHelper';
import adSettingsInline from './adSettingsInline.json';
import * as AdTypes from '../ad-types';

// Top Ad Unit, used for initial ads by default
const topAdUnit = {
  type: 'ad',
  value: <div className="uvs-ad-full-width">{adHelper.getAd(AdTypes.TOP_AD)}</div>,
};

/**
 * Dfp Ads utility to handle inline ads
 * Dependencies:
 * Any ad implementation requires:
 *  BreakPointIndicator (on top of the page) to detect device
 *  Ad interval settings
 *  Redux as single source of truth
 */
const inlineAds = {
  /**
   * Function to inject ads between article paragraphs
   * @param {Object} advertisement to inject. Fallback to this.getAd()
   * @param {array} bodyArray to be enriched with ads
   * @param {string} device Device used to access the site
   * @param {Object} initialAdOverride override for the initial ad unit
   * @param {Object} lead the lead object of the article
   * @returns {array} of content and ads
   */
  injectAds({
    advertisement,
    bodyArray,
    device,
    initialAdOverride,
    lead,
  }) {
    if (
      !isValidArray(bodyArray)
      || !device
      || !this.getIntervalSetting(adSettingsInline, device)
    ) {
      return bodyArray;
    }

    // Hook to inject different type of ad
    const adToInsert = advertisement || this.getAd();

    // Inserting initial ad
    const splitArray = this.addInitialAd({
      bodyArray,
      lead,
      initialAdOverride,
    });

    // Adding the rest of ads using crazy rules
    return splitArray.withAdArray.concat(
      this.combineAds(
        splitArray.remainArray,
        this.getIntervalSetting(adSettingsInline, device),
        adToInsert
      )
    );
  },

  /**
   * Helper to inject initial ad after first paragraph with no following enhancement
   * @param {array} bodyArray to be enriched with ads
   * @param {Object} initialAdOverride - ad override for the default unit
   * @param {Object} lead the lead object of the article
   * @returns {Object}
   */
  addInitialAd({
    bodyArray,
    initialAdOverride,
    lead,
  }) {
    const isVideoLead = lead?.type === 'video';
    const advertisement = initialAdOverride || topAdUnit;
    let i = 0;
    let added = false;
    let withAdArray = [];
    let remainArray = [];

    if (isValidArray(bodyArray)) {
      while (!added && i < bodyArray.length) {
        // pushing initial ad down if there is a video lead
        // regardless if enhancement or text
        if (isVideoLead && i === 0) {
          withAdArray.push(bodyArray[i]);
        } else if (
          this.isText(bodyArray[i])
          && exists(bodyArray[i + 1])
          && this.isText(bodyArray[i + 1])
        ) {
          withAdArray = withAdArray.concat([bodyArray[i], advertisement]);
          added = true;
        } else {
          withAdArray.push(bodyArray[i]);
        }
        i += 1;
      }
    }

    remainArray = isValidArray(bodyArray) ? bodyArray.slice(i) : [];

    return {
      withAdArray,
      remainArray,
    };
  },

  /**
   * Engine to include ads into array
   * @param {array} bodyArray to be enriched with ads
   * @param {Object} intervalSettings form API
   * @param {Object} advertisement to inject
   * @returns {array} new combined array
   */
  combineAds(bodyArray, intervalSettings, advertisement) {
    let newBodyArray = [];
    let stringPile = '';
    let paragraphCount = 0;
    let nextBlock;
    let isBlockElegeble;
    if (
      isValidArray(bodyArray)
      && hasKey(intervalSettings, 'articleAdInterval')
      && intervalSettings.articleAdInterval > 0
    ) {
      bodyArray.forEach((item, index) => {
        // Check articleAdInterval
        if (this.isText(item) && exists(item.value)) {
          // Removing paragraph tags and links to count actual characters
          stringPile += item.value
            .replace(/<p[^>]*>/g, '')
            .replace(/<\/p>/g, '')
            .replace(/<a\b[^>]*>(.*?)<\/a>/i, '');
          paragraphCount += 1;
          nextBlock = bodyArray[index + 1];
          isBlockElegeble = this.isBlockElegable(
            paragraphCount,
            nextBlock,
            stringPile,
            intervalSettings
          );
          // checking if next block is the last
          if (index < bodyArray.length - 2) {
            // it's not the last so check if eligible for ad
            if (isBlockElegeble) {
              // restart paragraph count
              paragraphCount = 0;
              // push item to new body array
              newBodyArray.push(item);
              // push ad to new body array
              newBodyArray.push(advertisement);
              // clear string pile
              stringPile = '';
            } else {
              // its was not eligible so just push the item
              newBodyArray.push(item);
            }
            // next block is the last so first check if eligible then check char count
          } else if (isBlockElegeble
            && this.isMoreThan(nextBlock.value, intervalSettings.articleAdLastMinCharacterCount)) {
            // restart paragraph count
            paragraphCount = 0;
            // push item to new body array
            newBodyArray.push(item);
            // push ad to new body array
            newBodyArray.push(advertisement);
            // clear string pile
            stringPile = '';
          } else {
            newBodyArray.push(item);
          }
        } else {
          newBodyArray.push(item);
        }
      });
    } else {
      newBodyArray = bodyArray;
    }
    return newBodyArray;
  },

  /**
   * determines if text block is elegable for ad insertion
   * @param {number} paragraphCount - current para count
   * @param {Object} nextBlock - next block or article body
   * @param {string} stringPile - collected test from prior blocks
   * @param {Object} intervalSettings - object with settings
   * @returns {boolean|*}
   */
  isBlockElegable(paragraphCount, nextBlock, stringPile, intervalSettings) {
    // is multiple of interval or test is already bigger that max
    return (
      (paragraphCount === intervalSettings.articleAdInterval + 1
        // MaxCharacterCount exist and string amount is higher that it
        || (hasKey(intervalSettings, 'articleAdMaxCharacterCount')
          && this.isMoreThan(stringPile, intervalSettings.articleAdMaxCharacterCount)))
      // Less than limit of characters
      && hasKey(intervalSettings, 'articleAdMinCharacterCount')
      && !this.isLessThan(stringPile, intervalSettings.articleAdMinCharacterCount)
      // this is not the last item and
      && typeof nextBlock !== 'undefined'
      // the next block is text
      && this.isText(nextBlock)
    );
  },

  isText(item) {
    return hasKey(item, 'type') && item.type === 'text';
  },

  isEnhancements(item) {
    return hasKey(item, 'type') && item.type === 'enhancement';
  },

  isListItem(item) {
    return item?.objectData?.type === 'listitem';
  },

  getIntervalSetting(intervalSettings, device) {
    /**
     * intervalSettings
     articleAdInterval: 15,
     articleAdMinCharacterCount: 700,
     articleAdMaxCharacterCount: 1500,
     */
    if (exists(intervalSettings[`${device}ArticleBodySettings`])) {
      return intervalSettings[`${device}ArticleBodySettings`];
    }
    return null;
  },

  /**
   * Helper to detect less than certain amount of characters
   * @param {string} str to be checked
   * @param {number} min number to compare
   * @returns {boolean}
   */
  isLessThan(str, min) {
    return exists(str) && exists(str.length) && str.length < min;
  },

  /**
   * Helper to detect more than certain amount of characters
   * @param {string} str to be checked
   * @param {number} max number to compare
   * @returns {boolean}
   */
  isMoreThan(str, max) {
    return exists(str) && exists(str.length) && str.length > max;
  },

  /**
   * Helper to build Ad component
   * @param {Object} adSettings configuration
   * @param {string} device of the user
   * @returns {Object}
   */
  getAd() {
    return {
      type: 'ad',
      value: <div className="uvs-ad-full-width">{adHelper.getAd(AdTypes.IN_BODY_AD)}</div>,
    };
  },

  /**
   * Function to inject ads between article paragraphs
   * @param {Object} advertisement to inject. Fallback to this.getAd()
   * @param {array} bodyArray to be enriched with ads
   * @param {string} device Device used to access the site
   * @param {Object} initialAdOverride override for the initial ad unit
   * @param {Object} lead the lead object of the article
   * @returns {array} of content and ads
   */
  injectListAds({
    advertisement,
    bodyArray,
    device,
    initialAdOverride,
    lead,
  }) {
    if (
      !isValidArray(bodyArray)
      || !device
      || !this.getIntervalSetting(adSettingsInline, device)
    ) {
      return bodyArray;
    }

    // Hook to inject different type of ad
    const adToInsert = advertisement || this.getAd();
    // Inserting initial ad
    const splitArray = this.addInitialAdList({
      bodyArray,
      lead,
      initialAdOverride,
    });
    // Adding the rest of ads using crazy rules
    return splitArray.withAdArray.concat(
      this.combineAdsList(
        splitArray.remainArray,
        this.getIntervalSetting(adSettingsInline, device),
        adToInsert
      )
    );
  },

  /**
   * Helper to inject initial ad after first paragraph with no following enhancement
   * @param {array} bodyArray to be enriched with ads
   * @param {Object} initialAdOverride - ad override for the default unit
   * @param {Object} lead the lead object of the article
   * @returns {Object}
   */
  addInitialAdList({
    bodyArray,
    initialAdOverride,
  }) {
    const advertisement = initialAdOverride || topAdUnit;
    let i = 0;
    let firstListItem = -1;
    let added = false;
    let withAdArray = [];
    let remainArray = [];

    if (isValidArray(bodyArray)) {
      while (!added && i < bodyArray.length) {
        if (
          this.isListItem(bodyArray[i])
          && exists(bodyArray[i + 1])
          && this.isListItem(bodyArray[i + 1])
          && firstListItem === -1
        ) {
          firstListItem = i;
        } if (
          this.isListItem(bodyArray[i])
          && exists(bodyArray[i + 1])
          && this.isListItem(bodyArray[i + 1])
          && firstListItem >= 0
          && i === firstListItem + 2
        ) {
          withAdArray = withAdArray.concat([bodyArray[i], advertisement]);
          added = true;
        } else {
          withAdArray.push(bodyArray[i]);
        }
        i += 1;
      }
    }

    remainArray = isValidArray(bodyArray) ? bodyArray.slice(i) : [];

    return {
      withAdArray,
      remainArray,
    };
  },

  /**
   * Engine to include ads into array
   * @param {array} bodyArray to be enriched with ads
   * @param {Object} intervalSettings article type
   * @param {Object} advertisement to inject
   * @returns {array} new combined array
   */
  combineAdsList(bodyArray, intervalSettings, advertisement) {
    let newBodyArray = [];
    let iterator = 0;

    if (
      isValidArray(bodyArray)
      && hasKey(intervalSettings, 'articleAdInterval')
      && intervalSettings.articleAdInterval > 0
    ) {
      bodyArray.forEach((item, index) => {
        // Check articleAdInterval
        if (
          this.isEnhancements(item)
          && exists(bodyArray[index])
          && iterator === 4
        ) {
          newBodyArray.push(advertisement);
          newBodyArray.push(bodyArray[index]);
          iterator = 0;
        } else {
          newBodyArray.push(item);
        }
        iterator += 1;
      });
    } else {
      newBodyArray = bodyArray;
    }
    return newBodyArray;
  },

  /**
   * Function to inject Taboola between article paragraphs
   * @param {array} bodyArray to be enriched with Taboola ads
   * @returns {array} of content and Taboola ads
   */
  injectTaboolaMidAd({
    bodyArray,
  }) {
    if (
      !isValidArray(bodyArray)
    ) {
      return bodyArray;
    }
    let paragraphCount = 0;
    const newBodyArray = [];

    bodyArray.forEach((chunk) => {
      if (chunk?.type === 'text') paragraphCount += 1;
      if (paragraphCount === 5 && !newBodyArray.some(innerChunk => innerChunk.type === 'taboola')) {
        newBodyArray.push({ type: 'taboola' });
      }
      newBodyArray.push(chunk);
    });

    return newBodyArray;
  },
};

export default inlineAds;
