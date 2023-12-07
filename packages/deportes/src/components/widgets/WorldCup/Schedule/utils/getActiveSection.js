import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

/**
 * Retrieves the active section from matches
 * @param {Object} options - options
 * @param {string} options.activeTab - active matches tab
 * @param {Object} options.sections - matches ordered by date
 * @param {array} options.dates - dates available
 * @param {string} options.currentDateKey - sent as fallback when there is no activeTab value
 * @returns {array}
 */
export default function getActiveSection({
  activeTab, dates, sections, currentDateKey,
}) {
  if (!isValidArray(dates) || !isValidObject(sections)) {
    return [];
  }

  const currentKey = activeTab || currentDateKey;

  if (!currentKey || !sections[currentKey]) {
    return sections[dates[0]?.key];
  }

  return sections[currentKey];
}
