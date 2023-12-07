import React from 'react';
import PropTypes from 'prop-types';

import Tracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import Navigation from '@univision/fe-components-base/dist/components/Navigation';
import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';

import TelevisaErrorLayout from '../../layout/TelevisaErrorLayout';

/**
 * TelevisaError404 that contains the 404 page content
 * @param {Object} props component props
 * @returns {JSX}
 */
const TelevisaError404 = ({ pageData }) => {
  return (
    <ThemeProvider>
      <Tracking page={{ ...pageData, statusCode: 404 }} />
      <Navigation />
      <TelevisaErrorLayout statusCode="404" />
      <Footer />
    </ThemeProvider>
  );
};

TelevisaError404.propTypes = {
  pageData: PropTypes.object,
};

export default TelevisaError404;
