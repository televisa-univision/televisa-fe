import Datadog from 'app/utils/datadog';
import Promise from 'bluebird';
import React from 'react';
import Helmet from 'react-helmet';
import { AppRegistry } from 'react-native-web';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Loadable from 'react-loadable';
import { ServerStyleSheet } from 'styled-components';

import MainShell from 'components/shell/MainShell/MainShell';
import AmpShell from 'app/AMP/components/shell/AmpShell';
import ampPageFactory from 'app/AMP/utils/factories/ampPageFactory';
import {
  getPageComponent, mapPageTypeToBundleName, getAssets,
} from 'app/utils/factories/pageFactory';

import Store from '@univision/fe-commons/dist/store/store';
import { isAmp, getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import { shouldSkipSpa } from '@univision/fe-commons/dist/utils/helpers/spa';
import { setAmp } from '@univision/fe-commons/dist/store/actions/page-actions';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import SpaShell from 'components/pages/SpaShell/SpaShell';
import hints from '@univision/fe-commons/dist/utils/ssr/hints';

const renderUtils = {
  /**
   * Gets the main shell component
   * @param {Object} currentAssets The assets chunk for the content type
   * @param {string} currentPage The content type
   * @param {Object} req Request object
   * @returns {Object}
   */
  getMainShell(currentAssets, currentPage, req) {
    const { path } = req;
    const isSpa = currentPage === contentTypes.SPA;
    if (ampPageFactory.isAmpPage(path, currentPage)) {
      const ddSpan = Datadog.addSpan('buildAmpPage');
      Store.dispatch(setAmp(true));
      const sheet = new ServerStyleSheet();
      const pageComponent = sheet.collectStyles(ampPageFactory.getPageComponent(currentPage));
      const page = ampPageFactory.getHtmlAndCss(pageComponent);
      const assets = {
        inlineCss: '',
      };
      const styledComponentTags = sheet.getStyleElement()[0]?.props;
      assets.inlineCss += `${JSON.stringify(styledComponentTags).replace(/[{}]/g, '').replace(/,/g, ';')};`;
      const ampShell = <AmpShell assets={assets} page={page} />;
      Datadog.closeSpan(ddSpan);
      return ampShell;
    }
    let pageComponent;
    if (isSpa) {
      const pageData = getPageData(Store);
      // Let's get the react-loadable instance to preload it in the SSR
      const data = getKey(pageData, 'data', {});
      const pageType = mapPageTypeToBundleName(data, data.uri);
      const spaShellContent = getPageComponent(pageType);
      pageComponent = <SpaShell page={pageData} initialComponent={spaShellContent} />;
    } else {
      pageComponent = getPageComponent(currentPage);
    }
    return (
      <MainShell
        assets={currentAssets}
        page={pageComponent}
        isSpa={isSpa}
      />
    );
  },

  /**
   * Helper to separate page assets
   * @param {string} page Actual page type
   * @param {Object} assets All chunk assets
   * @param {string} path Requested path
   * @returns {Object}
   */
  getCurrentAssets(page, assets, path) {
    if (ampPageFactory.isAmpPage(path, page)) {
      return ampPageFactory.getAssets(page, assets);
    }
    return getAssets(page, assets);
  },

  /**
   * Helper to add additional document head per component
   * @param {string} htmlPage The html of current page
   * @returns {string}
   */
  setPageHead(htmlPage) {
    const noAttr = / data-react-helmet="true"/g;
    const data = Helmet.renderStatic();
    const head = [data.meta, data.style, data.script]
      .map((value) => {
        // remove [data-] attr to avoid SEO conflict
        // see: https://github.com/nfl/react-helmet/issues/79
        return value.toString().replace(noAttr, '');
      })
      .join('');

    return htmlPage.replace('</head>', `${head}</head>`);
  },

  /**
   * Returns the chunks required by the react-loadable components for the current request.
   *
   * @param {Object} req Current request
   * @param {Array} modules react-loadable modules
   * @returns {Array}
   */
  getReactLoadableCssDependencies(req, modules) {
    const requiredCss = [];
    if (Array.isArray(modules)) {
      const uniqueModules = [...new Set(modules)];
      for (let i = 0; i < uniqueModules.length; i += 1) {
        if (hints[uniqueModules[i]]) {
          requiredCss.push(hints[uniqueModules[i]]);
        }
      }
    }

    return requiredCss;
  },

  /**
   * Returns the css required by the react-loadable components for the current request.
   *
   * @param {Object} req Current request
   * @param {Array} modules react-loadable modules
   * @returns {{resolvedCss: string, pendingPromises: Array}}
   */
  getReactLoadableStyles(req, modules) {
    let resolvedCss = '';

    // Extract the CSS required by components using react-loadable
    const reactLoadableCssDependencies = this.getReactLoadableCssDependencies(req, modules);

    /* Let's add the css for the bundle included as the SPA content
      The order for the styles on SPA pages are `spaShell`, `currentPageType`
      and the loadable additional styles for widgets */
    const pageData = getPageData(Store);
    if (!shouldSkipSpa({ url: getKey(pageData, 'data.uri') })) {
      const data = getKey(pageData, 'data', {});
      const currentPageType = mapPageTypeToBundleName(data, data.uri);
      reactLoadableCssDependencies.unshift(currentPageType);
    }

    for (let i = 0, len = reactLoadableCssDependencies.length; i < len; i += 1) {
      const inlineCssFile = getKey(req, `assets.ssrInlineCss.${reactLoadableCssDependencies[i]}_inlineCss`);
      resolvedCss += inlineCssFile;
    }

    return { resolvedCss };
  },

  /**
   * Return a promise with the CSS that should be inline in the SSR.
   * It contains the CSS for the current entry point + the CSS for the components pre-loaded with
   * react-loadable
   * @param {Object} currentAssets Assets for the current request
   * @param {Array} modules Pre-loaded modules for react-loadable
   * @param {Object} req Current request
   * @returns {Promise}
   */
  getInlineStyles(currentAssets, modules, req) {
    // CSS for the current page
    let inlineCss = getKey(currentAssets, 'inlineCss', '');
    const { resolvedCss } = this.getReactLoadableStyles(req, modules);
    inlineCss += resolvedCss;
    return `<style>${inlineCss}</style>`;
  },

  /**
   * Helper to return a new page
   * @param {string} page - page to render
   * @param {Object} currentAssets - current assets for page
   * @param {Object} req - current request
   * @returns {Promise}
   */
  newHtmlPage(page, currentAssets, req) {
    return new Promise((resolve) => {
      const ddSpan = Datadog.addSpan('newHtmlPage');
      if (isAmp(Store)) {
        const html = `<!doctype html>\n${renderToString(page)}`;
        Datadog.closeSpan(ddSpan);
        resolve(html);
        return;
      }

      /* istanbul ignore next */
      /**
       * page hoc
       * @returns {JSX}
       */
      const PageWrapper = () => page;
      // New instance of ServerStyleSheet from styled-components
      const sheet = new ServerStyleSheet();
      // Register the PageWrapper component into react-native-web
      AppRegistry.registerComponent('App', () => PageWrapper);
      // renders the page to string, we use collectStyles to handle
      // styled-components cache
      const modules = [];
      const PageWithLoadable = (
        <Loadable.Capture
          report={
            /* istanbul ignore next */ (moduleName) => {
              if (moduleName) modules.push(moduleName);
            }
          }
        >
          {page}
        </Loadable.Capture>
      );

      let html = `<!doctype html>\n${renderToString(sheet.collectStyles(PageWithLoadable))}`;
      const inlineCss = this.getInlineStyles(currentAssets, modules, req);
      html = this.setPageHead(html);
      // grabs currents styled-components styles
      const styledComponentsCSS = sheet.getStyleElement();
      // grabs react-native-web styles
      const { getStyleElement } = AppRegistry.getApplication('App');
      // Prints react-native-web styles to string
      const reactNativeWebCSS = renderToStaticMarkup(getStyleElement());
      html = html.replace('<head>', `<head>${reactNativeWebCSS}${styledComponentsCSS}${inlineCss}`);
      Datadog.closeSpan(ddSpan);
      resolve(html);
    });
  },
};

export default renderUtils;
