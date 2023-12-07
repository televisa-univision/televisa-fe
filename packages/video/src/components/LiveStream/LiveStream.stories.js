/* eslint-disable require-jsdoc */
import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import LiveStream from '.';

const url = 'https://www.univision.com/test/udn-townhall-livestream';

storiesOf('Widgets/LiveStream', module)
  .add('content page', () => (
    <ApiProvider
      url={url}
      render={(data) => {
        Store.dispatch(setPageData({
          page: data,
          requestParams: {
            mode: 'prod',
          },
        }));

        return (
          <Provider store={Store}>
            <LiveStream livestreamId="201705250910" tvssUrl="auth.univision.com" primaryTag="Galavisión" />
          </Provider>
        );
      }}
    />
  ));
