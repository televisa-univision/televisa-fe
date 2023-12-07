import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';

import BrandedHeader from '.';
import mockData from './__mocks__/brandedHeaderData';

const Wrapper = styled.div`
  height: 500px;
  margin: -20px;
`;

storiesOf('Navigation/BrandedHeader', module)
  .add('Default', () => (
    <Wrapper>
      <ThemeProvider theme={{ isBrandedHeaderBlack: false }}>
        <BrandedHeader {...mockData.univision} />
      </ThemeProvider>
    </Wrapper>
  ))
  .add('Dark Variant', () => (
    <Wrapper>
      <ThemeProvider theme={{ isBrandedHeaderBlack: true }}>
        <BrandedHeader {...mockData.shows} />
      </ThemeProvider>
    </Wrapper>
  ));
