import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import {
  ContentPlaceholder, EmptyPlaceholder, OpeningPlaceholder, CardPlaceHolder,
} from '.';
import TVGuidePlaceholder from './tvGuideCards';
import HorizontalCardPlaceholder from './horizontalCard';
import SearchPlaceholder from './searchCard';
import OpeningWeatherForecastPlaceholder from './OpeningWeatherForecast';

/**
 * Card placeholder wrapper
 * @param {Object} children - Component children
 * @returns {jsx}
 */
const CardContainer = ({ children }) => <div style={{ width: '300px' }}>{children}</div>;

CardContainer.propTypes = {
  children: PropTypes.node,
};

storiesOf('Widgets/Placeholder', module)
  .add('CardPlaceholder with animation', () => (
    <CardContainer>
      <CardPlaceHolder animated />
    </CardContainer>
  ))
  .add('CardPlaceholder without animation', () => (
    <CardContainer>
      <CardPlaceHolder animated={false} />
    </CardContainer>
  ))
  .add('OpeningPlaceholder', OpeningPlaceholder)
  .add('ContentPlaceholder hidden on desktop break-point', ContentPlaceholder)
  .add('empty', EmptyPlaceholder)
  .add('HorizontalCard Placeholder', () => (
    <CardContainer>
      <HorizontalCardPlaceholder />
    </CardContainer>
  ))
  .add('TVGuideCard Placeholder', TVGuidePlaceholder)
  .add('SearchCard Placeholder', () => (
    <SearchPlaceholder numberOfCards={3} />))
  .add('Opening Weather Forecast Placeholder', () => (
    <OpeningWeatherForecastPlaceholder />));
