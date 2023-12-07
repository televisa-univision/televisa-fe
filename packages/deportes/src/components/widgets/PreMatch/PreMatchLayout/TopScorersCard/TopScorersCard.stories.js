import React from 'react';

import { storiesOf } from '@storybook/react';

import TopScorersCard from '.';

const props = {
  topScorers: [
    {
      id: 't.123',
      teamLogo: 'https://cdn1.uvnimg.com/b6/56/7d3d29fd492faa7c7de2bd4df4d0/104-eb.png',
      players: [
        {
          id: 't.1',
          name: 'Ronaldo Cisneros',
          position: 'forward',
          score: 6,
        },
        {
          id: 't.12',
          name: 'Javier López',
          position: 'forward',
          score: 5,
        },
        {
          id: 't.123',
          name: 'Alan Pulido',
          position: 'forward',
          score: 4,
        },
      ],
    },
    {
      id: 't.123234',
      teamLogo: 'https://cdn3.uvnimg.com/d1/6c/f94687194cb384e7d1940c122d48/logotrigresestrellas.png',
      players: [
        {
          id: 't.1234',
          name: 'Henry Martín',
          position: 'forward',
          score: 6,
        },
        {
          id: 't.123456',
          name: 'Oribe Peralta',
          position: 'forward',
          score: 5,
        },
      ],
    },
  ],
};

const incompleteProps = {
  topScorers: [],
};

storiesOf('Widgets/PreMatch/PreMatchLayout/TopScorersCard', module)
  .add('default', () => (<TopScorersCard {...props} />))
  .add('no data', () => (<TopScorersCard {...incompleteProps} />));
