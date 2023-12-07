import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '@univision/fe-components-base/dist/components/Link';
import Sponsored from '@univision/fe-components-base/dist/components/Sponsored';
import { isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import { BANNER_FLAVOR_OPENING_CARD, PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';
import weatherIcons from '@univision/fe-icons/dist/components/Icon/mapping/weather';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import ElTiempoHeader from '../../compound/Header/ElTiempo';

import {
  convertFahrenheitToCelsius,
  hourlyForecastExtractor,
} from '../../../utils/helpers';
import localization from '../../../utils/localization';
import WeatherCardVideo from '../../compound/WeatherCardContent/WeatherCardVideo';
import WeatherCardSlideshow from '../../compound/WeatherCardContent/WeatherCardSlideshow';

import Styles from './WeatherCard.styles';
import Style from './WeatherCard.scss';
import WeatherBanner from '../../compound/WeatherBanner';

const WIDGET = 'widget';

const ArrowRight = styled(Icon).attrs({
  name: 'arrowRight',
  fill: WHITE,
  size: 24,
})`${Styles.arrowRight}`;
const Conditions = styled.div`${Styles.conditions}`;
const ConditionsValue = styled.div.attrs({
  className: 'uvs-font-c-bold',
})`${Styles.conditionsValue}`;
const ConditionsWrapper = styled.div.attrs({
  className: 'uvs-font-c-regular',
})`${Styles.conditionsWrapper}`;
const Content = styled.div`${Styles.content}`;
const ContentMask = styled.div`${Styles.contentMask}`;
const ContentNavigation = styled.div`${Styles.contentNavigation}`;
const ContentOption = styled.div.attrs({
  className: 'uvs-font-c-bold',
})`${Styles.contentOption}`;
const CurrentTemperature = styled.div.attrs({
  className: 'uvs-font-b-bold',
})`${Styles.currentTemperature}`;
const CurrentWeatherIcon = styled(Icon)`${Styles.currentWeatherIcon}`;
const CurrentWeatherWrapper = styled.div`${Styles.currentWeatherWrapper}`;
const MarketAndDate = styled.div`${Styles.marketAndDate}`;
const MarketDate = styled.div.attrs({
  className: 'uvs-font-c-regular',
})`${Styles.marketDate}`;
const MarketName = styled.div.attrs({
  className: 'uvs-font-c-bold',
})`${Styles.marketName}`;
const MaxMinIcon = styled(Icon)`${Styles.maxMinIcon}`;
const MaxMinTemp = styled.div`${Styles.maxMinTemp}`;
const MaxMinWrapper = styled.div.attrs({
  className: 'uvs-font-c-regular',
})`${Styles.maxMinWrapper}`;
const NextHourIcon = styled(Icon)`${Styles.nextHourIcon}`;
const NextHourInfo = styled.div.attrs({
  className: 'uvs-font-c-regular',
})`${Styles.nextHourInfo}`;
const NextHourTemp = styled.div.attrs({
  className: 'uvs-font-b-bold',
})`${Styles.nextHourTemp}`;
const NextHourWrapper = styled.div`${Styles.nextHourWrapper}`;
const SeeForecast = styled(Link).attrs({
  className: 'uvs-font-c-regular',
})`${Styles.seeForecast}`;
const SponsoredAd = styled(Sponsored).attrs({
  className: 'uvs-font-c-bold',
})`${Styles.sponsoredAd}`;
const Temperature = styled.div`${Styles.temperature}`;
const TemperaturePhrase = styled.div.attrs({
  className: 'uvs-font-c-bold',
})`${Styles.temperaturePhrase}`;
const TemperatureWrapper = styled.div`${Styles.temperatureWrapper}`;
const Weather = styled.div`${Styles.weather}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * WeatherCard component
 * @param {Object} props - component props
 * @param {string} props.className - modifier class
 * @param {string} props.currentTime - market time
 * @param {Object} props.forecasts - weather forecast data
 * @param {number} props.humidity - humidity value
 * @param {string} props.icon - current weather icon
 * @param {boolean} props.isCelsius - if true, it will display values in celsius
 * @param {string} props.marketName - market name
 * @param {number} props.maxTempF - today's max temp
 * @param {number} props.minTempF - today's min temp
 * @param {string} props.phrase - current weather conditions
 * @param {string} props.precipChance - chance of precipitation
 * @param {string} props.precipMessage - precipitation message
 * @param {Object} props.slideshow - slideshow data
 * @param {number} props.tempF - current temperature
 * @param {string} props.timeZone - market's time zone
 * @param {string} props.uri - market uri
 * @param {Object} props.video - video settings
 * @param {Object} props.weatherAlerts - Weather Alert Store
 * @param {Object} props.widgetContext - widget context settings
 * @param {string} props.wind - wind data
 * @returns {JSX}
 */
const WeatherCard = ({
  className,
  currentTime,
  forecasts,
  humidity,
  icon,
  isCelsius,
  marketName,
  maxTempF,
  minTempF,
  phrase,
  precipChance,
  precipMessage,
  slideshow,
  tempF,
  timeZone,
  uri,
  video,
  weatherAlerts,
  widgetContext,
  wind,
}) => {
  const seeCompleteForecast = localization.get('seeCompleteForecast');
  const trackSeeCompleteForecast = useCallback(() => {
    CardTracker.onClickHandler(
      { title: seeCompleteForecast },
      {
        ...widgetContext,
        metaData: {
          ...widgetContext?.metaData,
          cardName: 'LocalWeatherForecast - portrait XL',
          cardType: 'forecast',
        },
      },
      'content'
    )();
  }, [seeCompleteForecast, widgetContext]);
  const hasVideo = isValidObject(video);
  const hasSlideshow = isValidObject(slideshow);
  const [showVideo, setShowVideo] = useState(hasVideo);
  const [showSlide, setShowSlide] = useState(!hasVideo && hasSlideshow);
  const temp = isCelsius ? convertFahrenheitToCelsius(tempF) : tempF;
  const maxTemp = isCelsius ? convertFahrenheitToCelsius(maxTempF, PLACEHOLDER) : maxTempF;
  const minTemp = isCelsius ? convertFahrenheitToCelsius(minTempF, PLACEHOLDER) : minTempF;
  const hourlyComponents = useMemo(() => {
    return forecasts && hourlyForecastExtractor(forecasts, 10, timeZone)
      .filter((_, idx) => idx % 3 === 0 && idx !== 0)
      .map(({ icon: hourIcon, tempF: tempHour, localeTime }) => (
        <NextHourInfo key={`hourlyIcon${localeTime}`}>
          <NextHourTemp>
            <NextHourIcon name={weatherIcons[hourIcon]} />
            {isCelsius ? convertFahrenheitToCelsius(tempHour, PLACEHOLDER) : tempHour}º
          </NextHourTemp>
          {localeTime}
        </NextHourInfo>
      ));
  }, [forecasts, timeZone, isCelsius]);

  const graphicsTabName = localization.get('graphics');
  const trackGraphicsTab = useCallback(() => {
    setShowVideo(false);
    setShowSlide(true);
    const eventData = {
      eventAction: 'engagement_local_weatherforecast_tab_graficos',
    };
    NavigationTracker.track(NavigationTracker.events.click, eventData);
  }, []);

  const videoTabName = hasSlideshow ? localization.get('video') : localization.get('weatherVideo');
  const trackVideoTab = useCallback(() => {
    setShowVideo(true);
    setShowSlide(false);
    const eventData = {
      eventAction: 'engagement_local_weatherforecast_tab_video',
    };
    NavigationTracker.track(NavigationTracker.events.click, eventData);
  }, []);

  const { extremeAlert, totalCount } = weatherAlerts;
  const hasAlertBanner = totalCount > 0;

  return (
    <ErrorBoundary>
      <Wrapper className={className}>
        <ElTiempoHeader
          className={Style.elTiempoHeader}
          rightComponent={(
            <MarketAndDate>
              <MarketName>{marketName}</MarketName>
              <MarketDate>{currentTime}</MarketDate>
            </MarketAndDate>
        )}
        />
        {hasAlertBanner && (
          <WeatherBanner
            analyticsType={WIDGET}
            cardId={widgetContext && widgetContext.id}
            extremeAlert={extremeAlert}
            flavor={BANNER_FLAVOR_OPENING_CARD}
            totalCount={totalCount}
            uri={`${uri}/alertas`}
            widgetPos={widgetContext && widgetContext.position}
          />
        )}
        <Weather>
          <CurrentWeatherWrapper>
            <TemperatureWrapper>
              <Temperature>
                <CurrentWeatherIcon name={icon} />
                <CurrentTemperature>
                  {temp}º{isCelsius ? 'C' : 'F'}
                </CurrentTemperature>
                <MaxMinTemp>
                  <MaxMinWrapper hasMargin>
                    <MaxMinIcon name="maxTemp" size={11} />
                    {maxTemp}º
                  </MaxMinWrapper>
                  <MaxMinWrapper>
                    <MaxMinIcon name="minTemp" size={11} />
                    {minTemp}º
                  </MaxMinWrapper>
                </MaxMinTemp>
              </Temperature>
              <TemperaturePhrase>{phrase}</TemperaturePhrase>
            </TemperatureWrapper>
            <Conditions>
              <ConditionsWrapper
                label={precipMessage.abbreviated}
                largeLabel={precipMessage.message}
              >
                <ConditionsValue>{precipChance}%</ConditionsValue>
              </ConditionsWrapper>
              <ConditionsWrapper label={localization.get('humidity')}>
                <ConditionsValue>{humidity}%</ConditionsValue>
              </ConditionsWrapper>
              <ConditionsWrapper label={localization.get('wind')}>
                <ConditionsValue>{wind}</ConditionsValue>
              </ConditionsWrapper>
            </Conditions>
          </CurrentWeatherWrapper>
          <NextHourWrapper>
            {hourlyComponents}
          </NextHourWrapper>
        </Weather>
        <Content>
          <ContentMask>
            <SponsoredAd
              message={`${localization.get('todaysForecastSponsored')}:`}
              hasAlertBanner={hasAlertBanner}
            />
            <ContentNavigation>
              {hasVideo && (
                <ContentOption
                  hasSlideshow={hasSlideshow}
                  isActive={showVideo}
                  {...(hasSlideshow && { onClick: trackVideoTab })}
                >
                  {videoTabName}
                </ContentOption>
              )}
              {hasSlideshow && (
                <ContentOption
                  hasSlideshow={hasSlideshow}
                  isActive={!showVideo}
                  onClick={trackGraphicsTab}
                >
                  {graphicsTabName}
                </ContentOption>
              )}
            </ContentNavigation>
            {showSlide && <WeatherCardSlideshow {...slideshow} widgetContext={widgetContext} /> }
            {showVideo && <WeatherCardVideo {...video} />}
            <SeeForecast
              href={`${uri}/tiempo`}
              onClick={trackSeeCompleteForecast}
            >
              {seeCompleteForecast}
              <ArrowRight />
            </SeeForecast>
          </ContentMask>
        </Content>
      </Wrapper>
    </ErrorBoundary>
  );
};

WeatherCard.propTypes = {
  className: PropTypes.string,
  currentTime: PropTypes.string,
  forecasts: PropTypes.object,
  humidity: PropTypes.number,
  icon: PropTypes.string,
  isCelsius: PropTypes.bool,
  marketName: PropTypes.string,
  maxTempF: PropTypes.number,
  minTempF: PropTypes.number,
  phrase: PropTypes.string,
  precipChance: PropTypes.number,
  precipMessage: PropTypes.object,
  slideshow: PropTypes.object,
  tempF: PropTypes.number,
  timeZone: PropTypes.string,
  uri: PropTypes.string,
  video: PropTypes.object,
  weatherAlerts: PropTypes.object,
  widgetContext: PropTypes.object,
  wind: PropTypes.string,
};

WeatherCard.defaultProps = {
  maxTempF: PLACEHOLDER,
  minTempF: PLACEHOLDER,
};

export default WeatherCard;
