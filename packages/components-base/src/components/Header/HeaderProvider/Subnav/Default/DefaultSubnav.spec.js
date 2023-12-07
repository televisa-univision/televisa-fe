import React from 'react';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import features from '@univision/fe-commons/dist/config/features';
import * as helpers from '../helpers';

import Subnav from '.';
import Styles from './DefaultSubnav.scss';

const mockData = { data: {} };
features.deportes.isTudn = jest.fn(() => false);
storeHelpers.getPageData = jest.fn(() => mockData);

jest.mock('../../GlobalHeaderLink', () => 'GlobalHeaderLink');

let props;
beforeEach(() => {
  props = {
    links: [
      { link: '#', name: 'Univision', target: '_blank' },
      { link: '#a', name: 'Entertainment', target: '_self' },
    ],
    variant: 'light',
    theme: {
      primary: 'blue',
    },
    styling: {
      activeLinkIndicatorColor: 'red',
    },
  };
});

const itemLinks = [
  {
    name: 'first link',
    link: '#a',
  },
  {
    name: 'second link',
    link: '#b',
  },
  {
    name: 'third link',
    link: '#c',
  },
  {
    name: 'fourth link',
    link: '#d',
  },
  {
    name: 'fifth link',
    link: '#e',
  },
  {
    name: 'sixth link',
    link: '#f',
  },
  {
    name: 'seventh link',
    link: '#g',
  },
  {
    name: 'eighth link',
    link: '#h',
  },
  {
    name: 'ninth link',
    link: '#i',
  },
  {
    name: 'tenth link',
    link: '#j',
  },
];

describe('GlobalHeaders::Subnav', () => {
  it('renders as expected', () => {
    props.variant = 'dark';
    const wrapper = shallow(<Subnav {...props} />);
    expect(wrapper.find('GlobalHeaderLink')).toHaveLength(props.links.length);
  });

  it('returns null if no links are provided', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    props.links = [];
    const wrapper = shallow(<Subnav {...props} />);
    expect(wrapper.getElement()).toBe(null);
    wrapper.setProps({ links: 'not an array' });
    expect(wrapper.getElement()).toBe(null);
  });

  it('returns tudn style if flag provided', () => {
    props.variant = 'light';
    const wrapper = shallow(<Subnav {...props} isTudn />);
    expect(wrapper.find('.bgTransparent').length).toBe(1);
  });

  it('returns tudn style if flag for branded header is provided', () => {
    props.variant = 'dark';
    const wrapper = shallow(<Subnav {...props} isTudn isBrandedHeader />);
    expect(wrapper.find('.bgTransparent').length).toBe(1);
  });

  it('returns dark tudn style if variant is selected', () => {
    props.variant = 'dark';
    const wrapper = shallow(<Subnav {...props} isTudn />);
    expect(wrapper.find('.tudnDarkSectionTitleNav').length).toBe(1);
  });

  it('should render DropDown component', () => {
    props.links = itemLinks;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = shallow(<Subnav {...props} />);
    expect(wrapper.find('DropDown').length).toBe(1);
  });

  it('passes props to Link component', () => {
    const wrapper = shallow(<Subnav {...props} />);
    const links = wrapper.find('Link');

    links.forEach((link, i) => {
      const linkProps = link.props('href');
      const { onClick, ...filteredProps } = linkProps;

      expect(onClick).toBeInstanceOf(Function);
      expect(filteredProps).toEqual({
        href: props.links[i].link,
        text: props.links[i].name,
        active: props.links[i].active,
        className: 'subNavLink',
        theme: props.theme,
        variant: props.variant,
        activeLinkIndicatorColor: getKey(props.styling, 'activeLinkIndicatorColor'),
        target: props.links[i].target,
      });
    });
  });

  it('should track subnav link click', () => {
    const wrapper = shallow(<Subnav {...props} />);
    const links = wrapper.find('GlobalHeaderLink');
    const trackSpy = jest.spyOn(helpers, 'trackSubnavClick');
    trackSpy.mockImplementation(() => {});

    links.forEach(link => link.props().onClick());

    expect(trackSpy).toHaveBeenCalledTimes(2);
    trackSpy.mockRestore();
  });

  it('should use the subNavBackground in the props', () => {
    props.links = itemLinks;
    const wrapper = mount(<Subnav {...props} subNavBackground={{ color: 'red' }} />);
    expect(wrapper.find('DropDown').props().subNavBackground.color).toBe('red');
  });

  it('should use the tudn theme subNavBackground in the props', () => {
    props.variant = 'dark';
    props.links = itemLinks;
    const wrapper = mount(<Subnav links={itemLinks} variant="dark" />);
    expect(wrapper.find('DropDown').props().subNavBackground.color).toBe('#000000');
  });

  it('should set state when addSwipeHelper is called and subNavScroller width is greater than subNavWrapper width', async () => {
    const wrapper = mount(<Subnav {...props} />);
    const instance = wrapper.instance();
    Object.defineProperty(instance.subNavWrapper.current, 'offsetWidth', { value: 320, writable: true });
    Object.defineProperty(instance.subNavScroller.current, 'offsetWidth', { value: 500, writable: true });
    instance.addSwipeHelper();
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(instance.subNavWrapper.current).toBeDefined();
    expect(instance.subNavScroller.current).toBeDefined();
    expect(wrapper.state('scrollerClass')).toBe(Styles.scroller);
    instance.subNavWrapper.current.offsetWidth = 320;
    instance.subNavScroller.current.offsetWidth = 300;
    instance.addSwipeHelper();
  });

  it('should remove event listener when componentWillUnmount is called', () => {
    let wrapper = mount(<Subnav {...props} />);
    const instance = wrapper.instance();
    spyOn(instance.subNavWrapper.current, 'removeEventListener');
    instance.componentWillUnmount();
    expect(instance.subNavWrapper.current.removeEventListener).toBeCalled();
    wrapper = mount(<Subnav {...props} />);
    instance.subNavWrapper.current = null;
    instance.componentWillUnmount();
  });

  it('should add event listener when addSwipeHelper is called and the conditions are the true ones', async () => {
    const wrapper = mount(<Subnav {...props} />);
    const instance = wrapper.instance();
    spyOn(instance.subNavWrapper.current, 'addEventListener');
    Object.defineProperty(instance.subNavWrapper.current, 'offsetWidth', { value: 320, writable: true });
    Object.defineProperty(instance.subNavScroller.current, 'offsetWidth', { value: 500, writable: true });
    instance.addSwipeHelper();
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(instance.subNavWrapper.current.addEventListener).toBeCalled();
  });

  it('should remove event timeout when componentWillUnmount is called', async () => {
    const wrapper = mount(<Subnav {...props} />);
    const instance = wrapper.instance();
    spyOn(instance.subNavWrapper.current, 'addEventListener');
    Object.defineProperty(instance.subNavWrapper.current, 'offsetWidth', { value: 320, writable: true });
    Object.defineProperty(instance.subNavScroller.current, 'offsetWidth', { value: 500, writable: true });
    instance.addSwipeHelper();
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(instance.subNavWrapper.current.addEventListener).toBeCalled();
    spyOn(window, 'clearTimeout');
    instance.componentWillUnmount();
    expect(window.clearTimeout).toBeCalled();
    instance.componentWillUnmount();
  });

  it('should set state of scroll classes when navScroll is called', () => {
    const wrapper = mount(<Subnav {...props} />);
    const instance = wrapper.instance();
    instance.subNavWrapper.current = {
      offsetWidth: 320,
      scrollLeft: 180,
    };
    instance.subNavScroller.current = { offsetWidth: 500 };
    instance.navScroll();
    expect(wrapper.state('gradientRight')).toBe('');
    expect(wrapper.state('gradientLeft')).toBe('');
    instance.subNavWrapper.current = {
      offsetWidth: 320,
      scrollLeft: 100,
    };
    instance.subNavScroller.current = { offsetWidth: 500 };
    instance.navScroll();
    expect(wrapper.state('gradientRight')).toBe(Styles.gradientRight);
    instance.subNavWrapper.current = {
      scrollLeft: 0,
    };
    instance.navScroll();
    expect(wrapper.state('gradientLeft')).toBe('');
    instance.subNavWrapper.current = {
      offsetWidth: 320,
      scrollLeft: 20,
    };
    instance.navScroll();
  });
  it('should not set the state of scroll if it doesn\'t have data', () => {
    const wrapper = mount(<Subnav {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      gradientRight: 10,
    });
    instance.subNavWrapper.current = {
      offsetWidth: 20,
      scrollLeft: 20,
    };
    instance.subNavScroller.current = { offsetWidth: 80 };
    instance.navScroll();
    expect(wrapper.instance().state.toScroll).toBeFalsy();
  });
  it('should support Icons', () => {
    props.links.push({
      name: 'Test Icon',
      target: 'test_icon',
      link: '#',
      icon: {
        type: 'image',
      },
    });
    const wrapper = shallow(<Subnav {...props} />);
    const Icon = wrapper.find('GlobalHeaderLink').last();
    expect(Icon.props().icon).toBeDefined();
  });
  it('should not render Icons if the helper returns null', () => {
    props.links.push({
      name: 'Test Icon',
      target: 'test_icon',
      link: '#',
      icon: {
        type: 'foo',
      },
    });
    const wrapper = shallow(<Subnav {...props} />);
    const Icon = wrapper.find('GlobalHeaderLink').last();
    expect(Icon.props().icon).toBeNull();
  });
});
