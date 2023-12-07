import setPageData from '../../../../store/actions/page-actions';
import Store from '../../../../store/store';
import Tracker from '../Tracker';
import WidgetTracker from './WidgetTracker';

jest.useFakeTimers();

describe('WidgetTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllTimers();
  });
  it('should ignore events if there is not a widget context', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    WidgetTracker.track(WidgetTracker.events.click, {});
    expect(fireEventSpy).not.toBeCalled();
  });
  it('should track click events', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    WidgetTracker.track(WidgetTracker.events.click, { widgetContext: { type: 'test' }, target: 'testing', extraData: { test: true } });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
    WidgetTracker.track(WidgetTracker.events.click, { widgetContext: { type: 'test' }, target: 'content' });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
    WidgetTracker.track(WidgetTracker.events.click, { widgetContext: { type: 'test', widgetType: 'GridWidget' }, target: 'content' });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
    WidgetTracker.track(WidgetTracker.events.click, { widgetContext: { type: 'test', widgetType: 'SingleWidget', name: 'all - countdown - timer' }, target: 'content' });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
    WidgetTracker.track(WidgetTracker.events.click, { widgetContext: { type: 'test', widgetType: 'DigitalChannelEPG', name: 'all - countdown - timer' }, target: 'content' });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
    Store.dispatch(setPageData({ data: { type: 'article' } }));
    WidgetTracker.track(WidgetTracker.events.click, { widgetContext: { type: 'test' }, target: 'testing' });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should track engagement events', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    WidgetTracker.track(WidgetTracker.events.engagement, { target: 'testing' });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should track engagement with new event name', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    WidgetTracker.track(WidgetTracker.events.engagement, {
      eventName: 'engagement_click',
    });
    expect(fireEventSpy).toHaveBeenLastCalledWith({
      event: 'engagement',
      event_action: 'engagement_click',
    });
  });
  it('should track job search engagement', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    WidgetTracker.track(WidgetTracker.events.jobSearchEngagement, {
      view: 'view',
      industry: 'HealthCare',
      title: 'Nurse',
    });
    expect(fireEventSpy).toHaveBeenLastCalledWith({
      event: 'engagement_trabajos_view',
      engagement_details: 'HealthCare - Nurse',
    });
  });
  it('should track engagement with legacy event name', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    WidgetTracker.track(WidgetTracker.events.engagement, {
      type: 'banner',
      target: 'testing',
      eventName: 'engagement_click',
    });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event_action: 'engagement_click',
      promo_type: 'banner',
    }));
  });
  it('should track engagement events with callback', () => {
    const callback = jest.fn();
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    WidgetTracker.track(WidgetTracker.events.engagement, { target: 'testing' }, callback);
    jest.runOnlyPendingTimers();
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('should track smartbanner event', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    const uri = 'https://www.univision.com/local/san-francisco-kdtv';
    Store.dispatch(setPageData({ data: { type: 'section', uri } }));
    WidgetTracker.track(WidgetTracker.events.smartbanner, {
      event_label: uri,
      event_action: 'smart_banner_local_kdtv',
    });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should track smartbanner event with callback', () => {
    const callback = jest.fn();
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    const uri = 'https://www.univision.com/local/san-francisco-kdtv';
    Store.dispatch(setPageData({ data: { type: 'section', uri } }));
    WidgetTracker.track(WidgetTracker.events.smartbanner, {
      event_label: uri,
      event_action: 'smart_banner_local_kdtv',
    }, callback);
    jest.runOnlyPendingTimers();
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('should track the topQuickLinks event', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    WidgetTracker.track(WidgetTracker.events.topQuickLinks, {
      title: 'test',
    });
    expect(fireEventSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        event: 'navigation_click',
        event_action: 'topnav-header-quicklinks',
        engagement_details: 'test',
      })
    );
  });
  it('should track click events with event_label', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    WidgetTracker.track(WidgetTracker.events.click, {
      widgetContext: { type: 'test' },
      target: 'testing',
      extraData: { test: true },
      eventLabel: 'event_label_test',
    });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(fireEventSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        event_label: 'event_label_test',
      })
    );
  });
  it('should track click events without event_label', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    WidgetTracker.track(WidgetTracker.events.click, { widgetContext: { type: 'test' }, target: 'testing', extraData: { test: true } });
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should track the trackHelpCenterEngagement event', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    const data = {};
    WidgetTracker.track(WidgetTracker.events.helpCenterEngagement, data);
    expect(fireEventSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        event: 'content_click',
      })
    );
  });
});
