import React from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport/src/preview';
import styled from 'styled-components';

import { BANNER_RISK_HIGH } from '@univision/fe-commons/dist/constants/weather';

import WeatherBanner from '.';
import props from './__mocks__/weatherBanner';

import Styles from './WeatherBanner.stories.styles';

const extremeAlert = {
  areaName: 'Staten Island, NY',
  eventDescription: 'Huracán Dorian - Categoría 4',
};

const Wrapper = styled.div`${Styles.wrapper}`;
const LandingPageContainer = styled.div`${Styles.landingPageContainer}`;
const ModalContainer = styled.div`${Styles.modalContainer}`;
const MoreData = styled.div`${Styles.moreData}`;
const OpeningWidgetContainer = styled.div`${Styles.openingWidgetContainer}`;

storiesOf('Widgets/Weather/Weather Banner', module)
  .addDecorator(withViewport('default'))
  .add('Landing Page - Low Risk', () => (
    <Wrapper>
      <LandingPageContainer>
        <WeatherBanner {...props.landingPage} />
        <MoreData>
          <p>... more data ...</p>
          <p>... more data ...</p>
          <p>... more data ...</p>
          <p>... more data ...</p>
        </MoreData>
      </LandingPageContainer>
    </Wrapper>
  ))
  .add('Modal - Low Risk', () => (
    <Wrapper>
      <ModalContainer>
        <WeatherBanner {...props.modal} />
      </ModalContainer>
    </Wrapper>
  ))
  .add('Opening Card - Low Risk', () => (
    <Wrapper>
      <OpeningWidgetContainer>
        <WeatherBanner {...props.openingCard} />
      </OpeningWidgetContainer>
    </Wrapper>
  ))
  .add('Landing Page - High Risk', () => (
    <Wrapper>
      <LandingPageContainer>
        <WeatherBanner {...props.landingPage} extremeAlert={extremeAlert} />
        <MoreData risk={BANNER_RISK_HIGH}>
          <p>... more data ...</p>
          <p>... more data ...</p>
          <p>... more data ...</p>
          <p>... more data ...</p>
        </MoreData>
      </LandingPageContainer>
    </Wrapper>
  ))
  .add('Modal - High Risk', () => (
    <Wrapper>
      <ModalContainer>
        <WeatherBanner {...props.modal} extremeAlert={extremeAlert} />
      </ModalContainer>
    </Wrapper>
  ))
  .add('Opening Card - High Risk', () => (
    <Wrapper>
      <OpeningWidgetContainer>
        <WeatherBanner {...props.openingCard} extremeAlert={extremeAlert} />
      </OpeningWidgetContainer>
    </Wrapper>
  ));
