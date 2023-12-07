import Tracker from '../Tracker';
import CastingTracker from './CastingTracker';

describe('CastingTracker', () => {
  let trackingSpy;

  beforeEach(() => {
    trackingSpy = jest.spyOn(Tracker, 'fireEvent');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should track click events', () => {
    CastingTracker.track(
      CastingTracker.events.castingClick
    );
    expect(trackingSpy).toHaveBeenCalledWith({
      casting_source: 'web',
      event: 'cast_click_player',
    });
  });

  it('should use custom target event', () => {
    CastingTracker.track(
      CastingTracker.events.castingClick,
      'play'
    );
    expect(trackingSpy).toHaveBeenCalledWith({
      casting_source: 'web',
      event: 'cast_click_play',
    });
  });

  it('should use custom tracking data', () => {
    CastingTracker.track(
      CastingTracker.events.castingClick,
      'play',
      { casting_device_type: 'airPlay' }
    );
    expect(trackingSpy).toHaveBeenCalledWith({
      casting_source: 'web',
      event: 'cast_click_play',
      casting_device_type: 'airPlay',
    });
  });

  it('should track explainer click events', () => {
    CastingTracker.track(
      CastingTracker.events.explainerClick
    );
    expect(trackingSpy).toHaveBeenCalledWith({
      event: 'casting_explainer_display',
    });
  });

  it('should use custom target event', () => {
    CastingTracker.track(
      CastingTracker.events.explainerClick,
      'entendido'
    );
    expect(trackingSpy).toHaveBeenCalledWith({
      event: 'casting_explainer_entendido',
    });
  });

  it('should track playback event', () => {
    CastingTracker.track(
      CastingTracker.events.playbackClick
    );
    expect(trackingSpy).toHaveBeenCalledWith({
      casting_source: 'web',
      event: 'video_pause',
    });
  });

  it('should track playback event with custom target', () => {
    CastingTracker.track(
      CastingTracker.events.playbackClick,
      'resume'
    );
    expect(trackingSpy).toHaveBeenCalledWith({
      casting_source: 'web',
      event: 'video_resume',
    });
  });

  it('should track connected event', () => {
    CastingTracker.track(
      CastingTracker.events.connected,
      { device_type: 'airPlay', isCastingEnabled: true },
    );
    expect(trackingSpy).toHaveBeenCalledWith({
      casting_source: 'web',
      event: 'cast_connected',
      device_type: 'airPlay',
    });
  });

  it('should track discconnected event', () => {
    CastingTracker.track(
      CastingTracker.events.connected,
      { device_type: 'airPlay', isCastingEnabled: false },
    );
    expect(trackingSpy).toHaveBeenCalledWith({
      casting_source: 'web',
      event: 'cast_disconnected',
      device_type: 'airPlay',
    });
  });
});
