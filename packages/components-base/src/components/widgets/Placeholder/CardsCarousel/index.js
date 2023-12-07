import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';

import CardSizer from '../../../cards/CardSizer';
import Styles from './CardsCarousel.styles';

const Container = styled.div`
  ${Styles.container}
`;
const Card = styled(CardSizer)`
  ${Styles.card}
`;
const TitleContainer = styled.div`
  ${Styles.titleContainer}
`;
const TitleBar = styled.div`
  ${Styles.titleBar}
`;
const Separator = styled.div`
  ${Styles.separator}
`;

const COLUMNS_BY_DEVICE = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};

/**
 * CardsCarousel placeholder component for widgets
 * @param {string} device current user's device
 * @param {bool} removeContainerSpaces flag to remove container spaces
 * @returns {JSX}
 * @constructor
 */
const CardsCarousel = ({ removeContainerSpaces, device }) => {
  const columns = Array.from({ length: COLUMNS_BY_DEVICE[device] }, (_, i) => i);

  return (
    <div className="row">
      <div className="col-12">
        <TitleBar />
        <TitleContainer />
        <Container removeContainerSpaces={removeContainerSpaces}>
          {
            columns.map(column => (
              <Fragment key={column}>
                <Card type={SQUARE} />
                { column !== columns.length - 1 && <Separator /> }
              </Fragment>
            ))
          }
        </Container>
      </div>
    </div>
  );
};

CardsCarousel.propTypes = {
  device: PropTypes.string,
  removeContainerSpaces: PropTypes.bool,
};

export default CardsCarousel;
