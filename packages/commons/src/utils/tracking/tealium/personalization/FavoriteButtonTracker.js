import Tracker from '../Tracker';
import { getPersonalizationCategory } from '../../trackingHelpers';

/**
 * Favorite button tracking events
 */
class FavoriteButtonTracker extends Tracker {
  /**
   * constructor method
   */
  constructor() {
    super({
      click: FavoriteButtonTracker.trackClick,
    });
  }

  /**
   * Track click event
   * @param {boolean} favorited - flag if button has been used to favorite or not an item
   * @param {string} id - id related to the item
   * @param {string} personalizationType - personalization type
   */
  static trackClick({ favorited, id, personalizationType }) {
    const eventType = favorited ? 'add' : 'remove';
    const eventData = {
      event: `favorite_${eventType}`,
      object_content_id: id,
      personalization_category: getPersonalizationCategory(personalizationType),
    };
    Tracker.fireEvent(eventData);
  }
}

export default new FavoriteButtonTracker();
