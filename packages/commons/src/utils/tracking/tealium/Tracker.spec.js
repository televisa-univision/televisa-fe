import gtmManager from '../googleTagManager/gtmManager';
import tealiumManager from './tealiumManager';
import features from '../../../config/features';
import Tracker from './Tracker';

describe('Tracker', () => {
  it('ignores unknown events', () => {
    const tracker = new Tracker({
      test: jest.fn()
    });
    tracker.track(null, {});
    expect(tracker.events.test).not.toBeCalled();
  });

  it('tracks valid events', () => {
    const tracker = new Tracker({
      test: jest.fn()
    });
    tracker.track(tracker.events.test, {});
    expect(tracker.events.test).toBeCalled();
  });

  it('tracks event using tealium and GTM', () => {
    features.tracking.gtm = true;
    features.tracking.tealium = true;

    spyOn(gtmManager, 'triggerEvent');
    spyOn(tealiumManager, 'triggerEvent');

    Tracker.fireEvent({ event: 'test' });

    expect(gtmManager.triggerEvent).toBeCalled();
    expect(tealiumManager.triggerEvent).toBeCalled();
  });

  it('should call the clearDataLayer method when GTM is enabled', () => {
    features.tracking.gtm = true;

    spyOn(gtmManager, 'clearDataLayer');

    Tracker.clearData();

    expect(gtmManager.clearDataLayer).toBeCalled();
  });

  it('should not call the clearDataLayer method when GTM is disabled', () => {
    features.tracking.gtm = false;

    spyOn(gtmManager, 'clearDataLayer');

    Tracker.clearData();

    expect(gtmManager.clearDataLayer).not.toBeCalled();
  });

  it('tracks page views using tealium and GTM', () => {
    features.tracking.gtm = true;
    features.tracking.tealium = true;

    spyOn(gtmManager, 'pageView');
    spyOn(tealiumManager, 'pageView');

    Tracker.pageView();

    expect(gtmManager.pageView).toBeCalled();
    expect(tealiumManager.pageView).toBeCalled();
  });

  it('should not track event using tealium and GTM if disabled', () => {
    spyOn(gtmManager, 'triggerEvent');
    spyOn(tealiumManager, 'triggerEvent');
    spyOn(gtmManager, 'pageView');
    spyOn(tealiumManager, 'pageView');

    features.tracking.gtm = false;
    features.tracking.tealium = false;

    Tracker.fireEvent({ event: 'test' });
    Tracker.pageView();

    expect(gtmManager.triggerEvent).not.toBeCalled();
    expect(tealiumManager.triggerEvent).not.toBeCalled();

    expect(gtmManager.pageView).not.toBeCalled();
    expect(tealiumManager.pageView).not.toBeCalled();
  });

  it('should update data when GTM is enabled', () => {
    spyOn(gtmManager, 'updateDataLayer');

    features.tracking.gtm = true;

    Tracker.updateData({ data: true });
    expect(gtmManager.updateDataLayer).toBeCalled();
  });

  it('should not update data when GTM is disabled', () => {
    spyOn(gtmManager, 'updateDataLayer');

    features.tracking.gtm = false;

    Tracker.updateData({ data: true });
    expect(gtmManager.updateDataLayer).not.toBeCalled();
  });
});
