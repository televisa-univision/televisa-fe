import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import props from './__mocks__/weatherCardSlideshow';
import WeatherCardSlideshow from '.';

const store = configureStore();

storiesOf('Widgets/Weather/Weather Card Slide show', module)
  .addDecorator(withViewport('iphone8p'))
  .add('default', () => (
    <Provider store={store}>
      <WeatherCardSlideshow {...props} />
    </Provider>
  ));
