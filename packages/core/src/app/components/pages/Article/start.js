/* eslint-disable no-underscore-dangle */
import registerServiceWorker from 'app/utils/pwa/register';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { AppContainer } from 'react-hot-loader';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';

import '@univision/fe-commons/dist/assets/styles/main.scss';

import Article from './Article';

/**
 * Main React application DOM container
 * @type {Element}
 */
const appRoot = document.getElementById('app-root');
const { headerConf, ...pageData } = window.__INITIAL_STATE__;

Store.dispatch(setPageData(pageData));
Store.dispatch(setHeaderConf(headerConf));

// Preload required loadable components (article lead).
Loadable.preloadAll().then(() => {
  /**
   * Constant holding wrapper for the application, bootstrapped by
   * the initial application state taken from the window.
   * @type {JSX}
   */
  const page = (
    <AppContainer>
      <Article
        page={window.__INITIAL_STATE__.data}
      />
    </AppContainer>
  );

  ReactDOM.hydrate(page, appRoot);
  registerServiceWorker();
});

if (module.hot) {
  module.hot.accept();
}
