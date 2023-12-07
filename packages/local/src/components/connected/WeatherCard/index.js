import { connect } from 'react-redux';

import {
  currentMarketSelector,
  currentMarketUriSelector,
  weatherForecastSelector,
  localSelector,
  weatherAlertsSelector,
} from '@univision/fe-commons/dist/store/selectors/local-selectors';
import { getKey, isValidNumber } from '@univision/fe-commons/dist/utils/helpers';
import { localTimeFormat } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import weatherIcons from '@univision/fe-icons/dist/components/Icon/mapping/weather';
import { PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';

import localization from '../../../utils/localization';
import WeatherCard from './WeatherCard';

/**
 * Connector for Weather card
 * @param {Object} state of the page
 * @param {Object} ownProps component props
 * @returns {Object}
 */
const mapStateToProps = (state, ownProps) => {
  const {
    forecasts,
    humidity,
    icon,
    maxTempF,
    minTempF,
    phrase,
    precipChance,
    precipType,
    tempF,
    windDirection,
    windSpeedMph,
  } = weatherForecastSelector(state);
  const {
    isCelsius,
  } = localSelector(state);

  const market = currentMarketSelector(state);
  const marketName = getKey(marketCoordinates, `${market}.name`);
  const timeZone = getKey(marketCoordinates, `${market}.timeZone`);
  const marketTime = localTimeFormat({ useOneDigitForHours: true, timeZone });
  const currentTime = `${getKey(marketTime, 'weekDay.day')} ${getKey(marketTime, 'time').toUpperCase()}`;

  let precipMessage = {};
  if (precipType === 'rain') {
    precipMessage = {
      abbreviated: localization.get('rainChanceAbbreviated'),
      message: localization.get('rainChance'),
    };
  } else if (precipType === 'precip' || precipType === null) {
    precipMessage = {
      abbreviated: localization.get('precipChanceAbbreviated'),
      message: localization.get('precipChance'),
    };
  } else if (precipType === 'snow') {
    precipMessage = {
      abbreviated: localization.get('snowChanceAbbreviated'),
      message: localization.get('snowChance'),
    };
  }

  return {
    currentTime,
    forecasts,
    humidity,
    icon: weatherIcons[icon],
    isCelsius,
    marketName,
    maxTempF: isValidNumber(maxTempF) ? maxTempF : PLACEHOLDER,
    minTempF,
    phrase,
    precipChance,
    precipMessage,
    tempF,
    timeZone,
    uri: currentMarketUriSelector(state),
    weatherAlerts: weatherAlertsSelector(state),
    wind: windDirection && windSpeedMph && `${windDirection} ${windSpeedMph}mph`,
    ...ownProps,
  };
};

/**
 * Check if shouldn't set new props if the data is equal or the previous
 * data is not a error
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  return prevProps.tempF === nextProps.tempF
    && prevProps.weatherAlerts.totalCount === nextProps.weatherAlerts.totalCount
    && prevProps.isCelsius === nextProps.isCelsius;
};

export default connect(
  mapStateToProps,
  null,
  null,
  {
    areStatePropsEqual,
  }
)(WeatherCard);
