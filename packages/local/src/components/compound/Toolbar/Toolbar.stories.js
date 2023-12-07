/* eslint-disable require-jsdoc */
import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import radioTheme from '@univision/fe-commons/dist/themes/radio';

import Toolbar from './Toolbar';

const url = 'http://univision.com/los-angeles/klve';
const theme = radioTheme();

storiesOf('Layout/Toolbar', module)
  .add('default', () => (
    <ApiProvider
      url="http://univision.com/los-angeles/klve"
      store={Store}
      render={api => (
        <Provider store={Store}>
          <Toolbar
            url={url}
            visible
            type={api.type}
          />
        </Provider>
      )}
    />
  ))
  .add('with theme', () => (
    <ApiProvider
      url="http://univision.com/los-angeles/klve"
      store={Store}
      render={api => (
        <Provider store={Store}>
          <Toolbar
            url={url}
            theme={theme}
            visible
            type={api.type}
          />
        </Provider>
      )}
    />
  ))
  .add('content page', () => (
    <ApiProvider
      url={url}
      theme={theme}
      store={Store}
      render={api => (
        <Provider store={Store}>
          <Toolbar
            visible
            isContentPage
            type={api.type}
          />
        </Provider>
      )}
    />
  ))
  .add('with empty brandable', () => (
    <ApiProvider
      url={url}
      theme={theme}
      store={Store}
      render={api => (
        <Provider store={Store}>
          <Toolbar
            visible
            isContentPage
            type={api.type}
          />
        </Provider>
      )}
    />
  ));
