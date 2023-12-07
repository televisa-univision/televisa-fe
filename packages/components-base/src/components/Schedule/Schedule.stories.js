/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import Schedule from '.';

const schedule = [{
  program: 'Omar y Argelia',
  'time-slot': '5 AM - 10 AM',
},
{
  program: 'Donaji',
  'time-slot': '10 AM - 3 PM',
},
{
  program: 'Ysaac Alvarez',
  'time-slot': '3 PM - 7 PM',
},
{
  program: 'Bertha Andrea Gonzalez',
  'time-slot': '7 PM - 12 AM',
}, {
  program: 'Omar y Argelia',
  'time-slot': '5 AM - 10 AM',
},
{
  program: 'Donaji',
  'time-slot': '10 AM - 3 PM',
},
{
  program: 'Ysaac Alvarez',
  'time-slot': '3 PM - 7 PM',
},
{
  program: 'Bertha Andrea Gonzalez',
  'time-slot': '7 PM - 12 AM',
}];

storiesOf('Widgets/Schedule', module)
  .add('default ', () => <Schedule content={schedule.slice(0, 3)} />)
  .add('with pagination ', () => <Schedule content={schedule} />);
