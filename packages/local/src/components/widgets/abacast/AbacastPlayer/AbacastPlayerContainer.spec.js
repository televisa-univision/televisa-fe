import React from 'react';
import { shallow, mount } from 'enzyme';

import * as videoUtils from '@univision/fe-commons/dist/utils/video';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import RadioStationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/station/RadioStationTracker';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import * as syndicator from '@univision/fe-commons/dist/utils/api/content/fetch';
import PLAY_STATES from '@univision/fe-commons/dist/constants/radioPlayStates';
import { FORWARD, REWIND } from '@univision/fe-commons/dist/constants/radio';
import * as playerActions from '@univision/fe-commons/dist/store/actions/player-actions';
import adswizzManager from '@univision/fe-commons/dist/utils/ads/adswizzManager';
import * as fetchApi from '@univision/fe-commons/dist/utils/api/fetchApi';

import {
  AbacastPlayerContainer as AbacastPlayer,
  mapStateToProps,
  areStatePropsEqual,
} from './AbacastPlayerContainer';
import Styles from './AbacastPlayer.scss';

storeHelpers.isVideoSDKReady = jest.fn();
videoUtils.getPlayerInstance = jest.fn();

jest.mock('@univision/fmg-video-sdk', () => jest.fn(() => ({ init: jest.fn() })));
jest.mock('@univision/fe-commons/dist/assets/images/radio-default-360.jpg', () => 'fallback.jpg');
jest.mock('@univision/fe-commons/dist/utils/logging/clientLogging', () => jest.fn());

const FMG = {
  callFn: jest.fn(),
  getJWPlayerInstance: jest.fn(),
  init: jest.fn(),
  playerReady: jest.fn(),
  playRadio: jest.fn(),
  on: jest.fn(),
  trigger: jest.fn(),
};

fetchApi.fetchPlayerTokenApi = jest.fn().mockReturnValue({ token: '1234' });
adswizzManager.setPlayerData = jest.fn();
adswizzManager.initAdsWizz = jest.fn();
adswizzManager.load = jest.fn();

beforeEach(() => {
  global.window.FMG = FMG;
  global.window.adswizzSDK = 'test';
});

/** @test {AbacastPlayer} */
describe('AbacastPlayer', () => {
  let props;
  beforeEach(() => {
    props = {
      abacastId: '2315',
      stationTitle: 'Los Angeles KLVE',
      token: '1234',
    };
  });

  it('renders the player', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    expect(wrapper.find(`div.${Styles.playerFrame}`));
  });

  it('should catch loadSDK error', async () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.loadSDK = jest.fn(() => {
      throw new Error('Test');
    });
    try {
      await instance.componentDidMount();
    } catch (err) {
      expect(clientLogging).toHaveBeenCalledWith(new Error('Test'));
    }
  });

  it('should not add the fmg ready listener if its already defined', async () => {
    storeHelpers.isVideoSDKReady.mockReturnValueOnce(false);
    const wrapper = shallow(<AbacastPlayer {...props} />);
    global.window.FMGlistener = true;
    await wrapper.instance().componentDidMount();
    expect(global.window.FMGlistener).toEqual(true);
  });

  it('should add the events on player ready', () => {
    props.mediaPlayerPlayRadio = jest.fn();
    props.nowPlaying = jest.fn();
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.addEvents = jest.fn();
    const videoPlay = jest.fn();
    videoUtils.getPlayerInstance = () => ({
      play: videoPlay,
    });
    instance.onPlayerReady();
    expect(videoPlay).toHaveBeenCalled();
    expect(instance.addEvents).toHaveBeenCalled();
  });

  it('should call player configuration', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.configurePlayer = jest.fn();
    instance.initVideo();
    expect(instance.configurePlayer).toHaveBeenCalled();
  });

  it('should configure the player again on update', () => {
    const wrapper = shallow(<AbacastPlayer {...props} streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.configurePlayer = jest.fn();
    instance.componentDidUpdate({ streamUrl: 'http://univision.com/stream1' }, {});
    expect(instance.configurePlayer).toHaveBeenCalled();
  });

  it('should configure the token with &', () => {
    const wrapper = shallow(<AbacastPlayer {...props} streamUrl="http://univision.com/stream2?asd=asd" />);
    const instance = wrapper.instance();
    instance.configurePlayer = jest.fn();
    instance.componentDidUpdate({ streamUrl: 'http://univision.com/stream1' }, {});
    expect(instance.configurePlayer).toHaveBeenCalled();
  });

  it('should togglePlaying if pause prop change with adswizz and unmute player', () => {
    global.window.adswizzSDK = undefined;
    const wrapper = shallow(<AbacastPlayer {...props} pause={false} streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.configurePlayer();
    const spyTogglePlaying = jest.spyOn(instance, 'togglePlaying');
    wrapper.setState({ play: 'playing' });
    wrapper.setState({ volume: 0 });
    wrapper.setProps({ pause: true });
    instance.configurePlayer();
    expect(spyTogglePlaying).toHaveBeenCalled();
  });

  it('should togglePlaying if pause prop change', () => {
    const wrapper = shallow(<AbacastPlayer {...props} pause={false} streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.configurePlayer = jest.fn();
    const spyTogglePlaying = jest.spyOn(instance, 'togglePlaying');
    wrapper.setState({ play: 'playing' });
    wrapper.setProps({ pause: true });
    expect(spyTogglePlaying).toHaveBeenCalled();
  });

  it('should not configure the player if streamUrl is not valid', () => {
    window.FMG.callFn = jest.fn();
    const wrapper = shallow(<AbacastPlayer {...props} streamUrl={null} />);
    const instance = wrapper.instance();
    instance.configurePlayer();
    expect(window.FMG.callFn).not.toHaveBeenCalled();
  });

  it('should add events', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = {
      on: jest.fn(),
      off: jest.fn(),
    };
    expect(instance.addEvents()).toEqual(true);
  });

  it('should not add events if no player instance', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = null;
    expect(instance.addEvents()).toEqual(false);
  });

  it('should set playing state on play', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    const cb = instance.handleEvent(PLAY_STATES.PLAY);
    cb();
    expect(wrapper.state('play')).toEqual(PLAY_STATES.PLAY);
  });

  it('should configure the player', () => {
    global.window.adswizzSDK = undefined;
    const wrapper = shallow(<AbacastPlayer {...props} streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    const cb = instance.handleEvent(PLAY_STATES.PLAY);
    cb();
    instance.configurePlayer();
    expect(wrapper.state('play')).toEqual(PLAY_STATES.PLAY);
  });

  it('should not configure the player because of token', () => {
    fetchApi.fetchPlayerTokenApi = jest.fn().mockReturnValue({ token: undefined });
    global.window.adswizzSDK = undefined;
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.configurePlayer();
  });

  it('should not configure the player if window.FMG is not defined', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    window.FMG = null;
    instance.addEvents = jest.fn();
    instance.configurePlayer();
    expect(instance.addEvents).not.toHaveBeenCalled();
  });

  it('should handle open', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    wrapper.instance().handleOpen('stationMenu');
    expect(wrapper.state('stationMenu')).toEqual(true);
  });

  it('should handle close', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    wrapper.instance().handleClose('stationMenu');
    expect(wrapper.state('stationMenu')).toEqual(false);
  });

  it('should stop player if volume is 0', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.togglePlaying = jest.fn();
    instance.updateVolume = jest.fn();
    instance.handleVolume({ target: { value: 0 } });
    expect(instance.togglePlaying).toHaveBeenCalled();
    expect(instance.updateVolume).not.toHaveBeenCalled();
  });

  it('should update volume if player is playing', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    wrapper.setState({ play: PLAY_STATES.PAUSED });
    const instance = wrapper.instance();
    instance.togglePlaying = jest.fn();
    instance.updateVolume = jest.fn();
    instance.handleVolume({ target: { value: 40 } });
    expect(instance.updateVolume).toHaveBeenCalledWith(40);
    expect(instance.togglePlaying).toHaveBeenCalled();
  });

  it('should update volume if player is playing', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.togglePlaying = jest.fn();
    instance.updateVolume = jest.fn();
    wrapper.setState({ play: PLAY_STATES.PLAY });
    instance.handleVolume({ target: { value: 40 } });
    expect(instance.togglePlaying).not.toHaveBeenCalled();
    expect(instance.updateVolume).toHaveBeenCalledWith(40);
  });

  it('should not handle volume changes if no player instance', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = null;
    instance.handleVolume({ target: { value: 10 } });
    expect(wrapper.state('volume')).toEqual(10);
  });

  it('should handle volume changes', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = {
      setVolume: jest.fn(),
    };
    instance.updateVolume(10);
    expect(instance.playerInstance.setVolume).toHaveBeenCalledWith(10);
  });

  it('should handle ProgressBar changes', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = {
      seek: jest.fn(),
      getDuration: jest.fn(() => 100),
      getPosition: jest.fn(() => 10),
    };
    instance.handleProgressBar({ target: { value: 10 } });
    expect(instance.playerInstance.seek).toHaveBeenCalledWith(10);
  });

  it('should not handle ProgressBar changes if no player instance', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = null;
    instance.handleProgressBar({ target: { value: 10 } });
    expect(instance.handleProgressBar()).toEqual(undefined);
  });

  it('should handle Seek changes', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = {
      seek: jest.fn(),
      getPosition: jest.fn(() => 20),
      getDuration: jest.fn(() => 100),
    };
    instance.handleSeek(40);
    expect(instance.playerInstance.seek).toHaveBeenCalledWith(40);
    instance.handleSeek(10, FORWARD);
    expect(instance.playerInstance.seek).toHaveBeenCalledWith(30);
    instance.handleSeek(10, REWIND);
    expect(instance.playerInstance.seek).toHaveBeenCalledWith(10);
  });

  it('should not handle Seek changes when the sec isn`t in range valid', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = {
      seek: jest.fn(),
      getPosition: jest.fn(() => 92),
      getDuration: jest.fn(() => 100),
    };
    instance.handleSeek(10, FORWARD);
    expect(instance.playerInstance.seek).toHaveBeenCalledTimes(0);
    instance.handleSeek(102);
    expect(instance.playerInstance.seek).toHaveBeenCalledTimes(0);
    instance.playerInstance = {
      seek: jest.fn(),
      getPosition: jest.fn(() => 2),
      getDuration: jest.fn(() => 100),
    };
    instance.handleSeek(10, REWIND);
    expect(instance.playerInstance.seek).toHaveBeenCalledTimes(0);
  });

  it('should not handle Seek changes if no player instance', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = null;
    instance.handleSeek({ target: { value: 10 } });
    expect(instance.handleSeek()).toEqual(undefined);
  });

  it('should toggle collapsed and add no-scroll class to body', () => {
    spyOn(global.document.body.classList, 'add');
    const wrapper = shallow(<AbacastPlayer {...props} />);
    wrapper.instance().toggleCollapsed();
    expect(wrapper.state('collapsed')).toEqual(false);
    expect(global.document.body.classList.add).toHaveBeenCalledWith('player-open');
  });

  it('should toggle collapsed and remove no-scroll class to body', () => {
    spyOn(global.document.body.classList, 'remove');
    const wrapper = shallow(<AbacastPlayer {...props} />);
    wrapper.setState({ collapsed: false });
    wrapper.instance().toggleCollapsed();
    expect(wrapper.state('collapsed')).toEqual(true);
    expect(global.document.body.classList.remove).toHaveBeenCalledWith('player-open');
  });

  it('should not toggle collapsed if keyboard event and not return key', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const event = new KeyboardEvent('keypress', {
      keyCode: 12,
    });
    wrapper.instance().toggleCollapsed(event);
    expect(wrapper.state('collapsed')).toEqual(true);
  });

  it('should toggle PlaybackRate', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = {
      setPlaybackRate: jest.fn(),
    };
    instance.togglePlaybackRate(1);
    expect(instance.playerInstance.setPlaybackRate).toHaveBeenCalledWith(1.5);
    instance.togglePlaybackRate(1.5);
    expect(instance.playerInstance.setPlaybackRate).toHaveBeenCalledWith(2);
    instance.togglePlaybackRate(2);
    expect(instance.playerInstance.setPlaybackRate).toHaveBeenCalledWith(0.5);
    instance.togglePlaybackRate(0.5);
    expect(instance.playerInstance.setPlaybackRate).toHaveBeenCalledWith(1);
  });

  it('should not toggle PlaybackRate if no player instance', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({ rate: 1 });
    instance.playerInstance = null;
    instance.togglePlaybackRate();
    expect(wrapper.state('rate')).toEqual(1.5);
  });

  it('should toggle paused', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({ play: PLAY_STATES.PLAY });
    instance.playerInstance = {
      play: jest.fn(),
      getState: jest.fn(() => PLAY_STATES.PLAY),
      setVolume: jest.fn(),
      stop: jest.fn(),
    };
    instance.trackEngagement = jest.fn();
    instance.updateVolume = jest.fn();
    instance.togglePlaying();
    expect(instance.playerInstance.stop).toHaveBeenCalled();
    expect(instance.trackEngagement).toHaveBeenCalledWith(RadioStationTracker.events.streamPause);
    expect(instance.updateVolume).toHaveBeenCalledWith(0);
  });

  it('should toggle pause and player is loading', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({ play: PLAY_STATES.PLAY });
    instance.playerInstance = {
      pause: jest.fn(),
      play: jest.fn(),
      setVolume: jest.fn(),
      getState: jest.fn(() => PLAY_STATES.LOADING),
    };
    instance.trackEngagement = jest.fn();
    instance.togglePlaying();
    expect(instance.playerInstance.pause).not.toHaveBeenCalled();
  });

  it('should toggle playing and increase volume', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({ volume: 0 });
    instance.playerInstance = {
      pause: jest.fn(),
      play: jest.fn(),
      setVolume: jest.fn(),
    };
    instance.trackEngagement = jest.fn();
    instance.updateVolume = jest.fn();
    instance.togglePlaying();
    expect(instance.playerInstance.play).toHaveBeenCalled();
    expect(instance.trackEngagement).toHaveBeenCalledWith(RadioStationTracker.events.streamResume);
    expect(instance.updateVolume).toHaveBeenCalledWith(50);
  });

  it('should toggle playing', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({ volume: 50 });
    instance.playerInstance = {
      pause: jest.fn(),
      play: jest.fn(),
      setVolume: jest.fn(),
    };
    instance.trackEngagement = jest.fn();
    instance.updateVolume = jest.fn();
    instance.togglePlaying();
    expect(instance.playerInstance.play).toHaveBeenCalled();
    expect(instance.trackEngagement).toHaveBeenCalledWith(RadioStationTracker.events.streamResume);
    expect(instance.updateVolume).not.toHaveBeenCalledWith(50);
  });

  it('should not toggle playing if no player instance', () => {
    const wrapper = shallow(<AbacastPlayer {...props} />);
    const instance = wrapper.instance();
    instance.playerInstance = null;
    instance.togglePlaying();
    expect(wrapper.state('play')).toEqual(PLAY_STATES.PAUSED);
  });

  it('should return the logo image if there is an error loading the album art', () => {
    const wrapper = shallow(
      <AbacastPlayer {...props} logo={{ renditions: { original: { href: 'test.jpg' } } }} />
    );
    expect(wrapper.instance().onImageError()).toEqual('test.jpg');
  });

  it('should return the default image if there is an error loading the album art and theres no logo', () => {
    props.image = {
      renditions: {
        original: {
          href: 'fallback.jpg',
        },
      },
    };
    const wrapper = shallow(
      <AbacastPlayer {...props} logo={{}} />
    );
    expect(wrapper.instance().onImageError()).toContain('fallback.jpg');
  });

  it('pause handler should call playerIntance.stop() when pause handler is called', () => {
    const radioPlayer = {
      stop: jest.fn(),
      play: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    };
    videoUtils.getPlayerInstance = () => radioPlayer;
    props.mediaPlayerPlayRadio = jest.fn();
    props.nowPlaying = jest.fn();
    const wrapper = shallow(<AbacastPlayer {...props} isSafari />);
    const instance = wrapper.instance();
    instance.onPlayerReady();
    instance.handleEvent(PLAY_STATES.PAUSED)();
    expect(radioPlayer.stop).toBeCalled();
  });
});

describe('mapStateToProps', () => {
  it('should map state to props', () => {
    expect(mapStateToProps({ player: { anchorPlayer: { test: 'data' } } })).toEqual({
      nowPlaying: { test: 'data' },
    });
  });
});

describe('tracking', () => {
  it('should track the start of the stream when it starts loading', () => {
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.trackEngagement = jest.fn();
    instance.configurePlayer = jest.fn();
    instance.componentDidUpdate({ streamUrl: null }, {});
    expect(instance.trackEngagement).toHaveBeenCalledWith(RadioStationTracker.events.streamStart);
  });

  it('should not track the start is the anchor player closed', () => {
    const wrapper = shallow(<AbacastPlayer streamUrl={null} />);
    const instance = wrapper.instance();
    instance.trackEngagement = jest.fn();
    instance.configurePlayer = jest.fn();
    instance.componentDidUpdate({ streamUrl: 'http://univision.com/stream2' }, {});
    expect(instance.trackEngagement).not.toHaveBeenCalled();
  });

  it('should track when the user closes the player', () => {
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.trackEngagement = jest.fn();
    instance.onCloseMediaPlayer();
    expect(instance.trackEngagement).toHaveBeenCalledWith(RadioStationTracker.events.anchorClose);
  });

  it('should track when the user closes the player and call the onClose callback', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" onClose={onClose} />);
    const instance = wrapper.instance();
    instance.trackEngagement = jest.fn();
    instance.onCloseMediaPlayer();
    expect(instance.trackEngagement).toHaveBeenCalledWith(RadioStationTracker.events.anchorClose);
    expect(onClose).toHaveBeenCalled();
  });

  it('should track when the user opens the full screen the player', () => {
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.trackEngagement = jest.fn();
    instance.toggleCollapsed();
    expect(instance.trackEngagement)
      .toHaveBeenCalledWith(RadioStationTracker.events.fullScreenOpen);
  });

  it('should track when the user closes the full screen the player', () => {
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    wrapper.setState({ collapsed: false });
    instance.trackEngagement = jest.fn();
    instance.toggleCollapsed();
    expect(instance.trackEngagement)
      .toHaveBeenCalledWith(RadioStationTracker.events.fullScreenClose);
  });

  it('should track when the user shares the radio', () => {
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.trackEngagement = jest.fn();
    instance.onShare({
      target: {
        dataset: {
          share: 'test',
        },
      },
    });
    expect(instance.trackEngagement)
      .toHaveBeenCalledWith('social_share', { name: 'test' });
  });

  it('should call SocialTracker when the user shares the radio', async () => {
    const extraData = {
      name: 'facebook',
    };
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.analyticsData = { id: 'test' };
    await instance.trackEngagement('social_share', extraData);
    expect(SocialTracker.track).toHaveBeenCalledTimes(1);
  });

  it('should not call SocialTracker or RadioStationTracker Event when analyticsData is undefined ', async () => {
    const extraData = {
      name: 'facebook',
    };
    spyOn(SocialTracker, 'track');
    spyOn(RadioStationTracker, 'track');
    const wrapper = mount(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    await instance.trackEngagement('social_share', extraData);
    expect(SocialTracker.track).toHaveBeenCalledTimes(0);
    expect(RadioStationTracker.track).toHaveBeenCalledTimes(0);
  });

  it('should send the analytic data', async () => {
    spyOn(RadioStationTracker, 'track');
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.analyticsData = { id: 'test' };
    await instance.trackEngagement(RadioStationTracker.events.streamPause);
    expect(RadioStationTracker.track).toHaveBeenCalled();
  });

  it('should fetch by ID if uri is not defined', async () => {
    const wrapper = shallow(<AbacastPlayer uid={'1234'} streamUrl="http://univision.com/stream2" />);
    spyOn(syndicator, 'default');
    spyOn(syndicator, 'fetchById');
    await wrapper.instance().getAnalyticsData();
    expect(syndicator.default).not.toHaveBeenCalled();
    expect(syndicator.fetchById).toHaveBeenCalled();
  });

  it('should fetch by URI if URI is defined', async () => {
    const wrapper = shallow(<AbacastPlayer uri="https://www.test.com" uid={'1234'} streamUrl="http://univision.com/stream2" />);
    spyOn(syndicator, 'default');
    spyOn(syndicator, 'fetchById');
    await wrapper.instance().getAnalyticsData();
    expect(syndicator.default).toHaveBeenCalled();
    expect(syndicator.fetchById).not.toHaveBeenCalled();
  });

  it('should not fetch by if there is no URI or UID', async () => {
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    spyOn(syndicator, 'default');
    spyOn(syndicator, 'fetchById');
    await wrapper.instance().getAnalyticsData();
    expect(syndicator.default).not.toHaveBeenCalled();
    expect(syndicator.fetchById).not.toHaveBeenCalled();
  });
});

describe('areStatePropsEqual', () => {
  const initialProps = {
    pause: false,
    stationTitle: 'test station title',
    nowPlaying: {
      artist: 'test artist',
    },
  };
  it('should return false if next and prev props are not equal', () => {
    expect(areStatePropsEqual(initialProps, initialProps)).toBeTruthy();
    expect(areStatePropsEqual(initialProps, {})).toBeFalsy();
  });
});

describe('heartbeat', () => {
  const initialProps = {
    pause: false,
    stationTitle: 'test station title',
    streamUrl: 'http://univision.com/stream',
    nowPlaying: {
      abacastId: 1,
      artist: 'test artist',
    },
    heartbeat: {
      timeoutId: 1,
      initialTime: performance.now(),
    },
  };
  it('should clear the heartbeat thread and track an event', () => {
    const wrapper = shallow(<AbacastPlayer {...initialProps} />);
    const instance = wrapper.instance();
    instance.trackHeartBeat = jest.fn();
    instance.componentWillUpdate({ streamUrl: 'http://univision.com/stream2' }, {});
    expect(instance.trackHeartBeat).toHaveBeenCalled();
  });
  it('should not track any heartbeat event if there is not heartbeat object', () => {
    const wrapper = shallow(<AbacastPlayer {...initialProps} heartbeat={null} />);
    const instance = wrapper.instance();
    instance.trackHeartBeat = jest.fn();
    instance.componentWillUpdate({ streamUrl: 'http://univision.com/stream2' }, {});
    expect(instance.trackHeartBeat).not.toHaveBeenCalled();
  });
  it('should track the heartbeat event', async () => {
    const extraData = {
      radio_heartbeat_value: 1,
    };
    spyOn(RadioStationTracker, 'track');
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.analyticsData = { id: 'test' };
    await instance.trackEngagement(RadioStationTracker.events.heartbeat, extraData);
    expect(RadioStationTracker.track).toHaveBeenCalledTimes(1);
  });

  it('should remove section_category prop if it is present.', async () => {
    const extraData = {
      radio_heartbeat_value: 1,
    };
    spyOn(RadioStationTracker, 'track');
    const wrapper = shallow(<AbacastPlayer streamUrl="http://univision.com/stream2" />);
    const instance = wrapper.instance();
    instance.analyticsData = { id: 'test', section_category: 'section' };
    await instance.trackEngagement(RadioStationTracker.events.heartbeat, extraData);
    expect(instance.analyticsData).toEqual({ id: 'test' });
  });

  it('should toggle tracking heartbeat when the time has expired.', () => {
    const wrapper = shallow(<AbacastPlayer {...initialProps} />);
    const instance = wrapper.instance();
    instance.playerInstance = {};
    instance.trackEngagement = jest.fn();
    instance.toggleTrackHearbeat(true);
    expect(instance.trackEngagement).toHaveBeenCalledWith(RadioStationTracker.events.heartbeat, {
      radio_heartbeat_value: 1,
    });
  });

  it('should toggle tracking heartbeat when the player is paused.', () => {
    const wrapper = shallow(<AbacastPlayer {...initialProps} />);
    const instance = wrapper.instance();
    wrapper.setState({ play: PLAY_STATES.PLAY });
    instance.playerInstance = {
      play: jest.fn(),
      getState: jest.fn(() => PLAY_STATES.PLAY),
      setVolume: jest.fn(),
      stop: jest.fn(),
    };
    instance.trackEngagement = jest.fn();
    instance.togglePlaying();
    instance.toggleTrackHearbeat(false);
    expect(instance.playerInstance.stop).toHaveBeenCalled();
    expect(instance.trackEngagement).toHaveBeenCalledWith(RadioStationTracker.events.streamPause);
  });

  it('should clear the timeout and remove from the heartbeat data from Store when the player is paused', () => {
    const setHeartBeatSpy = jest.spyOn(playerActions, 'setHeartBeat');
    const wrapper = shallow(<AbacastPlayer {...initialProps} />);
    const instance = wrapper.instance();
    instance.playerInstance = {
      getState: jest.fn(() => PLAY_STATES.PAUSED),
    };
    instance.toggleTrackHearbeat(false);
    expect(setHeartBeatSpy).toHaveBeenCalled();
  });

  it('should re-initialize the heartbeat data in the Store when the time has expired and call toggleTrackHeartbeat after 5 min', () => {
    jest.useFakeTimers();
    const setHeartBeatSpy = jest.spyOn(playerActions, 'setHeartBeat');
    const wrapper = shallow(<AbacastPlayer {...initialProps} />);
    const instance = wrapper.instance();
    instance.playerInstance = {
      getState: jest.fn(() => PLAY_STATES.PLAY),
    };
    instance.toggleTrackHearbeat(true);
    jest.runTimersToTime(300000);
    expect(setHeartBeatSpy).toHaveBeenCalled();
  });

  it('should track the amount of minutes spent on the streaming.', () => {
    initialProps.heartbeat.initialTime = performance.now() - 180000;
    const wrapper = shallow(<AbacastPlayer {...initialProps} />);
    const instance = wrapper.instance();
    instance.playerInstance = {};
    instance.trackEngagement = jest.fn();
    instance.toggleTrackHearbeat(true);
    expect(instance.trackEngagement).toHaveBeenCalledWith(RadioStationTracker.events.heartbeat, {
      radio_heartbeat_value: 3,
    });
  });

  it('should not call toggleTrackHeartbeat when the state is loading', () => {
    const wrapper = shallow(<AbacastPlayer {...initialProps} />);
    const instance = wrapper.instance();
    const cb = instance.handleEvent(PLAY_STATES.LOADING);
    cb();
    instance.toggleTrackHearbeat = jest.fn();
    expect(instance.toggleTrackHearbeat).not.toHaveBeenCalled();
  });

  it('should call `removeAnyPlayerAnchored` if pip is enabled', () => {
    videoUtils.removeAnyPlayerAnchored = jest.fn();
    const wrapper = shallow(<AbacastPlayer {...initialProps} />);
    const instance = wrapper.instance();
    const cb = instance.handleEvent(PLAY_STATES.PLAY);
    cb();
    expect(wrapper.state('play')).toEqual(PLAY_STATES.PLAY);
    expect(videoUtils.removeAnyPlayerAnchored).toHaveBeenCalled();
  });

  it('should not track when there is not any timeout running.', () => {
    const wrapper = shallow(<AbacastPlayer {...initialProps} heartbeat={null} />);
    const instance = wrapper.instance();
    instance.playerInstance = {};
    instance.trackEngagement = jest.fn();
    instance.toggleTrackHearbeat(true);
    expect(instance.trackEngagement).not.toHaveBeenCalled();
  });
});
