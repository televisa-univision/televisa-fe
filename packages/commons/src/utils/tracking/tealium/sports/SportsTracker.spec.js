import * as storeHelpers from '../../../../store/storeHelpers';
import gtmManager from '../../googleTagManager/gtmManager';
import SportsTracker from './SportsTracker';
import Tracker from '../Tracker';

const dataLayer = gtmManager.getDataLayer();
const page = {
  data: {
    tracking: {
      analytics: {
        permalink: 'https://www.univision.com/deportes/futbol',
        content_id: '1',
      },
    },
  },
};

jest.useFakeTimers();

describe('SoccerMatchTracker', () => {
  const constantDate = new Date('2018-01-29T21:15:00Z');
  const RealDate = Date;
  beforeAll(() => {
    storeHelpers.getPageData = jest.fn(() => page);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    jest.clearAllTimers();
    global.Date = RealDate;
  });
  it('should handle ad view tracking event', () => {
    const evt = {
      event: 'virtualpv_load',
      title: 'veracruz vs leon',
    };
    SportsTracker.track(SportsTracker.events.ad, { title: 'veracruz vs leon', position: 2 });
    expect(dataLayer[dataLayer.length - 1]).toEqual(evt);
  });

  it('should handle ad view tracking event with default values', () => {
    const evt = {
      event: 'virtualpv_load',
      title: '',
    };
    SportsTracker.track(SportsTracker.events.ad);
    expect(dataLayer[dataLayer.length - 1]).toEqual(evt);
  });

  it('should handle page view tracking event', () => {
    const evt = {
      event: 'view_screen',
      permalink: 'https://www.univision.com/deportes/futbol/liga-mx/resultados',
      content_id: '2',
    };
    SportsTracker.track(SportsTracker.events.pageView, evt);
    expect(dataLayer[dataLayer.length - 1]).toEqual(evt);
  });

  it('should overwrite all tags value if present', () => {
    const evt = {
      event: 'view_screen',
      permalink: 'https://www.univision.com/deportes/futbol/liga-mx/resultados',
      content_id: '2',
      all_tags: ['liga mx', 'week'],
    };
    SportsTracker.track(SportsTracker.events.pageView, evt, {
      weekOverwrite: 'Jornada 14',
    });
    expect(dataLayer[dataLayer.length - 1]).toEqual({
      event: 'view_screen',
      permalink: 'https://www.univision.com/deportes/futbol/liga-mx/resultados',
      content_id: '2',
      all_tags: ['liga mx', 'Jornada 14'],
    });
  });

  it('should not track event if no mvpd is provided', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SportsTracker.track(SportsTracker.events.mvpd, {});
    expect(fireEventSpy).not.toHaveBeenCalled();
  });

  it('should track mvpd events', () => {
    const dataLayer2 = gtmManager.getDataLayer();
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SportsTracker.track(SportsTracker.events.mvpd, {
      mvpdProvider: 'DISH', event: 'mvpd_login_tudnxtra_contactform-filled',
    });
    expect(fireEventSpy).toHaveBeenCalled();
    expect(dataLayer2[dataLayer2.length - 1]).toEqual({
      event: 'mvpd_login_tudnxtra_contactform-filled',
      mvpd_provider: 'DISH',
    });
    fireEventSpy.mockRestore();
  });

  it('should not track score cell event if no card is provided', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SportsTracker.track(SportsTracker.events.match, {});
    expect(fireEventSpy).not.toHaveBeenCalled();
    fireEventSpy.mockRestore();
  });

  it('should track score cell matches', () => {
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    const dataLayer2 = gtmManager.getDataLayer();
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SportsTracker.track(SportsTracker.events.match, {
      data: { key: '1', eventName: 'event name', status: 'pre' },
    });
    expect(fireEventSpy).toHaveBeenCalled();
    expect(dataLayer2[dataLayer2.length - 1]).toEqual({
      card_id: '1',
      card_title: 'event name',
      card_type: 'scorecells-pre',
      event: 'content_click',
      widget_pos: '0',
      widget_title: 'scorecells-2018-Ene-29',
      widget_type: 'scorecells widget',
    });
    fireEventSpy.mockRestore();
  });

  it('should track match events with callback', () => {
    const callback = jest.fn();
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SportsTracker.track(SportsTracker.events.match, {
      data: {
        key: '1', eventName: 'event name', status: 'pre', type: 'brackets',
      },
    }, callback);
    jest.runOnlyPendingTimers();
    expect(fireEventSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(callback).toHaveBeenCalledTimes(1);
    fireEventSpy.mockRestore();
  });

  it('should track momios', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SportsTracker.track(SportsTracker.events.momios, {
      key: '1',
      title: 'title',
    });
    expect(fireEventSpy).toHaveBeenCalled();
  });

  it('should not track momios with invalid data', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SportsTracker.track(SportsTracker.events.momios, {});
    expect(fireEventSpy).not.toHaveBeenCalled();
  });

  it('should track caliente', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SportsTracker.track(SportsTracker.events.caliente, {
      key: '1',
      title: 'title',
    });
    expect(fireEventSpy).toHaveBeenCalled();
  });

  it('should not track caliente with invalid data', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SportsTracker.track(SportsTracker.events.caliente, {});
    expect(fireEventSpy).not.toHaveBeenCalled();
  });
});
