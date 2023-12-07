import React from 'react';

import { storiesOf } from '@storybook/react';

import Separator from '.';

storiesOf('Layout/Separator', module)

  .add('Default', () => (
    <Separator />
  ))
  .add('Default /w theming', () => (
    <Separator theme={{ primary: 'blue' }} />
  ))
  .add('Left aligned, small', () => (
    <Separator width="small" />
  ))
  .add('Left aligned, small w/ theming', () => (
    <Separator theme={{ primary: 'blue' }} width="small" />
  ))
  .add('Center aligned, small', () => (
    <Separator align="center" width="small" />
  ))
  .add('Center aligned, small w/ theming', () => (
    <Separator align="center" theme={{ primary: 'blue' }} width="small" />
  ))
  .add('Right aligned, small', () => (
    <Separator align="right" width="small" />
  ))
  .add('Right aligned, small w/ theming', () => (
    <Separator align="right" theme={{ primary: 'blue' }} width="small" />
  ));
