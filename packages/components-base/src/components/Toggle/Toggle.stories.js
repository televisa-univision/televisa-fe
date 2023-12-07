/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  DAISY_BUSH,
} from '@univision/fe-utilities/styled/constants';
import { action } from '@storybook/addon-actions';
import Toggle from '.';

storiesOf('Clickable/Toggle', module)
  .add('default', () => {
    return (<Toggle height={100} width={100} />);
  })
  .add('custom Colors', () => {
    return (<Toggle fill={DAISY_BUSH} height={100} width={100} />);
  })
  .add('Custom event', () => {
    return (<Toggle height={100} width={100} onClick={toggle => action()(`Custom event:${toggle}`)} />);
  })
  .add('On when load', () => {
    return (<Toggle height={100} width={100} on />);
  });
