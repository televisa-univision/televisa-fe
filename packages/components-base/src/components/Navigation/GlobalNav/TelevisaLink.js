import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TELEVISA_SITE } from '@univision/fe-commons/dist/constants/sites';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './TelevisaLink.styles';
import Link from '../../Link';

const ItemListStyled = styled.div`${Styles.logo}`;
const LinkStyled = styled(Link)`${Styles.link}`;

export const logo = {
  icon: 'televisaApp',
  name: 'televisa',
  site: TELEVISA_SITE,
  uri: 'https://www.televisa.com/',
  href: 'https://www.televisa.com/',
  viewBox: '-5 7 60 15',
  text: '',
};

/**
 * TelevisaLink
 * @param {string} href site section url
 * @param {bool} isMobile is device mobile
 * @param {string} label button label
 * @param {string} market current market
 * @param {bool} site current site
 * @param {bool} isDark current site
 * @returns {JSX}
 */
const TelevisaLink = ({
  isMobile,
  isDark,
}) => {
  let logoObj = logo;

  if (isDark) {
    logoObj = {
      ...logoObj,
      icon: 'televisaAppBlack',
      viewBox: '0 0 60 45',
    };
  }

  const {
    href,
    text,
    icon,
    viewBox,
  } = logoObj;

  const item = {
    href,
    text,
    icon,
    viewBox,
  };

  return (
    <div>
      <ItemListStyled
        itemProp="name"
        role="menuitem"
        isMobile={isMobile}
      >
        <LinkStyled href={item.href} target="_blank">
          <Icon {...item} name={item.icon} />
        </LinkStyled>
      </ItemListStyled>
    </div>
  );
};

TelevisaLink.propTypes = {
  brandedLogoFill: PropTypes.string,
  isMobile: PropTypes.bool,
  isDark: PropTypes.bool,
};

export default TelevisaLink;
