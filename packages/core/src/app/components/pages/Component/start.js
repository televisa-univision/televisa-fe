/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { AppContainer } from 'react-hot-loader';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import '@univision/fe-commons/dist/assets/styles/main.scss';
import ComponentWrapper from './ComponentWrapper';

/**
 * Main React application DOM container
 * @type {Element}
 */
const appRoot = document.getElementById('app-root');

Store.dispatch(setPageData(window.__INITIAL_STATE__));

// Preload required loadable components.
Loadable.preloadAll().then(() => {
  /**
   * Constant holding wrapper for the application, bootstrapped by
   * the initial application state taken from the window.
   * @type {JSX}
   */
  const page = (
    <AppContainer>
      <ComponentWrapper initialState={window.__INITIAL_STATE__} />
    </AppContainer>
  );

  ReactDOM.hydrate(page, appRoot);
});

if (module.hot) {
  module.hot.accept();
}
