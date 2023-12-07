/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';

import '@univision/fe-commons/dist/assets/styles/main.scss';
import EmbeddedVideo from './EmbeddedVideo';

/**
 * Main React application DOM container
 * @type {Element}
 */
const appRoot = document.getElementById('app-root');

Store.dispatch(setPageData(window.__INITIAL_STATE__));

/**
 * Constant holding wrapper for the application, bootstrapped by
 * the initial application state taken from the window.
 * @type {JSX}
 */
const page = (
  <AppContainer>
    <EmbeddedVideo page={window.__INITIAL_STATE__.data} />
  </AppContainer>
);

ReactDOM.render(page, appRoot);

if (module.hot) {
  module.hot.accept();
}
