import React from 'react';
import { shallow } from 'enzyme';
import StationLinkWrapper from './StationLinkWrapper';

describe('StationLinkWrapper', () => {
  it('should render PlayStationButton if station url is not defined', () => {
    const wrapper = shallow(<StationLinkWrapper station={{}}>Hello world!</StationLinkWrapper>);
    expect(wrapper.find('Connect(PlayStationButtonComponent)')).toHaveLength(1);
  });
  it('should render link if station url is defined', () => {
    const wrapper = shallow(<StationLinkWrapper station={{ uri: 'test' }}>Hello world!</StationLinkWrapper>);
    expect(wrapper.find('Link')).toHaveLength(1);
  });
});
