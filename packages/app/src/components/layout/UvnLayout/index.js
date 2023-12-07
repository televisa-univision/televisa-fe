import React from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';
import ShowHeader from '@univision/fe-components-base/dist/components/Header/Shows/ShowHeader';
import Navigation from '@univision/fe-components-base/dist/components/Navigation';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import StickyCTA from '@univision/fe-components-base/dist/components/StickyCTA';

import PageWrapper from '../../base/PageWrapper';

/**
 * UVN Layout component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const UvnLayout = ({ pageData, children }) => {
  const { pageCategory, data, theme } = pageData;
  const { sectionType } = data;
  return (
    <ThemeProvider>
      <PageWrapper pageData={pageData}>
        {sectionType !== 'show'
          ? <Navigation />
          : <ShowHeader pageData={pageData} pageCategory={pageCategory} />
        }
        {children}
        <Footer />
      </PageWrapper>
      <StickyCTA theme={theme} />
    </ThemeProvider>
  );
};

UvnLayout.propTypes = {
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

export default UvnLayout;
