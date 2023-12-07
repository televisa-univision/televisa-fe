/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import NotificationBanner from '.';

const props = {
  settings: {
    title: 'EL GORDO, LA MALA Y EL FEO',
    titleLink: {
      uid: '0000015f-54fc-d640-a7df-fefdbece0001',
      uri: null,
      type: 'externallink',
      versionCreated: null,
      text: null,
      href: 'http://www.univision.com/devuelvemeunivision',
      target: '_blank',
    },
  },
  contents: [
    {
      uri: 'http://www.univision.com/devuelvemeunivision',
      type: 'externalcontent',
      title: 'Han perdido el acceso a todos los canales de Univision. Llamen ya al 800-500-4252.',
    },
  ],
  theme: {},
};

const multipleItems = [
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'Lo extravagante, lo clásico y lo elegante en la gala del Met 2017 slides',
    uid: 'aaaaa1',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'K-Love 107.5 Copy Section test',
    uid: 'aaaaa2',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title:
      'Todavía puedes unirte al movimiento #ThisShirtSavesLives y apoyar la lucha contra el cáncer infantil',
    uid: 'aaaaa3',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'En fotos: Los escándalos que han plagado a los boy bands y a las all girls band',
    uid: 'aaaaa4',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'Test article for radio nacional',
    uid: 'aaaaa5',
  },
];

storiesOf('Widgets/NotificationBanner', module)
  .add('Default', () => {
    return (
      <NotificationBanner content={props.contents} settings={props.settings} theme={props.theme} />
    );
  })
  .add('with Theme', () => {
    return (
      <NotificationBanner
        content={props.contents}
        settings={props.settings}
        theme={{ primary: '#0f5598' }}
      />
    );
  })
  .add('Multiple items', () => {
    return (
      <NotificationBanner
        content={multipleItems}
        settings={props.settings}
        theme={{ primary: '#0f5598' }}
      />
    );
  })
  .add('Multiple items w/ Breaking News', () => {
    const content = multipleItems.map(item => ({
      ...item,
      contentPriority: 'BREAKING_NEWS',
    }));
    return <NotificationBanner content={content} settings={props.settings} />;
  });
