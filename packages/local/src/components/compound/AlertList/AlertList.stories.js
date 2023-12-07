import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport/src/preview';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import AlertList from './index';
import props from './AlertItem/__mocks__/data.json';

const store = configureStore();
const graphqlUrl = 'https://int-graphql.dev-univision.com';

storiesOf('Widgets/Alert List', module)
  .addDecorator(withViewport('iphone8p'))
  .add('Generic', () => {
    store.dispatch(setPageData({
      data: { tvStation: { call: 'KDTV' } },
      config: { graphql: graphqlUrl },
    }));
    return (
      <Provider store={store}>
        <AlertList
          alerts={[props, props]}
          county="San Bernardino and Riverside County Valleys"
        />
      </Provider>
    );
  });
