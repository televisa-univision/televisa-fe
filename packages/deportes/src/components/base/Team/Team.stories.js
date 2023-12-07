import React from 'react';

import { storiesOf } from '@storybook/react';

import Team from '.';

storiesOf('Base/Team', module)
  .add('with name and logo', () => (
    <Team
      name={{
        full: 'Barcelona',
        abbreviation: 'Bar',
        first: '',
        nickname: '',
      }}
      logo="https://cdn1.uvnimg.com/a7/dc/482b448e41fa87116c1458c9ff6b/31-eb.png"
    />
  ))
  .add('with away alignment', () => (
    <Team
      name={{
        full: 'Barcelona',
        abbreviation: 'Bar',
        first: '',
        nickname: '',
      }}
      alignment="away"
      logo="https://cdn1.uvnimg.com/a7/dc/482b448e41fa87116c1458c9ff6b/31-eb.png"
    />
  ))
  .add('with vertical view', () => (
    <Team
      name={{
        full: 'Barcelona',
        abbreviation: 'Bar',
        first: '',
        nickname: '',
      }}
      alignment="away"
      logo="https://cdn1.uvnimg.com/a7/dc/482b448e41fa87116c1458c9ff6b/31-eb.png"
      view="vertical"
    />
  ));
