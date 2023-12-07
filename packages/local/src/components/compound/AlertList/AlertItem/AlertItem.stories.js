import React from 'react';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport/src/preview';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { Provider } from 'react-redux';
import AlertItem from './index';
import props from './__mocks__/data.json';

const store = configureStore();

const graphqlUrl = 'https://int-graphql.dev-univision.com';

storiesOf('Widgets/Alert List/Alert Item', module)
  .addDecorator(withViewport('iphone8p'))
  .add('Generic', () => {
    store.dispatch(setPageData({
      data: { tvStation: { call: 'KDTV' } },
      config: { graphql: graphqlUrl },
    }));
    return (
      <Provider store={store}>
        <div className="uvs-container">
          <AlertItem
            title={props.eventDescription}
            date={props.issueTimeLocal}
            description={props.texts[0].description}
            severity={props.severity}
          />
        </div>
      </Provider>
    );
  })
  .add('Hight risk', () => {
    store.dispatch(setPageData({
      data: { tvStation: { call: 'KDTV' } },
      config: { graphql: graphqlUrl },
    }));
    return (
      <Provider store={store}>
        <div className="uvs-container">
          <AlertItem
            title={props.eventDescription}
            date={props.issueTimeLocal}
            description={(props.texts[0].description).repeat(5)}
            severity="Extreme"
          />
        </div>
      </Provider>
    );
  });
