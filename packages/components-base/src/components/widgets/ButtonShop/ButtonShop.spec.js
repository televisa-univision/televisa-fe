import React from 'react';
import { mount } from 'enzyme';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import ButtonShop from '.';

describe('ButtonShop', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('default button', () => {
    const wrapper = mount(<ButtonShop />);
    expect(wrapper.find('ActionLink')).toBeDefined();
  });

  it('should track when is clicked', () => {
    jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<ButtonShop />);
    wrapper.find('ActionLink').simulate('click');
    expect(NavigationTracker.track).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'topnav-header-shopunivision',
    });
    expect(NavigationTracker.track).toHaveBeenCalledTimes(1);
  });
});
