/**
 * @module PrendeTV Background mock file
 */
import { PRENDE_TV_LANDING } from '../../../../constants';

const background = {
  props: {
    desktopBackground: {
      type: 'image',
      uid: '00000177-dad2-d60e-a9f7-dbd325d40000',
      title: 'PosterArt_with-3rdparty_WIDE_FLAT.jpg',
      caption: null,
      credit: null,
      renditions: {
        original: {
          href: 'https://uvn-brightspot-performance.s3.amazonaws.com/5b/8a/0e9d08994f64837a1023fd734671/posterart-with-3rdparty-wide-flat.jpg',
          width: 1920,
          height: 1080,
        },
      },
    },
    headLine: 'this is a headline',
    mobileBackground: {
      type: 'image',
      uid: '00000177-d982-d60e-a9f7-db832bd30000',
      title: 'background-image-mobile.png',
      caption: null,
      credit: null,
      renditions: {
        original: {
          href: 'https://uvn-brightspot-performance.s3.amazonaws.com/0f/2b/cec82710454c8044d8fa7300926b/background-image-mobile.png',
          width: 415,
          height: 314,
        },
      },
    },
    opening: true,
    page: PRENDE_TV_LANDING,
    subHeadline: 'this is a sub headline',
    text: '100% EN ESPAÑOL + 100% GRATIS',
  },
  cta: {
    type: 'externalcontentpromo',
    uid: '00000177-9794-d059-a777-bfd72c6c0000',
    uri: 'https://app.prende.tv',
    feedConsumer: 'UNIVISION',
    link: {
      href: 'https://app.prende.tv',
      target: '_blank',
      text: 'EXPLORA YA',
      uid: '00000177-9794-d059-a777-bfd72c6d0000',
    },
    schedules: [],
  },
};

export default background;
