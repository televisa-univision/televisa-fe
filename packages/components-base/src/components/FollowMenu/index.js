import React from 'react';
import PropTypes from 'prop-types';

import Features from '@univision/fe-commons/dist/config/features';
import Store from '@univision/fe-commons/dist/store/store';
import { isDesktop } from '@univision/fe-commons/dist/store/storeHelpers';

import LegacyFollowMenu from './LegacyFollowMenu';
import NewFollowMenu from './NewFollowMenu';

/**
 * Renders either the legacy follow menu or the new follow menu
 * @param {Object} props follow menu props
 * @returns {JSX}
 */
const FollowMenu = (props) => {
  const { isTudn, useLegacy } = props;
  return Features.header.isMegaMenuEnabled() && !isTudn && !useLegacy
    ? <NewFollowMenu isVertical={!isDesktop(Store)} {...props} />
    : <LegacyFollowMenu {...props} />;
};

FollowMenu.propTypes = {
  addGradientBackground: PropTypes.bool,
  addScreenOverlay: PropTypes.bool,
  className: PropTypes.string,
  forceMobileView: PropTypes.bool,
  isTudn: PropTypes.bool,
  isVertical: PropTypes.bool,
  networks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onClick: PropTypes.func,
      target: PropTypes.string,
      text: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  onToggle: PropTypes.func,
  openDirection: PropTypes.oneOf(['up', 'down']),
  showLabel: PropTypes.bool,
  theme: PropTypes.shape({
    primary: PropTypes.string,
  }),
  useLegacy: PropTypes.bool,
  variant: PropTypes.oneOf(['light', 'dark']),
};

export default FollowMenu;
