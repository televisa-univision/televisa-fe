import React from 'react';
import { mount, shallow } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import BaseLink from '../../../Link';

import Link from '.';
import LiveIcon from '../../../LiveIcon';

let props;
jest.useFakeTimers();

describe('GlobalHeaders::Link', () => {
  beforeEach(() => {
    props = {
      text: 'txt',
      link: 'http://google.com',
      theme: {
        primary: 'blue',
      },
      variant: 'light',
      active: false,
      icon: <LiveIcon />,
    };
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.restoreAllMock();
  });

  it('renders Link component', () => {
    const wrapper = shallow(<Link {...props} />);
    expect(wrapper.find(BaseLink)).toHaveLength(1);
    expect(wrapper.find(BaseLink).prop('className')).not.toContain('active');
  });

  it('only adds borderBottomColor to light variant', () => {
    const wrapper = shallow(<Link {...props} />);
    expect(wrapper.find('.activeIndicator').prop('style').borderBottomColor).toBe(props.theme.primary);
    wrapper.setProps({ variant: 'dark' });
    expect(wrapper.find('.activeIndicator').prop('style').borderBottomColor).toBe(undefined);
  });

  it('should add borderBottomColor to section, soccercompetition and soccerteam page', () => {
    const wrapper = shallow(<Link {...props} />);
    ['section', 'soccercompetition', 'soccerteam'].forEach((type) => {
      Store.dispatch(setPageData({
        data: { type },
      }));
      wrapper.setProps({ variant: 'dark' });
      expect(wrapper.find('.activeIndicator').prop('style').borderBottomColor).toBe(props.theme.primary);
    });
  });

  it('should add borderBottomColor to black if theme is empty', () => {
    props.theme = null;
    const wrapper = shallow(<Link {...props} />);
    expect(wrapper.find('.activeIndicator').prop('style').borderBottomColor).toBe(themes.themes.black.primary);
  });

  it('adds the expected active class', () => {
    props.href = '#test';
    props.active = true;
    const wrapper = shallow(<Link {...props} />);
    expect(wrapper.find(BaseLink).prop('className')).toContain('active');
  });

  it('should call scrollIntoView if is active & device is mobile', () => {
    window.Element.prototype.scrollIntoView = jest.fn();
    Store.dispatch(setPageData({
      device: 'mobile',
      userAgent: 'android',
    }));
    const wrapper = mount(<Link {...props} active />);
    const scrollIntoViewSpy = jest.spyOn(wrapper.instance().linkRef.current, 'scrollIntoView');
    jest.runAllTimers();
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  });

  it('should call scrollIntoView if is active & device is mobile & device is ios', () => {
    window.Element.prototype.scrollIntoView = jest.fn();
    Store.dispatch(setPageData({
      device: 'mobile',
      userAgent: 'iPhone',
    }));
    const wrapper = mount(<Link {...props} active />);
    const scrollIntoViewSpy = jest.spyOn(wrapper.instance().linkRef.current, 'scrollIntoView');
    jest.runAllTimers();
    expect(scrollIntoViewSpy).toHaveBeenCalledWith(false);
  });

  it('should clear scrollIntoView timeout on unmount', () => {
    global.Element.prototype.scrollIntoView = jest.fn();
    Store.dispatch(setPageData({
      device: 'mobile',
      userAgent: 'iPhone',
    }));
    const wrapper = mount(<Link {...props} active />);
    wrapper.unmount();
    jest.runOnlyPendingTimers();
    expect(clearTimeout).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should render with Icon', () => {
    const wrapper = shallow(<Link {...props} />);
    expect(wrapper.find('LiveIcon')).toHaveLength(1);
  });
  it('should clear the timeout when component unmounts', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    Store.dispatch(setPageData({
      device: 'mobile',
      userAgent: 'iPhone',
    }));
    const wrapper = mount(<Link {...props} active />);
    wrapper.setState({
      show: true,
      height: 'auto',
    });
    wrapper.instance().componentWillUnmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
