/* eslint-disable require-jsdoc */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { AbacastPlayerContainer as AbacastPlayer } from './AbacastPlayerContainer';
import './AbacastPlayer.stories.scss';

const props = {
  abacastId: 2315,
  image: {
    type: 'image',
    uid: '00000157-0b68-d302-a157-3ffa30630001',
    title: 'LOS ANGELES LA RADIO STATIONS NUEVO LOGO NEW LOGO',
    caption: '',
    credit: null,
    renditions: {
      original: {
        href: 'https://cdn4.uvnimg.com/c1/79/a93d1cc74c64b000a4b41f5300be/los-angeles-107.5@2x.png',
        width: 0,
        height: 0,
      },
      '16x9-med': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/e1dd392/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 400,
        height: 225,
      },
      '16x9': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/6fcd1c1/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 1240,
        height: 698,
      },
      '16x9-mobile': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/5c0ea79/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 480,
        height: 270,
      },
      '16x9-sm': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/a7387b6/2147483647/thumbnail/246x138/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 246,
        height: 138,
      },
      '16x9-tablet': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/adb6778/2147483647/thumbnail/1024x576%3E/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 1024,
        height: 576,
      },
      '16x9-extended': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/ab88738/2147483647/thumbnail/1440x810/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 1440,
        height: 810,
      },
    },
  },
  logo: {
    type: 'image',
    uid: '00000157-0b68-d302-a157-3ffa30630001',
    title: 'LOS ANGELES LA RADIO STATIONS NUEVO LOGO NEW LOGO',
    caption: '',
    credit: null,
    renditions: {
      original: {
        href: 'https://cdn4.uvnimg.com/c1/79/a93d1cc74c64b000a4b41f5300be/los-angeles-107.5@2x.png',
        width: 0,
        height: 0,
      },
      '16x9-mobile': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/5c0ea79/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 480,
        height: 270,
      },
      '16x9-loading': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/2eda9f7/2147483647/thumbnail/30x17/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 30,
        height: 17,
      },
      '16x9-sm': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/a7387b6/2147483647/thumbnail/246x138/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 246,
        height: 138,
      },
      '16x9-tablet': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/adb6778/2147483647/thumbnail/1024x576%3E/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 1024,
        height: 576,
      },
      '16x9': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/6fcd1c1/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 1240,
        height: 698,
      },
      '16x9-med': {
        href:
          'https://cdn2.uvnimg.com/dims4/default/e1dd392/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png',
        width: 400,
        height: 225,
      },
    },
  },
  stationTitle: 'K-Love 107.5',
  stationDescription:
    'Aquí encontrarás la mejor música romántica POP del momento',
  streamUrl: 'https://live.wostreaming.net/direct/univision-kltnfmaac-imc1',
  nowPlaying: {
    artist: 'Camila Cabello',
    largeimage: 'https://d2ybyaxt0fuzrp.cloudfront.net/image/2910/Ricky+Martin/MARIA/large',
    title: 'OMG this is a much longer title',
  },
  uri: '/los-angeles/klve',
};

storiesOf('Widgets/AbacastPlayer', module)
  .add('Radio', () => {
    Store.dispatch(
      setPageData({
        config: {
          videoHub: {
            env: 'qa',
            profile: 'bbe0d1ef-c85d-4c3c-80a0-f10fdacee9f8',
          },
        },
      })
    );
    return <AbacastPlayer {...props} />;
  })
  .add('Podcast', () => {
    Store.dispatch(
      setPageData({
        config: {
          videoHub: {
            env: 'qa',
            profile: 'bbe0d1ef-c85d-4c3c-80a0-f10fdacee9f8',
          },
        },
      })
    );
    return (
      <AbacastPlayer
        {...props}
        detailedDescription="Durante la conferencia de prensa de la mañana el 15 de enero, Jorge Ramos increpó al presidente Andrés Manuel López Obrador, mostrando los números oficiales de su gobierno y el aumento de estas cifras, siendo este el peor período en la historia del país…"
        duration="01:24:00"
        isPodcastEpisode
      />
    );
  });
