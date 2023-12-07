import React from 'react';

import { storiesOf } from '@storybook/react';

import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';
import data from '../../../../utils/mocks/prematch.json';
import PreMatchLayout from '.';

const props = preMatchExtractor(data);
const top = [
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
];

const incompleteProps = {
  infoCards: {
    official: {
      name: '',
    },
    site: {
      name: '',
      capacity: '',
    },
    tournament: {
      name: '',
      week: '',
    },
    screen: {
      name: '',
      logo: '',
    },
  },
};

storiesOf('Widgets/PreMatch/PreMatchLayout/white', module)
  .add('default', () => (
    <PreMatchLayout {...props} topScorers={top} matchCard previousCard scorersCard />
  ))
  .add('with Partido card only', () => <PreMatchLayout {...props} topScorers={top} matchCard />)
  .add('with Partido Card and Previous Cards', () => (
    <PreMatchLayout {...props} topScorers={top} matchCard previousCard />
  ))
  .add('no data', () => <PreMatchLayout {...incompleteProps} matchCard previousCard scorersCard />);

storiesOf('Widgets/PreMatch/PreMatchLayout/black', module)
  .add('default', () => (
    <PreMatchLayout {...props} topScorers={top} matchCard previousCard scorersCard isBlack />
  ))
  .add('with Partido card only', () => (
    <PreMatchLayout {...props} topScorers={top} matchCard isBlack />
  ))
  .add('with Partido Card and Previous Cards', () => (
    <PreMatchLayout {...props} topScorers={top} matchCard previousCard isBlack />
  ))
  .add('no data', () => (
    <PreMatchLayout {...incompleteProps} matchCard previousCard scorersCard isBlack />
  ));
