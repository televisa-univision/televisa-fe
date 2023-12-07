import React from 'react';
import styled from 'styled-components';

import HorizontalCardPlaceholder from '@univision/fe-components-base/dist/components/Placeholder/horizontalCard';

import Styles from './SoccerLivePlaceholder.styles';

const Container = styled.div`${Styles.container}`;
const SoccerLiveSquareContainer = styled.div`${Styles.soccerLiveSquareContainer}`;
const SoccerLiveSquare = styled.div`${Styles.soccerLiveSquare}`;
const CardTVWrapper = styled.div`${Styles.cardTVWrapper}`;

/**
 * Placeholder TV guide
 * @returns {JSX}
 */
const SoccerLivePlaceholder = () => {
  return (
    <Container>
      <SoccerLiveSquareContainer>
        <SoccerLiveSquare />
      </SoccerLiveSquareContainer>
      <CardTVWrapper>
        <HorizontalCardPlaceholder />
      </CardTVWrapper>
      <SoccerLiveSquareContainer>
        <SoccerLiveSquare />
      </SoccerLiveSquareContainer>
    </Container>
  );
};

export default SoccerLivePlaceholder;
