import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  VIX_SMART_BANNER_PATH,
  VIX_SMART_BANNER_DOMAIN,
  LOCAL_STORAGE_SMART_BANNER_KEY,
} from '@univision/fe-commons/dist/constants/vixSitesData';
import { MOBILE } from '@univision/fe-commons/dist/constants/devices';
import localStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import {
  deviceSelector,
  pageCategorySelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import {
  FAMOSOS,
  ENTERTAINMENT,
  ESTILO_DE_VIDA,
} from '@univision/fe-commons/dist/constants/pageCategories';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Image from '../Image';
import { tracksVIXLink } from '../Navigation/MegaMenu/helpers';
import stars from './assets/stars.svg';
import closeIcon from './assets/closeIcon.svg';
import vixLogoApp from './assets/vixLogoApp.svg';

import {
  CTAButton,
  CloseButton,
  BannerContent,
  BannerContentTitle,
  SmartBannerWrapper,
  BannerContentTagline,
  SmartBannerContainer,
  BannerContentPublisher,
} from './SmartBanner.styles';

/**
* SmartBanner - renders a banner to download the VIX app.
* Only show on mobile.
* @returns {JSX}
*/
const SmartBanner = () => {
  const [hidden, setHidden] = useState(true);
  const category = useSelector(pageCategorySelector);
  const isMobile = useSelector(deviceSelector) === MOBILE;

  /**
  * setVixBannerKey - sets LOCAL_STORAGE_SMART_BANNER_KEY in local storage
  * @returns {function}
  */
  const setVixBannerKey = () => localStorage.set(
    LOCAL_STORAGE_SMART_BANNER_KEY,
    new Date()
  );

  /**
  * Close modal and set LOCAL_STORAGE_SMART_BANNER_KEY in localStorage
  * @param {boolean} closeSmartBanner - if click on X button
  */
  const handleBannerClick = (closeSmartBanner) => {
    setHidden(true);
    tracksVIXLink(false, true, closeSmartBanner);
  };

  /**
  * Close modal and set LOCAL_STORAGE_SMART_BANNER_KEY in localStorage
  * @returns {boolean}
  */
  const isSelectedCategory = useCallback(() => {
    const isFamososCategory = category === FAMOSOS;
    const isEstiloDeVidaCategory = category === ESTILO_DE_VIDA;
    const isEntretenimientoCategory = category === ENTERTAINMENT;

    return (
      isFamososCategory || isEstiloDeVidaCategory || isEntretenimientoCategory
    );
  }, [category]);

  /**
  * checkOnLocalStorageKeyAndDate - checks localStorage and dates
  * @returns {boolean}
  */
  const checkOnLocalStorageKeyAndDate = useCallback(() => {
    // Check if the banner has already been closed in the last 20 days
    const twentyDays = 1.728e+9; // Scientific Notation / milliseconds
    // The key name LOCAL_STORAGE_SMART_BANNER_KEY is used to
    // prevent ambiguity with other platforms.
    const getVixBannerKey = localStorage.get(LOCAL_STORAGE_SMART_BANNER_KEY);
    const twentyDaysAgo = new Date(Date.now() - twentyDays);
    const hasItBeen20days = new Date(getVixBannerKey) < twentyDaysAgo;

    return !getVixBannerKey || hasItBeen20days;
  }, []);

  useEffect(() => {
    const storeDate = isMobile && checkOnLocalStorageKeyAndDate() && isSelectedCategory();
    if (storeDate) {
      setVixBannerKey();
    }

    setHidden(!storeDate);
  }, [isMobile, category, checkOnLocalStorageKeyAndDate, isSelectedCategory]);

  if (!isMobile || hidden) {
    return null;
  }

  return (
    <SmartBannerWrapper>
      <SmartBannerContainer>
        <CloseButton onClick={() => handleBannerClick(true)}>
          <Image src={closeIcon} />
        </CloseButton>
        <Image src={vixLogoApp} />
        <BannerContent>
          <BannerContentTitle>
            {localization.get('viewOnVix')}
          </BannerContentTitle>
          <BannerContentPublisher>
            Televisa Univision interactive, Inc.
          </BannerContentPublisher>
          <Image src={stars} />
          <BannerContentTagline>
            {localization.get('getInAppStore')}
          </BannerContentTagline>
        </BannerContent>
        <CTAButton
          onClick={() => handleBannerClick(false)}
          href={`${VIX_SMART_BANNER_DOMAIN}${VIX_SMART_BANNER_PATH}`}
        >
          {localization.get('view')}
        </CTAButton>
      </SmartBannerContainer>
    </SmartBannerWrapper>
  );
};

export default SmartBanner;
