import React from 'react';
import { storiesOf } from '@storybook/react';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { Provider } from 'react-redux';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setCurrentMarketByLocation } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import WeatherAlertsList from '.';

const story = storiesOf('Widgets/Alert List', module);

const store = configureStore();

story.add('Land page', () => {
  const graphqlUrl = 'https://int-graphql.dev-univision.com';
  store.dispatch(setPageData({
    data: { tvStation: { call: 'KDTV' } },
    config: { graphql: graphqlUrl },
  }));
  store.dispatch(setCurrentMarketByLocation('KDTV'));

  return (
    <Provider store={store}>
      <div className="uvs-container"><WeatherAlertsList /></div>
    </Provider>
  );
});
