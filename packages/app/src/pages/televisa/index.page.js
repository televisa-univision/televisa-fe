import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Head from 'next/head';

import thirdPartyFeatures from '@univision/fe-commons/dist/config/features/thirdParties';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import { TELEVISA_SITE } from '@univision/fe-commons/dist/constants/sites';
import configureStore from '@univision/fe-commons/dist/store/configureStore'; // eslint-disable-line
import MediaPlayerConnector from '@univision/fe-components-base/dist/components/MediaPlayer/MediaPlayerConnector';

import setupPage from '../../utils/page/setupPage';
import withRedux from '../../components/hocs/withRedux';
import withRouter from '../../components/hocs/withRouter';
import ContentTypeWrapper from '../../components/base/ContentTypeWrapper';

import favicon from '../../assets/televisa/favicon.ico';
import Scripts from '../../components/base/Scripts';

/**
 * Televisa site page
 * @param {Object} props React Props for this component
 * @param {Object} props.pageData - page object from WebApi
 * @param {Object} props.pageData.data - page data from content API
 * @param {Object} props.store - redux store instance
 * @param {Object} props.config - global enviroment configuration
 * @returns {JSX}
 */
export function TelevisaPage({ store, config }) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Head>
          <meta name="facebook-domain-verification" content="yx693yc8ktecc1fzc4b4ej83vhdszi" />
          <link rel="icon" type="image/x-icon" href={favicon} />
        </Head>
        <ContentTypeWrapper site={TELEVISA_SITE} />
        <MediaPlayerConnector />
        <Scripts
          disableAds={thirdPartyFeatures.isDFPDisabled()}
          config={config}
          site={TELEVISA_SITE}
        />
      </ErrorBoundary>
    </Provider>
  );
}

TelevisaPage.getInitialProps = async (context) => {
  return setupPage(context, TELEVISA_SITE);
};

TelevisaPage.propTypes = {
  config: PropTypes.shape({
    deploy: PropTypes.shape({
      env: PropTypes.string,
    }),
  }),
  store: PropTypes.object.isRequired,
};

const TelevisaPageWithRouter = withRouter(TelevisaPage);

export default withRedux(configureStore)(TelevisaPageWithRouter);
