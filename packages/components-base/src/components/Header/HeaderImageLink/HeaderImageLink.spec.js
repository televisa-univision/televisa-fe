import React from 'react';
import { shallow } from 'enzyme';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../../Link';

import HeaderImageLink from './HeaderImageLink';

describe('HeaderImageLink tests', () => {
  it('renders a div item with an image and text', () => {
    const item = { text: 'name', href: 'thelink', icon: 'theicon' };
    const wrapper = shallow(<HeaderImageLink item={item} />);
    const link = wrapper.find(Link);
    const image = wrapper.find(Icon);
    expect(wrapper.find('div')).toHaveLength(3);
    expect(link.prop('href')).toEqual('thelink');
    expect(image.prop('name')).toEqual('theicon');
  });

  it('should track when uninow icon is clicked', () => {
    const item = { text: 'Now', href: 'thelink', icon: 'theicon' };
    const navigationTrackerSpy = jest.spyOn(NavigationTracker, 'track');
    let wrapper = shallow(<HeaderImageLink item={item} />);
    wrapper.find('Link').simulate('click');
    expect(navigationTrackerSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'header-apps-now',
    });
    expect(navigationTrackerSpy).toHaveBeenCalledTimes(1);
    wrapper = shallow(<HeaderImageLink item={{ text: 'text', href: 'thelink', icon: 'theicon' }} />);
    wrapper.find('Link').simulate('click');
  });
});
