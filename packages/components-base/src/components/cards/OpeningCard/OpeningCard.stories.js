import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';

import data from './__mocks__/openingCard.json';
import OpeningCard from './OpeningCard';

import { setDimsConfig, withTracker } from '../storybookHelpers.stories';

setDimsConfig();
const cardName = 'LiveBlogCard';

storiesOf('Cards/Redesign 2019/OpeningCard', module)
  .addDecorator(withViewport('iphone8p'))
  .add('mobile inline', () => {
    return withTracker(OpeningCard, data, cardName);
  })
  .add(
    'desktop inline',
    () => {
      return withTracker(OpeningCard, data, cardName);
    },
    { viewport: 'Default' }
  );
