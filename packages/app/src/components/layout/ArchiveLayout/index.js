import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Head from 'next/head';

import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';
import Navigation from '@univision/fe-components-base/dist/components/Navigation';
import Footer from '@univision/fe-components-base/dist/components/Footer';
import Tracking from '@univision/fe-commons/dist/components/tracking/MainTracking';

import PageHead from '../../base/PageHead';

/**
 * Archive Layout
 * @param {Object} props - props of the component
 * @property {Object} props.store - redux store
 * @property {JSX} props.childen - children nodes to be rendered
 * @property {string} props.favicon - favicon to be rendered in the page
 * @property {Object} props.pageData - page data state object (title, description, canonical url)
 * @returns {JSX}
 */
const ArchiveLayout = ({
  store,
  children,
  favicon,
  pageData,
}) => {
  return (
    <Provider store={store}>
      <PageHead pageData={pageData} />
      <Head>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Head>
      <Tracking page={pageData} />
      <ThemeProvider>
        <Navigation />
        {children}
        <Footer />
      </ThemeProvider>
    </Provider>
  );
};

ArchiveLayout.propTypes = {
  store: PropTypes.object,
  children: PropTypes.node,
  favicon: PropTypes.string,
  pageData: PropTypes.object,
};

ArchiveLayout.defaultProps = {
  pageData: {},
};

export default ArchiveLayout;
