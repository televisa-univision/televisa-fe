import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setWeatherForecastByLocal } from '@univision/fe-commons/dist/store/actions/local/local-actions';

import ShortTitle from '.';
import Styles from './ShortTitle.stories.styles';

import WeatherConditionIcon from '../../widgets/Weather/WeatherConditionIcon';

import mockData from './__mocks__/shortTitle.json';
import localesData from './__mocks__/shortTitleLocal.json';
import themes from './__mocks__/shortTitleThemes.json';

Store.dispatch(setWeatherForecastByLocal('KMEX',
  {
    tempF: 98,
    icon: 32,
  }));

const Wrapper = styled.div`${Styles.wrapper}`;

mockData.local.componentRight = () => {
  Store.dispatch(setPageData({ data: localesData.data }));

  return <WeatherConditionIcon />;
};

/**
 * Render ShortTitle component
 * @param {Object} extraProps additional props for the component
 * @param {Object} theme of the component
 * @returns {JSX}
 */
const renderShortTitle = (extraProps, theme = {}) => {
  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <ShortTitle {...extraProps} />
        </Wrapper>
      </ThemeProvider>
    </Provider>
  );
};

storiesOf('Navigation/ShortTitle', module)
  .add('El gordo y la flaca', () => (renderShortTitle(mockData.gordoflaca, themes.gordoflaca)))
  .add('Al Punto', () => (renderShortTitle(mockData.alpunto, themes.alpunto)))
  .add('La Reina Soy Yo', () => (renderShortTitle(mockData.lareinasoyyo, themes.lareinasoyyo)))
  .add('Local - Los Angeles', () => (renderShortTitle(mockData.local, themes.local)));
