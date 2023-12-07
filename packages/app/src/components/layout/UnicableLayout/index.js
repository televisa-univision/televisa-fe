import React from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';
import ShowHeader from '@univision/fe-components-base/dist/components/Header/Shows/ShowHeader';
import Navigation from '@univision/fe-components-base/dist/components/Navigation';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import StickyCTA from '@univision/fe-components-base/dist/components/StickyCTA';

import PageWrapper from '../../base/PageWrapper';

/**
 * UVN UnicableLayout component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const UnicableLayout = ({ pageData, children }) => {
  const { data, theme } = { ...pageData };
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

UnicableLayout.propTypes = {
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

export default UnicableLayout;
