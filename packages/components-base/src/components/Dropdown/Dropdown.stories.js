/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dropdown from '.';

storiesOf('Clickable/Dropdown', module)
  .add('default', () => {
    return (
      <Dropdown
        placeholder="Select a fruit"
        options={[{
          name: 'Apples',
          value: 'apl',
        }, {
          name: 'Bananas',
          value: 'banana',
        }, {
          name: 'Orange',
          value: '#f4a442',
        }]}
        name="fruit"
        onChange={action}
      />
    );
  });
