import React from 'react';
import { storiesOf } from '@storybook/react';

import AskExpertCtaBtn from './AskExpertCtaBtn';

const props = {
  uri: 'www.abc.test.com',
};

storiesOf('Clickable/Ask Expert CTA Button', module)
  .add('default', () => (
    <AskExpertCtaBtn {...props} />
  ));
