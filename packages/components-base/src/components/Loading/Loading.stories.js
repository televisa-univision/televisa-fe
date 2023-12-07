import React from 'react';

import { storiesOf } from '@storybook/react';

import Loading from '.';

const theme = { primary: 'blue' };

storiesOf('Widgets/Loading', module)
  .add('default (large)', () => (
    <Loading theme={theme} />
  ))
  .add('medium size', () => (
    <Loading theme={theme} size="medium" />
  ))
  .add('small size', () => (
    <Loading theme={theme} size="small" />
  ))
  .add('with other theme', () => (
    <Loading theme={{ primary: 'grey' }} />
  ))
  .add('with label', () => (
    <Loading label="Loading Playlist..." theme={theme} />
  ))
  .add('with SVG', () => (
    <Loading label="Loading Playlist..." theme={theme} svg />
  ));
