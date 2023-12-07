import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport/src/preview';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as devices from '@univision/fe-commons/dist/constants/devices';

import LocalOpening from './LocalOpening';
import data from './__mocks__/localOpening';

const store = configureStore();

storiesOf('Widgets/Local Opening', module)
  .addDecorator(withViewport('iphone8p'))
  .add('mobile', () => {
    store.dispatch(setPageData({ device: devices.MOBILE }));

    return (
      <Provider store={store}>
        <LocalOpening {...data} />
      </Provider>
    );
  })
  .add('desktop', () => {
    store.dispatch(setPageData({ device: devices.DESKTOP }));

    return (
      <Provider store={store}>
        <LocalOpening {...data} />
      </Provider>
    );
  },
  { viewport: 'Default' });
