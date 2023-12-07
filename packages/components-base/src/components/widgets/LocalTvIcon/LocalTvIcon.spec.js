import React from 'react';
import { shallow } from 'enzyme';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import LocalTvIcon from '.';

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getBrandable: jest.fn(),
  getDevice: jest.fn(),
}));

describe('LocalTvIcon', () => {
  it('should render the component with live broadcast', () => {
    const wrapper = shallow(<LocalTvIcon />);
    wrapper.setState({
      liveBroadcast: true,
    });
    expect(wrapper.find('.mainContainer.liveBroadcast')).toHaveLength(1);
  });

  it('should render the component with no live broadcast', () => {
    getDevice.mockReturnValueOnce('mobile');
    const wrapper = shallow(<LocalTvIcon />);
    wrapper.setState({
      liveBroadcast: false,
    });
    expect(wrapper.find('.mainContainer')).toHaveLength(1);
    expect(wrapper.find('.mainContainer.liveBroadcast')).toHaveLength(0);
  });

  it('should track all clicks if the event name is defined', () => {
    spyOn(WidgetTracker, 'track');
    spyOn(NavigationTracker, 'track');
    const trackingEvent = 'test';
    const wrapper = shallow(<LocalTvIcon trackingEvent={trackingEvent} />);
    wrapper.simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(
      WidgetTracker.events.engagement,
      { target: trackingEvent }
    );
    expect(NavigationTracker.track).toHaveBeenLastCalledWith(
      NavigationTracker.events.click,
      { eventAction: 'live tv' },
    );
  });

  it('should not track engagement clicks when name is undefined', () => {
    spyOn(WidgetTracker, 'track');
    spyOn(NavigationTracker, 'track');
    const wrapper = shallow(<LocalTvIcon />);
    wrapper.simulate('click');
    expect(WidgetTracker.track).not.toHaveBeenCalled();
  });
});
