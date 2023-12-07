import React from 'react';
import { shallow, mount } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import VideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/VideoTracker';
import ShowHighImpact from '.';

import Clickable from '../../Clickable';
import Logo from '../../Logo';

let props;

beforeEach(() => {
  props = {
    content: [{
      uri: '/shows/al-punto',
      description: 'test description',
      headerLogo: {
        renditions: {
          original: { href: 'test.jpg' },
        },
      },
    }],
  };
});

describe('ShowHighImapct test', () => {
  it('should use correct data', () => {
    const wrapper = shallow(<ShowHighImpact {...props} />);
    expect(wrapper.find('Logo').props().src).toBe('test.jpg');
    expect(wrapper.find('Logo').props().uri).toBe('/shows/al-punto');
    expect(wrapper.find('Clickable').props().href).toBe('/shows/al-punto');
    expect(wrapper.find('ShowHighImpact__Description').text()).toBe('test description');
  });

  it('should show elements for desktop in correct place', () => {
    storeHelpers.getDevice = jest.fn(() => 'desktop');
    const wrapper = mount(<ShowHighImpact {...props} />);

    expect(wrapper.find('ShowHighImpact__Container')).toHaveLength(1);
    expect(wrapper.find('ShowHighImpact__Description')).toHaveLength(1);
    expect(wrapper.find('ShowHighImpact__MoreEpisodesButton')).toHaveLength(1);
    expect(wrapper.find('ShowHighImpact__BottomContent')).toHaveLength(0);
  });

  it('should show elements for mobile in correct place', () => {
    storeHelpers.getDevice = jest.fn(() => 'mobile');
    const wrapper = mount(<ShowHighImpact {...props} />);

    expect(wrapper.find('ShowHighImpact__Container')).toHaveLength(1);
    expect(wrapper.find('ShowHighImpact__Description')).toHaveLength(1);
    expect(wrapper.find('ShowHighImpact__MoreEpisodesButton')).toHaveLength(1);
    expect(wrapper.find('ShowHighImpact__BottomContent')).toHaveLength(1);
  });

  it('should track widget click ver mas', () => {
    const trackSpy = jest.spyOn(VideoTracker, 'track');
    const wrapper = shallow(<ShowHighImpact {...props} />);
    wrapper.find(Clickable).simulate('click');
    expect(trackSpy).toHaveBeenCalledWith(VideoTracker.events.trackClickOnVideoWidgets,
      {
        title: '',
        trackEvent: 'ver_mas_click',
        uid: '',
        widgetContext: undefined,
      });
  });

  it('should track widget click logo', () => {
    const trackSpy = jest.spyOn(VideoTracker, 'track');
    const wrapper = shallow(<ShowHighImpact {...props} />);
    wrapper.find(Logo).simulate('click');
    expect(trackSpy).toHaveBeenCalledWith(VideoTracker.events.trackClickOnVideoWidgets,
      {
        title: '',
        trackEvent: 'content_click',
        uid: '',
        widgetContext: undefined,
      });
  });
});
