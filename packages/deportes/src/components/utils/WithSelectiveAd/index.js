import React from 'react';

import Store from '@univision/fe-commons/dist/store/store';
import { getPageCategory, getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import dfpManager from '@univision/fe-commons/dist/utils/ads/dfpManager';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';

import DesktopView from './DesktopView';
import MobileView from './MobileView';

/**
 * Helper to detect custom page categories
 * @param {string} pageCategory to check
 * @returns {boolean}
 */
const isPageCategory = (pageCategory) => {
  return [
    pageCategories.SOCCER_COMPETITION_RELEGATION,
    pageCategories.SOCCER_COMPETITION_RESULTS,
    pageCategories.SOCCER_COMPETITION_STANDINGS,
    pageCategories.SOCCER_COMPETITION_STATS,
    pageCategories.SOCCER_COMPETITION_TEAMS,
    pageCategories.SOCCER_FUTBOL_STANDINGS,
    pageCategories.SOCCER_TEAM_PLANTEL,
    pageCategories.SOCCER_TEAM_RESULTS,
    pageCategories.SOCCER_TEAM_SPECIALS,
    pageCategories.SOCCER_TEAM_STATS,
  ].includes(pageCategory);
};

/**
 * Helper to detect is render refreshable ad
 * @param {string} pageCategory to check
 * @returns {boolean}
 */
const isRefreshable = (pageCategory) => {
  return [
    pageCategories.SOCCER_COMPETITION_STANDINGS,
    pageCategories.SOCCER_FUTBOL_STANDINGS,
  ].includes(pageCategory);
};

/**
 * HOC to insert ad depending on pageCategory and device
 * @param {Object} WrappedComponent to be render with ads
 * @param {string} layout name of the ads layout
 * that could be one of: "rail_bottom", "rail" default: "rail"
 * @returns {React.Component}
 */
export default function(WrappedComponent, layout) {
  const slotAdsId = [];

  /**
   * Container to inject ad based on particular page category
   * @param {Object} props to be used
   * @constructor
   */
  const WidthSelectiveAd = (props) => {
    const pageCategory = getPageCategory(Store);

    /**
     * Set ad slot ID to internal instance
     * @param {string} slotId - ad slot id
     * @access public
     */
    const setAdSlot = (slotId) => {
      if (slotId && !slotAdsId.includes(slotId)) {
        slotAdsId.push(slotId);
      }
    };

    /**
     * Refresh AD by register slotId
     */
    const refreshAdSlot = () => {
      if (slotAdsId.length > 0) {
        dfpManager.refreshAds(slotAdsId);
      }
    };

    if (isPageCategory(pageCategory)) {
      const refreshable = isRefreshable(pageCategory);
      const device = getDevice(Store);
      const component = (
        <WrappedComponent {...props} refreshSelectiveAd={refreshAdSlot} />
      );

      if (device !== 'mobile') {
        return (
          <DesktopView onRegisterSlot={setAdSlot} layout={layout} refreshable={refreshable}>
            {component}
          </DesktopView>
        );
      }
      return (
        <MobileView onRegisterSlot={setAdSlot} layout={layout} refreshable={refreshable}>
          {component}
        </MobileView>
      );
    }
    return <WrappedComponent {...props} />;
  };

  return WidthSelectiveAd;
}
