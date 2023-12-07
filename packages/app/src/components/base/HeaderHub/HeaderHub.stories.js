import React from 'react';

import { storiesOf } from '@storybook/react';

import mock from './__mocks__/content.json';

import HeaderHub from '.';

const { results } = mock;

storiesOf('Layout/HeaderHub', module)
  .add('Person', () => (
    <HeaderHub {...results[0].data} />
  ))
  .add('Hub', () => (
    <HeaderHub {...results[1].data} />
  ))
  .add('Hub Without Image', () => (
    <HeaderHub {...results[1].data} image={null} />
  ))
  .add('Only title', () => (
    <HeaderHub {...results[1].data} hubTag={false} type="section" />
  ));
