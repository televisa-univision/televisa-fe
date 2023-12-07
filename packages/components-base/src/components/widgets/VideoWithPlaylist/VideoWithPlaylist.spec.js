import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import ResponsivePlaylist from '@univision/fe-video/dist/components/playlist/ResponsivePlaylist';
import features from '@univision/fe-commons/dist/config/features';
import * as dateTimeUtils from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import { VideoWithPlaylistComponent } from '.';

import Label from '../../Label';
import Title from '../../Title';

const playlistItem = jest.fn();
const twoTabs = [{ content: [{ mcpid: 123 }] }, { content: [{ mcpid: 456 }] }];

let jwPlayerInstance;
let props;

const module = jest.requireActual('@univision/fe-video/dist/helpers');

Store.dispatch(setPageData({ requestParams: {}, data: {} }));
beforeEach(() => {
  playlistItem.mockReset();
  props = {
    settings: {},
    activeIndex: 0,
    content: [
      {
        mcpid: 123,
        publishDate: '2018-06-04T11:35:06-04:00',
        uid: 'uid',
        primaryTag: { name: 'tag' },
        title: 'title',
        description: 'desc',
        source: 'my source',
        sharing: {
          options: {},
        },
      },
      {
        mcpid: 456,
        publishDate: '2018-06-04T11:35:06-04:00',
        uid: 'uid2',
        primaryTopic: { name: 'tag' },
        title: 'title2',
        description: 'desc2',
        sharing: {
          options: {},
        },
      },
    ],
    direction: 'vertical',
  };
  dateTimeUtils.formatDate = jest.fn();
  jwPlayerInstance = {
    on: jest.fn((evt, fn) => fn(evt)),
    pause: jest.fn(),
  };
  global.window.FMG = {
    callFn: jest.fn(),
    getAnalyticsData: jest.fn(),
    getJWPlayerInstance: jest.fn(() => jwPlayerInstance),
    on: jest.fn((name, fn) => fn({ nodeId: 'playerId' })),
    playlist: jest.fn(),
    preloadLibraries: jest.fn(),
    trigger: jest.fn(),
  };
});

describe('VideoWithPlaylist tests', () => {
  it('renders as expected', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <VideoWithPlaylistComponent {...props} />
      </Provider>
    );

    expect(wrapper.find('.playerContainer')).toHaveLength(1);
  });

  it('Should use uid as nodeId', () => {
    props.mcpid = '123';
    props.settings = {
      uid: 'uid-123',
    };
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    expect(wrapper.instance().currentNodeId).toBe('player-uid-123');
    expect(wrapper.instance().placeholderId).toBe('uid-123');
  });

  it('Should use random nodeId if uid is empty', () => {
    module.generateVideoPlayerId = jest.fn(() => 'player-123');
    props.mcpid = '123';
    props.settings = {
      uid: '',
    };
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    expect(wrapper.instance().currentNodeId).not.toBe('uid-123');
    expect(wrapper.instance().placeholderId).toBe('player-123');
  });

  it('renders no playlist if playlist is empty and content is livestream', () => {
    props.content = [];
    props.settings.livestream = {};
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    expect(wrapper.find(ResponsivePlaylist)).toHaveLength(0);
  });

  it('renders no playlist if state.showPlaylist is false and content is soccerMatch', () => {
    props.content = [];
    props.settings.soccerMatch = {};
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    expect(wrapper.find(ResponsivePlaylist)).toHaveLength(0);
  });

  it('renders no playlist if hasMatchHighlights flag is false', () => {
    props.settings.soccerMatch = {
      hasMatchHighlights: false,
    };

    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.instance().shouldShowPlaylist(true);
    expect(wrapper.find(ResponsivePlaylist)).toHaveLength(0);
  });

  it('creates one tab in the state', () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    expect(wrapper.instance().state.tabs.length).toEqual(1);
  });

  it('makeActive updates state and calls SDK methods', () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    const playlist = [
      {
        mcpid: 456,
        publishDate: '2018-06-04T11:35:06-04:00',
        uid: 'uid',
        primaryTag: { name: 'tag' },
        title: 'title',
        description: 'desc',
        source: 'my source',
        sharing: {
          options: {},
        },
      },
      {
        mcpid: 123,
        publishDate: '2018-06-04T11:35:06-04:00',
        uid: 'uid2',
        primaryTopic: { name: 'tag' },
        title: 'title2',
        description: 'desc2',
        sharing: {
          options: {},
        },
      },
    ];
    wrapper.setState({ playlist });
    wrapper.instance().makeActive(1);
    expect(wrapper.state('activeIndex')).toEqual(1);
  });

  it('render even state has different mcpid not found in content', () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    const playlist = [
      {
        mcpid: 3333,
        publishDate: '2018-06-04T11:35:06-04:00',
        uid: 'uid',
        primaryTag: { name: 'tag' },
        title: 'title',
        description: 'desc',
        source: 'my source',
        sharing: {
          options: {},
        },
      },
    ];
    wrapper.setState({ playlist });
    wrapper.instance().makeActive(1);
    expect(wrapper.state('activeIndex')).toEqual(1);
  });

  it('makeActive does not trigger videoMeta if no metadata available', () => {
    window.FMG = {
      trigger: jest.fn(),
    };
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.instance().makeActive(0);
    expect(window.FMG.trigger).not.toBeCalled();
  });

  it('makeActive triggers videoMeta if metadata available', () => {
    const playlist = [{ mcpid: 123 }];
    window.FMG = {
      trigger: jest.fn(),
    };

    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ playlist });
    wrapper.instance().metadata = { 123: { mcpid: 123 } };

    wrapper.instance().makeActive(0);
    expect(window.FMG.trigger).toBeCalledWith(
      'VideoMeta',
      null,
      expect.any(Object),
      expect.any(String)
    );
  });

  it('makeActive does not trigger videoMeta if current video not in metadata', () => {
    const playlist = [{ mcpid: 123 }];
    window.FMG = {
      trigger: jest.fn(),
    };

    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ playlist });
    wrapper.instance().metadata = { 456: { mcpid: 456 } };

    wrapper.instance().makeActive(0);
    expect(window.FMG.trigger).not.toBeCalled();
  });

  it('handles invalide activeIndex case', () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ activeIndex: 4 });
    expect(wrapper.find(Title).length).toEqual(0);
  });

  it('should set playlistClicked to true', () => {
    const setPlaylistClicked = jest.fn();
    const wrapper = shallow(
      <VideoWithPlaylistComponent {...props} setPlaylistClicked={setPlaylistClicked} />
    );
    wrapper.instance().onPlaylistItemClick();
    expect(setPlaylistClicked).toHaveBeenCalledWith(true);
  });

  it('tracks ShareBar clicks', () => {
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.find('ShareBar').simulate('click', 'facebook');
    expect(SocialTracker.track).toBeCalled();
  });

  it('tracks ShareBar clicks when not current index in state', () => {
    spyOn(SocialTracker, 'track');
    const { content } = props;
    content[0].uid = null;
    const wrapper = shallow(
      <VideoWithPlaylistComponent
        {...props}
        content={content}
      />
    );
    wrapper.setState({ activeIndex: null });
    wrapper.find('ShareBar').simulate('click', 'facebook');
    expect(SocialTracker.track).toBeCalled();
  });

  it('onPlaylistInitialized updates state', () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    const onPlaylistInitialized = wrapper.instance().onPlaylistInitialized();
    onPlaylistInitialized([]);
    expect(wrapper.state().playlist).toEqual([]);
  });

  it('updatePlaylist updates state playlist items', () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.instance().updatePlaylist([{ test: true }]);
    expect(wrapper.state().playlist).toEqual([{ test: true }]);
  });

  it('shouldShowPlaylist updates state to showPlaylist', () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.instance().shouldShowPlaylist(true);
    expect(wrapper.state().showPlaylist).toEqual(true);
  });

  it('parseContent should create correct object if available', () => {
    props.content = [{ mcpid: 1 }, { mcpid: 2 }];
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.instance().parseContent();
    expect(wrapper.instance().content).toEqual({ 1: props.content[0], 2: props.content[1] });
  });

  it('parseContent should create empty object if no content available', () => {
    props.content = [];
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.instance().parseContent();
    expect(wrapper.instance().content).toEqual({});
  });

  it('fetchVideoMetadata should set playlist if metadata is ready', () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.instance().metadata = { 123: {} };
    wrapper.instance().fetchVideoMetadata([{}]);
    expect(wrapper.state('playlist')).toEqual([{}]);
  });

  it('fetchVideoMetadata should set playlist if there is no content', () => {
    props.content = null;
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.instance().fetchVideoMetadata([{}]);
    expect(wrapper.state('playlist')).toEqual([{}]);
  });

  it('fetchVideoMetadata should not get data when no content in tabs', () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    expect(wrapper.instance().metadata).toBeFalsy();
  });

  it('fetchVideoMetadata should get data when content in tabs', async () => {
    const metadata = {
      123: { mcpid: 123 },
      456: { mcpid: 456 },
    };
    features.shows.showsRedesign = jest.fn(() => true);
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ tabs: twoTabs });
    module.fetchVideoMetadata = jest.fn();
    module.fetchVideoMetadata.mockReturnValue([twoTabs[0].content[0], twoTabs[1].content[0]]);
    await wrapper.instance().fetchVideoMetadata([]);
    expect(wrapper.instance().metadata).toEqual(metadata);
    expect(global.window.FMG.trigger).toBeCalled();
  });

  it('fetchVideoMetadata should get data when no content in tabs', () => {
    const tabs = [];
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ tabs });
    wrapper.instance().fetchVideoMetadata([]);
    expect(wrapper.instance().metadata).toBeFalsy();
  });

  it('fetchVideoMetadata should not set metadata if invalid content data', () => {
    const invalidTabs = [{ content: [{ id: 123 }] }, { content: [{ id: 456 }] }];

    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ tabs: invalidTabs });
    wrapper.instance().fetchVideoMetadata([]);
    expect(wrapper.instance().metadata).toBeFalsy();
  });

  it('fetchVideoMetadata should set blank object when empty api response', async () => {
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ tabs: twoTabs });
    module.fetchVideoMetadata = jest.fn();
    module.fetchVideoMetadata.mockReturnValue([]);
    await wrapper.instance().fetchVideoMetadata([]);
    expect(wrapper.instance().metadata).toEqual([]);
  });

  it('fetchVideoMetadata should set blank object to metadata if request fails', async () => {
    const response = Promise.reject(new Error('request failed'));
    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ tabs: twoTabs });
    module.fetchVideoMetadata = jest.fn();
    module.fetchVideoMetadata.mockReturnValue(response);
    await wrapper.instance().fetchVideoMetadata([]);
    expect(wrapper.instance().metadata).toEqual({});
  });

  it('renders playlist title when empty content and is a livestream playlist type', () => {
    const title = 'test title';
    props.content = [];
    props.settings.livestream = {};

    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ playlist: [{ title }] });
    expect(wrapper.find('Title').props().children).toBe(title);
  });

  it('renders playlist title when empty content and is a livestream playlist type', () => {
    const title = 'test title';
    props.content = [];
    props.settings.livestream = {};

    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ playlist: [{ title }] });
    expect(wrapper.find('Title').props().children).toBe(title);
  });

  it('renders correct author with title field when no playlist', () => {
    const authorName = 'test name';
    props.content = [];
    props.settings.livestream = {
      image: { caption: 'test', credit: 'test' },
      authors: [{ title: authorName }],
    };

    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ playlist: [{ title: 'test' }] });
    expect(wrapper.find('Author').props().title).toBe(authorName);
  });

  it('renders correct author with author first name + last name when no playlist', () => {
    const authorName = 'test name';
    props.content = [];
    props.settings.livestream = {
      authors: [{ firstName: 'test', lastName: 'name' }],
    };

    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ playlist: [{ title: 'test' }] });
    expect(wrapper.find('Author').props().title).toBe(authorName);
  });

  it('renders no author when no playlist and no author available', () => {
    props.content = [];
    props.settings.livestream = { authors: [{}] };

    const wrapper = shallow(<VideoWithPlaylistComponent {...props} />);
    wrapper.setState({ playlist: [{ title: 'test' }] });
    expect(wrapper.find('Author').length).toBe(0);
  });

  describe('multitab', () => {
    let wrapper;

    beforeEach(() => {
      const propsWithMultitab = Object.assign({}, props, {
        settings: {
          mainTabLabel: 'a title',
          otherTabs: [
            {
              label: 'other title',
              content: [],
            },
          ],
        },
      });
      wrapper = shallow(<VideoWithPlaylistComponent {...propsWithMultitab} />);
      wrapper.setState({ showTabButtons: true, playlist: props.content });
    });

    it('call switchTab function when any tab is clicked', () => {
      const switchTab = jest.fn();
      wrapper.instance().switchTab = switchTab;
      wrapper
        .find('Clickable')
        .first()
        .simulate('click');

      expect(switchTab).toHaveBeenCalled();
    });

    it('creates two tabs in the state if there is a second tab', () => {
      expect(wrapper.instance().state.tabs.length).toEqual(2);
    });

    it('creates one tab in the state if there is NOT a second tab', () => {
      const propsWithMultitab = Object.assign({}, props, {
        settings: {
          mainTabLabel: 'a title',
          otherTabs: [{ label: null, content: [] }],
        },
      });
      wrapper = shallow(<VideoWithPlaylistComponent {...propsWithMultitab} />);
      expect(wrapper.instance().state.tabs.length).toEqual(1);
    });

    it('with a playlist without current mcpid', () => {
      wrapper.setState({
        playlist: [
          {
            mcpid: 123,
            uid: 'uid',
            primaryTag: { name: 'tag' },
            title: 'title 123',
            description: 'desc',
            source: 'my source',
          },
        ],
      });
      expect(wrapper.find(Title).getElement().props.children[1]).toEqual('title');
    });

    it('with a playlist with live label', () => {
      wrapper.setState({
        playlist: [
          {
            mcpid: 123,
            uid: 'uid',
            primaryTag: { name: 'tag' },
            title: 'title 123',
            description: 'desc',
            source: 'my source',
            leadType: 'livestream',
            type: 'livestream',
            videoType: 'livestream',
          },
        ],
      });
      expect(wrapper.find(Label).exists()).toBe(true);
    });

    describe('switchTabs', () => {
      beforeEach(() => {
        wrapper.instance().switchTab(1);
      });

      it('calls FMG.trigger', () => {
        expect(global.window.FMG.trigger).toHaveBeenCalledWith(
          'switchPlaylist',
          null,
          1,
          expect.any(String)
        );
      });

      it('empties the playlist', () => {
        expect(wrapper.instance().state.playlist.length).toEqual(0);
      });

      it('sets active tab to the index passed', () => {
        expect(wrapper.instance().state.activeTab).toEqual(1);
      });
    });

    it('onPlaylistInitialized sets showTabButtons as true', () => {
      const onPlaylistInitialized = wrapper.instance().onPlaylistInitialized();
      onPlaylistInitialized([]);
      expect(wrapper.instance().state.showTabButtons).toEqual(true);
    });

    it('should get multitab playlist setting', () => {
      wrapper.setState({ tabs: [{ content: [] }, { content: [1, 2] }] });
      wrapper.instance().getPlaylistSettings();
      expect(wrapper.instance().playlistSettings.type).toBe('multitab');
    });
  });
});
