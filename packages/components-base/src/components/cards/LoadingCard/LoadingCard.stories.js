/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';
import { Provider } from 'react-redux';

import {
  LANDSCAPE,
  PORTRAIT,
  RECTANGLE,
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import Store from '@univision/fe-commons/dist/store/store';
import noticiasTheme from '@univision/fe-commons/dist/themes/noticias';

import LoadingCard from '.';

/**
 * StoryCard helper to get loading card
 * @param {string} type - size card type
 * @returns {JSX}
 */
const StoryCard = ({ type, showSpinner = true }) => (
  <Provider store={Store}>
    <LoadingCard
      cardTheme={noticiasTheme()}
      type={type}
      showSpinner={showSpinner}
    />
  </Provider>
);

storiesOf('Cards/Redesign 2019/LoadingCard', module)
  .addDecorator(withViewport('iphone8p'))
  .add('portrait', () => <StoryCard type={PORTRAIT} />)
  .add('rectangle', () => <StoryCard type={RECTANGLE} />)
  .add('square', () => <StoryCard type={SQUARE} />)
  .add('landscape', () => <StoryCard type={LANDSCAPE} />, { viewport: 'default' })
  .add('landscape no spinner', () => <StoryCard type={LANDSCAPE} showSpinner={false} />, { viewport: 'default' });
