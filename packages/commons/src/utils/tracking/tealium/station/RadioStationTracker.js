import Tracker from '../Tracker';
import { hasKey } from '../../../helpers';

const RADIO_STATION_PREFIX = 'radiostation.';
/**
 * Tracks Radio Station events
 */
class RadioStationTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      heartbeat: `${RADIO_STATION_PREFIX}radio_heartbeat`,
      launchRadioPlayer: `${RADIO_STATION_PREFIX}launchRadioPlayer`,
      streamStart: `${RADIO_STATION_PREFIX}stream_start`,
      streamResume: `${RADIO_STATION_PREFIX}stream_resume`,
      streamPause: `${RADIO_STATION_PREFIX}stream_pause`,
      anchorClose: `${RADIO_STATION_PREFIX}radio_click_anchor_close`,
      fullScreenOpen: `${RADIO_STATION_PREFIX}radio_click_fullscreen`,
      fullScreenClose: `${RADIO_STATION_PREFIX}radio_click_exit_fullscreen`,
    });
  }

  /**
   * Tracks events for radio stations
   * @param {string} event Name of the event
   * @param {Object} data Additional parameters for the handler
   */
  track(event, data) {
    const utagData = {};
    switch (event) {
      case this.events.launchRadioPlayer:
        utagData.event = 'engagement';
        utagData.promo_type = 'link';
        utagData.promo_loc = window.location.href;
        utagData.promo_name = `${data.type}_${data.title.replace(/\s/g, '_')}`;
        break;
      case this.events.streamStart:
      case this.events.streamResume:
      case this.events.streamPause:
      case this.events.anchorClose:
      case this.events.fullScreenOpen:
      case this.events.fullScreenClose:
      case this.events.heartbeat:
        Object.assign(utagData, data.analyticsData || {});
        utagData.event = event.replace(RADIO_STATION_PREFIX, '');
        break;
      default:
        break;
    }

    if (hasKey(utagData, 'event')) {
      Tracker.fireEvent(utagData);
    }
  }
}

export default new RadioStationTracker();
