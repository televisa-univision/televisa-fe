import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import * as widgetTypes from '../../constants/widgetTypes';

import {
  cleanUrl,
} from '../helpers';
import DFPAd from '../../components/ads/dfp/DFPAd';
import FWAd from '../../components/ads/fw/Companion/FWAd';
import FWAdStandAlone from '../../components/ads/fw/StandAlone/FWAdStandAlone';
import AdSettings from './adSettings.json';
import { largeWidgets, smallWidgets } from './externalWidgetsBySize';
import * as AdTypes from './ad-types';
import configUrls from './data/configUrls.json';
import Store from '../../store/store';
import { getDevice } from '../../store/storeHelpers';
import { DisplayRules } from './ad-rules';

/**
 * Ads utility
 */
const helper = {
  /**
   * Helper method to prepare ad props
   * @param {Object} settings from api
   * @returns {Object} ad settins
   */
  getSettings(settings) {
    /**
     * adSettings
     "sizes": [
     {
       "width": 300,
       "height": 250
     },
     {
       "width": 300,
       "height": 600
     },
     {
       "width": 160,
       "height": 600
     }
     ],
     "disableRefresh": true,
     "position": "MID",
     "lazyLoadSlotDisable": false
     */
    const devices = ['mobile', 'tablet', 'desktop'];
    const adSetting = {};
    const sizeMapping = {};
    const offsetMapping = {};
    let deviceSetting = '';

    if (settings) {
      devices.map((device) => {
        /* Building sizeMapping from
         desktop: {
         adType: "dfp",
         disableRefresh: true,
         lazyLoadSlotDisable: false,
         position: "MID",
         sizes: [
         {
         width: 728,
         height: 90
         },
         {
         width: 970,
         height: 90
         }
         ]
         }
         */
        deviceSetting = `${device}Settings`;
        // If settings[deviceSetting] is null, exists helper method return true for the nested
        // property
        if (settings[deviceSetting] && settings[deviceSetting].sizes) {
          // Matching ads sizeMapping format
          sizeMapping[device] = settings[deviceSetting].sizes.map(obj => [obj.width, obj.height]);
          if (settings[deviceSetting].position) {
            adSetting.position = settings[deviceSetting].position;
          }
          if (settings[deviceSetting].refreshable) {
            adSetting.refreshable = settings[deviceSetting].refreshable;
          }
          if (settings[deviceSetting].offset) {
            offsetMapping[device] = settings[deviceSetting].offset;
          }
        }
        return device;
      });
      adSetting.sizeMapping = sizeMapping;
      adSetting.offsetMapping = offsetMapping;
      adSetting.isSpecialAd = settings.isSpecialAd || false;
      adSetting.isNativeAd = settings.isNativeAd || false;
      adSetting.biddable = settings.biddable || false;
      adSetting.sequenceable = false;
      if (typeof settings.sequenceable === 'undefined') {
        adSetting.sequenceable = true;
      }
    }
    return adSetting;
  },

  getVideoSettings(apiSettings) {
    if (apiSettings) {
      return apiSettings
        .map((setting) => {
          return setting;
        })
        .join('&');
    }
    return '';
  },

  /**
   * Helper to build Ad video component by ad type
   * @param {string} type of ad
   * @returns {XML}
   */
  getVideoComp(type) {
    /* eslint-disable react/no-this-in-sfc */
    const adSettings = AdSettings[type];
    const FwSettings = this.getVideoSettings(adSettings);
    return <FWAd adSetting={FwSettings} />;
  },

  /**
   * Helper to build Ad component by ad type
   * @param {string} type of ad
   * @param {Object} adOptions options to customize ad behavior
   * @param {boolean} adOptions.isLazyLoaded determines if ad should be lazy loaded
   * @param {boolean} adOptions.hasBg determines if ad should have striped background
   * @param {function} adOptions.onRegisterSlot callback function to listen slot register
   * @param {string} adOptions.trackingValue tracking value for the ad
   * @returns {Object}
   */
  getAd(type, adOptions = {}) {
    const {
      isLazyLoaded = true,
      hasBg = true,
      onRegisterSlot = null,
      onSlotRenderEnded = null,
      trackingValue = null,
    } = adOptions;
    const adSettings = AdSettings[type];
    const device = getDevice(Store);
    const settings = this.getSettings(adSettings);

    if (Object.keys(settings).length) {
      const offset = settings.offsetMapping[device] || 150;
      settings.hasBg = hasBg;
      const Ad = (
        <DFPAd
          {...settings}
          onRegisterSlot={onRegisterSlot}
          callback={onSlotRenderEnded}
          trackingValue={trackingValue}
        />
      );
      if (isLazyLoaded) {
        return (
          <LazyLoad height={100} offset={offset} once>
            {Ad}
          </LazyLoad>
        );
      }
      return Ad;
    }
    return null;
  },

  /**
   * Helper to return stand alone sled ad only on mobile
   * on server side
   * @param {Object} pageData from api and context
   * @returns {XML}
   */
  getSledAd(pageData) {
    if (pageData.device === 'mobile') {
      return <FWAdStandAlone width="1" height="3" adType={AdTypes.SLED_AD} pageData={pageData} />;
    }
    return null;
  },
  /**
   * Helper to inject ad between widgets every 4 widgets, except when it's the last widget
   * on the list.
   * @param {Object} settings for ad insertion
   * @returns {array}
   */
  injectFullWidthAds(settings) {
    const defaultOptions = {
      widgets: [], // widget list
      startFrom: 1, // position to start injecting ads
      injectEvery: 4, // ads interval
      numberOfAds: 10, // number of ads to insert
      type: AdTypes.MID_AD, // ad type
      lazyload: true, // enable / disable lazy load,
      hasBg: true, // enable / disable background,
      displayRules: null, // display rule configuration
    };
    const {
      widgets,
      startFrom,
      injectEvery,
      numberOfAds,
      type,
      lazyload,
      hasBg,
      displayRules,
    } = Object.assign(defaultOptions, settings);

    /*
    injectEvery: 2,
    startFrom: 2,
    numberOfAds: 1,
    */

    let insertedAds = 0;
    if (isValidArray(widgets)) {
      const numberOfWidgets = widgets.length;
      return widgets.map((w, i) => {
        const currentPosition = i + 1;
        let adElement = null;
        if (
          insertedAds < numberOfAds
          && currentPosition > startFrom
          && !((currentPosition - (startFrom - 1)) % injectEvery)
          && currentPosition < numberOfWidgets
        ) {
          insertedAds += 1;

          const adType = this.getAdTypeByDisplayRule({ index: insertedAds, type, displayRules });
          adElement = (
            <div className="uvs-ad-full-width">
              {this.getAd(adType, { isLazyLoaded: lazyload, hasBg })}
            </div>
          );
        }

        return (
          <Fragment key={currentPosition}>
            {w}
            {adElement}
          </Fragment>
        );
      });
    }
    return widgets;
  },

  /**
   * Helper to switch the ad type on the fly. This is for custom rules, like the following:
   * 1) Desktop: 2nd ad on page should be different size than normal middle ads
   * 2) Mobile: Every (n) ad should be a different size
   * @param {Object} input --> object with input properties
   * {
   *   index, - the index of the ads being inserted into the widgets
   *   type, - the ad type
   *   displayRules - holds the custom override rules that allow switching up
   *      {
   *        type, - ad type name to replace (required)
   *        index, - targets a specified ad insertion index to replace ad type,
   *          e.g., the 2nd ad (optional)
   *        every, - rule to replace ad type name every (n) ad insertion,
   *          e.g., every 3rd ad (optional)
   *      }
   * }
   * @returns {string} the Ad Type
   */
  getAdTypeByDisplayRule({ index, type, displayRules }) {
    const ruleType = getKey(displayRules, 'type', type);
    const ruleEvery = getKey(displayRules, 'every', 0);
    const ruleHasAdsCount = getKey(displayRules, 'hasAdsCount', 0);
    const ruleIndex = getKey(displayRules, 'index', '');
    // This display rule says the ad type changes every (n) ad displayed
    // Takes into account ads that have already been injected, like Top Ad: ruleHasAdsCount
    // index + 1 - we don't want zero based index for ad number, e.g. every 3rd ad
    const isAlternatingAdEvery = (index + 1 + ruleHasAdsCount) % ruleEvery === 0;
    // This display rule says the ad type changes at a specific ad placement
    // on the page, based on ad insertion index
    const isAdAtIndex = index === ruleIndex;

    // If either rule is hit, then change the ad type to the one specified
    return isAlternatingAdEvery || isAdAtIndex ? ruleType : type;
  },

  /**
   * Variable that holds the list of widgets that should skip the top ad.
   */
  skipTopAdWidgetList: [],

  /**
   * Setter method for the current list of widgets that should skip the top ad.
   * It always needs to be an array or else will set it as an empty array.
   * @param {array} skipList list of widgets that should skip the top ad.
   */
  setSkipTopAdWidgetList(skipList = []) {
    if (Array.isArray(skipList)) {
      this.skipTopAdWidgetList = skipList;
    } else {
      this.skipTopAdWidgetList = [];
    }
  },

  /**
   * Getter method for the current list of widgets that should skip the top ad.
   * @returns {array} the current list of widgets that should skip the top ad.
   */
  getSkipTopAdWidgetList() {
    return this.skipTopAdWidgetList;
  },

  /**
   * Checks if the widget can have an ad below if the conditions below are met.
   * Used to get the index of the first widget that should have an inserted ad below it.
   * @param {Object} widget current widget
   * @returns {bool} true if widget is not part of the exclusion list
   *                 and the flag nextAd is different from false
   */
  isWidgetWithoutTopAd(widget) {
    const type = getKey(widget, 'type', '');
    const nextAdWidget = getKey(widget, 'settings.nextAd', '');
    const skipList = this.getSkipTopAdWidgetList();

    return !skipList.includes(type) && nextAdWidget !== 'false';
  },

  /**
   * Get the best possible position to insert the first ad on a list of widgets.
   * @param {Array} widgets list of widgets
   * @param {Array} skipList list of widgets to skip
   * @returns {int} the position for the first ad to be inserted. Defaults to 1.
   */
  getFirstSectionAdPosition(widgets = [], skipList = []) {
    this.setSkipTopAdWidgetList(skipList);
    const position = isValidArray(widgets)
      ? widgets.findIndex(this.isWidgetWithoutTopAd, this) + 1
      : 1;

    return position;
  },

  /**
   * Returns an ad injector configuration depending on which type the first
   * two widgets provided are.
   * @param {Array} widgets list of widgets provided
   * @param {Array} widgetTypesWithTopAd list of widgets that have a TOP widget implemented
   * @param {string} type - ad type, default is 'MID_AD'
   * @returns {Object} returns whether it should be a TOP or MID ad if any of the two
   * first widgets contains a TOP ad with the list provided.
   */
  getFirstAdConfiguration(widgets, widgetTypesWithTopAd = [], type = AdTypes.MID_AD) {
    let conf = {
      type: AdTypes.TOP_AD,
      lazyload: false,
      widgetIndex: 0,
    };
    // We only require the first two widgets, it will find the first possible match.
    const widgetList = isValidArray(widgets) ? widgets.slice(0, 2) : [];
    this.setWidgetTypesWithTopAd(widgetTypesWithTopAd);
    const widgetIndex = widgetList.findIndex(this.isWidgetTypeWithTopAd, this);
    if (widgetIndex > -1) {
      conf = {
        type,
        lazyload: true,
        widgetIndex,
      };
    }

    return conf;
  },

  /**
   * Variable that holds the widget types with a TOP ad.
   */
  widgetTypesWithTopAd: [],

  /**
   * Setter method for the list of widget types that have a TOP ad
   * @param {Array} types list of widget types that have a TOP ad
   */
  setWidgetTypesWithTopAd(types) {
    if (Array.isArray(types)) {
      this.widgetTypesWithTopAd = types;
    } else {
      this.widgetTypesWithTopAd = [];
    }
  },

  /**
   * Gets the widget types with top ad
   * @returns {Array}
   */
  getWidgetTypesWithTopAd() {
    return this.widgetTypesWithTopAd;
  },

  /**
   * Determines if the widget provided contains a TOP ad
   * @param {Object} widget widget provided
   * @returns {bool} if the widget provided is included in the list of widgets that include a
   * top widget
   */
  isWidgetTypeWithTopAd(widget) {
    const widgetTypeList = this.getWidgetTypesWithTopAd();
    return hasKey(widget, 'type') && widgetTypeList.includes(widget.type);
  },

  /**
   * Retrieves the interval between widgets from the url configuration file.
   * @param {url} url path to look in the configuration.
   * @returns {int} interval depending in the url supplied.
   */
  getAdIntervalFromUrl(url) {
    const defaultInterval = getKey(configUrls, 'default.interval', 3);
    const keyData = this.getKeyDataUrl(url);
    return getKey(keyData, 'interval', defaultInterval);
  },

  /**
   * Method to determine whether to inject or not ads between widgets or simply use the old logic
   *
   * @param {Object} data that contains information pertaining the widgets provided,
   * requires an array with widget data, widget types that should render an ad when
   *  positioned first, section url that will try to find it's corresponding interval configuration.
   * intervalOverride is optional in case we want to ignore the url configuration.
   * @returns {Array} widgets list with ads injected or not, ready to be parsed by a helper method.
   */
  getWidgetDataWithAds(data) {
    /**
     * - widgets: list of widgets.
     * - typesWithTopAd: widget types that should render an ad when positioned first.
     * - skipList: types to skip to insert the first ad.
     * - url: section url that we want to render these widgets in,
     * sometimes it will have its own interval configuration or flag to enable/disable
     * the new ad injection logic
     * - intervalOverride: in case we want to ignore the url configuration or no url is available,
     * this parameter is used as the interval between widgets to inject ads for the new logic.
     * - device: pass in the device
     */
    const defaultOptions = {
      widgets: [],
      typesWithTopAd: [],
      skipList: [],
      url: '',
      intervalOverride: null,
      topAdInserted: false,
      device: '',
    };
    const {
      widgets,
      skipList,
      url,
      intervalOverride,
      topAdInserted,
      typesWithTopAd,
      device,
    } = Object.assign(defaultOptions, data);

    // If there is no widgets provided, there's no point to keep going, return an empty array
    if (!isValidArray(widgets)) {
      return [];
    }

    // Placeholder array, will bring ads injected in it later.
    let widgetsWithAds = [];
    // Gets the interval either from the override or tries to look up from an url config
    // If the url is empty, then it will read from the default key.
    const adInterval = intervalOverride || this.getAdIntervalFromUrl(url);

    // Filter out all empty widgets.
    const widgetsWithContent = widgets.filter(w => this.widgetHasContent(w));

    // If the filtered list above has no widgets,
    // just return the data as is, no point on keep going.
    if (!isValidArray(widgetsWithContent)) {
      return widgets;
    }

    // Get the first effective position to insert an ad
    let firstPosition = 1;

    // If a top ad has been injected already, start after the first interval
    if (topAdInserted) {
      firstPosition = adInterval;
    }

    // If we still remain at 1, start reading the skip list then
    if (firstPosition === 1) {
      firstPosition = this.getFirstSectionAdPosition(widgets, skipList);
    }

    // Display rules assume top ad is loaded, but widget with top ad works differently
    // Needs to reset index when the top ad is inside a widget
    let displayRuleWidgetWithTopAdCount = 0;

    // Finds a widget with top ads within the first two positions
    if (firstPosition > 1 && !topAdInserted) {
      this.setWidgetTypesWithTopAd(typesWithTopAd);
      const topWidgets = widgetsWithContent.slice(0, 2);
      const widgetIndexWithTopAd = topWidgets.findIndex(this.isWidgetTypeWithTopAd, this);
      // If found, add an interval from the position the widget was positioned.
      if (widgetIndexWithTopAd > -1) {
        firstPosition = widgetIndexWithTopAd + adInterval;
        displayRuleWidgetWithTopAdCount = 1;
      }
    }

    /** Custom config ad display rules - alternate ad types per device, per every 'n' ad */
    let displayRules = null;

    // Every 3rd mobile ad should be a different size, so use an alternate ad type
    // commented out until it is needed again
    // if (device === 'mobile') {
    //   displayRules = DisplayRules.MobileEvery;
    // }

    // for desktop, 2nd ad should be a different size than the remaining ones (larger and flexible)
    if (device === 'desktop') {
      displayRules = DisplayRules.DesktopIndex;
      // Display rules assume top ad is loaded, but widget with top ad works differently
      // Top Ad insertion is outside of this logic, so the index starts at the second ad
      // Needs to subtract 1 when the top ad is inside a widget
      displayRules.index -= displayRuleWidgetWithTopAdCount;
    }

    // Inject actual ads
    widgetsWithAds = this.injectAdsToData({
      widgets,
      adInterval,
      firstPosition,
      displayRules,
    });

    return widgetsWithAds;
  },

  /**
   * Method to inject ads on an array containing widgets, will try to inject depending
   * by interval between widgets, and will try to avoid inject any after the last widget on
   * the list.
   * @param {Object} config that holds widgets, ad interval and whether should inject
   * an ad right after the first widget with content
   * @returns {Array} with widgets and ads injected, to be parsed by a helper.
   */
  injectAdsToData(config) {
    /**
     * Default options
     * - widgets: list of widgets, coming from the API
     * - adInterval: interval between widgets to insert an ad
     * - firstPosition: first position to insert an ad
     */
    const defaultOptions = {
      widgets: [],
      adInterval: 3,
      firstPosition: 1,
      displayRules: null,
    };
    const {
      widgets, adInterval, firstPosition, displayRules,
    } = Object.assign(
      defaultOptions,
      config
    );
    const data = [];
    const numberOfWidgets = widgets.length;
    // This is a section ad widget, will contain the pertaining code to the ad.
    const adWidget = {
      type: 'SectionAd',
      settings: {
        slotId: 0,
        displayRules,
      },
    };

    if (isValidArray(widgets)) {
      let slotsLeft = adInterval;
      let slotId = 0;
      widgets.forEach((w, idx) => {
        // Actual position in the loop
        const position = idx + 1;
        // Determines if the current widget has content
        const hasContent = this.widgetHasContent(w);

        // Pushes the current widget into the new array
        data.push(w);

        // Counting as a slot if there's still any slots left and has content
        if (slotsLeft > 0 && hasContent) {
          slotsLeft -= 1;
        }

        // If we haven't reached the first position to insert an ad,
        // keep reseting the slots left until we do
        if (position < firstPosition) {
          slotsLeft = adInterval;
        }

        // If this is the first slot to insert an ad, just skip the slots left.
        // Logic below will take care of everything else
        if (position === firstPosition) {
          slotsLeft = 0;
        }

        /**
         * After all is said and done, we have completed the interval between widgets with no
         * more slots left, the widget has actual content and the current position is not the last
         * widget, we get to finally inject a widget and reset the slots left counter.
         */
        if (slotsLeft === 0 && hasContent && position < numberOfWidgets) {
          // Assigning a slot index to the ad unit
          const ad = Object.assign({}, adWidget, { settings: { slotId, displayRules } });
          slotId += 1;
          data.push(ad);
          slotsLeft = adInterval;
        }
      });
    }

    return data;
  },

  /**
   * Widgets with cms content
   * @param {Object} widget to check
   * @returns {boolean}
   */
  widgetsWithCmsContent(widget) {
    const settings = widget?.settings;
    return (
      isValidArray(widget?.contents)
      // just in case widget is lazyloaded and
      // contents are not available
      || settings?.lazyLoaded
      || false
    );
  },

  /**
   * Helper to get widgets that qualifies for TOP ad insertion below them
   * @param {Object} widget to check
   * @returns {bool}
   */
  widgetsWithTopAds(widget) {
    const type = widget?.type;
    if (smallWidgets.includes(type)) {
      return false;
    }
    if (largeWidgets.includes(type)) {
      return true;
    }
    return this.widgetsWithCmsContent(widget);
  },

  /**
   * Determines if a widget depending on type has content
   * also keep in consideration external widgets that may or not
   * qualify for ad insertion at the top
   * It's initial concern was to have logic to ignore
   * widgets without cms content
   * @param {Object} widget to check
   * @returns {bool}
   */
  widgetHasContent(widget) {
    const settings = widget?.settings;
    const type = widget?.type;
    // keeping under consideration some external widgets
    if ([...largeWidgets, ...smallWidgets].includes(type)) {
      return true;
    }
    // Ignoring external embeds without valid url
    if (widgetTypes.ALL_EXTERNAL_EMBED === type) {
      return getKey(settings, 'url', '') !== '';
    }
    return this.widgetsWithCmsContent(widget);
  },

  /**
   * Determines if the current section or url should be using the new ad injection rules.
   * @param {string} url of the current page
   * @returns {boolean}
   */
  shouldInjectWidgets(url) {
    return getKey(this.getKeyDataUrl(url), 'injectWidgets', false);
  },

  /**
   * Gets the ad configuration from the url requested
   * @param {string} url requested
   * @returns {Object} the configuration related to the url requested.
   */
  getKeyDataUrl(url) {
    if (url) {
      // Last command strips slashes from the beginning and trailing ones
      let keyUrl = cleanUrl(url).replace(/^\/|\/$/g, '');
      const pathFragments = keyUrl.split('/');
      if (pathFragments.length > 2) {
        keyUrl = pathFragments.slice(0, 2).join('/');
      }
      // If empty, probably is the portal url
      if (keyUrl === '' || keyUrl === '/') {
        keyUrl = 'portal';
      }
      return configUrls[keyUrl] || configUrls[`${pathFragments[0]}/*`];
    }

    return getKey(configUrls, 'default', {});
  },

  /**
   * Creates an ad definition
   * @param {string} type of ad to be included
   * @param {string} position number of the ad
   * @param {boolean} lazyload loan only on viewport
   * @returns {Object} type of widget required
   */
  getAdDefinition(type, position, lazyload = true) {
    return {
      type: widgetTypes.ADVERTISEMENT,
      settings: {
        type,
        isLazyLoaded: lazyload,
        hasBg: true,
        trackingValue: `${position}`,
      },
    };
  },
};

export default helper;
