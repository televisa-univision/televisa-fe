import { exists, getKey } from '../../helpers';
import device from '../device';
import breakPoint from '../../breakpoint/breakPointMediator';
import loadTealium from './tealiumLoader';
import { getUtagData } from '../trackingHelpers';

/**
 * @typedef {Object} TealiumManager
 * @property {array} eventsQueue a queue of ad events
 * @property {function} load loads and sets up the manager
 * @property {function} linkEvent delegates to window.utag.link
 * @property {function} pageView reports a virtual page view event
 * @property {function} triggerEvent triggers a manager event
 * @property {function} processEvents traverses the queued events, calls {@see linkEvent} per each
 * one.
 * @property {function} waitForApiReady tries to wait for window.utag to not be defined.
 */
const tealiumManager = {
  eventsQueue: [],

  /**
   * Loads the Tealium SDK
   * @param {Object} config Tealium configuration
   * @returns {boolean} true if loaded using Location Services location
   */
  load(config) {
    const bpDevice = breakPoint.getDevice();
    if (exists(config)) {
      this.config = config;
      const { userAgent } = navigator;
      window.UVN = window.UVN || {
        isEnableTrackingDebug: false,
        isDesktop: device.isDesktop(userAgent, bpDevice),
        isTablet: device.isTablet(userAgent, bpDevice),
        isMobile: device.isMobile(userAgent, bpDevice),
        isAndroid: device.isAndroid(userAgent),
        isIos: device.isIos(userAgent),
      };
      const site = 'univision';
      const { account } = this.config;
      const env = getKey(this, 'config.environment', getKey(this, 'config.data.environment_name'));
      window.utag_data = getUtagData(this.config);

      loadTealium(site, account, env);
      return true;
    }
    return false;
  },

  /**
   * Delegates to window.utag.link
   * @param {Object} event event to trigger
   */
  linkEvent(event) {
    window.utag.link(event);
  },

  /**
   * Tracks page views/virtual page views. Delegates to window.utag.view
   * @param {function} callback Callback function
   */
  pageView(callback) {
    const timestamp = new Date().getTime().toString();
    this.waitForApiReady(100, 10).then(() => {
      const utagData = {
        ...window.utag_data,
        page_load_timestamp: timestamp,
      };

      window.utag.view(utagData, callback);
    });
  },

  triggerEvent(event) {
    this.eventsQueue.push(event);
    this.processEvents();
  },

  /**
   * Traverses the queued events, calls {@see linkEvent} per each one.
   */
  processEvents() {
    this.waitForApiReady(1000, 10).then(() => {
      const currentQueue = this.eventsQueue;
      while (currentQueue.length > 0) {
        this.linkEvent(Object.assign({}, currentQueue.shift()));
      }
    });
  },
  /**
   * Tries to wait for window.utag to not be defined.
   * @param {number} time milliseconds to wait between each try
   * @param {number} chances number of allowed tries
   * @returns {Promise}
   */
  waitForApiReady(time, chances) {
    return new Promise((resolve, reject) => {
      let tryChances = chances;

      /**
       * Self executes function for waiting
       */
      const check = () => {
        tryChances -= 1;
        if (typeof window.utag !== 'undefined') {
          resolve(window.utag);
        } else if (tryChances <= 0) {
          reject(new Error('Not loaded'));
        } else {
          setTimeout(check, time);
        }
      };
      check();
    });
  },
};

export default tealiumManager;
