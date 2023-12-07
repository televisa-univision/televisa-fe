import userTiming from '@univision/fe-commons/dist/utils/performance/userTiming';
import Store from '@univision/fe-commons/dist/store/store';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import {
  getPageCategory, isVerticalHome, getContentType, isSpa,
} from '@univision/fe-commons/dist/store/storeHelpers';
import features from '@univision/fe-commons/dist/config/features';
import * as marks from '@univision/fe-commons/dist/utils/performance/userTiming/marks';

/**
 * Add custom event to pushState method
 */
function registerHistoryEvent() {
  const { history } = window;
  const pushStateMethod = history.pushState;
  history.pushState = (...args) => {
    window.dispatchEvent(new CustomEvent('routeStateChange', {
      detail: args,
    }));
    pushStateMethod.apply(history, args);
  };
}

/**
 * Control object for mesuare SPA transitions
 *  based on SpeedCurve LUX script
 *  https://speedcurve.com/features/lux/
 */
const Monitoring = {
  /**
   * Add custom data to SpeedCurve Lux
   * @param {string} id custom label mark
   * @param {string} value custom data value
   */
  addData(id, value) {
    if (window.LUX && isValidFunction(window.LUX.addData) && value) {
      const customData = `measure:${id}:spa`;
      window.LUX.addData(customData, value);
    }
  },
  /**
   * Measure page transition on SPA navigation
   * @param {boolean} spa SPA navigation
   */
  register(spa = isSpa(Store)) {
    if (features.tracking.spaMonitoring() && spa) {
      this.init();
      registerHistoryEvent();

      /* Event handler for history pushState */
      window.addEventListener('routeStateChange', ({ detail }) => {
        if (detail && detail.length) {
          this.init(spa);

          this.timing.clearResources();
          this.records.length = 0;

          /* Notified new performance measurement events (resorces)
          on the page for each SPA transition
          https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver */
          this.resource = new PerformanceObserver(() => {
            this.timing.referenceMeasure(marks.VISUALLY_COMPLETE);
          });

          /* Notified new DOM changes on the page for each SPA transition
          https://developer.mozilla.org/es/docs/Web/API/MutationObserver */
          this.mutation = new MutationObserver(() => {
            this.timing.referenceMeasure(marks.DOM_CONTENT_LOADED);

            /* Store the reference time for the DOM changes
            and the size for the document page element */
            this.records.push({
              time: this.timing.referenceTime(),
              count: document.getElementsByTagName('*').length,
            });
          });

          /* Observer only changes on performance entryType of `resources` */
          this.resource.observe({ entryTypes: ['resource'] });

          /* Observer all changes on document element */
          this.mutation.observe(document, {
            attributes: true,
            attributeOldValue: true,
            characterData: true,
            characterDataOldValue: true,
            childList: true,
            subtree: true,
          });

          /* Excecute all the calculation with the data collected by
          performance resources timing and mutation observer */
          this.metricts = setTimeout(() => {
            // Get the performance resorce fetch for the data fetch for BEX CMS
            const fetch = this.timing.findEntryByType('resource', /web-api\/content\?url=/g);
            const spaMeasure = this.timing.getEntryByName(`measure:${marks.DOM_CONTENT_LOADED}:spa`);
            const loadTime = (spaMeasure && spaMeasure.duration) || this.timeout;
            const slopes = [0];
            const doms = [];

            /* Script based on painty to get the custom measures
            https://github.com/debug-tips/painty */
            this.records.reduce((acc, cur) => {
              let result = 0;
              const weight = 0.5 ** (Math.abs(parseFloat(cur.time) - loadTime) / 1000);
              if (acc.count !== cur.count) {
                result = (cur.count - acc.count) / (cur.time - acc.time) * weight;
              }
              slopes.push(result);
              doms.push(acc.count);
              return cur;
            });
            const minDom = Math.min.apply(null, doms);
            const minDomIndex = doms.indexOf(minDom);
            const maxSlope = Math.max.apply(null, slopes);
            const maxSlopeIndex = slopes.indexOf(maxSlope);
            this.addData(marks.TIME_TO_FIRST_BYTE, fetch && fetch.duration);
            this.addData(marks.READY_TO_PAINT, this.records[minDomIndex].time);
            this.addData(marks.FIRST_PAINT, this.records[minDomIndex + 1].time);
            this.addData(marks.FIRST_CONTENTFUL_PAINT, this.records[minDomIndex + 2].time);
            this.addData(marks.FIRST_MEANINGFUL_PAINT, this.records[maxSlopeIndex].time);
            this.isPending = false;
            this.done();
          }, this.timeout);
        }
      });
    }
  },
  /**
   * Clear all registered resorces and send info to SpeedCurve Lux
   */
  done() {
    clearTimeout(this.metricts);
    this.resource.disconnect();
    this.mutation.disconnect();
    this.send();
  },
  /**
   * Init SpeedCurve Lux and initialize control var for SPA
   * @param {boolean} spa SPA navigation
   */
  init() {
    // Init a new session on page update
    if (window.LUX && isValidFunction(window.LUX.init)) {
      window.LUX.init();
      this.timing = userTiming(marks.PAGE_TRANSITION);
      this.timing.init();
      this.timing.referenceMark();
      this.records = [];
      this.timeout = 3000;
    }
  },
  /**
   * Send label and custom data to SpeddCurve Lux
   */
  send() {
    if (window.LUX && isValidFunction(window.LUX.send)) {
      const type = getContentType(Store);
      const category = getPageCategory(Store);
      window.LUX.label = isVerticalHome(Store) ? `${category} Home SPA` : `${category} ${type} SPA`;
      window.LUX.send();
    }
  },
};

export default Monitoring;
