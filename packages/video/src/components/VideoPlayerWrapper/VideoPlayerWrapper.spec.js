import React from 'react';
import { mount } from 'enzyme';
import * as reactRedux from 'react-redux';
import { act } from 'react-dom/test-utils';
import Store from '@univision/fe-commons/dist/store/store';
import * as utils from '@univision/fe-commons/dist/utils/video';
import features from '@univision/fe-commons/dist/config/features';
import * as videoHelpers from '../../helpers';
import VideoPlayerWrapper, {
  jumpToPlaylistItem,
  setClosePlayerEvent,
  setPlaylistChangeEvent,
  shareButtonHandler,
  onPlaylistCardClick,
} from '.';

const props = {
  anchored: true,
  children: '<div>player</div>',
  expanded: false,
  hasAdSkin: false,
  isLiveStream: false,
  isMobile: false,
  isNewsDigitalChannel: false,
  nodeId: '1-10001-1',
  playlistContent: [{
    authRequired: false,
    category: 'HORÓSCOPOS',
    contentId: null,
    description: 'Este martes...',
    duration: 465,
    hasNewLabel: true,
    hasNextEpisode: true,
    image: 'https://cdn7.uvnimg.com/univision-media/image/upload/v1581969042/prod/3817219.jpg',
    mcpid: '3817219',
    previewUrl: '2030-02-13_3817219.mp4',
    publishDate: '2020-02-14T17:55:00+00:00',
    shortTitle: 'Horóscopo...',
    source: 'Univision',
    title: 'Horóscop',
    uri: null,
    videoType: 'clip',
  }],
  store: Store,
  title: 'Title test',
};

jest.mock('react-use-dimensions', () => ({
  __esModule: true,
  default: jest.fn(() => [() => {}, { height: 100 }]),
}));

describe('VideoPlayerWrapper component', () => {
  beforeEach(() => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render VideoPlayerWrapper', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} isMobile>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    expect(wrapper.find('VideoPlayerWrapper')).toHaveLength(1);
  });

  it('should enable anchor', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} anchored>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    expect(wrapper.find('VideoPlayerWrapper')).toHaveLength(1);
  });

  it('should render PlaylistCards if has a valid playlistContent', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} expanded>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    wrapper.find('PlaylistCards').simulate('click');
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
  });

  it('should not render PlaylistCards', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} playlistContent={null}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    expect(wrapper.find('PlaylistCards')).toHaveLength(0);
  });

  it('should render PlaylistCards if has a valid playlistContent', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} expanded isNewsDigitalChannel>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    wrapper.find('PlaylistCards').simulate('click');
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
  });

  it('should add the appropriate max offset', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    expect(wrapper.find('PlayerSwipeController').prop('maxOffset')).toEqual(646);
  });

  it('should handle global.window not being defined', () => {
    delete global.window.innerHeight;
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    expect(wrapper.find('PlayerSwipeController').prop('maxOffset')).toEqual(0);
  });

  it('should handle wrong availableSpace value', () => {
    global.window.innerHeight = 'wrongValue';
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    expect(wrapper.find('PlayerSwipeController').prop('maxOffset')).toEqual(0);
  });

  it('should handle global.window not being defined', () => {
    utils.isPlaceholderAvailable = jest.fn(() => true);
    utils.closeAnchor = jest.fn();

    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    wrapper.find('PlayerSwipeController').prop('onClose')();
    expect(utils.closeAnchor).toBeCalledTimes(1);
  });

  it('should call `closeAnchor` method if it is anchor', () => {
    utils.isPlaceholderAvailable = jest.fn(() => true);
    utils.closeAnchor = jest.fn();

    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    wrapper.find('PlayerSwipeController').prop('onClose')();
    expect(utils.closeAnchor).toBeCalledTimes(1);
  });

  it('should call `removeVideoInstance` method if it isn´t anchor', () => {
    utils.isPlaceholderAvailable = jest.fn(() => false);
    utils.removeVideoInstance = jest.fn();

    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    wrapper.find('PlayerSwipeController').prop('onClose')();
    expect(utils.removeVideoInstance).toBeCalledTimes(1);
  });

  it('should call `lockUnlockBody` method if swipe was closed', () => {
    utils.isPlaceholderAvailable = jest.fn(() => false);
    videoHelpers.lockUnlockBody = jest.fn();

    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} anchored isMobile>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );

    wrapper.find('PlayerSwipeController').prop('onClose')();
    expect(videoHelpers.lockUnlockBody).toBeCalledTimes(1);
  });

  it('should enable mobile backdrop when expanded', () => {
    jest.spyOn(reactRedux, 'useSelector')
      .mockImplementationOnce(() => 'mobile')
      .mockImplementationOnce(() => 3);
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} expanded>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    expect(wrapper.find('VideoPlayerWrapper')).toHaveLength(1);
  });

  it('should call twice `lockUnlockBody` method if is mobile and call handleCloseAnchor', () => {
    global.FMG = { on: jest.fn((_, fn) => fn(true)) };
    videoHelpers.lockUnlockBody = jest.fn();
    mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} isMobile>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    expect(videoHelpers.lockUnlockBody).toBeCalledTimes(3);
  });

  it('should call `checkExpandOnPlaylistChange` if `playlistContent` prop change', () => {
    global.FMG = { on: jest.fn((_, fn) => fn(true)) };
    utils.checkExpandOnPlaylistChange = jest.fn();
    videoHelpers.lockUnlockBody = jest.fn();
    const { playlistContent, ...rest } = props;
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...rest}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    wrapper.setProps({ playlistContent });
    expect(utils.checkExpandOnPlaylistChange).toBeCalled();
  });

  it('should remove onAnchorExpanded and switchPlaylist event listener', () => {
    global.FMG = {
      on: jest.fn((_, fn) => fn(true)),
      off: jest.fn(),
    };
    utils.checkExpandOnPlaylistChange = jest.fn();
    videoHelpers.lockUnlockBody = jest.fn();
    const { playlistContent, ...rest } = props;
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...rest}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    wrapper.setProps({ playlistContent });
    expect(utils.checkExpandOnPlaylistChange).toBeCalled();
    wrapper.unmount();
    expect(global.FMG.off).toHaveBeenCalledTimes(2);
  });

  it('should call `trigger` method for a valid `itemIndex`', () => {
    global.FMG = { trigger: jest.fn() };
    jumpToPlaylistItem(1, 1);
    expect(global.FMG.trigger).toBeCalledTimes(1);
    expect(global.FMG.trigger).toBeCalledWith('video_playlist_page.click_item', null, 1, 1);
  });

  it('should not call `trigger` method for an invalid `itemIndex`', () => {
    global.FMG = { trigger: jest.fn() };
    jumpToPlaylistItem(undefined, 1);
    expect(global.FMG.trigger).toBeCalledTimes(0);
  });

  it('should register a `closeAnchorVideo` event if FMG is a valid Object', () => {
    global.FMG = { on: jest.fn() };
    setClosePlayerEvent(1);
    expect(global.FMG.on).toBeCalledTimes(1);
    expect(global.FMG.on).toBeCalledWith('closeAnchorVideo', expect.any(Function), 1);
  });

  it('should not register `closeAnchorVideo` event if FMG is undefined', () => {
    delete global.FMG;
    setClosePlayerEvent(1);
    expect(global.FMG).toBeUndefined();
  });

  it('should call `removeVideoInstance` method for a valid id', () => {
    global.FMG = { on: jest.fn((_, fn) => fn()) };
    utils.removeVideoInstance = jest.fn();
    utils.isPlaceholderAvailable = jest.fn(() => false);
    setClosePlayerEvent(1);
    expect(utils.removeVideoInstance).toBeCalledTimes(1);
    expect(utils.removeVideoInstance).toBeCalledWith(1);
  });

  it('should call `lockUnlockBody` on close player event', () => {
    global.FMG = { on: jest.fn((_, fn) => fn()) };
    videoHelpers.lockUnlockBody = jest.fn();
    utils.isPlaceholderAvailable = jest.fn(() => false);
    setClosePlayerEvent(1);
    expect(videoHelpers.lockUnlockBody).toBeCalledTimes(2);
    expect(videoHelpers.lockUnlockBody).toBeCalledWith(false);
  });

  it('should not call `removeVideoInstance` method for an invalid id', () => {
    global.FMG = { on: jest.fn((_, fn) => fn()) };
    utils.removeVideoInstance = jest.fn();
    utils.isPlaceholderAvailable = jest.fn(() => true);
    mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} hasAdSkin nodeId={null}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    setClosePlayerEvent(1);
    expect(utils.removeVideoInstance).toBeCalledTimes(0);
  });

  it('should send hasAdSkin value for styles', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} hasAdSkin>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    expect(wrapper.find('VideoPlayerWrapper__PlayerWrapper').prop('hasAdSkin')).toBe(true);
  });

  it('should show digital channel components', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} isNewsDigitalChannel>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    const setExpanded = wrapper.find('PlayerSwipeController').prop('onChange');

    act(() => {
      setExpanded(true);
      expect(wrapper.find('VideoPlayerWrapper__EpgWrapper')).not.toBeNull();
    });
  });

  it('should show vix banner', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(true);
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} isNewsDigitalChannel>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    const setExpanded = wrapper.find('PlayerSwipeController').prop('onChange');

    act(() => {
      setExpanded(true);
    });

    expect(wrapper.find('VideoPlayerWrapper__EpgWrapper')).not.toBeNull();
  });

  it('should not show digital channel components if not digital stream', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props}>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    const setExpanded = wrapper.find('PlayerSwipeController').prop('onChange');

    act(() => {
      setExpanded(true);
      expect(wrapper.find('VideoPlayerWrapper__EpgWrapper')).toHaveLength(0);
    });
  });

  it('should enable sticky mode', () => {
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...props} isSticky>
          <span>hello</span>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    expect(wrapper.find('VideoPlayerWrapper__PlayerWrapper').prop('isSticky')).toBe(true);
  });

  it('should not show live label when disable flag is true in livestream', () => {
    const newProps = {
      ...props,
      isLiveStream: true,
      disableEnVivoLabel: true,
    };
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...newProps}>
          <p>test</p>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    expect(wrapper.find('VideoMeta').prop('showLiveLabel')).toBe(false);
  });

  it('should be hidden when casting is enabled', () => {
    const newProps = {
      ...props,
      isCasting: true,
    };
    const wrapper = mount(
      <reactRedux.Provider store={Store}>
        <VideoPlayerWrapper {...newProps}>
          <p>test</p>
        </VideoPlayerWrapper>
      </reactRedux.Provider>
    );
    expect(wrapper.find('VideoPlayerWrapper__PlayerWrapper')).toHaveStyleRule(
      'opacity',
      '0'
    );
  });
});

describe('setPlaylistChangeEvent', () => {
  it('should call the hook if call the FMG event is trigger', () => {
    global.FMG = { on: jest.fn((_, fn) => fn()) };
    const setPlaylist = jest.fn();
    setPlaylistChangeEvent(1, setPlaylist);
    expect(setPlaylist).toBeCalledTimes(1);
  });

  it('should not call the hook if the FMG is undefined', () => {
    delete global.FMG;
    const setPlaylist = jest.fn();
    setPlaylistChangeEvent(1, setPlaylist);
    expect(setPlaylist).not.toBeCalled();
  });
});

describe('shareButtonHandler', () => {
  it('should call pauseAnyPlayerPlaying for shareButtonHandler', () => {
    utils.pauseAnyPlayerPlaying = jest.fn();
    shareButtonHandler();
    expect(utils.pauseAnyPlayerPlaying).toBeCalled();
  });
});

describe('onPlaylistCardClick', () => {
  it('should change to new playlist item', () => {
    const setActiveIndex = jest.fn();
    onPlaylistCardClick(setActiveIndex, 'player-123')({
      preventDefault: () => {},
    }, 3);
    expect(setActiveIndex).toBeCalledWith(3);
  });
});
