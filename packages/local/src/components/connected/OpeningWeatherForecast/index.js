import { connect } from 'react-redux';

import {
  currentMarketSelector,
  currentMarketUriSelector,
  localSelector,
  weatherAlertsSelector,
  weatherForecastSelector,
} from '@univision/fe-commons/dist/store/selectors/local-selectors';
import { getKey, isValidNumber } from '@univision/fe-commons/dist/utils/helpers';
import { localTimeFormat } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import { PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';

import OpeningWeatherForecast from './OpeningWeatherForecast';

/**
 * Connector to subscribe to local market
 * @param {Object} state of the page
 * @param {Object} ownProps component props
 * @returns {Object}
 */
const mapStateToProps = (state, ownProps) => {
  const weatherForecast = weatherForecastSelector(state);
  const {
    isCelsius,
  } = localSelector(state);
  const {
    icon,
    maxTempF,
    minTempF,
    precipChance,
    precipType,
    tempF,
    humidity,
    windDirection,
    windSpeedMph,
    phrase,
  } = weatherForecast;

  const market = currentMarketSelector(state);
  const location = getKey(marketCoordinates, `${market}.name`);
  const timeZone = getKey(marketCoordinates, `${market}.timeZone`);
  const currentTime = localTimeFormat({ useOneDigitForHours: true, timeZone });
  const timeString = `${getKey(currentTime, 'weekDay.day')} ${getKey(currentTime, 'time')}`;

  return {
    humidity,
    icon,
    isCelsius,
    location,
    maxTempF: isValidNumber(maxTempF) ? maxTempF : PLACEHOLDER,
    minTempF,
    phrase,
    precipChance,
    precipType,
    tempF,
    timeString,
    uri: currentMarketUriSelector(state),
    weatherAlerts: weatherAlertsSelector(state),
    windDirection,
    windSpeedMph,
    ownProps,
  };
};

export default connect(mapStateToProps)(OpeningWeatherForecast);
