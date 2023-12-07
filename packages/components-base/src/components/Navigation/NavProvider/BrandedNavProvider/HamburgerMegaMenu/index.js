import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { deviceSelector, isMarketSelectorOpenSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { BLACK, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import features from '@univision/fe-commons/dist/config/features';

import Styles from './HamburgerMegaMenu.styles';

const Button = styled.button`${Styles.button}`;
const MenuIcon = styled(Icon)`${Styles.menuIcon}`;
const Label = styled.span`${Styles.label}`;

/**
 * Hamburger widget for opening mega menu
 * @param {Object} props of the component
 * @param {func} [setHamburgerMenuClosed] - dispatch action to close hamburger
 * @param {func} [setHamburgerMenuOpen] - dispatch action to open hamburger
 * @param {bool} [isHamburgerMenuOpen] - flag to know if hamburger is open
 * @param {func} [setMarketSelectorOpen] - dispatch action to open market selector
 * @param {bool} [isMarketSelectorOpen] - flag to know if market selector is open
 * @returns {JSX}
 */
const HamburgerMegaMenu = ({
  setHamburgerClosed,
  setHamburgerOpen,
  isHamburgerMenuOpen,
  isMarketSelectorOpen,
  theme,
  isDesktop,
}) => {
  const { isBrandedHeaderBlack, disablePrendeTvButton } = theme;
  const variant = isBrandedHeaderBlack ? 'dark' : 'light';
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const handleIcon = useMemo(() => {
    if (isHamburgerMenuOpen && isMarketSelectorOpen && !isDesktop) {
      return 'arrowLeft';
    }

    return isHamburgerMenuOpen ? 'close' : 'hamburger';
  }, [isHamburgerMenuOpen, isMarketSelectorOpen, isDesktop]);

  return (
    <Button
      data-element-name="HamburgerMenuButton"
      onClick={isHamburgerMenuOpen ? setHamburgerClosed : setHamburgerOpen}
      variant={variant}
      disablePrendeTvButton={disablePrendeTvButton}
      isWorldCupMVP={isWorldCupMVP}
    >
      <MenuIcon
        name={handleIcon}
        size={isMarketSelectorOpen ? 'small' : [18, 18]}
        fill={isBrandedHeaderBlack ? WHITE : BLACK}
      />
      {isDesktop && (
        <Label variant={variant} isWorldCupMVP={isWorldCupMVP}>
          {
            isHamburgerMenuOpen
              ? LocalizationManager.get('close')
              : !isWorldCupMVP && LocalizationManager.get('sections')
          }
        </Label>
      )}
    </Button>
  );
};

HamburgerMegaMenu.propTypes = {
  isDesktop: PropTypes.bool,
  isHamburgerMenuOpen: PropTypes.bool,
  setHamburgerClosed: PropTypes.func,
  setHamburgerOpen: PropTypes.func,
  isMarketSelectorOpen: PropTypes.bool,
  theme: PropTypes.object,
};

HamburgerMegaMenu.defaultProps = {
  theme: {},
};

/**
 * Map stat to props for component
 * @param {Object} state of the page
 * @param {Object} ownProps component props
 * @returns {Object}
 */
const mapStateToProps = (state, ownProps) => ({
  isDesktop: deviceSelector(state) === 'desktop',
  isMarketSelectorOpen: isMarketSelectorOpenSelector(state),
  ...ownProps,
});

export default connect(mapStateToProps)(HamburgerMegaMenu);
