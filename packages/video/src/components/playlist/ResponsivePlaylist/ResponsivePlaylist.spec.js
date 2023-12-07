import React from 'react';
import { shallow, mount } from 'enzyme';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import BreakPoint from '@univision/fe-commons/dist/utils/breakpoint/breakPointMediator';

import ResponsivePlaylist from '.';

jest.mock('@univision/fe-components-base/dist/components/Carousel', () => 'Carousel');

let props;
beforeEach(() => {
  props = {
    content: [
      { uri: '/1', uid: '1', mcpid: '1' },
      { uri: '/2', uid: '2', mcpid: '2' },
      { uri: '/3', uid: '3', mcpid: '3' },
      { uri: '/4', uid: '4', mcpid: '4' },
      { uri: '/5', uid: '5', mcpid: '5' },
      { uri: '/6', uid: '6', mcpid: '6' },
    ],
    onClick: jest.fn(),
    activeIndex: 1,
    isNewsDigitalChannel: true,
    playlistMeta: {
      1: {
        section: {
          name: 'test1',
        },
        adSettings: {
          targeting: {
            vertical: 'testVertical',
          },
        },
      },
    },
  };
  jest.resetAllMocks();
  BreakPoint.value = 'md';
});

describe.skip('ResponsivePlaylist', () => {
  it('renders as expected', () => {
    storeHelpers.getDevice = jest.fn(() => 'desktop');
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    expect(wrapper.find('.videoCardContainer')).toHaveLength(props.content.length);
    expect(wrapper.find('.videoCardContainer').first().find('ResponsivePlaylist__PlaylistCard').props().tagVideo).toBe('test1');
  });

  it('renders as expected', () => {
    BreakPoint.value = 'xs';
    props.showLoadMore = true;
    props.debug = true;
    storeHelpers.getDevice = jest.fn(() => 'mobile');
    storeHelpers.getTheme = jest.fn(() => ({
      mainGradient: true,
      cardsColor: '#333',
    }));

    const wrapper = mount(<ResponsivePlaylist {...props} />);
    expect(wrapper.find('MoreButtonWrapper')).toBeDefined();
  });

  it('renders carousel if playlistView is provided as expected', () => {
    props.playlistView = 'horizontal';
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    expect(wrapper.find('Carousel')).toHaveLength(1);
  });

  it('renders PlaylistPlaceholder if no items are available', () => {
    props.content = [];
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    expect(wrapper.find('PlaylistPlaceholder')).toHaveLength(1);
  });

  it('sets correct itemCount for tablet/mobile', () => {
    Store.dispatch(setPageData({
      device: 'tablet',
      theme: { primary: '#BC0D0D' },
    }));
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    expect(wrapper.instance().itemCount).toBe(4);
  });

  it('sets correct itemCount for desktop', () => {
    storeHelpers.getDevice = jest.fn(() => 'desktop');
    Store.dispatch(setPageData({
      device: 'desktop',
      theme: { primary: '#BC0D0D' },
    }));
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    expect(wrapper.instance().itemCount).toBe(Infinity);
  });

  it('loadMore updates state.page', () => {
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    wrapper.setState({ page: 100 });
    wrapper.instance().loadMore();
    expect(wrapper.state('page')).toBe(101);
  });

  it('renders clickable component when appropriate', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
      theme: { primary: '#BC0D0D' },
    }));
    props.content.push({ uri: '/3', uid: '3' });
    props.content.push({
      uri: '/4',
      uid: '4',
      longform: true,
      authRequired: true,
    });
    props.content.push({ uri: '/5', uid: '5' });
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    wrapper.setState({ page: 1 });
    expect(wrapper.find(Clickable)).toHaveLength(1);
  });

  it('addPlaylistItem adds item at given index', () => {
    const playlistItems = {
      0: {
        scrollTop: 50,
        offsetTop: 50,
      },
      1: {
        scrollTop: 150,
        offsetTop: 150,
      },
    };

    const index = 1;

    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    wrapper.instance().addPlaylistItem(playlistItems[index], index);

    expect(wrapper.instance().playlistItems[index]).toEqual(playlistItems[index]);
  });

  it('addPlaylistItem appends item to playlist (no index provided)', () => {
    const playlistItems = [
      {
        scrollTop: 50,
        offsetTop: 50,
      },
      {
        scrollTop: 150,
        offsetTop: 150,
      },
    ];

    const extraPlaylistItem = {
      scrollTop: 250,
      offsetTop: 250,
    };

    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    wrapper.instance().playlistItems = playlistItems;
    wrapper.instance().addPlaylistItem(extraPlaylistItem);

    expect(wrapper.instance().playlistItems.pop()).toEqual(extraPlaylistItem);
  });

  it('scrollToElement doesn\'t call scrollTo helper if playlist is empty', () => {
    const helperSpy = spyOn(helpers, 'scrollTo');

    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    wrapper.instance().playlistInnerRef(jest.fn());

    const playlistItems = {};
    wrapper.instance().playlistItems = playlistItems;
    wrapper.instance().scrollToElement(null);
    expect(helperSpy).toHaveBeenCalledTimes(0);
  });

  it('scrollToElement scrolls to given element', () => {
    const helperSpy = spyOn(helpers, 'scrollTo');

    const playlistItems = {
      0: {
        scrollTop: 50,
        offsetTop: 50,
      },
      1: {
        scrollTop: 150,
        offsetTop: 150,
      },
    };

    const index = 1;

    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    wrapper.instance().playlistInner = jest.fn();
    wrapper.instance().addPlaylistItem(playlistItems[index], index);
    wrapper.instance().scrollToElement(wrapper.instance().playlistItems[index]);

    expect(helperSpy).toHaveBeenCalledTimes(1);
  });

  it('updating props + autoscroll -> calls scrollToElement and scrolls to given element', () => {
    const playlistItems = [{ scrollTop: 50, offsetTop: 50 }];
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    wrapper.instance().addPlaylistItem(playlistItems[0], null);
    wrapper.instance().scrollToElement = jest.fn();
    wrapper.instance().UNSAFE_componentWillReceiveProps({ activeIndex: 0, autoScroll: true });
    expect(wrapper.instance().scrollToElement).toBeCalled();
  });

  it('updating props without autoscroll -> does not call scrollToElement', () => {
    const playlistItems = [{ scrollTop: 50, offsetTop: 50 }];
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    wrapper.instance().addPlaylistItem(playlistItems[0], null);
    wrapper.instance().scrollToElement = jest.fn();
    wrapper.instance().UNSAFE_componentWillReceiveProps({ activeIndex: 0, autoScroll: false });
    expect(wrapper.instance().scrollToElement).toHaveBeenCalledTimes(0);
  });

  it('updating props with out-of-bounds index + autoscroll -> does not call scrollToElement', () => {
    const playlistItems = [{ scrollTop: 50, offsetTop: 50 }];
    const wrapper = shallow(<ResponsivePlaylist {...props} />);
    wrapper.instance().addPlaylistItem(playlistItems[0], null);
    wrapper.instance().scrollToElement = jest.fn();
    wrapper.instance().UNSAFE_componentWillReceiveProps({ activeIndex: 3, autoScroll: true });
    expect(wrapper.instance().scrollToElement).toHaveBeenCalledTimes(0);
  });
  it('shows full playlist if showLoadMore is false', () => {
    const wrapper = shallow(<ResponsivePlaylist {...props} showLoadMore={false} />);
    wrapper.instance().itemCount = 2;
    expect(wrapper.find('.videoCardContainer')).toHaveLength(props.content.length);
  });
});
