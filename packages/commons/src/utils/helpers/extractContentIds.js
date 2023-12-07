/**
 * Extracts all possible content ids related to a page
 * @param {Object} data can be page data or widget data
 * @param {boolean} isWidget flag to know if we're extracting data from a widget
 * @returns {array} array of all possible content ids
 */
const extractContentIds = ({ data, isWidget }) => {
  const contentIds = [];

  // If page uid is available, then push it to the list
  if (!isWidget && data?.uid) {
    contentIds.push(data.uid);
  }

  // Go thru widgets first, should at least have an empty array
  const widgets = isWidget ? data : data?.widgets;

  // Map all content ids
  if (Array.isArray(widgets)) {
    widgets.forEach((widget) => {
      const { contents } = widget || {};

      if (!Array.isArray(contents)) return;

      contents.forEach(item => contentIds.push(item.uid));
    });
  }

  // Return new array without duplicates
  return [...new Set(contentIds)];
};

export default extractContentIds;
