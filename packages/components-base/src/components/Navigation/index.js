import React from 'react';
import { connect } from 'react-redux';
import {
  appVersionSelector,
  deviceSelector,
  domainSelector,
  isTelevisaSiteSelector,
  isLocalMarketSelector,
  isTudnSiteSelector,
  pageCategorySelector,
  pageDataSelector,
  pageUriSelector,
  sitesSelector,
  siteSelector,
  socialNetworksSelector,
  themeSelector,
  userLocationSelector,
  variantSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';

import registrationSelector from '@univision/fe-commons/dist/store/selectors/registration-selectors';

import {
  setHamburgerClosed,
  setHamburgerOpen,
  setSearchFieldClosed,
  setSearchFieldOpen,
  setUserLogIn,
  setUserLogOut,
} from '@univision/fe-commons/dist/store/actions/header/header-actions';

import NavProvider from './NavProvider';
import WithWidgets from '../widgets/WithWidgets';
import insertionPoints from '../widgets/WithWidgets/insertionPoints.json';

/**
 * NAVIGATION CONNECTOR
 *
 * This is the main entry point to deliver data to all components related
 * to Navigation.
 *
 * If you need to modify any data you should head to the commons package.
 * Inside utils/header/data you should find its corresponding file.
 *
 * If you need a flag for all components to be aware of in real time, you
 * should handle it via dispatch actions and redux, see examples on how
 * we handle the hamburger menu and search field flags.
 *
 * If you need to modify data in the Store, you better map that action in
 * mapDispatchToProps.
 */

/**
 * Connector to be called when state change
 * @param {Object} state of the app
 * @returns {Object}
 */
const mapStateToProps = state => ({
  ...state.headerConf,
  appVersion: appVersionSelector(state),
  domain: domainSelector(state),
  device: deviceSelector(state),
  isTelevisaSite: isTelevisaSiteSelector(state),
  isLocalMarket: isLocalMarketSelector(state),
  isRegistrationOpen: registrationSelector(state),
  isTudnSite: isTudnSiteSelector(state),
  networks: socialNetworksSelector(state),
  pageCategory: pageCategorySelector(state),
  pageData: pageDataSelector(state),
  pageUri: pageUriSelector(state),
  sites: sitesSelector(state),
  site: siteSelector(state),
  theme: themeSelector(state),
  userLocation: userLocationSelector(state),
  variant: variantSelector(state),
});

/**
 * Connector to be called for dispatch actions
 * @param {Object} dispatch method of the state
 * @returns {Object}
 */
const mapDispatchToProps = {
  setHamburgerClosed,
  setHamburgerOpen,
  setSearchFieldClosed,
  setSearchFieldOpen,
  setUserLogIn,
  setUserLogOut,
};

const ConnectedNavProvider = connect(mapStateToProps, mapDispatchToProps)(NavProvider);

export default WithWidgets(<ConnectedNavProvider />, insertionPoints.belowHeader);
