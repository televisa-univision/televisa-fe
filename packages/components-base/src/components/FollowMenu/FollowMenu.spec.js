import React from 'react';
import { shallow } from 'enzyme';

import Features from '@univision/fe-commons/dist/config/features';

import FollowMenu from '.';

describe('FollowMenu', () => {
  let isMegaMenuEnabledSpy;

  beforeEach(() => {
    isMegaMenuEnabledSpy = jest.spyOn(Features.header, 'isMegaMenuEnabled');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render legacy follow menu if mega menu is disabled', () => {
    isMegaMenuEnabledSpy.mockReturnValue(false);
    const wrapper = shallow(<FollowMenu />);

    expect(wrapper.find('LegacyFollowMenu').length).toBe(1);
    expect(wrapper.find('NewFollowMenu').length).toBe(0);
  });

  it('should render new follow menu if mega menu is enabled', () => {
    isMegaMenuEnabledSpy.mockReturnValue(true);
    const wrapper = shallow(<FollowMenu />);

    expect(wrapper.find('LegacyFollowMenu').length).toBe(0);
    expect(wrapper.find('NewFollowMenu').length).toBe(1);
  });

  it('should render the legacy follow menu if on TUDN', () => {
    isMegaMenuEnabledSpy.mockReturnValue(true);
    const wrapper = shallow(<FollowMenu isTudn />);

    expect(wrapper.find('LegacyFollowMenu').length).toBe(1);
    expect(wrapper.find('NewFollowMenu').length).toBe(0);
  });

  it('should render the legacy follow menu if explicitly requested', () => {
    isMegaMenuEnabledSpy.mockReturnValue(true);
    const wrapper = shallow(<FollowMenu useLegacy />);

    expect(wrapper.find('LegacyFollowMenu').length).toBe(1);
    expect(wrapper.find('NewFollowMenu').length).toBe(0);
  });
});
