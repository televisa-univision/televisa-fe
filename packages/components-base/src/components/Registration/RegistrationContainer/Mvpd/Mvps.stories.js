import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Mvpd from '.';

const store = configureStore();

storiesOf('Registration/Mvpd', module)
  .add('default', () => (
    <Provider store={store}>
      <Mvpd />
    </Provider>
  ));
