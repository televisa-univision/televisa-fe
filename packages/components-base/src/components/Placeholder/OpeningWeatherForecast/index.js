import React from 'react';
import styled from 'styled-components';

import FullWidth from '../../FullWidth';
import Styles from './OpeningWeatherForecast.styles';

const Container = styled.div`${Styles.container}`;
const SKWrapper = styled(FullWidth)`${Styles.skWrapper}`;
const WeatherConditionWrapper = styled.div`${Styles.weatherConditionWrapper}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Opening Weather Forecast Placholder
 * @returns {JSX}
 */
const OpeningWeatherForecastPlaceholder = () => (
  <SKWrapper>
    <Wrapper>
      <Container className="uvs-container">
        <WeatherConditionWrapper />
      </Container>
    </Wrapper>
  </SKWrapper>
);

export default OpeningWeatherForecastPlaceholder;
