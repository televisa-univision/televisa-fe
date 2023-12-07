import gtmManager from '../googleTagManager/gtmManager';
import tealiumManager from './tealiumManager';
import { isInArray } from '../../helpers';
import features from '../../../config/features';

/**
 * Base class for Tealium Trackers
 */
export default class Tracker {
  /**
   * Sets the events for the tracker.
   * @param {Object} events Supported events for the tracker
   */
  constructor(events) {
    this.events = events;
  }

  /**
   * Handles events
   * @param {function} event Name of the event
   * @param {Object} data Additional parameters for the handler
   * @param {function} callback The function to fire when the event is sent
   */
  track(event, data, callback) {
    if (isInArray(event, Object.values(this.events))) {
      event(data, callback);
    }
  }

  /**
   * Fires a tracking event.
   * @param {Object} event Event to track
   */
  static fireEvent(event) {
    if (features.tracking.gtm) {
      gtmManager.triggerEvent(event);
    }
    if (features.tracking.tealium) {
      tealiumManager.triggerEvent(event);
    }
  }

  /**
   * Clear dataLayer data
   */
  static clearData() {
    if (features.tracking.gtm) {
      gtmManager.clearDataLayer();
    }
  }

  /**
   * Fires a page view.
   * @param {Object} extraData optional extra data for the gtmManager page view event
   */
  static pageView(extraData) {
    if (features.tracking.gtm) {
      gtmManager.pageView(extraData);
    }
    if (features.tracking.tealium) {
      tealiumManager.pageView(extraData);
    }
  }

  /**
   * Updates dataLayer data
   * @param {Object} data to update
   */
  static updateData(data) {
    if (features.tracking.gtm && data) {
      gtmManager.updateDataLayer(data);
    }
  }
}
