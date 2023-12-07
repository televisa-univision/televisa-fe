import React from 'react';

import { storiesOf } from '@storybook/react';

import MatchInfoCardLayout from '.';

const props = {
  official: {
    name: 'Erick Yair Miranda Galindo',
  },
  site: {
    name: 'Estadio Cuauhtémoc',
    capacity: '33,042',
  },
  tournament: {
    name: 'Mexican Primera (Apertura)', week: '8',
  },
  screen: {
    name: 'UDN', logo: 'https://neulionsmbnyc-a.akamaihd.net/u/univisionnow2/thumbs/channels/68_es.png',
  },
};

storiesOf('Widgets/PreMatch/PreMatchLayout/MatchInfoCards/MatchInfoCardsLayout', module).add('default', () => (
  <MatchInfoCardLayout {...props} />));
