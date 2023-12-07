import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { WHITE } from '../constants';

import rem from './rem';
import media from './media';
import responsiveBackgrounds from './responsiveBackgrounds';

storiesOf('mixins/rem', module)
  .add('default', () => {
    const Rem = styled.p`
      font-size: ${props => rem(props.size)};
    `;

    return (
      <div>
        {['16px', '26px', '36px'].map(size => <Rem key={size} size={size}>Paragraph with {size} font-size converted to rem</Rem>)}
      </div>
    );
  });

storiesOf('mixins/media', module)
  .add('default', () => {
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

    return (
      <div>
        <h1>Resize window to see styles</h1>
        <ColorQuery>
          This text should change color depending on the window size.
          Also the background will be updated in certain breakpoints.
        </ColorQuery>
        <div>
          <Small>Only visible in small and below viewport</Small>
          <Medium>Only visible in medium and above viewport</Medium>
          <Large>Only visible in large and above viewport</Large>
        </div>
      </div>
    );
  });

storiesOf('mixins/responsiveBackgrounds', module)
  .add('default', () => {
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
        <Container />
      </div>
    );
  });
