import React from 'react';

import { storiesOf } from '@storybook/react';

import Sponsor from '.';

const logo = 'https://botw-pd.s3.amazonaws.com/styles/logo-original-577x577/s3/122012/walgreens-logo-corner-w.png?itok=Hx1fwXxX';

storiesOf('Clickable/Sponsor', module)
  .add('Default', () => <Sponsor logo={logo} name="Walgreens" link="#" />)
  .add('Text only', () => <Sponsor name="Walgreens" link="#" />)
  .add('Without name', () => <Sponsor logo={logo} link="#" />);
