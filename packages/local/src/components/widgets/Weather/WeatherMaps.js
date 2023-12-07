import React from 'react';

import Features from '@univision/fe-commons/dist/config/features';

import Weather from '.';
import { NoticiasCardWeatherMaps } from './data/index';

/**
 * Conditions widget for Weather
 * @param {Object} props the component props
 * @returns {JSX}
 */
const WeatherMaps = props => (
  <Weather
    type={NoticiasCardWeatherMaps}
    withLayerNav={Features.localMarkets.shouldUseRebranding()}
    {...props}
  />
);

export default WeatherMaps;
