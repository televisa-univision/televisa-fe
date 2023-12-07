import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as videoUtils from '@univision/fe-commons/dist/utils/video';
import * as utils from '@univision/fe-commons/dist/utils/helpers';
import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import action from '@univision/fe-commons/dist/store/actions/video-actions';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { playRadio } from '@univision/fe-commons/dist/store/actions/player-actions';
import features from '@univision/fe-commons/dist/config/features';
import { AIRPLAY } from '@univision/fe-commons/dist/constants/video';
import VideoMetadata from '../VideoMetadata';
import VideoPopupsWrapper from '../VideoPopupsWrapper';
import { VideoComponent, stateToProps, areStatePropsEqual } from '.';

global.window ??= Object.create(window);
Object.defineProperty(global.window, 'location', {
  value: { pathname: '' },
  configurable: true,
  writable: true,
});

Store.dispatch(action('id', value => value));

Store.dispatch(setPageData({
  requestParams: { mode: 'prod' },
  theme: { primary: 123 },
  data: {
    pageCategory: 'verizon 360',
  },
}));

jest.useFakeTimers();

jest.mock('@univision/fe-commons/dist/utils/breakpoint/breakPointMediator', () => {
  let device = 'mobile';
  return {
    __setDevice: (d) => { device = d; },
    getDevice: jest.fn(() => device),
  };
});

jest.mock('@univision/fmg-video-sdk', () => jest.fn(() => ({ init: jest.fn() })));

jest.mock('@univision/fe-commons/dist/config/features', () => ({
  video: {
    anchor: jest.fn(() => false),
    asyncMeta: jest.fn(() => true),
    enableResume: jest.fn(() => true),
    sticky: jest.fn(() => true),
    autoplayWhenVisible: jest.fn(() => false),
    disableAds: jest.fn(() => false),
    enableAdRules: jest.fn(),
    isDAI: jest.fn(),
    isFreeVideoPreview: jest.fn(),
    isMVPDImprov: jest.fn(),
    isSection: jest.fn(),
    isVideoLayout: jest.fn(),
    isVodDAI: jest.fn(),
    enableNativePip: jest.fn(),
    enableCasting: jest.fn(),
  },
  deportes: {
    isTudn: jest.fn(() => false),
    isWorldCupMVP: jest.fn(() => false),
  },
  advertisement: {
    areCookiesDisallowed: jest.fn(() => false),
  },
  shows: {
    showsRedesign: jest.fn(() => true),
  },
  radio: {
    isSingleVideoInstance: jest.fn(() => true),
  },
  widgets: {
    truncateText: false,
  },
}));

jest.mock('../VideoMetadata', () => jest.fn(() => () => <div>mock</div>));

storeHelpers.isSpa = jest.fn();
storeHelpers.getContentType = jest.fn();
selectors.isTudnSiteSelector = jest.fn();

const Features = require('@univision/fe-commons/dist/config/features');

const jwPlayerInstance = {
  getState: jest.fn(),
  play: jest.fn(),
  pause: jest.fn(),
  resize: jest.fn(),
  on: jest.fn(),
  once: jest.fn(),
  stop: jest.fn(),
  trigger: jest.fn(),
  playlistItem: jest.fn(),
  getMute: jest.fn(() => true),
  setVolume: jest.fn(),
};

const FMG = {
  callFn: jest.fn(),
  clearInstanceEvents: jest.fn(),
  init: jest.fn(),
  playlist: jest.fn(),
  playlistLongform: jest.fn(),
  playlistLivestream: jest.fn(),
  soccerPlaylist: jest.fn(),
  on: jest.fn(),
  once: jest.fn(),
  has: jest.fn(),
  playlistRecommendation: jest.fn(),
  getJWPlayerInstance: jest.fn(() => jwPlayerInstance),
  trigger: jest.fn(),
  multitabPlaylist: jest.fn(),
  playLivestream: jest.fn(),
  getInstance: jest.fn(),
};

videoUtils.getPlayerInstance = jest.fn(() => jwPlayerInstance);
videoUtils.removeAnchoredPlayer = jest.fn();
videoUtils.removePlayerInstance = jest.fn();
videoUtils.doIfPlayerExists = jest.fn((nodeId, fn) => fn(jwPlayerInstance));
videoUtils.isPipSupported = jest.fn();
videoUtils.getCastingReceiverId = jest.fn(() => 'test');
videoUtils.getCastingPlatform = jest.fn(() => 'test');
videoUtils.isAnyPlayerAnchored = jest.fn();
videoUtils.isPlayerBufferingOrPlaying = jest.fn();
videoUtils.isAnyPlayerPlaying = jest.fn();

let props;
beforeEach(() => {
  features.video.isFreeVideoPreview = jest.fn(() => false);
  features.video.isVideoLayout = jest.fn(() => false);
  features.video.promoVideo = jest.fn(() => false);
  global.window.FMG = FMG;
  global.window.enableResume = true;
  props = {
    userId: '123',
    onSdkReady: jest.fn(),
    pageData: {
    },
    uri: 'https://univ.com/123',
    title: 'This is a video title',
    mcpid: '123',
    nodeId: 'player-123',
    inline: true,
    image: {
      type: 'image',
      title: 'title',
      caption: null,
      credit: null,
      renditions: {
        original: {
          href: 'image.jpg',
          width: 1920,
          height: 1080,
        },
      },
    },
    storePlayingData: jest.fn(),
    mediaPlayer: {
      radio: {
        abacastId: null,
        stationTitle: null,
      },
      videoPlaying: null,
    },
    widgetData: {
      type: 'testWidget',
      settings: { uid: 1 },
      extraData: { status: 'test' },
    },
  };
  videoUtils.getPlayerInstance = jest.fn(() => jwPlayerInstance);
});

describe('Video widget tests', () => {
  it('should render as expected', () => {
    let wrapper = shallow(<VideoComponent {...props} />);
    wrapper = shallow(wrapper.prop('children')());
    expect(wrapper.find('.videoWrapper')).toHaveLength(1);
  });

  it('should render as expected for TUDN', () => {
    selectors.isTudnSiteSelector.mockReturnValue(true);
    let wrapper = shallow(<VideoComponent {...props} image={{ url: 'uni.jpg', title: 'title' }} />);
    wrapper.setState({ playing: true });
    wrapper = shallow(wrapper.prop('children')());
    expect(wrapper.find('.videoWrapper')).toHaveLength(1);
    wrapper = shallow(<VideoComponent {...props} image={null} overrideImageUrl="image.jpg" />);
    wrapper = shallow(wrapper.prop('children')());
    expect(wrapper.find('.videoWrapper')).toHaveLength(1);
    wrapper = shallow(<VideoComponent {...props} image={null} overrideImageUrl={null} />);
    wrapper = shallow(wrapper.prop('children')());
    expect(wrapper.find('.videoWrapper')).toHaveLength(1);
    storeHelpers.getContentType.mockReturnValue('soccermatch');
    wrapper = shallow(<VideoComponent {...props} image={null} settings={{ soccerMatch: { image: { url: 'tudPromo.jpg' } } }} />);
    wrapper = shallow(wrapper.prop('children')());
    expect(wrapper.find('.videoWrapper')).toHaveLength(1);
    wrapper = shallow(<VideoComponent {...props} image={null} settings={{ soccerMatch: { image: { url: 'uni.jpg', title: 'Univision Fallback Image' } } }} />);
    wrapper = shallow(wrapper.prop('children')());
    expect(wrapper.find('.videoWrapper')).toHaveLength(1);
  });

  it('should not call initPlayer if fmg is ready', () => {
    delete props.nodeId;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().initPlayer = jest.fn();
    wrapper.instance().setListeners = jest.fn();
    wrapper.instance().fmgReady = true;
    wrapper.instance().initVideo();

    expect(wrapper.instance().initPlayer).not.toBeCalled();
  });

  it('should render as expected without node id prop', () => {
    delete props.nodeId;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().initPlayer = jest.fn();
    wrapper.instance().setListeners = jest.fn();
    wrapper.instance().fmgReady = false;
    wrapper.instance().initVideo();

    expect(wrapper.instance().initPlayer).toBeCalled();
  });

  it('should call `onPlayerReady` if goes to video layout', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().initPlayer = jest.fn();
    wrapper.instance().setListeners = jest.fn();
    wrapper.instance().onPlayerReady = jest.fn();
    wrapper.instance().fmgReady = false;
    wrapper.instance().isVideoLayout = true;
    wrapper.instance().initted = true;
    wrapper.instance().initVideo();

    expect(wrapper.instance().onPlayerReady).toBeCalled();
  });

  it('should render as expected without node id prop', () => {
    delete props.nodeId;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().fmgReady = false;
    wrapper.instance().initVideo();

    expect(wrapper.instance().initted).toBe(true);
  });

  it('should not call initPlayer if fmg is ready', () => {
    delete props.nodeId;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().initted = false;
    wrapper.instance().setListeners = jest.fn();
    wrapper.instance().fmgReady = true;
    expect(wrapper.instance().initted).toBe(false);
    wrapper.instance().initPlayer();
    expect(wrapper.instance().initted).toBe(true);
  });

  it('should call appropriate sdk method from initPlayer - playVOD', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    const video = shallow(wrapper.prop('children')());
    wrapper.instance().initPlayer();
    expect(video.find(VideoMetadata)).toHaveLength(1);
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      autoplay: 'viewable',
    }));
  });

  it('should not load the SDK if was loaded on the page load', async () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    global.document.addEventListener = jest.fn();

    await wrapper.instance().componentDidMount();
    expect(global.document.addEventListener).not.toBeCalledWith('FMGReady', wrapper.instance().initVideo);
  });

  it('should add scroll event if there is not other listener active', () => {
    global.document.addEventListener = jest.fn();

    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().scrollEvent = false;
    wrapper.instance().addScrollEvent();
    expect(global.document.addEventListener).toBeCalledWith('scroll', wrapper.instance().enableAnchorVideo);
  });

  it('should not add scroll event if there is another listener active', () => {
    global.document.addEventListener = jest.fn();

    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().scrollEvent = true;
    wrapper.instance().addScrollEvent();
    expect(global.document.addEventListener).not.toBeCalledWith('scroll', wrapper.instance().enableAnchorVideo);
  });

  it('should add scroll event on play', () => {
    const wrapper = shallow(<VideoComponent {...props} disableAnchor />);
    wrapper.instance().addScrollEvent = jest.fn();
    wrapper.instance().onPlay();

    expect(wrapper.instance().addScrollEvent).toBeCalled();
  });

  it('should remove scroll event on onPause', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().removeScrollEvent = jest.fn();
    wrapper.instance().onPause();

    expect(wrapper.instance().removeScrollEvent).toBeCalled();
  });

  it('should remove scroll event on onComplete', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().removeScrollEvent = jest.fn();
    wrapper.instance().onComplete();

    expect(wrapper.instance().removeScrollEvent).toBeCalled();
  });

  it('should remove listeners on unmount', () => {
    global.document.removeEventListener = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().getPlayerInstance = jest.fn(() => ({
      remove: jest.fn(),
    }));
    wrapper.instance().removeScrollEvent = jest.fn();
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().removeScrollEvent).toBeCalled();
  });

  it('should remove listener if exist', () => {
    global.document.removeEventListener = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().scrollEvent = true;
    wrapper.instance().removeScrollEvent();
    expect(global.document.removeEventListener).toBeCalled();
  });

  it('should not call jwPlayerInstance.trigger if play button is not clicked', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    jwPlayerInstance.trigger = jest.fn();
    wrapper.instance().onPlayerReady();
    expect(jwPlayerInstance.trigger).not.toBeCalled();
  });

  it('should call onSDKReady if it exists', () => {
    props.onSdkReady = jest.fn();

    const wrapper = shallow(<VideoComponent {...props} autoplay />);
    wrapper.instance().initPlayer = jest.fn();
    wrapper.instance().setListeners = jest.fn();
    wrapper.instance().initVideo();

    expect(wrapper.instance().props.onSdkReady).toBeCalled();
  });

  it('should not call onSDKReady if it doesnt exists', () => {
    props.onSdkReady = undefined;

    const wrapper = shallow(<VideoComponent {...props} autoplay />);
    wrapper.instance().initPlayer = jest.fn();
    wrapper.instance().setListeners = jest.fn();
    wrapper.instance().initVideo();

    expect(wrapper.instance().props.onSdkReady).toBeUndefined();
  });

  it('should autoplay on sections when first video and no anchor or playing player', () => {
    videoUtils.isPlayerBufferingOrPlaying.mockReturnValue(false);
    videoUtils.isAnyPlayerPlaying.mockReturnValue(false);
    document.body.innerHTML = `
      <div data-nodeiduvn="player-123"></div>
      <div data-nodeiduvn="player-234"></div>
    `;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().nodeId = 'player-123';
    wrapper.instance().isSection = true;
    expect(wrapper.instance().shouldAutoPlay()).toBe('viewable');
  });

  it('should autoplay second player if first is channel strip playing', () => {
    videoUtils.isPlayerBufferingOrPlaying.mockReturnValue(false);
    videoUtils.isAnyPlayerPlaying.mockReturnValue('channelstrip-1234');
    document.body.innerHTML = `
      <div data-nodeiduvn="channelstrip-1234" id="blabla"></div>
      <div data-nodeiduvn="player-234" id="blabla2"></div>
    `;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().nodeId = 'player-234';
    wrapper.instance().isSection = true;
    expect(wrapper.instance().shouldAutoPlay()).toBe('viewable');
  });

  it('should autoplay if skipPause is provided', () => {
    videoUtils.isPlayerBufferingOrPlaying.mockReturnValue(true);
    videoUtils.isAnyPlayerPlaying.mockReturnValue('channelstrip-1234');
    document.body.innerHTML = `
      <div data-nodeiduvn="channelstrip-1234" id="blabla"></div>
      <div data-nodeiduvn="player-234" id="blabla2"></div>
    `;
    const wrapper = shallow(<VideoComponent {...props} skipPause />);
    wrapper.instance().nodeId = 'player-987';
    wrapper.instance().isSection = true;
    expect(wrapper.instance().shouldAutoPlay()).toBe('viewable');
  });

  it('should not autoplay if no skipPause and no same id', () => {
    videoUtils.isPlayerBufferingOrPlaying.mockReturnValue(false);
    videoUtils.isAnyPlayerPlaying.mockReturnValue(false);
    document.body.innerHTML = `
      <div data-nodeiduvn="player-1234" id="blabla"></div>
      <div data-nodeiduvn="player-567" id="blabla2"></div>
    `;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().nodeId = 'player-567';
    wrapper.instance().isSection = true;
    expect(wrapper.instance().shouldAutoPlay()).toBe(false);
  });

  it('should autoplay if first widget and no channelstrip', () => {
    videoUtils.isPlayerBufferingOrPlaying.mockReturnValue(false);
    videoUtils.isAnyPlayerPlaying.mockReturnValue(false);
    document.body.innerHTML = `
      <div data-nodeiduvn="player-1234" id="blabla"></div>
      <div data-nodeiduvn="player-567" id="blabla2"></div>
    `;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().nodeId = 'player-1234';
    wrapper.instance().isSection = true;
    expect(wrapper.instance().shouldAutoPlay(true)).toBe('viewable');
  });

  it('should not autoplay if a casting session is enabled', () => {
    const wrapper = shallow(<VideoComponent {...props} isCastingEnabled />);
    expect(wrapper.instance().shouldAutoPlay()).toBe(false);
  });

  it('should set casting to true if persisting player', () => {
    const wrapper = shallow(<VideoComponent {...props} isCastingEnabled />);
    const instance = wrapper.instance();
    instance.setState = jest.fn();
    instance.context = {
      store: {
        getState: () => ({
          video: {
            castingEnabled: true,
            castingNodeId: 'player',
          },
        }),
      },
    };
    instance.nodeId = 'player';
    instance.initted = true;
    instance.componentDidMount();

    expect(instance.setState).toBeCalledWith({ casting: true });
  });

  it('should not pause player if has skipPause', () => {
    videoUtils.pauseAnyPlayerPlaying = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} skipPause />);
    wrapper.instance().onPlay();
    expect(videoUtils.pauseAnyPlayerPlaying).not.toBeCalled();
  });

  it('should set up the playlistItem listener from onPlayerReady', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().onPlayerReady();
    wrapper.instance().jumpToPlaylistItem = jest.fn();
    expect(jwPlayerInstance.on).toBeCalledWith('complete', wrapper.instance().onComplete);

    jwPlayerInstance.on.mockClear();
    wrapper.instance().playerReady = false;
    wrapper.instance().jumpToPlaylistItem = jest.fn();
    wrapper.setProps({ playlistItem: 1 });
    wrapper.instance().togglePlayPause = jest.fn();
    wrapper.setProps({ autoplay: true });
    wrapper.instance().onPlayerReady();
    jwPlayerInstance.on.mockReset();
    wrapper.instance().playerReady = false;
    videoUtils.getPlayerInstance.mockReturnValueOnce(false);
    videoUtils.doIfPlayerExists.mockImplementationOnce(() => false);
    wrapper.instance().onPlayerReady();
    expect(jwPlayerInstance.on).not.toBeCalled();

    wrapper.instance().playerReady = true;
    wrapper.instance().onPlayerReady();
    expect(jwPlayerInstance.on).not.toBeCalled();
  });

  it('should toggle the player if required and invokes onNext prop from onSdkPlaylistItem', () => {
    props.onNext = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().isCastingActive = true;
    wrapper.instance().playlistItemSent = false;
    wrapper.instance().playlistInitialized = true;
    wrapper.instance().dispatchEnableCast = jest.fn();
    wrapper.instance().onSdkPlaylistItem({ index: 0, item: 'item' });
    expect(wrapper.instance().dispatchEnableCast).toBeCalled();
  });

  it('should toggle the player if required and invokes onNext prop from onSdkPlaylistItem', () => {
    props.onNext = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().onSdkPlaylistItem({ index: 0, item: 'item' });
    expect(props.onNext).not.toBeCalled();
    expect(wrapper.instance().playlistInitialized).toBe(true);
    wrapper.instance().onSdkPlaylistItem({ index: 1, item: 'item' });
    expect(props.onNext).toBeCalledWith(1);
    wrapper.setProps({ onNext: null });
    wrapper.instance().jumpToPlaylistItem(1);
    expect(wrapper.instance().playlistInitialized).toBe(true);
  });

  it('should not call onNext if it doesnt exist', () => {
    props.onNext = undefined;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().onSdkPlaylistItem({ index: 0, item: 'item' });
    expect(props.onNext).toBeUndefined();
    expect(wrapper.instance().playlistInitialized).toBe(true);
    wrapper.instance().onSdkPlaylistItem({ index: 1, item: 'item' });
    expect(props.onNext).toBeUndefined();
    wrapper.setProps({ onNext: null });
    wrapper.instance().jumpToPlaylistItem(1);
    expect(wrapper.instance().playlistInitialized).toBe(true);
  });

  it('should call FMG.trigger from onSdkPlaylistItem when is a playlist', () => {
    props.onNext = jest.fn();
    props.mcpid = [1, 2, 3];

    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().initPlayer();

    wrapper.instance().playlist = true;
    wrapper.instance().playlistInitialized = true;
    wrapper.instance().onSdkPlaylistItem({ index: 0 });
    expect(wrapper.instance().playlist).toEqual(true);
  });

  it('should call on play prop from onPlay', () => {
    props.onPlay = jest.fn();

    const wrapper = shallow(<VideoComponent {...props} closeMediaPlayer={jest.fn} />);
    wrapper.instance().onPlay();
    expect(props.onPlay).toBeCalled();
  });

  it('should not pause if nodeId is equal than stored id', () => {
    props.storePlayingData = jest.fn();
    props.nodeId = 'id';
    const wrapper = shallow(<VideoComponent {...props} />);
    jwPlayerInstance.pause = jest.fn();
    wrapper.instance().updateAnchoredState = jest.fn();
    wrapper.instance().onPlay();
    expect(wrapper.instance().updateAnchoredState).not.toBeCalled();
  });

  it('should not call storePlayingNodeId if nodeId not stored yet ', () => {
    Store.dispatch(action(null, value => value));
    props.storePlayingData = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().onPause();

    expect(props.storePlayingData).not.toBeCalled();
  });

  it('should not dispatch resize event from enableAnchorVideo if its same anchored state', async () => {
    props.storePlayingData = jest.fn();

    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.setState({ anchored: false });

    await wrapper.instance().componentDidMount();
    wrapper.instance().onPlay();

    const spyResize = spyOn(global.window, 'dispatchEvent');
    wrapper.instance().enableAnchorVideo();
    expect(spyResize).not.toHaveBeenCalled();
  });

  it('should call shouldPauseWhenNoAnchor if allowAnchor is disabled', () => {
    props.storePlayingData = jest.fn();
    props.allowAnchor = false;
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().node = {};
    wrapper.instance().shouldPauseWhenNoAnchor = jest.fn();
    wrapper.instance().enableAnchorVideo();
    expect(wrapper.instance().shouldPauseWhenNoAnchor).toBeCalled();
  });

  it('should not enable anchor video if node not available', () => {
    props.storePlayingData = jest.fn();
    props.allowAnchor = true;

    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().enableAnchorVideo();
    expect(wrapper.instance().node).toBeFalsy();
  });

  it('should listen for playerReady event', () => {
    videoUtils.isVideoPlaying = jest.fn(() => null);
    props.setListeners = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().initVideo();
    wrapper.instance().setListeners();
    expect(props.setListeners).toBeCalled();
    expect(global.window.FMG.on).toBeCalledWith('playerReady', wrapper.instance().onPlayerReady, props.nodeId);
  });

  it('should set up the onPlay listener from onPlayerReady ', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().onPlayerReady();
    wrapper.instance().jumpToPlaylistItem = jest.fn();
    expect(jwPlayerInstance.on).toBeCalledWith('play adPlay', wrapper.instance().onPlay);
  });

  it('should set up the onPause listener from onPlayerReady', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().onPlayerReady();
    wrapper.instance().jumpToPlaylistItem = jest.fn();
    expect(jwPlayerInstance.on).toBeCalledWith('pause adPause', wrapper.instance().onPause);
  });

  it('should call jumpToPlaylistItem when playlistItem prop changes (if not auto played)', () => {
    const wrapper = mount(
      <VideoComponent {...props} playlistClicked setPlaylistClicked={jest.fn} />
    );
    wrapper.instance().jumpToPlaylistItem = jest.fn();
    wrapper.setProps({ playlistItem: 1 });
    expect(wrapper.instance().jumpToPlaylistItem).toBeCalledWith(1);

    wrapper.instance().jumpToPlaylistItem.mockReset();
    wrapper.setProps({ foo: 'bar' });
    expect(wrapper.instance().jumpToPlaylistItem).not.toBeCalled();
  });

  it('should reload the player when reloadPlayer prop is true or language changes', () => {
    const wrapper = mount(<VideoComponent {...props} />);
    wrapper.instance().callPlayer = jest.fn();
    wrapper.setProps({ reloadPlayer: true });
    expect(wrapper.instance().callPlayer).toBeCalled();
    expect(wrapper.instance().playerReloaded).toBeTruthy();
    wrapper.setProps({ language: 'en' });
    wrapper.update();
    expect(wrapper.instance().callPlayer).toBeCalled();
  });

  it('should render placeholder wrapper', () => {
    features.video.isVideoLayout = jest.fn(() => false);
    const wrapper = mount(<VideoComponent {...props} />);
    wrapper.setState({ contentPlaying: true });
    wrapper.instance().callPlayer = jest.fn();
    wrapper.update();
    expect(wrapper.find('Video__PlaceholderWrapper')).toBeDefined();
  });

  it('should render placeholder wrapper', () => {
    features.video.isVideoLayout = jest.fn(() => true);
    const wrapper = mount(<VideoComponent {...props} />);
    wrapper.setState({ contentPlaying: false });
    wrapper.instance().callPlayer = jest.fn();
    wrapper.update();
    expect(wrapper.find('Video__PlaceholderWrapper')).toBeDefined();
  });

  it('should execute jumpToPlaylistItem as expected', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    const playlistItem = jest.fn();
    const player = {
      playlistItem,
      id: props.nodeId,
    };
    videoUtils.getPlayerInstance = jest.fn(() => player);
    videoUtils.doIfPlayerExists = jest.fn((nodeId, fn) => {
      fn(player);
    });
    wrapper.instance().togglePlayPause = jest.fn();
    wrapper.instance().jumpToPlaylistItem(1);
    expect(global.window.FMG.trigger).toBeCalledWith('video_playlist_page.click_item', null, 1, props.nodeId);

    wrapper.instance().togglePlayPause.mockReset();
    wrapper.instance().jumpToPlaylistItem(1);

    playlistItem.mockReset();
    wrapper.instance().jumpToPlaylistItem();
    expect(playlistItem).not.toBeCalled();
    expect(wrapper.instance().togglePlayPause).not.toBeCalled();
    videoUtils.getPlayerInstance.mockReturnValueOnce(false);
    expect(() => wrapper.instance().jumpToPlaylistItem(1)).not.toThrow();
  });

  it('should add event listeners for playlistInitialized', () => {
    const player = { on: jest.fn() };
    videoUtils.doIfPlayerExists = jest.fn((_, fn) => { fn(player); });
    props.onPlaylistInitialized = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);

    wrapper.instance().initVideo();
    wrapper.instance().setListeners();
    expect(global.window.FMG.on).toBeCalledWith(
      'playlistInitialized',
      wrapper.instance().onPlaylistInitialized,
      props.nodeId
    );

    wrapper.instance().onPlaylistInitialized(props);
    expect(wrapper.instance().playlistInitialized).toEqual(true);
  });

  it('should call pauseAnyPlayerPlaying for onPauseShareClick', () => {
    videoUtils.pauseAnyPlayerPlaying = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().onPauseShareClick();
    expect(videoUtils.pauseAnyPlayerPlaying).toBeCalled();
  });

  it('should call the custom function from fmgCall if available', () => {
    const wrapper = shallow(<VideoComponent {...props} isPlaylist fmgCall={{ name: 'playLivestream', custom: jest.fn() }} />);
    wrapper.setProps({ multitab: true, mcpid: [123, 321] });
    wrapper.instance().initPlayer();
    expect(wrapper.instance().props.fmgCall.custom).toBeCalled();
  });

  it('should call the proper SDK function without arguments', () => {
    const wrapper = shallow(<VideoComponent {...props} fmgCall={{ name: 'playLivestream' }} />);
    wrapper.setProps({ multitab: true, mcpid: [123, 321] });
    wrapper.instance().initPlayer();
    expect(global.window.FMG.callFn).toBeCalledWith('playLivestream', expect.objectContaining({
      autoplay: 'viewable',
    }));
  });

  it('should return false if player is already instantiated', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().initted = true;
    const result = wrapper.instance().initPlayer();
    expect(result).toBe(false);
  });

  it('should call the proper SDK function with autoplay muted arguments', () => {
    Features.video.isSection.mockReturnValueOnce(true);
    videoUtils.isAnyPlayerPlaying = jest.fn(() => false);
    const wrapper = shallow(<VideoComponent {...props} fmgCall={{ name: 'playVOD' }} />);
    wrapper.instance().fmgOptions = jest.fn();
    wrapper.instance().callPlayer({});
    expect(wrapper.instance().fmgOptions).toHaveBeenCalledWith({
      dynamicPlaylist: false,
      mute: true,
    });
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      autoplay: 'viewable',
      mute: true,
    }));
  });

  it('should call the proper SDK function with autoplay on arguments if no check for muted ads', () => {
    props.autoplay = true;

    const wrapper = shallow(<VideoComponent {...props} fmgCall={{ name: 'playVOD' }} />);
    wrapper.instance().callPlayer({});
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      autoplay: 'viewable',
    }));
  });

  it('should call the proper SDK function with preload on video layouts', () => {
    features.video.isVideoLayout = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} fmgCall={{ name: 'playVOD' }} />);
    wrapper.instance().callPlayer({});
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      preload: 'auto',
    }));
  });

  it('should call the proper SDK function without preload on video layouts', () => {
    features.video.isVideoLayout = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} fmgCall={{ name: 'playVOD' }} />);
    wrapper.instance().callPlayer({});
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      preload: undefined,
    }));
  });

  it('should call the proper SDK function with arguments', () => {
    const wrapper = shallow(<VideoComponent {...props} fmgCall={{ name: 'playLivestream', options: { foo: 'bar' } }} />);
    wrapper.setProps({ multitab: true, mcpid: [123, 321] });
    wrapper.instance().initPlayer();
    expect(global.window.FMG.callFn).toBeCalledWith('playLivestream', expect.objectContaining({
      preload: undefined,
    }));
  });

  it('should set up ref on mount', () => {
    const wrapper = mount(<VideoComponent {...props} />);
    expect(wrapper.instance().node).toBeDefined();
  });

  it('should hook instance into parent component', () => {
    const props2 = props;
    props2.onVideo = jest.fn(instance => instance);

    const wrapper = shallow(<VideoComponent {...props2} />);
    const { onVideo } = wrapper.instance().props;
    expect(onVideo).toEqual(props2.onVideo);
  });

  it('onPlayerReady -> FMG.SDKPlaylistItem -> onSdkPlaylistItem', () => {
    const wrapper = shallow(<VideoComponent {...props} />);

    spyOn(wrapper.instance(), 'onSdkPlaylistItem');
    spyOn(global.window.FMG, 'on');

    wrapper.instance().playerReady = true;
    wrapper.instance().onPlayerReady();

    const item = {
      index: 1,
      mcpId: '333',
    };

    global.window.FMG.on('SDKPlaylistItem', { item }, props.nodeId);

    expect(global.window.FMG.on).toBeCalled();
  });

  it('callPlayer + JW recs', () => {
    const props2 = props;
    props2.pageData = {
      data: {
        jwRecommendationChannel: '987',
      },
    };

    const wrapper = shallow(<VideoComponent {...props2} />);
    spyOn(global.window.FMG, 'callFn');
    wrapper.instance().playerReady = true;
    wrapper.instance().onPlayerReady();
    wrapper.instance().initVideo();

    expect(wrapper.instance().props.pageData.data.jwRecommendationChannel)
      .toEqual(props2.pageData.data.jwRecommendationChannel);
  });

  it('maps state to props correctly', () => {
    const state = {
      video: {
        anchored: true,
        playlistClicked: null,
        isCastingEnabled: undefined,
      },
      user: {
        userId: undefined,
      },
    };

    expect(stateToProps(state)).toEqual({
      ...state.user,
      ...state.video,
    });
  });

  it('should props are equals', () => {
    const prevProps = {
      anchored: true,
      playlistClicked: true,
    };

    const nextProps = {
      anchored: true,
      playlistClicked: true,
    };

    expect(areStatePropsEqual(nextProps, prevProps)).toBe(true);
  });

  it('should props aren`t equals', () => {
    const prevProps = {
      anchored: true,
      playlistClicked: false,
    };

    const nextProps = {
      anchored: true,
      playlistClicked: true,
    };

    expect(areStatePropsEqual(nextProps, prevProps)).toBe(false);
  });

  it('should send casting receiver id when feature flag is enabled', () => {
    features.video.enableCasting.mockReturnValue(true);
    const wrapper = shallow(<VideoComponent {...props} />);
    const video = shallow(wrapper.prop('children')());
    wrapper.instance().initPlayer();
    expect(video.find(VideoMetadata)).toHaveLength(1);
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      castingReceiverId: 'test',
    }));
  });

  it('should not send casting receiver id when feature flag is disabled', () => {
    features.video.enableCasting.mockReturnValue(false);
    const wrapper = shallow(<VideoComponent {...props} />);
    const video = shallow(wrapper.prop('children')());
    wrapper.instance().initPlayer();
    expect(video.find(VideoMetadata)).toHaveLength(1);
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      castingReceiverId: false,
    }));
  });

  it('should send casting platform when feature flag is enabled', () => {
    features.video.enableCasting.mockReturnValue(true);
    const wrapper = shallow(<VideoComponent {...props} />);
    const video = shallow(wrapper.prop('children')());
    wrapper.instance().initPlayer();
    expect(video.find(VideoMetadata)).toHaveLength(1);
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      castingPlatform: 'test',
    }));
  });

  it('should not send casting platform when feature flag is disabled', () => {
    features.video.enableCasting.mockReturnValue(false);
    const wrapper = shallow(<VideoComponent {...props} />);
    const video = shallow(wrapper.prop('children')());
    wrapper.instance().initPlayer();
    expect(video.find(VideoMetadata)).toHaveLength(1);
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      castingPlatform: undefined,
    }));
  });
});

describe('Video Playlist Override Tests', () => {
  it('should use custom video playlist if supplied', () => {
    const playlistOverrideProps = Object.assign({}, props);
    playlistOverrideProps.pageData = {
      data: {
        jwRecommendationChannel: '78MDrZDv',
        dynamicPlaylist: true,
        hasCustomPlaylist: true,
        videoPlaylist: [
          { mcpId: '456' },
          { mcpId: '789' },
        ],
      },
    };
    const wrapper = shallow(<VideoComponent {...playlistOverrideProps} />);
    wrapper.instance().initVideo();
    expect(wrapper.instance().props.pageData).toEqual(playlistOverrideProps.pageData);
  });
  it('should use custom video playlist even if no mcpId is supplied as prop', () => {
    const playlistOverrideProps = Object.assign({}, props);
    playlistOverrideProps.pageData = {
      data: {
        jwRecommendationChannel: '78MDrZDv',
        hasCustomPlaylist: true,
        videoPlaylist: [
          { mcpId: '456' },
          { mcpId: '789' },
        ],
      },
    };
    const wrapper = shallow(<VideoComponent {...playlistOverrideProps} />);
    console.error = jest.fn(); // eslint-disable-line no-console
    wrapper.setProps({ mcpid: undefined });
    wrapper.instance().initVideo();
    expect(wrapper.instance().props.pageData).toEqual(playlistOverrideProps.pageData);
  });

  it('should render VideoPlaceholder', () => {
    let wrapper = shallow(<VideoComponent {...props} autoplay />);
    wrapper = shallow(wrapper.prop('children')());
    expect(wrapper.find('VideoPlaceholder')).toHaveLength(1);
  });

  it('should render VideoPlaceholder without background image on video layouts', () => {
    Features.video.isVideoLayout.mockReturnValue('video');
    props.isActive = false;
    let wrapper = shallow(<VideoComponent {...props} autoplay />);
    wrapper = shallow(wrapper.prop('children')());
    expect(wrapper.find('VideoPlaceholder').props()).toEqual(expect.objectContaining({
      backgroundImageOverrideUrl: null,
      image: null,
      isPlayerReady: false,
    }));
  });
});

describe('Video Native PIP', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should load native pip', () => {
    global.document.addEventListener = jest.fn();
    jest.spyOn(features.video, 'enableNativePip').mockImplementation(() => true);
    jest.spyOn(videoUtils, 'isPipSupported').mockImplementation(() => true);
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    utils.isInViewport = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.setState({ contentPlaying: false });
    const instance = wrapper.instance();
    instance.enableAnchorVideo = jest.fn();
    instance.initted = false;
    instance.componentDidMount();
    Object.defineProperty(document, 'hidden', { value: true, writable: true });
    instance.triggerNativePIP({ viewable: false });
    expect(global.window.FMG.trigger).toBeCalledWith('Video.onPIPUpdate', null, { load: true }, props.nodeId);
  });

  it('should load native pip if video is not playing', () => {
    global.document.addEventListener = jest.fn();
    utils.isInViewport = jest.fn(() => true);
    jest.spyOn(features.video, 'enableNativePip').mockImplementation(() => true);
    jest.spyOn(videoUtils, 'isPipSupported').mockImplementation(() => true);
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => false);
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.enableAnchorVideo = jest.fn();
    instance.initted = false;
    instance.componentDidMount();
    Object.defineProperty(document, 'hidden', { value: true, writable: true });
    instance.triggerNativePIP({ viewable: false });
    expect(global.window.FMG.trigger).toBeCalled();
  });

  it('should remove native pip on video layouts if player visible', () => {
    global.document.addEventListener = jest.fn();
    jest.spyOn(features.video, 'enableNativePip').mockImplementation(() => true);
    jest.spyOn(videoUtils, 'isPipSupported').mockImplementation(() => true);
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.enableAnchorVideo = jest.fn();
    instance.initted = true;
    instance.isVideoLayout = true;
    instance.componentDidMount();
    instance.triggerNativePIP({ viewable: true });
    expect(global.window.FMG.trigger).toBeCalledWith('Video.onPIPUpdate', null, { load: false }, props.nodeId);
  });

  it('should remove native pip if player visible and was anchored', () => {
    global.document.addEventListener = jest.fn();
    jest.spyOn(features.video, 'enableNativePip').mockImplementation(() => true);
    jest.spyOn(videoUtils, 'isPipSupported').mockImplementation(() => true);
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.initted = false;
    instance.anchored = true;
    instance.enableAnchorVideo = jest.fn();
    instance.componentDidMount();
    instance.triggerNativePIP({ viewable: true });
    expect(global.window.FMG.trigger).toBeCalledWith('Video.onPIPUpdate', null, { load: false }, props.nodeId);
  });

  it('should not remove native pip if player was not anchored', () => {
    global.document.addEventListener = jest.fn();
    jest.spyOn(features.video, 'enableNativePip').mockImplementation(() => true);
    jest.spyOn(videoUtils, 'isPipSupported').mockImplementation(() => true);
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.initted = false;
    instance.anchored = false;
    instance.enableAnchorVideo = jest.fn();
    instance.componentDidMount();
    instance.triggerNativePIP({ viewable: true });
    expect(global.window.FMG.trigger).toBeCalled();
  });

  it('should set state as playing only on play, not ad', () => {
    videoUtils.pauseAnyPlayerPlaying = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.addScrollEvent = jest.fn();
    instance.setState = jest.fn();
    instance.enableAnchorVideo = jest.fn();
    instance.componentDidMount();
    instance.onTime();
    expect(instance.setState).toBeCalledWith({ playing: true });
  });

  it('should pause radio player if video is unmuted and playing', () => {
    videoUtils.pauseAnyPlayerPlaying = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    Store.dispatch(playRadio({ abacastId: 1 }));
    wrapper.setState({ casting: true });
    jwPlayerInstance.getState = jest.fn(() => 'playing');
    wrapper.instance().onMute({
      type: 'mute',
      mute: false,
    });
    expect(videoUtils.pauseAnyPlayerPlaying).toBeCalled();
    expect(jwPlayerInstance.setVolume).toBeCalledWith(100);
  });

  it('should not pause radio player if video is muted and playing', () => {
    videoUtils.pauseAnyPlayerPlaying = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    Store.dispatch(playRadio({ abacastId: 1 }));
    jwPlayerInstance.getState = jest.fn(() => 'playing');
    wrapper.setState({ casting: true });
    wrapper.instance().onMute({
      type: 'mute',
      mute: true,
    });
    expect(videoUtils.pauseAnyPlayerPlaying).not.toBeCalled();
    expect(jwPlayerInstance.setVolume).toBeCalledWith(0);
  });

  it('should not pause radio player if video is unmuted and not playing', () => {
    videoUtils.pauseAnyPlayerPlaying = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    Store.dispatch(playRadio({ abacastId: 1 }));
    jwPlayerInstance.getState = jest.fn(() => 'paused');
    wrapper.instance().onMute({
      type: 'mute',
      mute: false,
    });
    expect(videoUtils.pauseAnyPlayerPlaying).not.toBeCalled();
  });

  it('should do nothing if native pip flag is not enabled', () => {
    jest.spyOn(features.video, 'enableNativePip').mockImplementation(() => false);
    jest.spyOn(videoUtils, 'isPipSupported').mockImplementation(() => false);
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.enableAnchorVideo = jest.fn();
    instance.componentDidMount();
    expect(instance.triggerNativePIP({ viewable: true })).toBe(undefined);
  });

  it('should do nothing if native pip flag is not enabled', () => {
    jest.spyOn(features.video, 'enableNativePip').mockImplementation(() => false);
    jest.spyOn(videoUtils, 'isPipSupported').mockImplementation(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.enableAnchorVideo = jest.fn();
    instance.componentDidMount();
    expect(instance.triggerNativePIP({ viewable: true })).toBe(undefined);
  });

  it('should set onblur and onfocus events', () => {
    jest.spyOn(features.video, 'enableNativePip').mockImplementation(() => false);
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.enableAnchorVideo = jest.fn();
    instance.componentDidMount();
    const tmpWindow = global.window;
    delete global.window;
    instance.setPlayerEvents({ on: jest.fn(), once: jest.fn() });
    expect(global.window).not.toBeDefined();
    global.window = tmpWindow;
  });
});

describe('Video PIP Multiplayer tests', () => {
  beforeEach(() => {
    Store.dispatch(playRadio({ abacastId: null }));
    jest.resetAllMocks();
  });

  it('should call onPlaylistInitialized if playlist available from other initialize', () => {
    document.getElementById = jest.fn(() => null);
    ReactDOM.render = jest.fn();
    videoUtils.isWrapperAvailable = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    videoUtils.getPlayerPlaylist = jest.fn(() => ([{}]));
    wrapper.instance().onPlaylistInitialized = jest.fn();
    wrapper.instance().initted = true;
    wrapper.instance().initVideoWrapperLogic();
    expect(wrapper.instance().onPlaylistInitialized).toBeCalled();
  });

  it('should not call onPlaylistInitialized if video exist from other component', () => {
    document.getElementById = jest.fn(() => null);
    ReactDOM.render = jest.fn();
    videoUtils.isWrapperAvailable = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    videoUtils.getPlayerPlaylist = jest.fn(() => null);
    wrapper.instance().onPlaylistInitialized = jest.fn();
    wrapper.instance().initted = true;
    wrapper.instance().createPIPWrapperElement();
    expect(wrapper.instance().onPlaylistInitialized).not.toBeCalled();
  });

  it('should not call onPlaylistInitialized if playlist not available', () => {
    document.getElementById = jest.fn(() => null);
    ReactDOM.render = jest.fn();
    videoUtils.isWrapperAvailable = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    videoUtils.getPlayerPlaylist = jest.fn(() => null);
    wrapper.instance().onPlaylistInitialized = jest.fn();
    wrapper.instance().initted = true;
    wrapper.instance().initVideoWrapperLogic(true);
    expect(wrapper.instance().onPlaylistInitialized).not.toBeCalled();
  });

  it('should not call onPlaylistInitialized if playlist not available', () => {
    document.getElementById = jest.fn(() => null);
    ReactDOM.render = jest.fn();
    videoUtils.isWrapperAvailable = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    videoUtils.getPlayerPlaylist = jest.fn(() => null);
    wrapper.instance().onPlaylistInitialized = jest.fn();
    wrapper.instance().initted = false;
    wrapper.instance().initVideoWrapperLogic(true);
    expect(wrapper.instance().onPlaylistInitialized).not.toBeCalled();
  });

  it('should call createOrUpdatePIPPlayerElement on component initialize', () => {
    document.getElementById = jest.fn(() => ({
      appendChild: jest.fn(),
    }));
    videoUtils.isWrapperAvailable = jest.fn(() => false);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().createOrUpdatePIPPlayerElement = jest.fn();
    wrapper.instance().initVideoWrapperLogic();
    expect(wrapper.instance().createOrUpdatePIPPlayerElement).toBeCalled();
  });

  it('should not call appendChild if element do not exists', () => {
    document.getElementById = jest.fn(() => null);
    document.appendChild = jest.fn();
    videoUtils.isWrapperAvailable = jest.fn(() => false);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().createOrUpdatePIPPlayerElement = jest.fn();
    wrapper.instance().createPIPWrapperElement();
    expect(document.appendChild).not.toBeCalled();
  });

  it('should set position if element exists', () => {
    const element = {
      style: {},
    };
    document.getElementById = jest.fn(() => null);
    videoUtils.getWrapperElement = jest.fn(() => element);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().playerRef = {};
    videoUtils.getPlaceholderElement = jest.fn(() => ({
      getBoundingClientRect: () => ({
        width: 100,
      }),
    }));
    wrapper.instance().movePIPWrapperElement();
    expect(element.style.width).toBe('100px');
    expect(element.style.zIndex).toBe('2');
  });

  it('should not set position if element not exists', () => {
    const element = {
      style: {},
    };
    document.getElementById = jest.fn(() => null);
    videoUtils.getWrapperElement = jest.fn(() => element);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().playerRef = {};
    videoUtils.getPlaceholderElement = jest.fn(() => ({
      getBoundingClientRect: () => (null),
    }));
    wrapper.instance().movePIPWrapperElement();
    expect(element.style.width).toBeUndefined();
  });

  it('should not set position if element not exists', () => {
    const element = {
      style: {},
    };
    document.getElementById = jest.fn(() => null);
    videoUtils.getWrapperElement = jest.fn(() => null);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().playerRef = {
      getBoundingClientRect: jest.fn(() => ({
        width: 100,
      })),
    };
    wrapper.instance().movePIPWrapperElement();
    expect(element.style).toEqual({});
  });

  it('should not set anchored position if element is not anchored', () => {
    const element = {
      style: {},
    };
    document.getElementById = jest.fn(() => null);
    videoUtils.getWrapperElement = jest.fn(() => element);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().anchored = true;
    wrapper.instance().playerRef = {
      getBoundingClientRect: jest.fn(() => ({
        width: 100,
      })),
    };
    wrapper.instance().movePIPWrapperElement();
    expect(element.style).toBe(null);
  });

  it('should call remove video instance when calling delete pip wrapper', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    videoUtils.isWrapperAvailable = jest.fn(() => true);
    videoUtils.removeVideoInstance = jest.fn();
    wrapper.instance().deletePIPWrapperElement();
    expect(videoUtils.removeVideoInstance).toBeCalled();
  });

  it('should observe video placeholder', () => {
    const observer = {
      observe: jest.fn(),
    };
    Object.defineProperty(window, 'MutationObserver', { value: jest.fn(() => observer) });
    Object.defineProperty(window, 'addEventListener', { value: jest.fn() });

    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().playerRef = jest.fn(() => ({}));
    wrapper.instance().observeVideoPlaceholder();
    expect(wrapper.instance().mutationObserver).toBeDefined();
    expect(window.addEventListener).toBeCalled();
  });

  it('should observe video placeholder', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().playerRef = null;
    wrapper.instance().observeVideoPlaceholder();
    expect(wrapper.instance().mutationObserver).not.toBeDefined();
  });

  it('should set ref callback', () => {
    const element = { test: true };
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().createPIPWrapperElement = jest.fn();
    wrapper.instance().mutationObserver = true;
    wrapper.instance().mutationObserverBody = true;
    wrapper.instance().refCallback(element);
    expect(wrapper.instance().createPIPWrapperElement).toBeCalled();
    expect(wrapper.instance().playerRef.test).toBe(true);
  });

  it('should not set ref callback if no element provided', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().playerRef = null;
    wrapper.instance().createPIPWrapperElement = jest.fn();
    wrapper.instance().refCallback(null);
    expect(wrapper.instance().playerRef).toBe(null);
  });

  it('should set anchor', () => {
    ReactDOM.render = jest.fn();
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    utils.isInViewport = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().node = {
      getBoundingClientRect: jest.fn(() => ({})),
    };
    wrapper.instance().isSticky = false;
    wrapper.instance().anchored = true;
    wrapper.instance().createOrUpdatePIPPlayerElement = jest.fn();
    wrapper.instance().observeVideoPlaceholder = jest.fn();
    wrapper.instance().enableAnchorVideo();
    expect(wrapper.instance().observeVideoPlaceholder).toBeCalled();
    expect(wrapper.instance().createOrUpdatePIPPlayerElement).toBeCalled();
  });

  it('should set anchor', () => {
    ReactDOM.render = jest.fn();
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().node = {
      getBoundingClientRect: jest.fn(() => ({})),
    };
    wrapper.instance().anchored = false;
    wrapper.instance().movePIPWrapperElement = jest.fn();
    wrapper.instance().enableAnchorVideo();
    expect(wrapper.instance().movePIPWrapperElement).toBeCalled();
  });

  it('should set anchor', () => {
    ReactDOM.render = jest.fn();
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().node = {
      getBoundingClientRect: jest.fn(() => ({})),
    };
    utils.isInViewport = jest.fn(() => false);
    wrapper.instance().isSticky = false;
    wrapper.instance().anchored = false;
    videoUtils.removeAnyPlayerAnchored = jest.fn();
    wrapper.instance().enableAnchorVideo();
    expect(videoUtils.removeAnyPlayerAnchored).toBeCalled();
  });

  it('should set anchor', () => {
    ReactDOM.render = jest.fn();
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().node = {
      getBoundingClientRect: jest.fn(() => ({})),
    };
    utils.isInViewport = jest.fn(() => false);
    wrapper.instance().isSticky = true;
    wrapper.instance().anchored = false;
    wrapper.instance().movePIPWrapperElement = jest.fn();
    videoUtils.removeAnyPlayerAnchored = jest.fn();
    wrapper.instance().enableAnchorVideo();
    expect(videoUtils.removeAnyPlayerAnchored).toBeCalled();
  });

  it('should set anchor', () => {
    ReactDOM.render = jest.fn();
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().node = {
      getBoundingClientRect: jest.fn(() => ({})),
    };
    utils.isInViewport = jest.fn(() => false);
    wrapper.instance().isSticky = true;
    wrapper.instance().anchored = true;
    wrapper.instance().movePIPWrapperElement = jest.fn();
    videoUtils.removeAnyPlayerAnchored = jest.fn();
    wrapper.instance().enableAnchorVideo();
    expect(videoUtils.removeAnyPlayerAnchored).not.toBeCalled();
  });

  it('should pause when no anchorAllow and not in view', () => {
    ReactDOM.render = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().node = {
      getBoundingClientRect: jest.fn(() => ({})),
    };
    const player = {
      pause: jest.fn(),
    };
    videoUtils.doIfPlayerExists = jest.fn((nodeId, fn) => {
      fn(player);
    });
    utils.isInViewport = jest.fn(() => false);
    wrapper.instance().isSticky = false;
    wrapper.instance().shouldPauseWhenNoAnchor();
    expect(player.pause).toBeCalled();
  });

  it('should not pause when no anchorAllow and in view', () => {
    ReactDOM.render = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().node = {
      getBoundingClientRect: jest.fn(() => ({})),
    };
    const player = {
      pause: jest.fn(),
    };
    videoUtils.doIfPlayerExists = jest.fn((nodeId, fn) => {
      fn(player);
    });
    utils.isInViewport = jest.fn(() => true);
    wrapper.instance().isSticky = false;
    wrapper.instance().shouldPauseWhenNoAnchor();
    expect(player.pause).not.toBeCalled();
  });

  it('should remove observers on anchor removed', () => {
    ReactDOM.render = jest.fn();
    const wrapper = shallow(<VideoComponent {...props} />);
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    wrapper.instance().node = {
      getBoundingClientRect: jest.fn(() => ({})),
    };
    utils.isInViewport = jest.fn(() => false);
    wrapper.instance().isSticky = false;
    wrapper.instance().anchored = false;
    wrapper.instance().disconnectOberservers = jest.fn();
    wrapper.instance().enableAnchorVideo();
    expect(wrapper.instance().disconnectOberservers).toBeCalled();
  });

  it('should set disableAds true if is not DAI', () => {
    videoUtils.isAnyPlayerPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} autoplay />);
    features.video.isVodDAI = jest.fn(() => false);
    features.video.disableAds = jest.fn(() => true);
    wrapper.instance().callPlayer();
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      autoplay: false,
      disableAds: true,
    }));
  });

  it('should set disableAds false if is DAI', () => {
    videoUtils.isAnyPlayerPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} autoplay />);
    features.video.isVodDAI = jest.fn(() => true);
    features.video.disableAds = jest.fn(() => true);
    wrapper.instance().callPlayer();
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      autoplay: false,
      disableAds: false,
    }));
  });

  it('should reset mutationObserver if disconnectOberservers method is called', () => {
    const wrapper = shallow(<VideoComponent {...props} autoplay />);
    const instance = wrapper.instance();
    instance.disconnectOberservers();
    expect(instance.mutationObserver).toBeNull();
  });

  it('should set autoplay false if any other player use autoplay', () => {
    videoUtils.isAnyAutoplayPlayer = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} autoplay />);
    wrapper.instance().callPlayer();
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({ autoplay: false }));
  });

  it('should close anchor video', () => {
    const pause = jest.fn();
    videoUtils.getPlayerInstance = jest.fn(() => ({
      pause,
    }));

    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().onCloseAnchorVideo();
    expect(pause).toBeCalled();
  });

  it('should close anchor video', () => {
    global.window.videoState = { nodeId: 'player-123', anchored: true };
    const pause = jest.fn();
    videoUtils.getPlayerInstance = jest.fn(() => null);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().onCloseAnchorVideo();
    expect(pause).not.toBeCalled();
  });

  it('should add observers on close anchor video', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().observeVideoPlaceholder = jest.fn();
    wrapper.instance().onCloseAnchorVideo();
    expect(wrapper.instance().observeVideoPlaceholder).toBeCalled();
  });

  it('should update anchor state on unmount if video is playing', () => {
    videoUtils.setPlayerAnchorState = jest.fn();
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().playing = true;
    wrapper.instance().componentWillUnmount();
    expect(videoUtils.isPlayerBufferingOrPlaying).toBeCalledWith('player-123');
    expect(videoUtils.setPlayerAnchorState).toBeCalledWith('player-123', true);
  });

  it('should not move the element if is not playing', () => {
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().movePIPWrapperElement = jest.fn();
    wrapper.instance().anchored = true;
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().movePIPWrapperElement).not.toBeCalled();
  });

  it('should remove native pip experience on component unmount', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().playing = true;
    wrapper.instance().componentWillUnmount();
    expect(global.window.FMG.trigger).toBeCalledWith(
      'Video.onPIPUpdate',
      null,
      { load: false },
      props.nodeId
    );
  });

  it('should not unmount if player buffering', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().deletePIPWrapperElement = jest.fn();
    videoUtils.getPlayerCurrentState = jest.fn(() => 'buffering');
    wrapper.instance().anchored = true;
    wrapper.instance().playing = true;
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().deletePIPWrapperElement).not.toBeCalled();
  });

  it('should unmount if not playing and different page', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().deletePIPWrapperElement = jest.fn();
    videoUtils.getPlayerCurrentState = jest.fn(() => 'buffering');
    wrapper.instance().initialPath = '/test';
    wrapper.instance().playing = true;
    window.location = {
      pathname: '/test-2',
    };
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().deletePIPWrapperElement).toBeCalled();
  });

  it('should unmount', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().deletePIPWrapperElement = jest.fn();
    wrapper.instance().anchored = true;
    wrapper.instance().playing = true;
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().deletePIPWrapperElement).toBeCalled();
  });

  it('should remove observers on unmount', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().disconnectOberservers = jest.fn();
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().disconnectOberservers).toBeCalled();
  });

  it('should unmount and update wrapper if video is anchor and sticky', () => {
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().createOrUpdatePIPPlayerElement = jest.fn();
    wrapper.instance().anchored = true;
    wrapper.instance().isSticky = true;
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().createOrUpdatePIPPlayerElement).toBeCalled();
  });

  it('should create or update pip element on component update ', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().createOrUpdatePIPPlayerElement = jest.fn();
    wrapper.instance().componentDidUpdate();
    wrapper.instance().userIdSent = false;
    expect(global.window.FMG.trigger).toBeCalledWith('SDK.onUserId', null, { userId: props.userId }, props.nodeId);
    expect(wrapper.instance().createOrUpdatePIPPlayerElement).toBeCalled();
  });

  it('should remove any player on video page ', () => {
    features.video.isVideoLayout = jest.fn(() => true);
    videoUtils.removeAnyPlayerAnchored = jest.fn();
    shallow(<VideoComponent {...props} />);
    expect(videoUtils.removeAnyPlayerAnchored).toHaveBeenCalled();
  });

  it('should not call initVideo on mount', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    wrapper.instance().initVideo = jest.fn();
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().initVideo).not.toBeCalled();
  });

  it('should remove any player on video page ', () => {
    features.video.isVideoLayout = jest.fn(() => false);
    videoUtils.removeAnyPlayerAnchored = jest.fn();
    shallow(<VideoComponent {...props} />);
    expect(videoUtils.removeAnyPlayerAnchored).not.toHaveBeenCalled();
  });

  it('should not call remove video instance when calling delete pip wrapper', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    videoUtils.isWrapperAvailable = jest.fn(() => false);
    videoUtils.removeVideoInstance = jest.fn();
    wrapper.instance().deletePIPWrapperElement();
    expect(videoUtils.removeVideoInstance).not.toBeCalled();
  });

  it('should not call remove video instance when casting', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    videoUtils.isWrapperAvailable = jest.fn(() => true);
    videoUtils.removeVideoInstance = jest.fn();
    wrapper.setState({ casting: true });
    wrapper.instance().deletePIPWrapperElement();
    expect(videoUtils.removeVideoInstance).not.toBeCalled();
  });

  it('should render a wrapper element', () => {
    ReactDOM.render = jest.fn();
    const element = {
      style: {},
    };
    document.getElementById = jest.fn(() => null);
    videoUtils.getWrapperElement = jest.fn(() => element);
    const wrapper = shallow(<VideoComponent {...props} />);
    videoUtils.isWrapperAvailable = jest.fn(() => false);
    videoUtils.removeVideoInstance = jest.fn();
    wrapper.instance().createOrUpdatePIPPlayerElement();
    expect(ReactDOM.render).toBeCalled();
  });

  it('should persist video', () => {
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(<VideoComponent {...props} isNewsDigitalChannel />);
    expect(wrapper.instance().initted).toBe(true);
  });

  it('should use a right mutation observer selector', () => {
    delete process.env.APP_VERSION;
    const wrapper = shallow(<VideoComponent {...props} />);
    expect(wrapper.instance().mutationContainerSelector).toBe('#app-root');
  });

  it('should not call storePlayingNodeId on PIP', () => {
    global.window.videoState = { nodeId: 'player-123', anchored: true };
    props.storePlayingData = jest.fn();
    props.onPlay = jest.fn();

    const wrapper = shallow(<VideoComponent {...props} />);

    wrapper.instance().onPlay();
    expect(props.onPlay).toBeCalled();
    expect(props.storePlayingData).not.toBeCalled();
  });

  it('should register player events if video returns to the origin page', () => {
    features.video.isPIPMultiPlayer = jest.fn(() => true);
    const player = {
      id: props.nodeId,
    };
    videoUtils.doIfPlayerExists = jest.fn((nodeId, fn) => {
      fn(player);
    });
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.initted = true;
    instance.fmgReady = false;
    instance.setPlayerEvents = jest.fn();
    instance.initVideo();
    expect(instance.setPlayerEvents).toBeCalledWith(player);
  });

  it('should not call storePlayingNodeId on PIP if promo video', () => {
    global.window.videoState = { nodeId: 'player-123', anchored: true };
    features.video.promoVideo = jest.fn(() => true);
    props.storePlayingData = jest.fn();
    props.onPlay = jest.fn();

    const wrapper = shallow(<VideoComponent {...props} />);

    wrapper.instance().onPlay();
    expect(props.onPlay).toBeCalled();
    expect(props.storePlayingData).not.toBeCalled();
  });

  it('should render VideoPopupsWrapper Component', () => {
    features.video.isFreeVideoPreview.mockReturnValueOnce(true);
    let wrapper = shallow(<VideoComponent {...props} isLiveStream />);
    wrapper = shallow(wrapper.prop('children')());
    expect(wrapper.find(VideoPopupsWrapper)).toHaveLength(1);
  });

  it('should register scroll event on mount when player is playing', () => {
    global.document.addEventListener = jest.fn();
    videoUtils.getPlayerInstance = jest.fn().mockImplementation(() => ({
      getState: jest.fn(() => 'playing'),
    }));
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.initted = true;
    instance.componentDidMount();
    expect(global.document.addEventListener).toBeCalled();
  });

  it('should call the proper SDK function with autoplay on arguments', () => {
    const options = {
      sharing: {
        enabled: true,
      },
    };

    props.pageData = {
      theme: {
        primary: 123,
      },
    };

    Features.video.autoplayWhenVisible.mockReturnValueOnce(true);

    props.checkAutoplay = true;

    const wrapper = shallow(<VideoComponent {...props} fmgCall={{ name: 'playVOD', options }} />);
    wrapper.instance().isVideoLayout = true;
    wrapper.instance().isSection = false;
    selectors.radioAnchorSelector = jest.fn(() => ({
      abacastId: '123',
    }));
    wrapper.instance().callPlayer();
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      sharing: {
        enabled: true,
        primary: 123,
      },
      autoplay: 'viewable',
    }));
  });

  it('should call the proper SDK function with autoplay on arguments', () => {
    const options = {
      sharing: {
        enabled: true,
      },
    };

    props.pageData = {
      theme: {
        primary: 123,
      },
    };

    Features.video.autoplayWhenVisible.mockReturnValueOnce(true);

    props.checkAutoplay = true;

    const wrapper = shallow(<VideoComponent {...props} fmgCall={{ name: 'playVOD', options }} />);
    wrapper.instance().isVideoLayout = false;
    wrapper.instance().isSection = false;
    selectors.radioAnchorSelector = jest.fn(() => ({
      abacastId: '123',
    }));
    wrapper.instance().callPlayer();
    expect(global.window.FMG.callFn).toBeCalledWith('playVOD', expect.objectContaining({
      sharing: {
        enabled: true,
        primary: 123,
      },
      autoplay: 'viewable',
      mute: true,
    }));
  });

  it('should call the proper SDK function with autoplay on arguments', () => {
    global.window.FMG.getInstance.mockReturnValue({
      playerReady: true,
    });

    const wrapper = shallow(<VideoComponent {...props} />);
    expect(global.window.FMG.getInstance('nodeId').playerReady).toBe(true);
    wrapper.instance().resetReady();
    expect(global.window.FMG.getInstance('nodeId').playerReady).toBe(false);
  });
});

describe('Video Casting events', () => {
  let featureFlagSpy;
  const playerMock = {
    on: jest.fn(),
    once: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    featureFlagSpy = jest.spyOn(features.video, 'enableCasting').mockReturnValue(true);
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => false);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should not listen to on cast event if feature flag is disabled', () => {
    featureFlagSpy.mockReturnValue(false);
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();

    instance.componentDidMount();
    instance.setPlayerEvents(playerMock);

    expect(featureFlagSpy).toHaveBeenCalled();
    expect(playerMock.on).not.toHaveBeenLastCalledWith('cast', expect.any(Function));
  });

  it('should listen to on cast event when feature flag is enabled', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();

    instance.componentDidMount();
    instance.setPlayerEvents(playerMock);

    expect(featureFlagSpy).toHaveBeenCalled();
    expect(playerMock.on).toHaveBeenLastCalledWith('cast', expect.any(Function));
  });

  it('should not call any casting method', () => {
    const castingDisabled = jest.fn();
    const castingEnabled = jest.fn();
    const wrapper = shallow(
      <VideoComponent
        {...props}
        castingDisabled={castingDisabled}
        castingEnabled={castingEnabled}
      />
    );
    wrapper.instance().onCast();
    expect(castingDisabled).not.toHaveBeenCalled();
    expect(castingEnabled).not.toHaveBeenCalled();
  });

  it('should call castingDisabled method when active value is false and casting is enabled', () => {
    const castingDisabled = jest.fn();
    const event = { active: false };
    const wrapper = shallow(
      <VideoComponent
        {...props}
        castingDisabled={castingDisabled}
        isCastingEnabled
      />
    );
    wrapper.setState({ casting: true });
    const instance = wrapper.instance();
    instance.onCast(event);

    expect(castingDisabled).toHaveBeenCalled();
  });

  it('should set castingPreviously on AirPlay mobile', () => {
    const castingDisabled = jest.fn();
    const event = { active: false };
    const wrapper = shallow(
      <VideoComponent
        {...props}
        castingDisabled={castingDisabled}
        isCastingEnabled
      />
    );
    wrapper.setState({ casting: true });
    const instance = wrapper.instance();
    instance.isMobile = true;
    instance.castingPlatform = AIRPLAY;
    instance.onCast(event);

    expect(castingDisabled).toHaveBeenCalled();
    expect(instance.castingPreviously).toBe(true);
  });

  it('should call castingEnabled method when active value is true and video is either playing or buffering', () => {
    const castingEnabled = jest.fn();
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const event = { active: true };
    const wrapper = shallow(
      <VideoComponent
        {...props}
        castingEnabled={castingEnabled}
      />
    );
    const instance = wrapper.instance();

    instance.onCast(event);

    expect(castingEnabled).toHaveBeenCalled();
  });

  it('should call castingEnabled method when active value is true and video is either playing or buffering', () => {
    const castingEnabled = jest.fn();
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(
      <VideoComponent
        {...props}
        castingEnabled={castingEnabled}
      />
    );
    const instance = wrapper.instance();
    wrapper.setState({ casting: false });
    instance.dispatchEnableCast();

    expect(castingEnabled).not.toHaveBeenCalled();
  });

  it('should not delete pip wrapper element when casting session has ended on video layout', () => {
    const castingDisabled = jest.fn();
    const event = { active: false };
    const wrapper = shallow(
      <VideoComponent
        {...props}
        castingDisabled={castingDisabled}
        isCastingEnabled
      />
    );
    wrapper.setState({ casting: true });
    const instance = wrapper.instance();
    instance.isVideoLayout = true;
    instance.onCast(event);

    expect(castingDisabled).toHaveBeenCalled();
  });

  it('should reset castingKeepState value when casting session is active', () => {
    const event = {
      active: true,
      available: true,
    };
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(
      <VideoComponent
        {...props}
        isCastingEnabled
      />
    );
    wrapper.setState({
      casting: true,
    });
    const instance = wrapper.instance();
    instance.castingKeepState = true;
    instance.onCast(event);
    expect(instance.castingKeepState).toBe(false);
  });

  it('should trigger play on AirPlay after a second', () => {
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(
      <VideoComponent {...props} />
    );
    const instance = wrapper.instance();
    const event = { active: true, available: true };
    instance.castingPlatform = AIRPLAY;
    instance.onCast(event);
    jest.runAllTimers();
    expect(jwPlayerInstance.play).toHaveBeenCalled();
  });

  it('should not trigger play on AirPlay if timeout is already set', () => {
    videoUtils.isPlayerBufferingOrPlaying = jest.fn(() => true);
    const wrapper = shallow(
      <VideoComponent {...props} />
    );
    const instance = wrapper.instance();
    const event = { active: true, available: true };
    instance.castingPlatform = AIRPLAY;
    instance.castingTimeout = true;
    instance.onCast(event);
    expect(jwPlayerInstance.play).not.toHaveBeenCalled();
  });

  it('should call castingAdBreakEnd method when ad break ends', () => {
    const castingAdBreakEnd = jest.fn();
    const wrapper = shallow(
      <VideoComponent {...props} castingAdBreakEnd={castingAdBreakEnd} />
    );
    const instance = wrapper.instance();

    wrapper.setState({ casting: true });
    instance.adBreakEnd();

    expect(castingAdBreakEnd).toHaveBeenCalled();
  });

  it('should not call castingAdPod on adPlay', () => {
    const castingAdPod = jest.fn();
    const wrapper = shallow(
      <VideoComponent {...props} castingAdPod={castingAdPod} />
    );
    const instance = wrapper.instance();

    instance.isCastingActive = false;
    instance.onAdPlay({});

    expect(castingAdPod).not.toHaveBeenCalled();
  });

  it('should call castingAdPod on adPlay', () => {
    const castingAdPod = jest.fn();
    const wrapper = shallow(
      <VideoComponent {...props} castingAdPod={castingAdPod} />
    );
    const instance = wrapper.instance();

    instance.isCastingActive = true;
    instance.onAdPlay({});

    expect(castingAdPod).toHaveBeenCalled();
  });

  it('should not call castingAdBreakEnd method when casting is inactive', () => {
    const castingAdBreakEnd = jest.fn();
    const wrapper = shallow(
      <VideoComponent {...props} castingAdBreakEnd={castingAdBreakEnd} />
    );
    const instance = wrapper.instance();
    instance.adBreakEnd();

    expect(castingAdBreakEnd).not.toHaveBeenCalled();
  });

  it('should call castingAdBreakStart method when ad break ends', () => {
    const castingAdBreakStart = jest.fn();
    const wrapper = shallow(
      <VideoComponent {...props} castingAdBreakStart={castingAdBreakStart} />
    );
    const instance = wrapper.instance();

    wrapper.setState({ casting: true });
    instance.adBreakStart();

    expect(castingAdBreakStart).toHaveBeenCalled();
  });

  it('should not call castingAdBreakStart method when casting is inactive', () => {
    const castingAdBreakStart = jest.fn();
    const wrapper = shallow(
      <VideoComponent {...props} castingAdBreakStart={castingAdBreakStart} />
    );
    const instance = wrapper.instance();
    instance.adBreakStart();

    expect(castingAdBreakStart).not.toHaveBeenCalled();
  });

  it('should not set castingKeepState when casting is inactive', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.castingPlatform = AIRPLAY;
    instance.shouldCastingKeepState();
    expect(instance.castingKeepState).toBe(false);
  });

  it('should set castingKeepState when platform is AirPlay', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.isCastingActive = true;
    instance.castingPlatform = AIRPLAY;
    instance.shouldCastingKeepState();
    expect(instance.castingKeepState).toBe(true);
  });

  it('should not set castingKeepState when platform is not AirPlay', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    instance.isCastingActive = true;
    instance.castingPlatform = 'test';
    instance.shouldCastingKeepState();
    expect(instance.castingKeepState).toBe(false);
  });

  it('should remove any anchored players when casting session is over', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    const instance = wrapper.instance();
    videoUtils.removeAnyPlayerAnchored = jest.fn();
    videoUtils.pauseAnyPlayerPlaying = jest.fn();
    instance.isVideoLayout = true;
    instance.componentDidUpdate();

    expect(videoUtils.pauseAnyPlayerPlaying).toHaveBeenCalled();
  });

  it('should resume AirPlay session when remote state is connected', () => {
    videoUtils.getPlayerInstance = jest.fn().mockReturnValue({
      getContainer: () => ({
        querySelector: () => ({
          remote: { state: 'connected' },
        }),
      }),
    });
    const wrapper = shallow(
      <VideoComponent {...props} isCastingEnabled />
    );
    const instance = wrapper.instance();
    instance.castingPlatform = AIRPLAY;
    instance.isMobile = true;
    instance.onPlay({});
    jest.runAllTimers();
    expect(instance.state.casting).toBe(true);
    expect(videoUtils.removeAnyPlayerAnchored).toHaveBeenCalled();
  });

  it('should resume AirPlay session despite being disconnected but previously casting', () => {
    videoUtils.getPlayerInstance = jest.fn().mockReturnValue({
      getContainer: () => ({
        querySelector: () => ({
          remote: { state: 'disconnected' },
        }),
      }),
    });
    const wrapper = shallow(
      <VideoComponent {...props} isCastingEnabled />
    );
    const instance = wrapper.instance();
    instance.castingPlatform = AIRPLAY;
    instance.isMobile = true;
    instance.castingPreviously = true;
    instance.onPlay({});
    expect(instance.state.casting).toBe(true);
    expect(videoUtils.removeAnyPlayerAnchored).toHaveBeenCalled();
  });
});

describe('fmgOptions', () => {
  it('should set default fmg options param', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    const options = wrapper.instance().fmgOptions();
    expect(options.disableFirstPreroll).toBe(undefined);
  });

  it('should return the correct options object with param null', () => {
    const wrapper = shallow(<VideoComponent {...props} />);
    const opts = wrapper.instance().fmgOptions({ testOpt: true });
    expect(opts.testOpt).toBe(true);
  });
});
