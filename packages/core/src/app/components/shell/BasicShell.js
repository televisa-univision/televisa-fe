import PropTypes from 'prop-types';
import React from 'react';
import serialize from 'serialize-javascript';

import Assets from './Assets';

/**
 * Wrapper for rendering components without the complexity
 * of the HtmlShell
 * @param {Object} props Component props
 * @returns {JSX} rendered shell/document
 */
const BasicShell = (props) => {
  const { assets, page, initialState } = props;
  const env = initialState?.config?.deploy?.env;

  /* eslint-disable react/no-danger */
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {assets && assets.styles && <link rel="stylesheet" href={assets.styles} />}
      </head>
      <body>
        <div id="app-root">{page}</div>
        <script
          id="initial-state"
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = ${serialize(initialState)};`,
          }}
          charSet="UTF-8"
        />
        <Assets assets={assets} env={env} />
      </body>
    </html>
  );
};

/**
 * propTypes
 * @property {Object} assets Webpack assets
 * @property {Node} page React page and components to render
 */
BasicShell.propTypes = {
  assets: PropTypes.object,
  page: PropTypes.object,
  initialState: PropTypes.object,
};

export default BasicShell;
