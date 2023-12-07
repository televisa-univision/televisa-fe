import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import PodcastCTA from '.';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => jest.fn(),
}));

describe('PodcastCTA', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PodcastCTA />, div);
  });

  it('should call navigation tracker correctly', () => {
    jest.spyOn(pageSelectors, 'deviceSelector').mockReturnValue('mobile');
    spyOn(NavigationTracker, 'track');
    const wrapper = mount(<PodcastCTA />);
    act(() => {
      wrapper.find('PodcastCTA__Wrapper').first().simulate('click');
    });
    expect(NavigationTracker.track).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'topnav-download-app',
    });
  });
});
