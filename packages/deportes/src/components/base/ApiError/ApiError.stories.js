import React from 'react';

import { storiesOf } from '@storybook/react';

import ApiError from '.';

storiesOf('Base/ApiError', module)
  .add('default', () => (
    <ApiError />))
  .add('With message', () => (
    <ApiError message="Custom message" />
  ));
