/* eslint-disable no-underscore-dangle */
import registerServiceWorker from 'app/utils/pwa/register';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { AppContainer } from 'react-hot-loader';

import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';
import Store from '@univision/fe-commons/dist/store/store';

import '@univision/fe-commons/dist/assets/styles/main.scss';
import { parseWidgets } from 'app/utils/factories/widgetFactory';

import Tag from './TagPage';

/**
 * Main React application DOM container
 * @type {Element}
 */
const appRoot = document.getElementById('app-root');
const { headerConf, ...pageData } = window.__INITIAL_STATE__;

Store.dispatch(setPageData(pageData));
Store.dispatch(setHeaderConf(headerConf));

const widgets = parseWidgets(window.__INITIAL_STATE__.data);
// Pre-loading the widgets.
Loadable.preloadAll().then(() => {
  /**
   * Constant holding wrapper for the application, bootstrapped by
   * the initial application state taken from the window.
   * @type {JSX}
   */
  const page = (
    <AppContainer>
      <Tag
        page={window.__INITIAL_STATE__.data}
        widgets={widgets}
      />
    </AppContainer>
  );

  ReactDOM.render(page, appRoot);
  registerServiceWorker();
});

if (module.hot) {
  module.hot.accept();
}
