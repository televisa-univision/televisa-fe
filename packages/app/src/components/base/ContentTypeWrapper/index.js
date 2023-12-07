import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { pageSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { VIX_SITES } from '@univision/fe-commons/dist/constants/vixSitesData';

import { isVerticalTelevisaByUri } from '@univision/fe-commons/dist/utils/header/helpers';
import favicon from '../../../assets/tudn/favicon.ico';
import Error404 from '../Error404';
import VixError404 from '../VixError404';
import TelevisaError404 from '../TelevisaError404';
import { PagePlaceholder } from '../Placeholders/PagePlaceholder';
import {
  getPageComponents,
} from '../../../utils/factories/pageFactory';

/**
 * Content type wrapper used to connect pageData with content types
 * @props {Object} props component props
 * @returns {JSX}
 */
const ContentTypeWrapper = ({ pageData, site }) => {
  const { Layout, ContentType } = getPageComponents(pageData?.data, site);
  const { loading, historyAction } = pageData;
  useEffect(() => {
    // fix issue on back event history action that keeps scroll down
    if (!loading && historyAction === 'POP') {
      window.scrollTo(0, 0);
    }
  }, [loading, historyAction]);

  if (!ContentType) {
    if (VIX_SITES.includes(site)) {
      return <VixError404 pageData={pageData} />;
    }

    if (isVerticalTelevisaByUri(site)) {
      return <TelevisaError404 pageData={pageData} />;
    }

    return <Error404 pageData={pageData} />;
  }
  const pageProps = { pageData };

  // avoid unmount when navigating from video to fix issue in sticky video
  // that keeps video at the top in transition to other page
  return (
    <Layout {...pageProps} favicon={favicon}>
      {loading && pageData?.data?.type !== 'video' ? <PagePlaceholder /> : <ContentType {...pageProps} />}
    </Layout>
  );
};

ContentTypeWrapper.propTypes = {
  pageData: PropTypes.object,
  site: PropTypes.string.isRequired,
};

/**
 * Connector to be called when state change
 * @param {Object} state of the app
 * @returns {Object}
 */
const mapStateToProps = state => ({
  pageData: pageSelector(state),
});

/**
 * Prevent additional prop updates
 * @param {Object} nextProps to be applied
 * @param {Object} prevProps to be applied
 * @returns {boolean}
 */
const areStatePropsEqual = (nextProps, prevProps) => {
  return (
    nextProps.pageData.originalUrl === prevProps.pageData.originalUrl
    && nextProps.pageData.loading === prevProps.pageData.loading
    // For match center match status page category
    && nextProps.pageData.pageCategory === prevProps.pageData.pageCategory
  );
};

export default connect(
  mapStateToProps,
  null,
  null,
  {
    pure: true,
    areStatePropsEqual,
  },
)(ContentTypeWrapper);
export { areStatePropsEqual };
