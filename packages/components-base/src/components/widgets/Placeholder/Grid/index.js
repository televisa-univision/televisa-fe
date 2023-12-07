import React from 'react';
import styled from 'styled-components';

import {
  RECTANGLE,
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';

import CardSizer from '../../../cards/CardSizer';
import Styles from './Grid.styles';

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
const columns = [0, 1, 2, 3, 4];

/**
 * Grid Placeholder component for widgets
 * @param {Object} props Props object containing data
 * @returns {JSX}
 * @constructor
 */
const Grid = () => {
  return (
    <div className="row">
      <div className="col-12">
        <TitleBar />
        <TitleContainer />
        <Container>
          {
            columns.map(column => (
              <Card
                index={column}
                key={column}
                type={column === 0 ? SQUARE : RECTANGLE}
              />
            ))
          }
        </Container>
      </div>
    </div>
  );
};

export default Grid;
