import React from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';
import Navigation from '@univision/fe-components-base/dist/components/Navigation';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import StickyCTA from '@univision/fe-components-base/dist/components/StickyCTA';

import PageWrapper from '../../base/PageWrapper';

/**
 * UVN Elnu9veLayout component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const Elnu9veLayout = ({ pageData, children }) => {
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

Elnu9veLayout.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.string,
      primaryTopic: PropTypes.string,
      sectionType: PropTypes.string,
    }).isRequired,
    theme: PropTypes.object,
    pageCategory: PropTypes.string,
  }),
};

export default Elnu9veLayout;
