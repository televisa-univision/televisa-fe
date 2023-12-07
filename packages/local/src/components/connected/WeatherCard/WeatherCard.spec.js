import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import {
  setIsCelsiusActive,
  setIsCelsiusDisabled,
  setWeatherForecastByLocal,
} from '@univision/fe-commons/dist/store/actions/local/local-actions';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import { SET_WEATHER_ALERTS } from '@univision/fe-commons/dist/store/actions/local/local-action-types';
import videoProps from '../../compound/WeatherCardContent/WeatherCardVideo/__mocks__/weatherCardVideo.json';
import slideshowProps from '../../compound/WeatherCardContent/WeatherCardSlideshow/__mocks__/weatherCardSlideshow.json';
import WeatherMock from '../../../../__mocks__/weatherApiMock';
import WeatherCard from '.';

const props = {
  slideshow: slideshowProps,
  video: videoProps,
  maxTempF: 88,
  widgetContext: {
    name: 'weather card',
    id: 'foo',
    metaData: {
      cardName: 'LocalWeatherForecast - portrait XL',
      cardType: 'forecast',
    },
  },
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

/** @test {WeatherCard} */
describe('WeatherCard', () => {
  beforeAll(() => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(setWeatherForecastByLocal('KMEX', WeatherMock()));
    Store.dispatch(setIsCelsiusDisabled());
  });
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <Provider store={Store}>
        <WeatherCard />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    expect(wrapper.find('WeatherCard__Wrapper')).toHaveLength(1);
  });

  it('should switch tabs when graphics its tapped', () => {
    Store.dispatch(setIsCelsiusActive());

    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    act(() => {
      wrapper.find('WeatherCard__ContentOption').last().simulate('click');
    });

    wrapper.update();

    expect(wrapper.find('WeatherCard__ContentOption').last().prop('isActive')).toBeTruthy();

    act(() => {
      wrapper.find('WeatherCard__ContentOption').first().props().onClick();
    });

    wrapper.update();
    expect(wrapper.find('WeatherCard__ContentOption').last().prop('isActive')).toBeFalsy();
  });

  it('should display snow precipitations', () => {
    const snowPrecip = {
      ...weatherData,
      precipType: 'snow',
    };

    Store.dispatch(setWeatherForecastByLocal('KMEX', snowPrecip));

    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    expect(wrapper.find('WeatherCard').props().precipMessage.message).toEqual('Probabilidad de nevada');
  });

  it('should display precip type', () => {
    const snowPrecip = {
      ...weatherData,
      precipType: 'precip',
    };

    Store.dispatch(setWeatherForecastByLocal('KMEX', snowPrecip));

    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    expect(wrapper.find('WeatherCard').props().precipMessage.message).toEqual('Probabilidad de precipitación');
  });

  it('should display precip type', () => {
    const snowPrecip = {
      ...weatherData,
      precipType: 'fake',
    };

    Store.dispatch(setWeatherForecastByLocal('KMEX', snowPrecip));

    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    expect(wrapper.find('WeatherCard').props().precipMessage).toEqual({});
  });

  it('should track graphic tab click', () => {
    spyOn(NavigationTracker, 'track');
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    act(() => {
      wrapper.find('WeatherCard__ContentOption').last().simulate('click');
    });

    wrapper.update();

    expect(NavigationTracker.track).toHaveBeenLastCalledWith(NavigationTracker.events.click, {
      eventAction: 'engagement_local_weatherforecast_tab_graficos',
    });
  });

  it('should track video tab click', () => {
    spyOn(NavigationTracker, 'track');
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    act(() => {
      wrapper.find('WeatherCard__ContentOption').first().simulate('click');
    });

    wrapper.update();

    expect(NavigationTracker.track).toHaveBeenLastCalledWith(NavigationTracker.events.click, {
      eventAction: 'engagement_local_weatherforecast_tab_video',
    });
  });

  it('should track ver pronóstico completo click', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    act(() => {
      wrapper.find('WeatherCard__SeeForecast').first().props().onClick();
    });

    wrapper.update();

    expect(trackerSpy).toHaveBeenLastCalledWith({
      title: 'Ver pronóstico completo',
    }, props.widgetContext, 'content');
  });

  it('should render weather alert banner', () => {
    Store.dispatch({
      type: SET_WEATHER_ALERTS,
      local: pageData.data.tvStation.call,
      weatherAlerts: {
        totalCount: 1,
      },
    });
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    expect(wrapper.find('WeatherCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('WeatherBanner__Wrapper')).toHaveLength(1);
  });

  it('should show new el tiempo header when weatherAlerts is true', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherCard {...props} />
      </Provider>
    );

    expect(wrapper.find('ElTiempo__Container')).toHaveLength(1);
  });
});
