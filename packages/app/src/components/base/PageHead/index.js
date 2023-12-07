/* eslint-disable react/no-danger */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import seoTags from '@univision/fe-commons/dist/utils/seo/seoTags';

import { TUDN_SITE } from '@univision/fe-commons/src/constants/sites';
import ResourceHints from '../ResourceHints';

/**
 * Page head wrapper Univision WebApp.
 * Placed into the DOM at page level because next.js
 * will inject it to the document head on SSR
 * @params {Object} props - react props component
 * @params {Object} props.pageData - page data/state from API
 * @returns {JSX}
 */
function PageHead({ pageData }) {
  const [loadChartbeatMab, setLoadChartbeatMab] = useState(false);
  const { isAmp } = pageData || {};

  useEffect(() => {
    if (!isAmp) {
      window._sf_async_config = window._sf_async_config || {}; // eslint-disable-line no-underscore-dangle, max-len
      window._sf_async_config.uid = 38125; // eslint-disable-line no-underscore-dangle
      window._sf_async_config.domain = pageData?.site === TUDN_SITE ? 'tudn.com' : 'univision.com'; // eslint-disable-line no-underscore-dangle
      window._sf_async_config.useCanonical = true; // eslint-disable-line no-underscore-dangle
      window._sf_async_config.useCanonicalDomain = true; // eslint-disable-line no-underscore-dangle
      window._sf_async_config.flickerControl = false; // eslint-disable-line no-underscore-dangle
      setLoadChartbeatMab(true);
    }
  }, [isAmp, pageData]);

  return (
    <>
      <Head>
        {seoTags.title(pageData)}
        {seoTags.canonical(pageData)}
        {seoTags.ampHtmlLink(pageData)}
        {seoTags.metas(pageData)}
        {pageData?.data?.sectionType !== 'radiostation' && seoTags.getOpenGraphImage(
          pageData?.hasValidOgImage,
          { data: pageData?.data, isTudn: pageData?.isTudn },
        )}
        {seoTags.language(pageData, 'mx')}
        {seoTags.language(pageData)}
        {seoTags.alternateSection(pageData)}
        {pageData?.enhancedHeader && ResourceHints()}
        {loadChartbeatMab && !isAmp
          && (
            <script
              type="text/javascript"
              async
              src="https://static.chartbeat.com/js/chartbeat_mab.js"
            />
          )}
      </Head>
    </>
  );
}

PageHead.propTypes = {
  pageData: PropTypes.object,
};

export default PageHead;
