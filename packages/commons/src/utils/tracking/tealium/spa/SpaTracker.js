import * as contentTypes from '../../../../constants/contentTypes.json';
import { getUtagData, isPersonalizedContent } from '../../trackingHelpers';
import Tracker from '../Tracker';

/**
 * Tracks spa events
 */
class SpaTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      pageView: SpaTracker.pageView,
    });
  }

  /**
   * Get the event name for track
   * @param {string} type Api Type
   * @returns {string}
   */
  static getEventName(type) {
    switch (type) {
      case contentTypes.SECTION:
      case contentTypes.SECTION_RADIO:
      case contentTypes.LEAGUE:
      case contentTypes.SOCCER_TEAM:
        return 'view_section';
      case contentTypes.ARTICLE:
        return 'view_article';
      case contentTypes.SLIDESHOW:
        return 'view_slideshow';
      case contentTypes.VIEW_LIST:
        return 'view_list';
      case contentTypes.VIDEO:
        return 'view_video';
      default:
        return 'view_screen';
    }
  }

  /**
   * Tracks pageView for Spa Router
   * @param {Object} data api Data
   */
  static pageView({ uri, type, trackerConfig }) {
    Tracker.clearData();

    const event = SpaTracker.getEventName(type);

    const utagData = getUtagData(trackerConfig);
    const trackData = {
      event,
      personalization_view: isPersonalizedContent() ? 'true' : 'false',
      promo_type: type,
      promo_loc: uri,
      ...utagData,
    };
    Tracker.fireEvent(trackData);
    // The Video SDK depends on this entry to know that GTM SDK is loaded
    // Since we are clearing the data layer we need to reintroduce this event.
    Tracker.fireEvent({ event: 'gtm.js' });
  }
}

export default new SpaTracker();
