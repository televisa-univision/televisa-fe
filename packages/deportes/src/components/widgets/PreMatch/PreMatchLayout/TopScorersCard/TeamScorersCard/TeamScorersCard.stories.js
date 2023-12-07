import React from 'react';

import { storiesOf } from '@storybook/react';

import TeamScorersCard from '.';

const props = {
  teamLogo: 'https://cdn1.uvnimg.com/b6/56/7d3d29fd492faa7c7de2bd4df4d0/104-eb.png',
  players: [
    {
      id: 't.123',
      name: 'John Doe',
      position: 'forward',
      score: 6,
    },
    {
      id: 't.1234',
      name: 'John Doe',
      position: 'forward',
      score: 5,
    },
    {
      id: 't.1235',
      name: 'John Doe',
      position: 'forward',
      score: 4,
    },
    {
      id: 't.1236',
      name: 'John Doe',
      position: 'forward',
      score: 3,
    },
  ],
};

const incompleteProps = {
  players: [],
};

storiesOf('Widgets/PreMatch/PreMatchLayout/TopScorersCard/TeamScorersCard', module)
  .add('default', () => (<TeamScorersCard {...props} />))
  .add('no data', () => (<TeamScorersCard {...incompleteProps} />));
