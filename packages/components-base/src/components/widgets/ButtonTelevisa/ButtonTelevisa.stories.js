import React from 'react';

import { storiesOf } from '@storybook/react';
import ButtonShop from '.';

storiesOf('Widgets/ButtonShop', module)
  .add('default', () => (
    <ButtonShop className="containerShop" />
  ));
