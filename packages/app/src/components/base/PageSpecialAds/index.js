import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import { userLocationSelector, siteSelector, isTelevisaSiteSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';
import Styles from './PageSpecialAds.styles';

const SpecialAd = styled.div`
  ${Styles.specialAds}
`;

/**
 * Special ads on pages logic
 * @param {string} articleType - article type
 * @param {string} contentType - Page content type
 * @returns {JSX}
 */
const PageSpecialAds = ({ articleType, contentType }) => {
  const userLocation = useSelector(userLocationSelector);
  const userSite = useSelector(siteSelector);
  const isTelevisaSite = useSelector(isTelevisaSiteSelector);
  // show teads in MX and in TUDN site only
  const showTeads = (userLocation === MX && userSite === TUDN_SITE) || isTelevisaSite;

  if (articleType === 'list') {
    return null;
  }

  switch (contentType) {
    case contentTypes.ARTICLE:
      return (
        <div>
          <SpecialAd>
            {adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X1, { isLazyLoaded: false })}
            {adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X2, { isLazyLoaded: false })}
            {adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X5, { isLazyLoaded: false })}
          </SpecialAd>
          {showTeads && adHelper.getAd(AdTypes.TEADS_AD, { isLazyLoaded: false })}
        </div>
      );
    default:
      return (
        <SpecialAd>
          {adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X1, { isLazyLoaded: false })}
          {adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X2, { isLazyLoaded: false })}
          {adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X5, { isLazyLoaded: false })}
        </SpecialAd>
      );
  }
};

PageSpecialAds.propTypes = {
  articleType: PropTypes.string,
  contentType: PropTypes.string,
};

export default PageSpecialAds;
