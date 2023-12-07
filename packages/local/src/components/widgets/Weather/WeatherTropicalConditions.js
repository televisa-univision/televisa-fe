import React from 'react';

import Features from '@univision/fe-commons/dist/config/features';

import Weather from '.';
import { NoticiasCardTropicalWeatherConditions } from './data/index';

/**
 * Tropical Conditions widget for Weather
 * @param {Object} props the component props
 * @returns {JSX}
 */
const WeatherTropicalConditions = props => (
  <Weather
    type={NoticiasCardTropicalWeatherConditions}
    withLayerNav={Features.localMarkets.shouldUseRebranding()}
    {...props}
  />
);

export default WeatherTropicalConditions;
