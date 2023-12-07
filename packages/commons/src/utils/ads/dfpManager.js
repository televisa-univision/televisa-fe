/**
 * ATTENTION:
 * For Amazon TAM and Rubicon Prebid parallel auctions,
 * please see the README.md in this directory
 */

/* eslint-disable no-underscore-dangle */
import localStorage from '@univision/fe-utilities/storage/localStorage';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import { USER_ID } from '../../constants/personalization';
import BreakPoint from '../breakpoint/breakPointMediator';
import Store from '../../store/store';
import {
  adSettingsTargetingSelector,
  appVersionSelector,
  contentTypeSelector,
  deviceSelector,
} from '../../store/selectors/page-selectors';
import { getDevice, getModeParam } from '../../store/storeHelpers';
import * as Actions from '../../store/actions/ads-actions';
import {
  getKey,
  hasKey,
  isValidArray,
} from '../helpers';
import Features from '../../config/features';
import thirdPartyFeatures from '../../config/features/thirdParties';
import { resolveOrRejectAll } from '../promise';
import {
  MOBILE_AD_PREFIX,
  DESKTOP_AD_PREFIX,
} from '../../constants/ads';
import trackingAdEvents from './tracking/trackingAdEvents';
import loadGPTScript, { initGPTScript } from './vendors/dfpLoader';
import loadIASScript from './vendors/iasLoader';
import permutiveIndexScript from './vendors/permutiveLoader';
import amzIndexScript from './vendors/amzLoader';
import loadRubiconScript from './vendors/rubiconLoader';
import getTestGroup from './tracking/testGroups';
import { isTelevisaSiteSelector } from '../../../dist/store/selectors/page-selectors';

/**
 * Dfp Ads utility to handle all api interactions
 * Dependencies:
 * Any ad implementation requires:
 *  BreakPointIndicator (on top of the page) to detect device
 *  DFPAdsProvider (as a wrapper) to sync the initial above the fold ad calls
 *  BS API Data to set ad values
 *  Redux as single source of truth
 * Auctions:
 *  We have implemented parallel integration for Amazon TAM and Rubicon Prebid auction platforms
 *    - Parallel integration means that both auctions run
 *    - Google Ad Manager (GAM) knows about the winning bid. Success callback's payloads
 *      can be ignored
 *    - There is a failsafe timeout to render the ad via the Google Publisher Tag (GPT) in
 *      case both auctions don't finish
 *    - Success callbacks sets a flag for amazon or rubicon to say it's completed
 *    - When both are completed or failsafe fired, the ad slot is rendered, pulling from GAM
 *  All normal-sized ads are sent to auction
 *  Custom sizes do not go to auction
 *  Each ad has it's own auction, though the auctions are designed to handle multiple ads
 */
const dfpManager = {
  // Array to identify when an ad has already triggered a callback
  adCallBackCheck: [],
  // Array to identify when an ad has already been tracked
  adTrackingCheck: [],
  /**
   * flag to prevent multiple calls to this.load()
   */
  haveScriptsLoaded: false,
  shouldResetPageLevelParams: false,
  /**
   * Function that initializes the global window object with ad libraries
   * @param {array} result Carries results from the async calls to load the different ad libraries
   */
  initGlobals(result) {
    // result array are the results from the load command (from getVendorFetches)
    // 0 is initGPTScript
    /* istanbul ignore next */
    window.googletag = window.googletag || result[1] || result[0];
  },

  /**
   * Returns an array of vendor library async fetches
   * @returns {Array} fetches Array of vendor library async fetches
   */
  getVendorFetches() {
    const fetches = [initGPTScript()];
    const areCookiesEnabled = !Features.advertisement.areCookiesDisallowed();
    const isPrebid = Features.advertisement.isPrebidDisplay();

    fetches.push(loadGPTScript());

    if (thirdPartyFeatures.isPermutiveEnabled()) {
      fetches.push(permutiveIndexScript());
    }

    // If Integral Ad Science is enabled
    if (Features.advertisement.ias()) {
      fetches.push(loadIASScript());
    }
    // Disable Amazon and Rubicon, if no cookies
    // load amazon and prebid scripts last, disabled for EU
    if (areCookiesEnabled) {
      fetches.push(amzIndexScript());
      if (isPrebid) {
        fetches.push(loadRubiconScript());
      }
    }

    return fetches;
  },

  /**
   * Loading async vendor libraries
   * @param {array} vendorFetches Array of vendor library async fetches
   * @returns {Promise} Promise to all vendor fetches
   */
  load(vendorFetches = this.getVendorFetches()) {
    // The catch(() => undefined) here cause rejections to be resolved to undefined because
    // we want promise to wait for all responses even errors
    // and Promise.all normally just returns after first rejection
    /* istanbul ignore next */
    return resolveOrRejectAll(vendorFetches)
      .then((result) => {
        const state = Store.getState();
        this.isTelevisaSite = isTelevisaSiteSelector(state);
        this.initGlobals(result);
        return result;
      })
      .catch(() => {
        // Monitor.captureMessage(reason);
      });
  },

  /**
   * Impression viewable callback
   * @param {Object} event after being in view
   * @returns {HTMLElement} className Ad container className
   */
  impressionViewableCallback(event) {
    const adId = event.slot.getSlotId().getDomId();
    const adDiv = document.getElementById(adId);
    const ad = this.getAdById(adId);
    const trackingValue = getKey(ad, 'trackingValue');

    // Call tracking event when required
    if (
      ad
      && Features.advertisement.areAdsTrackable()
      && trackingValue
      && !this.adTrackingCheck.includes(adId)
    ) {
      this.adTrackingCheck.push(adId);
      trackingAdEvents(trackingValue);
    }
    return adDiv;
  },

  /**
   * slotRenderEnded callback
   * @param {Object} event after being rendered
   * @returns {string} className Ad container className
   */
  slotRenderEndedCallback(event) {
    const adId = event.slot.getSlotId().getDomId();
    const adDiv = document.getElementById(adId);
    const ad = this.getAdById(adId);
    const isNativeAd = ad && ad.isNativeAd;

    adDiv.parentElement.className += ' uvs-ad-ready';

    if (event.isEmpty) {
      adDiv.parentElement.className += ' uvs-ad-wrapper-empty';
    } else if (isNativeAd) {
      adDiv.className += ' uvs-native-ad-container';
    }

    if (isNativeAd) {
      Store.dispatch(Actions.updateNativeAdEmpty({ isEmpty: event.isEmpty }));
    }

    adDiv.style.minWidth = 'auto';
    adDiv.style.minHeight = 'auto';

    // Make the callback when both the ad and the former are present,
    // make sure this ad hasn't triggered callback also
    if (
      ad
      && ad.callback
      && !this.adCallBackCheck.includes(adId)
    ) {
      // Register this ad unit that it already has made the callback
      this.adCallBackCheck.push(adId);
      ad.callback(event);
    }

    return adDiv;
  },

  /**
   * Sets page level params
   * @returns {null}
   */
  setPageLevelParams() {
    if (!window?.googletag?.pubads) {
      return null;
    }

    const { googletag: { pubads } } = window;
    const state = Store.getState();
    const targeting = adSettingsTargetingSelector(state);
    const testGroup = getTestGroup(state.page);

    if (this.shouldResetPageLevelParams) {
      pubads().clearTargeting('contentType');

      if (isValidObject(targeting)) {
        Object.keys(targeting).map(key => pubads().clearTargeting(key));
      }
    }

    // Setting client, a second attempt will not modify its value
    pubads().setTargeting('client', deviceSelector(state));

    // Include contentType key value pair if defined on store
    // this will be added in the provider
    pubads().setTargeting('contentType', contentTypeSelector(state));

    // Providing tag targeting attr
    if (targeting) {
      this.setTargeting(targeting, pubads());
    }

    // Providing bkpt targeting attr
    pubads().setTargeting('bkpt', this.getBkpAttr());
    // Page referrer
    pubads().setTargeting('referrer', this.getReferrer());

    // Adding nextjs segment key value
    if (testGroup) {
      pubads().setTargeting('test_group', testGroup);
    }

    // eslint-disable-next-line dot-notation
    this.setWithUserId(getKey(state, 'user.sub') || localStorage.getObject(USER_ID)?.['univision_user_id']);

    // Providing skey targeting attr
    const keySvalue = this.isTelevisaSite ? (window.location.search.match(/skey=(\w+)/)?.[1] || '') : '';

    if (keySvalue) {
      pubads().setTargeting('skey', keySvalue);
    }

    return null;
  },

  /**
   * This function is for when the user_id is necessary.
   * Locally you can set the user_id on initial page load,
   * but when you deploy to other envs, it won't work.
   * This function will grab the user_id and set it when it
   * starts existing.
   * @param {string} userId - id of the current user (you).
   */
  setWithUserId(userId) {
    if (window?.googletag?.pubads && userId) {
      const { googletag: { pubads } } = window;
      // Enable ppid for ads
      pubads().setPublisherProvidedId(userId);
      // Set user_id in cust_params
      pubads().setTargeting('uid', userId);
    }
  },

  /**
   * Initializing gpt on callback
   */
  gptInit() {
    this.gptInitialized = true;
    const { googletag } = window;
    // See Google Publisher Tag docs at...
    // https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_refresh
    // Enables single request mode for fetching multiple ads at the same time
    googletag.pubads().enableSingleRequest();
    // Disables requests for ads on page load, but allows ads
    // to be requested with a googletag.pubads().refresh() call
    googletag.pubads().disableInitialLoad();
    // Enables async rendering mode to enable non-blocking fetching and rendering of ads
    googletag.pubads().enableAsyncRendering();
    // Enables/disables centering of ads
    googletag.pubads().setCentering(true);
    // Registers a listener that allows you to set up and call a
    // JavaScript function when a specific GPT event happens on the page
    /* istanbul ignore next */
    googletag.pubads().addEventListener('slotRenderEnded', e => this.slotRenderEndedCallback(e));
    /* istanbul ignore next */
    googletag.pubads().addEventListener('impressionViewable', e => this.impressionViewableCallback(e));
    // Enables all GPT services that have been defined for ad slots on the page
    googletag.enableServices();
  },

  /**
   * Helper to create sequence (D-F728-1)
   * @param {string} device from client
   * @param {array} sizes array of arrays
   * @returns {string} sequence value
   */
  getSequence(device, sizes) {
    const state = Store.getState();
    let sec = '';
    if (Array.isArray(sizes) && sizes.length) {
      // M, T or D depending on device
      sec += `${device.substring(0, 1).toUpperCase()}-`;
      if (this.isFlex(sizes)) {
        sec += 'F';
      }
      const adType = sizes[0][0];
      sec += adType;
      sec += `-${state.dfpAds.sequenceOrder[adType]}`;
      Store.dispatch(Actions.increaseSequence(adType));
    }
    return sec;
  },

  /**
   * Helper to get breakpoint attribute
   * @returns {number} breakpoint
   */
  getBkpAttr() {
    /*
     - Breakpoints >/=1440 should pass a key-value of bkpt=1440
     - Breakpoints <1440 and >/=1024 should pass a key-value of bkpt=1024
     - Breakpoints <1024 and >/=768 should pass a key-value of bkpt=768
     - Breakpoints <768 should pass a key-value of bkpt=320

     Base on:
     $grid-breakpoints: (
     xxs: 0,
     xs: 480px,
     sm: 768px,
     md: 1024px,
     lg: 1280px,
     xl: 1440px
     );
     */
    const bkpWidth = BreakPoint.getWidth();
    let bkpt = 320;
    switch (true) {
      case bkpWidth >= 1440:
        bkpt = 1440;
        break;
      case bkpWidth < 1440 && bkpWidth >= 1024:
        bkpt = 1024;
        break;
      case bkpWidth < 1024 && bkpWidth >= 768:
        bkpt = 768;
        break;
      case bkpWidth < 768:
      default:
        bkpt = 320;
        break;
    }
    return bkpt;
  },

  /**
   * Helper to get source of referral traffic, normalized
   * @param {string} referrer url-formatted string
   * @returns {string} top-level domain of referring website or 'direct' if none found
   */
  getReferrer(referrer = document.referrer) {
    try {
      const url = new URL(referrer);
      const hostNameParts = url.hostname.split('.');
      const topLevelDomain = hostNameParts
        .slice(hostNameParts.length - 2)
        .join('.');
      return topLevelDomain;
    } catch (e) {
      return 'direct';
    }
  },

  /**
   * Gets ad name based on useragent, config and
   * environment
   * Example:
   * /6881/rd.univision_section_entretenimiento
   * platform_product_contentType_adValue
   * @returns {string} adName value
   */
  getAdName() {
    const state = Store.getState();
    const device = getDevice(Store);
    let adName = '';
    if (hasKey(state, 'page.data.adSettings.adTagValue')) {
      let networkCode = '6881'; // this is prod ad server
      if (getKey(state, 'page.config.deploy.env') !== 'production') {
        /* istanbul ignore else */
        if (getModeParam(Store) !== 'prod') {
          networkCode = '7009'; // this is test ad server
        }
      } else if (getModeParam(Store) === 'test') {
        networkCode = '7009'; // this is test ad server
      }

      // /6881
      adName = `/${networkCode}`;
      // gets new product prefix
      // /6881/rd  << if desktop /rd, and for mobile /rm
      adName += device === 'desktop' ? DESKTOP_AD_PREFIX : MOBILE_AD_PREFIX;
      // /6881/rd_univision_
      adName += '.univision';
      // /6881/rd_univision_section_entretenimiento
      adName += `_${state.page.data.adSettings.adTagValue?.replace(/\s+/g, '_')}`;
    }
    return adName;
  },

  /*
   * Get ready to display ads, ones that haven't already been displayed
   * @param {array} ads array
   * @returns {array} ads ready to display
   */
  getReadyAds(ads) {
    return ads.filter(ad => !ad.displayed);
  },

  /**
   * Get Ad by id
   * @param {string} id to find
   * @param {array} ads array
   * @returns {Object} ad that match id
   */
  getAdById(id) {
    const state = Store.getState();
    if (hasKey(state, 'dfpAds.ads')) {
      const { ads } = state.dfpAds;
      const adArray = ads.filter(ad => ad.slotID === id);
      if (adArray.length) {
        return adArray[0];
      }
    }
    return null;
  },

  /*
   * Get Ad by id
   * @param {string} id to find
   * @returns {int} index of an ad that match id, or -1 if no match found
   */
  getAdIndexById(id) {
    const state = Store.getState();
    if (hasKey(state, 'dfpAds.ads')) {
      const { ads } = state.dfpAds;
      return ads.findIndex(ad => ad.slotID === id);
    }
    return -1;
  },

  /**
   * Get refreshable ads
   * @param {array} ads array
   * @returns {array} ads that are refreshable
   */
  getRefreshableAds(ads) {
    return ads.filter(ad => ad.refreshable);
  },

  /**
   * Get id from slot
   * @param {Object} slot - Dfp object
   * @returns {*|(function(): {getDomId: (function(): string)})|getSlotId|string}
   */
  getAdDomId(slot) {
    return slot && slot.getSlotId && slot.getSlotId().getDomId();
  },

  /**
   * Get slot from gpt api
   * @param {string} id - Ad id
   * @returns {undefined|*}
   */
  getSlotById(id) {
    const { googletag } = window;
    const slots = googletag.pubads().getSlots();
    if (slots.length) {
      return slots.find(s => this.getAdDomId(s) === id);
    }
    return undefined;
  },

  /**
   * Verify if ad is flex type
   * @param {array} sizes of ad
   * @returns {boolean}
   */
  isFlex(sizes) {
    return Array.isArray(sizes) && sizes.length && sizes.length > 1;
  },

  /**
   * Push a googletag command to display the given ads
   * Takes either DIV ID or googletag slot, our code is using slot
   * See https://developers.google.com/doubleclick-gpt/reference
   * @param {Array} slotIds Ads slots IDs or array of googletag slots to display
   */
  displayAds(slotIds) {
    window.googletag.cmd.push(() => {
      slotIds.forEach((slotId) => {
        window.googletag.display(slotId);
      });
    });
  },

  /**
   *  Process the ad slot
   *  @param {Object} slot from googletag defineSlot()
   *  @param {boolean} isAuction is used to set apstag.setDisplayBids()
   */
  processAd(slot, isAuction = false) {
    // If Integral Ad Science is enabled
    if (Features.advertisement.ias()) {
      const timeout = setTimeout(() => {
        this.displayAds([slot]);
      }, 500);

      const iasPETSlots = [{
        adSlotId: slot.getSlotElementId(),
        size: slot.getSizes().map(size => [size.getWidth(), size.getHeight()]),
        adUnitPath: slot.getAdUnitPath(),
      }];

      if (getKey(global, 'window.__iasPET.queue') && Array.isArray(window.__iasPET.queue)) {
        window.__iasPET.queue.push({
          adSlots: iasPETSlots,
          dataHandler: () => {
            clearTimeout(timeout);
            window.__iasPET.setTargetingForGPT();
            this.displayAds([slot]);
          },
        });
      } else {
        clearTimeout(timeout);
        this.displayAds([slot]);
      }
    } else {
      // calling googletag.display() will not render the ad yet
      // because of the settings in this.gptInit()
      // the refresh() function below does the actual rendering
      this.displayAds([slot]);
    }

    // pushes function into cmd array for async processing
    window.googletag.cmd.push(() => {
      // turn on bidding for Amazon
      if (isAuction && typeof window.apstag !== 'undefined') {
        window.apstag.setDisplayBids();
      }
      // 'refresh' renders the ad on the page in the <div> ad slot already defined
      // using GPT slot definition. it will render winning auction ad, or normal ad
      window.googletag.pubads().refresh([slot]);
    });
  },

  /**
   * Refresh ads if has 'refreshable: true'
   * @param {(string|string[])} slotsId ad or ads to be refresh
   */
  refreshAds(slotsId) {
    const ads = [];
    const refreshableAds = this.getRefreshableAds(Store.getState().dfpAds.ads);
    if (!isValidArray(refreshableAds)) {
      return;
    }
    for (let i = 0, len = refreshableAds.length; i < len; i += 1) {
      const ad = refreshableAds[i];
      if (!slotsId) {
        ads.push(ad);
      } else if (isValidArray(slotsId)) {
        if (ads.length === slotsId.length) {
          break;
        }
        for (let s = 0, slen = slotsId.length; s < slen; s += 1) {
          if (slotsId[s] === ad.slotID) {
            ads.push(ad);
            break;
          }
        }
      } else if (slotsId === ad.slotID) {
        ads.push(ad);
        break;
      }
    }
    if (ads.length) {
      this.preFetchAds(ads);
    }
  },

  /**
   * Destroy Ads
   */
  destroyAds({ fullReset } = { fullReset: false }) {
    if (
      getKey(global, 'window.googletag.destroySlots') && Array.isArray(getKey(Store.getState(), 'dfpAds.ads'))
    ) {
      Store.dispatch(Actions.resetSlots({ fullReset }));
      window.googletag.destroySlots();
    }
  },

  /**
   * Call this.load() when specific scripts are undefined
   */
  checkLoadScripts() {
    if (this.haveScriptsLoaded) return;
    // lazy load libraries, if not already loaded
    const cookiesEnabled = !Features.advertisement.areCookiesDisallowed();
    /* istanbul ignore else */
    if (typeof window.googletag === 'undefined'
      || (cookiesEnabled && Features.advertisement.isPrebidDisplay())
    ) {
      this.load();
    }

    this.haveScriptsLoaded = true;
  },

  /**
   * Push function in gtm
   * @param {Array} refreshingAds current ads to include
   */
  pushFunctions(refreshingAds) {
    // push function into cmd array (async loaded and called)
    window.googletag.cmd.push(() => {
      // Amazon + Rubicon Prebid parallel integration STEPS
      // 1. Get list of ads that haven't been displayed yet from redux store
      // 2. Loop through ads --> Split custom sizes from standard sized biddable ads
      // 3. Define ad slots for all ads (googletag)
      // 4. Dispatch "displayAds" to Store (marks "displayed" flag)
      // 5. Send each biddable ad to auction - Amazon + Rubicon
      // 6. call googletag.display()
      // 7. If IAS, delay call to googletag.display()
      // 8. Call window.googletag.pubads().refresh([ad slot]);

      // Enabling service if not ready yet - async load googletag services
      /* istanbul ignore else */
      if (!window.googletag.pubadsReady && !this.gptInitialized) {
        this.gptInit();
      }

      // Set page level params
      this.setPageLevelParams();
      this.shouldResetPageLevelParams = true;

      // All normal-sized ads go to auction
      // 1) use refreshingAds if passed, or
      // 2) get ads that haven't been displayed on page yet
      const ads = isValidArray(refreshingAds)
        ? refreshingAds
        : this.getReadyAds(Store.getState().dfpAds.ads);

      // constant for amazon timeout
      const amazonTimeout = 1500;

      /** Handle each ad separately. Run an auction for each ad instead of a group of ads. */
      ads.forEach((ad) => {
        // define GPT ad slot
        // pass around to auctions and for rendering
        const slot = this.getSlotById(ad.slotID) || this.defineSlot(ad);

        // Mark the ad as displayed
        Store.dispatch(Actions.displayAd(ad.slotID));

        // custom ad sizes do not go to auction
        if (!ad.biddable || Features.advertisement.areCookiesDisallowed()) {
          this.processAd(slot);
          return;
        }

        // if prebid flag is off, use Index Exchange
        // send to Amazon for bid, script should already be loaded
        if (!Features.advertisement.isPrebidDisplay()) {
          /* istanbul ignore next */
          window.apstag.fetchBids({
            slots: [ad],
            timeout: amazonTimeout,
          }, () => this.processAd(slot, true));
          return;
        }

        /** Prebid parallel integration */
        // flags to make sure amazon and rubicon auctions have both completed
        // if not both finished, failsafe timeout will kick in anyway
        const bidRequestStatus = {
          amazon: false,
          rubicon: false,
          serverRequestSent: false,
        };

        // failsafe timeout in case amazon and prebid don't finish
        setTimeout(() => {
          /* istanbul ignore else */
          if (!bidRequestStatus.serverRequestSent) {
            this.processAd(slot, true);
          }
        }, Features.advertisement.prebidFailsafeTimeout);

        /** Run auctions: amazon + rubicon */
        // fetch amazon bids async, assume amazon script is loaded
        // pass 'ad' object in array, not the slot. Amazon uses specific
        // properties for their auction - 'slotName', 'slotId', etc
        // need to be array, even though we are only bidding on one ad at a time
        /* istanbul ignore next */
        window.apstag.fetchBids({
          slots: [ad],
          timeout: amazonTimeout,
        }, () => {
          // in the callback function, see if both bids have completed
          bidRequestStatus.amazon = true;
          if (bidRequestStatus.amazon && bidRequestStatus.rubicon) {
            bidRequestStatus.serverRequestSent = true;
            this.processAd(slot, true);
          }
        });

        // fetch rubicon bids async, assume rubicon script is loaded
        /* istanbul ignore next */
        window.pbjs.que.push(() => {
          // 'rp' is for rubicon hosted solution, and uses a different implementation
          window.pbjs.rp.requestBids({
            // in hosted PBJS, 'callback' is the correct function to use
            // do not use 'bidsBackHandler', which is for normal PBJS
            callback: () => {
              // in the callback function, see if both bids have completed
              bidRequestStatus.rubicon = true;
              if (bidRequestStatus.amazon && bidRequestStatus.rubicon) {
                bidRequestStatus.serverRequestSent = true;
                this.processAd(slot, true);
              }
            },
            // for hosted solution, pass GPT slots to auction
            gptSlotObjects: [slot],
          });
        });
      });
    });
  },

  /**
   * Checks if permutive targeting segmentation from localstorage is loaded
   * @returns {boolean}
   */
  isPermutiveTargetingReady() {
    return isValidArray(localStorage.getObject('_pdfps'));
  },

  /**
   * Perform Prebid auction (amazon + rubicon), ignore custom ad sizes
   * @param {array} refreshingAds is array of ads that are being refreshed
   * @returns {Promise}
   */
  preFetchAds(refreshingAds = null) {
    this.checkLoadScripts();

    if (window.permutive && window.permutive.readyWithTimeout) {
      // callback to notify permutive is loaded
      // we want this to load before ads are loaded to catch the first page view
      // if permutive is not loaded in 5000ms, this promise is resolved anyway
      return window.permutive.readyWithTimeout(this.isPermutiveTargetingReady, 5000).then(() => {
        this.pushFunctions(refreshingAds);
      });
    }

    this.pushFunctions(refreshingAds);

    return Promise.resolve();
  },

  /**
   * Define slots
   * @param {Object} slot settings from ad definition
   * @returns {Object}
   */
  defineSlot({
    slotName, sizes, slotID, device, position, sequenceable, widgetName, cardType,
  }) {
    // GPT slot definition
    const slot = window.googletag
      .defineSlot(slotName, sizes, slotID)
      .addService(window.googletag.pubads());
    window.googletag.sizeMapping();

    // Provide the name of the widget that contains the ads
    if (widgetName) {
      slot.setTargeting('widgetName', widgetName);
    }
    // Provide the name of the widget that contains the ads
    if (cardType) {
      slot.setTargeting('cardType', cardType);
    }

    // Providing sec targeting attr
    /* istanbul ignore else */
    if (sequenceable) {
      slot.setTargeting('seq', this.getSequence(device, sizes));
    }

    // Provides position in ad
    slot.setTargeting(this.isTelevisaSite ? 'pos' : 'position', position);

    return slot;
  },

  /**
   * Set the targeting for a Slot.
   * @param {Object} targeting Targeting for the Slot
   * @param {Object} slot Ad slot to add the targeting
   */
  setTargeting(targeting, slot) {
    if (isValidObject(targeting) && isValidObject(slot)) {
      Object.keys(targeting).forEach((key) => {
        if (Array.isArray(targeting[key])) {
          slot.setTargeting(key, targeting[key].join(','));
        } else {
          slot.setTargeting(key, targeting[key]);
        }
      });
    }
  },

  /**
   * Adding Slots from ad componets
   * Slot object is coming with this keys:
   * sizeMapping,
   * slotID,
   * position,
   * refreshable,
   * callback
   * @param {Object} slot from Ad component
   */
  registerSlot(slot) {
    this.checkLoadScripts();
    // To avoid parameter reassignment
    const readySlot = slot;
    const device = getDevice(Store);
    readySlot.device = device;
    /* istanbul ignore next */
    readySlot.refreshable = readySlot.refreshable || false;
    if (typeof readySlot.sizeMapping !== 'undefined'
      && typeof readySlot.sizeMapping[device] !== 'undefined'
    ) {
      readySlot.sizes = readySlot.sizeMapping[device];
    }

    // set up properties to use for header bidding
    readySlot.slotName = this.getAdName(); // amazon requires 'slotName' instead of 'adName'
    readySlot.adName = readySlot.slotName; // keep 'adName' in case other code needs it
    Store.dispatch(Actions.registerSlot({ ...readySlot, displayed: false }));
    if (appVersionSelector(Store.getState()) === 2
      || getKey(Store.getState(), 'dfpAds.displayAboveTheFold')
    ) {
      this.preFetchAds();
    }
  },
};

export default dfpManager;
