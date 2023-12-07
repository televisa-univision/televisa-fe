import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import OpeningWeatherForecastPlaceholder from '.';

/**
 * @test {OpeningWeatherForecastPlaceholder}
 */
describe('OpeningWidgetController test', () => {
  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OpeningWeatherForecastPlaceholder />, div);
  });
  it('should render the component as expected', () => {
    const wrapper = shallow(<OpeningWeatherForecastPlaceholder />);
    expect(wrapper.find('OpeningWeatherForecast__SKWrapper')).toHaveLength(1);
  });
});
