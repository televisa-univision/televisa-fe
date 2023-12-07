/* eslint-disable require-jsdoc */
import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { setThemeData } from '@univision/fe-commons/dist/store/actions/page-actions';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import univisionTheme from '@univision/fe-commons/dist/themes/univision';
import showsTheme from '@univision/fe-commons/dist/themes/shows';

import Footer from '.';

const store = configureStore();

const StorybookFooter = () => (
  <Provider store={store}>
    <Footer />
  </Provider>
);

storiesOf('Layout/Footer', module)
  .add('Default', () => {
    store.dispatch(setThemeData(univisionTheme()));

    return <StorybookFooter />;
  })
  .add('Dark mode', () => {
    store.dispatch(setThemeData(showsTheme()));

    return <StorybookFooter />;
  });
