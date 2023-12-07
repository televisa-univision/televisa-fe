import React from 'react';

import { storiesOf } from '@storybook/react';
import ButtonUniNow from '.';

storiesOf('Widgets/ButtonUniNow', module)
  .add('default', () => (
    <ButtonUniNow className="uniNow" />
  ));
