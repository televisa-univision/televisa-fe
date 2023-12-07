import { connect } from 'react-redux';

import {
  currentMarketSelector,
  weatherForecastSelector,
  localSelector,
} from '@univision/fe-commons/dist/store/selectors/local-selectors';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import formatLocalTime from '@univision/fe-utilities/helpers/date/formatLocalTime';
import { hourlyForecastExtractor, dailyForecastExtractor } from '../../../utils/helpers';

import WeatherForecast from './WeatherForecast';

/**
 * Connector for Weather Forecast
 * @param {Object} state of the page
 * @param {Object} ownProps component props
 * @returns {Object}
 */
const mapStateToProps = (state, ownProps) => {
  const { forecasts } = weatherForecastSelector(state);
  const {
    isCelsius,
  } = localSelector(state);

  const market = currentMarketSelector(state);
  const timeZone = getKey(marketCoordinates, `${market}.timeZone`);
  const currentTime = formatLocalTime({ useOneDigitForHours: true, timeZone });
  const todaysDate = `${getKey(currentTime, 'day')} ${getKey(currentTime, 'month.abbreviatedMonth')}`;

  return {
    isCelsius,
    todaysDate,
    hourly: hourlyForecastExtractor(forecasts, 24, timeZone),
    daily: dailyForecastExtractor(forecasts, 10, timeZone),
    ...ownProps,
  };
};

export default connect(mapStateToProps)(WeatherForecast);
