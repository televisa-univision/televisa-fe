/**
 * @module PrendeTV Footer
 */
import React, { useContext } from 'react';
import styled from 'styled-components';

import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import Dropdown from '@univision/fe-components-base/dist/components/Dropdown';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import localization from '../../constants/localization';
import {
  LANGUAGES_SUPPORTED,
  PRENDE_TV_BETA,
  PRENDE_TV_BLOG,
  PRENDE_TV_CONTACT,
} from '../../constants';
import PrendeTVContext from '../../context';
import { redirectWithLang } from '../../utils';
import Logo from '../Logo';
import Navigation from '../Navigation';
import Copyright from '../Copyright';
import SocialNetwork from '../SocialNetwork';
import LegalLinks from '../LegalLinks';
import ProductLink from '../ProductLink';

import Styles from './Footer.styles';

const DropDownContainer = styled.div`${Styles.dropDownContainer}`;
const DropDownWrapper = styled(Dropdown)`${Styles.dropDownWrapper}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const SmallLogo = styled.div`${Styles.smallLogo}`;
const Wrapper = styled.div`${Styles.wrapper}`;

const defaultOptions = LANGUAGES_SUPPORTED
  .map(language => (
    {
      value: language,
      name: localization.get(language),
    }
  ));

/**
 * Prende TV static Footer.
 * @returns {JSX}
 */
const Footer = () => {
  const {
    lang,
    path,
    page,
  } = useContext(PrendeTVContext);

  /**
   * Handle the on change event from the language dropdown.
   *
   * @param {string} value - language selected.
   */
  const handleLanguageSelector = ({ target: { value } }) => {
    redirectWithLang(value, path);
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Navigation isFooter />
        <SocialNetwork />
        <SmallLogo>
          <Logo />
        </SmallLogo>
      </InnerWrapper>
      <ProductLink />
      <InnerWrapper>
        <Copyright isFooter />
        {path !== PRENDE_TV_BLOG
        && path !== PRENDE_TV_BETA
        && path !== PRENDE_TV_CONTACT
        && page?.data?.type !== contentTypes.ARTICLE
        && (
        <DropDownContainer>
          <DropDownWrapper
            iconFill={WHITE}
            options={defaultOptions}
            onChange={handleLanguageSelector}
            name="order-news"
            value={lang}
          />
        </DropDownContainer>
        )}
      </InnerWrapper>
      <LegalLinks />
    </Wrapper>
  );
};

export default Footer;
