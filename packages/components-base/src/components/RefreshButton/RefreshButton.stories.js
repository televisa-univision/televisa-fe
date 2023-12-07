import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import classnames from 'classnames';

import RefreshButton, { RefreshLabel } from '.';
import Styles from './RefreshButton.stories.scss';

/**
 * Sample callback function
 * @param {string} msg - sample message
 * @returns {function}
 */
const callback = msg => action(msg);

storiesOf('Clickable/RefreshButton', module)
  .add('default', () => (
    <RefreshButton>
      Hello There
    </RefreshButton>
  ))
  .add('with callback', () => (
    <RefreshButton onClick={action('Hello here!')}>
      Click Here!!
    </RefreshButton>
  ))
  .add('with cutom callback', () => (
    <RefreshButton onClick={callback('test')}>
      Click Here....!!
    </RefreshButton>
  ))
  .add('with top psosition', () => (
    <RefreshButton position="top">
      <RefreshLabel />
    </RefreshButton>
  ))
  .add('with label', () => (
    <RefreshButton onClick={callback('refreshing now...')}>
      <RefreshLabel />
    </RefreshButton>
  ))
  .add('with other icon, mesagge and children', () => (
    <RefreshButton onClick={callback('refreshing now...')}>
      <RefreshLabel>
        <p className={classnames(Styles.count, 'uvs-font-a-bold')}>3</p>
      </RefreshLabel>
    </RefreshButton>
  ))
  .add('with theme', () => (
    <RefreshButton
      onClick={callback('refreshing now...')}
      theme={{
        primary: '#00C473',
        secondary: '#4AE1A2',
      }}
    >
      <RefreshLabel />
    </RefreshButton>
  ));
