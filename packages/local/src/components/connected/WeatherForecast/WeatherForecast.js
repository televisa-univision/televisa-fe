import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import ForecastRow from '@univision/shared-components/dist/components/weather/ForecastRow';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { useBreakPoint } from '@univision/fe-commons/dist/utils/hooks';

import localization from '../../../utils/localization';
import { convertFahrenheitToCelsius } from '../../../utils/helpers';
import TemperatureSwitch from '../TemperatureSwitch';
import HourlyTimeline from './HourlyTimeline';
import Styles from './WeatherForecast.styles';
import slider from './ForecastSlider';
import getSliderSettings from './getSliderSettings';

const Day = styled.div.attrs(({ isSelected }) => ({
  className: isSelected ? 'uvs-font-a-bold' : 'uvs-font-a-regular',
}))`${Styles.day}`;
const DailyWrapper = styled.div`${Styles.dailyWrapper}`;
const DateInfo = styled.p`${Styles.dateInfo}`;
const DayRow = styled(ForecastRow)`${Styles.dayRow}`;
const DaySelector = styled.div`${Styles.daySelector}`;
const DaySeparator = styled.div`${Styles.daySeparator}`;
const InfoWrapper = styled.div`${Styles.infoWrapper}`;
const TempSwitch = styled(TemperatureSwitch)`${Styles.tempSwitch}`;
const WeatherTopicBar = styled(TopicBar)`${Styles.weatherTopicBar}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * WeatherForecast component
 * @param {Object} props - component props
 * @param {Array} props.daily - daily forecast data
 * @param {string} props.device - user device
 * @param {Array} props.hourly - hourly forecast data
 * @param {boolean} props.isCelsius - if true, set celsius as unit
 * @param {Object} props.settings - widget settings
 * @param {Object} props.theme - widget theming
 * @param {string} props.todaysDate - today's date
 * @returns {JSX}
 */
const WeatherForecast = ({
  daily,
  device,
  hourly,
  isCelsius,
  settings,
  theme,
  todaysDate,
}) => {
  const [tenDays, setTenDays] = useState(false);
  const breakPoint = useBreakPoint();
  const SliderComponent = useMemo(() => slider(device), [device]);
  const isMobile = device === 'mobile';
  const {
    width, height, dotSize, paddingGraphic, pagePosition,
  } = getSliderSettings(isMobile ? 'mobile' : breakPoint);

  const hourlyComponent = useMemo(() => isValidArray(hourly) && (
    <HourlyTimeline
      hourly={hourly}
      isCelsius={isCelsius}
      device={device}
      width={width}
      height={height}
      dotSize={dotSize}
      paddingGraphic={paddingGraphic}
    />
  ), [hourly, isCelsius, device, width, height, dotSize, paddingGraphic]);

  const dailyItems = useMemo(() => isValidArray(daily) && daily.map((item) => {
    const {
      maxTempF: maxTemp,
      minTempF: minTemp,
      date,
      isWeekend,
      ...otherProps
    } = item || {};

    return (
      <DayRow
        key={`dailyItem${date}`}
        date={date}
        minTemp={isCelsius
          ? convertFahrenheitToCelsius(minTemp)
          : minTemp
        }
        maxTemp={isCelsius
          ? convertFahrenheitToCelsius(maxTemp)
          : maxTemp
        }
        {...otherProps}
        isWeekend={isWeekend}
      />
    );
  }), [daily, isCelsius]);

  const dailyItemsFiltered = useMemo(() => (tenDays
    ? dailyItems
    : isValidArray(dailyItems) && dailyItems.slice(0, 5)
  ), [dailyItems, tenDays]);

  return (
    <Wrapper className="row">
      <div className="col-12">
        <WeatherTopicBar
          separator="top"
          settings={{ title: getKey(settings, 'title') }}
          theme={theme}
          titleTagElement="h2"
        />
        <InfoWrapper>
          <DateInfo isBold>{localization.get('today')}</DateInfo>
          <DateInfo>{todaysDate}</DateInfo>
          <TempSwitch />
        </InfoWrapper>
        <SliderComponent pagePosition={pagePosition}>
          {hourlyComponent}
        </SliderComponent>
        <DailyWrapper>
          {dailyItemsFiltered}
        </DailyWrapper>
        <DaySelector>
          <Day isSelected={!tenDays} onClick={() => setTenDays(false)}>
            5 {localization.get('days')}
          </Day>
          <DaySeparator />
          <Day isSelected={tenDays} onClick={() => setTenDays(true)}>
            10 {localization.get('days')}
          </Day>
        </DaySelector>
      </div>
    </Wrapper>
  );
};

WeatherForecast.propTypes = {
  daily: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      day: PropTypes.shape({
        abbreviatedDay: PropTypes.string,
        name: PropTypes.string,
      }),
      icon: PropTypes.string,
      maxTempF: PropTypes.number,
      minTempF: PropTypes.number,
      phrase: PropTypes.string,
      precipChance: PropTypes.string,
      precipIcon: PropTypes.string,
      precipMessage: PropTypes.string,
      isWeekend: PropTypes.boolean,
    })
  ),
  device: PropTypes.string,
  hourly: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.number,
      localeTime: PropTypes.string,
      tempF: PropTypes.number,
    })
  ),
  isCelsius: PropTypes.bool,
  settings: PropTypes.object,
  theme: PropTypes.object,
  todaysDate: PropTypes.string,
};

export default WeatherForecast;
