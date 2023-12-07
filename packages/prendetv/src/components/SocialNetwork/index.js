/**
 * @module PrendeTV Social Network
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '@univision/fe-components-base/dist/components/Link';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import Styles from './SocialNetwork.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const LinkWrapper = styled(Link)`${Styles.linkWrapper}`;

/**
 * Returns social network buttons
 * @param {string} color - fill color
 * @returns {JSX.Element}
 * @constructor
 */
const SocialNetwork = ({ isHeader }) => (
  <Wrapper isHeader={isHeader}>
    <LinkWrapper href="https://www.facebook.com/prendetvgratis" target="_blank">
      <Icon name="facebook" fill={WHITE} size={30} />
    </LinkWrapper>
    <LinkWrapper href="https://www.instagram.com/prendetv/" target="_blank">
      <Icon name="instagram" fill={WHITE} size={30} />
    </LinkWrapper>
    <LinkWrapper href="https://twitter.com/PrendeTV" target="_blank">
      <Icon name="twitter" fill={WHITE} size={30} />
    </LinkWrapper>
  </Wrapper>
);

SocialNetwork.propTypes = {
  isHeader: PropTypes.bool,
};

export default SocialNetwork;
