const commonData = {
  type: 'radiostation',
  uid: '0000014d-00ec-d9c5-a3ef-06fde4180000',
  uri: 'https://www.univision.com/radio/los-angeles-klve-fm',
  vertical: null,
  parent: null,
  title: 'K-Love 107.5',
  description: 'VARIEDAD K-LOVE',
  image: {
    type: 'image',
    uid: '0000016d-d129-d8e7-a17d-f9fd58160000',
    title: 'LosAngeles_00_Klove.jpg',
    caption: null,
    credit: null,
    renditions: {
      original: {
        href: 'https://st1.uvnimg.com/f4/25/48060bc848ffaa12e6228ea0b4a0/losangeles-00-klove.jpg',
        width: 1400,
        height: 2099,
        focusPoint: {
          x: 0.5194517450897272,
          y: 0.504828158286673,
        },
      },
    },
  },
  authors: [],
  cardLabel: null,
  updateDate: '2020-06-09T15:35:56-04:00',
  publishDate: '2015-04-28T12:53:44-04:00',
  expirationDate: '3000-01-01T00:00:00-05:00',
  hierarchy: [],
  frequency: 107.5,
  band: 'FM',
  call: 'KLVE-FM',
  nowPlayingId: 2910,
  logo: {
    type: 'image',
    uid: '00000157-0b68-d302-a157-3ffa30630001',
    title: 'LOS ANGELES LA RADIO STATIONS NUEVO LOGO NEW LOGO',
    caption: null,
    credit: null,
    renditions: {
      original: {
        href: 'https://st1.uvnimg.com/8c/30/a57d1290465c9aec4cf40b5bc561/los-angeles107.5_color.svg',
        width: 0,
        height: 0,
      },
    },
  },
  alternativeLogo: {
    type: 'image',
    uid: '0000016c-b41f-d083-a97d-fe9f8a600000',
    title: 'KLove107.5_NewNav_Brand',
    caption: null,
    credit: null,
    renditions: {
      original: {
        href: 'https://st1.uvnimg.com/04/ac/ecf9fc4d441ebaee40db8382dbcb/los-angeles107.5_white.svg',
        width: 0,
        height: 0,
      },
    },
  },
  audioArtwork: null,
  abacast: {
    id: 2315,
    demoId: 292,
    aacStreamiOS: 'https://live.wostreaming.net/playlist/univision-klvefmaac-ibc2.m3u?source=UforiaiOS',
    aacStreamAndroid: 'https://live.wostreaming.net/playlist/univision-klvefmaac-ibc2.m3u?source=UforiaAndroid',
    mp3Stream: 'https://live.wostreaming.net/direct/univision-klvefmaac-imc2?source=webPIPplayer',
  },
  localMarket: {
    title: 'Los Angeles',
    zipCodes: [
      '90034',
    ],
  },
  genres: [
    'Amor',
    'Romántico',
    'Pop Español',
  ],
  socialNetworks: [
    {
      text: 'K-LOVE 107.5 Twitter',
      name: 'Twitter',
      url: 'https://twitter.com/iloveklove',
      target: '_blank',
    },
    {
      text: 'K-LOVE 107.5 Facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/iloveklove',
      target: '_blank',
    },
    {
      text: 'K-LOVE 107.5 Instagram',
      name: 'Instagram',
      url: 'https://instagram.com/iloveklove',
      target: '_blank',
    },
  ],
  sharing: {
    options: {
      facebook: {
        url: 'https://www.univision.com/radio/los-angeles-klve-fm',
        isFeedDialog: false,
        title: 'K-Love 107.5',
        description: 'VARIEDAD K-LOVE',
        imageUrl: null,
        appId: '645138725541385',
      },
      twitter: {
        url: 'https://www.univision.com/radio/los-angeles-klve-fm',
        title: 'K-Love 107.5',
        via: 'Univision',
      },
      whatsapp: {
        url: 'https://www.univision.com/radio/los-angeles-klve-fm',
        message: 'K-Love 107.5',
      },
      mail: {
        subject: 'K-Love 107.5',
        body: 'Un amigo te ha recomendado este contenido que puede ser de tu interés. K-Love 107.5 Encuéntralo en este enlace:https://www.univision.com/radio/los-angeles-klve-fm Visítanos https://www.univision.com',
      },
    },
  },
  radioShow: false,
  exclusive: false,
  primaryTag: {
    name: 'Amor',
    link: 'https://www.univision.com/temas/amor',
  },
  feedConsumer: 'UNIVISION',
  schedule: null,
};

export default {
  radiostation: {
    ...commonData,
  },
  podcast: {
    ...commonData,
    podcastLength: 11,
  },
};
