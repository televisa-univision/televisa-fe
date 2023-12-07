import React from 'react';
import { shallow } from 'enzyme';

import ArchiveTracker from '@univision/fe-commons/dist/utils/tracking/tealium/archive/ArchiveTracker';

import Archive from '..';

describe('Archive page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render without crashing', () => {
    const wrapper = shallow(<Archive />);
    expect(wrapper.find('YearContent')).toHaveLength(1);
  });
  it('should trigger the tracker when clickTracking method is triggered', () => {
    const trackerMock = jest.spyOn(ArchiveTracker, 'track');
    const wrapper = shallow(<Archive />);
    wrapper.find('YearContent').prop('clickTracking')();
    expect(trackerMock).toHaveBeenCalledWith(ArchiveTracker.events.click);
  });
});
