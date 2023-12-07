/**
 * @module PrendeTV Hamburger Menu
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Animated from '@univision/fe-components-base/dist/components/Animated';
import AnimatedModalBackground
  from '@univision/fe-components-base/dist/components/AnimatedModalBackground';
import Icon from '@univision/fe-icons';
import { WHITE } from '@univision/fe-utilities/styled/constants';
import { MOBILE } from '@univision/fe-commons/dist/constants/devices';

import Logo from '../../Logo';
import Navigation from '../../Navigation';
import SocialNetwork from '../../SocialNetwork';
import LegalLinks from '../../LegalLinks';
import ProductLink from '../../ProductLink';
import WatchNow from '../../WatchNow';
import localization from '../../../constants/localization';
import Styles from './HamburgerMenu.styles';

const Background = styled(Animated)`${Styles.background}`;
const CategoryTitle = styled.div`${Styles.categoryTitle}`;
const ContentWrapper = styled.div`${Styles.contentWrapper}`;
const HamburgerIcon = styled(Icon)`${Styles.icon}`;
const HeadMenu = styled.div`${Styles.headMenu}`;
const Separator = styled.div`${Styles.separator}`;
const Wrapper = styled.div`${Styles.wrapper}`;
const WrapperIcon = styled.div``;

/**
 * Prende TV static HamburgerMenu.
 *
 * @param {Object} props - component props
 * @param {string} props.device - device detected
 * @param {boolean} props.open - show or hide menu
 * @param {function} props.toggle - show or hide menu
 * @returns {JSX}
 */
const HamburgerMenu = ({
  device, open, toggle,
}) => {
  const variants = {
    animate: { x: '0' },
    exit: { x: '-100vw' },
    initial: { x: '-100vw' },
  };

  useEffect(() => {
    if (open) {
      if (typeof window !== 'undefined' && device === MOBILE) {
        window.document.body.style.overflow = 'hidden';
      }

      if (device !== MOBILE) {
        window.addEventListener('scroll', toggle, { passive: false });
      }
    }

    return (() => {
      if (device === MOBILE) {
        window.document.body.style.overflow = null;
      } else {
        window.removeEventListener('scroll', toggle);
      }
    });
  }, [device, open, toggle]);

  return (
    <>
      <Background isVisible={open} {...variants}>
        <Wrapper>
          <HeadMenu>
            <WrapperIcon onClick={toggle}>
              <HamburgerIcon name="close" size={[17, 14]} fill={WHITE} />
            </WrapperIcon>
            <Logo hamburgerMenuLogo />
          </HeadMenu>
          <ContentWrapper>
            <CategoryTitle>{localization.get('watchNow')}</CategoryTitle>
            <WatchNow />
            <Separator />
            <CategoryTitle>{localization.get('downloadTheApp')}</CategoryTitle>
            <ProductLink vertical />
            <Separator />
            <CategoryTitle>{localization.get('morePrendeTV')}</CategoryTitle>
            <Navigation />
            <Separator />
            <CategoryTitle>Legal</CategoryTitle>
            <LegalLinks vertical />
            <SocialNetwork isHeader />
          </ContentWrapper>
        </Wrapper>
      </Background>
      <AnimatedModalBackground isVisible={open} onClick={toggle} />
    </>
  );
};

HamburgerMenu.propTypes = {
  device: PropTypes.string,
  open: PropTypes.bool,
  toggle: PropTypes.func,
};

export default HamburgerMenu;
