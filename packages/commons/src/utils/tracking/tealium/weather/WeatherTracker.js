import Tracker from '../Tracker';

/**
 * Weather tracking events
 */
class WeatherTracker extends Tracker {
  /**
   * constructor method
   */
  constructor() {
    super({
      bannerClick: WeatherTracker.weatherBannerClick,
      alertClick: WeatherTracker.alertClick,
    });
  }

  /**
   * Tracks WeatherBanner click event
   * @param {Object} banner Content to track
   */
  static weatherBannerClick(banner) {
    const eventType = 'content_click';
    const trackingData = {};
    if (banner.cardId) {
      trackingData.card_id = banner.cardId;
    }
    const eventData = {
      event: eventType,
      ...trackingData,
      card_type: banner.cardType,
      card_title: banner.cardTitle,
      widget_pos: banner.widgetPos,
      widget_title: banner.widgetTitle,
      widget_type: banner.widgetType,
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks WeatherBanner click event
   * @param {Object} alert alert data to track.
   */
  static alertClick(alert) {
    const eventType = 'engagement_click';
    const eventData = {
      event: eventType,
      event_action: 'locales - tiempo alertas - expand alert',
      event_meta: `${alert.type} - ${alert.market} - ${alert.county}`,
    };

    Tracker.fireEvent(eventData);
  }
}

export default new WeatherTracker();
