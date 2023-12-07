import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import MainShellMetadata from 'app/components/shell/MainShell/MainShellMetadata';
import seoTags from '@univision/fe-commons/dist/utils/seo/seoTags';
import Store from '@univision/fe-commons/dist/store/store';

import Tracking from '../tracking';

/**
 * Top container component which wraps of all the building blocks
 * representing an AMP page.
 * @param {Object} props Component props
 * @returns {JSX} rendered shell/document
 */
const AmpShell = (props) => {
  const { assets, page } = props;
  const pageState = Store.getState();
  const initialState = pageState.page;
  const {
    data: apiData,
    requestParams,
  } = initialState;

  /* eslint-disable react/no-danger */
  return (
    <html lang="en" amp="">
      <head>
        <meta charSet="utf-8" />
        <title>{apiData.title}</title>
        {seoTags.canonical(initialState)}
        <script async src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js" custom-element="amp-analytics" />
        <script async src="https://cdn.ampproject.org/v0.js" />

        <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js" />
        <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js" />
        <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js" />
        <script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js" />
        <script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js" />
        <script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js" />

        <style amp-boilerplate="" dangerouslySetInnerHTML={{ __html: 'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}' }} />
        <noscript><style amp-boilerplate="" dangerouslySetInnerHTML={{ __html: 'body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}' }} /></noscript>
        <style amp-custom="" dangerouslySetInnerHTML={{ __html: `${assets.inlineCss}` }} />

        {seoTags.metas(initialState)}

        {process.env.NODE_ENV === 'development'
          && <script id="initial-state" dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${serialize(initialState)};` }} />
        }
        {process.env.NODE_ENV === 'development'
          && <script async src={assets.javascript} charSet="UTF-8" />
        }

      </head>
      <body>
        <div>
          <Tracking
            pageData={initialState.data}
            requestParams={requestParams}
            config={initialState.config}
          />
          <MainShellMetadata data={initialState} />
          <div
            id="app-root"
            dangerouslySetInnerHTML={{ __html: page }}
          />
        </div>
      </body>
    </html>
  );
  /* eslint-disable */
};

/**
 * propTypes
 * @property {Object} assets Webpack assets
 * @property {Node} page React page and components to render
 * @property {Object} initialState initial application state
 */
AmpShell.propTypes = {
  assets: PropTypes.object,
  page: PropTypes.string,
  initialState: PropTypes.object
};

export default AmpShell;
