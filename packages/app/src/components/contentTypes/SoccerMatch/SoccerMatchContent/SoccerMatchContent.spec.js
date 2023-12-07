import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import VideoWithPlaylist from '@univision/fe-video/dist/components/widgets/VideoWithPlaylist/VideoWithPlaylistConnector';
import videoPlaylistMock from '@univision/fe-video/dist/components/widgets/VideoWithPlaylist/__mocks__/videoPlaylist.json';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import * as videoUtils from '@univision/fe-commons/dist/utils/video';
import SoccerMatchContent, { areEqualProps } from '.';

const store = configureStore();
const props = {
  videoSettings: {
    showVideo: false,
    settings: {
      content: [],
      type: 'AllVideoPlaylistVideo',
      contents: [],
      settings: {
        uid: '0001',
        soccerMatch: {
          hasMatchHighlights: true,
          optaId: '12ds',
          streamId: 'uvn-tudn',
          matchId: 'g6253',
          isAuth: false,
        },
        titleLink: {
          href: '',
        },
      },
    },
  },
  headline: 'Liga MX',
  widgets: [<div id="DeportesMatchSummary" key="1" />],
};

const mockFMG = {
  trigger: jest.fn(),
  getInstance: jest.fn(() => ({})),
};

Object.defineProperty(window, 'FMG', {
  value: mockFMG,
});

jest.mock('@univision/fe-video/dist/components/Video');

/**
 * Wait for async behaviours to finish
 * @param {Object} wrapper component
 * @param {function} _actions any actions to be triggered
 * @returns {Promise<void>}
 */
const actions = async (wrapper, _actions) => {
  await act(async () => {
    await (new Promise(resolve => setTimeout(resolve, 0)));
    if (_actions) _actions();
    wrapper.update();
  });
};

/** @test {SoccerMatchContent} */
describe('SoccerMatchContent Spec', () => {
  it('should render without crashing without props', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SoccerMatchContent />, div);
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <SoccerMatchContent {...props} />,
    );

    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent__TitleStyled')).toHaveLength(1);
    expect(global.window.FMG.trigger).toHaveBeenCalledWith(
      'Video.onPIPUpdate',
      null,
      { load: false },
      'player-0001',
    );
  });

  it('should call Video.onPIPUpdate if uid is null', () => {
    const mockSettings = {
      ...props,
      videoSettings: {
        ...props.videoSettings,
        settings: {
          ...props.videoSettings.settings,
          settings: {
            ...props.videoSettings.settings.settings,
            uid: null,
          },
        },
      },
    };
    mount(
      <SoccerMatchContent {...mockSettings} />,
    );

    expect(global.window.FMG.trigger).toHaveBeenCalledWith(
      'Video.onPIPUpdate',
      null,
      { load: false },
      'player-1',
    );
  });

  it('should not render title if are empty', () => {
    const wrapper = mount(
      <SoccerMatchContent {...props} headline={null} />,
    );

    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent__TitleStyled')).toHaveLength(0);
  });

  it('should not render video playlist if showVideo is false', () => {
    const videoSettings = {};

    const wrapper = mount(
      <SoccerMatchContent {...props} videoSettings={videoSettings} />,
    );

    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find(VideoWithPlaylist)).toHaveLength(0);
  });

  it('should not render video playlist if showVideo is false and trigger functions is not called', () => {
    const videoSettings = {};
    jest.spyOn(global.window.FMG, 'trigger').mockReturnValue(null);
    const getNodeIdSpy = spyOn(videoUtils, 'getNodeId');

    const wrapper = mount(
      <SoccerMatchContent {...props} videoSettings={videoSettings} />,
    );

    expect(wrapper.exists()).toBe(true);
    expect(getNodeIdSpy).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  it('should render video playlist if have valid settings', async () => {
    const videoSettings = {
      ...props.videoSettings,
      showVideo: true,
      pageCategory: 'soccer-prematch',
      playlist: [{ mcpid: 1 }],
      settings: {
        ...props.videoSettings.settings,
        settings: {
          ...props.videoSettings.settings.settings,
        }
      }
    };

    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchContent {...props} videoSettings={videoSettings} section="mls" />
      </Provider>,
    );

    await actions(wrapper);

    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find(VideoWithPlaylist)).toHaveLength(1);
  });

  it('should render video slate on pre-event with page category soccermatch-pre', () => {
    const videoSettings = {
      ...props.videoSettings,
      showVideo: true,
      playlist: [{ mcpid: 1 }],
    };
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchContent {...props} videoSettings={videoSettings} pageCategory="soccermatch-pre" section="test" />
      </Provider>,
    );

    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find(VideoWithPlaylist)).toHaveLength(1);
    expect(wrapper.find(VideoWithPlaylist).find('VideoWrapper__SlateStyled')).toHaveLength(1);
  });

  it('should render video playlist when there is prende link and has highlights', () => {
    const videoSettings = {
      ...props.videoSettings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchContent
          {...props}
          pageCategory={pageCategories.SOCCER_MATCH_POST}
          externalLink="test"
          videoSettings={videoSettings}
          headline="test"
          playlist={{ videos: videoPlaylistMock.contents }}
          channels={{ es: ['prende'] }}
          language="es"
        />,
      </Provider>,
    );
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find(VideoWithPlaylist)).toHaveLength(1);
  });

  it('should render video playlist when there is prende link and has prende in network', () => {
    const videoSettings = {
      ...props.videoSettings,
      showVideo: true,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchContent
          {...props}
          pageCategory={pageCategories.SOCCER_MATCH_MID}
          externalLink="test"
          videoSettings={videoSettings}
          headline="test"
          playlist={{ videos: videoPlaylistMock.contents }}
          channels={{ es: ['prende'] }}
          language="es"
        />,
      </Provider>,
    );
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find(VideoWithPlaylist)).toHaveLength(1);
  });

  it('should render video playlist when there is prende link and has prende in network', () => {
    const videoSettings = {
      ...props.videoSettings,
      showVideo: false,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchContent
          {...props}
          pageCategory={pageCategories.SOCCER_MATCH_MID}
          externalLink="test"
          videoSettings={videoSettings}
          headline="test"
          playlist={{ videos: videoPlaylistMock.contents }}
          channels={{ es: ['prende'] }}
          language="es"
          liveStreamEnabled={false}
        />,
      </Provider>,
    );
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find(VideoWithPlaylist)).toHaveLength(1);
  });

  it('should not render video slate on mid-event with page category soccermatch-mid', () => {
    const videoSettings = {
      ...props.videoSettings,
      showVideo: true,
      playlist: [{ mcpid: 1 }],
    };
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchContent {...props} videoSettings={videoSettings} pageCategory="soccermatch-mid" />
      </Provider>,
    );

    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find(VideoWithPlaylist)).toHaveLength(1);
    expect(wrapper.find(VideoWithPlaylist).find('VideoWrapper__SlateStyled')).toHaveLength(0);
  });

  it('should not re-render if not change widgets size', () => {
    expect(areEqualProps(props, { ...props, device: 'desktop' })).toBe(true);
    expect(areEqualProps(props, { widgets: [] })).toBe(false);
  });

  it('should render the vix embed player', () => {
    const videoSettings = {
      ...props.videoSettings,
      showVideo: true,
      playlist: [{ mcpid: 1 }],
    };
    const enhancedProps = {
      ...props,
      embedVixPlayer: {
        status: 'ON',
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchContent {...enhancedProps} videoSettings={videoSettings} pageCategory="soccermatch-mid" />
      </Provider>,
    );

    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(1);
  });

  it('should render the vix embed player when the embed player is set to on', () => {
    const videoSettings = {
      ...props.videoSettings,
      showVideo: false,
      playlist: [{ mcpid: 1 }],
    };
    const enhancedProps = {
      ...props,
      embedVixPlayer: {
        status: 'ON',
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchContent {...enhancedProps} videoSettings={videoSettings} pageCategory="soccermatch-mid" />
      </Provider>,
    );

    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(1);
  });

  it('should render the vix embed player as playlist', () => {
    const videoSettings = {
      ...props.videoSettings,
      showVideo: true,
      playlist: [{ mcpid: 1 }],
    };
    const enhancedProps = {
      ...props,
      embedVixPlayer: {
        status: 'POST',
      },
      playlist: {
        videos: [{ mcpid: 1 }],
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchContent {...enhancedProps} videoSettings={videoSettings} pageCategory="soccermatch-mid" />
      </Provider>,
    );

    expect(wrapper.find('VideoWithPlaylist__VideoCardStyled')).toHaveLength(1);
  });
});
