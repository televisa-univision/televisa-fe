import React from 'react';
import { storiesOf } from '@storybook/react';

import { DAISY_BUSH } from '@univision/fe-commons/dist/utils/styled/constants';

import FavoriteButton from '.';

storiesOf(
  'Clickable/FavoriteSelector/FavoriteButton',
  module
).add('unfavorited', () => (
  <FavoriteButton
    favoriteIconColor={DAISY_BUSH}
    iconColor={DAISY_BUSH}
    iconName="aries"
    title="aries"
  />
)).add('favorited', () => (
  <FavoriteButton
    favorited
    favoriteIconColor={DAISY_BUSH}
    iconColor={DAISY_BUSH}
    iconName="aries"
    title="aries"
  />
));
