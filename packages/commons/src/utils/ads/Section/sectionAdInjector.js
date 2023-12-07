import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import { MOBILE } from '../../../constants/devices';
import adHelper from '../adHelper';
import skipTopWidgetsList from './skipTopWidgetsList';
import adDefinitions from './adDefinitions';
import adOverrides from './adOverrides';
import { isGridWidget } from './widgetAdInjector';

/**
 * Dfp Ads utility to handle sections ads
 * Dependencies:
 * Any ad implementation requires:
 *  BreakPointIndicator (on top of the page) to detect device
 *  Ad interval settings
 *  Redux as single source of truth
 */
export default class SectionAdInjector {
  /**
   * Constructor to collect pageData
   * @param {Object} pageData - Page props
   */
  constructor(pageData) {
    const device = getKey(pageData, 'device', MOBILE);
    this.pageData = pageData;
    this.pageCategory = pageData?.pageCategory;
    this.device = device;
    this.isMobile = device === MOBILE;
    this.widgets = getKey(pageData, 'data.widgets', []);
  }

  /**
   * Helper to insetAds in section pages
   * @returns {array}
   */
  getWidgetsWithAds() {
    if (!isValidArray(this.widgets)) {
      return [];
    }

    const hasCustomRules = isValidArray(adOverrides?.[this.pageCategory]);
    // Ignore empty widgets
    const widgetsWithContent = this.widgets.filter(widget => adHelper.widgetHasContent(widget));

    if (hasCustomRules) return this.getCustomRules(widgetsWithContent);

    const {
      initialWidgetsWithAd,
      restWithoutAds,
    } = this.insertTopAd(widgetsWithContent);

    return [...initialWidgetsWithAd, ...this.insertIntervalAds(restWithoutAds)];
  }

  /**
   * Insert custom ad rules
   * @param {array} widgets to process
   * @returns {array}
   */
  getCustomRules(widgets) {
    const parsedWidgets = [...widgets];

    adOverrides[this.pageCategory].reduce((result, ad) => {
      if (!isValidObject(ad)) return result;

      const { position, type } = ad;
      const adValue = type?.[this.device];

      if (adValue && parsedWidgets.length + 1 >= position) {
        parsedWidgets.splice(position, 0, adHelper.getAdDefinition(
          adValue, '0', false
        ));
      }

      return result;
    }, parsedWidgets);

    return parsedWidgets;
  }

  /**
   * Defines logic to make sure we don't inject a top ad if there's a grid widget on top
   * @param {array} widgets current page widgets to process
   * @returns {boolean}
   */
  shouldInjectTopAd(widgets) {
    const noTopAdWidgets = widgets.filter(w => !skipTopWidgetsList[this.device].includes(w.type));
    // If first ad widget is of type grid, do not inject section top ad
    return isValidArray(noTopAdWidgets) ? !isGridWidget(noTopAdWidgets[0]) : true;
  }

  /**
   * Separating top ad insertion logic
   * find valid widget at the top to add initial ad
   * this logic intend to inject ad when the widget ad the top
   * is not adding an ad already like Grid in mobile
   * @param {array} widgets to process
   * @returns {Object}
   */
  insertTopAd(widgets) {
    let adAdded = false;
    const initialWidgetsWithAd = [];
    const restWithoutAds = [];

    /**
     * Avoid top ad if there's already a grid widget on top, from rules:
     * The first display ad on section pages depends on the widgets that are used in the layout
     * - Pages that open with a grid as the first widget; won't have section top ad
     * - Pages that open with a single item or carousel; should have a section top ad
     */
    if (this.isMobile && !this.shouldInjectTopAd(widgets)) {
      return {
        initialWidgetsWithAd,
        restWithoutAds: [...widgets],
      };
    }

    /**
     * Add widget to rest of the list if ad was inserted
     * @param {Object} w - Widget
     * @returns {boolean}
     */
    const adWasAdded = (w) => {
      if (adAdded) {
        restWithoutAds.push(w);
        return true;
      }
      return false;
    };
    /**
     * Validate if widget should be skipped
     * @param {Object} w - Widget
     * @returns {boolean}
     */
    const shouldSkip = (w) => {
      if (skipTopWidgetsList[this.device].includes(w.type)) {
        initialWidgetsWithAd.push(w);
        return true;
      }
      return false;
    };

    /**
     * Insert top ad by default
     * @param {Object} w - Widget
     * @returns {boolean}
     */
    const shouldInsertAd = (w) => {
      // just insert top ad and setup the flag
      adAdded = true;
      initialWidgetsWithAd.push(
        w,
        adHelper.getAdDefinition(
          adDefinitions[this.device][0], '0', false
        ),
      );
      return true;
    };

    // Travel validation rules
    widgets.every(w => adWasAdded(w)
      || shouldSkip(w)
      || shouldInsertAd(w));
    return {
      initialWidgetsWithAd,
      restWithoutAds,
    };
  }

  /**
   * Insert ads based on interval
   * @param {array} widgets to process
   * @returns {array}
   */
  insertIntervalAds(widgets) {
    if (!isValidArray(widgets)) return [];
    const widgetWithAds = [...widgets];
    const initialWidgets = widgetWithAds.slice(0, 3);

    const interval = 3;
    let inserted = 1;
    // default initial position in desktop for ad
    let currentPosition = 2;
    if (this.isMobile) {
      // this is the widgets skipped to insert the first ad
      const skipListSize = initialWidgets?.filter(
        w => skipTopWidgetsList.mobile.includes(w.type)
      )?.length;
      currentPosition = skipListSize + 3;
    }

    let increasePointer = 0;
    while (currentPosition < (widgetWithAds.length)) {
      const ads = this.getAdByPossition(inserted);
      increasePointer = ads.length;
      widgetWithAds.splice(
        currentPosition,
        0,
        ...ads
      );
      currentPosition += interval + increasePointer;
      inserted += 1;
    }
    return widgetWithAds;
  }

  /**
   * Get ad based on insertion position
   * @param {number} pos position
   * @returns {array}
   */
  getAdByPossition(pos) {
    const adDTypes = adDefinitions[this.device];
    const adType = adDTypes[pos] ?? adDTypes[adDTypes.length - 1];
    const ads = [adHelper.getAdDefinition(adType, pos)];
    return ads;
  }
}
