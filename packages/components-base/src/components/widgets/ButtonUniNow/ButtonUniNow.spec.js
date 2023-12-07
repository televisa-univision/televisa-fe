import React from 'react';
import { mount } from 'enzyme';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import Features from '@univision/fe-commons/dist/config/features';
import ButtonUniNow from '.';

Features.header.buttonUniNow = jest.fn(() => 'enVivoTvIcon');

describe('ButtonUniNow', () => {
  let featureHeaderSpy;
  beforeEach(() => {
    featureHeaderSpy = jest.spyOn(Features.header, 'buttonUniNow');
    featureHeaderSpy.mockReturnValue('enVivoTvIcon');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('default button', () => {
    const wrapper = mount(<ButtonUniNow />);
    expect(wrapper.find('ActionLink')).toBeDefined();
  });

  it('should render the correct display type', () => {
    // EN VIVO TV TEXT
    featureHeaderSpy.mockReturnValue('enVivoTvText');
    let wrapper = mount(<ButtonUniNow />);
    expect(wrapper.find('span').text()).toBe('TV EN VIVO');
    // VER TV ICON
    featureHeaderSpy.mockReturnValue('verTvIcon');
    wrapper = mount(<ButtonUniNow />);
    expect(wrapper.find('span').find('span').text()).toBe('VER');
    // VER TV TEXT
    featureHeaderSpy.mockReturnValue('verTvText');
    wrapper = mount(<ButtonUniNow />);
    expect(wrapper.find('span').text()).toBe('VER TV');
    // WATCH TEXT
    featureHeaderSpy.mockReturnValue('watchIcon');
    wrapper = mount(<ButtonUniNow />);
    expect(wrapper.find('span').text()).toBe('WATCH');
  });

  it('should track when is clicked', () => {
    jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<ButtonUniNow />);
    wrapper.find('ActionLink').simulate('click');
    expect(NavigationTracker.track).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'topnav-header-unow watch button',
    });
    expect(NavigationTracker.track).toHaveBeenCalledTimes(1);
  });
});
