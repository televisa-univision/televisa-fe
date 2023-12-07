import React from 'react';
import PropTypes from 'prop-types';
// Use W3C official polyfill
import 'intersection-observer';

import trackNextjsWebVitals from '@univision/fe-commons/dist/utils/tracking/nextjsWebVitalsTracker';
import '@univision/fe-commons/dist/utils/wdyr';
import '@univision/fe-commons/dist/assets/styles/app.global.scss';
import '@univision/fmg-video-sdk/lib/fmg-sdk.css';
import VideoPlayerPIPWrapper from '@univision/fe-video/dist/components/VideoPlayerPIPWrapper';

/**
 * Reports built-in web vitals metrics to ga
 * @param {Object} metric to track
 */
export function reportWebVitals(metric) {
  trackNextjsWebVitals(metric);
}

/**
 * Univison WebApp component to  component to initialize pages/sites
 *
 * WARNING: Adding a custom getInitialProps will disable
 * Automatic Static Optimization.
 * @see https://nextjs.org/docs/advanced-features/automatic-static-optimization
 *
 * @param {Object} props page wrapper props
 * @param {Node} props.Component is the active page, so whenever you navigate between routes,
 * Component will change to the new page. Therefore, any props you send to Component will
 * be received by the page.
 * @param {Object} props.pageProps the initial props that were preloaded for your page,
 * it's an empty object if the page is not using getInitialProps.
 * @returns {JSX}
 */
function WebApp({ Component, pageProps }) {
  return (
    <>
      <div id="app-root">
        <Component {...pageProps} />
      </div>
      <VideoPlayerPIPWrapper />
    </>
  );
}

WebApp.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
  ]),
  pageProps: PropTypes.object,
};

export default WebApp;
