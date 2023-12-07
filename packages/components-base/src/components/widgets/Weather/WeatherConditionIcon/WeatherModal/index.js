import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import LocationDate from '@univision/shared-components/dist/components/weather/LocationDate';
import MinMaxTemp from '@univision/shared-components/dist/components/weather/MinMaxTemp';
import Icon from '@univision/fe-icons/dist/components/Icon';
import WeatherDate from '@univision/shared-components/dist/components/weather/WeatherDate';
import Temp from '@univision/shared-components/dist/components/weather/Temp';
import weatherIcons from '@univision/fe-icons/dist/components/Icon/mapping/weather';
import TemperatureSwitch from '@univision/fe-local/dist/components/connected/TemperatureSwitch';
import ElTiempoHeader from '@univision/fe-local/dist/components/compound/Header/ElTiempo';
import WeatherBanner from '@univision/fe-local/dist/components/compound/WeatherBanner';
import { MODAL } from '@univision/fe-local/dist/components/compound/WeatherBanner/utils';
import { convertFahrenheitToCelsius } from '@univision/fe-local/dist/utils/helpers';
import { isValidArray, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import { BANNER_FLAVOR_MODAL, PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import Link from '../../../../Link';
import animationSettings from './animationSettings.json';
import Styles from './WeatherModal.styles';

const DataContainer = styled.div`${Styles.dataContainer}`;
const ModalWrapper = styled.div`${Styles.modalWrapper}`;
const Modal = styled(motion.div)`${Styles.modal}`;
const RowCol = styled.div`${Styles.rowCol}`;
const WeatherIcon = styled(Icon)`${Styles.weatherIcon}`;
const MinMax = styled(MinMaxTemp)`${Styles.minMax}`;
const Location = styled(LocationDate)`${Styles.location}`;
const Precip = styled.p`${Styles.precip}`;
const Separator = styled.div`${Styles.separator}`;
const TempSwitch = styled(TemperatureSwitch)`${Styles.tempSwitch}`;
const SeeForecast = styled(Link).attrs({ className: 'uvs-font-c-regular' })`${Styles.seeForecast}`;
const ArrowUp = styled.div`${Styles.arrowUp}`;

/**
 * WeatherModal Component
 * @param {Object} props - component props
 * @param {Object} props.extremeAlert - weather alert with extreme severity
 * @param {Array} props.hourly - hourly values
 * @param {string} props.icon - current weather icon
 * @param {boolean} props.isCelsius - if true, sets the weather as celsius
 * @param {boolean} props.isVisible - if true, displays the modal view
 * @param {string} props.localCarousel - true it will render the local carousel layout
 * @param {string} props.location - weather location
 * @param {number} props.maxTempF - max temperature
 * @param {number} props.minTempF - min temperature
 * @param {string} props.precip - precipitation chance phrase
 * @param {number} props.tempF - current temperature value
 * @param {number} props.totalCount - total active alerts.
 * @param {string} props.uri - market uri
 * @returns {JSX}
 */
const WeatherModal = ({
  extremeAlert,
  hourly,
  icon,
  isCelsius,
  isVisible,
  localCarousel,
  location,
  maxTempF,
  minTempF,
  precip,
  tempF,
  timeString,
  trackLocalWeatherWidget,
  totalCount,
  uri,
}) => {
  const variants = { ...animationSettings };
  const minTemp = isCelsius ? convertFahrenheitToCelsius(minTempF, PLACEHOLDER) : minTempF;
  const maxTemp = isCelsius ? convertFahrenheitToCelsius(maxTempF, PLACEHOLDER) : maxTempF;
  const hourlyItems = isValidArray(hourly) && hourly.map((item) => {
    const {
      tempF: hourlyTempF,
      localeTime: hourlyLocaleTime,
      icon: hourlyIcon,
    } = item || {};
    const hourlyTemp = isCelsius
      ? convertFahrenheitToCelsius(hourlyTempF)
      : hourlyTempF;

    if (hourlyTempF && hourlyIcon && hourlyLocaleTime) {
      return (
        <WeatherDate
          key={`weatherDate${hourlyLocaleTime}`}
          tempValue={hourlyTemp}
          icon={weatherIcons[hourlyIcon]}
          date={hourlyLocaleTime}
          isCelsius={isCelsius}
        />
      );
    }

    return null;
  });

  const tracking = useCallback(() => {
    const eventAction = 'topnav-weather-pronostico completo';
    const utagData = {
      eventAction,
    };

    NavigationTracker.track(NavigationTracker.events.click, utagData);
    if (isValidFunction(trackLocalWeatherWidget)) trackLocalWeatherWidget('localwidget-weather-pronostico completo');
  }, [trackLocalWeatherWidget]);

  return (
    <AnimatePresence>
      {isVisible && (
        <ModalWrapper>
          <Modal
            key="animatedWeatherConditionIcon"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            localCarousel={localCarousel}
          >
            <ArrowUp />
            <ElTiempoHeader />
            <WeatherBanner
              analyticsType={MODAL}
              extremeAlert={extremeAlert}
              flavor={BANNER_FLAVOR_MODAL}
              totalCount={totalCount}
              uri={`${uri}/alertas`}
            />
            <DataContainer>
              <RowCol isCol>
                <TempSwitch />
                <RowCol>
                  <WeatherIcon name={icon} size={80} />
                  <RowCol isCol>
                    <Temp
                      value={tempF}
                      color="black"
                      size={32}
                      isCelsius={isCelsius}
                    />
                    <RowCol mt={3}>
                      <MinMax value={maxTemp} isMax />
                      <MinMax value={minTemp} hasMargin />
                    </RowCol>
                    <Location location={location} timeString={timeString} />
                    {precip && <Precip>{precip}</Precip>}
                  </RowCol>
                </RowCol>
                <Separator />
                {hourlyItems && <RowCol justify>{hourlyItems}</RowCol>}
                <SeeForecast
                  href={`${uri}/tiempo`}
                  onClick={tracking}
                >
                  {localization.get('seeCompleteForecast')}
                </SeeForecast>
              </RowCol>
            </DataContainer>
          </Modal>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

WeatherModal.propTypes = {
  extremeAlert: PropTypes.object,
  hourly: PropTypes.arrayOf(
    PropTypes.shape({
      localeTime: PropTypes.string.isRequired,
      tempF: PropTypes.number,
      icon: PropTypes.number,
    })
  ),
  icon: PropTypes.string,
  isCelsius: PropTypes.bool,
  isVisible: PropTypes.bool,
  localCarousel: PropTypes.bool,
  location: PropTypes.string,
  maxTempF: PropTypes.number,
  minTempF: PropTypes.number,
  precip: PropTypes.string,
  tempF: PropTypes.number,
  timeString: PropTypes.string,
  totalCount: PropTypes.number,
  trackLocalWeatherWidget: PropTypes.func,
  uri: PropTypes.string,
};

export default WeatherModal;
