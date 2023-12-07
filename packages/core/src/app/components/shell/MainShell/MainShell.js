import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Store from '@univision/fe-commons/dist/store/store';
import { getInitialState } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Head from '../Head/Head';
import MainShellMetadata from './MainShellMetadata';

/**
 * Top container component which wraps of all the building blocks
 * representing a page.
 * @param {Object} props Component props
 * @returns {JSX} rendered shell/document
 */
const MainShell = (props) => {
  const { assets, isSpa, page } = props;
  const initialState = getInitialState(Store);
  /* eslint-disable react/no-danger */
  return (
    <html lang={localization.getCurrentLanguage()}>
      <Head assets={assets} initialState={initialState} />
      <body>
        {page && (
          <div>
            <MainShellMetadata initialState={initialState} />
            <div id="app-root" className={isSpa && 'app-spa'}>{page}</div>
          </div>
        )}
        <script
          id="initial-state"
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = ${serialize(initialState)};`,
          }}
          charSet="UTF-8"
        />
        <script
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: 'window.LUX && LUX.addData("swState", "serviceWorker" in navigator ? (navigator.serviceWorker.controller ? "controlled" : "supported") : "unsupported")',
          }}
        />
        <noscript>
          Javascript is required.
        </noscript>
      </body>
    </html>
  );
  /* eslint-disable */
};

/**
 * propTypes
 * @property {Object} assets Webpack assets
 * @property {Object} initialState initial application state
 * @property {Bool} isSpa Check for SPA in State
 * @property {Node} page React page and components to render
 */
MainShell.propTypes = {
  assets: PropTypes.object,
  initialState: PropTypes.object,
  isSpa: PropTypes.bool,
  page: PropTypes.element,
};

export default MainShell;
