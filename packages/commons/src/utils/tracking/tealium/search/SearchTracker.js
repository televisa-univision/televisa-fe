import Tracker from '../Tracker';
import { hasKey } from '../../../helpers';

const PREFIX = 'search.';
/**
 * Tracks Search Page events
 */
class SearchTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      userSearch: `${PREFIX}userSearch`, // Fired when the user starts a search
    });
  }

  /**
   * Tracks events for Search Page
   * @param {string} event Name of the event
   * @param {Object} data Additional parameters for the handler
   */
  track(event, data) {
    const utagData = {
      search_term: data.searchTerm,
      search_term_valid: data.hasResults,
      search_page: data.page,
      search_result_count: data.count,
      search_filter: {
        type: data.filters.type,
        date: data.filters.date,
      },
    };

    switch (event) {
      case this.events.userSearch:
        utagData.event = 'user search';
        break;

      default:
        break;
    }

    if (hasKey(utagData, 'event')) {
      Tracker.fireEvent(utagData);
    }
  }
}

export default new SearchTracker();
