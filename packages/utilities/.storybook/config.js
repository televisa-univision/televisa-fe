import React from 'react';
import styled from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import Styles from './storybook.styles';

const req = require.context('../src', true, /\.stories\.js$/);
const Title = styled.p`${Styles.wrapper}`;

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator(story => (
  <>
    <Title>
      <span>For Utilitities documentation click </span>
      {/localhost:60+/.test(window.location.href) ?
        (<a target="_blank" href="http://localhost:6008">HERE</a>)
        :
        (<a target="_blank" href="/docs/utilities">HERE</a>)
      }
    </Title>
    {story()}
  </>
));
configure(loadStories, module);
