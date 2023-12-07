import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '@univision/fe-components-base/dist/components/Link';
import styled from 'styled-components';
import { DARK_BLUE, LIGHT_GREY } from '@univision/fe-commons/dist/utils/styled/constants';
import Styles from './NoAlerts.styles';
import localization from '../../../../../../utils/localization';

export const Arrow = styled(Icon).attrs({ fill: DARK_BLUE, size: 16, name: 'arrowRight' })``;
export const CheckWeather = styled(Link).attrs({ className: 'uvs-font-c-regular' })`${Styles.link}`;
export const Info = styled.div`${Styles.info}`;
export const TextWrapper = styled.div`${Styles.textWrapper}`;
export const Title = styled.span.attrs({ className: 'uvs-font-a-bold' })`${Styles.title}`;
export const WeatherIcon = styled(Icon).attrs({ name: 'infoCircle', size: 77, fill: LIGHT_GREY })`${Styles.icon}`;
export const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Empty state for WeatherAlerts
 * @param {string} uri uri for current market
 * @returns {JSX}
 */
const NoAlerts = ({ uri }) => {
  const title = localization.get('weatherAlertsEmptyStateTitle');
  const checkWeatherForecast = localization.get('weatherAlertsEmptyStateNavigateForecast');
  return (
    <Wrapper>
      <WeatherIcon size={88} />
      <TextWrapper>
        <Info>
          <Title>{title}</Title>
        </Info>
        <CheckWeather href={`${uri}/tiempo`}>
          {checkWeatherForecast}
          <Arrow />
        </CheckWeather>
      </TextWrapper>
    </Wrapper>
  );
};

NoAlerts.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default NoAlerts;
