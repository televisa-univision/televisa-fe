import React from 'react';

import { storiesOf } from '@storybook/react';

import TwitterFollow from '.';

storiesOf('Clickable/TwitterFollow', module)
  .add('Default', () => <TwitterFollow twitterUrl="http://twitter.com/univision" />);
