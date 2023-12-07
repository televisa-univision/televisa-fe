import Store from '../../../store/store';
import { isSpa } from '../../../store/storeHelpers';
import { isValidArray, isValidFunction } from '../../helpers';

/**
 * validate if is client env
 * @returns {boolean}
 */
const isClient = () => typeof window !== 'undefined';

/**
 * Validate if user timiing is supported by current the navigator
 * @returns {boolean}
 */
const isUserTimingSupported = () => (
  isClient()
  && window.performance
  && isValidFunction(window.performance.clearMarks)
  && isValidFunction(window.performance.getEntriesByName)
  && isValidFunction(window.performance.mark)
  && isValidFunction(window.performance.measure)
);

/**
 * Return mark if current page
 * @param {string} mark label mark
 * @returns {Object}
 */
const getMarkId = mark => ({
  defaultMark: 'mark:transition:spa',
  measure: `measure:${mark}:spa`,
  start: `mark:${mark}:spa`,
  finish: `mark:${mark}:end:spa`,
});

/**
 * User Timing Manager
 * if the navigator supports user timing this returns the
 *  implementation that uses mark and measure in spa and mpa pages
 *  else this returns empty methods to avoid errors on exceution
 * @see https://www.w3.org/TR/user-timing/
 * @returns {function}
 */
const userTiming = () => {
  // Define a Abstract Object
  const timingMark = {
    init() {},
    finish() {},
  };

  if (isUserTimingSupported()) {
    return (mark, spa = isSpa(Store)) => {
      if (!spa) {
        return timingMark;
      }

      const perf = window.performance;
      const id = getMarkId(mark);

      /**
       * Clear the previous mark and mark the new value
       * @param {boolean} finish check if is init or finish mark
       */
      const clearAndMark = (finish = false) => {
        const markId = finish ? id.finish : id.start;
        perf.clearMarks(markId);
        perf.mark(markId);
      };

      /**
       * Check if has init and finish mark
       * @returns {boolean}
       */
      const validateMarks = () => (
        (isValidArray(perf.getEntriesByName(id.defaultMark)))
        && isValidArray(perf.getEntriesByName(id.finish))
      );

      return {
        /**
         * Start creating a new performance entry
         */
        init() {
          clearAndMark();
        },
        /**
         * Add to the context the refeerence performance entry
         */
        referenceMark() {
          const [entry] = perf.getEntriesByName(id.defaultMark);
          this.startMark = entry;
        },
        /**
         * Measuring an already performance entry mark
         * @param {string} entryId entry name
         */
        referenceMeasure(entryId) {
          if (this.isValidEntry(id.defaultMark)) {
            const measureId = `measure:${entryId}:spa`;
            perf.clearMeasures(measureId);
            perf.measure(measureId, this.startMark.name);
          }
        },
        /**
         * Get the time elapsed since the startMark time origin
         * @returns {number}
         */
        referenceTime() {
          return this.startMark && (perf.now() - this.startMark.startTime);
        },
        /**
         * Get a entry by entry name
         * @param {string} entryId entry name
         * @returns {Object}
         */
        getEntryByName(entryId) {
          const [entry] = perf.getEntriesByName(entryId);
          return entry;
        },
        /**
         * Get an entry by entry type and entry name
         * @param {string} type performance entry type
         * @param {regexp} match match value
         * @returns {Object}
         */
        findEntryByType(type, match) {
          return perf.getEntriesByType(type).find(x => match.test(x.name));
        },
        /**
         * Validate a entry name
         * @param {string} entryId performance entry name
         * @returns {boolean}
         */
        isValidEntry(entryId) {
          return !!this.getEntryByName(entryId);
        },
        /**
         * Remove all performance entries with an entryType of resource
         * https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearResourceTimings
         */
        clearResources() {
          perf.clearResourceTimings();
        },
        /**
         * Mark and measure based on reference mark
         */
        finish() {
          clearAndMark(true);

          if (validateMarks()) {
            perf.clearMeasures(id.measure);
            perf.measure(
              id.measure, id.defaultMark, id.finish,
            );
          }
        },
      };
    };
  }
  return () => timingMark;
};

/**
 * Return the result method based on user timing if the
 *  navigator support user timing or not
 */
export default userTiming();
