import React from 'react';
import { shallow } from 'enzyme';

import PlayStationButton from '../../connected/PlayStationButton/PlayStationButton';

import StationLaunch from './StationLaunch';

jest.mock('../../connected/PlayStationButton/PlayStationButton', () => jest.fn());

/** @test {StationLaunch} */
describe('StationLaunch ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<StationLaunch />);
    expect(wrapper.find(PlayStationButton)).toHaveLength(2);
  });

  it('should render the css classes', () => {
    const className = 'visible';
    const wrapper = shallow(<StationLaunch className={className} />);
    expect(wrapper.find(`div.${className}`).length).toBe(1);
  });
});
