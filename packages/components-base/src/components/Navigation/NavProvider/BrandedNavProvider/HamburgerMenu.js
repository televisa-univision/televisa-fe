import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SectionsButton from '../../../Header/HeaderProvider/SectionsButton';
import Styles from './HamburgerMenu.styles';

const Wrapper = styled(SectionsButton)`${Styles.wrapper}`;

/**
 * Hamburger Menu backwards compatible component
 * @param {Object} props of the component
 * @param {func} [setHamburgerMenuClosed] - dispatch action to close hamburger menu
 * @param {func} [setHamburgerMenuOpen] - dispatch action to open hamburger menu
 * @param {bool} [isHamburgerMenuOpen] - flag to know if hamburger menu is open
 * @returns {JSX}
 */
const HamburgerMenu = ({
  setHamburgerClosed,
  setHamburgerOpen,
  isHamburgerMenuOpen,
  theme,
}) => {
  const handleClick = isHamburgerMenuOpen ? setHamburgerClosed : setHamburgerOpen;
  const { isBrandedHeaderBlack } = theme;
  const variant = isBrandedHeaderBlack ? 'dark' : 'light';

  return (
    <Wrapper
      onClick={handleClick}
      open={isHamburgerMenuOpen}
      primaryControl
      variant={variant}
    />
  );
};

HamburgerMenu.propTypes = {
  isHamburgerMenuOpen: PropTypes.bool,
  setHamburgerClosed: PropTypes.func,
  setHamburgerOpen: PropTypes.func,
  theme: PropTypes.object,
};

HamburgerMenu.defaultProps = {
  theme: {},
};

export default HamburgerMenu;
