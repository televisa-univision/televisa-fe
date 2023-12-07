import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Head from 'next/head';

import { TELEVISA_SITE } from '@univision/fe-commons/dist/constants/sites';
import configureStore from '@univision/fe-commons/dist/store/configureStore'; // eslint-disable-line
import seoTags from '@univision/fe-commons/dist/utils/seo/seoTags';

import PageMicrodata from '../../../components/base/PageMicrodata';
import Tracking from '../../../components/AMP/Tracking';
import Scripts from '../../../components/AMP/Scripts';
import GlobalStyles from '../../../components/AMP/GlobalStyles/Global.styles';
import withRedux from '../../../components/hocs/withRedux';
import setupAmpPage from '../../../utils/page/setupAmpPage';
import getPageComponent from '../../../utils/factories/ampPageFactory';

export const config = { amp: true };

/**
 * Gets univsion amp page
 * @param {Object} props page props
 * @returns {JSX}
 */
function Amp({ page, store }) {
  if (!page) {
    return null;
  }
  const Component = getPageComponent(page?.data);

  return (
    <Provider store={store}>
      <Head>
        <link rel="canonical" href={page?.data?.uri} />
        <Scripts pageData={page} />
        {seoTags.metas(page)}
        {seoTags.getOpenGraphImage(
          page.hasValidOgImage,
          { data: page?.data, isTudn: false },
        )}
      </Head>
      <PageMicrodata pageData={page} />
      <Tracking
        page={page}
        requestParams={page?.requestParams}
        config={page?.config}
      />
      <GlobalStyles />
      <Component pageData={page} />
    </Provider>
  );
}

Amp.propTypes = {
  page: PropTypes.object,
  store: PropTypes.object,
};

Amp.getInitialProps = async (context) => {
  return setupAmpPage(context, TELEVISA_SITE);
};

export default withRedux(configureStore)(Amp);
