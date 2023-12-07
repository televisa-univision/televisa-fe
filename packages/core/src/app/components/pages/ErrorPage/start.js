/* eslint-disable no-underscore-dangle */
import registerServiceWorker from 'app/utils/pwa/register';
import React from 'react';
import ReactDOM from 'react-dom';

import '@univision/fe-commons/dist/assets/styles/main.scss';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';
import Store from '@univision/fe-commons/dist/store/store';
import ErrorPage from './ErrorPage';

/**
 * Main React application DOM container
 * @type {Element}
 */
const appRoot = document.getElementById('app-root');

if (module.hot) {
  module.hot.accept();
}

const { headerConf, ...pageData } = window.__INITIAL_STATE__;

Store.dispatch(setPageData(pageData));
Store.dispatch(setHeaderConf(headerConf));

/**
 * Constant holding wrapper for the application, bootstrapped by
 * the initial application state taken from the window.
 * @type {JSX}
 */
const page = (
  <ErrorPage />
);

ReactDOM.hydrate(page, appRoot);
registerServiceWorker();
