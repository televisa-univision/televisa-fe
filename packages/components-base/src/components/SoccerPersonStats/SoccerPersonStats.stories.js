import React from 'react';

import { storiesOf } from '@storybook/react';

import SoccerPersonStats from '.';

const props = {
  age: 35,
  dateOfBirth: '1985-07-13',
  height: 185,
  id: '33376',
  name: 'Guillermo Ochoa',
  nationality: 'Mexico',
  positionRegular: 'goalkeeper',
  team: {
    abbreviation: 'AME',
    id: '1292',
    logo: 'https://st1.uvnimg.com/3c/d1/8dcf3d914632a3b8a24d77ea2463/america-72x72.png',
    name: 'América',
    url: 'https://www.tudn.com/futbol/liga-mx/america',
  },
  uniformNumber: 13,
  weight: 78,
};

storiesOf('Text/SoccerPersonStats', module)
  .add('default vertical layout', () => (
    <SoccerPersonStats
      {...props}
    />
  ))
  .add('with horizontal layout', () => (
    <SoccerPersonStats
      {...props}
      layout="horizontal"
    />
  ))
  .add('with no nationality', () => (
    <SoccerPersonStats
      {...props}
      nationality={null}
    />
  ))
  .add('with no date of birth', () => (
    <SoccerPersonStats
      {...props}
      dateOfBirth={null}
    />
  ))
  .add('with no club', () => (
    <SoccerPersonStats
      {...props}
      team={null}
    />
  ));
