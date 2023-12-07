import React from 'react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';
import VideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/VideoTracker';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as api from '@univision/fe-commons/dist/utils/api/fetchApi';

import * as videoHelpers from '../../../helpers';
import * as helperEvents from '../../../helpers/events';
import pageDataMock from './__mocks__/pageData.json';
import videoPlaylistMock from './__mocks__/videoPlaylist.json';
import videoWithTabsMock from './__mocks__/videoWithTabs.json';
import videoMetadataMock from './__mocks__/videoMetadata.json';
import videoLivestreamMock from './__mocks__/videoLivestream.json';
import videoLivestreamPlaylistMock from './__mocks__/videoLivestreamPlaylist.json';
import videoSoccerMatchMock from './__mocks__/videoSoccerMatch.json';
import videoSdkPlaylistMock from './__mocks__/videoSdkPlaylist.json';
import videoSdkLivestreamPlaylistMock from './__mocks__/videoSdkLivestreamPlaylist.json';
import VideoWithPlaylist from '.';

jest.useFakeTimers();

const store = configureStore();
const theme = { isDark: false };
const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {
    preventDefault: jest.fn(),
  },
};
let jwPlayerInstance;
let props;

store.dispatch(setPageData({ requestParams: {}, data: pageDataMock }));
jest.mock('@univision/shared-components/dist/components/v3/Label', () => {
  return () => (<div />);
});

helperEvents.appendVideos = jest.fn();
api.fetchPlaylistApi = jest.fn();

describe('VideoWithPlaylist tests', () => {
  beforeAll(() => {
    videoHelpers.fetchVideoMetadata = jest.fn(() => Promise.resolve([]));
  });

  beforeEach(() => {
    props = {
      content: videoPlaylistMock.contents,
      settings: videoPlaylistMock.settings,
      activeIndex: 0,
      pageData: pageDataMock,
      theme,
      showPrendeCTA: false,
    };
    jwPlayerInstance = {
      on: jest.fn((evt, fn) => fn(evt)),
      pause: jest.fn(),
      once: jest.fn(),
      getState: jest.fn(),
    };
    window.FMG = {
      callFn: jest.fn(),
      getAnalyticsData: jest.fn(),
      getJWPlayerInstance: jest.fn(() => jwPlayerInstance),
      on: jest.fn((name, fn) => fn({ nodeId: 'playerId' })),
      playlist: jest.fn(),
      multitabPlaylist: jest.fn(),
      playlistLivestream: jest.fn(),
      preloadLibraries: jest.fn(),
      removeInstance: jest.fn(),
      trigger: jest.fn(),
      clearInstanceEvents: jest.fn(),
      getInstance: jest.fn(() => ({})),
    };
    videoHelpers.fetchVideoMetadata.mockClear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render as expected', () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist {...props} />
      </Provider>
    );

    expect(wrapper.find('VideoWithPlaylist__VideoCardStyled')).toHaveStyleRule('background-color', '#ffffff');
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
    expect(wrapper.find('VideoWithPlaylist__VideoCardStyled')).toHaveLength(1);
    expect(wrapper.find('VideoWrapper')).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
  });

  it('should render dark variant', () => {
    props.theme = { isDark: true };
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist {...props} />
      </Provider>
    );

    expect(wrapper.find('VideoWithPlaylist__VideoCardStyled')).toHaveStyleRule('background-color', '#181818');
    expect(wrapper.find('VideoContent').prop('variant')).toBe('dark');
    expect(wrapper.find('PlaylistCards').prop('variant')).toBe('dark');
  });

  it('should use uid as nodeId', () => {
    const wrapper = shallow(<VideoWithPlaylist {...props} />);
    const videoPlayerWrapper = wrapper.find('VideoWrapper');

    expect(videoPlayerWrapper.prop('nodeId')).toBe('player-00000174-6aa3-db6f-a17c-eeb335900006');
    expect(videoPlayerWrapper.prop('placeholderId')).toBe('00000174-6aa3-db6f-a17c-eeb335900006');
  });

  it('should use random nodeId if uid is empty', () => {
    const generateVideoPlayerIdSpy = jest.spyOn(videoHelpers, 'generateVideoPlayerId').mockImplementation(
      (withPlayerPrefix = true) => (
        withPlayerPrefix ? 'player-123' : '123'
      )
    );
    const settings = { uid: null };
    const wrapper = shallow(<VideoWithPlaylist {...props} settings={settings} />);
    const videoPlayerWrapper = wrapper.find('VideoWrapper');

    expect(generateVideoPlayerIdSpy).toHaveBeenCalledTimes(2);
    expect(videoPlayerWrapper.prop('nodeId')).toBe('player-123');
    expect(videoPlayerWrapper.prop('placeholderId')).toBe('123');

    generateVideoPlayerIdSpy.mockRestore();
  });

  it('should set active item on click', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist {...props} />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');

    await act(async () => {
      await onPlaylistInitialized(videoSdkPlaylistMock);
    });
    wrapper.update();
    expect(wrapper.find('ListCard')).toHaveLength(7);
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
  });

  it('should render only playlist items if are diferent of contents', async () => {
    const playlistItem = videoSdkPlaylistMock[0];
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist {...props} />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');

    await act(async () => {
      await onPlaylistInitialized([playlistItem]);
    });

    wrapper.update();
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('ListCard')).toHaveLength(7);
  });

  it('should render playlist that match from contents', async () => {
    const playlistItem = videoSdkPlaylistMock[0];
    const contentItem = videoPlaylistMock.contents[0];
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist {...props} content={[contentItem]} />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');

    await act(async () => {
      await onPlaylistInitialized([playlistItem]);
    });
    wrapper.update();
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('ListCard')).toHaveLength(1);
  });

  it('should handle on click playlist item', async () => {
    const setPlaylistClickedMock = jest.fn();
    const videoTrackerSpy = jest.spyOn(VideoTracker, 'track');
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist {...props} setPlaylistClicked={setPlaylistClickedMock} />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');

    await act(async () => {
      await onPlaylistInitialized(videoSdkPlaylistMock);
    });
    wrapper.update();
    wrapper.find('PlaylistCard__WrapperStyled').at(1).simulate('click', mockEvent);
    expect(videoTrackerSpy).toHaveBeenCalledWith(VideoTracker.events.playlistItemClick);
    expect(setPlaylistClickedMock).toHaveBeenCalledWith(true);
  });

  it('should not call "setPlaylistClicked" on click playlist item if is not a valid function', async () => {
    const setPlaylistClickedMock = jest.fn();
    const videoTrackerSpy = jest.spyOn(VideoTracker, 'track');
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist {...props} setPlaylistClicked={null} />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');

    await act(async () => {
      await onPlaylistInitialized(videoSdkPlaylistMock);
    });
    wrapper.update();
    wrapper.find('PlaylistCard__WrapperStyled').at(1).simulate('click', mockEvent);
    expect(videoTrackerSpy).toHaveBeenCalledWith(VideoTracker.events.playlistItemClick);
    expect(setPlaylistClickedMock).not.toHaveBeenCalled();
  });

  it('should hide playlist when "shouldShowPlaylist" callback return false', () => {
    const wrapper = shallow(<VideoWithPlaylist {...props} />);
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const shouldShowPlaylistHandler = videoPlayerWrapper.prop('shouldShowPlaylist');

    act(() => {
      shouldShowPlaylistHandler(false);
      expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    });
  });

  it('should render and fetch playlist for second tab', () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoWithTabsMock.contents}
          settings={videoWithTabsMock.settings}
        />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    onPlaylistInitialized();
    expect(wrapper.find('VideoTabs')).toHaveLength(1);
    expect(wrapper.find('VideoTabs').find('button')).toHaveLength(2);
  });

  it('should handle and switch to second tab on click', () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          dbeug
          content={videoWithTabsMock.contents}
          settings={videoWithTabsMock.settings}
        />
      </Provider>
    );

    const tabs = wrapper.find('VideoTabs');
    const switchTab = tabs.prop('onClick');
    const secondIndex = 1;
    const secondTab = tabs.find('button').at(secondIndex);
    switchTab({ preventDefault: () => {} }, 1);
    wrapper.update();
    expect(wrapper.find('VideoTabs').prop('activeTab')).toBe(secondIndex);
    expect(secondTab).toHaveLength(1);
  });

  it('should handle only one tab if second tabs is not valid', async () => {
    videoHelpers.fetchVideoMetadata.mockReturnValueOnce(Promise.resolve(videoMetadataMock.data));
    const settings = {
      ...videoWithTabsMock.settings,
      otherTabs: [{ content: [null] }],
    };
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoWithTabsMock.contents}
          settings={settings}
        />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    onPlaylistInitialized();
    expect(wrapper.find('VideoTabs').prop('activeTab')).toBe(0);
    expect(wrapper.find('VideoTabs__TabWrappperStyled')).toHaveLength(1);
  });

  it('should render content but hide playlist in a livestream playlist type', () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoLivestreamMock.contents}
          settings={videoLivestreamMock.settings}
        />
      </Provider>
    );

    expect(wrapper.find('VideoWrapper')).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards')).toHaveLength(0);
    expect(wrapper.find('VideoContent__TitleStyled').text()).toBe('TUDN 24/7 DAI Test');
  });

  it('should render playlist if is a livestream playlist type with contents', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoLivestreamPlaylistMock.contents}
          settings={videoLivestreamPlaylistMock.settings}
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    onPlaylistInitialized();
    wrapper.update();
    expect(videoPlayerWrapper).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('PlaylistCard')).toHaveLength(8);
    expect(wrapper.find('VideoContent__TitleStyled').text()).toBe('TEST HLS');
  });

  it('should render content but hide playlist in a soccerMatch playlist type', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoSoccerMatchMock.contents}
          settings={videoSoccerMatchMock.settings}
        />
      </Provider>
    );
    expect(wrapper.find('VideoWrapper')).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards')).toHaveLength(0);
  });

  it('should render content and playlist in a soccerMatch playlist type with highlights', async () => {
    const settings = {
      ...videoSoccerMatchMock.settings,
      soccerMatch: {
        ...videoSoccerMatchMock.settings.soccerMatch,
        hasMatchHighlights: true,
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          settings={settings}
          content={videoSoccerMatchMock.contents}
        />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    const shouldShowPlaylistHandler = videoPlayerWrapper.prop('shouldShowPlaylist');
    onPlaylistInitialized();
    shouldShowPlaylistHandler(true);
    wrapper.update();
    expect(wrapper.find('VideoContent__TitleStyled').text()).toBe('Atlas vs Chiapas F.C.');
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('VideoWrapper')).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
  });

  it('should render content and playlist in a soccerMatch and append new items', async () => {
    const settings = {
      ...videoSoccerMatchMock.settings,
      soccerMatch: {
        ...videoSoccerMatchMock.settings.soccerMatch,
        hasMatchHighlights: true,
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          settings={settings}
          content={[]}
        />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    const updatePlaylist = videoPlayerWrapper.prop('updatePlaylist');
    const shouldShowPlaylistHandler = videoPlayerWrapper.prop('shouldShowPlaylist');
    onPlaylistInitialized();
    updatePlaylist([{
      mcpid: 999,
    }, {
      mcpid: 666,
    }], true);
    shouldShowPlaylistHandler(true);
    wrapper.update();
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('ListCard')).toHaveLength(3);
  });

  it('should append new items', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          settings={{}}
          content={[{
            mcpid: 111,
          }, {
            mcpid: 222,
          }]}
        />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    const updatePlaylist = videoPlayerWrapper.prop('updatePlaylist');
    const shouldShowPlaylistHandler = videoPlayerWrapper.prop('shouldShowPlaylist');
    onPlaylistInitialized();
    updatePlaylist([{
      mcpid: 999,
    }, {
      mcpid: 666,
    }], false);
    shouldShowPlaylistHandler(true);
    wrapper.update();
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('ListCard')).toHaveLength(4);
  });

  it('should remove main item on match over', async () => {
    const settings = {
      ...videoSoccerMatchMock.settings,
      soccerMatch: {
        ...videoSoccerMatchMock.settings.soccerMatch,
        hasMatchHighlights: true,
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          settings={settings}
          content={[{
            mcpid: 111,
          }, {
            mcpid: 222,
          }]}
        />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    const updatePlaylist = videoPlayerWrapper.prop('updatePlaylist');
    const onMatchOver = videoPlayerWrapper.prop('onMatchOver');
    const shouldShowPlaylistHandler = videoPlayerWrapper.prop('shouldShowPlaylist');
    onPlaylistInitialized();
    updatePlaylist([{
      mcpid: 999,
    }, {
      mcpid: 666,
    }], false);
    shouldShowPlaylistHandler(true);
    wrapper.update();
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('ListCard')).toHaveLength(5);
    onMatchOver();
    wrapper.update();
    expect(wrapper.find('ListCard')).toHaveLength(4);
  });

  it('should notappend new items if no valid playlist', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          settings={{}}
          content={[{
            mcpid: 111,
          }, {
            mcpid: 222,
          }]}
        />
      </Provider>
    );
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    const updatePlaylist = videoPlayerWrapper.prop('updatePlaylist');
    const shouldShowPlaylistHandler = videoPlayerWrapper.prop('shouldShowPlaylist');
    onPlaylistInitialized();
    updatePlaylist(null, false);
    shouldShowPlaylistHandler(true);
    wrapper.update();
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('ListCard')).toHaveLength(2);
  });

  it('should render playlist if is a livestream playlist type with no contents but with items', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={[]}
          settings={videoLivestreamPlaylistMock.settings}
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    const onNextItemHandler = videoPlayerWrapper.prop('onNextItem');

    await act(async () => {
      await onPlaylistInitialized(videoSdkLivestreamPlaylistMock);
    });
    wrapper.update();
    expect(videoPlayerWrapper).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards')).toHaveLength(0);
    expect(wrapper.find('PlaylistCard')).toHaveLength(0);
    expect(wrapper.find('VideoContent__TitleStyled').text()).toBe('TEST HLS');
    await act(async () => {
      await onPlaylistInitialized(videoSdkLivestreamPlaylistMock);
      wrapper.update();
      onNextItemHandler(3);
    });
    expect(wrapper.find('VideoContent__TitleStyled').text()).toBe('TEST HLS');
  });
  it('should handle no mcpid on item gracefully', async () => {
    videoHelpers.fetchVideoMetadata.mockReturnValueOnce(Promise.resolve(videoMetadataMock.data));
    const wrapper = shallow(<VideoWithPlaylist {...props} />);
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    const onNextItemHandler = videoPlayerWrapper.prop('onNextItem');
    const noMcpid = { ...videoSdkPlaylistMock[0] };
    noMcpid.id = null;
    await act(async () => {
      await onPlaylistInitialized([noMcpid]);
    });
    wrapper.update();
    onNextItemHandler(3);

    expect(wrapper.find('VideoContent__TitleStyled')).toHaveLength(0);
  });

  it('should handle cuepoints highlights', async () => {
    const cuepoints = [
      {
        icon: 'timer',
        actionId: '20201',
        period: '2',
        seconds: 9600,
      },
    ];

    props.content = [{
      mcpid: '3361422',
      keywords: ['actionId.20201'],
    }];

    const wrapper = shallow(<VideoWithPlaylist {...props} cuepoints={cuepoints} />);
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');

    onPlaylistInitialized();
    wrapper.update();

    expect(wrapper.find('VideoWrapper').prop('cuepoints'))
      .toEqual([expect.objectContaining({
        actionId: '20201',
        mcpId: '3361422',
        period: '2',
        seconds: 9600,
        icon: 'timer',
      })]);
  });

  it('should update new cuepoints highlights correctly', () => {
    const firstCuepoint = {
      icon: 'timer',
      actionId: '20201',
      period: '2',
      seconds: 9600,
    };
    const secondCuepoint = {
      icon: 'gol',
      actionId: '20202',
      period: '2',
      seconds: 9700,
    };

    props.content = [{
      mcpid: '3361422',
      keywords: ['actionId.20201'],
    }, {
      mcpid: '3361417',
      keywords: ['actionId.20202'],
    }];

    const wrapper = shallow(<VideoWithPlaylist {...props} cuepoints={[firstCuepoint]} />);
    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    onPlaylistInitialized();
    wrapper.setProps({
      cuepoints: [firstCuepoint, secondCuepoint],
    });
    wrapper.update();

    expect(wrapper.find('VideoWrapper').prop('cuepoints')).toHaveLength(2);
    expect(wrapper.find('VideoWrapper').prop('cuepoints'))
      .toEqual(expect.objectContaining([{
        mcpId: '3361422',
        ...firstCuepoint,
      }, {
        mcpId: '3361417',
        ...secondCuepoint,
      }]));
  });

  it('should not render VideoContet', () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoLivestreamMock.contents}
          playlistBelowPlayer
        />
      </Provider>
    );

    expect(wrapper.find('VideoContent')).toHaveLength(0);
  });

  it('should render playlist if is a livestream playlist type with prende CTA', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoLivestreamPlaylistMock.contents}
          settings={videoLivestreamPlaylistMock.settings}
          showPrendeCTA
          pageCategory="soccermatch-pre"
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    onPlaylistInitialized();
    wrapper.update();
    expect(videoPlayerWrapper).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('PlaylistCard')).toHaveLength(8);
  });

  it('should render playlist with prende CTA and prende playlist manual clips', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoLivestreamPlaylistMock.contents}
          settings={videoLivestreamPlaylistMock.settings}
          showPrendeCTA
          pageCategory="soccermatch-post"
          prendePlaylist={videoLivestreamPlaylistMock.contents}
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    onPlaylistInitialized();
    wrapper.update();
    expect(videoPlayerWrapper).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('PlaylistCard')).toHaveLength(14);
  });

  it('should render playlist with prende CTA and only prende playlist manual clips', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={null}
          settings={videoLivestreamPlaylistMock.settings}
          showPrendeCTA
          pageCategory="soccermatch-post"
          prendePlaylist={videoPlaylistMock.contents}
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    onPlaylistInitialized();
    wrapper.update();
    expect(videoPlayerWrapper).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('PlaylistCard')).toHaveLength(7);
  });

  it('should render playlist with prende CTA and only prende playlist manual clips', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={null}
          settings={videoLivestreamPlaylistMock.settings}
          showPrendeCTA
          pageCategory="soccermatch-mid"
          prendePlaylist={videoPlaylistMock.contents}
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    onPlaylistInitialized();
    wrapper.update();
    expect(videoPlayerWrapper).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards')).toHaveLength(1);
    expect(wrapper.find('PlaylistCard')).toHaveLength(8);
  });

  it('should set isBroadcastStream', async () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.pageData = {
      ...props.pageData,
      broadcastStream: {
        playerState: 'ON',
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          userLocation="MX"
          content={null}
          settings={videoLivestreamPlaylistMock.settings}
          pageCategory="soccermatch-mid"
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    expect(videoPlayerWrapper).toHaveLength(1);
    expect(wrapper.find('VideoContent')).toHaveLength(1);
  });

  it('should render embedVixPlayer', async () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.pageData = {
      ...props.pageData,
      vixPlayerMx: {
        status: 'ON',
      },
      vixPlayerUs: {
        status: 'ON',
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          userLocation="MX"
          content={null}
          settings={videoLivestreamPlaylistMock.settings}
          pageCategory="soccermatch-mid"
        />
      </Provider>
    );
    expect(wrapper.find('iframe')).toHaveLength(1);
  });

  it('should not render embedVixPlayer', async () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.pageData = {
      ...props.pageData,
      vixPlayerMx: null,
      vixPlayerUs: null,
    };

    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          userLocation="MX"
          content={null}
          settings={videoLivestreamPlaylistMock.settings}
          pageCategory="soccermatch-mid"
        />
      </Provider>
    );
    expect(wrapper.find('iframe')).toHaveLength(0);
  });

  it('should call playlist API to pull videos when prende CTA', async () => {
    api.fetchPlaylistApi.mockReturnValueOnce(Promise.resolve([{
      ...videoLivestreamPlaylistMock.contents[2],
      mcpid: '1234',
      uid: '9876',
    }]));

    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoLivestreamPlaylistMock.contents}
          settings={videoLivestreamPlaylistMock.settings}
          showPrendeCTA
          pageCategory="soccermatch-post"
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const onPlaylistInitialized = videoPlayerWrapper.prop('onPlaylistInitialized');
    jest.advanceTimersByTime(90000);
    onPlaylistInitialized();
    wrapper.update();
    expect(wrapper.find('PlaylistCard')).toHaveLength(7);
  });

  it('should add cta as first item on the playlist', () => {
    api.fetchPlaylistApi.mockReturnValueOnce(Promise.resolve([]));

    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={videoLivestreamPlaylistMock.contents}
          settings={videoLivestreamPlaylistMock.settings}
          showPrendeCTA
          pageCategory="soccermatch-mid"
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const playlistItems = videoPlayerWrapper.prop('playlistItems');
    const onNextItem = videoPlayerWrapper.prop('onNextItem');
    onNextItem(1);
    onNextItem(0);
    wrapper.update();
    expect(playlistItems[0].identifier).toBe(-1);
    expect(wrapper.find('PlaylistCard')).toHaveLength(8);
  });

  it('should not have cards if empty content', () => {
    api.fetchPlaylistApi.mockReturnValueOnce(Promise.resolve([]));

    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={[]}
          settings={videoLivestreamPlaylistMock.settings}
          showPrendeCTA
          pageCategory="soccermatch-mid"
        />
      </Provider>
    );

    expect(wrapper.find('PlaylistCard')).toHaveLength(0);
  });

  it('should handle empty content', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist
          {...props}
          content={[]}
        />
      </Provider>
    );

    const videoPlayerWrapper = wrapper.find('VideoWrapper');
    const playlistItems = videoPlayerWrapper.prop('playlistItems');
    expect(playlistItems.length).toBe(0);
  });

  it('should exist the WidgetTitle widget with the styleRule text-form set to capitalize', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist {...props} />
      </Provider>
    );

    expect(wrapper.find('VideoWithPlaylist')).toHaveLength(1);
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('text-transform', 'capitalize');
  });

  it('should exist the WidgetTitle widget with the styleRule text-form set to uppercase', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);

    const wrapper = mount(
      <Provider store={store}>
        <VideoWithPlaylist {...props} />
      </Provider>
    );

    expect(wrapper.find('VideoWithPlaylist')).toHaveLength(1);
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('text-transform', 'uppercase');
  });
});
