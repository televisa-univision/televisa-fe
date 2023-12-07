import Tracker from '../Tracker';
import { isValidFunction, deburrToLowerCase } from '../../../helpers';

/**
 * Tracks social events
 */
class SocialTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      share: SocialTracker.trackSharing,
    });
  }

  /**
   * Tracks events for all share actions that happen on ShareBars
   * @param {Object} data Contextual data
   * @param {Function} callback The callback when the event is sent
   */
  static trackSharing(data = {}, callback) {
    const {
      name: socialNetwork,
      uid: contentId,
      title,
      type,
    } = data;

    if (socialNetwork && contentId) {
      const utagData = {
        event: 'social_share',
        event_action: socialNetwork,
        share_content_id: contentId,
        share_content_type: type,
        share_content_title: deburrToLowerCase(title),
      };

      Tracker.fireEvent(utagData);
    }

    if (isValidFunction(callback)) {
      callback();
    }
  }
}

export default new SocialTracker();
