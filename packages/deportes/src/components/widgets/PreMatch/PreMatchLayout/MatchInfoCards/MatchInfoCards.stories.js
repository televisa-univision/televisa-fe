import React from 'react';

import { storiesOf } from '@storybook/react';

import MatchInfoCards from '.';

const props = {
  infoCards: {
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
  },
};

const incompleteProps = {};

storiesOf('Widgets/PreMatch/PreMatchLayout/MatchInfoCards', module)
  .add('default', () => (<MatchInfoCards {...props} />))
  .add('no data', () => (<MatchInfoCards {...incompleteProps} />));
