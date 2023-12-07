import React from 'react';

import { storiesOf } from '@storybook/react';

import RichText from '.';

storiesOf('Text/RichText', module)
  .add('default', () => (<RichText html="<a style='color: red;'>Text</a> <b>with</b> <span style='background: black; color: white;'>HTML</span>" />));
