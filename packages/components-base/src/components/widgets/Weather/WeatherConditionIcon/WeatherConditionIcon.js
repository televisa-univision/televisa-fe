import React, {
  Fragment, useEffect, useState, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Temp from '@univision/shared-components/dist/components/weather/Temp';
import Icon from '@univision/fe-icons/dist/components/Icon';
import {
  convertFahrenheitToCelsius,
  hourlyForecastExtractor,
} from '@univision/fe-local/dist/utils/helpers';
import weatherIcons from '@univision/fe-icons/dist/components/Icon/mapping/weather';
import { DARKER_GREY, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { isValidArray, isValidNumber, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import AnimatedModalBackground from '../../../AnimatedModalBackground';
import WeatherBadge from './WeatherBadge';
import WeatherModal from './WeatherModal';
import Styles from './WeatherConditionIcon.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const WeatherWrapper = styled(motion.div)`${Styles.weatherWrapper}`;
const AlertIcon = styled(Icon).attrs({ fill: WHITE, name: 'infoCircle', size: 32 })`${Styles.weatherIcon}`;
const WeatherIcon = styled(Icon).attrs({ size: 32 })`${Styles.weatherIcon}`;
const WeatherAlertWrapper = styled.div`${Styles.weatherAlertWrapper}`;

/**
 * Weather Condition Icon
 * @param {Object} props - component props
 * @param {func} props.fetchWeatherAlerts - dispatch action
 * @param {func} props.fetchWeatherData - dispatch action
 * @param {Object} props.forecasts - local market forecast
 * @param {number} props.icon - weather icon
 * @param {boolean} props.isCelsius - if true, sets the weather as celsius
 * @param {string} props.localCarousel - true it will render the local carousel layout
 * @param {string} props.location - weather location
 * @param {number} props.maxTempF - max temperature
 * @param {number} props.minTempF - min temperature
 * @param {string} props.precip - precipitation chance phrase
 * @param {number} props.tempF - current temperature value
 * @param {number} props.timeString - current temperature value
 * @param {string} props.uri - market uri
 * @param {Object} props.weatherAlerts - weather alerts info
 * @returns {JSX}
 */
const WeatherConditionIcon = ({
  fetchWeatherAlerts,
  fetchWeatherData,
  forecastError,
  forecasts,
  icon,
  isCelsius,
  localCarousel,
  location,
  maxTempF,
  minTempF,
  precip,
  setScaleUnit,
  tempF,
  timeString,
  timeZone,
  trackLocalWeatherWidget,
  uri,
  weatherAlerts,
}) => {
  const [open, setOpen] = useState(false);

  const hourly = useMemo(
    () => {
      const latestForecast = hourlyForecastExtractor(forecasts, 13, timeZone);

      return latestForecast?.filter((_, index) => index % 4 === 0);
    }, [forecasts, timeZone]
  );

  const temp = isCelsius ? convertFahrenheitToCelsius(tempF) : tempF;
  const iconChecked = weatherIcons[icon];

  const openModal = useCallback(() => {
    setOpen(!open);
    const eventAction = 'topnav-weather-modal';
    const utagData = {
      eventAction,
    };

    NavigationTracker.track(NavigationTracker.events.click, utagData);
    if (isValidFunction(trackLocalWeatherWidget)) trackLocalWeatherWidget('localwidget-weather-modal');
  }, [open, trackLocalWeatherWidget]);

  const { unreadWeatherAlerts, totalCount, extremeAlert } = weatherAlerts;

  useEffect(() => {
    // if there was an error fetching the forecast in ssr,
    // make a retry in csr
    if (forecastError) {
      fetchWeatherData();
    }
    setScaleUnit();

    // eslint-disable-next-line require-jsdoc
    const fn = async () => {
      try {
        await fetchWeatherAlerts();
      } catch (e) {
        // Handle the error appropriately
        // eslint-disable-next-line no-console
        console.error('An error occurred:', e);
      }
    };

    fn();
  }, [fetchWeatherAlerts, setScaleUnit, fetchWeatherData, forecastError]);

  if (!isValidNumber(icon) && !tempF) return null;

  return (
    <Fragment>
      <Wrapper>
        <WeatherWrapper onClick={openModal} isOpen={open}>
          {
            extremeAlert
              ? (<AlertIcon />)
              : (<WeatherIcon name={iconChecked} fill={!localCarousel ? WHITE : undefined} />)
          }
          <Temp
            value={temp}
            color={(localCarousel && !open) ? DARKER_GREY : WHITE}
            size={14}
            isRegular
            isCelsius={isCelsius}
          />
          {
            isValidArray(unreadWeatherAlerts)
            && (
              <WeatherAlertWrapper>
                <WeatherBadge amount={unreadWeatherAlerts.length} />
              </WeatherAlertWrapper>
            )
          }
        </WeatherWrapper>
        <WeatherModal
          extremeAlert={extremeAlert}
          hourly={hourly}
          icon={iconChecked}
          isCelsius={isCelsius}
          isVisible={open}
          location={location}
          localCarousel={localCarousel}
          maxTempF={maxTempF}
          minTempF={minTempF}
          precip={precip}
          tempF={temp}
          timeString={timeString}
          trackLocalWeatherWidget={trackLocalWeatherWidget}
          totalCount={totalCount}
          uri={uri}
        />
      </Wrapper>
      <AnimatedModalBackground
        isVisible={open}
        onClick={() => setOpen(false)}
      />
    </Fragment>
  );
};

WeatherConditionIcon.propTypes = {
  fetchWeatherAlerts: PropTypes.func,
  fetchWeatherData: PropTypes.func,
  forecastError: PropTypes.bool,
  forecasts: PropTypes.object,
  icon: PropTypes.number,
  isCelsius: PropTypes.bool,
  localCarousel: PropTypes.bool,
  location: PropTypes.string,
  maxTempF: PropTypes.number,
  minTempF: PropTypes.number,
  precip: PropTypes.string,
  setScaleUnit: PropTypes.func,
  tempF: PropTypes.number,
  timeString: PropTypes.string,
  timeZone: PropTypes.string,
  trackLocalWeatherWidget: PropTypes.func,
  uri: PropTypes.string,
  weatherAlerts: PropTypes.object,
};

export default WeatherConditionIcon;
