import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withBackgrounds } from '@storybook/addon-backgrounds';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import WeatherModal from '.';
import props from './__mocks__/WeatherModal';

storiesOf('Weather Modal', module)
  .addDecorator(withBackgrounds([
    { name: 'Default background', value: 'rgba(0,0,0,0.5)' },
  ]))
  .add('Default - Redesigned', () => {
    return (
      <Provider store={configureStore()}>
        <WeatherModal {...props.modal} />
      </Provider>
    );
  })
  .add('with low risk alerts', () => {
    return (
      <Provider store={configureStore()}>
        <WeatherModal {...props.modal} {...props.weatherBannerLowRisk} />
      </Provider>
    );
  })
  .add('with high risk alerts', () => {
    return (
      <Provider store={configureStore()}>
        <WeatherModal {...props.modal} {...props.weatherBannerHighRisk} />
      </Provider>
    );
  })
  .add('with high risk alerts long text', () => {
    return (
      <Provider store={configureStore()}>
        <WeatherModal {...props.modal} {...props.weatherBannerHighRisk} extremeAlert={{ areaName: 'Staten Island, NY', eventDescription: 'Huracán Agresivo Dorian - Categoría 4' }} />
      </Provider>
    );
  });
