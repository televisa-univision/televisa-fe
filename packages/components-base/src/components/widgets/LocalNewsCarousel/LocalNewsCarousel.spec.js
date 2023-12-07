import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import { setCurrentMarketByLocation, setContentByMarketLocation } from '@univision/fe-commons/dist/store/actions/local/local-actions';

import LocalNewsCarousel from '.';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');
jest.mock('@univision/shared-components/dist/components/weather/Temp', () => 'mock-temp');
jest.mock('@univision/shared-components/dist/components/weather/LocationDate', () => 'mock-location');
jest.mock('@univision/shared-components/dist/components/weather/ForecastRow', () => 'mock-forecastrow');

describe('LocalNewsCarousel', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    console.error = jest.fn(); // eslint-disable-line no-console
    const el = (
      <Provider store={Store}>
        <LocalNewsCarousel />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    Store.dispatch(setCurrentMarketByLocation('KMEX'));
    Store.dispatch(setContentByMarketLocation('KMEX', ['test']));
    const wrapper = mount(
      <Provider store={Store}>
        <LocalNewsCarousel />
      </Provider>
    );

    expect(wrapper.find('LocalBar__Wrapper')).toHaveLength(1);
  });
});
