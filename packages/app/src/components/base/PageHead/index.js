/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import seoTags from '@univision/fe-commons/dist/utils/seo/seoTags';
import oneTrustManager from '@univision/fe-commons/dist/utils/onetrust/oneTrustManager';
import { getCookie } from '@univision/fe-commons/dist/utils/helpers';

import { TUDN_SITE } from '@univision/fe-commons/src/constants/sites';
import {
  PERFORMANCE_COOKIES, ONETRUST_SCRIPT, DATA_DOMAIN_SCRIPT, ONETRUST_COOKIE,
} from '@univision/fe-commons/dist/constants/oneTrust';
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
  const {
    isAmp,
    site,
    data: { analyticsData: { web: { common = {} } = {} } = {} } = {},
  } = pageData || {};
  oneTrustManager.setPageSection(common, site);
  const consentCookie = getCookie(ONETRUST_COOKIE);
  if (consentCookie && (!global?.window?.OnetrustActiveGroups || global?.window?.OnetrustActiveGroups === ',,')) {
    oneTrustManager.getCookieActiveGroups(consentCookie);
  }

  // data.analyticsData.web.common

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
    <Head>
      {oneTrustManager.allowOneTrust
        && (
          <>
            <script type="text/javascript" src={`https://cdn.cookielaw.org/consent/${DATA_DOMAIN_SCRIPT[site]}/OtAutoBlock.js`} />
            <script type="text/javascript" src="https://cdn.cookielaw.org/scripttemplates/gpp.stub.js" />
            <script type="text/javascript" src={ONETRUST_SCRIPT} charset="UTF-8" data-domain-script={DATA_DOMAIN_SCRIPT[site]} />
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `function OptanonWrapper() {
              const { type, currentTarget: { id = '' } = {} } = event;
              switch (type) {
                case 'otloadbanner':
                  window.dataLayer.push({
                    event: 'oneTrust_initial_load',
                    OnetrustActiveGroups: window.OnetrustActiveGroups,
                  });
                  break;
                case 'click':
                  window.dataLayer.push({
                    event: id === 'onetrust-accept-btn-handler' ? 'oneTrust_banner_click_accept_all' : 'oneTrust_preference_center_confirm',
                    OnetrustActiveGroups: window.OnetrustActiveGroups,
                  });
                  break;
              }
            }`,
              }}
            />
          </>
        )
      }
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
            type={oneTrustManager.getScriptType(PERFORMANCE_COOKIES)}
            className={PERFORMANCE_COOKIES}
            async
            src="https://static.chartbeat.com/js/chartbeat_mab.js"
          />
        )}
    </Head>
  );
}

PageHead.propTypes = {
  pageData: PropTypes.object,
};

export default PageHead;
