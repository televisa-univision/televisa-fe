import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import { insertLinksByPosition } from '@univision/fe-commons/dist/utils/helpers';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import toAbsoluteUrl from '@univision/fe-utilities/helpers/url/toAbsoluteUrl';
import useBrandable from '@univision/fe-commons/dist/hooks/useBrandable';
import {
  contentTypeSelector,
  domainSelector,
  siteSelector,
  sitesSelector,
  socialNetworksSelector,
  themeSelector,
  userLocationSelector,
  isTelevisaSiteSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';

import { DARK_VARIANT, LIGHT_VARIANT } from '@univision/fe-utilities/styled/constants';
import Features from '@univision/fe-commons/dist/config/features';

import FooterData from './footerData.json';
import FooterDataMX from './footerDataMX.json';
import FooterDataTelevisa from './footerDataTelevisa.json';
import AppFooterData from './appFooterData.json';
import Styles from './Footer.scss';
import customLinks from './footerCustomLinks.json';
import defaultSocialNetworks from './socialNetworks.json';
import getFooterLayout from './getFooterLayout';

/**
 * Get custom links per page
 * @param {Object} defaultLinks default links
 * @param {string} uri current uri
 * @returns {Array}
 */
export const getLinks = (defaultLinks, uri) => {
  const linksData = customLinks[toRelativeUrl(uri)];
  return linksData ? insertLinksByPosition(defaultLinks, linksData.links) : defaultLinks;
};

/**
 * Get social networks for MX or US
 * @param {string} site site
 * @param {Array} socialNetworksFromStore social networks from store
 * @param {string} userLocation user location
 * @returns {Array}
 */
export const getDefaultSocialNetworks = (site, socialNetworksFromStore, userLocation) => {
  if (site === TUDN_SITE && userLocation === MX) {
    return defaultSocialNetworks[`${site}MX`];
  }
  return isValidArray(socialNetworksFromStore)
    ? socialNetworksFromStore
    : defaultSocialNetworks[site];
};

/**
 * Footer for pages.
 * @param {Object} props Component props
 * @returns {JSX}
 */
const Footer = ({
  disableApps,
  footerLinks,
  disableNewsLetters,
  disableOtherPagesButton,
}) => {
  const isWorldCupMVP = Features.deportes.isWorldCupMVP();
  const userLocation = useSelector(userLocationSelector);
  const isTelevisaSite = useSelector(isTelevisaSiteSelector);
  const footerData = useMemo(() => {
    if (isTelevisaSite) {
      return FooterDataTelevisa;
    }
    if (!isWorldCupMVP) {
      return FooterData;
    }

    return userLocation === MX ? FooterDataMX : FooterData;
  }, [userLocation, isWorldCupMVP, isTelevisaSite]);
  const {
    apps: defaultApps,
    deportes,
    general: defaultGeneralLinks,
    main,
    noticias,
    other,
    otherChains,
  } = footerData;
  const contentType = useSelector(contentTypeSelector);
  const brandable = useBrandable();
  const globalTheme = useSelector(themeSelector);
  const sites = useSelector(sitesSelector);
  const domain = useSelector(domainSelector);
  const site = useSelector(siteSelector);
  const socialNetworksFromStore = useSelector(socialNetworksSelector);
  const socialNetworks = getDefaultSocialNetworks(site, socialNetworksFromStore, userLocation);
  const {
    isDark,
    isFooterDark,
    footerLogo,
    footerCopyright,
    footerLogoHeight,
  } = globalTheme;
  const themeVariant = isDark || isFooterDark
    ? DARK_VARIANT : LIGHT_VARIANT;
  const brandableUri = toRelativeUrl(brandable?.uri);
  const localLinks = isValidArray(brandable?.localMarketFooter?.links)
    ? brandable.localMarketFooter
    : { title: '', links: [] };

  const apps = useMemo(() => {
    if (disableApps) {
      return {};
    }
    if (!brandableUri) {
      return defaultApps;
    }

    const localApps = AppFooterData[brandableUri];

    if (!isValidArray(localApps)) {
      return defaultApps;
    }

    const localAppsLinks = localApps.map(item => ({
      ...item,
      href: toAbsoluteUrl(item.href, sites[item.site]),
    }));

    return {
      ...defaultApps,
      links: [
        ...localAppsLinks,
        ...defaultApps.links,
      ],
    };
  }, [
    brandableUri,
    defaultApps,
    disableApps,
    sites,
  ]);

  const general = useMemo(() => {
    if (isValidObject(footerLinks)) {
      return footerLinks;
    }

    if (!brandableUri) return defaultGeneralLinks;

    return {
      ...defaultGeneralLinks,
      links: getLinks(defaultGeneralLinks.links, brandableUri),
    };
  }, [
    brandableUri,
    defaultGeneralLinks,
    footerLinks,
  ]);

  const commonProps = {
    apps,
    deportes,
    domain,
    footerLogo,
    footerCopyright,
    footerLogoHeight,
    general,
    localLinks,
    main,
    noticias,
    other,
    otherChains,
    socialNetworks,
    themeVariant,
    site,
    disableNewsLetters,
    disableOtherPagesButton,
    userLocation,
  };

  if (Features.header.hideHeaderFooter()) {
    return null;
  }

  const FooterComponent = getFooterLayout({ isWorldCupMVP, contentType, isTelevisaSite });

  return (
    <footer
      className={classnames(Styles.footer, { [Styles.light]: themeVariant === LIGHT_VARIANT })}
      style={{ borderColor: globalTheme?.primary }}
    >
      <FooterComponent {...commonProps} />
    </footer>
  );
};

export default Footer;

Footer.propTypes = {
  disableApps: propTypes.bool,
  footerLinks: propTypes.object,
  disableNewsLetters: propTypes.bool,
  disableOtherPagesButton: propTypes.bool,
};
