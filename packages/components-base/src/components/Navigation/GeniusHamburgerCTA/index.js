import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import { SPRING_GREEN } from '@univision/fe-utilities/styled/constants';
import fifaFantasyLogo from '@univision/fe-commons/dist/assets/images/tudn/logos/fifa-fantasy.svg';

import Link from '../../Link';
import Styles from './GeniusHamburgerCTA.styles';

const Container = styled.div`
  ${Styles.container}
`;

const StyledLink = styled(Link)`
  ${Styles.link}
`;

const StyledImg = styled.img`
  ${Styles.img}
`;

const FIFA_FANTASY_ENTRY_POINT = 'https://fantasypredictor.tudn.com/';

/**
 * Genius CTA
 * @returns {JSX}
 */
const GeniusHamburgerCTA = ({ className }) => {
  return (
    <Container className={className}>
      <StyledLink href={FIFA_FANTASY_ENTRY_POINT} target="_blank">
        <StyledImg src={fifaFantasyLogo} alt="FIFA Fantasy & Quiniela" />
        <Icon name="arrowRight" size="small" fill={SPRING_GREEN} />
      </StyledLink>
    </Container>
  );
};

GeniusHamburgerCTA.propTypes = {
  className: PropTypes.string,
};

export default GeniusHamburgerCTA;
