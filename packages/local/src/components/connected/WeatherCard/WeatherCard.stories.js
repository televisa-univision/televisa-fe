import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider, batch } from 'react-redux';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import Store from '@univision/fe-commons/dist/store/store';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import {
  setIsCelsiusActive,
  setIsCelsiusDisabled,
  setWeatherForecastByLocal,
} from '@univision/fe-commons/dist/store/actions/local/local-actions';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import { SET_WEATHER_ALERTS } from '@univision/fe-commons/dist/store/actions/local/local-action-types';
import WeatherMock from '../../../../__mocks__/weatherApiMock';
import videoProps from '../../compound/WeatherCardContent/WeatherCardVideo/__mocks__/weatherCardVideo.json';
import slideshowProps from '../../compound/WeatherCardContent/WeatherCardSlideshow/__mocks__/weatherCardSlideshow.json';
import WeatherCard from '.';

const device = getDevice();

batch(() => {
  Store.dispatch(setPageData({
    data: {
      tvStation: {
        call: 'KMEX',
      },
    },
  }));
  Store.dispatch(setWeatherForecastByLocal('KMEX', WeatherMock()));
});

const props = {
  settings: {
    title: 'Pronóstico',
  },
  theme: {
    theme: themes.themes['local/chicago-wgbo'],
  },
  device,
  slideshow: slideshowProps,
  video: videoProps,
  maxTempF: 88,
};

storiesOf('Widgets/WeatherCard', module)
  .addDecorator(story => (

    <div className="uvs-container" style={{ minHeight: 2000 }}>
      <div className="row">
        <div className="col-12 col-md-3">
          <Provider store={Store}>{story()}</Provider>
        </div>
      </div>
    </div>
  ))
  .add('default', () => {
    Store.dispatch(setIsCelsiusDisabled());
    Store.dispatch({ type: SET_WEATHER_ALERTS, local: 'KMEX', weatherAlerts: {} });
    return <WeatherCard {...props} />;
  })
  .add('with celsious', () => {
    Store.dispatch(setIsCelsiusActive());
    Store.dispatch({ type: SET_WEATHER_ALERTS, local: 'KMEX', weatherAlerts: {} });
    return <WeatherCard {...props} />;
  })
  .add('without slideshow', () => {
    Store.dispatch(setIsCelsiusDisabled());
    Store.dispatch({ type: SET_WEATHER_ALERTS, local: 'KMEX', weatherAlerts: {} });
    return <WeatherCard {...props} slideshow={null} />;
  })
  .add('high risk alert banner', () => {
    Store.dispatch(setIsCelsiusDisabled());
    const weatherAlerts = {
      extremeAlert: {
        areaId: 'CAZ035',
        areaName: 'Santa Barbara County Central Coast',
        eventDescription: 'Advertencia de calor por todo la ciudad',
        detailKey: 'bdeff10b-3f98-3e67-959a-e3041a7c3f47',
        severity: 'Extreme',
      },
      totalCount: 1,
    };
    Store.dispatch({ type: SET_WEATHER_ALERTS, local: 'KMEX', weatherAlerts });
    return <WeatherCard {...props} />;
  })
  .add('low risk alert banner', () => {
    Store.dispatch(setIsCelsiusDisabled());
    const weatherAlerts = {
      extremeAlert: null,
      totalCount: 10,
    };
    Store.dispatch({ type: SET_WEATHER_ALERTS, local: 'KMEX', weatherAlerts });
    return <WeatherCard {...props} />;
  });
