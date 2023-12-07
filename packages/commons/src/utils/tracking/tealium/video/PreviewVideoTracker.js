import Tracker from '../Tracker';
import { getKey, deburrToLowerCase } from '../../../helpers';
/**
 * Tracks video events
 */
class PreviewVideoTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      trackEvent: PreviewVideoTracker.trackPreviewVideo,
      click: PreviewVideoTracker.trackPreviewVideoClick,
    });
  }

  /**
   * Tracks scrolling milestones.
   * @param {Object} data Contextual data
   */
  static trackPreviewVideo(data) {
    const trackData = {
      event: 'content_click',
      card_id: getKey(data, 'uid', getKey(data, 'widgetContext.id')),
      card_title: deburrToLowerCase(getKey(data, 'title')),
      card_type: getKey(data, 'cardType', 'VideoCard preview - square'),
      reaction_count: getKey(data, 'reactionsCount', 0),
      widget_title: deburrToLowerCase(getKey(data, 'widgetContext.title')),
      widget_type: getKey(data, 'widgetContext.name'),
      widget_pos: getKey(data, 'widgetContext.position', 0),
    };
    Tracker.fireEvent(trackData);
  }
}

export default new PreviewVideoTracker();
