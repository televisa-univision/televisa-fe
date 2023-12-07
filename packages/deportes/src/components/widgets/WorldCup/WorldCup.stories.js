import React from 'react';
import { storiesOf } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';

import WorldCup from '.';

const Store = configureStore();
const device = getDevice();

const RebrandStyle = createGlobalStyle`
  body {
    font-family: 'Roboto Flex', sans-serif;
    letter-spacing: 0.5%;
    line-height: 120%;
    font-size: rem(16) ;
  }

  .uvs-font-a-regular,
  .uvs-font-b-regular,
  .uvs-font-c-regular {
    font-family: 'Roboto Flex', sans-serif;
    font-weight: 400;
  }

  .uvs-font-a-bold,
  .uvs-font-b-bold,
  .uvs-font-c-bold {
    font-family: 'Roboto Flex', sans-serif;
    font-weight: 700;
  }
`;

storiesOf('Widgets/WorldCup', module)
  .addDecorator((story) => {
    return (
      <div
        style={{
          background: '#FFFFFF',
          height: '100vh',
          width: '100vw',
          position: 'absolute',
        }}
      >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto+Flex:opsz,wght@8..144,400;8..144,700&display=swap"
          rel="stylesheet"
        />
        <RebrandStyle />
        {story()}
      </div>
    );
  })
  .add('US version', () => {
    Store.dispatch(
      setPageData({ userLocation: 'US', device })
    );
    return (
      <Provider store={Store}>
        <WorldCup />
      </Provider>
    );
  })
  .add('MX version', () => {
    Store.dispatch(
      setPageData({ userLocation: 'MX', device })
    );
    return (
      <Provider store={Store}>
        <WorldCup />
      </Provider>
    );
  });
