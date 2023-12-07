import React from 'react';
import PropTypes from 'prop-types';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';

/**
 * Google Analytics pageView tracking for AMP pages.
 * @param {Object} pageData The page data from API
 * @param {Object} config The page config from API
 * @returns {XML}
 * @constructor
 */
const PageView = ({ pageData, config }) => {
  let pageView = {};
  const trackingData = MainTracking.getTrackingConfig({ data: pageData });
  if (trackingData) {
    // eslint-disable-next-line dot-notation
    const environmentName = pageData?.tracking?.analytics?.data?.['environment_name'];
    const env = getKey(config, 'deploy.env');
    const { permalink } = trackingData;
    const { uri } = pageData;
    const ampUrl = permalink ? `${permalink.slice(0, permalink.indexOf(uri))}/amp${uri}` : '';
    // GA accounts. Production: UA-81851967-1, non-production: UA-81851967-8
    const account = env === 'production' ? 'UA-81851967-1' : 'UA-81851967-8';

    pageView = {
      vars: {
        account,
      },
      extraUrlParams: {
        cd15: pageData.title,
        cd16: trackingData.content_type,
        cd27: trackingData.primary_tag,
        cd30: trackingData.word_count,
        cd31: trackingData.pub_name,
        cd33: trackingData.content_author,
        cd34: trackingData.publish_user,
        cd40: trackingData.permalink,
        cd5: trackingData.section_level1,
        cd71: trackingData.section_level2,
        cd46: trackingData.section_full_hierarchy?.toString(),
        cd109: 'Google AMP',
        cd2: trackingData.uci_division,
        cd3: trackingData.content_id,
        cd6: trackingData.show_name,
        cd12: trackingData.content_modified_date,
        cd13: trackingData.content_created_date,
        cd14: trackingData.brand_station_call_letters,
        cd20: trackingData.network_name,
        cd23: trackingData.brand_market,
        cd24: trackingData.brand_station_name,
        cd25: trackingData.brand_station_type,
        cd35: trackingData.embedded_items,
        cd36: trackingData.all_tags?.toString(),
        cd60: trackingData.environment_name || environmentName,
        cd115: trackingData.word_count_group,
        cd64: trackingData.content_vertical,
        cd118: trackingData.adtag_value,
        cd69: trackingData.article_lead_type,
        cd68: trackingData.article_type,
        cd49: trackingData.mvpd_auth_required,
        cd73: trackingData.show_type,
        cd74: getKey(trackingData, 'all_tags.0'),
        cd89: getKey(trackingData, 'seo_optimized', 'false'),
        cd57: trackingData.video_length,
        cd42: trackingData.video_id,
        cd44: trackingData.video_length_group,
        cd41: trackingData.video_type,
        cd43: trackingData.slide_count,
        cd52: trackingData.slideshow_type,
      },
      triggers: {
        trackPageviewWithAmpdocUrl:
        {
          on: 'visible',
          request: 'pageview',
          vars: {
            title: pageData.title,
          },
          ampdocUrl: ampUrl,
        },
      },
    };
  }
  return (
    <amp-analytics type="googleanalytics" id="pageView">
      <script
        type="application/json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageView) }}
      />
    </amp-analytics>
  );
};

/**
 * propTypes
 * @property {Object} pageData - The page object from content API
 * @property {Object} config - The config object from store
 */
PageView.propTypes = {
  pageData: PropTypes.object,
  config: PropTypes.object,
};

/**
 * Default Prop Values
 */
PageView.defaultProps = {
  pageData: {},
  config: {},
};

export default PageView;
