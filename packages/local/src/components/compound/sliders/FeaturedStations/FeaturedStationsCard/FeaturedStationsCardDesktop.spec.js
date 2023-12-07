import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Picture from '@univision/fe-components-base/dist/components/Picture';

import FeaturedStationsCardDesktop from './FeaturedStationsCardDesktop';

jest.mock('../../../../connected/PlayStationButton/PlayStationButton', () => 'PlayStationButton');
let props;
beforeAll(() => {
  props = {
    theme: {
      alphaGradient: '#fff',
    },
    card: {
      uri: 'http://google',
      title: 'title',
      radioStation: {
        alternativeLogo: 'alternative',
      },
    },
    index: 2,
  };
});

/** @test {FeaturedStations} */
describe('Featured Stations Card Mobile Component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FeaturedStationsCardDesktop {...props} />, div);
  });

  it('should be activated when mouse enter', () => {
    const wrapper = shallow(<FeaturedStationsCardDesktop {...props} />);
    wrapper.simulate('mouseEnter');
    expect(wrapper.state('isHover')).toBe(true);
  });

  it('should be deactivated when the mouse leaves', () => {
    const wrapper = shallow(<FeaturedStationsCardDesktop {...props} />);
    wrapper.simulate('mouseLeave');
    expect(wrapper.state('isHover')).toBe(false);
  });

  it('should render alternative logo', () => {
    const wrapper = shallow(<FeaturedStationsCardDesktop {...props} />);
    expect(wrapper.find(Picture).prop('image')).toEqual('alternative');
  });
});
