import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { withViewport } from '@storybook/addon-viewport';
import mock from './mock.json';
import JobSearch from './index';

const store = configureStore();

storiesOf('Widgets/JobSearch', module)
  .addDecorator(withViewport('iphone8p'))
  .add('default', () => {
    const graphqlUrl = 'https://graphql.test-univision.com/';
    store.dispatch(setPageData({
      data: { tvStation: { call: 'WGBO' } },
      config: { graphql: graphqlUrl },
    }));

    return (
      <Provider store={store}>
        <div style={{ padding: 20 }}>
          <JobSearch {...mock} />
        </div>
      </Provider>
    );
  });
