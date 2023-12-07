import Tracker from '../Tracker';

/**
 * Tracks casting events
 */
class CastingTracker extends Tracker {
  /**
   * Sets the events for this tracker
   */
  constructor() {
    super({
      castingClick: CastingTracker.trackClick,
      connected: CastingTracker.trackConnected,
      explainerClick: CastingTracker.trackExplainer,
      playbackClick: CastingTracker.trackPlayback,
    });
  }

  /**
   * Tracks casting control clicks
   * @param {string} target - event target
   * @param {Object} data - tracking data
   */
  static trackClick(target, data) {
    const event = target ? `cast_click_${target}` : 'cast_click_player';
    const trackData = {
      event,
      casting_source: 'web',
      ...data,
    };

    Tracker.fireEvent(trackData);
  }

  /**
   * Tracks casting explainer clicks
   * @param {string} target - event target
   * @param {Object} data - tracking data
   */
  static trackExplainer(target, data) {
    const event = `casting_explainer_${target ?? 'display'}`;
    const trackData = {
      event,
      ...data,
    };

    Tracker.fireEvent(trackData);
  }

  /**
   * Tracks casting playback events
   * @param {string} target - event target
   * @param {*} data - tracking data
   */
  static trackPlayback(target, data) {
    const event = `video_${target ?? 'pause'}`;
    const trackData = {
      event,
      casting_source: 'web',
      ...data,
    };

    Tracker.fireEvent(trackData);
  }

  /**
   * Tracks cast connected event
   * @param {Object} data - tracking data
   */
  static trackConnected(data) {
    const { isCastingEnabled, ...rest } = data;
    const trackData = {
      event: isCastingEnabled ? 'cast_connected' : 'cast_disconnected',
      casting_source: 'web',
      ...rest,
    };

    Tracker.fireEvent(trackData);
  }
}

export default new CastingTracker();
