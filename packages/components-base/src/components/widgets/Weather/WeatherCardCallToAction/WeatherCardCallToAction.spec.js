import React from 'react';
import { mount } from 'enzyme';
import WeatherCardCallToAction from '.';

const props = {
  uri: 'local/san-francisco-kdtv',
  className: 'uvs-font',
  trackingHandler: jest.fn(),
};

describe('WeatherCallToAction', () => {
  it('should render properly', () => {
    const wrapper = mount(<WeatherCardCallToAction {...props} />);
    wrapper.find('WeatherCardCallToAction__SeeForecast');
    expect(wrapper.find('WeatherCardCallToAction__SeeForecast')).toHaveLength(1);
  });

  it('should render nothing if url was not provided', () => {
    const wrapper = mount(<WeatherCardCallToAction />);
    expect(wrapper.find('WeatherCardCallToAction__SeeForecast')).toHaveLength(0);
  });
});
