/**
 * @module PrendeTV Legal Link
 */
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import localization from '../../constants/localization';
import PrendeTVContext from '../../context';
import { PRENDETV_LEGAL_LINKS } from '../../constants';

import Styles from './LegalLinks.styles';

const Link = styled.a`${Styles.link}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Component with legal links
 * @param {boolean} vertical - display links as vertical list
 * @returns {JSX}
 */
const LegalLinks = ({ vertical }) => {
  const { lang: language } = useContext(PrendeTVContext);

  return (
    <Wrapper vertical={vertical}>
      <Link force href={PRENDETV_LEGAL_LINKS.termsPolicy.url[language]} target="_blank">{localization.get('legal')}</Link>
      <Link force href={PRENDETV_LEGAL_LINKS.personalInfo.url[language]} target="_blank">{localization.get('dontSell')}</Link>
      <Link force href={PRENDETV_LEGAL_LINKS.termsOfUse.url[language]} target="_blank">{localization.get('termsOfUse')}</Link>
      <Link force href={PRENDETV_LEGAL_LINKS.productsServicesandPatents.url[language]} target="_blank">{localization.get('productsServicesandPatents')}</Link>
      <Link force href={PRENDETV_LEGAL_LINKS.adSpecs.url[language]} target={PRENDETV_LEGAL_LINKS.adSpecs.target}>{localization.get('adSpecs')}</Link>
    </Wrapper>
  );
};

LegalLinks.propTypes = {
  vertical: PropTypes.bool,
};

LegalLinks.defaultProps = {
  vertical: false,
};

export default LegalLinks;
