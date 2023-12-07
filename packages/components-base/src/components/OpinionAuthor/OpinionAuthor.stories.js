import React from 'react';

import { storiesOf } from '@storybook/react';

import OpinionAuthor from '.';

const props = {
  author: {
    uri: 'https://performance.univision.com/temas/daniel-morcate',
    title: 'Daniel Morcate',
    image: {
      renditions: {
        '16x9-sm': {
          href:
            'https://cdn4.performance.univision.com/dims4/default/39a0801/2147483647/crop/400x224%2B0%2B85/resize/246x138/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fac%2F94%2Fe6dccfa8405c9ba1b25bf43d9906%2Fmorcate.jpg',
          width: 246,
          height: 138,
        },
      },
    },
    firstName: 'Daniel',
    lastName: 'Morcate',
    socialNetworks: {
      twitterUrl: {
        text: 'Daniel Morcate',
        url: 'https://twitter.com/dmorca',
        target: '_blank',
        hashTags: [],
      },
    },
    miniBio:
      'President, Condé Nast International, London (ex. Vice President Guardian UK, Director Prestigious Company)',
  },
  theme: {
    primary: 'red',
  },
  opinionText: 'President, Condé Nast International, London (ex. Vice President Guardian UK, Director Prestigious Company)',
};

storiesOf('Widgets/OpinionAuthor', module)
  .add('Default', () => (
    <OpinionAuthor {...props} />
  ))
  .add('English Opinion', () => (
    <OpinionAuthor {...props} language="en" />
  ));
