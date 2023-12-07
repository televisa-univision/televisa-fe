import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { getDevice, isSpa, getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import * as videoUtils from '@univision/fe-commons/dist/utils/video';
import Store from '@univision/fe-commons/dist/store/store';
import features from '@univision/fe-commons/dist/config/features';
/* eslint-disable */
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';

import Video from '../Video';
import VideoMeta from '../VideoMeta';
import * as helperEvents from '../../helpers/events';
import { VideoPlayerComponent, Tab, mapStateToProps } from '.';

jest.mock('@univision/fe-commons/dist/utils/video/mutationDomChanges', () => jest.fn());
jest.mock('@univision/fe-commons/dist/utils/ads/adHelper', () => ({
  getAd: jest.fn(),
  getVideoComp: jest.fn()
}));
jest.mock('../Placeholder', () => jest.fn());
jest.mock('@univision/fe-components-base/dist/components/Loading', () => jest.fn());
jest.mock('@univision/fe-commons/dist/assets/images/default-content-image.png', () => jest.fn());
jest.mock('@univision/fe-commons/dist/utils/helpers/dateTimeUtils', () => ({
  formatDate: jest.fn()
}));

let mockPageData;

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getTheme: jest.fn(),
  getDevice: jest.fn(() => 'desktop'),
  getRequestParams: jest.fn(() => ({})),
  getPageData: jest.fn(() => mockPageData),
  getConfig: jest.fn(),
  isSpa: jest.fn(),
  hasFeatureFlag: jest.fn(() => false),
  isContentTypeAllowed: jest.fn(() => true),
  isAmp: jest.fn(() => true),
  getContentType: jest.fn(() => ({})),
}));

jest.mock('../../helpers', () => {
  let item = {
    uri: 'abc',
    mcpid: '112233'
  };

  return {
    fetchVideoMetadata: jest.fn(obj => Promise.resolve([obj])),
    parsePlaylistItems: jest.fn(() => [item]),
    setPlaylistItems: (i) => {
      item = i;
    },
    getPlaceholderImage: jest.fn(() => Promise.resolve('@univision/fe-commons/dist/assets/images/playlist-thumb-light.png')),
    generateVideoPlayerId: jest.fn(() => 'player-123')
  };
});

const FMG = {
  off: jest.fn(),
  on: jest.fn(),
  trigger: jest.fn()
};

let props;
let items;
let mockMeta;
let mockPlaylistItem;
let mockState;
let widgetData;

afterEach(() => {
  jest.restoreAllMocks();
  isSpa.mockImplementation(() => false);
  getTheme.mockImplementation();
});

beforeEach(() => {
  global.window.FMG = FMG;
  items = [
    {
      id: '123',
      mcpid: '123',
      title: 'foo',
      videoMetadata: {
        photoVideoMetadata_fmg: {},
        photoVideoMetadataIPTC: {
          language: 'es',
          title: {
            es: 'Title'
          },
          description: {
            es: 'Desc'
          },
          dateReleased: new Date().toString(),
          supplier: {
            name: {
              es: 'Univision'
            }
          },
          snapshotLinks: [{ link: 'image.jpg' }],
          episode: { number: 1 },
          identifier: '123'
        }
      }
    },
    {
      id: '456',
      mcpid: '456',
      title: 'bar',
      description: 'foo',
      richTextDescription: [
        {
          type: 'text',
          value: 'Rich 456 <strong>TEXT</strong> prop'
        }
      ],
      videoMetadata: {
        photoVideoMetadata_fmg: {
          thumbnail: 'image-fmg.png',
          shareUrl: 'http://share.com'
        },
        photoVideoMetadataIPTC: {
          language: 'es',
          title: {
            es:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sollicitudin efficitur enim ac vulputate. Donec et laoreet lectus.'
          },
          description: {
            es: 'Desc2'
          },
          dateReleased: new Date().toString(),
          supplier: {
            name: {
              es: 'Univision'
            }
          },
          snapshotLinks: [{ link: 'image2.jpg' }],
          episode: { number: 1 }
        }
      }
    }
  ];

  props = {
    store: {
      connect: jest.fn(),
      getState: jest.fn(),
      dispatch: jest.fn()
    },
    widgetData: {
      uri: 'http://test.com',
      mcpid: '123',
      title: 'Video Title',
      description: 'Video Description',
      richTextDescription: 'rich <strong>TEXT</strong> prop',
      placeholderImage: '@univision/fe-commons/dist/assets/images/playlist-thumb-light.png',
      publishDate: new Date().toString(),
      source: 'source',
      sharing: {
        options: {}
      },
      uid: '123',
      primaryTag: {},
      longformPlayList: true,
      variant: 'dark',
      image: {
        renditions: {
          original: {
            href: 'image.jpg',
            width: 1920,
            height: 1080
          },
          '16x9-med': {
            href: 'image.jpg',
            width: 400,
            height: 225
          },
        },
      },
    },
  };

  mockMeta = {
    mcpid: '0011222',
    image: 'image.png',
    title: 'test video',
    uid: '0011222'
  };

  mockState = {
    content: [
      {
        description: '',
        uri: '123',
        sharingOptions: {},
        longform: { episode: 2 },
        mcpid: '123',
        title: 'Video 1',
        authRequired: true,
        videoType: 'long-form',
        hasNewLabel: false,
      },
      {
        description: '',
        uri: '234',
        sharingOptions: { facebook: true },
        longform: { episode: 3 },
        mcpid: '234',
        title: 'Video 2',
        authRequired: false,
        videoType: 'long-form',
        hasNewLabel: false,
      },
      {
        description: '',
        sharingOptions: { facebook: true },
        longform: { episode: 3 },
        mcpid: '2345',
        title: 'Video 3',
        authRequired: false,
        videoType: 'long-form',
        hasNewLabel: false,
        sharing: {
          options: {
            facebook: {
              url: 'http://test.uri',
            }
          }
        }
      }
    ],
    show: {
      name: 'Caer en tentacion',
      seasons: [
        {
          name: 'Temporada 1',
          number: 1
        },
        {
          name: 'Temporada 2',
          number: 2
        },
        {
          name: 'Temporada 3',
          number: 3
        }
      ],
      seasonInView: {
        name: 'Temporada 1',
        number: 1
      },
      nextSeason: {
        name: 'Temporada 2',
        number: 2
      }
    },
    nextEpisodes: true,
    prevEpisodes: true,
    nodeId: 'player-123'
  };

  mockPageData = {
    data: {
      richTextDescription: [
        {
          type: 'text',
          value: 'Rich <strong>TEXT</strong> store'
        }
      ],
      sharing: {
        options: {}
      }
    }
  };

  mockPlaylistItem = {
    mcpid: '0011222',
    uri: 'abc',
    image: 'image.jpg'
  };

  jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
});

describe('Map state to props tests', () => {
  it('Returns default user location', () => {
    const props = mapStateToProps(mockState);

    expect(props.userLocation).toBe('US');
  });
});

describe('VideoPlayer tests', () => {
  it('Renders as expected (desktop)', () => {
    const wrapper = shallow(<VideoPlayerComponent {...props} />);

    expect(wrapper.find(Video)).toHaveLength(1);
    expect(wrapper.find(VideoMeta)).toHaveLength(1);
  });

  it('Renders as expected (mobile)', () => {
    getDevice.mockReturnValueOnce('mobile');
    const wrapper = shallow(<VideoPlayerComponent {...props} />);

    expect(wrapper.find(Video)).toHaveLength(1);
    expect(wrapper.find(VideoMeta)).toHaveLength(1);
  });

  it('Renders as expected (Fullwidth)', () => {
    const wrapper = shallow(<VideoPlayerComponent {...props} fullWidth={true} />);
    expect(wrapper.find(FullWidth)).toHaveLength(1);
    expect(wrapper.find(Video)).toHaveLength(1);
    expect(wrapper.find(VideoMeta)).toHaveLength(1);
  });

  it('Renders LIGHT MODE as expected', () => {
    props.variant = 'light';
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    expect(wrapper.instance().props.variant).toEqual(props.variant);
  });

  it('Should use uid as nodeId', () => {
    props.widgetData.mcpid = '123';
    props.widgetData.uid = 'uid-123';
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    expect(wrapper.instance().currentNodeId).toBe('player-uid-123');
  });

  it('Should use random nodeId if uid is empty', () => {
    props.widgetData.mcpid = '123';
    props.uid = '';
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    expect(wrapper.instance().currentNodeId).not.toBe('uid-123');
  });

  it('loadPlaylist SDK callback should set loading to false', async () => {
    props.widgetData.image = 'test.jpg';
    props.widgetData.currentMcpId = '12345';

    const wrapper = shallow(<VideoPlayerComponent {...props} longformPlayList={false} />);
    wrapper.setState({ loading: true });
    wrapper.instance().loadPlaylist(items);
    expect(wrapper.state('loading')).toBe(false);
  });

  it('loadPlaylist SDK callback should set loading to false', async () => {
    props.widgetData.image = 'test.jpg';
    props.widgetData.currentMcpId = '12345';
    const wrapper = shallow(<VideoPlayerComponent {...props} longformPlayList={false} />);
    wrapper.setState({ loading: false });
    wrapper.instance().loadPlaylist(items);
    expect(wrapper.state('loading')).toBe(false);
  });

  it('should use uid as placeholder Id ', () => {
    props.widgetData.uid = 'uid-test';
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    expect(wrapper.instance().placeholderId).toBe('uid-test');
  });

  it('should not render live label when disable flag is enabled', () => {
    const newProps = {
      ...props,
      isLivestreamPage: true,
      disableEnVivoLabel: true,
    };
    const wrapper = shallow(<VideoPlayerComponent {...newProps} />);
    expect(wrapper.find(VideoMeta).prop('showLiveLabel')).toBe(false);
  });

  it('should update playlist if is valid array', () => {
    const videos = [{
      mcpid: 345,
    }];

    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.instance().onNewVideos(videos);

    expect(wrapper.state().content).toHaveLength(2);
  });

  it('should not update playlist if is invalid array', () => {
    const videos = null;

    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.instance().onNewVideos(videos);

    expect(wrapper.state().content).toHaveLength(1);
  });

  it('should not update playlist if longform', () => {
    props.widgetData = {
      mcpid: 456,
      longform: true,
    };
    props.hidePlaylist = false;
    const component = mount(
      <Provider store={Store}>
        <VideoPlayerComponent {...props} />
      </Provider>
    );
    const wrapper = component.find(VideoPlayerComponent);
    const playlist = wrapper.instance().getPlaylist();

    expect(playlist).toHaveLength(1);
  });

  it('should not update playlist if longform', () => {
    props.widgetData = {
      mcpid: 456,
      longform: false,
      playlist: {
        videos: [{
          authRequired: false,
        }],
      },
    };

    props.hidePlaylist = false;

    const component = mount(
      <Provider store={Store}>
        <VideoPlayerComponent {...props} />
      </Provider>
    );
    const wrapper = component.find(VideoPlayerComponent);
    const playlist = wrapper.instance().getPlaylist();

    expect(playlist).toHaveLength(1);
  });

  it('should not update playlist if longform', () => {
    props.widgetData = {
      mcpid: 456,
      longform: true,
    };
    props.hidePlaylist = false;

    const component = mount(
      <Provider store={Store}>
        <VideoPlayerComponent {...props} />
      </Provider>
    );
    const wrapper = component.find(VideoPlayerComponent);
    const playlist = wrapper.instance().getPlaylist();

    expect(playlist).toHaveLength(1);
  });

  it('should append videos on mounting if player already running', () => {
    helperEvents.appendVideos = jest.fn();
    props.isNewsDigitalChannel = true;

    const wrapper = shallow(
      <VideoPlayerComponent {...props} />
    );

    wrapper.setState({ loading: false, content: [{ mcpid: 1 }, { mcpid: 2 }]});
    wrapper.instance().componentDidMount(true);
    expect(helperEvents.appendVideos).toBeCalledWith([{ mcpid: 2 }], {}, 'player-123');
  });

  it('should not append videos on mounting if player is not running', () => {
    helperEvents.appendVideos = jest.fn();
    props.isNewsDigitalChannel = true;

    const wrapper = shallow(
      <VideoPlayerComponent {...props} />
    );

    wrapper.setState({ loading: true, content: [{ mcpid: 1 }, { mcpid: 2 }]});
    wrapper.instance().componentDidMount(true);
    expect(helperEvents.appendVideos).not.toBeCalled();
  });

  it('should not append videos on mounting if no playlist', () => {
    helperEvents.appendVideos = jest.fn();
    props.isNewsDigitalChannel = true;

    const wrapper = shallow(
      <VideoPlayerComponent {...props} />
    );

    wrapper.setState({ loading: true, content: [{ mcpid: 1 }]});
    wrapper.instance().componentDidMount(true);
    expect(helperEvents.appendVideos).not.toBeCalled();
  });

 it('Should render epg wrapper for mobile if digital channel', () => {
    props.longformPlayList = false;
    getDevice.mockImplementation(() => 'mobile');
    props.isNewsDigitalChannel = true;
    props.hidePlaylist = false;

    const component = mount(
      <Provider store={Store}>
        <VideoPlayerComponent {...props} />
      </Provider>
    );
    const wrapper = component.find(VideoPlayerComponent);
    expect(wrapper.find('VideoPlayer__MobileEpgWrapper')).toBeDefined();
  });

 it('Should render epg wrapper for desktop if digital channel', () => {
    props.longformPlayList = false;
    getDevice.mockImplementation(() => 'desktop');
    props.isNewsDigitalChannel = true;
    props.hidePlaylist = false;

    const component = mount(
      <Provider store={Store}>
        <VideoPlayerComponent {...props} />
      </Provider>
    );
    const wrapper = component.find(VideoPlayerComponent);
    expect(wrapper.find('VideoPlayer__DesktopEpgWrapper')).toBeDefined();
  });

  it('Should render epg wrapper with vix icon for desktop if digital channel', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(true);
    props.longformPlayList = false;
    getDevice.mockImplementation(() => 'desktop');
    props.isNewsDigitalChannel = true;
    props.hidePlaylist = false;

    const component = mount(
      <Provider store={Store}>
        <VideoPlayerComponent {...props} />
      </Provider>
    );
    const wrapper = component.find(VideoPlayerComponent);
    expect(wrapper.find('VideoPlayer__DesktopEpgWrapper')).toBeDefined();
  });

 it('Should render tabs', () => {
    props.longformPlayList = false;
    getDevice.mockImplementation(() => 'desktop');
    props.tab = {
      label: 'test',
      content: (<div></div>),
    };
    props.variant = 'light';
    props.hidePlaylist = false;

    const component = mount(
      <Provider store={Store}>
        <VideoPlayerComponent {...props} />
      </Provider>
    );
    const wrapper = component.find(VideoPlayerComponent);
    wrapper.instance().renderPlaylist({});
    wrapper.setState({ activeTab: 1 });
    expect(wrapper.find('button')).toHaveLength(2);
  });

it('Should render tab with gradient', () => {
    props.longformPlayList = false;
    getTheme.mockImplementation(() => ({
      playlistWithGradient: false,
      playlistWithGradientColor: 'blue',
      livestreamDefaultColor: 'blue',
      livestreamActiveColor: 'red',
      variant: 'dark',
    }));
    getDevice.mockImplementation(() => 'desktop');
    props.tab = {
      label: 'test',
      content: (<div></div>),
    };
    props.variant = 'dark';
    const component = mount(
      <Provider store={Store}>
        <VideoPlayerComponent {...props} />
      </Provider>
    );
    const wrapper = component.find(VideoPlayerComponent);
    wrapper.instance().renderPlaylist({});
    wrapper.setState({ activeTab: 0 });
    expect(wrapper.find('button')).toHaveLength(2);
  });
});

describe('VideoPlayer » Playlist tests', () => {
  it('should exit on makeActive if no content', () => {
    props.children = jest.fn();
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.setState({ content: [] });
    const makeActive = wrapper.instance().makeActive(1);
    expect(makeActive).toBe(undefined);
    expect(props.children).toBeCalled();
  });

  it('clicking on playlist item calls makeActive and not call trigger if FMG is null', () => {
    global.window.FMG.trigger = jest.fn();
    const triggerSpy = jest.spyOn(global.window.FMG, 'trigger');
    const oldFMG = global.window.FMG;
    global.window.FMG = null;
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    isSpa.mockImplementation(() => true);
    wrapper.setState(mockState);
    wrapper.instance().makeActive(1);
    expect(triggerSpy).not.toBeCalled();
    global.window.FMG = oldFMG;
    triggerSpy.mockClear();
  });
  it('clicking on playlist item calls makeActive', () => {
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    isSpa.mockImplementation(() => true);
    wrapper.setState(mockState);
    wrapper.instance().makeActive(1);
    expect(wrapper.state().activeIndex).toEqual(1);
  });

  it('should set playlistClicked to true ', () => {
    const setPlaylistClicked = jest.fn();
    const wrapper = shallow(<VideoPlayerComponent {...props} setPlaylistClicked={setPlaylistClicked}/>);
    wrapper.instance.makeActive = jest.fn();
    wrapper.instance().onPlaylistItemClick({ preventDefault: () => {} }, 1);
    expect(setPlaylistClicked).toHaveBeenCalledWith(true);
  });

  it('should call pauseAnyPlayerPlaying for shareButtonHandler', () => {
    videoUtils.pauseAnyPlayerPlaying = jest.fn();
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.instance().shareButtonHandler();
    expect(videoUtils.pauseAnyPlayerPlaying).toBeCalled();
  });

  it('makeActive sets correct active item', () => {
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.setState(mockState);
    wrapper.instance().getVideoMeta = jest.fn(() => ({
      mcpid: '123',
    }));
    wrapper.instance().makeActive(1);
    expect(wrapper.state().activeIndex).toBe(1);
  });

  it('should send video values to callback if video change', () => {
    const onPlaylistItemChange = jest.fn();
    const wrapper = shallow(<VideoPlayerComponent {...props} onPlaylistItemChange={onPlaylistItemChange} />);

    wrapper.setState({ activeIndex: 1, content: [{}, {}] });
    wrapper.instance().makeActive(1);

    expect(wrapper.state().activeIndex).toBe(1);
    expect(onPlaylistItemChange).not.toBeCalled();
  });

  it('should send video values to callback if video change', () => {
    const onPlaylistItemChange = jest.fn();
    const wrapper = shallow(<VideoPlayerComponent {...props} onPlaylistItemChange={onPlaylistItemChange} />);

    wrapper.setState({ activeIndex: 0, content: [{}, { permalink: 'link', title: 'test' }] });
    wrapper.instance().makeActive(1);

    expect(wrapper.state().activeIndex).toBe(1);
    expect(onPlaylistItemChange).toHaveBeenCalledWith({ link: 'link', title: 'test' });
  });
});

describe('Video Player - set proper fmgCall', () => {
  it('should set correct playlist value', () => {
    props.longformPlayList = false;
    props.mcpid = [1, 2, 3];
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    expect(wrapper.find(Video).props().fmgCall.name).toEqual('playlist');
  });

  it('Should switch active tab', () => {
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    expect(wrapper.state().activeTab).toBe(0);
    wrapper.instance().switchTab(1)();
    expect(wrapper.state().activeTab).toBe(1);
  });

  it('Should render tabs', () => {
    props.tab = {
      label: 'test',
      content: (<div></div>),
    };
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.instance().renderPlaylist({});
    expect(wrapper.find(Tab)).toHaveLength(2);
  });

  it('Should render tabs', () => {
    props.tab = {
      label: 'test',
      content: (<div>test</div>),
    };
    props.hidePlaylist = false;
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.instance().switchTab(1)();
    wrapper.instance().renderPlaylist({});
    expect(wrapper.state().activeTab).toBe(1);
  });

  it('Should not render tab with gradient', () => {
    props.longformPlayList = false;
    props.tab = {
      label: 'test',
      content: (<div></div>),
    };
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.instance().theme = {
      playlistWithGradient: false,
    };
    wrapper.instance().isMobile = true;

    wrapper.instance().renderPlaylist({});
    wrapper.setState({ activeTab: 0 });
    expect(wrapper.find('.withGradient')).toHaveLength(0);
  });

  it('Should not render tab with gradient', () => {
    props.longformPlayList = false;
    props.tab = {
      label: 'test',
      content: (<div></div>),
    };
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.instance().theme = {
      playlistWithGradient: true,
    };
    wrapper.instance().isMobile = true;

    wrapper.instance().renderPlaylist({});
    wrapper.setState({ activeTab: 1 });
    expect(wrapper.find('.withGradient')).toHaveLength(0);
  });

  it('Should not render tab with gradient', () => {
    props.tab = {
      label: 'test',
      content: (<div></div>),
    };
    const wrapper = shallow(<VideoPlayerComponent {...props} />);
    wrapper.instance().isMobile = false;
    wrapper.instance().renderPlaylist({});
    wrapper.setState({ activeTab: 0 });
    expect(wrapper.find('.withGradient')).toHaveLength(0);
  });
});
