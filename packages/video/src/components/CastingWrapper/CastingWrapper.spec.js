import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as castingSelectors from '@univision/fe-commons/dist/store/selectors/castingSelectors';
import * as videoHelpers from '@univision/fe-commons/dist/utils/video';
import CastingTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/CastingTracker';

import { controlNames } from '../Casting/CastingControls/PlaybackControls/PlaybackControls.config';
import castingTypes from '../Casting/CastingControls/CastingControls.config';
import CastingWrapper, {
  TIMER_REFRESH_INTERVAL,
  VIDEO_PLAYING_STATUS,
} from '.';

const FMG = {
  on: jest.fn((type, cb) => cb({})),
  getJWPlayerInstance: jest.fn().mockReturnValue(false),
};

const playerInstanceMock = {
  getDuration: jest.fn().mockReturnValue(0),
  getMute: jest.fn().mockReturnValue(false),
  getPosition: jest.fn().mockReturnValue(0),
  getState: jest.fn().mockReturnValue('stop'),
  play: jest.fn(),
  pause: jest.fn(),
  seek: jest.fn(),
  setMute: jest.fn(),
  setVolume: jest.fn(),
  stopCasting: jest.fn(),
  getPlaylist: jest.fn().mockReturnValue([]),
  getPlaylistItem: jest.fn().mockReturnValue({}),
  getCaptionsList: jest.fn().mockReturnValue([]),
  getCurrentCaptions: jest.fn().mockReturnValue(0),
};

const CASTING_WRAPPER_SELECTOR = 'CastingControls';

const Store = configureStore();

describe('CastingWrapper component', () => {
  let castingEnabledSelectorSpy;
  let castingTrackerSpy;

  beforeEach(() => {
    global.window.FMG = FMG;
    castingEnabledSelectorSpy = jest.spyOn(castingSelectors, 'castingEnabledSelector')
      .mockReturnValue(false);
    castingTrackerSpy = jest.spyOn(CastingTracker, 'track');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    ), div);
  });

  it('should render component when casting is enabled', () => {
    castingEnabledSelectorSpy.mockReturnValue(true);
    jest.spyOn(castingSelectors, 'castingPlatformSelector').mockReturnValue('airPlay');
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find(CASTING_WRAPPER_SELECTOR)).toHaveLength(1);
    expect(castingEnabledSelectorSpy).toHaveBeenCalled();
    expect(castingTrackerSpy).toHaveBeenCalledWith(
      CastingTracker.events.connected,
      {
        casting_device_type: 'airPlay',
        isCastingEnabled: true,
      }
    );
  });

  it('should not render component when casting is enabled but hide is true', () => {
    castingEnabledSelectorSpy.mockReturnValue(true);
    jest.spyOn(castingSelectors, 'castingVideoDataSelector').mockReturnValue({
      hideCastingBar: false,
    });
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find(CASTING_WRAPPER_SELECTOR).props().onCasting).toBe(true);
    jest.spyOn(castingSelectors, 'castingVideoDataSelector').mockReturnValue({
      hideCastingBar: false,
    });
  });

  it('should not render component when casting is enabled but hide is true', () => {
    castingEnabledSelectorSpy.mockReturnValue(true);
    jest.spyOn(castingSelectors, 'castingVideoDataSelector').mockReturnValue({
      hideCastingBar: true,
    });
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find(CASTING_WRAPPER_SELECTOR).props().onCasting).toBe(false);
    jest.spyOn(castingSelectors, 'castingVideoDataSelector').mockReturnValue({
      hideCastingBar: false,
    });
  });
});

describe('CastingWrapper - video progress', () => {
  let castingEnabledSelectorSpy;
  let playerInstanceSpy;

  beforeEach(() => {
    jest.useFakeTimers();
    global.window.FMG = FMG;
    castingEnabledSelectorSpy = jest.spyOn(castingSelectors, 'castingEnabledSelector')
      .mockReturnValue(true);
    playerInstanceSpy = jest.spyOn(videoHelpers, 'getPlayerInstance')
      .mockReturnValue(playerInstanceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should set video position', () => {
    const jwplayerMock = {
      ...playerInstanceMock,
      getPosition: jest.fn().mockReturnValue(1),
    };
    playerInstanceSpy.mockReturnValue(jwplayerMock);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    act(() => {
      jest.advanceTimersByTime(TIMER_REFRESH_INTERVAL);
    });
    wrapper.update();
    expect(wrapper.find(CASTING_WRAPPER_SELECTOR)).toHaveLength(1);
    expect(castingEnabledSelectorSpy).toHaveBeenCalled();
  });

  it('should reset video position when player instance is not available', () => {
    playerInstanceSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    act(() => {
      jest.advanceTimersByTime(TIMER_REFRESH_INTERVAL);
    });
    wrapper.update();
    expect(wrapper.find(CASTING_WRAPPER_SELECTOR)).toHaveLength(1);
    expect(playerInstanceSpy).toHaveBeenCalled();
  });
});

describe('CastingWrapper - video playback controls', () => {
  let playerInstanceSpy;
  let castingTrackerSpy;

  beforeEach(() => {
    global.window.FMG = FMG;
    jest.spyOn(castingSelectors, 'castingEnabledSelector')
      .mockReturnValue(true);
    jest.spyOn(castingSelectors, 'castingVideoDataSelector').mockReturnValue({
      castingPlatform: 'airPlay',
    });
    playerInstanceSpy = jest.spyOn(videoHelpers, 'getPlayerInstance')
      .mockReturnValue(playerInstanceMock);
    castingTrackerSpy = jest.spyOn(CastingTracker, 'track');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the play method when video is paused', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find('CastingControlsButton').first().prop('defaultName')).toBe(controlNames.PLAY);
    wrapper.find('CastingControlsButton').first().simulate('click');
    expect(playerInstanceMock.play).toHaveBeenCalled();
  });

  it('should call the pause method when video is playing', () => {
    const instanceMock = {
      ...playerInstanceMock,
      getState: jest.fn().mockReturnValue(VIDEO_PLAYING_STATUS),
    };
    playerInstanceSpy.mockReturnValue(instanceMock);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    wrapper.find('CastingControlsButton').first().simulate('click');
    expect(playerInstanceMock.pause).toHaveBeenCalled();
  });

  it('should call backwards method', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    wrapper.find('CastingFixedButton').first().simulate('click');
    expect(playerInstanceMock.seek).toHaveBeenCalled();
    expect(castingTrackerSpy).toHaveBeenCalledWith(
      CastingTracker.events.playbackClick,
      'click_backward10',
      {
        casting_device_type: 'airPlay',
      }
    );
  });

  it('should call set mute method', () => {
    playerInstanceSpy
      .mockReturnValue({
        ...playerInstanceMock,
        getMute: jest.fn()
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true),
      });
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    wrapper.find('CastingControlsButton').at(1).simulate('click');
    expect(playerInstanceMock.setVolume).toHaveBeenCalledWith(0);
  });

  it('should call set unmute method', () => {
    playerInstanceSpy
      .mockReturnValue({
        ...playerInstanceMock,
        getMute: jest.fn()
          .mockReturnValueOnce(true)
          .mockReturnValueOnce(false),
      });
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    wrapper.find('CastingControlsButton').at(1).simulate('click');
    expect(playerInstanceMock.setVolume).toHaveBeenCalledWith(100);
  });

  it('should call forward method', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    wrapper.find('CastingFixedButton').last().simulate('click');
    expect(playerInstanceMock.seek).toHaveBeenCalled();
    expect(castingTrackerSpy).toHaveBeenCalledWith(
      CastingTracker.events.playbackClick,
      'click_forward10',
      {
        casting_device_type: 'airPlay',
      }
    );
  });

  it('should call disableCasting method', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    act(() => {
      wrapper.find('CastingControlsButton').last().simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('CastingControls').first().prop('showDisableScreen')).toBe(true);
    act(() => {
      wrapper.find('DisableCastingScreen__Button').last().simulate('click');
    });
    wrapper.update();
    expect(playerInstanceMock.stopCasting).toHaveBeenCalled();
  });

  it('should open disable screen when disable button is clicked', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find('CastingControlsButton').last().prop('defaultName')).toBe('castConnected');
    act(() => {
      wrapper.find('CastingControlsButton').last().simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('CastingControls').first().prop('showDisableScreen')).toBe(true);
    act(() => {
      wrapper.find('DisableCastingScreen__Button').first().simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('CastingControls').first().prop('showDisableScreen')).toBe(false);
  });

  it('should call webkitShowPlaybackTargetPicker when platform is AirPlay ', () => {
    global.window.WebKitPlaybackTargetAvailabilityEvent = jest.fn();

    const picker = jest.fn();
    const newPlayerInstance = {
      ...playerInstanceMock,
      getContainer: () => ({
        querySelector: () => ({
          webkitShowPlaybackTargetPicker: picker,
        }),
      }),
    };
    playerInstanceSpy.mockReturnValue(newPlayerInstance);

    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );

    act(() => {
      wrapper.find('CastingControlsButton').last().simulate('click');
    });
    wrapper.update();
    expect(picker).toHaveBeenCalled();

    delete global.window.WebKitPlaybackTargetAvailabilityEvent;
  });

  it('should not error out callbacks if instance is invalid', () => {
    playerInstanceSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    wrapper.find('CastingControlsButton').first().simulate('click');
    wrapper.find('CastingFixedButton').first().simulate('click');
    wrapper.find('CastingFixedButton').last().simulate('click');
    wrapper.find('CastingControlsButton').at(1).simulate('click');
    expect(playerInstanceMock.play).toHaveBeenCalledTimes(0);
    expect(playerInstanceMock.pause).toHaveBeenCalledTimes(0);
    expect(playerInstanceMock.seek).toHaveBeenCalledTimes(0);
    expect(playerInstanceMock.setMute).toHaveBeenCalledTimes(0);
    act(() => {
      wrapper.find('CastingControlsButton').last().simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('CastingControls').first().prop('showDisableScreen')).toBe(true);
    act(() => {
      wrapper.find('DisableCastingScreen__Button').last().simulate('click');
    });
    expect(playerInstanceMock.stopCasting).toHaveBeenCalledTimes(0);
  });

  it('should set casting type to livestream but not playlist if only one item', () => {
    const instanceMock = {
      ...playerInstanceMock,
      getPlaylist: jest.fn().mockReturnValue([1]),
      getPlaylistItem: jest.fn().mockReturnValue({ isLivestream: true }),
    };
    playerInstanceSpy.mockReturnValue(instanceMock);
    jest.spyOn(castingSelectors, 'castingVideoDataSelector').mockReturnValue({
      isLiveStream: true,
    });
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find('CastingControls').first().prop('type')).toEqual('livestream');
    expect(wrapper.find('CastingControls').first().prop('isPlaylist')).toBe(false);
  });

  it('should set casting controls with is playlist and call', () => {
    const instanceMock = {
      ...playerInstanceMock,
      getPlaylist: jest.fn().mockReturnValue([1, 2]),
      getPlaylistItem: jest.fn().mockReturnValue({ isLivestream: false }),
      next: jest.fn(),
    };
    playerInstanceSpy.mockReturnValue(instanceMock);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    act(() => {
      wrapper.find('CastingControlsButton').last().simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('CastingControls').first().prop('isPlaylist')).toBe(true);
    wrapper.find('CastingFixedButton').last().simulate('click');
    expect(instanceMock.next).toHaveBeenCalled();
  });

  it('should not call next if it is not a valid function', () => {
    const instanceMock = {
      ...playerInstanceMock,
      getPlaylist: jest.fn().mockReturnValue([1, 2]),
      getPlaylistItem: jest.fn().mockReturnValue({ isLivestream: false }),
    };
    playerInstanceSpy.mockReturnValue(instanceMock);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    act(() => {
      wrapper.find('CastingControlsButton').last().simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('CastingControls').first().prop('isPlaylist')).toBe(true);
    wrapper.find('CastingFixedButton').last().simulate('click');
    expect(instanceMock.next).toBeUndefined();
  });
  it('should call activate captions when available', () => {
    const instanceMock = {
      ...playerInstanceMock,
      getPlaylist: jest.fn().mockReturnValue([1]),
      getPlaylistItem: jest.fn().mockReturnValue({ isLivestream: true }),
      getCaptionsList: jest.fn().mockReturnValue([1, 2]),
      getCurrentCaptions: jest.fn().mockReturnValue(0),
      setCurrentCaptions: jest.fn(),
    };
    playerInstanceSpy.mockReturnValue(instanceMock);
    jest.spyOn(castingSelectors, 'castingVideoDataSelector').mockReturnValue({
      isLiveStream: true,
    });
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find('CastingControls').first().prop('hasCaptions')).toBe(true);
    expect(wrapper.find('CastingControls').first().prop('type')).toEqual('livestream');
    expect(wrapper.find('CastingControls').first().prop('activeCaptions')).toBe(false);
    act(() => {
      wrapper.find('CastingFixedButton').last().simulate('click');
    });
    expect(instanceMock.setCurrentCaptions).toHaveBeenCalled();
    expect(castingTrackerSpy).toHaveBeenCalledWith(
      CastingTracker.events.castingClick,
      'cc',
      {
        casting_device_type: 'airPlay',
      }
    );
  });
  it('should set active captions when available', () => {
    const instanceMock = {
      ...playerInstanceMock,
      getPlaylist: jest.fn().mockReturnValue([1]),
      getPlaylistItem: jest.fn().mockReturnValue({ isLivestream: true }),
      getCaptionsList: jest.fn().mockReturnValue([1, 2]),
      getCurrentCaptions: jest.fn().mockReturnValue(1),
      setCurrentCaptions: jest.fn(),
    };
    jest.spyOn(castingSelectors, 'castingVideoDataSelector').mockReturnValue({
      isLiveStream: true,
    });
    playerInstanceSpy.mockReturnValue(instanceMock);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find('CastingControls').first().prop('hasCaptions')).toBe(true);
    expect(wrapper.find('CastingControls').first().prop('type')).toEqual('livestream');
    expect(wrapper.find('CastingControls').first().prop('activeCaptions')).toBe(true);
    act(() => {
      wrapper.find('CastingFixedButton').last().simulate('click');
    });
    expect(instanceMock.setCurrentCaptions).toHaveBeenCalled();
    expect(castingTrackerSpy).toHaveBeenCalledWith(
      CastingTracker.events.castingClick,
      'cc',
      {
        casting_device_type: 'airPlay',
      }
    );
  });
  it('should not error out caption callbacks if instance is invalid', () => {
    const instanceMock = {
      ...playerInstanceMock,
      getPlaylist: jest.fn().mockReturnValue([1]),
      getPlaylistItem: jest.fn().mockReturnValue({ isLivestream: true }),
      getCaptionsList: jest.fn().mockReturnValue([1, 2]),
      getCurrentCaptions: jest.fn().mockReturnValue(1),
    };
    playerInstanceSpy.mockReturnValue(instanceMock);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    playerInstanceSpy.mockReturnValue(false);
    act(() => {
      wrapper.find('CastingFixedButton').last().simulate('click');
    });
    expect(instanceMock.setCurrentCaptions).toBeUndefined();
  });

  it('should call set mute method', () => {
    delete playerInstanceMock.setCurrentCaptions;
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    const callback = wrapper.find('CastingControls').prop('captionsCallback');
    callback();
    expect(playerInstanceMock.setCurrentCaptions).toBeUndefined();
  });

  it('should call set mute method', () => {
    playerInstanceMock.setCurrentCaptions = jest.fn();
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );

    act(() => {
      const callback = wrapper.find('CastingControls').prop('captionsCallback');
      callback();
    });

    expect(playerInstanceMock.setCurrentCaptions).toHaveBeenCalled();
  });
});

describe('CastingWrapper - casting type detection', () => {
  let playerInstanceSpy;
  let adBreakSelectorSpy;

  beforeEach(() => {
    global.window.FMG = FMG;
    jest.spyOn(castingSelectors, 'castingEnabledSelector')
      .mockReturnValue(true);
    playerInstanceSpy = jest.spyOn(videoHelpers, 'getPlayerInstance')
      .mockReturnValue(playerInstanceMock);
    adBreakSelectorSpy = jest.spyOn(castingSelectors, 'castingAdBreakSelector')
      .mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send clip type to controller when only 1 item in playlist', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find('CastingControls').prop('type')).toBe(castingTypes.CLIP);
  });

  it('should send playlist type to controller when multiple items in playlist', () => {
    const instanceMock = {
      ...playerInstanceMock,
      getPlaylist: jest.fn().mockReturnValue([0, 1, 2]),
    };
    playerInstanceSpy.mockReturnValue(instanceMock);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find('CastingControls').prop('type')).toBe(castingTypes.PLAYLIST);
  });

  it('should send livestream type when playlist item is livestream', () => {
    const instanceMock = {
      ...playerInstanceMock,
      getPlaylistItem: jest.fn().mockReturnValue({ isLivestream: true }),
    };
    jest.spyOn(castingSelectors, 'castingVideoDataSelector').mockReturnValue({
      isLiveStream: true,
    });
    playerInstanceSpy.mockReturnValue(instanceMock);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find('CastingControls').prop('type')).toBe(castingTypes.LIVESTREAM);
  });

  it('should send advertisement type when ad break is enabled', () => {
    adBreakSelectorSpy.mockReturnValue(true);
    const wrapper = mount(
      <Provider store={Store}>
        <CastingWrapper />
      </Provider>
    );
    expect(wrapper.find('CastingControls').prop('type')).toBe(castingTypes.ADVERTISING);
  });
});
