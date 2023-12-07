import React from 'react';
import PropTypes from 'prop-types';

import Tracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import Navigation from '@univision/fe-components-base/dist/components/Navigation';
import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';

import Search from '../../contentTypes/Search';
import ErrorLayout from '../../layout/ErrorLayout';

/**
 * Error404 that contains the 404 page content
 * @param {Object} props component props
 * @returns {JSX}
 */
const Error404 = ({ pageData }) => {
  return (
    <ThemeProvider>
      <Tracking page={{ ...pageData, statusCode: 404 }} />
      <Navigation />
      <ErrorLayout statusCode="404">
        <Search pageData={pageData} />
      </ErrorLayout>
      <Footer />
    </ThemeProvider>
  );
};

Error404.propTypes = {
  pageData: PropTypes.object,
};

export default Error404;
