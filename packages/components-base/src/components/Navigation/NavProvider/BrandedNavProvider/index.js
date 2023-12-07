import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import features from '@univision/fe-commons/dist/config/features';
import linkListHomeMx from '@univision/fe-commons/dist/utils/header/data/tudn/links/mx/home';
import linkListHome from '@univision/fe-commons/dist/utils/header/data/tudn/links/home';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';

import Navigation from './ComponentCenter/Navigation';
import BrandedHeader from '../../BrandedHeader';
import HamburgerMegaMenu from './HamburgerMegaMenu';
import HamburgerMenu from './HamburgerMenu';
import MegaMenu from '../../MegaMenu';
import Registration from '../../../Registration/lazyRegistration';
import ComponentRight from './ComponentRight';

/**
 * Gets either the legacy hamburger menu or the new hamburger mega menu.
 * @param {Object} hamburgerProps props for the menu component
 * @param {bool} hamburgerProps.isHamburgerMenuOpen - flag to know if hamburger menu is open
 * @param {func} hamburgerProps.setHamburgerMenuClosed - dispatch action to close hamburger menu
 * @param {func} hamburgerProps.setHamburgerMenuOpen - dispatch action to open hamburger menu
 * @returns {JSX}
 */
const getHamburgerMenu = hamburgerProps => (
  features.header.isMegaMenuEnabled()
    ? <HamburgerMegaMenu {...hamburgerProps} />
    : <HamburgerMenu {...hamburgerProps} />
);

/**
 * BrandedNavProvider component, will send the appropiate props to the BrandedHeader.
 * All logic related to that, should be contained in here.
 * @param {Object} props for the component
 * @param {string} [props.brandableType] - type of brandable(tv, radio, show) to load
 * certain components it can be null
 * @param {string} [props.brandedNavLogoName] - icon name from fe-icons to use as logo
 * @param {string} [props.brandedNavLogoUri] - logo URL to redirect
 * @param {bool} [props.isHamburgerMenuOpen] - flag to know if hamburger menu is open
 * @param {bool} [props.isSearchFieldOpen] - flag to identify if the search field is open
 * @param {bool} [props.isTudnSite] - true if it's a TUDN site/domain
 * @param {bool} [props.networks] - menu social networks data
 * @param {func} [props.setHamburgerClosed] - dispatch action to close hamburger menu
 * @param {func} [props.setHamburgerOpen] - dispatch action to open hamburger menu
 * @param {func} [props.setSearchFieldClosed] - dispatch action to close the search field
 * @param {func} [props.setSearchFieldOpen] - dispatch action to open the search field
 * @param {bool} [props.isRegistrationOpen] - flag to know if registration is open
 * @param {func} [props.theme] - custom data theme
 * @returns {JSX}
 */
const BrandedNavProvider = ({
  brandableType,
  brandedNavLogoName,
  brandedNavLogoUri,
  device,
  isHamburgerMenuOpen,
  isSearchFieldOpen,
  isTudnSite,
  isTelevisaSite,
  networks,
  sectionType,
  setHamburgerClosed,
  setHamburgerOpen,
  setSearchFieldClosed,
  setSearchFieldOpen,
  theme,
  isRegistrationOpen,
  pageUri,
  links,
  mxLinks,
  logo,
  ...rest
}) => {
  let linkList;
  const userLocation = useSelector(userLocationSelector);
  const isMxSite = userLocation === MX;

  if (isTelevisaSite) {
    linkList = isMxSite && mxLinks || links;
  } else {
    linkList = isMxSite && linkListHomeMx || linkListHome;
  }

  const hamburgerProps = {
    isHamburgerMenuOpen,
    setHamburgerClosed,
    setHamburgerOpen,
    theme,
  };

  const componentRightProps = {
    brandableType,
    isSearchFieldOpen,
    setSearchFieldClosed,
    setSearchFieldOpen,
    theme,
    isTudnSite,
    userLocation,
  };

  const brandedHeaderProps = {
    componentLeft: !isTelevisaSite && (() => getHamburgerMenu(hamburgerProps)),
    componentRight: () => (<ComponentRight {...componentRightProps} />),
    componentCenter: isTelevisaSite || features.deportes.isWorldCupMVP() ? () => (
      <Navigation
        links={linkList}
        uppercase
        renderOnServer={sectionType === contentTypes.SECTION}
        isTelevisaSite={isTelevisaSite}
      />
    ) : null,
    logoUrl: brandedNavLogoUri,
    logoName: brandedNavLogoName,
    logo,
    isTelevisaSite,
    theme,
    pageUri,
    ...rest,
  };

  return (
    <Fragment>
      <BrandedHeader {...brandedHeaderProps} />
      <MegaMenu
        isMxSite={isMxSite}
        networks={networks}
        isTudnSite={isTelevisaSite}
        open={isHamburgerMenuOpen}
        hamburgerProps={hamburgerProps}
      />
      {isRegistrationOpen && <Registration />}
    </Fragment>
  );
};

BrandedNavProvider.propTypes = {
  brandableType: PropTypes.string,
  brandedNavLogoUri: PropTypes.string,
  brandedNavLogoName: PropTypes.string,
  device: PropTypes.string,
  isHamburgerMenuOpen: PropTypes.bool,
  isSearchFieldOpen: PropTypes.bool,
  isTudnSite: PropTypes.bool,
  isRegistrationOpen: PropTypes.bool,
  networks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      target: PropTypes.string,
      text: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  pageUri: PropTypes.string,
  sectionType: PropTypes.string,
  setHamburgerClosed: PropTypes.func,
  setHamburgerOpen: PropTypes.func,
  setSearchFieldClosed: PropTypes.func,
  setSearchFieldOpen: PropTypes.func,
  theme: PropTypes.object,
  isTelevisaSite: PropTypes.bool,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      target: PropTypes.string,
      text: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  mxLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      target: PropTypes.string,
      text: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  logo: PropTypes.object,
};

export default React.memo(BrandedNavProvider);
