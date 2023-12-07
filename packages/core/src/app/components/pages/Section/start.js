/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Loadable from 'react-loadable';

import '@univision/fe-commons/dist/assets/styles/main.scss';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';

import { parseWidgetsWithAds } from '../../../utils/factories/widgetFactory';
import registerServiceWorker from '../../../utils/pwa/register';
import Section from './Section';

/**
 * Main React application DOM container
 * @type {Element}
 */
const appRoot = document.getElementById('app-root');
const { headerConf, ...pageData } = window.__INITIAL_STATE__;

Store.dispatch(setPageData(pageData));
Store.dispatch(setHeaderConf(headerConf));

const widgets = parseWidgetsWithAds(pageData.data);

// Pre-loading the widgets.
Loadable.preloadAll().then(() => {
  /**
   * Constant holding wrapper for the application, bootstrapped by
   * the initial application state taken from the window.
   * @type {JSX}
   */
  const page = (
    <AppContainer>
      <Section widgets={widgets} />
    </AppContainer>
  );

  ReactDOM.hydrate(page, appRoot);
  registerServiceWorker();
});

if (module.hot) {
  module.hot.accept();
}
