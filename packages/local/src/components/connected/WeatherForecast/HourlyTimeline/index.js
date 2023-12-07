import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getKey, isValidNumber, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import WeatherGraphics from '@univision/shared-components/dist/components/weather/WeatherGraphics';
import WeatherDate from '@univision/shared-components/dist/components/weather/WeatherDate';
import weatherIcons from '@univision/fe-icons/dist/components/Icon/mapping/weather';
import Temp from '@univision/shared-components/dist/components/weather/Temp';
import { TUNDORA } from '@univision/fe-commons/dist/utils/styled/constants';

import { convertFahrenheitToCelsius } from '../../../../utils/helpers';
import Styles from './HourlyTimeline.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const HourlyItem = styled(WeatherDate)`${Styles.hourlyItem}`;
const HourlyGraphic = styled(WeatherGraphics)`${Styles.hourlyGraphic}`;
const TempItem = styled(Temp)`${Styles.tempItem}`;

/**
 * HourlyTimeline component
 * @param {Object} props - component props
 * @param {number} props.dotSize - graphics dot size
 * @param {number} props.height - graphics height
 * @param {Array} props.hourly - hourly forecast data
 * @param {boolean} props.isCelsius - if true, use celsius as a scale unit
 * @param {number} props.paddingGraphic - amount of padding for graphics
 * @param {number} props.width - graphics width
 * @returns {JSX}
 */
const HourlyTimeline = ({
  dotSize,
  height,
  hourly,
  isCelsius,
  paddingGraphic,
  width,
}) => {
  const hourlyFiltered = useMemo(() => isValidArray(hourly) && hourly
    .filter(item => (isValidNumber(getKey(item, 'tempF')) ? item : null)), [hourly]);

  const values = useMemo(() => {
    if (isValidArray(hourlyFiltered)) {
      return hourlyFiltered.reduce((result, val) => [...result, getKey(val, 'tempF')], []);
    }

    return [];
  }, [hourlyFiltered]);

  const dotSizeOffset = dotSize / 2;
  const maxNumber = Math.max(...values);
  const minNumber = Math.min(...values);
  const numHeight = maxNumber - minNumber;
  const heightWithoutMask = height - dotSize;
  const padding = paddingGraphic - dotSizeOffset;
  const formatedWidth = width - (padding * 2) - dotSize;
  const desktopOffset = padding > 27 ? 16 : 0;

  const hourlyItems = useMemo(() => isValidArray(hourlyFiltered)
    && hourlyFiltered.map((item, index) => {
      const {
        localeTime: hourlyLocaleTime,
        icon: hourlyIcon,
      } = item;

      return (
        <HourlyItem
          key={`hourlyItem${hourlyLocaleTime}`}
          icon={weatherIcons[hourlyIcon]}
          date={hourlyLocaleTime}
          isCelsius={isCelsius}
          xPos={(index * ((width - (paddingGraphic * 2)) / (values.length - 1))) + desktopOffset}
          hideTemp
        />
      );
    }), [hourlyFiltered, desktopOffset, isCelsius, paddingGraphic, values.length, width]);

  const hourlyTempItems = useMemo(() => isValidArray(hourlyFiltered)
    && hourlyFiltered.map((item, index) => {
      const {
        tempF: hourlyTempF,
        localeTime: hourlyLocaleTime,
      } = item;

      const hourlyTemp = isCelsius
        ? convertFahrenheitToCelsius(hourlyTempF)
        : hourlyTempF;

      return (
        <TempItem
          key={`tempItem${hourlyLocaleTime}`}
          value={hourlyTemp}
          isCelsius={isCelsius}
          xPos={(index * (formatedWidth / (values.length - 1))) + desktopOffset}
          yPos={(height - dotSizeOffset)
            - (((hourlyTempF - minNumber) / numHeight) * heightWithoutMask)}
          color={TUNDORA}
          size={16}
        />
      );
    }), [
    desktopOffset,
    dotSizeOffset,
    formatedWidth,
    height,
    heightWithoutMask,
    hourlyFiltered,
    isCelsius,
    minNumber,
    numHeight,
    values.length,
  ]);

  const hourlyGraphic = useMemo(() => (
    <HourlyGraphic
      width={width}
      height={height}
      values={values}
      dotSize={dotSize}
      padding={padding}
    />
  ), [width, height, values, dotSize, padding]);

  return (
    <Wrapper width={width}>
      {hourlyTempItems}
      {hourlyItems}
      {hourlyGraphic}
    </Wrapper>
  );
};

HourlyTimeline.propTypes = {
  dotSize: PropTypes.number,
  height: PropTypes.number,
  hourly: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.number,
    localeTime: PropTypes.string,
    tempF: PropTypes.number,
  })),
  isCelsius: PropTypes.bool,
  paddingGraphic: PropTypes.number,
  width: PropTypes.number,
};

export default HourlyTimeline;
