import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as subNavTypes from '@univision/fe-commons/dist/constants/subNavTypes';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import features from '@univision/fe-commons/dist/config/features';
import { isTemasPage } from '@univision/fe-commons/dist/utils/header/helpers';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';

import LogOutBar from '../../LogOutBar';
import SeoNav from '../SeoNav';

import GlobalNavProvider from './GlobalNavProvider';
import SubNavProvider from './SubNavProvider';
import Styles from './NavProvider.styles';
import SmartBanner from '../../SmartBanner';

import BrandedNavProvider from './BrandedNavProvider';

const Wrapper = styled.div`${Styles.wrapper}`;
const LogOutBarStyled = styled(LogOutBar)`${Styles.logOut}`;

/**
 * NavProvider component. This will only render each block of the navigation.
 * Each block will contain it's own logic.
 * @param {Object} props of the component
 * @param {string} props.activePath parent path that is the current active
 * @param {string} [props.brandableType] brandable type of this section
 * @param {string} [props.brandedNavLogoUri] brandable nav logo URL ro redirect
 * @param {string} [props.brandedNavLogoName] brandable nav logo icon name from fe-icons
 * @param {string} [props.contentType] current content type
 * @param {string} [props.domain] current domain
 * @param {bool} [props.isHamburgerMenuOpen] determines if the hamburger menu is open
 * @param {bool} [props.isLocalMarket] determines if it's a local market
 * @param {bool} [props.isSearchFieldOpen] determines if search field is open
 * @param {bool} [props.isTudnSite=false] determines if is a TUDN site
 * @param {bool} [props.isTelevisaSite=false] determines if is Televisa site
 * @param {bool} [props.isLasEstrellasSite=false] determines if is Las Estrellas from Televisa site
 * @param {Array} [props.links] subnav links
 * @param {Array} [props.networks] a list of available social network links for the page
 * @param {string} [props.pageCategory] current pge category
 * @param {string} [props.pageUri] current active URL
 * @param {bool} [props.userLogIn] if user is logged In
 * @param {Function} [props.sectionType] current section type
 * @param {Function} [props.setHamburgerClosed] dispatches action to close hamburger menu
 * @param {Function} [props.setHamburgerOpen] dispatches action to open hamburger menu
 * @param {Function} [props.setSearchFieldClosed] dispatches action to close search field
 * @param {Function} [props.setLogOutSticky] dispatches action to set sticky logout bar
 * @param {Function} [props.setLogOutNotSticky] dispatches action to unset sticky logout bar
 * @param {Function} [props.setSearchFieldOpen] dispatches action to open search field
 * @param {bool} [props.shouldRenderMVPD] determines whether to render or not the MVPD bar
 * @param {Object} [props.sites] available sites domains
 * @param {Object} [props.site] available sites domains
 * @param {string} [props.slideshowType] the current slideshow type
 * @param {string} [props.subNavType] type that help indentify which component to load as subnav
 * @param {Object} [props.theme] theme from the themeProvider
 * @param {string} [props.variant] Page variant
 * @param {Object} [props.pageData] contents all info related to the page
 * @returns {JSX}
 */
const NavProvider = (props) => {
  const {
    contentType,
    device,
    globalNavTop,
    isLocalMarket,
    userLogIn,
    shouldRenderMVPD,
    subNavType,
    sectionType,
    isTudnSite,
    isTelevisaSite,
    setUserLogIn,
    setUserLogOut,
    pageCategory,
    pageData,
    pageUri,
    theme,
    userLocation,
    ...rest
  } = props;
  const forceNavigation = features.deportes.useLeagueTheme(toRelativeUrl(pageUri), contentType)
    || features.deportes.forceSectionNav(toRelativeUrl(pageUri), contentType);
  const withNavigation = !features.deportes.isWorldCupMVP()
    || ((sectionType !== contentTypes.SECTION || forceNavigation)
      && features.deportes.isWorldCupMVP());
  const showHeaderHub = isTemasPage(pageData?.type) && features.content.hasTagPages()
    && withNavigation;
  // this can be set on the theme file use this to hide the bottom nav
  const hideNavBottom = theme?.hideNavBottom;

  const isSubNavEmpty = subNavType === subNavTypes.EMPTY_SUBNAV;
  const isMatchCenter = contentType === contentTypes.SOCCER_MATCH;
  const shoulShowTudnMvpdBar = isTudnSite && !isMatchCenter;
  const shouldShowTelevisaMvpdBar = isTelevisaSite
    && (contentType === contentTypes.LIVE_STREAM || contentType === contentTypes.VIDEO);

  let NavTopComponent = BrandedNavProvider;
  let NavBottomComponent = GlobalNavProvider;

  // Don't render anything in case the hide header flag is enabled
  if (features.header.hideHeaderFooter()) {
    return null;
  }

  if (globalNavTop) {
    NavTopComponent = GlobalNavProvider;
    NavBottomComponent = BrandedNavProvider;
  }

  const { isHamburgerMenuOpen } = props;

  return (
    <Fragment>
      <SmartBanner />
      <SeoNav />
      <Wrapper
        hamburgerMenuOpen={isHamburgerMenuOpen}
        isTelevisaSite={isTelevisaSite}
      >
        <NavTopComponent
          isTudnSite={isTudnSite}
          isTelevisaSite={isTelevisaSite}
          theme={theme}
          {...rest}
        />
        {hideNavBottom ? null : (
          <NavBottomComponent
            device={device}
            isTelevisaSite={isTelevisaSite}
            pageData={pageData}
            isTudnSite={isTudnSite}
            pageCategory={pageCategory}
            sectionType={sectionType}
            userLocation={userLocation}
            theme={theme}
            {...rest}
          />
        )}
      </Wrapper>

      {(
        shouldRenderMVPD
        && !isTudnSite && <LogOutBar />
      )}

      {!isTelevisaSite && (!isSubNavEmpty && !showHeaderHub)
        && (
          <SubNavProvider
            subNavType={subNavType}
            contentType={contentType}
            pageCategory={pageCategory}
            withNavigation={withNavigation}
            {...rest}
          />
        )}

      {shoulShowTudnMvpdBar && (
        <LogOutBarStyled
          variant="light"
          userLogIn={userLogIn}
          setUserLogIn={setUserLogIn}
          setUserLogOut={setUserLogOut}
          isTudnSite={isTudnSite}
        />
      )}

      {shouldShowTelevisaMvpdBar && (
        <LogOutBar
          variant="light"
          userLogIn={userLogIn}
          setUserLogIn={setUserLogIn}
          setUserLogOut={setUserLogOut}
        />
      )}

    </Fragment>
  );
};

NavProvider.propTypes = {
  activePath: PropTypes.string,
  brandableType: PropTypes.string,
  brandedNavLogoName: PropTypes.string,
  brandedNavLogoUri: PropTypes.string,
  contentType: PropTypes.string,
  device: PropTypes.string,
  domain: PropTypes.string,
  globalNavTop: PropTypes.bool,
  isHamburgerMenuOpen: PropTypes.bool,
  isLocalMarket: PropTypes.bool,
  isSearchFieldOpen: PropTypes.bool,
  isTudnSite: PropTypes.bool,
  links: PropTypes.array,
  networks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      target: PropTypes.string,
      text: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  pageCategory: PropTypes.string,
  pageData: PropTypes.object,
  pageUri: PropTypes.string,
  userLogIn: PropTypes.bool,
  sectionType: PropTypes.string,
  setHamburgerClosed: PropTypes.func,
  setHamburgerOpen: PropTypes.func,
  setSearchFieldClosed: PropTypes.func,
  setUserLogIn: PropTypes.func,
  setUserLogOut: PropTypes.func,
  setSearchFieldOpen: PropTypes.func,
  shouldRenderMVPD: PropTypes.bool,
  sites: PropTypes.object,
  slideshowType: PropTypes.string,
  subNavType: PropTypes.string,
  theme: PropTypes.object,
  userLocation: PropTypes.string,
  variant: PropTypes.string,
  isTelevisaSite: PropTypes.bool,
};

export default NavProvider;
