// eslint-disable-next-line import/no-cycle
import { hasKey, isValidArray, getKey } from '../../helpers';
// eslint-disable-next-line import/no-cycle
import Store from '../../../store/store';
// eslint-disable-next-line import/no-cycle
import { getRequestParams, getEnv } from '../../../store/storeHelpers';
// eslint-disable-next-line import/no-cycle
import { getUtagData } from '../trackingHelpers';
import gtmConfig from './gtmConfig.json';
// eslint-disable-next-line import/no-cycle
import loadGoogleTagManager from './gtmLoader';

/**
 * @typedef {Object} GtmManager
 * @property {array} eventsQueue a queue of ad events
 * @property {function} load loads and sets up the manager
 * @property {function} getDataLayer gets current data layer
 * @property {function} triggerEvent triggers a manager event
 * @property {function} pageView reports a virtual page view event
 * @property {function} updateDataLayer updates current data layer
 */
const gtmManager = {
  eventsQueue: [],

  /**
   * Loads Google Tag Manager
   * @param {Object} config Configuration object
   * @param {string} id Google Tag Manager Container ID
   * @returns {boolean} true if loaded using LocationService location
   */
  load(config, id = gtmConfig.id) {
    if (config && !hasKey(global, 'window.utag_data')) {
      let environmentParameters = null;
      const requestParameters = getRequestParams(Store);
      // Default environment configuration
      if (getEnv(Store) !== 'production') {
        environmentParameters = gtmConfig.testParameters;
      }
      // Environment override
      if (hasKey(requestParameters, 'mode')) {
        if (requestParameters.mode === 'prod') {
          environmentParameters = null;
        } else if (requestParameters.mode === 'test') {
          environmentParameters = gtmConfig.testParameters;
        }
      }

      window.utag_data = getUtagData(config);

      loadGoogleTagManager(id, gtmConfig.dataLayer, environmentParameters);
      return true;
    }
    return false;
  },

  /**
   * Wrapper to return the dataLayer
   * @returns {Array}
   */
  getDataLayer() {
    if (!Array.isArray(window[gtmConfig.dataLayer])) {
      window[gtmConfig.dataLayer] = [];
    }
    return window[gtmConfig.dataLayer];
  },

  /**
   * Add new data layer to dataLayer array
   * @param {*} data - new dataLayer info
   */
  addDataLayer(data) {
    if (Array.isArray(window[gtmConfig.dataLayer])) {
      window[gtmConfig.dataLayer].push(data);
    }
  },

  /**
   * Remove previous items on datalayer
   * @param {string} id Google Tag Manager Container ID
   */
  clearDataLayer(id = gtmConfig.id) {
    if (isValidArray(window[gtmConfig.dataLayer])) {
      window[gtmConfig.dataLayer].length = 0;
      if (hasKey(global.window, `google_tag_manager.${id}.dataLayer.reset`)) {
        global.window.google_tag_manager[id].dataLayer.reset();
      }
    }
  },

  /**
   * Add an event to the data layer
   * @param {Object} event Event to track
   */
  triggerEvent(event) {
    this.getDataLayer().push(Object.assign({}, event));
  },

  /**
   * Tracks page views/virtual page views.
   * @param {Object} extraData optional extra data for the event
   */
  pageView(extraData = {}) {
    const data = {
      ...window.utag_data,
      ...extraData,
    };
    this.triggerEvent({
      ...data,
      event: data.event || gtmConfig.virtualPageViewEvent,
    });
  },

  /**
   * Updates dataLayer only if already set
   * @param {Object} data to update
   */
  updateDataLayer(data) {
    if (isValidArray(window[gtmConfig.dataLayer])) {
      const dataLayerData = window[gtmConfig.dataLayer][0];
      const mvpdProvider = getKey(dataLayerData, 'mvpdproviderid', 'false');

      // First element holds the tracking data to update
      window[gtmConfig.dataLayer][0] = {
        ...data,
        mvpdproviderid: mvpdProvider,
      };
      // The Video SDK depends on this entry to know that GTM SDK is loaded
      // Since we are clearing the data layer we need to reintroduce this event.
      window[gtmConfig.dataLayer].push({ event: 'gtm.js' });
    }
  },

  /**
   * Sets the user id value in the dataLayer
   * @param {string} userId user id of the current visitor
   */
  setUserId(userId) {
    if (userId && isValidArray(window[gtmConfig.dataLayer])) {
      const dataLayerData = window[gtmConfig.dataLayer][0];
      // First element holds the tracking data to update
      window[gtmConfig.dataLayer][0] = {
        ...dataLayerData,
        user_id: userId,
      };
    }
  },
};

export default gtmManager;
