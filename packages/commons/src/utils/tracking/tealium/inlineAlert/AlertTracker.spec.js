import gtmManager from '../../googleTagManager/gtmManager';
import AlertTracker from './AlertTracker';
import Tracker from '../Tracker';

describe('AlertTracker', () => {
  it('should not track event if no uid is provided', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    AlertTracker.track(AlertTracker.events.alert, {});
    expect(fireEventSpy).not.toHaveBeenCalled();
  });

  it('should handle the engagement_alerts event', () => {
    const dataLayer = gtmManager.getDataLayer();
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    AlertTracker.track(AlertTracker.events.alert, {
      action: 'close', alertType: 'breaking', title: 'test', uid: '00',
    });
    expect(fireEventSpy).toHaveBeenCalled();
    expect(dataLayer[dataLayer.length - 1]).toEqual({
      event: 'engagement_alerts',
      alert_type: 'breaking',
      event_action: 'inline_alert_close',
      alert_title: 'test',
      alert_id: '00',
    });
  });
});
