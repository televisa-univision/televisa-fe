import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import {
  setWeatherForecastByLocal, setIsCelsiusDisabled, setIsCelsiusActive,
} from '@univision/fe-commons/dist/store/actions/local/local-actions';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { SET_WEATHER_ALERTS } from '@univision/fe-commons/dist/store/actions/local/local-action-types';

import { convertFahrenheitToCelsius } from '../../../utils/helpers';
import OpeningWeatherForecast from '.';

const pageData = {
  data: {
    tvStation: {
      call: 'KMEX',
    },
  },
};

const weatherData = {
  icon: 30,
  tempF: 32,
  maxTempF: 40,
  minTempF: 20,
  precipChance: 20,
  precipType: 'rain',
  humidity: 20,
  windDirection: 'SSE',
  windSpeedMph: 10,
  phrase: 'Parcialmente nublado',
};

/** @test {OpeningWeatherForecast} */
describe('OpeningWeatherForecast', () => {
  let cmp;

  beforeAll(() => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(setWeatherForecastByLocal('KMEX', weatherData));
    Store.dispatch(setIsCelsiusDisabled());
  });

  describe('when temperature fahrenheit', () => {
    beforeEach(() => {
      cmp = mount(
        <Provider store={Store}>
          <OpeningWeatherForecast />
        </Provider>
      );
    });

    it('displays tempF', () => {
      expect(cmp.html()).toMatch(`${weatherData.tempF}`);
    });

    it('displays maxTempF', () => {
      expect(cmp.html()).toMatch(`${weatherData.maxTempF}`);
    });

    it('displays minTempF', () => {
      expect(cmp.html()).toMatch(`${weatherData.minTempF}`);
    });
  });

  describe('when temperature celsius', () => {
    beforeAll(() => {
      Store.dispatch(setIsCelsiusActive());
    });

    beforeEach(() => {
      cmp = mount(
        <Provider store={Store}>
          <OpeningWeatherForecast />
        </Provider>
      );
    });

    it('displays converted tempF', () => {
      const tempC = convertFahrenheitToCelsius(weatherData.tempF);
      expect(cmp.html()).toMatch(`${tempC}`);
    });

    it('displays converted maxTempF', () => {
      const maxTempC = convertFahrenheitToCelsius(weatherData.maxTempF);
      expect(cmp.html()).toMatch(`${maxTempC}`);
    });

    it('displays converted minTempF', () => {
      const minTempC = convertFahrenheitToCelsius(weatherData.minTempF);
      expect(cmp.html()).toMatch(`${minTempC}`);
    });
  });

  it('should render with alerts', () => {
    Store.dispatch({
      type: SET_WEATHER_ALERTS,
      local: pageData.data.tvStation.call,
      weatherAlerts: {
        totalCount: 1,
      },
    });
    Store.dispatch(setWeatherForecastByLocal('KMEX', null));
    const wrapper = mount(
      <Provider store={Store}>
        <OpeningWeatherForecast
          weatherAlerts={{ totalCount: 1 }}
          widgetContext={{ position: 2 }}
        />
      </Provider>
    );

    expect(wrapper.find('WeatherBanner__Wrapper')).toHaveLength(1);
  });
});
