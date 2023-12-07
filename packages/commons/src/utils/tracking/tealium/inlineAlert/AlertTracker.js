import Tracker from '../Tracker';

/**
 * Tracks alert event
 */
class AlertTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      alert: AlertTracker.track,
    });
  }

  /**
   * Tracks events for Alerts
   * @param {Object} data Additional parameters for the handler
   */
  static track(data) {
    const {
      title, alertType, uid, action,
    } = data;
    if (title && alertType && uid && action) {
      const utagData = {
        event: 'engagement_alerts',
        event_action: `inline_alert_${action}`,
        alert_title: title,
        alert_type: alertType,
        alert_id: uid,
      };
      Tracker.fireEvent(utagData);
    }
  }
}

export default new AlertTracker();
