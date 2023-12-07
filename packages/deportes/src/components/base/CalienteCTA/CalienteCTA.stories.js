import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CalienteCTA from '.';

const openProps = {
  odds: ['+210', '+220', '+150'],
  eventUrl: 'https://online.caliente.mx/page?member=televisadep&campaign=DEFAULT&channel=DEFAULT&zone=54300998&lp=57943263&ev_id=16676875',
  isBetOpen: true,
  onClick: action('clicked caliente cta!'),
};

storiesOf('Base/CalienteCTA', module)
  .add('bets closed', () => (
    <CalienteCTA />
  ))
  .add('bets open', () => (
    <CalienteCTA {...openProps} />
  ));
