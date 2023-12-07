import React from 'react';
import { shallow } from 'enzyme';
import features from '@univision/fe-commons/dist/config/features';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import LegacyFollowMenu from '.';

jest.mock('../../Button', () => jest.fn());
jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    networks: [{
      name: 'facebook',
      href: '#',
    }],
  };
});
features.deportes.isTudn = jest.fn(() => false);

describe('LegacyFollowMenu tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<LegacyFollowMenu {...props} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });

  it('renders a menu with social network links', () => {
    const wrapper = shallow(<LegacyFollowMenu {...props} />);
    wrapper.instance().toggleMenu();
    wrapper.setState({ open: true });
    expect(wrapper.find('.menu.open')).toHaveLength(1);
  });

  it('should not render the follow us label', () => {
    props.showLabel = false;
    const wrapper = shallow(<LegacyFollowMenu {...props} />);
    expect(wrapper.find('.label.follow')).toHaveLength(0);
  });

  it('should render bold label', () => {
    features.deportes.isTudn.mockReturnValueOnce(true);
    const wrapper = shallow(<LegacyFollowMenu isTudn {...props} />);
    expect(wrapper.find('.label.follow')).toHaveLength(1);
  });

  it('should render the screen overlay label', () => {
    props.addScreenOverlay = true;
    const wrapper = shallow(<LegacyFollowMenu {...props} />);
    wrapper.instance().toggleMenu();
    wrapper.setState({ open: true });
    expect(wrapper.find('.screen')).toHaveLength(1);
  });

  it('should add the gradient background', () => {
    props.addGradientBackground = true;
    props.openDirection = 'down';
    props.variant = 'light';
    props.onToggle = () => {};
    jest.spyOn(props, 'onToggle');
    const wrapper = shallow(<LegacyFollowMenu {...props} />);
    wrapper.instance().toggleMenu();
    wrapper.setState({ open: true });
    expect(wrapper.find('.toggleMenu[style=null]')).toHaveLength(0);
    expect(props.onToggle).toHaveBeenCalled();
  });

  it('should add forceMobileView class name', () => {
    props.forceMobileView = true;
    const wrapper = shallow(<LegacyFollowMenu {...props} />);
    expect(wrapper.find('.forceMobileView').length).not.toBe(0);
  });

  it('should render links with url instead of href', () => {
    const props2 = {
      networks: [{
        name: 'facebook',
        url: '#',
      }],
    };
    const wrapper = shallow(<LegacyFollowMenu {...props2} />);
    expect(wrapper.find('.socialIcon')).toHaveLength(1);
  });

  it('should track when is clicked', () => {
    const navigationTrackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = shallow(<LegacyFollowMenu {...props} />);
    wrapper.find('.facebook').first().simulate('click');
    expect(navigationTrackerSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'topnav-header-brand social icons-facebook',
    });
    expect(navigationTrackerSpy).toHaveBeenCalledTimes(1);
  });
});
