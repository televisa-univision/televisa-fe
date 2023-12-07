/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { image } from '../../config/storyMocks';

import MultiAuthorDisplay from '.';

const props = {
  authors: [
    {
      image,
      uid: '1365',
      title: 'Brad Pitt',
    },
  ],
  tempAuthors: [
    {
      uid: '22435',
      title: 'Romeo Santos',
      fullName: 'Ruben Jimenez',
      company: 'Univision',
      designation: 'Publisher',
    },
  ],
  date: new Date().toISOString(),
  source: 'Univision',
};

const sponsor = {
  image: {
    renditions: {
      original: {
        href:
          'https://cdn2.uvnimg.com/77/41/d05365184267a174d855968fcb8d/logo-citylab-mobile-01.svg',
        width: 206,
        height: 30,
      },
      '16x9-med': {
        href:
          'https://cdn4.uvnimg.com/dims4/default/b017ea6/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2F77%2F41%2Fd05365184267a174d855968fcb8d%2Flogo-citylab-mobile-01.svg',
        width: 400,
        height: 225,
      },
      '16x9-mobile': {
        href:
          'https://cdn4.uvnimg.com/dims4/default/10edbf3/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2F77%2F41%2Fd05365184267a174d855968fcb8d%2Flogo-citylab-mobile-01.svg',
        width: 480,
        height: 270,
      },
      '16x9-sm': {
        href:
          'https://cdn4.uvnimg.com/dims4/default/d208459/2147483647/thumbnail/246x138/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2F77%2F41%2Fd05365184267a174d855968fcb8d%2Flogo-citylab-mobile-01.svg',
        width: 246,
        height: 138,
      },
      '16x9-tablet': {
        href:
          'https://cdn4.uvnimg.com/dims4/default/787d920/2147483647/thumbnail/1024x576/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2F77%2F41%2Fd05365184267a174d855968fcb8d%2Flogo-citylab-mobile-01.svg',
        width: 1024,
        height: 576,
      },
    },
  },
  name: 'City Lab logo',
  link: null,
  leadText: null,
  trackingCode: null,
};

storiesOf('Widgets/MultiAuthorDisplay', module)
  .add('Default', () => {
    return <MultiAuthorDisplay {...props} />;
  })
  .add('Default w/ Sponsor', () => {
    return <MultiAuthorDisplay {...props} sponsor={sponsor} />;
  })
  .add('Single author', () => <MultiAuthorDisplay authors={props.authors} />)
  .add('Single author w/ Sponsor', () => {
    return (
      <MultiAuthorDisplay
        authors={props.authors}
        date={new Date().toISOString()}
        sponsor={sponsor}
      />
    );
  })
  .add('Single author with Twitter', () => {
    const authors = Object.assign({}, props.authors[0], {
      socialNetworks: {
        twitterUrl: {
          url: 'https://twitter.com/nuriapuntonet',
        },
      },
    });
    return <MultiAuthorDisplay authors={[authors]} date={new Date().toISOString()} />;
  })
  .add('No author', () => {
    return <MultiAuthorDisplay date={new Date().toISOString()} source="Univision" />;
  })
  .add('Sponsored author', () => {
    return (
      <MultiAuthorDisplay
        {...props}
        sponsor
      />
    );
  });
