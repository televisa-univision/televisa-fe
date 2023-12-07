import Tracker from '../Tracker';
import NavigationTracker from './NavigationTracker';
import gtmManager from '../../googleTagManager/gtmManager';

let data;

jest.useFakeTimers();

beforeEach(() => {
  data = {
    event: 'engagement',
    promo_type: 'other',
    promo_loc: 'https://www.univision.com/',
  };
});

describe('NavigationTracker', () => {
  const dataLayer = gtmManager.getDataLayer();

  let fireEventSpy;

  beforeEach(() => {
    fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  it('ignores unknown events', () => {
    const { length } = dataLayer;
    NavigationTracker.track('unknown', data);
    expect(dataLayer.length).toBe(length);
  });

  it('tracks "link" events', () => {
    const utagData = {
      type: 'hamburger',
      device: 'desktop',
    };
    NavigationTracker.track(NavigationTracker.events.link, utagData);
    expect(dataLayer[dataLayer.length - 1].promo_name).toBe('H_Nav_Desktop');
  });

  it('tracks "link" events for calreply', () => {
    const utagData = {
      type: 'calreply',
      text: 'Notificame',
    };
    NavigationTracker.track(NavigationTracker.events.link, utagData);
    expect(dataLayer[dataLayer.length - 1].promo_name).toBe('CalReply-Notificame');
  });

  it('should track link events without device', () => {
    const utagData = {
      type: 'hamburger',
    };
    NavigationTracker.track(NavigationTracker.events.link, utagData);
    expect(dataLayer[dataLayer.length - 1].promo_name).toBe('H_Nav');
  });

  it('should track link events with callback', () => {
    const utagData = {
      type: 'global',
    };
    const callback = jest.fn();
    NavigationTracker.track(NavigationTracker.events.link, utagData, callback);
    jest.runOnlyPendingTimers();
    expect(dataLayer[dataLayer.length - 1].promo_name).toBe('G_Nav');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should track link events with text', () => {
    const utagData = {
      type: 'global',
      text: 'Mas',
    };
    NavigationTracker.track(NavigationTracker.events.link, utagData);
    expect(dataLayer[dataLayer.length - 1].promo_name).toBe('G_Nav_Mas');
  });

  it('should not track link events if there is not event', () => {
    const { length } = dataLayer;
    NavigationTracker.track(NavigationTracker.events.link, { type: null });
    expect(dataLayer.length).toBe(length);
  });

  it('should track click events with the correct utag format', () => {
    const utagData = {
      eventAction: 'my_event_action',
    };

    NavigationTracker.track(NavigationTracker.events.click, utagData);
    expect(fireEventSpy).toHaveBeenCalledTimes(1);
    expect(dataLayer[dataLayer.length - 1].event).toBe('navigation_click');
    expect(dataLayer[dataLayer.length - 1].event_action).toBe('my_event_action');
  });

  it('should not track click events if an event action is not provided', () => {
    const utagData = {
      eventAction: '',
    };

    NavigationTracker.track(NavigationTracker.events.click, utagData);
    expect(fireEventSpy).not.toHaveBeenCalled();
  });

  it('should track click events with a callback', () => {
    const utagData = {
      eventAction: 'my_event_action',
    };
    const callback = jest.fn();

    NavigationTracker.track(NavigationTracker.events.click, utagData, callback);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
