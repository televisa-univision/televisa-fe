import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import props from './__mocks__/weatherCardVideo';
import WeatherCardVideo from '.';

const store = configureStore();

storiesOf('Widgets/Weather/Weather Card Video', module)
  .addDecorator(withViewport('iphone8p'))
  .add('default', () => (
    <Provider store={store}>
      <WeatherCardVideo {...props} />
    </Provider>
  ));
