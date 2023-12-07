import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import Authenticator from '@univision/fe-commons/dist/components/Authenticator';
import ProtectedDataCollector from '@univision/fe-commons/dist/components/ProtectedDataCollector';
import MediaPlayerConnector from '@univision/fe-components-base/dist/components/MediaPlayer/MediaPlayerConnector';
import VideoPlayerPIPWrapper from '@univision/fe-video/dist/components/VideoPlayerPIPWrapper';
import LoaderBarConnector from '@univision/fe-components-base/dist/components/LoadingIndicatorBar/LoaderIndicatorBarConnector';

import SpaShellConnector from './SpaShellConnector';

/**
 * Top container component which wraps of all the building blocks
 * representing an SPA page.
 * @param {Object} props Component props
 * @returns {JSX} rendered shell/document
 */
const SpaShell = ({ page, initialComponent }) => {
  return (
    <Provider store={Store}>
      <ErrorBoundary>
        <LoaderBarConnector />
        <BKPIndicator />
        <SpaShellConnector page={page} initialComponent={initialComponent} />
        <VideoPlayerPIPWrapper />
        <MediaPlayerConnector />
        <Authenticator />
        <ProtectedDataCollector />
      </ErrorBoundary>
    </Provider>
  );
};

/**
 * propTypes
 * @property {Node} page Store page object
 * @property {Node} pageComponent React element rendered on the server
 */
SpaShell.propTypes = {
  page: PropTypes.object,
  initialComponent: PropTypes.element,
};

export default SpaShell;
