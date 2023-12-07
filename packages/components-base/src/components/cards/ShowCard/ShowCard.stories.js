import React from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';
import { withBackgrounds } from '@storybook/addon-backgrounds';

import {
  HALF_PORTRAIT,
  LANDSCAPE,
  PORTRAIT,
  RECTANGLE,
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

import {
  setDimsConfig,
  withTracker,
} from '../storybookHelpers.stories';
import data from './__mocks__/showCard.json';
import Styles from './ShowCard.stories.scss';
import ShowCard from '.';

setDimsConfig();
const cardName = 'ShowCard';
const backgrounds = [{
  name: 'dark', value: BLACK,
}];

storiesOf('Cards/Redesign 2019/ShowCard', module)
  .addDecorator(withBackgrounds([]))
  .addDecorator(withViewport('iphone8p'))
  .add('portrait', () => {
    return withTracker(ShowCard, data, cardName, PORTRAIT);
  })
  .add('portrait - dark mode', () => {
    return withTracker(ShowCard, { ...data, isDark: false }, cardName, PORTRAIT);
  }, { backgrounds })
  .add('half portrait', () => {
    return (
      <div className={Styles.halfWrapper}>
        <ShowCard {...data} type={HALF_PORTRAIT} />
        <ShowCard {...data} type={HALF_PORTRAIT} />
      </div>
    );
  })
  .add('half portrait - dark mode', () => {
    return (
      <div className={Styles.halfWrapper}>
        <ShowCard {...data} isDark type={HALF_PORTRAIT} />
        <ShowCard {...data} isDark type={HALF_PORTRAIT} />
      </div>
    );
  }, { backgrounds })
  .add('square', () => {
    return withTracker(ShowCard, data, cardName, SQUARE);
  })
  .add('square - without background image', () => {
    return withTracker(ShowCard, { ...data, showCardArtwork: null }, cardName, SQUARE);
  })
  .add('square - dark mode', () => {
    return withTracker(ShowCard, { ...data, isDark: true }, cardName, SQUARE);
  }, { backgrounds })
  .add('rectangle', () => {
    return withTracker(ShowCard, data, cardName, RECTANGLE);
  })
  .add('rectangle - dark mode', () => {
    return withTracker(ShowCard, { ...data, isDark: true }, cardName, RECTANGLE);
  }, { backgrounds })
  .add(
    'landscape',
    () => {
      return (
        <div className={Styles.widget}>
          { withTracker(ShowCard, data, cardName, LANDSCAPE) }
        </div>
      );
    },
    { viewport: 'Default' }
  )
  .add(
    'landscape - dark mode',
    () => {
      return (
        <div className={Styles.widget}>
          { withTracker(ShowCard, { ...data, isDark: true }, cardName, LANDSCAPE) }
        </div>
      );
    },
    { backgrounds, viewport: 'Default' }
  );
