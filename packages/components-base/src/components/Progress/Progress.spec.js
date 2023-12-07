import React from 'react';
import { mount, shallow } from 'enzyme';

import Features from '@univision/fe-commons/dist/config/features';
import { UP, DOWN } from '@univision/fe-commons/dist/constants/direction';
import Store from '@univision/fe-commons/dist/store/store';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import Progress from './Progress';

const props = {
  loadedContents: [
    {
      uid: '334343434',
    },
  ],
  items: [
    {
      uid: '334343434',
      getAttribute: jest.fn(() => '334343434'),
      getBoundingClientRect: () => ({
        top: -10,
        bottom: 500,
        height: 500,
      }),
    },
  ],
};

let hideHeaderFooterSpy;

beforeEach(() => {
  hideHeaderFooterSpy = jest.spyOn(Features.header, 'hideHeaderFooter');
  Store.dispatch(setHeaderConf({ scrollDirection: UP }));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Progress article loader tests', () => {
  it('renders as expected', () => {
    const wrapper = mount(<Progress {...props} />);
    expect(wrapper.find('Progress__ProgressWrapper')).toHaveLength(1);
  });

  it('should return null if there is not data', () => {
    const wrapper = mount(<Progress items={[]} />);
    expect(wrapper.find('Progress__ProgressWrapper')).toHaveLength(0);
  });

  it('should add event listener on componentDidMount', () => {
    const wrapper = mount(<Progress {...props} />);
    spyOn(window, 'addEventListener');
    wrapper.instance().componentDidMount();
    expect(window.addEventListener).toBeCalled();
  });

  it('should remove event listener on componentWillUnmount', () => {
    const wrapper = mount(<Progress {...props} />);
    spyOn(window, 'removeEventListener');
    wrapper.instance().componentWillUnmount();
    expect(window.removeEventListener).toBeCalled();
  });

  it('should have onScrollHandler setState if scroll top is less than progress offset', () => {
    const wrapper = mount(<Progress {...props} />);
    const instance = wrapper.instance();
    instance.progressLoader.current = { offsetTop: 50 };
    instance.onScrollHandler();
    expect(wrapper.state('showProgressBar')).toBe(false);
    document.body.scrollTop = 140;
    instance.onScrollHandler();
    expect(wrapper.state('showProgressBar')).toBe(true);
    document.body.scrollTop = 0;
    instance.onScrollHandler();
    instance.progressLoader.current = null;
    instance.onScrollHandler();
  });

  it('check if/else when item is hidden', () => {
    const customItem = {
      uid: '334343434',
      getAttribute: jest.fn(() => '334343434'),
      getBoundingClientRect: () => ({
        top: 100,
        bottom: 500,
      }),
    };
    const wrapper = mount(<Progress loadedContents={props.loadedContents} items={[customItem]} />);
    wrapper.instance().progressLoader.current = { offsetTop: 50 };
    document.body.scrollTop = 120;
    wrapper.instance().onScrollHandler();
  });

  it('check if/else when item top position is greater than 0', () => {
    const customItem = {
      uid: '334343434',
      getAttribute: jest.fn(() => '334343434'),
      getBoundingClientRect: () => ({
        top: -10,
        bottom: 10,
      }),
    };
    props.items[0] = customItem;
    const wrapper = mount(<Progress {...props} />);
    const instance = wrapper.instance();
    instance.progressLoader.current = { offsetTop: 50 };
    document.body.scrollTop = 120;
    instance.onScrollHandler();
  });

  it('should have onScrollHandler set showProgressBar false when progress >= 99', () => {
    Store.dispatch(setPageData({
      data: {
        tvStation: {
          call: 'WLII',
          uri: 'https://univision.com',
        },
      },
      device: 'desktop',
    }));
    const wrapper = mount(<Progress {...props} />);
    const instance = wrapper.instance();

    // expect bar to be shown when progress < 99
    wrapper.setState({ progress: 50 });
    document.body.scrollTop = 203;
    instance.onScrollHandler();
    expect(wrapper.state('showProgressBar')).toBe(true);

    // expect bar to be hidden when progress is >= 99
    wrapper.setState({ progress: 100 });
    instance.onScrollHandler();
    expect(wrapper.state('showProgressBar')).toBe(false);
  });

  it('should set top 0 if header is not visible', () => {
    hideHeaderFooterSpy.mockReturnValue(true);
    const wrapper = shallow(<Progress {...props} />);
    expect(wrapper.find('Progress__ProgressWrapper')).toHaveStyleRule('top', '0');
  });

  it('should set top 0 if new header is active', () => {
    document.body.scrollTop = 120;
    props.scrollDirection = DOWN;
    const wrapper = mount(<Progress {...props} />);
    expect(wrapper.find('Progress__ProgressWrapper')).toHaveStyleRule('top', '0');
  });

  it('should set transition none if locales', () => {
    Store.dispatch(setPageData({
      data: {
        tvStation: {
          call: 'WLII',
          uri: 'https://univision.com',
        },
      },
    }));
    document.body.scrollTop = 120;
    props.scrollDirection = DOWN;
    const wrapper = mount(<Progress {...props} />);
    expect(wrapper.find('Progress__ProgressWrapper')).toHaveStyleRule('transition', 'none');
  });
});
