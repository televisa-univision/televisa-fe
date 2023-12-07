import Tracker from '../Tracker';

import Store from '../../../../store/store';
import { getPageData } from '../../../../store/storeHelpers';
import { isInViewport } from '../../../helpers';
/**
 * Tracks Section events
 */
class SectionTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      scrolling: SectionTracker.trackScrolling,
    });
  }

  /**
   * Tracks scrolling milestones.
   * @param {Object} data Contextual data
   */
  static trackScrolling(data) {
    const pageData = getPageData(Store);
    const utagData = {
      event: `section_${data.milestone}_percent`,
      content_type: pageData.data.type,
      widget_pos: data.widgetPosition || 0,
    };
    Tracker.fireEvent(utagData);
  }
}

export default new SectionTracker();

/**
 * Helper to track scrolling milestones. It will get the last visible widget in the viewport and
 * delegate the tracking logic to SectionTracker.trackScrolling
 * @param {Array} milestonesReached Milestones reached by the user while scrolling
 * @param {Node} widgetsContainer DOM reference to the widgets container
 */
export const onMilestone = (milestonesReached, widgetsContainer) => {
  // Get visible widgets in the viewport
  const visibleWidgets = Array.prototype.filter.call(
    widgetsContainer.getElementsByClassName('widget'),
    widget => isInViewport(widget) && widget.offsetHeight > 0
  );
  // Take the last visible widget as the "widgetPosition" for the milestone
  let widgetPosition;
  if (Array.isArray(visibleWidgets) && visibleWidgets.length > 0) {
    widgetPosition = visibleWidgets[visibleWidgets.length - 1].getAttribute('data-position');
  }
  // Track the event for each milestone
  milestonesReached.forEach((milestone) => {
    SectionTracker.trackScrolling({
      milestone,
      widgetPosition,
    });
  });
};
