import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '@univision/fe-components-base/dist/components/Navigation';
import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import StickyCTA from '@univision/fe-components-base/dist/components/StickyCTA';

import PageWrapper from '../../base/PageWrapper';

/**
 * Main TUDN page layout
 * @param {Object} props - react Props for this component
 * @param {Object} props.pageData - page object definition
 * @param {Object} [props.pageData.theme] - page theme object
 * @param {Node} props.children - React element to be render
 * @returns {JSX}
 */
const TudnLayout = ({ pageData, children }) => {
  const { theme } = { ...pageData };

  return (
    <ThemeProvider>
      <PageWrapper pageData={pageData}>
        <Navigation />
        {children}
        <Footer />
      </PageWrapper>
      <StickyCTA theme={theme} />
    </ThemeProvider>
  );
};

TudnLayout.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.shape({
    theme: PropTypes.object,
  }),
};

export default TudnLayout;
