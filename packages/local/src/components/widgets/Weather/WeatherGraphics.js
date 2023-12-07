import React from 'react';

import Features from '@univision/fe-commons/dist/config/features';

import Weather from '.';
import { NoticiasCardWeatherGraphics } from './data/index';

/**
 * Graphics widget for Weather
 * @param {Object} props the component props
 * @returns {JSX}
 */
const WeatherGraphics = props => (
  <Weather
    type={NoticiasCardWeatherGraphics}
    withLayerNav={Features.localMarkets.shouldUseRebranding()}
    {...props}
  />
);

export default WeatherGraphics;
