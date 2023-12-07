import WeatherTracker from './WeatherTracker';
import Tracker from '../Tracker';

const mockedBannerClickData = {
  event: 'content_click',
  card_id: '123',
  card_type: 'alertas cta with badge',
  card_title: 'alertas del tiempo',
  widget_pos: 0,
  widget_title: 'topnav-weather modal',
  widget_type: 'topnav-weather modal',
};

const mockedBannerClickDataWithoutId = {
  event: 'content_click',
  card_type: 'alertas cta with badge',
  card_title: 'alertas del tiempo',
  widget_pos: 0,
  widget_title: 'topnav-weather modal',
  widget_type: 'topnav-weather modal',
};

const mockedAlertClickData = {
  event: 'engagement_click',
  event_action: 'locales - tiempo alertas - expand alert',
  event_meta: 'Severe Hurricane - New York - Mineola',
};

describe('WeatherTracker', () => {
  let fireEventSpy;

  beforeEach(() => {
    fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle the weatherBannerClick event', () => {
    WeatherTracker.track(
      WeatherTracker.events.bannerClick,
      {
        cardId: '123',
        cardType: 'alertas cta with badge',
        cardTitle: 'alertas del tiempo',
        widgetPos: 0,
        widgetTitle: 'topnav-weather modal',
        widgetType: 'topnav-weather modal',
      },
    );
    expect(fireEventSpy).toHaveBeenCalledWith(expect.objectContaining(mockedBannerClickData));
  });

  it('should handle the weatherBannerClick event without Id', () => {
    WeatherTracker.track(
      WeatherTracker.events.bannerClick,
      {
        cardType: 'alertas cta with badge',
        cardTitle: 'alertas del tiempo',
        widgetPos: 0,
        widgetTitle: 'topnav-weather modal',
        widgetType: 'topnav-weather modal',
      },
    );
    expect(fireEventSpy)
      .toHaveBeenCalledWith(expect.objectContaining(mockedBannerClickDataWithoutId));
  });

  it('should handle the alertClick event', () => {
    WeatherTracker.track(
      WeatherTracker.events.alertClick,
      {
        type: 'Severe Hurricane',
        market: 'New York',
        county: 'Mineola',
      }
    );
    expect(fireEventSpy).toHaveBeenCalledWith(expect.objectContaining(mockedAlertClickData));
  });
});
