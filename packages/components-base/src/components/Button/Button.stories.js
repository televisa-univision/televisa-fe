import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '.';
import Styles from './Button.stories.scss';

storiesOf('Clickable/Button', module)
  .add('with plain', () => (
    <Button plain>
      Hello There
    </Button>
  ))
  .add('with className', () => (
    <Button className={Styles.red}>
      Hello There
    </Button>
  ))
  .add('with onClick', () => (
    <Button
      className="blah-blah-blah"
      onClick={action('hello There')}
    >
      Hello There
    </Button>
  ));
