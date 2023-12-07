import React from 'react';
import { shallow, mount } from 'enzyme';

import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import Label from '@univision/fe-components-base/dist/components/Label';
import Truncate from '@univision/fe-components-base/dist/components/Truncate';
import Title from '@univision/fe-components-base/dist/components/Title';
import features from '@univision/fe-commons/dist/config/features';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import VideoMeta from '.';
import { mockVideo } from './mockData.json';

jest.mock('@univision/fe-commons/dist/utils/helpers/dateTimeUtils', () => ({ formatDate: jest.fn() }));

let mockPageContext;

jest.useFakeTimers();

jest.mock('../../helpers', () => {
  let item = { uri: 'abc' };
  return {
    setPlaylistItems: (i) => { item = i; },
    parsePlaylistItems: jest.fn(() => ([item])),
    fetchVideoMetadata: jest.fn(([data]) => [data]),
  };
});

const FMG = {
  off: jest.fn(),
  on: jest.fn(),
  trigger: jest.fn(),
};

let props;

beforeEach(() => {
  features.actionBar.hasActionBar = jest.fn(() => false);
  mockPageContext = {
    uri: '/mock-uri-updated',
    title: 'Mock Page Context',
    richText: '<p>Rich <strong>TEXT</strong> desc</p>',
    shortUrl: 'http://uv.me/qqq',
    permalink: 'http://test.univision.com/qqq',
  };

  global.window.FMG = FMG;
  props = {
    authors: [{
      name: 'Testy Test',
      permalink: 'http://uv.me/testy',
      isExternalLink: false,
      uri: 'http://uv.me/testy',
    }, {
      name: 'Testy Test',
    }, {
      fullName: 'fullname test',
    }],
    permalink: 'test',
    description: mockVideo.description,
    device: getDevice(),
    image: {},
    isLivestreamPage: true,
    isNewsDigitalChannel: false,
    mcpid: mockVideo.mcpid,
    currentMcpId: mockVideo.mcpid,
    nodeId: 'player-123',
    pageData: {
      language: 'es',
    },
    placeholderImage: '@univision/fe-commons/dist/assets/images/playlist-thumb-light.png',
    primaryTag: {},
    publishDate: new Date().toString(),
    richTextDescription: ['rich <strong>TEXT</strong> prop'],
    source: 'source',
    shareButtonClick: jest.fn(),
    sharing: {
      options: {},
    },
    shortUrl: 'http://te.st/ejn',
    store: { dispatch: jest.fn() },
    title: mockVideo.title,
    uid: mockVideo.uid,
    uri: 'http://test.com',
    variant: 'dark',
    video: mockVideo,
    index: '1',
  };
  global.history.replaceState = jest.fn();
});

describe('VideoMeta tests', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<VideoMeta {...props} />);
    const videoMeta = shallow(wrapper.prop('children')());
    expect(videoMeta.find(Title).render().text().trim()).toEqual(props.title);
    expect(videoMeta.find(Truncate).prop('text')).toEqual(props.description);
  });

  it('should render without crashing if shareButtonClick is not a function', () => {
    features.actionBar.hasActionBar.mockReturnValueOnce(true);
    props.shareButtonClick = null;
    const wrapper = shallow(<VideoMeta {...props} />);
    const videoMeta = shallow(wrapper.prop('children')());
    expect(wrapper).toBeDefined();
    expect(videoMeta).toBeDefined();
  });

  it('should not render if video is null', () => {
    props.video = null;

    const wrapper = shallow(<VideoMeta {...props} />);
    expect(wrapper.find('header').length).toEqual(0);
  });

  it('should render LIGHT MODE as expected', () => {
    props.variant = 'light';
    const wrapper = shallow(<VideoMeta {...props} />);
    expect(wrapper.instance().props.variant).toEqual(props.variant);
  });

  it('should render SIMPLE view as expected', () => {
    props.variant = 'light';
    props.simple = true;
    const wrapper = shallow(<VideoMeta {...props} />);
    expect(wrapper.find('.description')).toHaveLength(0);
  });

  it('should render a category if set', () => {
    props.variant = 'light';
    props.simple = true;
    props.category = 'Noticias';
    const wrapper = shallow(<VideoMeta {...props} />);
    const videoMeta = shallow(wrapper.prop('children')());
    expect(videoMeta.find('.category').text()).toEqual(props.category);
  });

  it('should not trigger videoMeta event on the SDK, if triggerVideoMeta is false', () => {
    const store = configureStore();
    global.window.FMG.trigger.mockReset();
    props.index = 4;
    props.uid = 345;
    props.triggerVideoMetaEvent = false;
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const wrapper = shallow(<VideoMeta {...props} />);

    props.mcpid = 321;
    props.currentMcpId = 321;
    props.uid = 123;
    wrapper.instance().onComponentWillReceiveProps(props, true);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(global.window.FMG.trigger).toHaveBeenCalledTimes(0);
  });

  it('should get description as an array if available on props', () => {
    props.description = [{ value: 'aa' }, { value: 'bb' }];
    const wrapper = shallow(<VideoMeta {...props} />);
    expect(wrapper.instance().getDescription()).toEqual('aabb');
  });

  it('should get empty string from description as an array if available on props', () => {
    props.description = [{}, {}];
    const wrapper = shallow(<VideoMeta {...props} />);
    expect(wrapper.instance().getDescription()).toEqual('');
  });

  it('should get description as string if available on props', () => {
    delete props.video.richTextDescription;
    props.description = 'test';
    const wrapper = shallow(<VideoMeta {...props} />);
    expect(wrapper.instance().getDescription()).toEqual(props.description);
  });

  it('should get an empty string if no option available', () => {
    delete props.video.richTextDescription;
    delete props.description;
    delete props.video.description;

    const wrapper = shallow(<VideoMeta {...props} />);
    expect(wrapper.instance().getDescription()).toEqual('');
  });

  it('should update Page Context (manual)', () => {
    const wrapper = mount(<VideoMeta {...props} />);
    wrapper.instance().updateTitle(props.title);
    wrapper.instance().onComponentWillReceiveProps(props);
    wrapper.update();

    wrapper.instance().updatePageContext(null, null, props.store);
    expect(document.title).toEqual(props.title);
  });

  it('should update Page Context (manual)', () => {
    const wrapper = mount(<VideoMeta {...props} />);
    wrapper.instance().updateTitle(props.title);
    const nextProps = {
      ...props,
      index: 0,
      uri: 'https://tudn.com/futbol/algo-video',
      title: 'another title',
    };
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://tudn.com/otro-video',
      },
    });
    wrapper.instance().onComponentWillReceiveProps(nextProps);
    wrapper.update();

    wrapper.instance().updatePageContext(null, null, props.store);
    expect(document.title).toEqual(nextProps.title);
  });

  it('should call updatePageContext if link and title available', () => {
    const nextProps = {
      mcpid: 789,
      currentMcpId: 789,
      permalink: 'link',
      title: 'title',
    };

    props.mcpid = 456;

    const wrapper = mount(<VideoMeta {...props} />);
    wrapper.instance().updatePageContext = jest.fn();
    wrapper.instance().updateTitle(props.title);
    wrapper.instance().onComponentWillReceiveProps(nextProps, true);
    expect(wrapper.instance().updatePageContext).toBeCalled();
  });

  it('should call updatePageContext if link and title available', () => {
    const nextProps = {
      mcpid: 789,
      currentMcpId: 789,
      title: 'title',
      uid: 'abc',
    };

    props.mcpid = 456;
    props.uid = 'abc';

    const wrapper = mount(<VideoMeta {...props} />);
    wrapper.instance().updateTitle(props.title);
    wrapper.instance().onComponentWillReceiveProps(nextProps, true);
    wrapper.instance().updatePageContext = jest.fn();
    expect(wrapper.instance().updatePageContext).not.toBeCalled();
  });

  it('should update Page Context (url, no title)', () => {
    const wrapper = mount(<VideoMeta {...props} />);

    // we need to set this manually since document.title was overwritten by last test
    wrapper.instance().updateTitle(props.title);

    wrapper.instance().onComponentWillReceiveProps(props);
    wrapper.update();

    wrapper.instance().updatePageContext(mockPageContext.permalink, null, props.store);
    expect(document.title).toEqual(props.title);
  });

  it('should use H1 if title is not clickable', () => {
    props.uri = null;
    const wrapper = shallow(<VideoMeta {...props} />);
    const videoMeta = shallow(wrapper.prop('children')());
    expect(videoMeta.find(Title).get(0).props.element).toEqual('h1');
  });

  it('should use H3 if title is clickable', () => {
    props.isClickable = true;
    const wrapper = shallow(<VideoMeta {...props} />);
    const videoMeta = shallow(wrapper.prop('children')());
    expect(videoMeta.find(Title).get(0).props.element).toEqual('h3');
  });

  it('should use H3 if title is clickable', () => {
    props.isClickable = true;
    props.video.uri = props.uri;
    props.uri = null;
    const wrapper = shallow(<VideoMeta {...props} />);
    const videoMeta = shallow(wrapper.prop('children')());
    expect(videoMeta.find(Title).get(0).props.element).toEqual('h3');
  });

  it('should use H3 if there is a link', () => {
    props.video.uri = null;
    props.uri = null;
    props.isClickable = true;
    props.onClick = jest.fn();
    const wrapper = shallow(<VideoMeta {...props} />);
    const videoMeta = shallow(wrapper.prop('children')());
    expect(videoMeta.find(Title).get(0).props.element).toEqual('h3');
  });

  it('should render the live label', () => {
    props.theme = {
      mainGradient: true,
      device: 'mobile',
    };
    const wrapper = shallow(<VideoMeta {...props} showLiveLabel />);
    const videoMeta = shallow(wrapper.prop('children')());
    expect(videoMeta.find(Label)).toHaveLength(1);
  });

  it('should render the noticiasLive logo', () => {
    props.isNewsDigitalChannel = true;
    props.isLivestreamPage = false;
    const wrapper = shallow(<VideoMeta {...props} showLiveLabel />);
    const videoMeta = shallow(wrapper.prop('children')());
    const iconProps = videoMeta.find('Icon').props();
    expect(iconProps.name).toBe('live247');
  });

  it('should call history.replace if context.history is set', () => {
    const history = {
      replace: jest.fn(fn => fn),
    };
    const wrapper = shallow(<VideoMeta {...props} />);
    shallow(wrapper.prop('children')({ history }));
    const instance = wrapper.instance();
    instance.componentDidMount();
    instance.updatePageContext(mockPageContext.permalink, null, props.store);
    expect(history.replace).toHaveBeenCalled();
    history.replace.mockClear();
    instance.componentWillUnmount();
    instance.updatePageContext(mockPageContext.permalink, null, props.store);
    expect(history.replace).not.toHaveBeenCalled();
  });

  it('should get correct description', () => {
    delete props.authors;
    props.isClickable = false;
    props.program = {
      startTimeDislay: '12:00PM',
      title: 'test',
      endTimeDisplay: '3:00PM',
    };
    props.theme = {
      mainGradient: false,
      device: 'desktop',
    };
    props.video.isLivestream = true;
    props.isLivestreamPage = true;
    const wrapper = mount(<VideoMeta {...props} />);
    expect(wrapper.instance().getDescription()).toEqual('');
  });

  it('should get correct description', () => {
    delete props.authors;
    props.isClickable = false;
    props.program = {
      startTimeDislay: '12:00PM',
      title: 'test',
      endTimeDisplay: '3:00PM',
    };
    props.smallVersion = false;
    props.device = 'mobile';
    props.theme = {
      mainGradient: true,
      device: 'mobile',
    };
    props.isLivestreamPage = true;
    const wrapper = mount(<VideoMeta {...props} />);
    expect(wrapper.instance().getDescription()).toEqual('');
  });

  it('should get correct description', () => {
    delete props.authors;
    props.isClickable = false;
    props.program = {
      startTimeDislay: '12:00PM',
      title: 'test',
      endTimeDisplay: '3:00PM',
    };
    props.smallVersion = false;
    props.device = 'desktop';
    props.theme = {
      mainGradient: true,
      device: 'desktop',
    };
    props.isLivestreamPage = true;
    const wrapper = mount(<VideoMeta {...props} />);
    expect(wrapper.instance().getDescription()).toEqual('');
  });
});
