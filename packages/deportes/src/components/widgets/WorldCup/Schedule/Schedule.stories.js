import React from 'react';
import { storiesOf } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';

import scoreCellsExtractor from '@univision/shared-components/dist/extractors/scoreCellsExtractor';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import Schedule from '.';
import data from './__mocks__/schedule.json';

const device = getDevice();
const Store = configureStore();

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

storiesOf('Widgets/WorldCup/Schedule', module)
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
    const matches = scoreCellsExtractor(data);
    Store.dispatch(setPageData({ device }));
    return <Schedule matches={matches} />;
  })
  .add('MX version', () => {
    const matches = scoreCellsExtractor(data, false, true);
    Store.dispatch(setPageData({ device }));
    return <Schedule matches={matches} userLocation="MX" />;
  });
