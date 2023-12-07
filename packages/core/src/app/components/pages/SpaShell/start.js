/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Loadable from 'react-loadable';

import '@univision/fe-commons/dist/utils/wdyr';
import '@univision/fe-commons/dist/assets/styles/main.scss';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';
import registerServiceWorker from '../../../utils/pwa/register';
import { getPageComponent, mapPageTypeToBundleName } from '../../../utils/factories/pageFactory';
import SpaShell from './SpaShell';

/**
 * Main React application DOM container
 * @type {Element}
 */
const appRoot = document.getElementById('app-root');

const { headerConf, ...initialPageData } = window.__INITIAL_STATE__;
Store.dispatch(setPageData(initialPageData));
Store.dispatch(setHeaderConf(headerConf));

const { data } = initialPageData;
const currentPageType = mapPageTypeToBundleName(data, data.uri);
const pageComponent = getPageComponent(currentPageType);

/**
 * Constant holding wrapper for the application, bootstrapped by
 * the initial application state taken from the window.
 * @type {JSX}
 */
// Pre-loading the widgets.
Loadable.preloadAll().then(() => {
  const page = (
    <AppContainer>
      <SpaShell initialComponent={pageComponent} />
    </AppContainer>
  );
  ReactDOM.hydrate(page, appRoot);
  registerServiceWorker();
});

if (module.hot) {
  module.hot.accept();
}
