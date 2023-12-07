/**
 * @module PrendeTV Constants
 */
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';

import {
  BLACK,
  BITTERSWEET,
  NERO,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

/**
 * Represent the tv device type for prende tv
 * @type {string}
 */
export const TV = 'tv';

/**
 * Represent the computer device type for prende tv
 * @type {string}
 */
export const COMPUTER = 'computer';

/**
 * Represent the mobile device type for prende tv
 * @type {string}
 */
export const MOBILE = 'mobile';

/**
 * Prende TV app page
 * @type {string}
 */
export const PRENDETV_APP_PAGE = 'https://app.prende.tv/';

/**
 * Represent the prende tv blog page
 * @type {string}
 */
export const PRENDE_TV_BLOG = '/blog';

/**
 * Represent the prende tv landing page
 * @type {string}
 */
export const PRENDE_TV_LANDING = '/';

/**
 * Represent the prende tv landing page english
 * @type {string}
 */
export const PRENDE_TV_LANDING_ENGLISH = '/en';

/**
 * Represent the prende tv business page
 * @type {string}
 */
export const PRENDE_TV_PARTNERS = '/business';

/**
 * Represent the prende tv press page
 * @type {string}
 */
export const PRENDE_TV_PRESS = '/press';

/**
 * Represent the prende tv press page - news datasource page
 * @type {string}
 */
export const PRENDE_TV_PRESS_NEWS_DATASOURCE = '/prendetv/press-news';

/**
 * Represent the prende tv support page
 * @type {string}
 */
export const PRENDE_TV_FAQ = '/faq';

/**
 * Represent the prende tv beta program
 * @type {string}
 */
export const PRENDE_TV_BETA = '/beta';

/**
 * Represent the prende tv support email
 * @type {string}
 */
export const PRENDE_TV_SUPPORT_EMAIL = 'support@prende.tv';

/**
 * PrendeTV contact page
 * @type {string}
 */
export const PRENDE_TV_CONTACT = '/contact';

/**
 * Represent the languages supported.
 * @type {array}
 */
export const LANGUAGES_SUPPORTED = [languages.ES, languages.EN];

/**
 * Represent the default language to load.
 * @type {string}
 */
export const DEFAULT_LANGUAGE = languages.ES;

/**
 * Represent the key for local storage
 * @type {string}
 */
export const LANGUAGE_KEY_STORAGE = 'prendetvLang';

/**
 * channels url
 * @type {string}
 */
const CHANNELS = `${PRENDETV_APP_PAGE}canales`;

/**
 * on demand url
 * @type {string}
 */
const ON_DEMAND = `${PRENDETV_APP_PAGE}on-demand`;

/**
 * Represent the event name for tracking
 * @type {string}
 */
export const TRACK_DATA = {
  legal: 'legal',
  business: 'business',
  press: 'press',
  blog: 'blog',
  termsPolicy: 'termsPolicy',
  personalInfo: 'personalInfo',
  termsOfUse: 'termsOfUse',
  support: 'support',
  productsServicesandPatents: 'productsServicesandPatents',
  appstore: 'iOS App Store Icon',
  firetv: 'Fire TV Store Icon',
  googleplay: 'Google Play Store Icon',
  roku: 'Roku Store Icon',
  adSpecs: 'adSpecs',
  liveTV: 'liveTV',
  onDemand: 'onDemand',
};

export const PRENDETV_COOKIE = 'prendeTvRedirect';

export const PRENDETV_LEGAL_LINKS = {
  termsPolicy: {
    key: TRACK_DATA.termsPolicy,
    target: '_blank',
    url: {
      en: 'https://www.univision.com/global/privacy-policy-en',
      es: 'https://www.univision.com/global/politica-de-privacidad',
    },
  },
  personalInfo: {
    key: TRACK_DATA.personalInfo,
    target: '_blank',
    url: {
      en: 'https://www.univision.com/notice-of-the-right-to-opt-out-of-the-sale-of-personal-information',
      es: 'https://www.univision.com/aviso-del-derecho-de-excluir-la-venta-de-informacion-personal',
    },
  },
  termsOfUse: {
    key: TRACK_DATA.termsOfUse,
    target: '_blank',
    url: {
      en: 'https://www.univision.com/openpage/2012-07-18/terms-of-service-and-privacy-en',
      es: 'https://www.univision.com/terminos-de-uso',
    },
  },
  productsServicesandPatents: {
    key: TRACK_DATA.productsServicesandPatents,
    target: '_blank',
    url: {
      en: 'https://www.univision.com/univision-products-services-and-patents',
      es: 'https://www.univision.com/productos-servicios-y-patentes-de-univision-1',
    },
  },
  adSpecs: {
    key: TRACK_DATA.adSpecs,
    target: '_blank',
    url: {
      en: 'https://static.univision.com/fragments/ads/UnivisionAdSpecs.pdf',
      es: 'https://static.univision.com/fragments/ads/UnivisionAdSpecs.pdf',
    },
  },
};

export const GTM = {
  id: 'GTM-T5DRRGL',
  title: 'gtm-prendetv',
};

/**
 * Represent the links to the other pages
 * @type {array}
 */
export const PRENDETV_LINKS = [
  {
    key: TRACK_DATA.press,
    target: '_self',
    url: PRENDE_TV_PRESS,
  },
  {
    key: TRACK_DATA.blog,
    target: '_self',
    url: PRENDE_TV_BLOG,
  },
  {
    key: TRACK_DATA.business,
    target: '_self',
    url: PRENDE_TV_PARTNERS,
  },
  {
    key: TRACK_DATA.support,
    target: '_self',
    url: PRENDE_TV_FAQ,
  },
];

/**
 * Represent the links to watch now options
 * @type {array}
 */
export const WATCH_NOW_LINKS = [
  {
    key: TRACK_DATA.liveTV,
    target: '_self',
    url: CHANNELS,
    icon: 'liveTv',
    size: 24,
    padding: '0 0 4px 0',
  },
  {
    key: TRACK_DATA.onDemand,
    target: '_self',
    url: ON_DEMAND,
    icon: 'playnocircle',
    size: 8,
    padding: '0 0 0 2px',
  },
];

export const PRODUCT_LINKS = {
  appstore: {
    alt: 'App Store',
    title: 'iOS App Store',
    image: {
      en: 'https://st1.uvnimg.com/62/9b/fef09f774c329251410c19fe1af9/applestore-eng-1.png',
      es: 'https://st1.uvnimg.com/59/ab/f8c6415c43d9b35a4b1835d13484/applestore-sp-1.png',
    },
    key: TRACK_DATA.appstore,
    target: '_blank',
    url: 'https://smart.link/8en70i3pekxku?site_id=prendetv&creative_id=header-footer',
  },
  googleplay: {
    alt: 'Google Play',
    title: 'Google Play',
    image: {
      en: 'https://st1.uvnimg.com/ab/44/3ea54e63484db2e93d4d9fb4bbf1/googleplay-eng-1.png',
      es: 'https://st1.uvnimg.com/1d/f3/489fc2884436b66556014da932ed/googleplay-sp-1.png',
    },
    key: TRACK_DATA.googleplay,
    target: '_blank',
    url: 'https://smart.link/zwqwu9h3k2xnd?site_id=prendetv&creative_id=header-footer',
  },
  firetv: {
    alt: 'Fire TV',
    title: 'FireTV',
    image: {
      en: 'https://st1.uvnimg.com/e6/23/d40da7224d8dbd3a046a7578bc03/firetv-eng-1.png',
      es: 'https://st1.uvnimg.com/25/7c/54862a1e411e98317a115532b468/firetv-sp-1.png',
    },
    key: TRACK_DATA.firetv,
    target: '_blank',
    url: 'https://smart.link/aqzopzrc49gql?site_id=prendetv&creative_id=header-footer',
  },
  roku: {
    alt: 'Roku',
    title: 'Roku',
    image: {
      en: 'https://st1.uvnimg.com/f9/45/37e474a24baa98a9bebb2e2d3d3f/roku-sp-1.png',
    },
    key: TRACK_DATA.roku,
    target: '_blank',
    url: 'https://smart.link/sbyhow81py1gp?site_id=prendetv&creative_id=header-footer',
  },
};

/**
 * Represent the salesforce type event message.
 *
 * @type {string}
 */
export const SALESFORCE_EVENT_TYPE = 'track_click_subscribe';

/**
 * PrendeTV Header Background - Desktop
 */
export const PRENDETV_HEADER_BACKGROUND_DESKTOP = 'https://st1.uvnimg.com/6d/f6/c75f2e3f4d8faa2ace96dc54a723/blog-header-desktop.png';

/**
 * PrendeTV Header Background - Mobile
 */
export const PRENDETV_HEADER_BACKGROUND_MOBILE = 'https://st1.uvnimg.com/44/70/a8ec88b745a091f5323de91dc239/blog-mobile.png';

/**
 * PrendeTV Header Background - Desktop - FAQ
 */
export const PRENDETV_HEADER_FAQ_BACKGROUND_DESKTOP = 'https://st1.uvnimg.com/9c/e6/854c3e3945bda8bdc7194313a823/prendetv-header-background-desktop.png';

/**
 * PrendeTV Header Background - Mobile - FAQ
 */
export const PRENDETV_HEADER_FAQ_BACKGROUND_MOBILE = 'https://st1.uvnimg.com/6d/c7/6d8e26cc45258fa1973aa7731c51/prendetv-header-background-mobile.png';

/**
 * PrendeTV Back to Top SVG
 */
export const PRENDETV_BACK_TO_TOP_SVG = 'https://st1.uvnimg.com/85/9e/ffcddcfd4745ab82b2e1a90d94a1/back-to-top.svg';

/**
 * Layout information for Feature with headlines
 * @type {object}
 */
export const FLAVORS = {
  CORAL: {
    backgroundColor: NERO,
    headlineBackgroundColor: WHITE,
    title: BITTERSWEET,
    text: BITTERSWEET,
  },
  BLACK: {
    backgroundColor: BLACK,
    headlineBackgroundColor: BLACK,
    title: BITTERSWEET,
    text: WHITE,
  },
  DARK: {
    backgroundColor: NERO,
    headlineBackgroundColor: NERO,
    title: BITTERSWEET,
    text: WHITE,
  },
  LIGHT: {
    backgroundColor: WHITE,
    headlineBackgroundColor: WHITE,
    title: BITTERSWEET,
    text: BLACK,
  },
  'CORAL TO WHITE': {
    backgroundColor: BITTERSWEET,
    headlineBackgroundColor: BITTERSWEET,
    title: WHITE,
    text: WHITE,
  },
};
