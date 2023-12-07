import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import Styles from './Description.stories.styles';
import Description from '.';

const TextStyled = styled.div`${Styles.text}`;

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const richTextDescription = [{
  type: 'text',
  value: '<p><b>Lorem ipsum dolor</b> <a href="#">sit amet</a>, <i>consectetur adipiscing elit.</i></p>',
}];
const richTextDescriptionMultiple = [{
  type: 'text',
  value: '<p><b>Lorem ipsum dolor</b> <a href="#">sit amet</a>, <i>consectetur adipiscing elit.</i></p>',
},
{
  type: 'text',
},
{
  type: 'text',
  value: '<p><b>Consectetur adipiscing elit.</b> <a href="#">sit amet</a>, <i>Lorem ipsum dolor</i></p>',
}];

storiesOf('Text/Description', module)
  .add('with default', () => (
    <Description>
      { text }
    </Description>
  ))
  .add('with small size', () => (
    <Description size="small">
      { text }
    </Description>
  ))
  .add('with regular size', () => (
    <Description size="regular">
      { text }
    </Description>
  ))
  .add('with large size', () => (
    <Description size="large">
      { text }
    </Description>
  ))
  .add('with className', () => (
    <Description>
      <TextStyled>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TextStyled>
    </Description>
  ))
  .add('with rich text', () => (
    <Description richTextDescription={richTextDescription}>
      { text }
    </Description>
  ))
  .add('with rich text (multiple)', () => (
    <Description richTextDescription={richTextDescriptionMultiple}>
      { text }
    </Description>
  ));
