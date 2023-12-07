import React from 'react';
import ReactDOM from 'react-dom';
import Store from '@univision/fe-commons/dist/store/store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { setWeatherForecastByLocal } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { shallow, mount } from 'enzyme';
import { PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import { SET_WEATHER_ALERTS } from '@univision/fe-commons/dist/store/actions/local/local-action-types';
import WeatherConditionIconComponent from './WeatherConditionIcon';
import WeatherConditionIcon from '.';
import mockData from './__mocks__/WeatherConditionIcon';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');

const props = {
  ...mockData.props,
  fetchWeatherAlerts: jest.fn(),
  setScaleUnit: jest.fn(),
};

const pageData = {
  data: {
    tvStation: {
      call: 'KMEX',
    },
  },
};

const weatherData = {
  icon: 0,
  tempF: 32,
  isCelsius: true,
  maxTempF: 40,
  minTempF: 20,
  precipChance: 20,
  precipType: 'rain',
  hourly: [
    {
      icon: 32,
      tempF: 90,
      localeTime: '3:00pm',
    },
  ],
};

const weatherAlerts = {
  extremeAlert: {
    areaId: 'TXZ141',
    areaName: 'Comanche County',
    eventDescription: 'Advertencia de calor',
    detailKey: '2ea467af-34c6-320e-8a6b-208a6451a536',
    severity: 'Extreme',
  },
  totalCount: 1,
  unreadWeatherAlerts: [],
};

describe('WeatherConditionIcon', () => {
  beforeAll(() => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(setWeatherForecastByLocal('KMEX', weatherData));
    Store.dispatch({ type: SET_WEATHER_ALERTS, local: 'KMEX', weatherAlerts });
  });
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <Provider store={Store}>
        <WeatherConditionIcon />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherConditionIcon />
      </Provider>
    );

    expect(wrapper.find('WeatherConditionIcon__Wrapper')).toHaveLength(1);
  });

  it('should render component with snow precip', () => {
    const snowPrecip = {
      ...weatherData,
      precipType: 'snow',
    };

    Store.dispatch(setWeatherForecastByLocal('KMEX', snowPrecip));
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherConditionIcon />
      </Provider>
    );

    expect(wrapper.find('WeatherConditionIcon').props().precip).toBeDefined();
  });

  it('should render component with precip chance', () => {
    const snowPrecip = {
      ...weatherData,
      precipType: 'precip',
    };

    Store.dispatch(setWeatherForecastByLocal('KMEX', snowPrecip));
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherConditionIcon />
      </Provider>
    );

    expect(wrapper.find('WeatherConditionIcon').props().precip).toBeDefined();
  });

  it('should render component without precip', () => {
    const withoutPrecip = {
      ...weatherData,
      precipType: PLACEHOLDER,
    };

    Store.dispatch(setWeatherForecastByLocal('KMEX', withoutPrecip));
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherConditionIcon localCarousel />
      </Provider>
    );

    expect(wrapper.find('WeatherConditionIcon').props().precip).not.toBeDefined();
  });

  it('should return null if tempF or icon are not valid', () => {
    const wrapper = shallow(<WeatherConditionIconComponent tempF={undefined} icon="t" weatherAlerts={{}} />);

    expect(wrapper.getElement()).toBe(null);
  });

  it('should close the modal if the user clicks the background', async() => {
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherConditionIcon />
      </Provider>
    );
    act(() => {
      wrapper.find('WeatherConditionIcon__WeatherWrapper').first().props().onClick();
    });
    wrapper.update();
    expect(wrapper.find('WeatherConditionIcon__WeatherWrapper')
      .first().prop('isOpen')).toBeTruthy();
    act(() => {
      wrapper.find('AnimatedModalBackground').first().props().onClick();
    });
    wrapper.update();
    expect(wrapper.find('WeatherConditionIcon__WeatherWrapper')
      .first().prop('isOpen')).toBeFalsy();
  });

  it('should open the modal  if the user click the icon', () => {
    const wrapper = shallow(<WeatherConditionIconComponent {...props} />);
    const WeatherWrapper = wrapper.find('WeatherConditionIcon__WeatherWrapper').first();
    act(() => {
      WeatherWrapper.simulate('click');
    });
    // otherwise react returns false as its retain the original prop
    expect(wrapper.find('WeatherConditionIcon__WeatherWrapper')
      .first().prop('isOpen')).toBeTruthy();
  });

  it('should track on modal open', () => {
    spyOn(NavigationTracker, 'track');
    const wrapper = shallow(<WeatherConditionIconComponent {...props} />);
    const WeatherWrapper = wrapper.find('WeatherConditionIcon__WeatherWrapper').first();
    WeatherWrapper.simulate('click');
    expect(NavigationTracker.track).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'topnav-weather-modal',
    });
    expect(NavigationTracker.track).toHaveBeenCalledTimes(1);
  });

  it('should call the trackLocalWeatherWidget Function with "localwidget-weather-modal" parameter', () => {
    const trackLocalWeatherWidget = jest.fn();
    const wrapper = shallow(
      <WeatherConditionIconComponent
        {...props}
        trackLocalWeatherWidget={trackLocalWeatherWidget}
      />
    );
    const WeatherWrapper = wrapper.find('WeatherConditionIcon__WeatherWrapper').first();
    WeatherWrapper.simulate('click');
    expect(trackLocalWeatherWidget).toHaveBeenCalledTimes(1);
    expect(trackLocalWeatherWidget).toHaveBeenCalledWith('localwidget-weather-modal');
  });

  it('should open the modal without crash', () => {
    const wrapper = shallow(<WeatherConditionIconComponent {...props} />);
    const WeatherWrapper = wrapper.find('WeatherConditionIcon__WeatherWrapper').first();
    act(() => {
      WeatherWrapper.simulate('click');
    });
    expect(wrapper.find('WeatherConditionIcon__WeatherWrapper')
      .first().prop('isOpen')).toBeTruthy();
  });
  it('should show the weather high risk icon', () => {
    const wrapper = shallow(<WeatherConditionIconComponent
      {...props}
      weatherAlerts={weatherAlerts}
    />);
    expect(wrapper.find('WeatherConditionIcon__WeatherWrapper')).toHaveLength(1);
    expect(wrapper.find('WeatherConditionIcon__AlertIcon')).toHaveLength(1);
    expect(wrapper.find('WeatherConditionIcon__WeatherIcon')).toHaveLength(0);
  });

  it('should not show the weather high risk icon', () => {
    const wrapper = shallow(<WeatherConditionIconComponent
      {...props}
      weatherAlerts={{}}
      localCarousel
    />);
    expect(wrapper.find('WeatherConditionIcon__WeatherWrapper')).toHaveLength(1);
    expect(wrapper.find('WeatherConditionIcon__AlertIcon')).toHaveLength(0);
    expect(wrapper.find('WeatherConditionIcon__WeatherIcon')).toHaveLength(1);
  });

  it('should render weather alert badge', () => {
    const weatherAlertsWithUnreadAlerts = { ...weatherAlerts, unreadWeatherAlerts: [1] };
    const wrapper = shallow(<WeatherConditionIconComponent
      {...props}
      weatherAlerts={weatherAlertsWithUnreadAlerts}
    />);
    expect(wrapper.find('WeatherConditionIcon__WeatherAlertWrapper')).toHaveLength(1);
  });

  it('should call setScaleUnit on mount', () => {
    mount(<WeatherConditionIconComponent {...props} />);
    expect(props.setScaleUnit).toHaveBeenCalledTimes(1);
  });

  it('should call fetchWeatherForecast when there was an error in ssr', () => {
    const fetchWeatherData = jest.fn();
    mount(
      <WeatherConditionIconComponent {...props} forecastError fetchWeatherData={fetchWeatherData} />
    );
    expect(fetchWeatherData).toHaveBeenCalledTimes(1);
  });
});
