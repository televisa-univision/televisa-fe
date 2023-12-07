/* eslint-disable no-underscore-dangle */
import registerServiceWorker from 'app/utils/pwa/register';
import React from 'react';
import ReactDOM from 'react-dom';

import '@univision/fe-commons/dist/assets/styles/main.scss';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setSearchData } from '@univision/fe-commons/dist/store/actions/search/search-actions';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';
import Store from '@univision/fe-commons/dist/store/store';
import Search from './Search';

/**
 * Main React application DOM container
 * @type {Element}
 */
const appRoot = document.getElementById('app-root');
const { search: searchData, headerConf, ...pageData } = window.__INITIAL_STATE__;

if (module.hot) {
  module.hot.accept();
}

Store.dispatch(setPageData(pageData));
Store.dispatch(setSearchData(searchData));
Store.dispatch(setHeaderConf(headerConf));

/**
 * Constant holding wrapper for the application, bootstrapped by
 * the initial application state taken from the window.
 * @type {JSX}
 */
const page = (
  <Search page={window.__INITIAL_STATE__.data} />
);

ReactDOM.hydrate(page, appRoot);
registerServiceWorker();
