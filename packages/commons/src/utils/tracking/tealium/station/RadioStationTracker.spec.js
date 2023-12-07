import gtmManager from '../../googleTagManager/gtmManager';
import RadioStationTracker from './RadioStationTracker';

describe('RadioStationTracker', () => {
  const dataLayer = gtmManager.getDataLayer();
  beforeEach(() => {
    gtmManager.clearDataLayer();
  });

  it('should handle the launchRadioPlayer event', () => {
    const data = {
      title: 'K-Love 107.5',
      type: 'toolbar',
    };
    RadioStationTracker.track(RadioStationTracker.events.launchRadioPlayer, data);
    expect(dataLayer[0].promo_name).toBe('toolbar_K-Love_107.5');
  });

  it('should track when the user starts the stream', () => {
    RadioStationTracker.track(RadioStationTracker.events.streamStart, {});
    expect(dataLayer[0]).toMatchObject({
      event: 'stream_start',
    });
  });

  it('should track when the user closes the player', () => {
    RadioStationTracker.track(RadioStationTracker.events.anchorClose, {});
    expect(dataLayer[0]).toMatchObject({
      event: 'radio_click_anchor_close',
    });
  });

  it('should track when the user open the fullscreen player', () => {
    RadioStationTracker.track(RadioStationTracker.events.fullScreenOpen, {});
    expect(dataLayer[0]).toMatchObject({
      event: 'radio_click_fullscreen',
    });
  });

  it('should track when the user exit the fullscreen player', () => {
    RadioStationTracker.track(RadioStationTracker.events.fullScreenClose, {});
    expect(dataLayer[0]).toMatchObject({
      event: 'radio_click_exit_fullscreen',
    });
  });

  it('should ignore unknown events', () => {
    const { length } = dataLayer;
    RadioStationTracker.track('random event');
    expect(dataLayer.length).toBe(length);
  });
});
