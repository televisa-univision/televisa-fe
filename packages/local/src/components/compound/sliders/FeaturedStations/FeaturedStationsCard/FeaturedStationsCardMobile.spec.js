import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Picture from '@univision/fe-components-base/dist/components/Picture';

import FeaturedStationsCardMobile from './FeaturedStationsCardMobile';

jest.mock('../../../../connected/PlayStationButton/PlayStationButton', () => 'PlayStationButton');
let props;
beforeAll(() => {
  props = {
    activeStationIndex: 2,
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
    ReactDOM.render(<FeaturedStationsCardMobile {...props} />, div);
  });

  it('should be activated when the index and the activeStationIndex are equal', () => {
    const wrapper = shallow(<FeaturedStationsCardMobile {...props} />);
    expect(wrapper.find('.active').exists()).toBe(true);
  });

  it('should be deactivated when the index and the activeStationIndex are not equal', () => {
    props.index = 1;
    const wrapper = shallow(<FeaturedStationsCardMobile {...props} />);
    expect(wrapper.find('.active').exists()).toBe(false);
  });

  it('should render alternative logo', () => {
    const wrapper = shallow(<FeaturedStationsCardMobile {...props} />);
    expect(wrapper.find(Picture).prop('image')).toEqual('alternative');
  });
});
