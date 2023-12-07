import React from 'react';

import { storiesOf } from '@storybook/react';
import LoadingIndicatorBar from '.';

storiesOf('SPA/Loader Bar', module)
  .add('loading..', () => (
    <LoadingIndicatorBar loading />
  ))
  .add('not loading', () => (
    <LoadingIndicatorBar loading={false} />
  ));
