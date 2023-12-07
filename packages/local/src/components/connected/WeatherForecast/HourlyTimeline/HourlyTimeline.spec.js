import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import weatherApiMock from '../../../../../__mocks__/weatherApiMock';
import { hourlyForecastExtractor } from '../../../../utils/helpers';
import HourlyTimeline from '.';

const props = {
  dotSize: 6,
  height: 60,
  width: 2000,
  isCelsius: false,
  paddingGraphic: 30,
};

const data = weatherApiMock({ disableNumber: true });
const hourly = hourlyForecastExtractor(data.forecasts, 4, 'America/New_York');

/** @test {HourlyTimeline} */
describe('HourlyTimeline', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (<HourlyTimeline />);
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    const wrapper = mount(<HourlyTimeline {...props} hourly={hourly} />);

    expect(wrapper.find('HourlyTimeline__Wrapper')).toHaveLength(1);
  });

  it('should render correctly in mobile and desktop', () => {
    const wrapper = mount(<HourlyTimeline {...props} hourly={hourly} isCelsius />);
    expect(wrapper.find('HourlyTimeline__TempItem').at(1).props().xPos).toEqual(970);

    act(() => {
      wrapper.setProps({
        paddingGraphic: 45,
      });
    });
    wrapper.update();

    expect(wrapper.find('HourlyTimeline__TempItem').at(1).props().xPos).toEqual(971);
  });
});
