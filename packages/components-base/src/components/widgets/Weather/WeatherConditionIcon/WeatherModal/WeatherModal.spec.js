import React from 'react';
import ReactDOM from 'react-dom';
import Store from '@univision/fe-commons/dist/store/store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import WeatherModal from '.';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');

const props = {
  icon: 'redCard',
  isCelsius: true,
  tempF: 32,
  maxTempF: 40,
  minTempF: 20,
  hourly: [
    {
      icon: 32,
      tempF: 90,
      localeTime: '3:00pm',
    },
  ],
  precip: 'Probabilidad de lluvia 20%',
};

/** @test {WeatherModal} */
describe('WeatherModal', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <Provider store={Store}>
        <WeatherModal isVisible {...props} />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should not render the modal background', () => {
    const wrapper = shallow(<WeatherModal />);
    expect(wrapper.find('WeatherModal__Modal')).toHaveLength(0);
  });

  it('should render the modal background', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherModal {...props} isVisible isCelsius={false} />
      </Provider>
    );

    expect(wrapper.find('WeatherModal__Modal')).toHaveLength(1);
    expect(wrapper.find('mock-widget')).toHaveLength(1);
  });

  it('should fallback to an object if hourly items are not objects', () => {
    const hourly = [
      'test',
      'foo',
      undefined,
    ];
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherModal {...props} isVisible hourly={hourly} localCarousel />
      </Provider>
    );

    expect(wrapper.find('WeatherModal__Modal')).toHaveLength(1);
    expect(wrapper.find('mock-widget')).toHaveLength(0);
  });

  it('should track the see complete forecast ', () => {
    spyOn(NavigationTracker, 'track');
    const wrapper = shallow(<WeatherModal {...props} isVisible />);
    const icon = wrapper.find('WeatherModal__SeeForecast');
    icon.simulate('click');
    expect(NavigationTracker.track).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'topnav-weather-pronostico completo',
    });
    expect(NavigationTracker.track).toHaveBeenCalledTimes(1);
  });

  it('should call the trackLocalWeatherWidget Function with "localwidget-weather-pronostico completo" parameter', () => {
    const trackLocalWeatherWidget = jest.fn();
    const wrapper = shallow(<WeatherModal
      {...props}
      isVisible
      trackLocalWeatherWidget={trackLocalWeatherWidget}
    />);
    const icon = wrapper.find('WeatherModal__SeeForecast');
    icon.simulate('click');
    expect(trackLocalWeatherWidget).toHaveBeenCalledTimes(1);
    expect(trackLocalWeatherWidget).toHaveBeenCalledWith('localwidget-weather-pronostico completo');
  });

  it('should render the new weather modal', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherModal {...props} isVisible isCelsius={false} />
      </Provider>
    );

    expect(wrapper.find('ElTiempo__Container')).toHaveLength(1);
  });
});
