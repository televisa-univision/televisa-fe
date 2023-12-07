import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import * as pageCategories from '../../constants/pageCategories';
import ThemeProviderStory from './ThemeProviderStory';
import Styles from './ThemeProviderStory.styles';

const StoryWrapper = styled.div`${Styles.storyWrapper}`;
const TextDemo = styled.p`${Styles.textDemo}`;

storiesOf('ThemeProvider', module)
  .add('default', () => (
    <StoryWrapper>
      <ThemeProviderStory pageCategory={pageCategories.UNIVISION}>
        <TextDemo>hola</TextDemo>.
      </ThemeProviderStory>
    </StoryWrapper>
  ))
  .add('noticias', () => (
    <StoryWrapper>
      <ThemeProviderStory pageCategory={pageCategories.NEWS}>
        <TextDemo>hola</TextDemo>.
      </ThemeProviderStory>
    </StoryWrapper>
  ));
