import { connect } from 'react-redux';

import { fetchWeatherAlerts, fetchWeatherData, setScaleUnit } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import {
  weatherForecastSelector,
  currentMarketSelector,
  localSelector,
  currentMarketUriSelector,
  weatherAlertsSelector,
} from '@univision/fe-commons/dist/store/selectors/local-selectors';
import { isValidNumber, getKey } from '@univision/fe-commons/dist/utils/helpers';
import { localTimeFormat } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';

import WeatherConditionIcon from './WeatherConditionIcon';

/**
 * Connector to subscribe to local market
 * @param {Object} state of the page
 * @param {Object} ownProps component props
 * @returns {Object}
 */
const mapStateToProps = (state, ownProps) => {
  const {
    forecasts,
    icon,
    maxTempF,
    minTempF,
    precipChance,
    precipType,
    tempF,
    error,
  } = weatherForecastSelector(state);
  const {
    isCelsius,
  } = localSelector(state);

  const market = currentMarketSelector(state);
  const weatherAlerts = weatherAlertsSelector(state);

  const location = getKey(marketCoordinates, `${market}.name`);
  const timeZone = getKey(marketCoordinates, `${market}.timeZone`);
  const currentTime = localTimeFormat({ useOneDigitForHours: true, timeZone });
  const timeString = `${getKey(currentTime, 'weekDay.day')} ${getKey(currentTime, 'time')}`;

  let precipTypeValue;
  if (precipType === 'rain') {
    precipTypeValue = localization.get('rainChance');
  } else if (precipType === 'precip' || precipType === null) {
    precipTypeValue = localization.get('precipChance');
  } else if (precipType === 'snow') {
    precipTypeValue = localization.get('snowChance');
  }

  const precip = precipTypeValue
    && isValidNumber(precipChance) && `${precipTypeValue} ${precipChance}%`;

  return {
    forecastError: error,
    icon,
    tempF,
    isCelsius,
    maxTempF: isValidNumber(maxTempF) ? maxTempF : PLACEHOLDER,
    minTempF,
    location,
    timeString,
    precip,
    forecasts,
    timeZone,
    uri: currentMarketUriSelector(state),
    weatherAlerts,
    ...ownProps,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {Object}
 */
export const mapDispatchToProps = {
  fetchWeatherAlerts,
  fetchWeatherData,
  setScaleUnit,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeatherConditionIcon);
