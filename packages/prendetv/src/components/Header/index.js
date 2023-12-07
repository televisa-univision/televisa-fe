/**
 * @module PrendeTV Header
 */
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Logo from '../Logo';
import PrendeTVContext from '../../context';

import DownloadMenu from './DownloadMenu';
import Styles from './Header.styles';
import HamburgerMegaMenu from './HamburgerMenu';

const Wrapper = styled.div`${Styles.wrapper}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const HamburgerLogoWrapper = styled.div`${Styles.hamburgerLogoWrapper}`;
const WrapperIcon = styled.div``;
const HamburgerIcon = styled(Icon)`${Styles.icon}`;

/**
 * Prende TV Header.
 *
 * @returns {JSX}
 */
const Header = () => {
  const [open, setOpen] = useState(false);
  const {
    device,
  } = useContext(PrendeTVContext);

  /**
   * Handle the toggle
   */
  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Wrapper>
      <InnerWrapper>
        <HamburgerLogoWrapper>
          <HamburgerMegaMenu open={open} device={device} toggle={toggle} />
          <WrapperIcon onClick={toggle}>
            <HamburgerIcon name="prendeHamburger" size={24} fill={WHITE} />
          </WrapperIcon>
          <Logo />
        </HamburgerLogoWrapper>
        <DownloadMenu device={device} />
      </InnerWrapper>
    </Wrapper>
  );
};

export default Header;
