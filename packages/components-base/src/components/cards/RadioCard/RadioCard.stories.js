import { withViewport } from '@storybook/addon-viewport';

import { storiesOf } from '@storybook/react';

import {
  LIST,
  SQUARE,
  VERTICAL,
} from '@univision/fe-commons/dist/constants/cardTypes';

import {
  setDimsConfig,
  withTracker,
} from '../storybookHelpers.stories';

import props from './__mocks__/radioCard';
import RadioCard from '.';

setDimsConfig();
const cardName = 'RadioCard';

storiesOf('Cards/Uforia/SquareCard', module)
  .addDecorator(withViewport('iphone8p'))
  .add('Square (Radio Station)', () => (
    withTracker(RadioCard, props.radiostation, cardName, SQUARE)
  ))
  .add('Square (Podcast)', () => (
    withTracker(RadioCard, props.podcast, cardName, SQUARE)
  ))
  .add('Vertical (Radio Station)', () => (
    withTracker(RadioCard, props.radiostation, cardName, VERTICAL)
  ))
  .add('Vertical (Podcast)', () => (
    withTracker(RadioCard, props.podcast, cardName, VERTICAL)
  ))
  .add('List (Radio Station)', () => (
    withTracker(RadioCard, props.radiostation, cardName, LIST)
  ))
  .add('List (Podcast)', () => (
    withTracker(RadioCard, props.podcast, cardName, LIST)
  ));
