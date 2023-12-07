import React from 'react';

import { storiesOf } from '@storybook/react';
import ButtonShowEventsTickets from './ButtonShowEventsTickets';
import ButtonShowEventsVote from './ButtonShowEventsVote';
import ButtonShowEvents from '.';

storiesOf('Widgets/ButtonShowEvents', module)
  .add('default buttons', () => (
    <ButtonShowEvents />
  ))
  .add('default ticket button', () => (
    <ButtonShowEventsTickets className="containerPLN" />
  ))
  .add('default vote button', () => (
    <ButtonShowEventsVote className="containerPLN" />
  ));
