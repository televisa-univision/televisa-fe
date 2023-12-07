import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeProvider } from 'styled-components';
import { GRADIENT_BLUE_LABEL } from '@univision/fe-commons/dist/utils/styled/constants';

import CardsCta from '.';

const props = {
  label: 'Ver más',
  seeMoreLink: {
    href: 'http://univision.com',
    target: '_blank',
  },
};

storiesOf('Clickable/CardsCTA', module)
  .add('default', () => (
    <CardsCta {...props} />
  ))
  .add('w/ Theme Provider', () => (
    <ThemeProvider theme={{ gradient: GRADIENT_BLUE_LABEL }}>
      <CardsCta {...props} />
    </ThemeProvider>
  ));
