import Tracker from '../Tracker';
import { hasKey } from '../../../helpers';

const PREFIX = 'liveBlog.';
/**
 * Tracks Live Blog events
 */
class LiveBlogTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      start: `${PREFIX}start`, // Fired when the user scrolls past the first 3000px
      advance: `${PREFIX}advance`, // Fired when the user scrolls beyond 6000px
      nextPage: `${PREFIX}nextPage`, // Fired when the user clicks clicks the pagination button forward
      prevPage: `${PREFIX}prevPage`, // Fired when the user clicks clicks the pagination button back
      refresh: `${PREFIX}refresh`, // Fired when the user refreshes using the refresh button
      newPage: `${PREFIX}newPage`, // Fired when the user navigates to a new page in the live blog
    });
  }

  /**
   * Tracks events for Live Blogs
   * @param {string} event Name of the event
   * @param {Object} data Additional parameters for the handler
   */
  track(event, data) {
    const utagData = {
      content_type: 'liveblog',
      slideshow_type: 'blog',
      slideshow_id: data.title,
      slideshow_position: data.scrollingCount,
    };
    switch (event) {
      case this.events.start:
        utagData.event = 'slide advance start';
        utagData.navigation_method = 'scroll';
        break;

      case this.events.advance:
        utagData.event = 'slide advance';
        utagData.navigation_method = 'scroll';
        break;

      case this.events.nextPage:
        utagData.event = 'slideshow_engagement';
        utagData.slideshow_action = 'pagination forward';
        break;

      case this.events.prevPage:
        utagData.event = 'slideshow_engagement';
        utagData.slideshow_action = 'pagination back';
        break;

      case this.events.refresh:
        utagData.event = 'slideshow_engagement';
        utagData.slideshow_action = 'autorefresh';
        break;

      case this.events.newPage:
        Tracker.pageView();
        break;

      default:
        break;
    }

    if (hasKey(utagData, 'event')) {
      Tracker.fireEvent(utagData);
    }
  }
}

export default new LiveBlogTracker();
