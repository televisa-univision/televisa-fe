import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Badge from '.';

storiesOf('Clickable/Badge', module)
  .add('default', () => (
    <Badge label="this is a badge" />
  ))
  .add('with onClick', () => (
    <Badge
      label="Clickable Badge"
      onClick={action('hello There')}
    />
  ));
