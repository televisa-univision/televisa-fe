import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import weatherIcons from '@univision/fe-icons/dist/components/Icon/mapping/weather';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import { BANNER_FLAVOR_LANDING_PAGE } from '@univision/fe-commons/dist/constants/weather';
import SponsoredAd from '@univision/fe-components-base/dist/components/Sponsored';

import {
  convertFahrenheitToCelsius,
  precipMessage,
} from '../../../utils/helpers';
import { TIEMPO } from '../../compound/WeatherBanner/utils';
import localization from '../../../utils/localization';
import ElTiempoHeader from '../../compound/Header/ElTiempo';
import WeatherBanner from '../../compound/WeatherBanner';
import ConditionMessage from './ConditionMessage';
import MinMax from './MinMax';
import Styles from './OpeningWeatherForecast.styles';

const Container = styled.div`${Styles.container}`;
const Location = styled.div.attrs({ className: 'uvs-font-c-bold' })`${Styles.location}`;
const LocationDate = styled.div.attrs({ className: 'uvs-font-c-regular' })`${Styles.locationDate}`;
const LocationAndTime = styled.div`${Styles.locationAndTime}`;
const MainWrapper = styled(FullWidth)`${Styles.mainWrapper}`;
const MinMaxTempWrapper = styled.div`${Styles.minMaxTempWrapper}`;
const PhraseText = styled.div.attrs({ className: 'uvs-font-c-regular' })`${Styles.phraseText}`;
const PhraseTextWrapper = styled.div`${Styles.phraseTextWrapper}`;
const Sponsor = styled(SponsoredAd).attrs({ className: 'uvs-font-c-bold' })`${Styles.sponsor}`;
const Temp = styled.div.attrs({ className: 'uvs-font-a-black' })`${Styles.temp}`;
const TemperatureDetails = styled.div`${Styles.temperatureDetails}`;
const WeatherConditions = styled.div`${Styles.weatherConditions}`;
const WeatherConditionWrapper = styled.div`${Styles.weatherConditionWrapper}`;
const WeatherIcon = styled(Icon)`${Styles.weatherIcon}`;
const WeatherInfoGrid = styled.div`${Styles.weatherInfoGrid}`;
const WeatherInfoWrapper = styled.div`${Styles.weatherInfoWrapper}`;
const Wrapper = styled.div`${Styles.wrapper}`;

const FALLBACK_VALUE = '--';

/**
 * Opening Widget Component
 *
 * @param {number} humidity - humidity value
 * @param {number} icon - weather condition icon
 * @param {boolean} isCelsius - true for celsius
 * @param {string} location - location name
 * @param {number} maxTempF - max temperature
 * @param {number} minTempF - min temperature
 * @param {string} phrase - condition phrase
 * @param {number} precipChance - precipitation chance
 * @param {string} precipType - precipitation type
 * @param {number} tempF - current temperature
 * @param {string} timeString - market time
 * @param {string} uri - market uri
 * @param {Object} weatherAlerts - weather alerts
 * @param {Object} widgetContext - widget context
 * @param {string} windDirection - wind direction
 * @param {string} windSpeedMph - wind speed
 * @returns {JSX}
 */
const OpeningWidgetComponent = ({
  humidity,
  icon,
  isCelsius,
  location,
  maxTempF,
  minTempF,
  phrase,
  precipChance,
  precipType,
  tempF,
  timeString,
  uri,
  weatherAlerts,
  widgetContext,
  windDirection,
  windSpeedMph,
}) => {
  const minTemp = isCelsius ? convertFahrenheitToCelsius(minTempF) : minTempF;
  const maxTemp = isCelsius ? convertFahrenheitToCelsius(maxTempF) : maxTempF;
  const temp = isCelsius ? convertFahrenheitToCelsius(tempF) : tempF;
  const { extremeAlert, totalCount } = weatherAlerts;
  const hasAlertBanner = totalCount > 0;

  return (
    <MainWrapper hasAlertBanner={hasAlertBanner}>
      <Wrapper>
        <Container className="uvs-container">
          <ElTiempoHeader
            rightComponent={<Sponsor isOpeningWeatherForecast />}
            isOpeningWeatherForecast
          />
          <WeatherConditionWrapper>
            {hasAlertBanner && (
              <WeatherBanner
                analyticsType={TIEMPO}
                flavor={BANNER_FLAVOR_LANDING_PAGE}
                totalCount={totalCount}
                extremeAlert={extremeAlert}
                uri={`${uri}/alertas`}
                widgetPos={widgetContext && widgetContext.position}
              />
            )}
            <WeatherInfoWrapper>
              <WeatherInfoGrid>
                <TemperatureDetails>
                  <WeatherIcon name={weatherIcons[icon]} size={56} />
                  <Temp>{`${temp}º${isCelsius ? 'C' : 'F'}`}</Temp>
                  <MinMaxTempWrapper>
                    <MinMax value={maxTemp} isMax isLight />
                    <MinMax value={minTemp} hasMargin isLight />
                  </MinMaxTempWrapper>
                </TemperatureDetails>
                {location && timeString && (
                  <LocationAndTime>
                    <Location>{location}</Location>
                    <LocationDate>{timeString}</LocationDate>
                  </LocationAndTime>
                )}
                {phrase && (
                  <PhraseTextWrapper>
                    <PhraseText>{phrase}</PhraseText>
                  </PhraseTextWrapper>
                )}
                <WeatherConditions>
                  <ConditionMessage
                    message={`${precipMessage(precipType, true)}: `}
                    value={`${precipChance}%`}
                  />
                  <ConditionMessage
                    message={`${localization.get('humidity')}: `}
                    value={`${humidity}%`}
                  />
                  {windDirection && (
                    <ConditionMessage
                      message={`${localization.get('wind')}: `}
                      value={`${windDirection} ${windSpeedMph}mph`}
                    />
                  )}
                </WeatherConditions>
              </WeatherInfoGrid>
            </WeatherInfoWrapper>
          </WeatherConditionWrapper>
        </Container>
      </Wrapper>
    </MainWrapper>
  );
};

OpeningWidgetComponent.propTypes = {
  humidity: PropTypes.number,
  icon: PropTypes.number,
  isCelsius: PropTypes.bool,
  location: PropTypes.string,
  maxTempF: PropTypes.number,
  minTempF: PropTypes.number,
  phrase: PropTypes.string,
  precipChance: PropTypes.number,
  precipType: PropTypes.string,
  tempF: PropTypes.number,
  timeString: PropTypes.string,
  uri: PropTypes.string,
  weatherAlerts: PropTypes.object,
  widgetContext: PropTypes.object,
  windDirection: PropTypes.string,
  windSpeedMph: PropTypes.number,
};

OpeningWidgetComponent.defaultProps = {
  humidity: FALLBACK_VALUE,
  maxTempF: FALLBACK_VALUE,
  minTempF: FALLBACK_VALUE,
  precipChance: FALLBACK_VALUE,
  tempF: FALLBACK_VALUE,
  weatherAlerts: {},
  windSpeedMph: 0,
};

export default OpeningWidgetComponent;
