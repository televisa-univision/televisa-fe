import Tracker from '../Tracker';
import { hasKey, isValidFunction, deburrToLowerCase } from '../../../helpers';

/**
 * Tracks Navigation events
 */
class NavigationTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      link: NavigationTracker.trackLink,
      click: NavigationTracker.trackClick,
    });
  }

  /**
   * Tracks link.
   * @param {Object} data Contextual data
   * @param {Function} callback The callback when the event is sent
   */
  static trackLink(data, callback) {
    const globalString = 'G_Nav';
    const hamburgerString = 'H_Nav';

    const utagData = {
      event: 'engagement',
      promo_type: 'other',
      promo_loc: window.location.href,
    };

    switch (data.type) {
      case 'calreply':
        utagData.promo_name = `CalReply-${data.text}`;
        break;
      case 'global':
        utagData.promo_name = data.text ? `${globalString}_${data.text}` : globalString;
        break;
      case 'hamburger':
        if (data.device) {
          const deviceCapitalized = data.device.charAt(0).toUpperCase() + data.device.slice(1);
          utagData.promo_name = `${hamburgerString}_${deviceCapitalized}`;
        } else {
          utagData.promo_name = hamburgerString;
        }
        break;
      default:
        utagData.promo_name = '';
        break;
    }

    if (hasKey(utagData, 'promo_name')) {
      Tracker.fireEvent(utagData);
    }

    if (isValidFunction(callback)) {
      // Wait for the event is sent to fire the callback
      setTimeout(() => {
        callback();
      }, 500);
    }
  }

  /**
   * Tracks clicks that occur inside the hamburger menu, topnav, and subnav components.
   * The event action is a dash separated string, where each value between the dashes is a section
   * level of the navigation. Example: hamburger-tv shows-el gordo y la flaca.
   * @param {Object} data Contextual data
   * @param {Function} callback The callback when the event is sent
   */
  static trackClick(data, callback) {
    const { eventAction } = data;

    const utagData = {
      event: 'navigation_click',
      event_action: deburrToLowerCase(eventAction),
    };

    if (utagData.event_action) {
      Tracker.fireEvent(utagData);
    }

    if (isValidFunction(callback)) {
      callback();
    }
  }
}

export default new NavigationTracker();
