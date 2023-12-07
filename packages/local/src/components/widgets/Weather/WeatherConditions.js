import React from 'react';

import Features from '@univision/fe-commons/dist/config/features';

import Weather from '.';
import { NoticiasCardWeatherConditions } from './data/index';

/**
 * Conditions widget for Weather
 * @param {Object} props the component props
 * @returns {JSX}
 */
const WeatherConditions = props => (
  <Weather
    type={NoticiasCardWeatherConditions}
    withLayerNav={Features.localMarkets.shouldUseRebranding()}
    {...props}
  />
);

export default WeatherConditions;
