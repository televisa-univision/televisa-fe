/**
 * @module PrendeTV Logo
 */
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PrendeTVContext from '../../context';
import { getRedirectWithLangUrl } from '../../utils';
import { PRENDE_TV_LANDING } from '../../constants';
import LogoImage from '../../assets/logo.svg';

import Styles from './Logo.styles';

const Link = styled.a`${Styles.link}`;
const Image = styled.img`${Styles.image}`;

/**
 * Prende TV static Logo.
 *
 * @param {Object} props - component props
 * @param {boolean} props.hamburgerMenuLogo - if true, renders a bigger logo
 * @returns {JSX}
 */
const Logo = ({ hamburgerMenuLogo }) => {
  const { lang } = useContext(PrendeTVContext);
  return (
    <Link href={`${getRedirectWithLangUrl(lang, PRENDE_TV_LANDING)}`}>
      <Image
        alt="Prende TV"
        hamburgerMenuLogo={hamburgerMenuLogo}
        src={LogoImage}
        title="Prende TV"
      />
    </Link>
  );
};

Logo.propTypes = {
  hamburgerMenuLogo: PropTypes.bool,
};

export default Logo;
