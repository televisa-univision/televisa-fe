import Tracker from '../Tracker';
import { hasKey } from '../../../helpers';

const POLL_PREFIX = 'poll.';
/**
 * Tracks polls events
 */
class PollTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      submission: `${POLL_PREFIX}submission`,
    });
  }

  /**
   * Tracks events for polls
   * @param {string} event Name of the event
   * @param {Object} data Additional parameters for the handler
   */
  track(event, data) {
    const utagData = {};
    switch (event) {
      case this.events.submission:
        utagData.event = 'poll submission';
        utagData.poll_type = data.type;
        break;
      default:
        break;
    }

    if (hasKey(utagData, 'event')) {
      Tracker.fireEvent(utagData);
    }
  }
}

export default new PollTracker();
