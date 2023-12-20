import React from 'react';
import PropTypes from 'prop-types';

import contentTypes from '../../constants/contentTypes.json';

import GTMIframe from './GoogleTagManager/GTMIframe';
import features from '../../config/features';
import {
  getKey,
  hasKey,
  isEqual,
  isValidFunction,
} from '../../utils/helpers';
import tealiumManager from '../../utils/tracking/tealium/tealiumManager';
import comScoreManager from '../../utils/tracking/comScore/comScoreManager';
import nielsenManager from '../../utils/tracking/nielsen/nielsenManager';
import perfumeTracker from '../../utils/tracking/perfume/perfumeTracker';
import gtmManager from '../../utils/tracking/googleTagManager/gtmManager';
import { getUtagData, getCustomTrackingForPage } from '../../utils/tracking/trackingHelpers';
import { asDeferrer } from '../../utils/deferrer';
import thirdPartyFeatures from '../../config/features/thirdParties';
import spaTracker from '../../utils/tracking/tealium/spa/SpaTracker';

/**
 * MainTracking component. Delegates the actual logic to these managers:
 * - gtmManager: tracks events using the Google Tag Manager SDK
 * - comScoreManager: tracks events using the ComScore SDK
 * - nielsenManager: tracks events using the Nielsen SDK
 *
 * @access public
 * @extends {React.Component}
 */
@asDeferrer
class MainTracking extends React.Component {
  /**
   * Updates the main data in the dataLayer.
   * @param {Object} page pageData
   */
  static updateTracking(page) {
    const trackingConfig = MainTracking.getTrackingConfig(page);
    const dataLayerData = getUtagData(trackingConfig);
    gtmManager.updateDataLayer(dataLayerData);
  }

  /**
   * Update data for GTM
   * @param {Object} page the page's data
   */
  static updateSpaTracking({ data }) {
    setTimeout(() => {
      const trackerConfig = MainTracking.getTrackingConfig({ data });

      if (trackerConfig) {
        let { type } = data;
        const { articleType } = data;

        if (articleType === contentTypes.VIEW_LIST) {
          type = articleType;
        }

        const uri = window.location.href;
        spaTracker.track(spaTracker.events.pageView, {
          uri, type, trackerConfig,
        });
      }
    }, 500);
  }

  /**
   * MainTracking constructor
   * @param {Object} props component props
   */
  constructor(props) {
    super(props);
    // Perfume performance tracker
    perfumeTracker.load();

    this.gtmId = props.gtmConfig?.id;
    this.gtmTitle = props.gtmConfig?.title;
    this.trackingManager = features.tracking.gtm ? gtmManager : tealiumManager;
  }

  /**
   * Collects tracking data on client side, delegates the actual logic to each tracking manager
   */
  componentDidMount() {
    this.triggerPageTracking();
  }

  /**
   * Updates window utag data when the tracking info in the redux page changes
   * @param {Object} prevProps previous component props
   */
  componentDidUpdate(prevProps) {
    const { page: prevPage } = prevProps;
    const { page } = this.props;
    const prevTrackingConfig = MainTracking.getTrackingConfig(prevPage);
    const trackingConfig = MainTracking.getTrackingConfig(page);

    if (!isEqual(prevTrackingConfig, trackingConfig)) {
      if (isValidFunction(this.trackingManager.clearDataLayer)) {
        this.trackingManager.clearDataLayer();

        // The Video SDK depends on this entry to know that GTM SDK is loaded
        // Since we are clearing the data layer we need to reintroduce this event.
        this.trackingManager.triggerEvent({ event: 'gtm.js' });
        // for SPA after didMount executed
        this.triggerPageTracking(true);
      }
    }
  }

  /**
   * Gets the config for tracking
   * @param {Object} page the page's data
   * @returns {Object}
   */
  static getTrackingConfig(page = {}) {
    const data = page.data || {};
    const webAnalyticsData = getKey(data, 'analyticsData.web');
    return !webAnalyticsData ? getCustomTrackingForPage(page) : {
      ...webAnalyticsData.common,
      ...webAnalyticsData.contentSpecific,
    };
  }

  /**
   * Gets the config for nielsen
   * @param {Object} page the page's data
   * @returns {Object}
   */
  static getNielsenConfig(page = {}) {
    if (hasKey(page, 'data.tracking') || hasKey(page, 'data.analyticsData')) {
      return {
        ...(getKey(page, 'data.tracking.nielsen', {})),
        ...(getKey(page, 'data.analyticsData.web.nielsen', {})),
      };
    }
    return null;
  }

  /**
   * Load / trigger tracking
   * @param {boolean} updating - didMount vs didUpdate flag
   * only needed on subsequent pages
   */
  triggerPageTracking(updating = false) {
    const { contentType, page } = this.props;
    const trackingConfig = MainTracking.getTrackingConfig(page);
    if (!thirdPartyFeatures.isGTMDisabled()) {
      this.trackingManager.load(trackingConfig, this.gtmId);
    }

    this.defer(() => {
      const nielsenConfig = MainTracking.getNielsenConfig(page);
      if (!thirdPartyFeatures.isComscoreDisabled()) {
        comScoreManager.load(contentType);
      }
      if (!thirdPartyFeatures.isNielsenDisabled()) {
        nielsenManager.load(nielsenConfig);
      }
      window.utag_data = getUtagData(trackingConfig);
    });
    // trigger pageView just for nextjs
    // core webapp trigger this event in SpaShellContainer
    // https://github.com/televisa-univision/univision-fe/blob/1b307fd1690ad6971e2b8226995dd92fa31e2412/packages/core/src/app/components/pages/SpaShell/SpaShellContainer.js#L104
    if (updating && process.env.APP_VERSION === '2') {
      MainTracking.updateSpaTracking(page);
    }
  }

  /**
   * Render a fallback for Google Tag Manager
   * @returns {JSX}
   */
  render() {
    return features.tracking.gtm ? <GTMIframe title={this.gtmTitle} id={this.gtmId} /> : null;
  }
}

/**
 * propTypes
 * @property {string} contentType the page content type
 * @property {Object} page the page's data
 */
MainTracking.propTypes = {
  contentType: PropTypes.string,
  gtmConfig: PropTypes.object,
  page: PropTypes.shape({
    data: PropTypes.shape({
      tracking: PropTypes.object,
    }),
  }).isRequired,
};

export default MainTracking;
