import React from 'react';
import { storiesOf } from '@storybook/react';

import styled from 'styled-components';

import { rem, media, responsiveBackgrounds } from '.';

import { WHITE } from '../constants';

storiesOf('StyledComponents/Mixins/', module)
  .add('rem helper', () => {
    // Styled component that uses the rem helper, size comes from a prop
    const Rem = styled.p`
      font-size: ${props => rem(props.size)};
    `;

    return (
      <div>
        {['16px', '26px', '36px'].map(size => <Rem size={size}>Paragraph with {size} font-size converted to rem</Rem>)}
      </div>
    );
  })
  .add('media query helper', () => {
    const ColorQuery = styled.p`
      color: blue;

      ${media.md`
        color: red;
      `}

      ${media.lg`
        color: green;
      `}
    `;

    const Small = styled.p`
      ${media.md`
        display: none;
      `}
    `;

    const Medium = styled.p`
      display: none;

      ${media.md`
        display: block;
      `}
    `;

    const Large = styled.p`
      display: none;

      ${media.lg`
        display: block;
      `}
    `;

    const containerCss = responsiveBackgrounds({
      xxs: 'https://st1.uvnimg.com/a7/e7/1432d44b471a8be465dd3057584f/mobile414.png',
      md: 'https://st1.uvnimg.com/1b/1e/1ef0d0bf4895af3ab8b61c7095f0/tablet-1024.png',
      xl: 'https://st1.uvnimg.com/ee/c2/3ebf663840d7af515b6daa97f116/desktop1440.png',
    });

    const Container = styled.div`
      ${containerCss};
      background-size: cover;
      color: ${WHITE};
      padding: 20px;
    `;

    return (
      <div>
        <h1>Resize window to see styles</h1>
        <ColorQuery>
          This text should change color depending on the window size.
          Also the background will be updated in certain breakpoints.
        </ColorQuery>
        <Container>
          <Small>Only visible in small and below viewport</Small>
          <Medium>Only visible in medium and above viewport</Medium>
          <Large>Only visible in large and above viewport</Large>
        </Container>
      </div>
    );
  });
