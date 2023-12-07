import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  LANDSCAPE,
  PORTRAIT,
  RECTANGLE,
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import CardSizer from '../CardSizer';

import Styles from './LoadingCard.styles';
import Loading from '../../Loading';

const StyledCardSizer = styled(CardSizer)`
  ${Styles.cardSizer}
`;

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

const StyledLoading = styled(Loading)`
  ${Styles.loading}
`;

/**
 * Loading Card component
 * @returns {JSX}
 */
const LoadingCard = ({
  showSpinner,
  type,
}) => {
  return (
    <StyledCardSizer type={type}>
      <Wrapper>
        {showSpinner && (
          <div>
            <StyledLoading
              label={localization.get('loadingContent')}
              theme={{}}
            />
          </div>
        )}
      </Wrapper>
    </StyledCardSizer>
  );
};

LoadingCard.propTypes = {
  showSpinner: PropTypes.bool,
  type: PropTypes.oneOf([
    LANDSCAPE,
    PORTRAIT,
    RECTANGLE,
    SQUARE,
  ]),
};

export default LoadingCard;
