import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import Store from '../../store/store';
import ApiProvider from '.';

storiesOf('Helpers/ApiProvider', module)
  .addDecorator(withInfo)
  .add('basic usage', () => (
    <ApiProvider
      url="http://univision.com/los-angeles/klve"
      render={(data) => {
        action('API resonse')(data);
        return <div>Page title from API: <strong>{data.title}</strong></div>;
      }}
    />
  ), {
    info: {
      text: 'Fetches data and calls render prop',
    },
  })
  .add('with Store', () => (
    <ApiProvider
      url="http://univision.com/los-angeles/klve"
      store={Store}
      render={() => {
        action('Store')(Store.getState());
        return (
          <div>Page title from Store: <strong>{Store.getState().page.data.title}</strong></div>
        );
      }}
    />
  ), {
    info: {
      text: 'Fetches data sets page store',
    },
  });
