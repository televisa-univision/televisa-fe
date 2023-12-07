import React from 'react';

import { storiesOf } from '@storybook/react';

import widgetsDataMock from './__mocks__/widgetData.json';
import PlaylistCards from '.';

const theme = { primary: '#BC0D0D' };

storiesOf('Playlist/PlaylistCards', module)
  .add('default', () => {
    return (
      <PlaylistCards
        {...widgetsDataMock}
        activeIndex={1}
        theme={theme}
      />
    );
  })
  .add('desktop layout', () => {
    return (
      <PlaylistCards
        {...widgetsDataMock}
        activeIndex={1}
        device="desktop"
        theme={theme}
      />
    );
  })
  .add('loading default', () => {
    return (
      <PlaylistCards
        {...widgetsDataMock}
        contents={[]}
        activeIndex={1}
        theme={theme}
      />
    );
  })
  .add('loading desktop', () => {
    return (
      <PlaylistCards
        {...widgetsDataMock}
        contents={[]}
        activeIndex={1}
        device="desktop"
        theme={theme}
      />
    );
  });
