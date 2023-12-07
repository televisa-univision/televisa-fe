/**
 * @module PrendeTV WatchNow
 */
import React from 'react';
import styled from 'styled-components';

import Icon from '@univision/fe-icons';
import { CHINESE_SILVER } from '@univision/fe-utilities/styled/constants';

import localization from '../../constants/localization';
import { WATCH_NOW_LINKS } from '../../constants';

import Styles from './WatchNow.styles';

const Link = styled.a`${Styles.link}`;
const WatchIcon = styled.div`${Styles.watchIcon}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
* Prende TV Watch Now.
*
* @returns {JSX}
*/
const WatchNow = () => (
  <Wrapper>
    {WATCH_NOW_LINKS.map(({
      key, url, icon, size, padding,
    }) => (
      <Link key={key} href={url}>
        <WatchIcon name={icon} padding={padding}>
          <Icon name={icon} size={size} fill={CHINESE_SILVER} />
        </WatchIcon>
        {localization.get(key)}
      </Link>
    ))}
  </Wrapper>
);

export default WatchNow;
