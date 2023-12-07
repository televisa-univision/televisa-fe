import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import AdhesionUnit from '.';

const store = configureStore();

storiesOf('Clickable/Sticky AdhesionUnit', module)
  .add('default', () => {
    return (
      <Provider store={store}>
        <AdhesionUnit />
      </Provider>
    );
  })
  .add('close after 5 seconds', () => {
    return (
      <Provider store={store}>
        <AdhesionUnit closeTimeOut={5000} />
      </Provider>
    );
  });
