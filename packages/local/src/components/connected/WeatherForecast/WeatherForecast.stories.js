import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider, batch } from 'react-redux';

import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import Store from '@univision/fe-commons/dist/store/store';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import { setWeatherForecastByLocal, setIsCelsiusDisabled } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import WeatherMock from '../../../../__mocks__/weatherApiMock';
import WeatherForecast from '.';

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
  Store.dispatch(setIsCelsiusDisabled());
});

const props = {
  settings: {
    title: 'Pronóstico',
  },
  theme: {
    theme: themes.themes['local/chicago-wgbo'],
  },
  device,
};

storiesOf('Widgets/Weather/Weather Forecast', module)
  .addDecorator(story => (
    <div className="uvs-container">
      <Provider store={Store}>{story()}</Provider>
    </div>
  ))
  .add('default', () => <WeatherForecast {...props} />);
