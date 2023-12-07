/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import Store from '@univision/fe-commons/dist/store/store';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setWeatherForecastByLocal } from '@univision/fe-commons/dist/store/actions/local/local-actions';

import ExposedNav from '.';
import Styles from './ExposedNav.stories.styles';

import WeatherConditionIcon from '../../widgets/Weather/WeatherConditionIcon';

import data from './__mocks__/exposedNav';
import themes from './__mocks__/exposedNavThemes';
import localesData from './__mocks__/exposedNavLocal.json';

const Wrapper = styled.div`${Styles.wrapper}`;

const storyData = cloneDeep(data);

Store.dispatch(setWeatherForecastByLocal('WLTV',
  {
    tempF: 98,
    icon: 32,
  }));

storyData.local.componentRight = () => {
  Store.dispatch(setPageData({ data: localesData.data }));

  return <WeatherConditionIcon />;
};

/**
 * ThemeProvider wrapper
 * @param {Object} props of the nav component
 * @param {Object} theme of the nav component
 * @returns {JSX}
 */
const WithTheme = ({ props, theme }) => (
  <Wrapper>
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <ExposedNav {...props} />
      </ThemeProvider>
    </Provider>
    <React.Fragment>
    </React.Fragment>
  </Wrapper>
);

const story = storiesOf('Navigation/ExposedNav', module);

story.add('default', () => (<Wrapper><ExposedNav {...storyData.inmigracion} /></Wrapper>));

Object.keys(storyData).forEach((navKey) => {
  story.add(navKey, () => {
    const theme = themes[navKey] || themes.noticias;
    return <WithTheme props={storyData[navKey]} theme={theme} />;
  });
});
