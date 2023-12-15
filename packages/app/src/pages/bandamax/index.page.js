import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Head from 'next/head';

import thirdPartyFeatures from '@univision/fe-commons/dist/config/features/thirdParties';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import configureStore from '@univision/fe-commons/dist/store/configureStore'; // eslint-disable-line
import MediaPlayerConnector from '@univision/fe-components-base/dist/components/MediaPlayer/MediaPlayerConnector';

import { BANDAMAX_SITE } from '@univision/fe-commons/src/constants/sites';
import { BANDAMAX } from '@univision/fe-commons/src/constants/pageCategories';
import setupPage from '../../utils/page/setupPage';
import withRedux from '../../components/hocs/withRedux';
import withRouter from '../../components/hocs/withRouter';
import ContentTypeWrapper from '../../components/base/ContentTypeWrapper';
import favicon from '../../assets/canal5/favicon.ico';
import Scripts from '../../components/base/Scripts';

/**
 * Las Estrellas page
 * @param {Object} props React Props for this component
 * @param {Object} props.pageData - page object from WebApi
 * @param {Object} props.pageData.data - page data from content API
 * @param {Object} props.store - redux store instance
 * @param {Object} props.config - global enviroment configuration
 * @returns {JSX}
 */
export function BandamaxPage({ store, config }) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Head>
          <link rel="icon" type="image/x-icon" href={favicon} />
        </Head>
        <ContentTypeWrapper site={BANDAMAX_SITE} />
        <MediaPlayerConnector />
        <Scripts
          disableAds={thirdPartyFeatures.isDFPDisabled()}
          config={config}
          site={BANDAMAX_SITE}
        />
      </ErrorBoundary>
    </Provider>
  );
}

BandamaxPage.getInitialProps = async (context) => {
  return setupPage(context, BANDAMAX);
};

BandamaxPage.propTypes = {
  config: PropTypes.shape({
    deploy: PropTypes.shape({
      env: PropTypes.string,
    }),
  }),
  store: PropTypes.object.isRequired,
};

const BandamaxPageWithRouter = withRouter(BandamaxPage);

export default withRedux(configureStore)(BandamaxPageWithRouter);
