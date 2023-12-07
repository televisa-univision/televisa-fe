import consoleLogger from '@univision/fe-utilities/utils/consola';

import loadPerfume from './perfumeLoader';
import Tracker from '../tealium/Tracker';
import {
  WEB_VITALS_CATEGORY,
  WEB_VITALS_EVENT,
  LOW_END_EXPERIENCE,
  HIGH_END_EXPERIENCE,
} from '../../../constants/tracking';

const metricNames = ['navigationTiming', 'fp', 'fcp', 'lcp', 'lcpFinal', 'cls', 'clsFinal', 'tbt', 'tbt10S', 'tbtFinal'];

/**
 * Tracks performance metrics and send them to analitycs
 * @param {Object} metric received
 */
export const analyticsTracker = ({ metricName, data, navigatorInformation }) => {
  let eventAction = metricName;
  let eventValue = Math.round(metricName === 'cls' ? data * 1000 : data);
  if (metricName === 'navigationTiming') {
    eventAction = 'TTFB';
    eventValue = data.timeToFirstByte || 0;
  }
  if (metricNames.includes(metricName)) {
    const eventData = {
      event: WEB_VITALS_EVENT,
      event_category: WEB_VITALS_CATEGORY,
      event_action: eventAction,
      event_value: eventValue,
      event_label: navigatorInformation.isLowEndExperience
        ? LOW_END_EXPERIENCE : HIGH_END_EXPERIENCE,
      // Use a non-interaction event to avoid affecting bounce rate
      non_interaction: true,
    };
    Tracker.fireEvent(eventData);
  }
};

/**
 * Perfume tracker - used to track performance in GA
 * Perfume leverages the latest Performance APIs to collect
 * field data that allows us to understand what real-world
 * users are actually experiencing.
 * for more info go here: https://github.com/Zizzamia/perfume.js
 */
const perfumeTracker = {
  /**
   * Collect tracking data on client side
   * @param {Object} config Nielsen configuration
   */
  load() {
    this.initPerfume = this.initPerfume.bind(this);

    if (global.window) {
      loadPerfume().then(this.initPerfume, this.onError);
    }
  },

  onError(error) {
    consoleLogger.warn(error);
  },

  initPerfume(Perfume) {
    if (!Perfume) {
      consoleLogger.warn(new Error('Perfume has not been initialized'));
      return null;
    }

    return new Perfume({
      analyticsTracker,
    });
  },
};

export default perfumeTracker;
