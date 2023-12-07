import React from 'react';
import { storiesOf } from '@storybook/react';

import CardCarouselArrow from '.';

storiesOf('Slidable/Redesign 2019/CardCarouselArrow', module)
  .add('default', () => <CardCarouselArrow />)
  .add('light - right', () => <CardCarouselArrow direction="right" />)
  .add('dark - left', () => <CardCarouselArrow variant="dark" />)
  .add('dark - right', () => <CardCarouselArrow variant="dark" direction="right" />);
