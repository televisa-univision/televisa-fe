import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import LazyLoad from 'react-lazyload';
import Features from '@univision/fe-commons/dist/config/features';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import VerticalSlideshow from './VerticalSlideshowWrapper';
import Styles from './VerticalSlideshowWrapper.scss';

jest.mock('@univision/fe-commons/dist/utils/helpers/appVersion', () => () => false);

/* globals jsdom */

jest.mock('react-lazyload', () => jest.fn(c => c.children));

/** @test {VerticalSlideshow} */
describe('VerticalSlideshowWrapper', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  /**
   * Get slide data by id
   * @param {string} id id
   * @returns {Function}
   */
  const getSlideItem = id => ({
    caption: 'test',
    content: {
      type: 'image',
      uid: `${id}123`,
      renditions: {
        original: { href: id },
      },
    },
  });

  const defaultSlide = [
    {
      caption: 'test',
      content: {
        type: 'image',
        uid: '123',
        credit: 'aaa',
        renditions: {
          original: { href: '123' },
        },
      },
    },
    {
      uid: '00000173-34df-d299-a377-feffcbc50000',
      caption: 'Un joven continuamente crítica y menosprecia a una de sus compañeras y junto con un amigo planean humillarla. Al mismo tiempo, el joven tiene que lidiar con un padre machista que cree que es homosexual.',
      credit: null,
      content: {
        type: 'video',
        uid: '00000173-34df-d299-a377-feffcbc50000',
        uri: 'https://performance.univision.com/local/los-angeles-kmex/shows/como-dice-el-dicho/como-dice-el-dicho-la-envidia-dice-el-autor-es-martillo-destructor-video',
        vertical: 'Entretenimiento',
        parent: {
          uuid: '00000147-f447-d2f9-a347-f44fef360000',
          uri: 'https://performance.univision.com/shows/como-dice-el-dicho',
          name: 'como dice el dicho',
          title: 'Como Dice el Dicho',
        },
        title: "Como Dice el Dicho - 'La envidia dice el autor, es martillo destructor'",
        description: 'Un joven continuamente crítica y menosprecia a una de sus compañeras y junto con un amigo planean humillarla. Al mismo tiempo, el joven tiene que lidiar con un padre machista que cree que es homosexual.',
        image: {
          type: 'image',
          uid: '00000173-34e2-d6d2-a973-7eef4fa00000',
          title: '54f673d6c7f3419ca65f0ee55c34ec8d',
          caption: null,
          credit: null,
          renditions: {
            original: {
              href: 'https://st1.uvnimg.com/ea/86/1fa951954c3bb21e4ea2c2d65976/54f673d6c7f3419ca65f0ee55c34ec8d',
              width: 1920,
              height: 1080,
            },
            '16x9-med': {
              href: 'https://cdn1.performance.univision.com/dims4/default/b25debb/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fea%2F86%2F1fa951954c3bb21e4ea2c2d65976%2Fresizes%2F500%2F54f673d6c7f3419ca65f0ee55c34ec8d',
              width: 400,
              height: 225,
            },
            '16x9': {
              href: 'https://cdn1.performance.univision.com/dims4/default/683348a/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fea%2F86%2F1fa951954c3bb21e4ea2c2d65976%2Fresizes%2F1500%2F54f673d6c7f3419ca65f0ee55c34ec8d',
              width: 1240,
              height: 698,
            },
            '16x9-mobile': {
              href: 'https://cdn1.performance.univision.com/dims4/default/a43dd8b/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fea%2F86%2F1fa951954c3bb21e4ea2c2d65976%2Fresizes%2F500%2F54f673d6c7f3419ca65f0ee55c34ec8d',
              width: 480,
              height: 270,
            },
            '16x9-sm': {
              href: 'https://cdn1.performance.univision.com/dims4/default/e0aa3a9/2147483647/thumbnail/246x138/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fea%2F86%2F1fa951954c3bb21e4ea2c2d65976%2Fresizes%2F500%2F54f673d6c7f3419ca65f0ee55c34ec8d',
              width: 246,
              height: 138,
            },
            '16x9-tablet': {
              href: 'https://cdn1.performance.univision.com/dims4/default/70ee775/2147483647/thumbnail/1024x576%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fea%2F86%2F1fa951954c3bb21e4ea2c2d65976%2Fresizes%2F1500%2F54f673d6c7f3419ca65f0ee55c34ec8d',
              width: 1024,
              height: 576,
            },
            '16x9-extended': {
              href: 'https://cdn1.performance.univision.com/dims4/default/27d67a5/2147483647/thumbnail/1440x810/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fea%2F86%2F1fa951954c3bb21e4ea2c2d65976%2Fresizes%2F1500%2F54f673d6c7f3419ca65f0ee55c34ec8d',
              width: 1440,
              height: 810,
            },
            '16x9-loading': {
              href: 'https://cdn1.performance.univision.com/dims4/default/48a8819/2147483647/thumbnail/30x17/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fea%2F86%2F1fa951954c3bb21e4ea2c2d65976%2Fresizes%2F500%2F54f673d6c7f3419ca65f0ee55c34ec8d',
              width: 30,
              height: 17,
            },
          },
        },
        authors: [],
        cardLabel: 'NUEVO',
        updateDate: '2020-07-11T00:00:52-04:00',
        publishDate: '2020-07-11T00:00:00-04:00',
        expirationDate: '2020-10-07T00:00:00-04:00',
        hierarchy: [
          {
            uuid: '00000153-860f-dd44-afd7-f67fc3280012',
            uri: 'https://performance.univision.com/shows',
            name: 'shows',
            title: 'Shows',
          },
          {
            uuid: '00000147-f447-d2f9-a347-f44fef360000',
            uri: 'https://performance.univision.com/shows/como-dice-el-dicho',
            name: 'como dice el dicho',
            title: 'Como Dice el Dicho',
          },
        ],
        contentPriority: 'STANDARD',
        tvStation: {
          type: 'tvstation',
          uid: '0000014d-070d-ddc6-a5dd-179f207d0000',
          uri: 'https://performance.univision.com/local/los-angeles-kmex',
          vertical: null,
          parent: null,
          title: 'Univision 34 Los Angeles',
          description: 'Noticias locales, estado del tiempo, resultados de la lotería, horóscopos y mucho más en Los Angeles',
          image: {
            type: 'image',
            uid: '0000014c-9ee5-d8b4-ab7c-fef5363e0000',
            title: 'KMEX Univision 3 Los Ángeles',
            caption: 'KMEX Univision 3 Los Ángeles',
            credit: 'Univision 34',
            renditions: {
              original: {
                href: 'https://st1.uvnimg.com/b4/eb/cd4db9b2464aa05faec538cd84ed/e71289572ec1476cb90b58ce96881b48',
                width: 323,
                height: 216,
              },
              '16x9-med': {
                href: 'https://cdn1.performance.univision.com/dims4/default/a391f59/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fb4%2Feb%2Fcd4db9b2464aa05faec538cd84ed%2Fe71289572ec1476cb90b58ce96881b48',
                width: 400,
                height: 225,
              },
              '16x9': {
                href: 'https://cdn1.performance.univision.com/dims4/default/ad0e286/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fb4%2Feb%2Fcd4db9b2464aa05faec538cd84ed%2Fe71289572ec1476cb90b58ce96881b48',
                width: 1240,
                height: 698,
              },
              '16x9-mobile': {
                href: 'https://cdn1.performance.univision.com/dims4/default/1feae32/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fb4%2Feb%2Fcd4db9b2464aa05faec538cd84ed%2Fe71289572ec1476cb90b58ce96881b48',
                width: 480,
                height: 270,
              },
              '16x9-sm': {
                href: 'https://cdn1.performance.univision.com/dims4/default/c09846a/2147483647/thumbnail/246x138/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fb4%2Feb%2Fcd4db9b2464aa05faec538cd84ed%2Fe71289572ec1476cb90b58ce96881b48',
                width: 246,
                height: 138,
              },
              '16x9-tablet': {
                href: 'https://cdn1.performance.univision.com/dims4/default/af3ada6/2147483647/thumbnail/1024x576%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fb4%2Feb%2Fcd4db9b2464aa05faec538cd84ed%2Fe71289572ec1476cb90b58ce96881b48',
                width: 1024,
                height: 576,
              },
              '16x9-extended': {
                href: 'https://cdn1.performance.univision.com/dims4/default/ddbc279/2147483647/thumbnail/1440x810/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fb4%2Feb%2Fcd4db9b2464aa05faec538cd84ed%2Fe71289572ec1476cb90b58ce96881b48',
                width: 1440,
                height: 810,
              },
              '16x9-loading': {
                href: 'https://cdn1.performance.univision.com/dims4/default/e028466/2147483647/thumbnail/30x17/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fb4%2Feb%2Fcd4db9b2464aa05faec538cd84ed%2Fe71289572ec1476cb90b58ce96881b48',
                width: 30,
                height: 17,
              },
            },
          },
          authors: [],
          cardLabel: null,
          updateDate: '2020-07-09T22:46:08-04:00',
          publishDate: '2015-11-27T18:46:00-05:00',
          expirationDate: '3000-01-01T00:00:00-05:00',
          hierarchy: [],
          call: 'KMEX',
          logo: {
            type: 'image',
            uid: '0000016c-91a6-d0c4-a9ee-b9eea4830000',
            title: '02_SLATE_PROMO_TV_LA.jpg',
            caption: null,
            credit: null,
            renditions: {
              original: {
                href: 'https://st1.uvnimg.com/12/69/f1a1ba544838a63f97365c47a87e/02-slate-promo-tv-la.jpg',
                width: 1920,
                height: 1080,
              },
              '16x9-med': {
                href: 'https://cdn1.performance.univision.com/dims4/default/0871e60/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F12%2F69%2Ff1a1ba544838a63f97365c47a87e%2Fresizes%2F500%2F02-slate-promo-tv-la.jpg',
                width: 400,
                height: 225,
              },
              '16x9': {
                href: 'https://cdn1.performance.univision.com/dims4/default/ea8c885/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F12%2F69%2Ff1a1ba544838a63f97365c47a87e%2Fresizes%2F1500%2F02-slate-promo-tv-la.jpg',
                width: 1240,
                height: 698,
              },
              '16x9-mobile': {
                href: 'https://cdn1.performance.univision.com/dims4/default/0ec0877/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F12%2F69%2Ff1a1ba544838a63f97365c47a87e%2Fresizes%2F500%2F02-slate-promo-tv-la.jpg',
                width: 480,
                height: 270,
              },
              '16x9-sm': {
                href: 'https://cdn1.performance.univision.com/dims4/default/040a316/2147483647/thumbnail/246x138/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F12%2F69%2Ff1a1ba544838a63f97365c47a87e%2Fresizes%2F500%2F02-slate-promo-tv-la.jpg',
                width: 246,
                height: 138,
              },
              '16x9-tablet': {
                href: 'https://cdn1.performance.univision.com/dims4/default/0ffe48d/2147483647/thumbnail/1024x576%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F12%2F69%2Ff1a1ba544838a63f97365c47a87e%2Fresizes%2F1500%2F02-slate-promo-tv-la.jpg',
                width: 1024,
                height: 576,
              },
              '16x9-extended': {
                href: 'https://cdn1.performance.univision.com/dims4/default/6e7fe88/2147483647/thumbnail/1440x810/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F12%2F69%2Ff1a1ba544838a63f97365c47a87e%2Fresizes%2F1500%2F02-slate-promo-tv-la.jpg',
                width: 1440,
                height: 810,
              },
              '16x9-loading': {
                href: 'https://cdn1.performance.univision.com/dims4/default/4fa8e72/2147483647/thumbnail/30x17/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F12%2F69%2Ff1a1ba544838a63f97365c47a87e%2Fresizes%2F500%2F02-slate-promo-tv-la.jpg',
                width: 30,
                height: 17,
              },
            },
          },
          alternativeLogo: {
            type: null,
            uid: null,
            title: null,
            caption: null,
            credit: null,
            renditions: null,
          },
          localMarket: {
            title: 'Los Angeles',
            zipCodes: [
              '90034',
            ],
          },
          localMarketFooter: {
            title: 'PÁGINAS DE LOS ÁNGELES',
            links: [
              {
                href: 'https://st1.uvnimg.com/e4/f8/838624a94910aa38d04d2a200c70/los-angeles-tv-radio-eeo-public-file-report-8-1-18-through-7-31-19-final.pdf',
                target: '_blank',
                text: 'Univision LA EEO Report',
                uid: '00000168-8769-dbde-ade8-efffe7cc0000',
              },
              {
                href: 'https://publicfiles.fcc.gov/tv-profile/kmex-dt',
                target: '_blank',
                text: 'Univision 34 LA Public File',
                uid: '00000168-8769-dbde-ade8-efffe7cc0001',
              },
              {
                href: 'https://publicfiles.fcc.gov/fm-profile/klve',
                target: '_blank',
                text: 'Online Public File KLVE',
                uid: '00000168-8769-dbde-ade8-efffe7cc0002',
              },
              {
                href: 'https://publicfiles.fcc.gov/am-profile/ktnq',
                target: '_blank',
                text: 'Online Public File KTNQ (AM)',
                uid: '00000168-8769-dbde-ade8-efffe7cc0003',
              },
              {
                href: 'https://publicfiles.fcc.gov/fm-profile/ksca',
                target: '_blank',
                text: 'Online Public File KSCA',
                uid: '00000168-8769-dbde-ade8-efffe7cc0004',
              },
              {
                href: 'https://publicfiles.fcc.gov/fm-profile/krcv',
                target: '_blank',
                text: 'Online Public File KRCV',
                uid: '00000168-8769-dbde-ade8-efffe7cc0005',
              },
              {
                href: 'https://publicfiles.fcc.gov/fm-profile/krcd',
                target: '_blank',
                text: 'Online Public File KRCD',
                uid: '00000168-8769-dbde-ade8-efffe7cc0006',
              },
              {
                href: 'https://www.univision.com/los-angeles/kmex/univision-y-unimas-aviso-del-servicio-de-subtitulos-closed-captioning',
                target: '_blank',
                text: 'Aviso de subtítulos e información para personas con discapacidad',
                uid: '00000168-8769-dbde-ade8-efffe7cc0007',
              },
              {
                href: 'https://www.univision.com/los-angeles/kmex/somos-univision-34-los-angeles',
                target: '_blank',
                text: 'Somos Univision 34, Los Angeles',
                uid: '00000168-8769-dbde-ade8-efffe7cc0008',
              },
            ],
          },
          contact: {
            aboutStation: 'https://performance.univision.com/local/los-angeles-kmex/los-angeles/kmex/somos-univision-34-los-angeles',
          },
        },
        adSettings: {
          disable3rdPartyAds: false,
          disableAds: false,
          adTagValue: 'video_local/tv/losangeles/kmex',
          targeting: {
            vertical: 'entretenimiento',
            tag: [
              'michaelronda',
              'wendygonzalez',
              'sergiocorona',
            ],
          },
          contentSpecificSettings: {},
        },
        tracking: {
          analytics: {
            data: {
              adtag_value: 'video_local/tv/losangeles/kmex',
              all_tags: [
                'michael ronda',
                'wendy gonzalez',
                'sergio corona',
              ],
              brand: 'univision 34 los angeles',
              brand_market: 'los angeles',
              brand_station_call_letters: 'kmex',
              brand_station_name: 'univision 34 los angeles',
              brand_station_type: 'tvstation',
              canonical_url: 'https://performance.univision.com/shows/como-dice-el-dicho/como-dice-el-dicho-la-envidia-dice-el-autor-es-martillo-destructor-video',
              content_author: '',
              publish_user: 'publish user',
              content_created_date: '2020-07-11',
              content_id: '00000173-34df-d299-a377-feffcbc50000',
              content_modified_date: '2020-07-11',
              content_priority: 'standard',
              content_type: 'video',
              content_vertical: 'local',
              environment_name: 'qa',
              mvpd_auth_required: 'false',
              nielsenVcid: 'c04',
              permalink: 'https://performance.univision.com/local/los-angeles-kmex/shows/como-dice-el-dicho/como-dice-el-dicho-la-envidia-dice-el-autor-es-martillo-destructor-video',
              platform: 'website',
              section_full_hierarchy: [
                'shows',
                'como dice el dicho',
              ],
              section_level1: 'shows',
              section_level2: 'como dice el dicho',
              seo_optimized: 'true',
              show_type: 'series',
              title: "como dice el dicho - 'la envidia dice el autor, es martillo destructor'",
              uci_division: 'entertainment',
              video_id: '3879818',
              video_length: '2519',
              video_length_group: '30-60m',
              video_type: 'longform',
            },
          },
          nielsen: {
            appId: 'PDB44FE12-8611-4D9B-8C88-18023F94B474',
            vcid: 'c04',
            environment: 'qa',
            primaryTopic: 'Shows',
          },
        },
        analyticsData: {
          apps: {
            common: {
              adtag_value: 'video_local/tv/losangeles/kmex',
              all_tags: [
                'michael ronda',
                'wendy gonzalez',
                'sergio corona',
              ],
              brand_station_call_letters: 'kmex',
              content_created_date: '2020-07-11',
              content_id: '00000173-34df-d299-a377-feffcbc50000',
              content_type: 'video',
              section: 'como dice el dicho',
              section_full_hierarchy: [
                'shows',
                'como dice el dicho',
              ],
              section_level1: 'shows',
              section_level2: 'como dice el dicho',
              show_type: 'series',
              title: "como dice el dicho - 'la envidia dice el autor, es martillo destructor'",
            },
            contentSpecific: {
              mvpd_auth_required: 'false',
              video_id: '3879818',
              video_length: '2519',
              video_length_group: '30-60m',
              video_title: "como dice el dicho - 'la envidia dice el autor, es martillo destructor'",
              video_type: 'longform',
            },
            nielsen: {
              common: {
                assetid: '00000173-34df-d299-a377-feffcbc50000',
                section: 'video',
                segB: 'noticias',
                type: 'static',
                vcid: 'c04',
              },
              contentSpecific: {
                adloadtype: '2',
                assetid: '3879818',
                crossId1: 'ep013814960746',
                isfullepisode: 'y',
                length: '2519',
                program: 'Como Dice el Dicho',
                segB: 'noticias',
                title: "como dice el dicho - 'la envidia dice el autor, es martillo destructor'",
                type: 'content',
                vcid: 'c04',
              },
            },
          },
          web: {
            common: {
              adtag_value: 'video_local/tv/losangeles/kmex',
              all_tags: [
                'michael ronda',
                'wendy gonzalez',
                'sergio corona',
              ],
              brand_market: 'los angeles',
              brand_station_call_letters: 'kmex',
              brand_station_name: 'univision 34 los angeles',
              brand_station_type: 'tvstation',
              content_created_date: '2020-07-11',
              content_id: '00000173-34df-d299-a377-feffcbc50000',
              content_modified_date: '2020-07-11',
              content_type: 'video',
              content_vertical: 'local',
              permalink: 'https://performance.univision.com/shows/como-dice-el-dicho/como-dice-el-dicho-la-envidia-dice-el-autor-es-martillo-destructor-video',
              platform: 'website',
              section: 'como dice el dicho',
              section_full_hierarchy: [
                'shows',
                'como dice el dicho',
              ],
              section_level1: 'shows',
              section_level2: 'como dice el dicho',
              seo_focus_keyword: 'not defined',
              seo_optimized: 18,
              show_type: 'series',
              title: "como dice el dicho - 'la envidia dice el autor, es martillo destructor'",
              uci_division: 'entertainment',
            },
            contentSpecific: {
              mvpd_auth_required: 'false',
              video_id: '3879818',
              video_length: '2519',
              video_length_group: '30-60m',
              video_title: "como dice el dicho - 'la envidia dice el autor, es martillo destructor'",
              video_type: 'longform',
            },
            nielsen: {
              common: {
                assetid: '00000173-34df-d299-a377-feffcbc50000',
                section: 'video',
                segB: 'noticias',
                type: 'static',
                vcid: 'c04',
              },
              contentSpecific: {
                adloadtype: '2',
                assetid: '3879818',
                crossId1: 'ep013814960746',
                isfullepisode: 'y',
                length: '2519',
                program: 'Como Dice el Dicho',
                segB: 'noticias',
                title: "como dice el dicho - 'la envidia dice el autor, es martillo destructor'",
                type: 'content',
                vcid: 'c04',
              },
            },
          },
        },
        metaTagData: {
          openGraph: {
            type: null,
            title: "Como Dice el Dicho - 'La envidia dice el autor, es martillo destructor'",
            description: 'Un joven continuamente crítica y menosprecia a una de sus compañeras y junto con un amigo planean humillarla. Al mismo tiempo, el joven tiene que lidiar con un padre machista que cree que es homosexual.',
            imageUrl: 'https://cdn1.performance.univision.com/dims4/default/356a7a8/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fea%2F86%2F1fa951954c3bb21e4ea2c2d65976%2F54f673d6c7f3419ca65f0ee55c34ec8d',
            url: 'https://performance.univision.com/local/los-angeles-kmex/shows/como-dice-el-dicho/como-dice-el-dicho-la-envidia-dice-el-autor-es-martillo-destructor-video',
            siteName: 'Univision',
          },
          twitter: {
            card: 'summary_large_image',
            title: "Como Dice el Dicho - 'La envidia dice el autor, es martillo destructor'",
            description: 'Un joven continuamente crítica y menosprecia a una de sus compañeras y junto con un amigo planean humillarla. Al mismo tiempo, el joven tiene que lidiar con un padre machista que cree que es homosexual.',
            creator: null,
            imageUrl: 'https://cdn1.performance.univision.com/dims4/default/356a7a8/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fea%2F86%2F1fa951954c3bb21e4ea2c2d65976%2F54f673d6c7f3419ca65f0ee55c34ec8d',
          },
          facebook: {
            pages: null,
          },
        },
        seo: {
          title: "Como Dice el Dicho - 'La envidia dice el autor, es martillo destructor' | Series Como Dice el Dicho | Univision",
          description: 'Un joven continuamente crítica y menosprecia a una de sus compañeras y junto con un amigo planean humillarla. Al mismo tiempo, el joven tiene que lidiar con un padre machista que cree que es homosexual. | Series Como Dice el Dicho | Univision',
          canonicalUrl: 'https://performance.univision.com/shows/como-dice-el-dicho/como-dice-el-dicho-la-envidia-dice-el-autor-es-martillo-destructor-video',
          keywords: [
            'Michael Ronda',
            'Café el Dicho.',
            'Como Dice el Dicho - La envidia dice el autor es martillo destructor',
            'mensajes de sabiduria',
            'refránes',
            'Wendy González',
            'inspiradoras historias',
            'series',
            'Sergio Corona',
            'temas aplicables a la vida real',
            'Como Dice El Dicho',
          ],
          robots: [],
          ld_json: null,
          news_keywords: [],
        },
        externalWidgets: {
          civicScience: null,
          calReply: {
            href: null,
            code: null,
          },
        },
        widgets: [],
        source: 'Univision',
        sharing: {
          options: {
            facebook: {
              url: 'http://uni.vi/96cF102iw8F',
              isFeedDialog: false,
              title: "Como Dice el Dicho - 'La envidia dice el autor, es martillo destructor'",
              description: 'Un joven continuamente crítica y menosprecia a una de sus compañeras y junto con un amigo planean humillarla. Al mismo tiempo, el joven tiene que lidiar con un padre machista que cree que es homosexual.',
              imageUrl: 'https://st1.uvnimg.com/ea/86/1fa951954c3bb21e4ea2c2d65976/54f673d6c7f3419ca65f0ee55c34ec8d',
              appId: '645138725541385',
            },
            twitter: {
              url: 'http://uni.vi/96cF102iw8F',
              title: "Como Dice el Dicho - 'La envidia dice el autor, es martillo destructor'",
              via: 'Univision34LA',
            },
            whatsapp: {
              url: 'http://uni.vi/96cF102iw8F',
              message: "Como Dice el Dicho - 'La envidia dice el autor, es martillo destructor'",
            },
            mail: {
              subject: "Como Dice el Dicho - 'La envidia dice el autor, es martillo destructor'",
              body: "Un amigo te ha recomendado este contenido que puede ser de tu interés.\n\nComo Dice el Dicho - 'La envidia dice el autor, es martillo destructor'\n\nEncuéntralo en este enlace:http://uni.vi/96cF102iw8F\n\nVisítanos https://www.univision.com",
            },
          },
        },
        secondaryTags: [
          {
            name: 'Michael Ronda',
            link: 'https://performance.univision.com/temas/michael-ronda',
          },
          {
            name: 'Wendy González',
            link: 'https://performance.univision.com/temas/wendy-gonzalez',
          },
          {
            name: 'Sergio Corona',
            link: 'https://performance.univision.com/temas/sergio-corona',
          },
        ],
        globalWidgets: [],
        mcpid: '3892225',
        durationString: '41:59',
        episodeNo: null,
        authRequired: false,
        longform: true,
        longformPlayList: true,
        hasNextEpisode: true,
        previewUrl: null,
        categories: [
          'Drama',
        ],
        width: 1920,
        height: 1080,
        hasCustomPlaylist: false,
        jwRecommendationChannel: '78MDrZDv',
        dynamicPlaylist: false,
        videoPlaylist: [],
        captions: [
          {
            begin: '00:00:06:03',
            end: '00:00:07:10',
            content: 'Locutor: Televisa presenta...',
          },
          {
            begin: '00:01:39:20',
            end: '00:01:40:19',
            content: '[Timbre]',
          },
          {
            begin: '00:01:45:02',
            end: '00:01:47:08',
            content: 'Fabián: [Piensa] Todos son',
          },
          {
            begin: '00:01:45:02',
            end: '00:01:47:08',
            content: 'superestúpidos.',
          },
          {
            begin: '00:01:47:08',
            end: '00:01:49:20',
            content: '¿Quién se emociona',
          },
          {
            begin: '00:01:47:08',
            end: '00:01:49:20',
            content: 'por terminar la prepa?',
          },
          {
            begin: '00:01:49:20',
            end: '00:01:56:19',
            content: 'Ni que fuera un doctorado',
          },
          {
            begin: '00:01:49:20',
            end: '00:01:56:19',
            content: 'en física nuclear.',
          },
          {
            begin: '00:01:56:19',
            end: '00:01:58:27',
            content: 'Leticia: A ver, a ver, entonces',
          },
          {
            begin: '00:01:56:19',
            end: '00:01:58:27',
            content: '¿ya votamos en dónde',
          },
          {
            begin: '00:01:58:27',
            end: '00:02:01:25',
            content: 'va a ser la fiesta?',
          },
          {
            begin: '00:01:58:27',
            end: '00:02:01:25',
            content: 'Perro: Tranquila,',
          },
          {
            begin: '00:02:01:25',
            end: '00:02:04:04',
            content: 'maestra Leticia,',
          },
          {
            begin: '00:02:01:25',
            end: '00:02:04:04',
            content: 'que le va a dar un aire perro',
          },
          {
            begin: '00:02:04:04',
            end: '00:02:07:25',
            content: 'si no deja de hacer corajes.',
          },
          {
            begin: '00:02:04:04',
            end: '00:02:07:25',
            content: 'Leticia: Ay, Perrito.',
          },
          {
            begin: '00:02:07:25',
            end: '00:02:09:13',
            content: 'Mira, tú sigue',
          },
          {
            begin: '00:02:07:25',
            end: '00:02:09:13',
            content: 'engañando a tus papás',
          },
          {
            begin: '00:02:09:13',
            end: '00:02:12:29',
            content: 'fingiendo que estudias.',
          },
          {
            begin: '00:02:09:13',
            end: '00:02:12:29',
            content: 'Como vas, dudo que te gradúes.',
          },
          {
            begin: '00:02:12:29',
            end: '00:02:16:11',
            content: 'Perro: "Sorry", se me olvidó',
          },
          {
            begin: '00:02:12:29',
            end: '00:02:16:11',
            content: 'que eras doña perfecta.',
          },
          {
            begin: '00:02:16:11',
            end: '00:02:20:28',
            content: 'Los dejo con su domadora.',
          },
          {
            begin: '00:02:16:11',
            end: '00:02:20:28',
            content: 'Leticia: Bueno, ya que se fue',
          },
          {
            begin: '00:02:20:28',
            end: '00:02:22:19',
            content: 'el "hater" mayor,',
          },
          {
            begin: '00:02:20:28',
            end: '00:02:22:19',
            content: 'ya podemos decidir en dónde,',
          },
          {
            begin: '00:02:22:19',
            end: '00:02:28:19',
            content: '¿no?',
          },
          {
            begin: '00:02:22:19',
            end: '00:02:28:19',
            content: '¿Qué opinan? ¿Sí?',
          },
          {
            begin: '00:02:28:19',
            end: '00:02:31:29',
            content: 'Fabián: [Piensa] Esa es la reina',
          },
          {
            begin: '00:02:28:19',
            end: '00:02:31:29',
            content: 'de las estúpidas.',
          },
          {
            begin: '00:02:31:29',
            end: '00:02:35:13',
            content: 'El Perro tiene toda la razón.',
          },
          {
            begin: '00:02:31:29',
            end: '00:02:35:13',
            content: 'La ven como si fuera una diosa,',
          },
          {
            begin: '00:02:35:13',
            end: '00:02:40:11',
            content: 'pero no es más que una idiota.',
          },
          {
            begin: '00:02:35:13',
            end: '00:02:40:11',
            content: 'Yo se los voy a demostrar.',
          },
          {
            begin: '00:02:40:11',
            end: '00:02:52:28',
            content: 'Leticia: ¿Alguien opina',
          },
          {
            begin: '00:02:40:11',
            end: '00:02:52:28',
            content: 'algo diferente?',
          },
          {
            begin: '00:02:52:28',
            end: '00:02:57:10',
            content: 'Fabián: ¿Qué onda?',
          },
          {
            begin: '00:02:52:28',
            end: '00:02:57:10',
            content: 'Perro: ¿Y tú qué quieres o qué?',
          },
          {
            begin: '00:02:57:10',
            end: '00:03:02:09',
            content: 'Fabián: Pues, lo mismo que tú.',
          },
          {
            begin: '00:02:57:10',
            end: '00:03:02:09',
            content: 'Perro: ¿Ya te volviste loco',
          },
          {
            begin: '00:03:02:09',
            end: '00:03:04:07',
            content: 'o qué, nerdcito?',
          },
          {
            begin: '00:03:02:09',
            end: '00:03:04:07',
            content: 'Fabián: Pues, mira,',
          },
          {
            begin: '00:03:04:07',
            end: '00:03:05:19',
            content: 'seré un nerdcito',
          },
          {
            begin: '00:03:04:07',
            end: '00:03:05:19',
            content: 'y lo que quieras,',
          },
          {
            begin: '00:03:05:19',
            end: '00:03:07:13',
            content: 'pero no soy una pesada',
          },
          {
            begin: '00:03:05:19',
            end: '00:03:07:13',
            content: 'como Leticia,',
          },
          {
            begin: '00:03:07:13',
            end: '00:03:09:09',
            content: 'que siempre se siente',
          },
          {
            begin: '00:03:07:13',
            end: '00:03:09:09',
            content: 'mejor que todos los demás',
          },
          {
            begin: '00:03:09:09',
            end: '00:03:15:18',
            content: 'y, pues, hoy hasta a ti te tocó.',
          },
          {
            begin: '00:03:09:09',
            end: '00:03:15:18',
            content: 'Perro: No tiene caso',
          },
          {
            begin: '00:03:15:18',
            end: '00:03:19:13',
            content: 'amargarse por esa loca.',
          },
          {
            begin: '00:03:15:18',
            end: '00:03:19:13',
            content: 'Fabián: Pues, mira, esa loca',
          },
          {
            begin: '00:03:19:13',
            end: '00:03:23:00',
            content: 'te hizo pasar una vergüenza hoy.',
          },
          {
            begin: '00:03:19:13',
            end: '00:03:23:00',
            content: 'Dime, Perro, ¿no te gustaría',
          },
          {
            begin: '00:03:23:00',
            end: '00:03:24:16',
            content: 'vengarte de ella?',
          },
          {
            begin: '00:03:30:06',
            end: '00:03:32:07',
            content: '>> Hola.',
          },
          {
            begin: '00:03:30:06',
            end: '00:03:32:07',
            content: 'Leticia: Hola, mamá.',
          },
          {
            begin: '00:03:32:07',
            end: '00:03:34:27',
            content: '>> ¿Y esa sonrisita?',
          },
          {
            begin: '00:03:32:07',
            end: '00:03:34:27',
            content: 'Leticia: Ay,',
          },
          {
            begin: '00:03:34:27',
            end: '00:03:37:13',
            content: 'adivina quién se inscribió',
          },
          {
            begin: '00:03:34:27',
            end: '00:03:37:13',
            content: 'en la convocatoria de la beca',
          },
          {
            begin: '00:03:37:13',
            end: '00:03:39:12',
            content: 'de la universidad.',
          },
          {
            begin: '00:03:37:13',
            end: '00:03:39:12',
            content: '>> ¿De verdad?',
          },
          {
            begin: '00:03:39:12',
            end: '00:03:41:18',
            content: 'Leticia: Sí.',
          },
          {
            begin: '00:03:39:12',
            end: '00:03:41:18',
            content: '>> ¡Ay, Leti!',
          },
          {
            begin: '00:03:41:18',
            end: '00:03:44:03',
            content: 'Felicidades, mi amor.',
          },
          {
            begin: '00:03:41:18',
            end: '00:03:44:03',
            content: 'Mira, mi amor,',
          },
          {
            begin: '00:03:44:03',
            end: '00:03:46:04',
            content: 'yo sé que yo te estuve',
          },
          {
            begin: '00:03:44:03',
            end: '00:03:46:04',
            content: 'presionando y presionando,',
          },
          {
            begin: '00:03:46:04',
            end: '00:03:48:21',
            content: 'pero ¿sabes qué?',
          },
          {
            begin: '00:03:46:04',
            end: '00:03:48:21',
            content: 'Siempre que tomes una decisión',
          },
          {
            begin: '00:03:48:21',
            end: '00:03:50:08',
            content: 'yo te voy a apoyar.',
          },
          {
            begin: '00:03:48:21',
            end: '00:03:50:08',
            content: 'Leticia: Ay, gracias.',
          },
          {
            begin: '00:03:50:08',
            end: '00:03:51:26',
            content: 'Es que no me animaba',
          },
          {
            begin: '00:03:50:08',
            end: '00:03:51:26',
            content: 'a inscribirme',
          },
          {
            begin: '00:03:51:26',
            end: '00:03:53:25',
            content: 'por miedo a fallarte.',
          },
          {
            begin: '00:03:51:26',
            end: '00:03:53:25',
            content: '>> ¿A fallarme?',
          },
          {
            begin: '00:03:53:25',
            end: '00:03:55:13',
            content: 'Leticia: Sí.',
          },
          {
            begin: '00:03:53:25',
            end: '00:03:55:13',
            content: '>> ¿A mí?',
          },
          {
            begin: '00:03:55:13',
            end: '00:03:57:04',
            content: 'Jamás.',
          },
          {
            begin: '00:03:55:13',
            end: '00:03:57:04',
            content: 'Sabes que la vida',
          },
          {
            begin: '00:03:57:04',
            end: '00:03:59:29',
            content: 'se trata de eso,',
          },
          {
            begin: '00:03:57:04',
            end: '00:03:59:29',
            content: 'intentar, fallar,',
          },
          {
            begin: '00:03:59:29',
            end: '00:04:02:17',
            content: 'volver a intentar.',
          },
          {
            begin: '00:03:59:29',
            end: '00:04:02:17',
            content: 'Pero mientras tú estás feliz,',
          },
          {
            begin: '00:04:02:17',
            end: '00:04:04:17',
            content: 'yo estoy feliz.',
          },
          {
            begin: '00:04:02:17',
            end: '00:04:04:17',
            content: 'Ay...',
          },
          {
            begin: '00:04:04:17',
            end: '00:04:06:12',
            content: 'Leticia: Gracias.',
          },
          {
            begin: '00:04:04:17',
            end: '00:04:06:12',
            content: '>> Mi amor, felicidades.',
          },
          {
            begin: '00:04:06:12',
            end: '00:04:09:21',
            content: 'Muchas felicidades.',
          },
          {
            begin: '00:04:06:12',
            end: '00:04:09:21',
            content: 'Ándale, vete a lavar las manos,',
          },
          {
            begin: '00:04:09:21',
            end: '00:04:11:26',
            content: 'porque--',
          },
          {
            begin: '00:04:09:21',
            end: '00:04:11:26',
            content: 'Ya, porque me pongo',
          },
          {
            begin: '00:04:11:26',
            end: '00:04:14:27',
            content: 'sentimental y...',
          },
          {
            begin: '00:04:11:26',
            end: '00:04:14:27',
            content: 'Leticia: Ay, mamá.',
          },
          {
            begin: '00:04:14:27',
            end: '00:04:17:16',
            content: '>> Ya creciste.',
          },
          {
            begin: '00:04:14:27',
            end: '00:04:17:16',
            content: 'Ándale, vete a lavar las manos.',
          },
          {
            begin: '00:04:17:16',
            end: '00:04:21:21',
            content: 'Leticia: Ya voy.',
          },
          {
            begin: '00:04:17:16',
            end: '00:04:21:21',
            content: '>> Ay, se va a la universidad,',
          },
          {
            begin: '00:04:21:21',
            end: '00:04:25:28',
            content: 'qué bueno.',
          },
          {
            begin: '00:04:21:21',
            end: '00:04:25:28',
            content: 'Perro: Qué buena recomendación,',
          },
          {
            begin: '00:04:25:28',
            end: '00:04:28:18',
            content: 'Fabiancito.',
          },
          {
            begin: '00:04:25:28',
            end: '00:04:28:18',
            content: 'Fabián: No la veas así.',
          },
          {
            begin: '00:04:28:18',
            end: '00:04:31:17',
            content: 'Le da clases a mi hermana.',
          },
          {
            begin: '00:04:28:18',
            end: '00:04:31:17',
            content: 'Perro: ¿Qué?',
          },
          {
            begin: '00:04:31:17',
            end: '00:04:36:01',
            content: '¿Tú crees que en algún mundo',
          },
          {
            begin: '00:04:31:17',
            end: '00:04:36:01',
            content: 'paralelo te haría caso o qué?',
          },
          {
            begin: '00:04:36:01',
            end: '00:04:38:03',
            content: 'Marieta: Hola, ¿ya saben',
          },
          {
            begin: '00:04:36:01',
            end: '00:04:38:03',
            content: 'qué van a pedir?',
          },
          {
            begin: '00:04:38:03',
            end: '00:04:41:16',
            content: 'Perro: Ay, si yo te dijera...',
          },
          {
            begin: '00:04:38:03',
            end: '00:04:41:16',
            content: '[Gruñe]',
          },
          {
            begin: '00:04:41:16',
            end: '00:04:45:27',
            content: 'Pero pues, ahorita me conformo',
          },
          {
            begin: '00:04:41:16',
            end: '00:04:45:27',
            content: 'con un sándwich de jamón de pavo',
          },
          {
            begin: '00:04:45:27',
            end: '00:04:48:05',
            content: 'y un licuado especial.',
          },
          {
            begin: '00:04:45:27',
            end: '00:04:48:05',
            content: 'Marieta: Claro.',
          },
          {
            begin: '00:04:48:05',
            end: '00:04:50:16',
            content: 'Fabián: Yo un licuado de avena.',
          },
          {
            begin: '00:04:48:05',
            end: '00:04:50:16',
            content: 'Marieta: Claro que sí.',
          },
          {
            begin: '00:04:50:16',
            end: '00:04:55:10',
            content: 'Entonces en seguida regreso.',
          },
          {
            begin: '00:04:50:16',
            end: '00:04:55:10',
            content: 'Con permiso.',
          },
          {
            begin: '00:04:55:10',
            end: '00:04:57:07',
            content: 'Perro: Bueno,',
          },
          {
            begin: '00:04:55:10',
            end: '00:04:57:07',
            content: '¿ahora sí me vas a decir',
          },
          {
            begin: '00:04:57:07',
            end: '00:04:59:00',
            content: 'qué plan malévolo traes',
          },
          {
            begin: '00:04:57:07',
            end: '00:04:59:00',
            content: 'contra Leti?',
          },
          {
            begin: '00:04:59:00',
            end: '00:05:01:08',
            content: 'Fabián: Mira, si te tuve',
          },
          {
            begin: '00:04:59:00',
            end: '00:05:01:08',
            content: 'la confianza de contarte,',
          },
          {
            begin: '00:05:01:08',
            end: '00:05:03:06',
            content: 'es porque no es la primera vez',
          },
          {
            begin: '00:05:01:08',
            end: '00:05:03:06',
            content: 'que te deja como payaso',
          },
          {
            begin: '00:05:03:06',
            end: '00:05:05:20',
            content: 'en frente de todos.',
          },
          {
            begin: '00:05:03:06',
            end: '00:05:05:20',
            content: 'Perro: Bueno, ¿y eso qué?',
          },
          {
            begin: '00:05:05:20',
            end: '00:05:07:05',
            content: 'O sea, sí me cae',
          },
          {
            begin: '00:05:05:20',
            end: '00:05:07:05',
            content: 'en la punta del hígado,',
          },
          {
            begin: '00:05:07:05',
            end: '00:05:10:03',
            content: 'pero a ti ni te ha dirigido',
          },
          {
            begin: '00:05:07:05',
            end: '00:05:10:03',
            content: 'la palabra.',
          },
          {
            begin: '00:05:10:03',
            end: '00:05:12:02',
            content: 'Fabián: Pues, es que no soporto',
          },
          {
            begin: '00:05:10:03',
            end: '00:05:12:02',
            content: 'a la gente que es creída,',
          },
          {
            begin: '00:05:12:02',
            end: '00:05:13:28',
            content: 'a la que todo le sale bien,',
          },
          {
            begin: '00:05:12:02',
            end: '00:05:13:28',
            content: 'a los que se sienten',
          },
          {
            begin: '00:05:13:28',
            end: '00:05:18:01',
            content: 'mejor que los demás,',
          },
          {
            begin: '00:05:13:28',
            end: '00:05:18:01',
            content: 'a esa gente que es perfecta,',
          },
          {
            begin: '00:05:18:01',
            end: '00:05:22:06',
            content: 'pero--Pero no es nadie.',
          },
          {
            begin: '00:05:18:01',
            end: '00:05:22:06',
            content: 'Perro: Sí, tienes razón.',
          },
          {
            begin: '00:05:22:06',
            end: '00:05:25:16',
            content: 'Bueno, te va a tocar',
          },
          {
            begin: '00:05:22:06',
            end: '00:05:25:16',
            content: 'pagar la cuenta, ¿eh?',
          },
          {
            begin: '00:05:25:16',
            end: '00:05:31:11',
            content: 'Tómalo como honorarios,',
          },
          {
            begin: '00:05:25:16',
            end: '00:05:31:11',
            content: 'como parte de tu venganza',
          },
          {
            begin: '00:05:31:11',
            end: '00:05:33:29',
            content: 'para pagarle',
          },
          {
            begin: '00:05:31:11',
            end: '00:05:33:29',
            content: 'a toda la gente creída',
          },
          {
            begin: '00:05:33:29',
            end: '00:05:37:06',
            content: 'y las chavas que se sienten',
          },
          {
            begin: '00:05:33:29',
            end: '00:05:37:06',
            content: 'mejor que los demás.',
          },
          {
            begin: '00:05:37:06',
            end: '00:05:38:23',
            content: 'Fabián: No le hagas caso',
          },
          {
            begin: '00:05:37:06',
            end: '00:05:38:23',
            content: 'a mi amigo,',
          },
          {
            begin: '00:05:38:23',
            end: '00:05:41:28',
            content: 'le gusta hacerse el payasito.',
          },
          {
            begin: '00:05:38:23',
            end: '00:05:41:28',
            content: 'Marieta: Bueno, pues,',
          },
          {
            begin: '00:05:41:28',
            end: '00:05:44:29',
            content: 'aquí están sus cosas.',
          },
          {
            begin: '00:05:41:28',
            end: '00:05:44:29',
            content: 'Si necesitan algo más, me dicen.',
          },
          {
            begin: '00:05:44:29',
            end: '00:05:48:12',
            content: 'Con permiso.',
          },
          {
            begin: '00:05:44:29',
            end: '00:05:48:12',
            content: 'Perro: [Gruñe]',
          },
          {
            begin: '00:05:48:12',
            end: '00:05:52:06',
            content: 'Fabián: [Balbucea]',
          },
          {
            begin: '00:05:48:12',
            end: '00:05:52:06',
            content: '[Alerta de mensaje]',
          },
          {
            begin: '00:05:52:06',
            end: '00:05:54:19',
            content: 'Leticia: Ah, un comentario',
          },
          {
            begin: '00:05:52:06',
            end: '00:05:54:19',
            content: 'nuevo.',
          },
          {
            begin: '00:05:54:19',
            end: '00:05:56:19',
            content: '[Lee] "Me encanta',
          },
          {
            begin: '00:05:54:19',
            end: '00:05:56:19',
            content: 'tu nueva foto de perfil.',
          },
          {
            begin: '00:05:56:19',
            end: '00:05:58:12',
            content: 'No cabe duda',
          },
          {
            begin: '00:05:56:19',
            end: '00:05:58:12',
            content: 'que a la perfección',
          },
          {
            begin: '00:05:58:12',
            end: '00:06:01:25',
            content: 'todos los ángulos le favorecen".',
          },
          {
            begin: '00:05:58:12',
            end: '00:06:01:25',
            content: 'Ay...',
          },
          {
            begin: '00:06:01:25',
            end: '00:06:10:07',
            content: 'A ver quién es ese Fabrizio2017.',
          },
          {
            begin: '00:06:01:25',
            end: '00:06:10:07',
            content: 'Pues, se ve bastante bien.',
          },
          {
            begin: '00:06:10:07',
            end: '00:06:12:16',
            content: 'Marieta: Pues, aquí está.',
          },
          {
            begin: '00:06:10:07',
            end: '00:06:12:16',
            content: 'Limón con chía.',
          },
          {
            begin: '00:06:12:16',
            end: '00:06:15:23',
            content: 'Muy merecida el agua',
          },
          {
            begin: '00:06:12:16',
            end: '00:06:15:23',
            content: 'porque estudiaron mucho hoy.',
          },
          {
            begin: '00:06:15:23',
            end: '00:06:18:16',
            content: 'Lupita: [Saborea]',
          },
          {
            begin: '00:06:15:23',
            end: '00:06:18:16',
            content: 'Está buenísima, Marieta.',
          },
          {
            begin: '00:06:18:16',
            end: '00:06:21:02',
            content: 'Gracias.',
          },
          {
            begin: '00:06:18:16',
            end: '00:06:21:02',
            content: 'Daniela: Mi mamá siempre le pone',
          },
          {
            begin: '00:06:21:02',
            end: '00:06:23:00',
            content: 'chía al agua',
          },
          {
            begin: '00:06:21:02',
            end: '00:06:23:00',
            content: 'porque mi papá dice',
          },
          {
            begin: '00:06:23:00',
            end: '00:06:27:08',
            content: 'que nos ayuda a Fabián y a mí',
          },
          {
            begin: '00:06:23:00',
            end: '00:06:27:08',
            content: 'a bajar de peso.',
          },
          {
            begin: '00:06:27:08',
            end: '00:06:29:17',
            content: 'Marieta: Bueno,',
          },
          {
            begin: '00:06:27:08',
            end: '00:06:29:17',
            content: 'pero más allá de eso,',
          },
          {
            begin: '00:06:29:17',
            end: '00:06:32:00',
            content: 'también tiene muchas propiedades',
          },
          {
            begin: '00:06:29:17',
            end: '00:06:32:00',
            content: 'que le ayuda mucho',
          },
          {
            begin: '00:06:32:00',
            end: '00:06:34:16',
            content: 'a nuestro organismo.',
          },
          {
            begin: '00:06:32:00',
            end: '00:06:34:16',
            content: 'Lupita: Además, tú no estás',
          },
          {
            begin: '00:06:34:16',
            end: '00:06:37:09',
            content: 'pasada de peso, Dani.',
          },
          {
            begin: '00:06:34:16',
            end: '00:06:37:09',
            content: 'Daniela: Mi papá no piensa',
          },
          {
            begin: '00:06:37:09',
            end: '00:06:39:23',
            content: 'igual que tú.',
          },
          {
            begin: '00:06:37:09',
            end: '00:06:39:23',
            content: 'Fabián y yo somos',
          },
          {
            begin: '00:06:39:23',
            end: '00:06:42:08',
            content: 'como las ovejas gordas',
          },
          {
            begin: '00:06:39:23',
            end: '00:06:42:08',
            content: 'de la familia.',
          },
          {
            begin: '00:06:42:08',
            end: '00:06:44:22',
            content: 'Fabián: Pues, lo dirás por ti.',
          },
          {
            begin: '00:06:42:08',
            end: '00:06:44:22',
            content: 'Y ya apúrate si no quieres',
          },
          {
            begin: '00:06:44:22',
            end: '00:06:46:07',
            content: 'que le diga a mi mamá',
          },
          {
            begin: '00:06:44:22',
            end: '00:06:46:07',
            content: 'que nada más vienes',
          },
          {
            begin: '00:06:46:07',
            end: '00:06:48:01',
            content: 'a andar de chismosa',
          },
          {
            begin: '00:06:46:07',
            end: '00:06:48:01',
            content: 'en lugar de estudiar.',
          },
          {
            begin: '00:06:48:01',
            end: '00:06:51:22',
            content: '[Celular]',
          },
          {
            begin: '00:06:48:01',
            end: '00:06:51:22',
            content: 'Marieta: Bueno, Dani,',
          },
          {
            begin: '00:06:51:22',
            end: '00:06:55:19',
            content: 'entonces guarda tus cosas',
          },
          {
            begin: '00:06:51:22',
            end: '00:06:55:19',
            content: 'y mañana nos vemos, ¿sí?',
          },
          {
            begin: '00:06:55:19',
            end: '00:06:56:21',
            content: 'Fabián: Apúrate, ¿sí?',
          },
          {
            begin: '00:07:02:02',
            end: '00:07:06:17',
            content: 'Marieta: "Bye".',
          },
          {
            begin: '00:07:02:02',
            end: '00:07:06:17',
            content: 'Lupita: Ay, me cae tan mal',
          },
          {
            begin: '00:07:06:17',
            end: '00:07:08:11',
            content: 'su hermano.',
          },
          {
            begin: '00:07:06:17',
            end: '00:07:08:11',
            content: 'Marieta: Ay, Lupita,',
          },
          {
            begin: '00:07:08:11',
            end: '00:07:11:12',
            content: 'no digas eso.',
          },
          {
            begin: '00:07:08:11',
            end: '00:07:11:12',
            content: 'Ni siquiera lo conoces.',
          },
          {
            begin: '00:07:11:12',
            end: '00:07:13:20',
            content: 'Lupita: Pero no sé,',
          },
          {
            begin: '00:07:11:12',
            end: '00:07:13:20',
            content: 'se me hace payaso',
          },
          {
            begin: '00:07:13:20',
            end: '00:07:15:26',
            content: 'y que tiene la sangre',
          },
          {
            begin: '00:07:13:20',
            end: '00:07:15:26',
            content: 'muy pesada.',
          },
          {
            begin: '00:07:15:26',
            end: '00:07:18:10',
            content: 'No como mi amiga,',
          },
          {
            begin: '00:07:15:26',
            end: '00:07:18:10',
            content: 'que es a todo dar.',
          },
          {
            begin: '00:07:18:10',
            end: '00:07:21:17',
            content: 'Marieta: Bueno, eso sí,',
          },
          {
            begin: '00:07:18:10',
            end: '00:07:21:17',
            content: 'Dani es un amor.',
          },
          {
            begin: '00:07:21:17',
            end: '00:07:25:16',
            content: '[Música]',
          },
          {
            begin: '00:07:27:21',
            end: '00:07:29:20',
            content: '[Música]',
          },
          {
            begin: '00:07:34:08',
            end: '00:07:36:06',
            content: 'Andrea: ¿Qué onda? ¿Qué haces?',
          },
          {
            begin: '00:07:34:08',
            end: '00:07:36:06',
            content: 'Leticia: Pues, terminé la tarea',
          },
          {
            begin: '00:07:36:06',
            end: '00:07:38:21',
            content: 'de matemáticas y, mira,',
          },
          {
            begin: '00:07:36:06',
            end: '00:07:38:21',
            content: 'estoy viendo la fiesta',
          },
          {
            begin: '00:07:38:21',
            end: '00:07:40:22',
            content: 'de graduación.',
          },
          {
            begin: '00:07:38:21',
            end: '00:07:40:22',
            content: 'Andrea: Ay, sí, yo también',
          },
          {
            begin: '00:07:40:22',
            end: '00:07:43:08',
            content: 'terminé de estudiar.',
          },
          {
            begin: '00:07:40:22',
            end: '00:07:43:08',
            content: 'Oye, pero ¿qué te falta hacer',
          },
          {
            begin: '00:07:43:08',
            end: '00:07:44:27',
            content: 'de la graduación?',
          },
          {
            begin: '00:07:43:08',
            end: '00:07:44:27',
            content: 'Digo, tú siempre tienes',
          },
          {
            begin: '00:07:44:27',
            end: '00:07:47:18',
            content: 'todo listo añares antes.',
          },
          {
            begin: '00:07:44:27',
            end: '00:07:47:18',
            content: 'Leticia: Pues, de hecho',
          },
          {
            begin: '00:07:47:18',
            end: '00:07:50:10',
            content: 'quería empezar antes, pero...',
          },
          {
            begin: '00:07:47:18',
            end: '00:07:50:10',
            content: 'Andrea: Oye,',
          },
          {
            begin: '00:07:50:10',
            end: '00:07:53:06',
            content: 'esos ojitos de borrego',
          },
          {
            begin: '00:07:50:10',
            end: '00:07:53:06',
            content: 'yo nunca te los había visto.',
          },
          {
            begin: '00:07:53:06',
            end: '00:07:55:26',
            content: 'Leticia: Me puse a chatear',
          },
          {
            begin: '00:07:53:06',
            end: '00:07:55:26',
            content: 'con un chavo nuevo por Internet.',
          },
          {
            begin: '00:07:55:26',
            end: '00:07:59:03',
            content: 'Andrea: Obvio no.',
          },
          {
            begin: '00:07:55:26',
            end: '00:07:59:03',
            content: 'Leticia: Te acabo de mandar',
          },
          {
            begin: '00:07:59:03',
            end: '00:08:01:09',
            content: 'la conversación.',
          },
          {
            begin: '00:07:59:03',
            end: '00:08:01:09',
            content: 'Se llama Fabrizio.',
          },
          {
            begin: '00:08:01:09',
            end: '00:08:05:02',
            content: '[Alerta de mensaje]',
          },
          {
            begin: '00:08:01:09',
            end: '00:08:05:02',
            content: 'Andrea: [Lee] "Me encanta',
          },
          {
            begin: '00:08:05:02',
            end: '00:08:07:26',
            content: 'tu nueva foto de perfil.',
          },
          {
            begin: '00:08:05:02',
            end: '00:08:07:26',
            content: 'No cabe duda que a la perfección',
          },
          {
            begin: '00:08:07:26',
            end: '00:08:11:15',
            content: 'todos los ángulos le favorecen".',
          },
          {
            begin: '00:08:07:26',
            end: '00:08:11:15',
            content: 'Leticia: Y después de eso',
          },
          {
            begin: '00:08:11:15',
            end: '00:08:13:14',
            content: 'me mandó solicitud,',
          },
          {
            begin: '00:08:11:15',
            end: '00:08:13:14',
            content: 'nos agregamos',
          },
          {
            begin: '00:08:13:14',
            end: '00:08:16:15',
            content: 'y empezamos a platicar.',
          },
          {
            begin: '00:08:13:14',
            end: '00:08:16:15',
            content: 'No te vayas a burlar de mí, ¿eh?',
          },
          {
            begin: '00:08:16:15',
            end: '00:08:18:11',
            content: 'Andrea: Ay, no, no, no,',
          },
          {
            begin: '00:08:16:15',
            end: '00:08:18:11',
            content: 'al contrario, si buena falta',
          },
          {
            begin: '00:08:18:11',
            end: '00:08:21:00',
            content: 'te hace conocer a alguien.',
          },
          {
            begin: '00:08:18:11',
            end: '00:08:21:00',
            content: 'Leticia: Tampoco exageres.',
          },
          {
            begin: '00:08:21:00',
            end: '00:08:23:00',
            content: 'Andrea: Ay, amiga, es que obvio',
          },
          {
            begin: '00:08:21:00',
            end: '00:08:23:00',
            content: 'tú no te das cuenta,',
          },
          {
            begin: '00:08:23:00',
            end: '00:08:24:25',
            content: 'pero es que en la prepa',
          },
          {
            begin: '00:08:23:00',
            end: '00:08:24:25',
            content: 'como que ya están empezando',
          },
          {
            begin: '00:08:24:25',
            end: '00:08:26:10',
            content: 'a decir que te gustan',
          },
          {
            begin: '00:08:24:25',
            end: '00:08:26:10',
            content: 'las mujeres.',
          },
          {
            begin: '00:08:26:10',
            end: '00:08:27:25',
            content: 'Digo, con eso de que,',
          },
          {
            begin: '00:08:26:10',
            end: '00:08:27:25',
            content: 'pues, nunca has andado',
          },
          {
            begin: '00:08:27:25',
            end: '00:08:29:20',
            content: 'con nadie.',
          },
          {
            begin: '00:08:27:25',
            end: '00:08:29:20',
            content: 'Leticia: No, eso nunca',
          },
          {
            begin: '00:08:29:20',
            end: '00:08:31:10',
            content: 'lo había escuchado.',
          },
          {
            begin: '00:08:29:20',
            end: '00:08:31:10',
            content: 'Andrea: Pues, porque no',
          },
          {
            begin: '00:08:31:10',
            end: '00:08:34:20',
            content: 'te lo van a decir en tu cara.',
          },
          {
            begin: '00:08:31:10',
            end: '00:08:34:20',
            content: 'Pero ya, bueno,',
          },
          {
            begin: '00:08:34:20',
            end: '00:08:36:13',
            content: 'ni que fueras gay.',
          },
          {
            begin: '00:08:34:20',
            end: '00:08:36:13',
            content: 'A ver, cuéntame más',
          },
          {
            begin: '00:08:36:13',
            end: '00:08:38:19',
            content: 'de ese tal Fabrizio.',
          },
          {
            begin: '00:08:36:13',
            end: '00:08:38:19',
            content: 'Se escucha como',
          },
          {
            begin: '00:08:38:19',
            end: '00:08:40:25',
            content: 'medio italiano su nombre.',
          },
          {
            begin: '00:08:38:19',
            end: '00:08:40:25',
            content: '¿De dónde es o qué onda?',
          },
          {
            begin: '00:08:40:25',
            end: '00:08:42:14',
            content: 'Leticia: Ah, sí.',
          },
          {
            begin: '00:08:40:25',
            end: '00:08:42:14',
            content: 'De hecho, me estaba contando',
          },
          {
            begin: '00:08:42:14',
            end: '00:08:45:11',
            content: 'que sus abuelos son italianos',
          },
          {
            begin: '00:08:42:14',
            end: '00:08:45:11',
            content: 'y tienen un restaurante',
          },
          {
            begin: '00:08:45:11',
            end: '00:08:48:12',
            content: 'y que él sabe cocinar pastas',
          },
          {
            begin: '00:08:45:11',
            end: '00:08:48:12',
            content: 'y me va a hacer una muy rica.',
          },
          {
            begin: '00:08:48:12',
            end: '00:08:51:10',
            content: 'Y también sabe mucho de vinos.',
          },
          {
            begin: '00:08:48:12',
            end: '00:08:51:10',
            content: 'Daniela: Y entonces hicimos',
          },
          {
            begin: '00:08:51:10',
            end: '00:08:54:07',
            content: 'unas acuarelas bien padres',
          },
          {
            begin: '00:08:51:10',
            end: '00:08:54:07',
            content: 'con Marieta.',
          },
          {
            begin: '00:08:54:07',
            end: '00:08:56:05',
            content: 'Raquel: Mientras hagas',
          },
          {
            begin: '00:08:54:07',
            end: '00:08:56:05',
            content: 'bien tu tarea,',
          },
          {
            begin: '00:08:56:05',
            end: '00:08:59:23',
            content: 'me doy por bien servida.',
          },
          {
            begin: '00:08:56:05',
            end: '00:08:59:23',
            content: 'Eduardo: Come como humano.',
          },
          {
            begin: '00:08:59:23',
            end: '00:09:02:06',
            content: '¿O te vas a atragantar',
          },
          {
            begin: '00:08:59:23',
            end: '00:09:02:06',
            content: 'como cerdo?',
          },
          {
            begin: '00:09:02:06',
            end: '00:09:03:23',
            content: 'Fabián: Es que tengo hambre,',
          },
          {
            begin: '00:09:02:06',
            end: '00:09:03:23',
            content: 'papá.',
          },
          {
            begin: '00:09:03:23',
            end: '00:09:05:20',
            content: 'Raquel: No comió nada',
          },
          {
            begin: '00:09:03:23',
            end: '00:09:05:20',
            content: 'en todo el día.',
          },
          {
            begin: '00:09:05:20',
            end: '00:09:08:21',
            content: 'Eduardo: ¿No comiste?',
          },
          {
            begin: '00:09:05:20',
            end: '00:09:08:21',
            content: 'Eso sí que es una novedad.',
          },
          {
            begin: '00:09:08:21',
            end: '00:09:11:04',
            content: 'Daniela: Yo creo',
          },
          {
            begin: '00:09:08:21',
            end: '00:09:11:04',
            content: 'que porque estaba con su amigo.',
          },
          {
            begin: '00:09:11:04',
            end: '00:09:12:15',
            content: 'Fabián: ¿Y a ti quién',
          },
          {
            begin: '00:09:11:04',
            end: '00:09:12:15',
            content: 'te dijo eso?',
          },
          {
            begin: '00:09:12:15',
            end: '00:09:14:13',
            content: 'Daniela: Lupita.',
          },
          {
            begin: '00:09:12:15',
            end: '00:09:14:13',
            content: 'Eduardo: Estabas',
          },
          {
            begin: '00:09:14:13',
            end: '00:09:16:25',
            content: 'con un amiguito.',
          },
          {
            begin: '00:09:14:13',
            end: '00:09:16:25',
            content: 'Fabián: No, no es eso, papá.',
          },
          {
            begin: '00:09:16:25',
            end: '00:09:19:07',
            content: 'Eduardo: Te lo dejé muy claro',
          },
          {
            begin: '00:09:16:25',
            end: '00:09:19:07',
            content: 'la última vez.',
          },
          {
            begin: '00:09:19:07',
            end: '00:09:22:19',
            content: 'Fabián: Que no es eso.',
          },
          {
            begin: '00:09:19:07',
            end: '00:09:22:19',
            content: 'Daniela: ¿Eso?',
          },
          {
            begin: '00:09:22:19',
            end: '00:09:24:25',
            content: 'Raquel: Cosas de adolescentes,',
          },
          {
            begin: '00:09:22:19',
            end: '00:09:24:25',
            content: 'mi amor.',
          },
          {
            begin: '00:09:24:25',
            end: '00:09:26:24',
            content: 'Mejor vete a lavar los dientes,',
          },
          {
            begin: '00:09:24:25',
            end: '00:09:26:24',
            content: '¿sí?',
          },
          {
            begin: '00:09:26:24',
            end: '00:09:29:20',
            content: 'Daniela: Pero si apenas me comí',
          },
          {
            begin: '00:09:26:24',
            end: '00:09:29:20',
            content: 'unas sincronizadas.',
          },
          {
            begin: '00:09:29:20',
            end: '00:09:31:19',
            content: 'Eduardo: Con eso es más',
          },
          {
            begin: '00:09:29:20',
            end: '00:09:31:19',
            content: 'que suficiente.',
          },
          {
            begin: '00:09:31:19',
            end: '00:09:33:28',
            content: 'No vaya a ser que te pongas',
          },
          {
            begin: '00:09:31:19',
            end: '00:09:33:28',
            content: 'como este.',
          },
          {
            begin: '00:09:33:28',
            end: '00:09:34:29',
            content: 'Marrano...',
          },
          {
            begin: '00:09:42:07',
            end: '00:09:44:00',
            content: 'Fabián: La mosquita muerta',
          },
          {
            begin: '00:09:42:07',
            end: '00:09:44:00',
            content: 'ya hizo un grupo',
          },
          {
            begin: '00:09:44:00',
            end: '00:09:49:29',
            content: 'para lo de la graduación',
          },
          {
            begin: '00:09:44:00',
            end: '00:09:49:29',
            content: 'y no me invitó.',
          },
          {
            begin: '00:09:49:29',
            end: '00:09:53:08',
            content: 'Pues, vamos a ver',
          },
          {
            begin: '00:09:49:29',
            end: '00:09:53:08',
            content: 'quién ríe al último ese día,',
          },
          {
            begin: '00:09:53:08',
            end: '00:09:54:20',
            content: 'doña perfecta.',
          },
          {
            begin: '00:10:02:00',
            end: '00:10:03:28',
            content: 'Perdón, ¿la interrumpo?',
          },
          {
            begin: '00:10:02:00',
            end: '00:10:03:28',
            content: 'Lorena: Fabián, ¿qué su clase',
          },
          {
            begin: '00:10:03:28',
            end: '00:10:06:24',
            content: 'no está por empezar?',
          },
          {
            begin: '00:10:03:28',
            end: '00:10:06:24',
            content: 'Fabián: Pues, sí, pero...',
          },
          {
            begin: '00:10:06:24',
            end: '00:10:10:07',
            content: 'Lorena: A ver, pase, pase.',
          },
          {
            begin: '00:10:06:24',
            end: '00:10:10:07',
            content: 'Fabián: Gracias.',
          },
          {
            begin: '00:10:10:07',
            end: '00:10:12:16',
            content: 'Lorena: ¿Se encuentra',
          },
          {
            begin: '00:10:10:07',
            end: '00:10:12:16',
            content: 'usted bien?',
          },
          {
            begin: '00:10:12:16',
            end: '00:10:15:06',
            content: 'Fabián: Sí, es que--',
          },
          {
            begin: '00:10:12:16',
            end: '00:10:15:06',
            content: 'Pues, la verdad es',
          },
          {
            begin: '00:10:15:06',
            end: '00:10:18:05',
            content: 'que no quería venir, pero--',
          },
          {
            begin: '00:10:15:06',
            end: '00:10:18:05',
            content: 'Lorena: Mire, Fabián,',
          },
          {
            begin: '00:10:18:05',
            end: '00:10:19:21',
            content: 'le he dicho a usted',
          },
          {
            begin: '00:10:18:05',
            end: '00:10:19:21',
            content: 'y a sus compañeros',
          },
          {
            begin: '00:10:19:21',
            end: '00:10:21:28',
            content: 'que no solo estoy aquí',
          },
          {
            begin: '00:10:19:21',
            end: '00:10:21:28',
            content: 'para sancionarlos,',
          },
          {
            begin: '00:10:21:28',
            end: '00:10:28:05',
            content: 'sino también para escucharlos.',
          },
          {
            begin: '00:10:21:28',
            end: '00:10:28:05',
            content: '¿Tiene algún problema en casa?',
          },
          {
            begin: '00:10:28:05',
            end: '00:10:30:11',
            content: 'Fabián: Bueno, si le digo,',
          },
          {
            begin: '00:10:28:05',
            end: '00:10:30:11',
            content: '¿me promete que no le va',
          },
          {
            begin: '00:10:30:11',
            end: '00:10:32:26',
            content: 'a decir a nadie?',
          },
          {
            begin: '00:10:30:11',
            end: '00:10:32:26',
            content: 'Lorena: Por lo pronto,',
          },
          {
            begin: '00:10:32:26',
            end: '00:10:34:27',
            content: '¿qué le parece si voy',
          },
          {
            begin: '00:10:32:26',
            end: '00:10:34:27',
            content: 'por un vaso con agua',
          },
          {
            begin: '00:10:34:27',
            end: '00:10:36:20',
            content: 'y hablamos del asunto?',
          },
          {
            begin: '00:10:34:27',
            end: '00:10:36:20',
            content: '¿Le parece?',
          },
          {
            begin: '00:10:36:20',
            end: '00:10:38:00',
            content: 'Fabián: Sí, muchas gracias.',
          },
          {
            begin: '00:10:44:22',
            end: '00:10:47:22',
            content: 'Perro: ¿Cómo ves',
          },
          {
            begin: '00:10:44:22',
            end: '00:10:47:22',
            content: 'lo que me propuso Fabiancito?',
          },
          {
            begin: '00:10:47:22',
            end: '00:10:51:11',
            content: '>> Quién lo viera...',
          },
          {
            begin: '00:10:47:22',
            end: '00:10:51:11',
            content: 'Para mí que es bien de envidias,',
          },
          {
            begin: '00:10:51:11',
            end: '00:10:54:12',
            content: 'pero como dice el dicho:',
          },
          {
            begin: '00:10:51:11',
            end: '00:10:54:12',
            content: '"La envidia, dice el autor,',
          },
          {
            begin: '00:10:54:12',
            end: '00:10:57:14',
            content: 'es martillo destructor".',
          },
          {
            begin: '00:10:54:12',
            end: '00:10:57:14',
            content: 'Perro: Bueno,',
          },
          {
            begin: '00:10:57:14',
            end: '00:11:02:17',
            content: 'tampoco es como doña perfecta',
          },
          {
            begin: '00:10:57:14',
            end: '00:11:02:17',
            content: 'se dé a querer mucho, ¿eh?',
          },
          {
            begin: '00:11:02:17',
            end: '00:11:04:15',
            content: 'Andrea: Ay, no, amiga,',
          },
          {
            begin: '00:11:02:17',
            end: '00:11:04:15',
            content: 'yo no sé qué le diste,',
          },
          {
            begin: '00:11:04:15',
            end: '00:11:06:14',
            content: 'pero es que lo traes muerto.',
          },
          {
            begin: '00:11:04:15',
            end: '00:11:06:14',
            content: 'Leticia: Ay, es que',
          },
          {
            begin: '00:11:06:14',
            end: '00:11:08:12',
            content: 'es superraro.',
          },
          {
            begin: '00:11:06:14',
            end: '00:11:08:12',
            content: 'Desde hace años',
          },
          {
            begin: '00:11:08:12',
            end: '00:11:10:06',
            content: 'no me sentía así.',
          },
          {
            begin: '00:11:08:12',
            end: '00:11:10:06',
            content: 'Andrea: No, aparte',
          },
          {
            begin: '00:11:10:06',
            end: '00:11:12:04',
            content: 'está guapísimo.',
          },
          {
            begin: '00:11:10:06',
            end: '00:11:12:04',
            content: 'Pero años no, amiga, añísimos.',
          },
          {
            begin: '00:11:12:04',
            end: '00:11:13:25',
            content: 'Yo creo que desde la primaria,',
          },
          {
            begin: '00:11:12:04',
            end: '00:11:13:25',
            content: '¿eh?',
          },
          {
            begin: '00:11:13:25',
            end: '00:11:15:20',
            content: 'Leticia: Ay, tampoco exageres.',
          },
          {
            begin: '00:11:13:25',
            end: '00:11:15:20',
            content: 'Andrea: No, es que no estoy',
          },
          {
            begin: '00:11:15:20',
            end: '00:11:17:03',
            content: 'exagerando.',
          },
          {
            begin: '00:11:15:20',
            end: '00:11:17:03',
            content: 'A ver, niégalo.',
          },
          {
            begin: '00:11:17:03',
            end: '00:11:20:06',
            content: 'Dime un nombre.',
          },
          {
            begin: '00:11:17:03',
            end: '00:11:20:06',
            content: 'Leticia: Bueno, es que no sé,',
          },
          {
            begin: '00:11:20:06',
            end: '00:11:23:07',
            content: 'entre tantas tareas, la--',
          },
          {
            begin: '00:11:20:06',
            end: '00:11:23:07',
            content: 'Andrea: Sí, sí, sí.',
          },
          {
            begin: '00:11:23:07',
            end: '00:11:24:27',
            content: 'Leticia: Las clases de ajedrez,',
          },
          {
            begin: '00:11:23:07',
            end: '00:11:24:27',
            content: 'el club de lectura.',
          },
          {
            begin: '00:11:24:27',
            end: '00:11:27:10',
            content: 'Andrea: Ajá, sí, tú',
          },
          {
            begin: '00:11:24:27',
            end: '00:11:27:10',
            content: 'con tus ñoñerías como siempre.',
          },
          {
            begin: '00:11:27:10',
            end: '00:11:30:20',
            content: 'A ver, dime, lo vas a invitar',
          },
          {
            begin: '00:11:27:10',
            end: '00:11:30:20',
            content: 'a la graduación, ¿sí o no?',
          },
          {
            begin: '00:11:30:20',
            end: '00:11:33:07',
            content: 'Leticia: Pues, sí me gustaría,',
          },
          {
            begin: '00:11:30:20',
            end: '00:11:33:07',
            content: 'pero no sé, apenas empezamos',
          },
          {
            begin: '00:11:33:07',
            end: '00:11:35:02',
            content: 'a platicar.',
          },
          {
            begin: '00:11:33:07',
            end: '00:11:35:02',
            content: 'Andrea: Pues, yo digo',
          },
          {
            begin: '00:11:35:02',
            end: '00:11:38:11',
            content: 'que si no te pones las pilas,',
          },
          {
            begin: '00:11:35:02',
            end: '00:11:38:11',
            content: 'te lo van a ganar, ¿eh?',
          },
          {
            begin: '00:11:38:11',
            end: '00:11:40:22',
            content: 'Es la verdad.',
          },
          {
            begin: '00:11:38:11',
            end: '00:11:40:22',
            content: 'Leticia: No.',
          },
          {
            begin: '00:11:40:22',
            end: '00:11:43:14',
            content: '¿Cómo crees?',
          },
          {
            begin: '00:11:40:22',
            end: '00:11:43:14',
            content: 'Maestra: Bueno, chicos,',
          },
          {
            begin: '00:11:43:14',
            end: '00:11:51:05',
            content: 'guardando silencio, por favor.',
          },
          {
            begin: '00:11:43:14',
            end: '00:11:51:05',
            content: 'Vamos a empezar.',
          },
          {
            begin: '00:11:51:05',
            end: '00:11:52:23',
            content: 'Perro: Tengo que enfocarme',
          },
          {
            begin: '00:11:51:05',
            end: '00:11:52:23',
            content: 'en pasar ese maldito',
          },
          {
            begin: '00:11:52:23',
            end: '00:11:54:29',
            content: 'extraordinario.',
          },
          {
            begin: '00:11:52:23',
            end: '00:11:54:29',
            content: 'Si no, me voy a convertir',
          },
          {
            begin: '00:11:54:29',
            end: '00:11:57:25',
            content: 'en un fósil en esta escuela.',
          },
          {
            begin: '00:11:54:29',
            end: '00:11:57:25',
            content: '>> No maches.',
          },
          {
            begin: '00:11:57:25',
            end: '00:12:01:09',
            content: 'Perro: Mamita.',
          },
          {
            begin: '00:11:57:25',
            end: '00:12:01:09',
            content: '>> En lugar de graduarte',
          },
          {
            begin: '00:12:01:09',
            end: '00:12:03:06',
            content: 'vas a terminar haciendo',
          },
          {
            begin: '00:12:01:09',
            end: '00:12:03:06',
            content: 'un doctorado',
          },
          {
            begin: '00:12:03:06',
            end: '00:12:05:23',
            content: 'en tercer año de prepa.',
          },
          {
            begin: '00:12:03:06',
            end: '00:12:05:23',
            content: 'Perro: Ya sé.',
          },
          {
            begin: '00:12:05:23',
            end: '00:12:08:15',
            content: 'Sí, tengo que hacerte caso',
          },
          {
            begin: '00:12:05:23',
            end: '00:12:08:15',
            content: 'y enfocarme en pasar.',
          },
          {
            begin: '00:12:08:15',
            end: '00:12:13:00',
            content: 'Bueno, ahorita te alcanzo.',
          },
          {
            begin: '00:12:08:15',
            end: '00:12:13:00',
            content: '>> Ya estás.',
          },
          {
            begin: '00:12:13:00',
            end: '00:12:16:05',
            content: 'Perro: ¿Qué tranza, autista?',
          },
          {
            begin: '00:12:13:00',
            end: '00:12:16:05',
            content: '¿Qué ve?--',
          },
          {
            begin: '00:12:16:05',
            end: '00:12:19:01',
            content: 'Ay, ¿qué escondes?',
          },
          {
            begin: '00:12:16:05',
            end: '00:12:19:01',
            content: '¿Porno de hombres o qué?',
          },
          {
            begin: '00:12:19:01',
            end: '00:12:20:26',
            content: 'Fabián: Te dije que tenía',
          },
          {
            begin: '00:12:19:01',
            end: '00:12:20:26',
            content: 'un plan, ¿sí?',
          },
          {
            begin: '00:12:20:26',
            end: '00:12:23:04',
            content: 'Entonces, todo a su tiempo.',
          },
          {
            begin: '00:12:20:26',
            end: '00:12:23:04',
            content: 'Perro: Justo de eso',
          },
          {
            begin: '00:12:23:04',
            end: '00:12:25:06',
            content: 'quería hablarte.',
          },
          {
            begin: '00:12:23:04',
            end: '00:12:25:06',
            content: 'La verdad es',
          },
          {
            begin: '00:12:25:06',
            end: '00:12:28:05',
            content: 'que no quiero broncas.',
          },
          {
            begin: '00:12:25:06',
            end: '00:12:28:05',
            content: 'Digo, sí me cae gorda Leticia,',
          },
          {
            begin: '00:12:28:05',
            end: '00:12:31:05',
            content: 'pero--',
          },
          {
            begin: '00:12:28:05',
            end: '00:12:31:05',
            content: 'Pero yo creo que ahí muere.',
          },
          {
            begin: '00:12:31:05',
            end: '00:12:32:27',
            content: 'Fabián: Pues, una cosa',
          },
          {
            begin: '00:12:31:05',
            end: '00:12:32:27',
            content: 'es lo que uno quiere',
          },
          {
            begin: '00:12:32:27',
            end: '00:12:35:22',
            content: 'y otra lo que es.',
          },
          {
            begin: '00:12:32:27',
            end: '00:12:35:22',
            content: 'Perro: ¿Cómo?',
          },
          {
            begin: '00:12:35:22',
            end: '00:12:38:12',
            content: '¿De qué hablas?',
          },
          {
            begin: '00:12:35:22',
            end: '00:12:38:12',
            content: 'Fabián: Pues, que escuché',
          },
          {
            begin: '00:12:38:12',
            end: '00:12:41:10',
            content: 'a la mosquita muerta',
          },
          {
            begin: '00:12:38:12',
            end: '00:12:41:10',
            content: 'hablar de ti con la prefecta.',
          },
          {
            begin: '00:12:41:10',
            end: '00:12:43:09',
            content: 'Perro: ¿Sobre mí?',
          },
          {
            begin: '00:12:41:10',
            end: '00:12:43:09',
            content: 'Fabián: Pues, sí, mira,',
          },
          {
            begin: '00:12:43:09',
            end: '00:12:45:03',
            content: 'la verdad es que no--',
          },
          {
            begin: '00:12:43:09',
            end: '00:12:45:03',
            content: 'No escuché mucho,',
          },
          {
            begin: '00:12:45:03',
            end: '00:12:46:14',
            content: 'pero escuché que dijo',
          },
          {
            begin: '00:12:45:03',
            end: '00:12:46:14',
            content: 'algo del Perro',
          },
          {
            begin: '00:12:46:14',
            end: '00:12:50:15',
            content: 'y se metieron a la oficina.',
          },
          {
            begin: '00:12:46:14',
            end: '00:12:50:15',
            content: 'Pero pues, no conozco',
          },
          {
            begin: '00:12:50:15',
            end: '00:12:53:00',
            content: 'muchas personas que le digan',
          },
          {
            begin: '00:12:50:15',
            end: '00:12:53:00',
            content: 'el Perro aquí en la escuela,',
          },
          {
            begin: '00:12:53:00',
            end: '00:12:58:03',
            content: '¿o tú sí, Perro?',
          },
          {
            begin: '00:12:53:00',
            end: '00:12:58:03',
            content: 'Lorena: Profesora,',
          },
          {
            begin: '00:12:58:03',
            end: '00:13:01:24',
            content: 'le robo un minuto al joven',
          },
          {
            begin: '00:12:58:03',
            end: '00:13:01:24',
            content: 'Gutberto Ramos, por favor.',
          },
          {
            begin: '00:13:01:24',
            end: '00:13:05:00',
            content: 'Alumnos: Uh.',
          },
          {
            begin: '00:13:01:24',
            end: '00:13:05:00',
            content: 'Perro: ¿Yo?',
          },
          {
            begin: '00:13:05:00',
            end: '00:13:08:26',
            content: 'Lorena: Agarra tus cosas',
          },
          {
            begin: '00:13:05:00',
            end: '00:13:08:26',
            content: 'y acompáñame a la oficina.',
          },
          {
            begin: '00:13:08:26',
            end: '00:13:10:29',
            content: 'Todos: [Silban]',
          },
          {
            begin: '00:13:16:12',
            end: '00:13:18:19',
            content: 'Leticia: Perrito.',
          },
          {
            begin: '00:13:16:12',
            end: '00:13:18:19',
            content: 'Perro: ¿Qué?',
          },
          {
            begin: '00:13:18:19',
            end: '00:13:20:23',
            content: 'Leticia: Suerte.',
          },
          {
            begin: '00:13:18:19',
            end: '00:13:20:23',
            content: '[Ladra]',
          },
          {
            begin: '00:13:20:23',
            end: '00:13:30:10',
            content: 'Alumnos: Uh.',
          },
          {
            begin: '00:13:20:23',
            end: '00:13:30:10',
            content: 'Maestra: Chicos, cálmense.',
          },
          {
            begin: '00:13:30:10',
            end: '00:13:31:25',
            content: 'Fabián: ¿Qué pasó?',
          },
          {
            begin: '00:13:30:10',
            end: '00:13:31:25',
            content: '¿Qué te dijo la prefecta?',
          },
          {
            begin: '00:13:31:25',
            end: '00:13:34:04',
            content: 'Perro: Tú tenías razón.',
          },
          {
            begin: '00:13:31:25',
            end: '00:13:34:04',
            content: 'La maldita fue de chivata',
          },
          {
            begin: '00:13:34:04',
            end: '00:13:36:18',
            content: 'a acusarme a la dirección.',
          },
          {
            begin: '00:13:34:04',
            end: '00:13:36:18',
            content: 'Fabián: ¿Quién?',
          },
          {
            begin: '00:13:36:18',
            end: '00:13:39:13',
            content: 'Perro: ¿Cómo que quién?',
          },
          {
            begin: '00:13:36:18',
            end: '00:13:39:13',
            content: 'Pues, la estúpida de Leticia.',
          },
          {
            begin: '00:13:39:13',
            end: '00:13:40:24',
            content: 'Digo, la prefecta',
          },
          {
            begin: '00:13:39:13',
            end: '00:13:40:24',
            content: 'no me dijo quién,',
          },
          {
            begin: '00:13:40:24',
            end: '00:13:43:09',
            content: 'pero pues, todo cuadra.',
          },
          {
            begin: '00:13:40:24',
            end: '00:13:43:09',
            content: 'Fabián: Pero ¿de qué te acusó',
          },
          {
            begin: '00:13:43:09',
            end: '00:13:45:25',
            content: 'o qué?',
          },
          {
            begin: '00:13:43:09',
            end: '00:13:45:25',
            content: 'Perro: Pues, me dijo que alguien',
          },
          {
            begin: '00:13:45:25',
            end: '00:13:49:16',
            content: 'había ido a decir que yo',
          },
          {
            begin: '00:13:45:25',
            end: '00:13:49:16',
            content: 'estaba molestándola',
          },
          {
            begin: '00:13:49:16',
            end: '00:13:52:07',
            content: 'y haciéndola menos.',
          },
          {
            begin: '00:13:49:16',
            end: '00:13:52:07',
            content: 'Como si lo hiciera',
          },
          {
            begin: '00:13:52:07',
            end: '00:13:54:19',
            content: 'todo el tiempo.',
          },
          {
            begin: '00:13:52:07',
            end: '00:13:54:19',
            content: 'Qué poco aguantan...',
          },
          {
            begin: '00:13:54:19',
            end: '00:13:56:09',
            content: 'Fabián: Pues, qué mala onda',
          },
          {
            begin: '00:13:54:19',
            end: '00:13:56:09',
            content: 'que te acusó.',
          },
          {
            begin: '00:13:56:09',
            end: '00:13:58:17',
            content: 'Y luego tú que tienes',
          },
          {
            begin: '00:13:56:09',
            end: '00:13:58:17',
            content: 'problemas de calificaciones,',
          },
          {
            begin: '00:13:58:17',
            end: '00:14:00:10',
            content: 'pues, en una de esas',
          },
          {
            begin: '00:13:58:17',
            end: '00:14:00:10',
            content: 'te andan fregando más',
          },
          {
            begin: '00:14:00:10',
            end: '00:14:05:18',
            content: 'con lo de la campaña',
          },
          {
            begin: '00:14:00:10',
            end: '00:14:05:18',
            content: 'de "bullying" y todo eso.',
          },
          {
            begin: '00:14:05:18',
            end: '00:14:11:25',
            content: 'Perro: ¿Leticia quería guerra?',
          },
          {
            begin: '00:14:05:18',
            end: '00:14:11:25',
            content: 'Pues, ya la encontró.',
          },
          {
            begin: '00:14:11:25',
            end: '00:14:15:24',
            content: '[Música]',
          },
          {
            begin: '00:14:18:01',
            end: '00:14:20:00',
            content: '[Música]',
          },
          {
            begin: '00:14:23:06',
            end: '00:14:25:06',
            content: 'Andrea: O sea, sí está padre',
          },
          {
            begin: '00:14:23:06',
            end: '00:14:25:06',
            content: 'organizar lo de la generación,',
          },
          {
            begin: '00:14:25:06',
            end: '00:14:27:23',
            content: 'amiga, pero casi nos quedamos',
          },
          {
            begin: '00:14:25:06',
            end: '00:14:27:23',
            content: 'a barrer el salón.',
          },
          {
            begin: '00:14:27:23',
            end: '00:14:30:03',
            content: 'Leticia: Es que tenía que hablar',
          },
          {
            begin: '00:14:27:23',
            end: '00:14:30:03',
            content: 'muchas cosas con la maestra',
          },
          {
            begin: '00:14:30:03',
            end: '00:14:32:05',
            content: 'y por eso no te pedí',
          },
          {
            begin: '00:14:30:03',
            end: '00:14:32:05',
            content: 'que te quedaras, porque sabía',
          },
          {
            begin: '00:14:32:05',
            end: '00:14:34:24',
            content: 'que me iba a tardar un buen.',
          },
          {
            begin: '00:14:32:05',
            end: '00:14:34:24',
            content: 'Andrea: A ver,',
          },
          {
            begin: '00:14:34:24',
            end: '00:14:36:17',
            content: 'si me quedé afuera,',
          },
          {
            begin: '00:14:34:24',
            end: '00:14:36:17',
            content: 'fue justamente',
          },
          {
            begin: '00:14:36:17',
            end: '00:14:39:12',
            content: 'para que me platicaras',
          },
          {
            begin: '00:14:36:17',
            end: '00:14:39:12',
            content: 'qué onda con tu galán.',
          },
          {
            begin: '00:14:39:12',
            end: '00:14:40:27',
            content: '¿Qué ha pasado?',
          },
          {
            begin: '00:14:39:12',
            end: '00:14:40:27',
            content: 'Leticia: Hace rato me mandó',
          },
          {
            begin: '00:14:40:27',
            end: '00:14:42:13',
            content: 'un mensaje.',
          },
          {
            begin: '00:14:40:27',
            end: '00:14:42:13',
            content: 'Andrea: No...',
          },
          {
            begin: '00:14:42:13',
            end: '00:14:43:27',
            content: 'Leticia: Sí.',
          },
          {
            begin: '00:14:42:13',
            end: '00:14:43:27',
            content: 'Andrea: ¿Qué te dijo?',
          },
          {
            begin: '00:14:43:27',
            end: '00:14:46:06',
            content: 'Leticia: Bueno, te lo voy',
          },
          {
            begin: '00:14:43:27',
            end: '00:14:46:06',
            content: 'a enseñar, pero--',
          },
          {
            begin: '00:14:46:06',
            end: '00:14:48:08',
            content: 'Pero no te burles--',
          },
          {
            begin: '00:14:46:06',
            end: '00:14:48:08',
            content: 'Andrea: Ay, ya, enséñamelo ya.',
          },
          {
            begin: '00:14:48:08',
            end: '00:14:53:14',
            content: 'A ver, enséñamelo.',
          },
          {
            begin: '00:14:48:08',
            end: '00:14:53:14',
            content: 'Ya, a ver.',
          },
          {
            begin: '00:14:53:14',
            end: '00:14:56:11',
            content: 'Leticia: Mira, ahí está.',
          },
          {
            begin: '00:14:53:14',
            end: '00:14:56:11',
            content: 'Andrea: [Lee] "Hola, princesa.',
          },
          {
            begin: '00:14:56:11',
            end: '00:14:59:09',
            content: 'Y discúlpame el atrevimiento',
          },
          {
            begin: '00:14:56:11',
            end: '00:14:59:09',
            content: 'de llamarte así,',
          },
          {
            begin: '00:14:59:09',
            end: '00:15:01:23',
            content: 'pero es porque"--',
          },
          {
            begin: '00:14:59:09',
            end: '00:15:01:23',
            content: '¿Cómo así?',
          },
          {
            begin: '00:15:01:23',
            end: '00:15:03:11',
            content: 'Lo que sea.',
          },
          {
            begin: '00:15:01:23',
            end: '00:15:03:11',
            content: '"No sabes las ganas que tengo',
          },
          {
            begin: '00:15:03:11',
            end: '00:15:07:02',
            content: 'de ser un caballero para ti,',
          },
          {
            begin: '00:15:03:11',
            end: '00:15:07:02',
            content: 'aunque se escuche',
          },
          {
            begin: '00:15:07:02',
            end: '00:15:11:24',
            content: 'de otros tiempos".',
          },
          {
            begin: '00:15:07:02',
            end: '00:15:11:24',
            content: 'Ay, amiga.',
          },
          {
            begin: '00:15:11:24',
            end: '00:15:13:10',
            content: 'Leticia: No, bueno, es',
          },
          {
            begin: '00:15:11:24',
            end: '00:15:13:10',
            content: 'que esa misma expresión',
          },
          {
            begin: '00:15:13:10',
            end: '00:15:17:01',
            content: 'hice yo cuando lo leí.',
          },
          {
            begin: '00:15:13:10',
            end: '00:15:17:01',
            content: 'Es--No sé, muy caballero,',
          },
          {
            begin: '00:15:17:01',
            end: '00:15:20:02',
            content: 'muy--',
          },
          {
            begin: '00:15:17:01',
            end: '00:15:20:02',
            content: 'Muy buena persona.',
          },
          {
            begin: '00:15:20:02',
            end: '00:15:22:15',
            content: 'Andrea: ¿Qué le dijiste?',
          },
          {
            begin: '00:15:20:02',
            end: '00:15:22:15',
            content: 'A ver, a ver.',
          },
          {
            begin: '00:15:22:15',
            end: '00:15:24:13',
            content: '[Lee] "Puedes llamarme',
          },
          {
            begin: '00:15:22:15',
            end: '00:15:24:13',
            content: 'como quieras,',
          },
          {
            begin: '00:15:24:13',
            end: '00:15:28:24',
            content: 'princesa, doncella, tuya".',
          },
          {
            begin: '00:15:24:13',
            end: '00:15:28:24',
            content: 'Amiga, ¿quién te viera?',
          },
          {
            begin: '00:15:28:24',
            end: '00:15:30:19',
            content: 'Leticia: Ay, es que me moría',
          },
          {
            begin: '00:15:28:24',
            end: '00:15:30:19',
            content: 'de la pena cuando se lo iba',
          },
          {
            begin: '00:15:30:19',
            end: '00:15:33:25',
            content: 'a mandar, pero no sé.',
          },
          {
            begin: '00:15:30:19',
            end: '00:15:33:25',
            content: 'Se me ocurrió y lo hice.',
          },
          {
            begin: '00:15:33:25',
            end: '00:15:35:28',
            content: 'Andrea: Ay, no, amiga,',
          },
          {
            begin: '00:15:33:25',
            end: '00:15:35:28',
            content: 'me parece perfecto que por fin',
          },
          {
            begin: '00:15:35:28',
            end: '00:15:39:02',
            content: 'se te enciendan esas neuronas',
          },
          {
            begin: '00:15:35:28',
            end: '00:15:39:02',
            content: 'y ya se te quite',
          },
          {
            begin: '00:15:39:02',
            end: '00:15:40:23',
            content: 'lo santurrona que eres,',
          },
          {
            begin: '00:15:39:02',
            end: '00:15:40:23',
            content: 'en verdad.',
          },
          {
            begin: '00:15:40:23',
            end: '00:15:45:21',
            content: 'Leticia: Bueno, si tú lo dices.',
          },
          {
            begin: '00:15:40:23',
            end: '00:15:45:21',
            content: 'Andrea: Vámonos.',
          },
          {
            begin: '00:15:45:21',
            end: '00:15:47:22',
            content: 'Fabián: Pues, básicamente',
          },
          {
            begin: '00:15:45:21',
            end: '00:15:47:22',
            content: 'es lo que he estado haciendo',
          },
          {
            begin: '00:15:47:22',
            end: '00:15:49:15',
            content: 'y, como ves, todo va',
          },
          {
            begin: '00:15:47:22',
            end: '00:15:49:15',
            content: 'de acuerdo al plan.',
          },
          {
            begin: '00:15:49:15',
            end: '00:15:51:01',
            content: 'La mosquita muerta',
          },
          {
            begin: '00:15:49:15',
            end: '00:15:51:01',
            content: 'no se puede resistir',
          },
          {
            begin: '00:15:51:01',
            end: '00:15:53:14',
            content: 'a los halagos por--',
          },
          {
            begin: '00:15:51:01',
            end: '00:15:53:14',
            content: 'Por más brutos que sean.',
          },
          {
            begin: '00:15:53:14',
            end: '00:15:55:10',
            content: 'Perro: Dame la contraseña',
          },
          {
            begin: '00:15:53:14',
            end: '00:15:55:10',
            content: 'de esa cuenta ya.',
          },
          {
            begin: '00:15:55:10',
            end: '00:15:57:08',
            content: 'Fabián: ¿Por qué o qué?',
          },
          {
            begin: '00:15:55:10',
            end: '00:15:57:08',
            content: 'Perro: ¿No dijiste',
          },
          {
            begin: '00:15:57:08',
            end: '00:15:58:27',
            content: 'que querías ayuda?',
          },
          {
            begin: '00:15:57:08',
            end: '00:15:58:27',
            content: '¿No dijiste que sueñas',
          },
          {
            begin: '00:15:58:27',
            end: '00:16:00:26',
            content: 'con que Leticia tenga',
          },
          {
            begin: '00:15:58:27',
            end: '00:16:00:26',
            content: 'su merecido?',
          },
          {
            begin: '00:16:00:26',
            end: '00:16:03:18',
            content: 'Fabián: Pues, sí, pero...',
          },
          {
            begin: '00:16:00:26',
            end: '00:16:03:18',
            content: 'Perro: Pe--Pero no nada.',
          },
          {
            begin: '00:16:03:18',
            end: '00:16:06:21',
            content: 'O estamos juntos en esto',
          },
          {
            begin: '00:16:03:18',
            end: '00:16:06:21',
            content: 'o yo veo la manera',
          },
          {
            begin: '00:16:06:21',
            end: '00:16:08:12',
            content: 'de vengarme de esa maldita',
          },
          {
            begin: '00:16:06:21',
            end: '00:16:08:12',
            content: 'que solo me quiere',
          },
          {
            begin: '00:16:08:12',
            end: '00:16:11:22',
            content: 'meter en problemas.',
          },
          {
            begin: '00:16:08:12',
            end: '00:16:11:22',
            content: 'Fabián: Bueno, está bien,',
          },
          {
            begin: '00:16:11:22',
            end: '00:16:14:10',
            content: 'pero tienes que prometerme',
          },
          {
            begin: '00:16:11:22',
            end: '00:16:14:10',
            content: 'que no le vas a poner nada.',
          },
          {
            begin: '00:16:14:10',
            end: '00:16:18:16',
            content: 'Tengo que trabajarla y que--',
          },
          {
            begin: '00:16:14:10',
            end: '00:16:18:16',
            content: 'Hacer que no parezca tan obvio.',
          },
          {
            begin: '00:16:18:16',
            end: '00:16:20:20',
            content: 'Perro: Que sí,',
          },
          {
            begin: '00:16:18:16',
            end: '00:16:20:20',
            content: 'que sí, solo quiero estar',
          },
          {
            begin: '00:16:20:20',
            end: '00:16:23:02',
            content: 'enterado de lo que te pone',
          },
          {
            begin: '00:16:20:20',
            end: '00:16:23:02',
            content: 'a cada minuto.',
          },
          {
            begin: '00:16:23:02',
            end: '00:16:25:21',
            content: 'Si son mensajes privados,',
          },
          {
            begin: '00:16:23:02',
            end: '00:16:25:21',
            content: 'no los puedo ver, ¿o sí?',
          },
          {
            begin: '00:16:25:21',
            end: '00:16:27:13',
            content: 'Fabián: Tenemos que tener',
          },
          {
            begin: '00:16:25:21',
            end: '00:16:27:13',
            content: 'mucho cuidado.',
          },
          {
            begin: '00:16:27:13',
            end: '00:16:30:26',
            content: 'La mosquita muerta es tonta,',
          },
          {
            begin: '00:16:27:13',
            end: '00:16:30:26',
            content: 'pero no es para tanto.',
          },
          {
            begin: '00:16:30:26',
            end: '00:16:33:00',
            content: 'Perro: Quiero que su teatrito',
          },
          {
            begin: '00:16:30:26',
            end: '00:16:33:00',
            content: 'de buena onda se caiga',
          },
          {
            begin: '00:16:33:00',
            end: '00:16:35:00',
            content: 'por completo.',
          },
          {
            begin: '00:16:33:00',
            end: '00:16:35:00',
            content: 'Tenías razón,',
          },
          {
            begin: '00:16:35:00',
            end: '00:16:37:21',
            content: 'es una mosca muerta,',
          },
          {
            begin: '00:16:35:00',
            end: '00:16:37:21',
            content: 'es una hipócrita,',
          },
          {
            begin: '00:16:37:21',
            end: '00:16:39:10',
            content: 'es una cara bien.',
          },
          {
            begin: '00:16:44:16',
            end: '00:16:45:26',
            content: '[Celular]',
          },
          {
            begin: '00:16:44:16',
            end: '00:16:45:26',
            content: 'Daniela: Oye, ¿no vas',
          },
          {
            begin: '00:16:45:26',
            end: '00:16:47:19',
            content: 'a responder?',
          },
          {
            begin: '00:16:45:26',
            end: '00:16:47:19',
            content: 'Fabián: No, no voy a responder.',
          },
          {
            begin: '00:16:47:19',
            end: '00:16:50:01',
            content: 'Daniela: Oye, ¿y por qué',
          },
          {
            begin: '00:16:47:19',
            end: '00:16:50:01',
            content: 'a tu amigo le dicen el Perro?',
          },
          {
            begin: '00:16:50:01',
            end: '00:16:51:27',
            content: 'Fabián: Ay, no sé, Daniela.',
          },
          {
            begin: '00:16:50:01',
            end: '00:16:51:27',
            content: 'Igual y porque le gustan',
          },
          {
            begin: '00:16:51:27',
            end: '00:16:53:15',
            content: 'los perros.',
          },
          {
            begin: '00:16:51:27',
            end: '00:16:53:15',
            content: 'Daniela: Ah, ¿sí?',
          },
          {
            begin: '00:16:53:15',
            end: '00:16:55:02',
            content: '¿Y cuántos tiene?',
          },
          {
            begin: '00:16:53:15',
            end: '00:16:55:02',
            content: 'Fabián: Ay, bueno,',
          },
          {
            begin: '00:16:55:02',
            end: '00:16:56:22',
            content: '¿eres tan tonta para no entender',
          },
          {
            begin: '00:16:55:02',
            end: '00:16:56:22',
            content: 'el sarcasmo, eh?',
          },
          {
            begin: '00:16:56:22',
            end: '00:17:00:22',
            content: 'Daniela: [Gime]',
          },
          {
            begin: '00:16:56:22',
            end: '00:17:00:22',
            content: 'Yo solo quería platicar contigo.',
          },
          {
            begin: '00:17:00:22',
            end: '00:17:02:07',
            content: 'Fabián: Bueno, yo estoy harto',
          },
          {
            begin: '00:17:00:22',
            end: '00:17:02:07',
            content: 'de escuchar tu vocecita',
          },
          {
            begin: '00:17:02:07',
            end: '00:17:04:02',
            content: 'todo el día.',
          },
          {
            begin: '00:17:02:07',
            end: '00:17:04:02',
            content: 'Y ya vámonos que quiero llegar',
          },
          {
            begin: '00:17:04:02',
            end: '00:17:05:24',
            content: 'a la casa.',
          },
          {
            begin: '00:17:04:02',
            end: '00:17:05:24',
            content: 'Daniela: ¿Por qué? ¿Qué tienes?',
          },
          {
            begin: '00:17:05:24',
            end: '00:17:08:14',
            content: '¿Te sientes mal?',
          },
          {
            begin: '00:17:05:24',
            end: '00:17:08:14',
            content: 'Fabián: Vas que vuelas',
          },
          {
            begin: '00:17:08:14',
            end: '00:17:15:05',
            content: 'para ser otra mosquita muerta.',
          },
          {
            begin: '00:17:08:14',
            end: '00:17:15:05',
            content: 'Daniela: Ey, espérame.',
          },
          {
            begin: '00:17:15:05',
            end: '00:17:22:13',
            content: '[Alerta de mensaje]',
          },
          {
            begin: '00:17:15:05',
            end: '00:17:22:13',
            content: 'Leticia: Fabrizio dice:',
          },
          {
            begin: '00:17:22:13',
            end: '00:17:27:27',
            content: '[Lee] "Me tienes muy abandonado.',
          },
          {
            begin: '00:17:22:13',
            end: '00:17:27:27',
            content: 'Ni un mensaje ni un hola".',
          },
          {
            begin: '00:17:27:27',
            end: '00:17:29:06',
            content: '"Estaba haciendo tarea".',
          },
          {
            begin: '00:17:33:23',
            end: '00:17:36:09',
            content: '[Alerta de mensaje]',
          },
          {
            begin: '00:17:33:23',
            end: '00:17:36:09',
            content: '"Te lees tan inteligente.',
          },
          {
            begin: '00:17:36:09',
            end: '00:17:38:26',
            content: 'No cabe duda que soy',
          },
          {
            begin: '00:17:36:09',
            end: '00:17:38:26',
            content: 'un afortunado".',
          },
          {
            begin: '00:17:38:26',
            end: '00:17:42:15',
            content: '[Ríe]',
          },
          {
            begin: '00:17:38:26',
            end: '00:17:42:15',
            content: '"Lo que quieres',
          },
          {
            begin: '00:17:42:15',
            end: '00:17:46:04',
            content: 'es que me enamore de ti".',
          },
          {
            begin: '00:17:42:15',
            end: '00:17:46:04',
            content: 'No, ¿cómo le estoy poniendo eso?',
          },
          {
            begin: '00:17:46:04',
            end: '00:17:51:14',
            content: 'No.',
          },
          {
            begin: '00:17:46:04',
            end: '00:17:51:14',
            content: 'Bueno, ¿ya qué?',
          },
          {
            begin: '00:17:51:14',
            end: '00:17:56:00',
            content: '"Y déjame decirte',
          },
          {
            begin: '00:17:51:14',
            end: '00:17:56:00',
            content: 'que lo estás logrando".',
          },
          {
            begin: '00:17:56:00',
            end: '00:17:59:04',
            content: 'Carita de mono',
          },
          {
            begin: '00:17:56:00',
            end: '00:17:59:04',
            content: 'tapándose la cara.',
          },
          {
            begin: '00:17:59:04',
            end: '00:18:03:09',
            content: '[Ríe]',
          },
          {
            begin: '00:17:59:04',
            end: '00:18:03:09',
            content: 'Estás loca, Leti.',
          },
          {
            begin: '00:18:03:09',
            end: '00:18:08:20',
            content: 'Raquel: ¿Ya me vas a decir',
          },
          {
            begin: '00:18:03:09',
            end: '00:18:08:20',
            content: 'qué te pasó en el brazo?',
          },
          {
            begin: '00:18:08:20',
            end: '00:18:12:04',
            content: 'Daniela: Estaba jugando',
          },
          {
            begin: '00:18:08:20',
            end: '00:18:12:04',
            content: 'y me pegué con la pared.',
          },
          {
            begin: '00:18:12:04',
            end: '00:18:15:01',
            content: 'Raquel: Ay, sí, cómo no...',
          },
          {
            begin: '00:18:12:04',
            end: '00:18:15:01',
            content: 'A ver, ¿Lupita o Marieta',
          },
          {
            begin: '00:18:15:01',
            end: '00:18:16:27',
            content: 'te lastimaron, eh?',
          },
          {
            begin: '00:18:15:01',
            end: '00:18:16:27',
            content: 'Daniela: Claro que no.',
          },
          {
            begin: '00:18:16:27',
            end: '00:18:20:23',
            content: 'Ellas nunca me harían nada,',
          },
          {
            begin: '00:18:16:27',
            end: '00:18:20:23',
            content: 'Lupita y Marieta no me pegaron.',
          },
          {
            begin: '00:18:20:23',
            end: '00:18:22:25',
            content: 'Eduardo: ¿Que Lupita y Marieta',
          },
          {
            begin: '00:18:20:23',
            end: '00:18:22:25',
            content: 'te pegaron?',
          },
          {
            begin: '00:18:22:25',
            end: '00:18:24:19',
            content: 'Raquel: Que no, Eduardo,',
          },
          {
            begin: '00:18:22:25',
            end: '00:18:24:19',
            content: 'que me está diciendo',
          },
          {
            begin: '00:18:24:19',
            end: '00:18:26:19',
            content: 'que fue un accidente--',
          },
          {
            begin: '00:18:24:19',
            end: '00:18:26:19',
            content: 'Eduardo: Mañana mismo',
          },
          {
            begin: '00:18:26:19',
            end: '00:18:28:18',
            content: 'voy a hablar con don Tomás.',
          },
          {
            begin: '00:18:26:19',
            end: '00:18:28:18',
            content: '¿Cómo es posible',
          },
          {
            begin: '00:18:28:18',
            end: '00:18:32:09',
            content: 'que pasen estas cosas?',
          },
          {
            begin: '00:18:28:18',
            end: '00:18:32:09',
            content: 'Daniela: Fue Fabián.',
          },
          {
            begin: '00:18:32:09',
            end: '00:18:34:02',
            content: 'Raquel: Oye, Daniela,',
          },
          {
            begin: '00:18:32:09',
            end: '00:18:34:02',
            content: 'no te hemos enseñado a mentir,',
          },
          {
            begin: '00:18:34:02',
            end: '00:18:35:26',
            content: '¿eh?',
          },
          {
            begin: '00:18:34:02',
            end: '00:18:35:26',
            content: '¿Por qué dices',
          },
          {
            begin: '00:18:35:26',
            end: '00:18:37:22',
            content: 'que tu hermano te lastimó?',
          },
          {
            begin: '00:18:35:26',
            end: '00:18:37:22',
            content: 'Daniela: Yo solamente',
          },
          {
            begin: '00:18:37:22',
            end: '00:18:40:28',
            content: 'le pregunté sobre su amigo,',
          },
          {
            begin: '00:18:37:22',
            end: '00:18:40:28',
            content: 'al que le dicen el Perro,',
          },
          {
            begin: '00:18:40:28',
            end: '00:18:43:15',
            content: 'con el que estaba en el café.',
          },
          {
            begin: '00:18:40:28',
            end: '00:18:43:15',
            content: 'Me zangoloteó',
          },
          {
            begin: '00:18:43:15',
            end: '00:18:52:09',
            content: 'y se puso como loco.',
          },
          {
            begin: '00:18:43:15',
            end: '00:18:52:09',
            content: 'Eduardo: [Gruñe]',
          },
          {
            begin: '00:18:52:09',
            end: '00:18:54:23',
            content: 'Ayer me contuve,',
          },
          {
            begin: '00:18:52:09',
            end: '00:18:54:23',
            content: 'pero ya estuvo bueno.',
          },
          {
            begin: '00:18:54:23',
            end: '00:18:56:28',
            content: 'Fabián: ¿De qué hablas?',
          },
          {
            begin: '00:18:54:23',
            end: '00:18:56:28',
            content: 'Eduardo: [Burla] ¿De qué hablas?',
          },
          {
            begin: '00:18:56:28',
            end: '00:19:00:15',
            content: 'Habla como hombre.',
          },
          {
            begin: '00:18:56:28',
            end: '00:19:00:15',
            content: 'Fabián: Yo no hice nada, papá.',
          },
          {
            begin: '00:19:00:15',
            end: '00:19:02:28',
            content: 'Eduardo: ¿Lastimar a tu hermana',
          },
          {
            begin: '00:19:00:15',
            end: '00:19:02:28',
            content: 'no es nada?',
          },
          {
            begin: '00:19:02:28',
            end: '00:19:06:00',
            content: '¿Quién te crees?',
          },
          {
            begin: '00:19:02:28',
            end: '00:19:06:00',
            content: 'Fabián: Bueno, fue sin querer.',
          },
          {
            begin: '00:19:06:00',
            end: '00:19:07:19',
            content: 'Eduardo: Sin querer,',
          },
          {
            begin: '00:19:06:00',
            end: '00:19:07:19',
            content: 'como otra vez te fuiste',
          },
          {
            begin: '00:19:07:19',
            end: '00:19:10:12',
            content: 'sin querer con un amiguito',
          },
          {
            begin: '00:19:07:19',
            end: '00:19:10:12',
            content: 'que le dicen el Perro.',
          },
          {
            begin: '00:19:10:12',
            end: '00:19:12:06',
            content: 'Fabián: Es un compañero',
          },
          {
            begin: '00:19:10:12',
            end: '00:19:12:06',
            content: 'de la escuela, papá.',
          },
          {
            begin: '00:19:12:06',
            end: '00:19:13:24',
            content: 'Eduardo: ¿Y los compañeros',
          },
          {
            begin: '00:19:12:06',
            end: '00:19:13:24',
            content: 'de la escuela se van',
          },
          {
            begin: '00:19:13:24',
            end: '00:19:16:08',
            content: 'a tomar cafecito?',
          },
          {
            begin: '00:19:13:24',
            end: '00:19:16:08',
            content: 'No lo sabía.',
          },
          {
            begin: '00:19:16:08',
            end: '00:19:18:27',
            content: 'Te ordeno que desde mañana',
          },
          {
            begin: '00:19:16:08',
            end: '00:19:18:27',
            content: 'directo de clases',
          },
          {
            begin: '00:19:18:27',
            end: '00:19:21:03',
            content: 'te vengas para acá.',
          },
          {
            begin: '00:19:18:27',
            end: '00:19:21:03',
            content: 'Fabián: Pues, por mí mejor.',
          },
          {
            begin: '00:19:21:03',
            end: '00:19:23:07',
            content: 'Y a ver quién pasa por Daniela',
          },
          {
            begin: '00:19:21:03',
            end: '00:19:23:07',
            content: 'a su guardería.',
          },
          {
            begin: '00:19:23:07',
            end: '00:19:26:16',
            content: 'Eduardo: Uno más,',
          },
          {
            begin: '00:19:23:07',
            end: '00:19:26:16',
            content: 'uno más, Fabián,',
          },
          {
            begin: '00:19:26:16',
            end: '00:19:35:16',
            content: 'ya te lo había advertido,',
          },
          {
            begin: '00:19:26:16',
            end: '00:19:35:16',
            content: 'y te largas de mi casa.',
          },
          {
            begin: '00:19:35:16',
            end: '00:19:37:09',
            content: 'Fabián: Todas las mujeres',
          },
          {
            begin: '00:19:35:16',
            end: '00:19:37:09',
            content: 'son igual de estúpidas,',
          },
          {
            begin: '00:19:37:09',
            end: '00:19:39:02',
            content: 'débiles, hipócritas.',
          },
          {
            begin: '00:19:43:19',
            end: '00:19:45:02',
            content: 'Raquel: ¿Hablaste con Fabián?',
          },
          {
            begin: '00:19:43:19',
            end: '00:19:45:02',
            content: '¿Qué te dijo?',
          },
          {
            begin: '00:19:45:02',
            end: '00:19:47:17',
            content: 'Eduardo: ¿Qué me va a decir',
          },
          {
            begin: '00:19:45:02',
            end: '00:19:47:17',
            content: 'ese cobarde?',
          },
          {
            begin: '00:19:47:17',
            end: '00:19:51:04',
            content: 'Que fue sin querer.',
          },
          {
            begin: '00:19:47:17',
            end: '00:19:51:04',
            content: 'Yo no sé en qué momento Dios',
          },
          {
            begin: '00:19:51:04',
            end: '00:19:53:22',
            content: 'me castigó con un hijo así.',
          },
          {
            begin: '00:19:51:04',
            end: '00:19:53:22',
            content: 'Raquel: Oye, mira,',
          },
          {
            begin: '00:19:53:22',
            end: '00:19:55:24',
            content: 'Daniela está bien.',
          },
          {
            begin: '00:19:53:22',
            end: '00:19:55:24',
            content: 'Yo mañana hablo con él',
          },
          {
            begin: '00:19:55:24',
            end: '00:19:57:27',
            content: 'y me encargo que no se vuelva',
          },
          {
            begin: '00:19:55:24',
            end: '00:19:57:27',
            content: 'a repetir.',
          },
          {
            begin: '00:19:57:27',
            end: '00:20:02:19',
            content: 'Eduardo: Por ser tan blandengues',
          },
          {
            begin: '00:19:57:27',
            end: '00:20:02:19',
            content: 'con él, por eso salió así.',
          },
          {
            begin: '00:20:02:19',
            end: '00:20:05:15',
            content: 'Raquel: Hay algunas personas',
          },
          {
            begin: '00:20:02:19',
            end: '00:20:05:15',
            content: 'que lo traen de nacimiento,',
          },
          {
            begin: '00:20:05:15',
            end: '00:20:07:20',
            content: 'en los genes.',
          },
          {
            begin: '00:20:05:15',
            end: '00:20:07:20',
            content: 'Eduardo: Los hombres nacen',
          },
          {
            begin: '00:20:07:20',
            end: '00:20:10:07',
            content: 'hombres, Raquel.',
          },
          {
            begin: '00:20:07:20',
            end: '00:20:10:07',
            content: 'No me vuelvas a echar la culpa',
          },
          {
            begin: '00:20:10:07',
            end: '00:20:15:00',
            content: 'de que tu hijo sea un--',
          },
          {
            begin: '00:20:10:07',
            end: '00:20:15:00',
            content: 'Eso.',
          },
          {
            begin: '00:20:15:00',
            end: '00:20:18:04',
            content: 'Leticia: [Lee] "Solo quiero',
          },
          {
            begin: '00:20:15:00',
            end: '00:20:18:04',
            content: 'desearte una excelente noche.',
          },
          {
            begin: '00:20:18:04',
            end: '00:20:20:24',
            content: 'Veo las estrellas,',
          },
          {
            begin: '00:20:18:04',
            end: '00:20:20:24',
            content: 'las cuento y me pregunto',
          },
          {
            begin: '00:20:20:24',
            end: '00:20:23:15',
            content: 'si estás viendo',
          },
          {
            begin: '00:20:20:24',
            end: '00:20:23:15',
            content: 'alguna de ellas y suspirando',
          },
          {
            begin: '00:20:23:15',
            end: '00:20:28:09',
            content: 'como yo lo hago por ti".',
          },
          {
            begin: '00:20:23:15',
            end: '00:20:28:09',
            content: 'Ay...',
          },
          {
            begin: '00:20:28:09',
            end: '00:20:37:07',
            content: '"Ya estaba a punto de dormirme,',
          },
          {
            begin: '00:20:28:09',
            end: '00:20:37:07',
            content: 'pero al leer tu mensaje"--',
          },
          {
            begin: '00:20:37:07',
            end: '00:20:40:00',
            content: 'Fabián: ¿Cómo voy a conciliar',
          },
          {
            begin: '00:20:37:07',
            end: '00:20:40:00',
            content: 'el sueño?',
          },
          {
            begin: '00:20:40:00',
            end: '00:20:43:19',
            content: 'De plano no se puede ser',
          },
          {
            begin: '00:20:40:00',
            end: '00:20:43:19',
            content: 'más ridícula.',
          },
          {
            begin: '00:20:43:19',
            end: '00:20:50:02',
            content: 'Le haré caso al Perro.',
          },
          {
            begin: '00:20:43:19',
            end: '00:20:50:02',
            content: '"Si me enviaras una foto tuya,',
          },
          {
            begin: '00:20:50:02',
            end: '00:21:11:07',
            content: 'tampoco podría dormir',
          },
          {
            begin: '00:20:50:02',
            end: '00:21:11:07',
            content: 'diez mil noches enteras".',
          },
          {
            begin: '00:21:11:07',
            end: '00:21:13:02',
            content: 'Leticia: "Traigo la cara',
          },
          {
            begin: '00:21:11:07',
            end: '00:21:13:02',
            content: 'lavada".',
          },
          {
            begin: '00:21:13:02',
            end: '00:21:15:19',
            content: 'Fabián: [Lee] "Espero que no',
          },
          {
            begin: '00:21:13:02',
            end: '00:21:15:19',
            content: 'te asustes".',
          },
          {
            begin: '00:21:15:19',
            end: '00:21:18:12',
            content: 'Neta cree que su cara',
          },
          {
            begin: '00:21:15:19',
            end: '00:21:18:12',
            content: 'es de presumir.',
          },
          {
            begin: '00:21:18:12',
            end: '00:21:22:00',
            content: 'No cabe duda que la hojalatería',
          },
          {
            begin: '00:21:18:12',
            end: '00:21:22:00',
            content: 'y pintura le hacen un megaparo.',
          },
          {
            begin: '00:21:22:00',
            end: '00:21:28:29',
            content: 'Pero esto no sirve para nada.',
          },
          {
            begin: '00:21:22:00',
            end: '00:21:28:29',
            content: '"Me encanta tu carita',
          },
          {
            begin: '00:21:28:29',
            end: '00:21:32:06',
            content: 'de muñeca de porcelana".',
          },
          {
            begin: '00:21:28:29',
            end: '00:21:32:06',
            content: 'Leticia: "Pero ¿podrías',
          },
          {
            begin: '00:21:32:06',
            end: '00:21:34:05',
            content: 'ayudarme?',
          },
          {
            begin: '00:21:32:06',
            end: '00:21:34:05',
            content: 'Sueño con las líneas',
          },
          {
            begin: '00:21:34:05',
            end: '00:21:38:06',
            content: 'de tu cuerpo,',
          },
          {
            begin: '00:21:34:05',
            end: '00:21:38:06',
            content: 'con la suavidad de tu piel.',
          },
          {
            begin: '00:21:38:06',
            end: '00:21:42:14',
            content: 'Ayúdame a ponerle imagen',
          },
          {
            begin: '00:21:38:06',
            end: '00:21:42:14',
            content: 'a lo que tanto he añorado.',
          },
          {
            begin: '00:21:42:14',
            end: '00:21:48:27',
            content: '¿Confías en mí?',
          },
          {
            begin: '00:21:42:14',
            end: '00:21:48:27',
            content: '¿Me piensas como yo te pienso?"',
          },
          {
            begin: '00:21:48:27',
            end: '00:21:51:04',
            content: 'Fabián: Escribe,',
          },
          {
            begin: '00:21:48:27',
            end: '00:21:51:04',
            content: 'mosquita muerta.',
          },
          {
            begin: '00:21:51:04',
            end: '00:21:58:00',
            content: 'Mándame la foto de tu cuerpo.',
          },
          {
            begin: '00:21:51:04',
            end: '00:21:58:00',
            content: 'Leticia: Ay, no, ya.',
          },
          {
            begin: '00:21:58:00',
            end: '00:22:07:10',
            content: 'Tengo una idea.',
          },
          {
            begin: '00:21:58:00',
            end: '00:22:07:10',
            content: '[Música]',
          },
          {
            begin: '00:22:07:10',
            end: '00:22:13:15',
            content: '        a]',
          },
          {
            begin: '00:22:07:10',
            end: '00:22:13:15',
            content: 'Fabián: ¿Ya viste que siempre sí',
          },
          {
            begin: '00:22:13:15',
            end: '00:22:16:12',
            content: 'me mandó foto?',
          },
          {
            begin: '00:22:13:15',
            end: '00:22:16:12',
            content: 'Perro: [Ríe]',
          },
          {
            begin: '00:22:16:12',
            end: '00:22:19:00',
            content: '¿Es neta?',
          },
          {
            begin: '00:22:16:12',
            end: '00:22:19:00',
            content: 'Fabián: ¿Qué?',
          },
          {
            begin: '00:22:19:00',
            end: '00:22:22:00',
            content: 'Es que no te entiendo.',
          },
          {
            begin: '00:22:19:00',
            end: '00:22:22:00',
            content: 'Perro: Esto no sirve para nada.',
          },
          {
            begin: '00:22:22:00',
            end: '00:22:25:26',
            content: 'Fabián: Ay, pe--Pero, o sea--',
          },
          {
            begin: '00:22:22:00',
            end: '00:22:25:26',
            content: 'Perro: [Burla] Pe--Pe-Pero--',
          },
          {
            begin: '00:22:25:26',
            end: '00:22:29:02',
            content: 'Es que no sirve para nada.',
          },
          {
            begin: '00:22:25:26',
            end: '00:22:29:02',
            content: 'Solo te envió una foto',
          },
          {
            begin: '00:22:29:02',
            end: '00:22:32:03',
            content: 'y es de traje de baño completo.',
          },
          {
            begin: '00:22:29:02',
            end: '00:22:32:03',
            content: 'No enseña tanga ni nada.',
          },
          {
            begin: '00:22:32:03',
            end: '00:22:33:19',
            content: 'Fabián: O sea, sí,',
          },
          {
            begin: '00:22:32:03',
            end: '00:22:33:19',
            content: 'pero esto es lo único',
          },
          {
            begin: '00:22:33:19',
            end: '00:22:36:08',
            content: 'que le pude sacar.',
          },
          {
            begin: '00:22:33:19',
            end: '00:22:36:08',
            content: 'Perro: No sirve de nada,',
          },
          {
            begin: '00:22:36:08',
            end: '00:22:39:06',
            content: 'no está enseñando nada.',
          },
          {
            begin: '00:22:36:08',
            end: '00:22:39:06',
            content: 'Fabián: Bueno, es que según tú',
          },
          {
            begin: '00:22:39:06',
            end: '00:22:40:19',
            content: 'todo lo que yo hago está mal,',
          },
          {
            begin: '00:22:39:06',
            end: '00:22:40:19',
            content: '¿verdad?',
          },
          {
            begin: '00:22:40:19',
            end: '00:22:47:03',
            content: 'Perro: Conste que yo no lo dije.',
          },
          {
            begin: '00:22:40:19',
            end: '00:22:47:03',
            content: '[Timbre]',
          },
          {
            begin: '00:22:47:03',
            end: '00:22:50:14',
            content: 'Perro: ¿Qué "tran"?',
          },
          {
            begin: '00:22:47:03',
            end: '00:22:50:14',
            content: '>> Ay, sigues juntándote',
          },
          {
            begin: '00:22:50:14',
            end: '00:22:53:06',
            content: 'con tu amigo el feo.',
          },
          {
            begin: '00:22:50:14',
            end: '00:22:53:06',
            content: 'Perro: Por lástima.',
          },
          {
            begin: '00:22:53:06',
            end: '00:22:55:23',
            content: 'Ya sabes, es como',
          },
          {
            begin: '00:22:53:06',
            end: '00:22:55:23',
            content: 'mi obra de caridad.',
          },
          {
            begin: '00:22:55:23',
            end: '00:23:01:05',
            content: '>> Ajá, caridad.',
          },
          {
            begin: '00:22:55:23',
            end: '00:23:01:05',
            content: 'Perro: [Asiente]',
          },
          {
            begin: '00:23:01:05',
            end: '00:23:03:07',
            content: 'Andrea: Ay, no, amiga, ¿es neta',
          },
          {
            begin: '00:23:01:05',
            end: '00:23:03:07',
            content: 'que le enviaste esta foto?',
          },
          {
            begin: '00:23:03:07',
            end: '00:23:04:22',
            content: 'Leticia: Pues, ¿qué tiene',
          },
          {
            begin: '00:23:03:07',
            end: '00:23:04:22',
            content: 'de malo?',
          },
          {
            begin: '00:23:04:22',
            end: '00:23:07:10',
            content: 'Andrea: No, neta que si hubiera',
          },
          {
            begin: '00:23:04:22',
            end: '00:23:07:10',
            content: 'una clase de "selfies", tú',
          },
          {
            begin: '00:23:07:10',
            end: '00:23:09:19',
            content: 'repruebas esa materia de plano.',
          },
          {
            begin: '00:23:07:10',
            end: '00:23:09:19',
            content: 'Leticia: A ver, ¿no has visto',
          },
          {
            begin: '00:23:09:19',
            end: '00:23:13:06',
            content: 'todos esos casos donde filtran',
          },
          {
            begin: '00:23:09:19',
            end: '00:23:13:06',
            content: 'fotos de chavitas?',
          },
          {
            begin: '00:23:13:06',
            end: '00:23:16:20',
            content: 'Acuérdate que la prefecta Lorena',
          },
          {
            begin: '00:23:13:06',
            end: '00:23:16:20',
            content: 'nos pidió que visitáramos',
          },
          {
            begin: '00:23:16:20',
            end: '00:23:19:16',
            content: 'la página de muchoojo.org.',
          },
          {
            begin: '00:23:16:20',
            end: '00:23:19:16',
            content: 'Andrea: O sea, es neta',
          },
          {
            begin: '00:23:19:16',
            end: '00:23:21:15',
            content: 'que lo hiciste.',
          },
          {
            begin: '00:23:19:16',
            end: '00:23:21:15',
            content: 'Ay, no, amiga, te pasas.',
          },
          {
            begin: '00:23:21:15',
            end: '00:23:23:11',
            content: 'De verdad, o sea,',
          },
          {
            begin: '00:23:21:15',
            end: '00:23:23:11',
            content: 'entiendo que tienes',
          },
          {
            begin: '00:23:23:11',
            end: '00:23:25:12',
            content: 'superbuena autoestima y todo,',
          },
          {
            begin: '00:23:23:11',
            end: '00:23:25:12',
            content: 'pero no es como que',
          },
          {
            begin: '00:23:25:12',
            end: '00:23:27:07',
            content: 'con este cuerpo',
          },
          {
            begin: '00:23:25:12',
            end: '00:23:27:07',
            content: 'se van a filtrar fotos.',
          },
          {
            begin: '00:23:27:07',
            end: '00:23:29:00',
            content: 'Leticia: Pues, prefiero',
          },
          {
            begin: '00:23:27:07',
            end: '00:23:29:00',
            content: 'no arriesgarme, ¿eh?',
          },
          {
            begin: '00:23:29:00',
            end: '00:23:32:22',
            content: 'La verdad vi muchos videos',
          },
          {
            begin: '00:23:29:00',
            end: '00:23:32:22',
            content: 'de muchas cosas y está cañón.',
          },
          {
            begin: '00:23:32:22',
            end: '00:23:34:15',
            content: 'Andrea: Amiga, lo que pasa',
          },
          {
            begin: '00:23:32:22',
            end: '00:23:34:15',
            content: 'es que tú no sabes',
          },
          {
            begin: '00:23:34:15',
            end: '00:23:37:29',
            content: 'lo que es "sexting".',
          },
          {
            begin: '00:23:34:15',
            end: '00:23:37:29',
            content: 'Es superfácil y es más que obvio',
          },
          {
            begin: '00:23:37:29',
            end: '00:23:40:18',
            content: 'que Fabrizio te pidió eso.',
          },
          {
            begin: '00:23:37:29',
            end: '00:23:40:18',
            content: 'Leticia: ¿Fácil?',
          },
          {
            begin: '00:23:40:18',
            end: '00:23:42:12',
            content: 'Apenas si le pude mandar',
          },
          {
            begin: '00:23:40:18',
            end: '00:23:42:12',
            content: 'esa foto.',
          },
          {
            begin: '00:23:42:12',
            end: '00:23:46:01',
            content: 'Y no me sentí bien haciéndolo.',
          },
          {
            begin: '00:23:42:12',
            end: '00:23:46:01',
            content: 'Andrea: A ver, regla número uno:',
          },
          {
            begin: '00:23:46:01',
            end: '00:23:48:01',
            content: 'Para empezar tu cara',
          },
          {
            begin: '00:23:46:01',
            end: '00:23:48:01',
            content: 'nunca se tiene que ver.',
          },
          {
            begin: '00:23:48:01',
            end: '00:23:51:00',
            content: 'Y número dos:',
          },
          {
            begin: '00:23:48:01',
            end: '00:23:51:00',
            content: 'Ni pulseras ni anillos',
          },
          {
            begin: '00:23:51:00',
            end: '00:23:53:22',
            content: 'ni collares, porque te pueden',
          },
          {
            begin: '00:23:51:00',
            end: '00:23:53:22',
            content: 'reconocer muy fácil.',
          },
          {
            begin: '00:23:53:22',
            end: '00:23:56:12',
            content: 'Regla número tres:',
          },
          {
            begin: '00:23:53:22',
            end: '00:23:56:12',
            content: 'Te tienes que ver supersexy,',
          },
          {
            begin: '00:23:56:12',
            end: '00:23:59:27',
            content: 'superguapa y ya.',
          },
          {
            begin: '00:23:56:12',
            end: '00:23:59:27',
            content: 'Leticia: Amiga, te escuchas',
          },
          {
            begin: '00:23:59:27',
            end: '00:24:02:18',
            content: 'como si te hubieras doctorado',
          },
          {
            begin: '00:23:59:27',
            end: '00:24:02:18',
            content: 'en desnudos.',
          },
          {
            begin: '00:24:02:18',
            end: '00:24:09:28',
            content: 'Andrea: Ay, bueno, o sea, yo--',
          },
          {
            begin: '00:24:02:18',
            end: '00:24:09:28',
            content: 'Yo creo que es muy fácil.',
          },
          {
            begin: '00:24:09:28',
            end: '00:24:12:25',
            content: '>> ¿En serio?',
          },
          {
            begin: '00:24:09:28',
            end: '00:24:12:25',
            content: '¿En serio solo mandó esta foto?',
          },
          {
            begin: '00:24:12:25',
            end: '00:24:14:13',
            content: 'Me cae que Fabián',
          },
          {
            begin: '00:24:12:25',
            end: '00:24:14:13',
            content: 'ni para eso es bueno,',
          },
          {
            begin: '00:24:14:13',
            end: '00:24:16:16',
            content: 'si es bien fácil sacarles',
          },
          {
            begin: '00:24:14:13',
            end: '00:24:16:16',
            content: 'el pack a todas.',
          },
          {
            begin: '00:24:16:16',
            end: '00:24:19:26',
            content: 'Perro: [Ríe]',
          },
          {
            begin: '00:24:16:16',
            end: '00:24:19:26',
            content: 'Tampoco es tan fácil, ¿eh?',
          },
          {
            begin: '00:24:19:26',
            end: '00:24:24:25',
            content: '>> O bueno, no sé,',
          },
          {
            begin: '00:24:19:26',
            end: '00:24:24:25',
            content: 'igual y Leticia no manda--',
          },
          {
            begin: '00:24:24:25',
            end: '00:24:28:09',
            content: 'Desnudez.',
          },
          {
            begin: '00:24:24:25',
            end: '00:24:28:09',
            content: 'Perro: Tú, como todos,',
          },
          {
            begin: '00:24:28:09',
            end: '00:24:30:02',
            content: 'ya le creíste su personaje',
          },
          {
            begin: '00:24:28:09',
            end: '00:24:30:02',
            content: 'de mosca muerta.',
          },
          {
            begin: '00:24:30:02',
            end: '00:24:33:23',
            content: '[Timbre]',
          },
          {
            begin: '00:24:30:02',
            end: '00:24:33:23',
            content: '>> Eres bien exagerado.',
          },
          {
            begin: '00:24:33:23',
            end: '00:24:36:22',
            content: 'Perro: ¿Exagerado yo?',
          },
          {
            begin: '00:24:33:23',
            end: '00:24:36:22',
            content: 'Lorena: Gutberto y compañía,',
          },
          {
            begin: '00:24:36:22',
            end: '00:24:39:29',
            content: 'a su lugar, por favor.',
          },
          {
            begin: '00:24:36:22',
            end: '00:24:39:29',
            content: 'Perro: Sí, maestra.',
          },
          {
            begin: '00:24:39:29',
            end: '00:24:42:00',
            content: 'Lorena: Su profesor no va',
          },
          {
            begin: '00:24:39:29',
            end: '00:24:42:00',
            content: 'a poder venir el día de hoy',
          },
          {
            begin: '00:24:42:00',
            end: '00:24:44:25',
            content: 'por causas personales,',
          },
          {
            begin: '00:24:42:00',
            end: '00:24:44:25',
            content: 'así que quiero platicar',
          },
          {
            begin: '00:24:44:25',
            end: '00:24:47:02',
            content: 'con ustedes',
          },
          {
            begin: '00:24:44:25',
            end: '00:24:47:02',
            content: 'acerca de lo que viene,',
          },
          {
            begin: '00:24:47:02',
            end: '00:24:49:24',
            content: 'la universidad.',
          },
          {
            begin: '00:24:47:02',
            end: '00:24:49:24',
            content: 'La universidad es muy--',
          },
          {
            begin: '00:24:49:24',
            end: '00:24:52:28',
            content: 'Ay, Leti,',
          },
          {
            begin: '00:24:49:24',
            end: '00:24:52:28',
            content: 'antes de que se me olvide,',
          },
          {
            begin: '00:24:52:28',
            end: '00:24:54:27',
            content: 'tengo una muy buena noticia',
          },
          {
            begin: '00:24:52:28',
            end: '00:24:54:27',
            content: 'para ti,',
          },
          {
            begin: '00:24:54:27',
            end: '00:24:56:17',
            content: 'así que te veo',
          },
          {
            begin: '00:24:54:27',
            end: '00:24:56:17',
            content: 'saliendo de clases',
          },
          {
            begin: '00:24:56:17',
            end: '00:25:06:02',
            content: 'en mi cubículo, por favor.',
          },
          {
            begin: '00:24:56:17',
            end: '00:25:06:02',
            content: 'Leticia: Sí.',
          },
          {
            begin: '00:25:06:02',
            end: '00:25:09:00',
            content: '>> [Lee] "Mamacita chula,',
          },
          {
            begin: '00:25:06:02',
            end: '00:25:09:00',
            content: 'la foto de ayer no me sirvió',
          },
          {
            begin: '00:25:09:00',
            end: '00:25:13:28',
            content: 'ni para el arranque".',
          },
          {
            begin: '00:25:09:00',
            end: '00:25:13:28',
            content: 'No seas cruel con mi cora."',
          },
          {
            begin: '00:25:13:28',
            end: '00:25:17:23',
            content: 'O sea, está bien que te burles',
          },
          {
            begin: '00:25:13:28',
            end: '00:25:17:23',
            content: 'de Fabián y su onda romántica',
          },
          {
            begin: '00:25:17:23',
            end: '00:25:20:03',
            content: 'y Romeo y Julieta',
          },
          {
            begin: '00:25:17:23',
            end: '00:25:20:03',
            content: 'y lo que quieras,',
          },
          {
            begin: '00:25:20:03',
            end: '00:25:22:19',
            content: 'pero tampoco te pases.',
          },
          {
            begin: '00:25:20:03',
            end: '00:25:22:19',
            content: '¿En serio le vas a mandar eso?',
          },
          {
            begin: '00:25:22:19',
            end: '00:25:24:26',
            content: 'Perro: ¿Qué tiene de malo?',
          },
          {
            begin: '00:25:22:19',
            end: '00:25:24:26',
            content: 'Si supieras cuántas mujeres',
          },
          {
            begin: '00:25:24:26',
            end: '00:25:27:10',
            content: 'se mueren porque les escribas',
          },
          {
            begin: '00:25:24:26',
            end: '00:25:27:10',
            content: 'así o que les mandes',
          },
          {
            begin: '00:25:27:10',
            end: '00:25:31:13',
            content: 'una fotito en boxers...',
          },
          {
            begin: '00:25:27:10',
            end: '00:25:31:13',
            content: '>> Bueno, no pierdes nada.',
          },
          {
            begin: '00:25:31:13',
            end: '00:25:33:24',
            content: 'Digo, si con toda',
          },
          {
            begin: '00:25:31:13',
            end: '00:25:33:24',
            content: 'la onda romántica y eso,',
          },
          {
            begin: '00:25:33:24',
            end: '00:25:36:09',
            content: 'no soltó un pelo,',
          },
          {
            begin: '00:25:33:24',
            end: '00:25:36:09',
            content: 'pues, al menos estás haciendo',
          },
          {
            begin: '00:25:36:09',
            end: '00:25:38:20',
            content: 'todo para lograrlo, ¿no?',
          },
          {
            begin: '00:25:36:09',
            end: '00:25:38:20',
            content: 'Perro: Sí, ya ves',
          },
          {
            begin: '00:25:38:20',
            end: '00:25:40:12',
            content: 'que es la mascota',
          },
          {
            begin: '00:25:38:20',
            end: '00:25:40:12',
            content: 'de todos los profesores,',
          },
          {
            begin: '00:25:40:12',
            end: '00:25:44:05',
            content: 'hasta de la prefecta.',
          },
          {
            begin: '00:25:40:12',
            end: '00:25:44:05',
            content: '>> Tampoco te azotes, a ver.',
          },
          {
            begin: '00:25:44:05',
            end: '00:25:46:12',
            content: 'Ya hasta suenas igual',
          },
          {
            begin: '00:25:44:05',
            end: '00:25:46:12',
            content: 'que tu puerco amigo.',
          },
          {
            begin: '00:25:46:12',
            end: '00:25:48:24',
            content: '¿Qué te he dicho?',
          },
          {
            begin: '00:25:46:12',
            end: '00:25:48:24',
            content: 'La envidia, dice el autor,',
          },
          {
            begin: '00:25:48:24',
            end: '00:25:52:04',
            content: 'es martillo destructor.',
          },
          {
            begin: '00:25:48:24',
            end: '00:25:52:04',
            content: 'Perro: A ver, ese marrano',
          },
          {
            begin: '00:25:52:04',
            end: '00:25:54:15',
            content: 'no es mi amigo, ¿eh?',
          },
          {
            begin: '00:25:52:04',
            end: '00:25:54:15',
            content: 'Yo no le tengo nada de envidia',
          },
          {
            begin: '00:25:54:15',
            end: '00:25:57:21',
            content: 'a Leticia.',
          },
          {
            begin: '00:25:54:15',
            end: '00:25:57:21',
            content: 'O sea, lo que me preocupa',
          },
          {
            begin: '00:25:57:21',
            end: '00:25:59:14',
            content: 'es que si ella va',
          },
          {
            begin: '00:25:57:21',
            end: '00:25:59:14',
            content: 'y habla con la prefecta,',
          },
          {
            begin: '00:25:59:14',
            end: '00:26:03:00',
            content: 'me van a hacer repetir',
          },
          {
            begin: '00:25:59:14',
            end: '00:26:03:00',
            content: 'el año otra vez.',
          },
          {
            begin: '00:26:03:00',
            end: '00:26:05:09',
            content: '>> Eso sí.',
          },
          {
            begin: '00:26:03:00',
            end: '00:26:05:09',
            content: 'Cuando la prefecta Lorena',
          },
          {
            begin: '00:26:05:09',
            end: '00:26:10:17',
            content: 'se ensaña con alguien,',
          },
          {
            begin: '00:26:05:09',
            end: '00:26:10:17',
            content: 'se ensaña.',
          },
          {
            begin: '00:26:10:17',
            end: '00:26:11:29',
            content: '[Llaman a la puerta]',
          },
          {
            begin: '00:26:10:17',
            end: '00:26:11:29',
            content: 'Leticia: ¿Se puede?',
          },
          {
            begin: '00:26:11:29',
            end: '00:26:15:13',
            content: 'Lorena: Claro que sí, pasa.',
          },
          {
            begin: '00:26:11:29',
            end: '00:26:15:13',
            content: 'Leti,',
          },
          {
            begin: '00:26:15:13',
            end: '00:26:18:03',
            content: 'siéntate, por favor.',
          },
          {
            begin: '00:26:15:13',
            end: '00:26:18:03',
            content: 'Leticia: Gracias.',
          },
          {
            begin: '00:26:18:03',
            end: '00:26:20:10',
            content: 'La verdad, estuvo muy buena',
          },
          {
            begin: '00:26:18:03',
            end: '00:26:20:10',
            content: 'la asesoría de hoy.',
          },
          {
            begin: '00:26:20:10',
            end: '00:26:22:00',
            content: 'Son muchos trámites',
          },
          {
            begin: '00:26:20:10',
            end: '00:26:22:00',
            content: 'los que tenemos que hacer',
          },
          {
            begin: '00:26:22:00',
            end: '00:26:24:09',
            content: 'antes de acabar la prepa.',
          },
          {
            begin: '00:26:22:00',
            end: '00:26:24:09',
            content: 'Lorena: Ay, por cierto,',
          },
          {
            begin: '00:26:24:09',
            end: '00:26:29:19',
            content: 'mira lo que te llegó.',
          },
          {
            begin: '00:26:24:09',
            end: '00:26:29:19',
            content: 'Leticia: ¿Es lo que creo que es?',
          },
          {
            begin: '00:26:29:19',
            end: '00:26:33:07',
            content: 'Lorena: Bueno, hay que abrirlo',
          },
          {
            begin: '00:26:29:19',
            end: '00:26:33:07',
            content: 'primero.',
          },
          {
            begin: '00:26:33:07',
            end: '00:26:38:24',
            content: 'Leticia: Ay, qué padre.',
          },
          {
            begin: '00:26:33:07',
            end: '00:26:38:24',
            content: 'No puedo creerlo,',
          },
          {
            begin: '00:26:38:24',
            end: '00:26:41:18',
            content: 'beca del 100 por ciento.',
          },
          {
            begin: '00:26:38:24',
            end: '00:26:41:18',
            content: '¿Sabes qué es eso?',
          },
          {
            begin: '00:26:41:18',
            end: '00:26:43:12',
            content: 'Andrea: Sí, que vas a estudiar',
          },
          {
            begin: '00:26:41:18',
            end: '00:26:43:12',
            content: 'en la universidad de tus sueños',
          },
          {
            begin: '00:26:43:12',
            end: '00:26:45:16',
            content: 'sin pagar un solo peso.',
          },
          {
            begin: '00:26:43:12',
            end: '00:26:45:16',
            content: 'Leticia: Nada puede ir',
          },
          {
            begin: '00:26:45:16',
            end: '00:26:49:14',
            content: 'mejor hoy, en serio.',
          },
          {
            begin: '00:26:45:16',
            end: '00:26:49:14',
            content: '[Alerta de texto]',
          },
          {
            begin: '00:26:49:14',
            end: '00:26:51:05',
            content: 'Andrea: Ay, bueno, ese Fabrizio',
          },
          {
            begin: '00:26:49:14',
            end: '00:26:51:05',
            content: 'parece que te huele',
          },
          {
            begin: '00:26:51:05',
            end: '00:26:53:05',
            content: 'en todas partes.',
          },
          {
            begin: '00:26:51:05',
            end: '00:26:53:05',
            content: 'Leticia: Tengo que platicarle.',
          },
          {
            begin: '00:26:53:05',
            end: '00:26:55:22',
            content: 'Se va a poner superfeliz.',
          },
          {
            begin: '00:26:53:05',
            end: '00:26:55:22',
            content: 'Y por fin lo voy a invitar',
          },
          {
            begin: '00:26:55:22',
            end: '00:27:01:04',
            content: 'a la fiesta de graduación.',
          },
          {
            begin: '00:26:55:22',
            end: '00:27:01:04',
            content: 'Andrea: ¿Y ahora?',
          },
          {
            begin: '00:27:01:04',
            end: '00:27:02:27',
            content: '¿Qué pasa?',
          },
          {
            begin: '00:27:01:04',
            end: '00:27:02:27',
            content: 'Leticia: Es que nunca',
          },
          {
            begin: '00:27:02:27',
            end: '00:27:05:21',
            content: 'me había dicho mamacita.',
          },
          {
            begin: '00:27:02:27',
            end: '00:27:05:21',
            content: 'No, bueno, y nunca',
          },
          {
            begin: '00:27:05:21',
            end: '00:27:11:18',
            content: 'me había mandado una foto así.',
          },
          {
            begin: '00:27:05:21',
            end: '00:27:11:18',
            content: 'Andrea: Ay, amiga, no solamente',
          },
          {
            begin: '00:27:11:18',
            end: '00:27:13:24',
            content: 'tiene un corazón muy grande,',
          },
          {
            begin: '00:27:11:18',
            end: '00:27:13:24',
            content: 'sino que está hecho un cuero.',
          },
          {
            begin: '00:27:13:24',
            end: '00:27:16:11',
            content: 'Tiene un cuerpazo.',
          },
          {
            begin: '00:27:13:24',
            end: '00:27:16:11',
            content: 'Ay, pero no te azotes,',
          },
          {
            begin: '00:27:16:11',
            end: '00:27:18:09',
            content: 'solamente es una foto en boxers.',
          },
          {
            begin: '00:27:16:11',
            end: '00:27:18:09',
            content: 'Leticia: No, qué boxers',
          },
          {
            begin: '00:27:18:09',
            end: '00:27:20:22',
            content: 'ni qué nada.',
          },
          {
            begin: '00:27:18:09',
            end: '00:27:20:22',
            content: 'Me escribió todo morboso.',
          },
          {
            begin: '00:27:20:22',
            end: '00:27:24:03',
            content: 'Andrea: Ay, pues, ¿qué?',
          },
          {
            begin: '00:27:20:22',
            end: '00:27:24:03',
            content: '¿Qué te puso?',
          },
          {
            begin: '00:27:24:03',
            end: '00:27:26:23',
            content: '[Lee] "Ese trajecito',
          },
          {
            begin: '00:27:24:03',
            end: '00:27:26:23',
            content: 'se te ve apretadito.',
          },
          {
            begin: '00:27:26:23',
            end: '00:27:28:18',
            content: '¿Por qué no lo liberas,',
          },
          {
            begin: '00:27:26:23',
            end: '00:27:28:18',
            content: 'reina chula?',
          },
          {
            begin: '00:27:28:18',
            end: '00:27:31:28',
            content: '¿O qué? ¿No quieres?"',
          },
          {
            begin: '00:27:28:18',
            end: '00:27:31:28',
            content: 'Leticia: Es que hasta parece',
          },
          {
            begin: '00:27:31:28',
            end: '00:27:34:13',
            content: 'otra persona.',
          },
          {
            begin: '00:27:31:28',
            end: '00:27:34:13',
            content: 'Y yo pensando en invitarlo',
          },
          {
            begin: '00:27:34:13',
            end: '00:27:36:18',
            content: 'a la fiesta de graduación...',
          },
          {
            begin: '00:27:34:13',
            end: '00:27:36:18',
            content: 'Andrea: Ah, bueno, amiga,',
          },
          {
            begin: '00:27:36:18',
            end: '00:27:38:02',
            content: 'si tú no quieres,',
          },
          {
            begin: '00:27:36:18',
            end: '00:27:38:02',
            content: 'por mí no hay problema.',
          },
          {
            begin: '00:27:38:02',
            end: '00:27:42:15',
            content: 'Yo lo puedo invitar.',
          },
          {
            begin: '00:27:38:02',
            end: '00:27:42:15',
            content: 'Bueno, ya.',
          },
          {
            begin: '00:27:42:15',
            end: '00:27:50:13',
            content: 'Leticia: No, o sea, no.',
          },
          {
            begin: '00:27:42:15',
            end: '00:27:50:13',
            content: '[Música]',
          },
          {
            begin: '00:27:50:13',
            end: '00:27:52:12',
            content: '[Música]',
          },
          {
            begin: '00:27:55:15',
            end: '00:27:58:05',
            content: 'Lupita: Entonces, Scheherezade',
          },
          {
            begin: '00:27:55:15',
            end: '00:27:58:05',
            content: 'cuenta todos esos cuentos',
          },
          {
            begin: '00:27:58:05',
            end: '00:28:02:16',
            content: 'para salvar su vida.',
          },
          {
            begin: '00:27:58:05',
            end: '00:28:02:16',
            content: 'Daniela: Ah, qué padre.',
          },
          {
            begin: '00:28:02:16',
            end: '00:28:05:16',
            content: 'Lupita: Ni me escuchaste,',
          },
          {
            begin: '00:28:02:16',
            end: '00:28:05:16',
            content: '¿verdad?',
          },
          {
            begin: '00:28:05:16',
            end: '00:28:07:24',
            content: 'Marieta: Oye, Dani, pues,',
          },
          {
            begin: '00:28:05:16',
            end: '00:28:07:24',
            content: 'la verdad es que sí andas',
          },
          {
            begin: '00:28:07:24',
            end: '00:28:10:03',
            content: 'muy distraída hoy.',
          },
          {
            begin: '00:28:07:24',
            end: '00:28:10:03',
            content: '¿Qué tienes?',
          },
          {
            begin: '00:28:10:03',
            end: '00:28:12:26',
            content: 'Daniela: Es que mi hermano',
          },
          {
            begin: '00:28:10:03',
            end: '00:28:12:26',
            content: 'siempre está de malas',
          },
          {
            begin: '00:28:12:26',
            end: '00:28:16:12',
            content: 'y ayer lo regañaron.',
          },
          {
            begin: '00:28:12:26',
            end: '00:28:16:12',
            content: 'Creo que por mi culpa.',
          },
          {
            begin: '00:28:16:12',
            end: '00:28:18:25',
            content: 'Lupita: Sí, pero eso no le da',
          },
          {
            begin: '00:28:16:12',
            end: '00:28:18:25',
            content: 'derecho a zarandearte',
          },
          {
            begin: '00:28:18:25',
            end: '00:28:21:28',
            content: 'como trapo viejo.',
          },
          {
            begin: '00:28:18:25',
            end: '00:28:21:28',
            content: 'Marieta: ¿Te lastimó?',
          },
          {
            begin: '00:28:21:28',
            end: '00:28:24:18',
            content: 'Daniela: Poquito.',
          },
          {
            begin: '00:28:21:28',
            end: '00:28:24:18',
            content: 'Marieta: Ay, no.',
          },
          {
            begin: '00:28:24:18',
            end: '00:28:27:27',
            content: 'Mira, Dani, nadie, nadie',
          },
          {
            begin: '00:28:24:18',
            end: '00:28:27:27',
            content: 'tiene derecho a lastimarte',
          },
          {
            begin: '00:28:27:27',
            end: '00:28:30:11',
            content: 'y obviamente tú no tienes',
          },
          {
            begin: '00:28:27:27',
            end: '00:28:30:11',
            content: 'la culpa.',
          },
          {
            begin: '00:28:30:11',
            end: '00:28:32:11',
            content: 'Te entiendo porque es tu hermano',
          },
          {
            begin: '00:28:30:11',
            end: '00:28:32:11',
            content: 'y lo quieres mucho,',
          },
          {
            begin: '00:28:32:11',
            end: '00:28:34:22',
            content: 'pero espero que ese',
          },
          {
            begin: '00:28:32:11',
            end: '00:28:34:22',
            content: 'jalón de orejas',
          },
          {
            begin: '00:28:34:22',
            end: '00:28:36:21',
            content: 'que le dieron tus papás',
          },
          {
            begin: '00:28:34:22',
            end: '00:28:36:21',
            content: 'le haya servido',
          },
          {
            begin: '00:28:36:21',
            end: '00:28:39:05',
            content: 'para que entendiera.',
          },
          {
            begin: '00:28:36:21',
            end: '00:28:39:05',
            content: 'Daniela: Ojalá.',
          },
          {
            begin: '00:28:39:05',
            end: '00:28:41:13',
            content: 'Lupita: Y ojalá también',
          },
          {
            begin: '00:28:39:05',
            end: '00:28:41:13',
            content: 'se le quite la mala onda',
          },
          {
            begin: '00:28:41:13',
            end: '00:28:44:14',
            content: 'contra las mujeres,',
          },
          {
            begin: '00:28:41:13',
            end: '00:28:44:14',
            content: 'porque yo ya lo he notado.',
          },
          {
            begin: '00:28:44:14',
            end: '00:28:47:19',
            content: 'Y, pues, como dice el dicho,',
          },
          {
            begin: '00:28:44:14',
            end: '00:28:47:19',
            content: '"La envidia, dice el autor,',
          },
          {
            begin: '00:28:47:19',
            end: '00:28:51:07',
            content: 'es martillo destructor".',
          },
          {
            begin: '00:28:47:19',
            end: '00:28:51:07',
            content: 'Daniela: ¿Envidia?',
          },
          {
            begin: '00:28:51:07',
            end: '00:28:52:13',
            content: '¿De las mujeres?',
          },
          {
            begin: '00:28:58:15',
            end: '00:29:02:03',
            content: 'Daniela: Oye, Fabián.',
          },
          {
            begin: '00:28:58:15',
            end: '00:29:02:03',
            content: 'Fabián: ¿Ahora qué quieres?',
          },
          {
            begin: '00:29:02:03',
            end: '00:29:04:19',
            content: 'Daniela: ¿A ti te dan envidia',
          },
          {
            begin: '00:29:02:03',
            end: '00:29:04:19',
            content: 'las mujeres?',
          },
          {
            begin: '00:29:04:19',
            end: '00:29:06:21',
            content: 'Fabián: ¿Y qué se les puede',
          },
          {
            begin: '00:29:04:19',
            end: '00:29:06:21',
            content: 'envidiar a las mujeres?',
          },
          {
            begin: '00:29:06:21',
            end: '00:29:09:00',
            content: 'Si son tontas,',
          },
          {
            begin: '00:29:06:21',
            end: '00:29:09:00',
            content: 'débiles e hipócritas.',
          },
          {
            begin: '00:29:09:00',
            end: '00:29:11:14',
            content: 'Daniela: Claro que no.',
          },
          {
            begin: '00:29:09:00',
            end: '00:29:11:14',
            content: 'Mis amigas no son así',
          },
          {
            begin: '00:29:11:14',
            end: '00:29:13:12',
            content: 'ni mi mamá.',
          },
          {
            begin: '00:29:11:14',
            end: '00:29:13:12',
            content: 'Fabián: Mi mamá...',
          },
          {
            begin: '00:29:13:12',
            end: '00:29:15:15',
            content: 'Mi mamá es débil,',
          },
          {
            begin: '00:29:13:12',
            end: '00:29:15:15',
            content: '¿no ves como la trata mi papá?',
          },
          {
            begin: '00:29:15:15',
            end: '00:29:17:14',
            content: 'Y nunca hace nada',
          },
          {
            begin: '00:29:15:15',
            end: '00:29:17:14',
            content: 'para defenderse.',
          },
          {
            begin: '00:29:17:14',
            end: '00:29:20:10',
            content: 'Es débil.',
          },
          {
            begin: '00:29:17:14',
            end: '00:29:20:10',
            content: 'Daniela: Yo solo preguntaba.',
          },
          {
            begin: '00:29:20:10',
            end: '00:29:32:08',
            content: 'Fabián: Y además de todo,',
          },
          {
            begin: '00:29:20:10',
            end: '00:29:32:08',
            content: 'metiches.',
          },
          {
            begin: '00:29:32:08',
            end: '00:29:36:20',
            content: 'Andrea: Ay, a ver, Fabrizio,',
          },
          {
            begin: '00:29:32:08',
            end: '00:29:36:20',
            content: 'quiero ver si sabes responderle',
          },
          {
            begin: '00:29:36:20',
            end: '00:29:42:21',
            content: 'a una mujer de verdad.',
          },
          {
            begin: '00:29:36:20',
            end: '00:29:42:21',
            content: 'Ay, no,',
          },
          {
            begin: '00:29:42:21',
            end: '00:29:44:01',
            content: 'pero si aquí tengo fotos.',
          },
          {
            begin: '00:29:48:22',
            end: '00:29:52:23',
            content: '"Para que veas que no todas',
          },
          {
            begin: '00:29:48:22',
            end: '00:29:52:23',
            content: 'somos como la monjita',
          },
          {
            begin: '00:29:52:23',
            end: '00:29:56:03',
            content: 'de Leticia,',
          },
          {
            begin: '00:29:52:23',
            end: '00:29:56:03',
            content: 'que por cierto,',
          },
          {
            begin: '00:29:56:03',
            end: '00:30:01:19',
            content: 'me enseñó tu foto',
          },
          {
            begin: '00:29:56:03',
            end: '00:30:01:19',
            content: 'y se burló horrores".',
          },
          {
            begin: '00:30:01:19',
            end: '00:30:05:25',
            content: '[Alerta de texto]',
          },
          {
            begin: '00:30:01:19',
            end: '00:30:05:25',
            content: 'Fabián: [Lee] "Para que veas',
          },
          {
            begin: '00:30:05:25',
            end: '00:30:08:10',
            content: 'que no todos somos',
          },
          {
            begin: '00:30:05:25',
            end: '00:30:08:10',
            content: 'como la monjita de Leticia,',
          },
          {
            begin: '00:30:08:10',
            end: '00:30:10:00',
            content: 'que por cierto,',
          },
          {
            begin: '00:30:08:10',
            end: '00:30:10:00',
            content: 'me enseñó tu foto',
          },
          {
            begin: '00:30:10:00',
            end: '00:30:13:17',
            content: 'y se burló horrores".',
          },
          {
            begin: '00:30:10:00',
            end: '00:30:13:17',
            content: '[Suspira]',
          },
          {
            begin: '00:30:13:17',
            end: '00:30:15:13',
            content: 'El maldito del Perro',
          },
          {
            begin: '00:30:13:17',
            end: '00:30:15:13',
            content: 'le mandó foto y le escribió',
          },
          {
            begin: '00:30:15:13',
            end: '00:30:20:23',
            content: 'puras leperadas.',
          },
          {
            begin: '00:30:15:13',
            end: '00:30:20:23',
            content: '"No puedo creer',
          },
          {
            begin: '00:30:20:23',
            end: '00:30:23:16',
            content: 'lo que me dices".',
          },
          {
            begin: '00:30:20:23',
            end: '00:30:23:16',
            content: 'Andrea: "Y me da muchísima pena',
          },
          {
            begin: '00:30:23:16',
            end: '00:30:27:26',
            content: 'que hayas visto algo',
          },
          {
            begin: '00:30:23:16',
            end: '00:30:27:26',
            content: 'tan íntimo".',
          },
          {
            begin: '00:30:27:26',
            end: '00:30:31:15',
            content: '"Eso es algo que diría',
          },
          {
            begin: '00:30:27:26',
            end: '00:30:31:15',
            content: 'mi abuelito".',
          },
          {
            begin: '00:30:31:15',
            end: '00:30:33:22',
            content: 'Fabián: [Lee] "Que no te dé',
          },
          {
            begin: '00:30:31:15',
            end: '00:30:33:22',
            content: 'pena, no soy nadie para juzgar.',
          },
          {
            begin: '00:30:33:22',
            end: '00:30:37:17',
            content: 'Al contrario, si me preguntas,',
          },
          {
            begin: '00:30:33:22',
            end: '00:30:37:17',
            content: 'estás buenísimo.',
          },
          {
            begin: '00:30:37:17',
            end: '00:30:39:16',
            content: 'Y como mi amiguita',
          },
          {
            begin: '00:30:37:17',
            end: '00:30:39:16',
            content: 'no quiere hacerlo,',
          },
          {
            begin: '00:30:39:16',
            end: '00:30:41:27',
            content: 'yo me voy a animar.',
          },
          {
            begin: '00:30:39:16',
            end: '00:30:41:27',
            content: '¿Quieres ir conmigo a la fiesta',
          },
          {
            begin: '00:30:41:27',
            end: '00:30:46:00',
            content: 'de la generación?"',
          },
          {
            begin: '00:30:41:27',
            end: '00:30:46:00',
            content: '>> Ay, Leti, no sabes',
          },
          {
            begin: '00:30:46:00',
            end: '00:30:48:29',
            content: 'lo orgullosa que estoy de ti.',
          },
          {
            begin: '00:30:46:00',
            end: '00:30:48:29',
            content: 'Imagínate, más de 100 alumnos',
          },
          {
            begin: '00:30:48:29',
            end: '00:30:51:04',
            content: 'se inscribieron',
          },
          {
            begin: '00:30:48:29',
            end: '00:30:51:04',
            content: 'para obtener esa beca',
          },
          {
            begin: '00:30:51:04',
            end: '00:30:53:13',
            content: 'y te la dieron a ti.',
          },
          {
            begin: '00:30:51:04',
            end: '00:30:53:13',
            content: 'Ay...',
          },
          {
            begin: '00:30:53:13',
            end: '00:30:55:05',
            content: 'Leticia: Sí, pero todo',
          },
          {
            begin: '00:30:53:13',
            end: '00:30:55:05',
            content: 'estaría perfecto, si no fuera',
          },
          {
            begin: '00:30:55:05',
            end: '00:30:58:28',
            content: 'por este chavo que me estaba',
          },
          {
            begin: '00:30:55:05',
            end: '00:30:58:28',
            content: 'moviendo el tapete, la verdad.',
          },
          {
            begin: '00:30:58:28',
            end: '00:31:01:20',
            content: '>> El que me dijiste.',
          },
          {
            begin: '00:30:58:28',
            end: '00:31:01:20',
            content: '¿Cómo? ¿No te va a acompañar',
          },
          {
            begin: '00:31:01:20',
            end: '00:31:03:16',
            content: 'a la fiesta?',
          },
          {
            begin: '00:31:01:20',
            end: '00:31:03:16',
            content: 'Leticia: Pues, ya no pude',
          },
          {
            begin: '00:31:03:16',
            end: '00:31:05:19',
            content: 'decirle nada.',
          },
          {
            begin: '00:31:03:16',
            end: '00:31:05:19',
            content: 'Yo creo que me ilusioné',
          },
          {
            begin: '00:31:05:19',
            end: '00:31:09:06',
            content: 'demasiado.',
          },
          {
            begin: '00:31:05:19',
            end: '00:31:09:06',
            content: 'Aparte, no nos hemos visto.',
          },
          {
            begin: '00:31:09:06',
            end: '00:31:11:27',
            content: '>> ¿Cómo?',
          },
          {
            begin: '00:31:09:06',
            end: '00:31:11:27',
            content: '¿Qué no va a en tu prepa?',
          },
          {
            begin: '00:31:11:27',
            end: '00:31:14:21',
            content: 'Leticia: No, va en otra.',
          },
          {
            begin: '00:31:11:27',
            end: '00:31:14:21',
            content: '>> Ay, ya me había espantado.',
          },
          {
            begin: '00:31:14:21',
            end: '00:31:19:21',
            content: 'Dije qué tal si no lo conoce',
          },
          {
            begin: '00:31:14:21',
            end: '00:31:19:21',
            content: 'ni en persona.',
          },
          {
            begin: '00:31:19:21',
            end: '00:31:21:06',
            content: 'Pero eso no es lo importante,',
          },
          {
            begin: '00:31:19:21',
            end: '00:31:21:06',
            content: 'mi amor.',
          },
          {
            begin: '00:31:21:06',
            end: '00:31:24:02',
            content: 'Mira, invítalo a salir',
          },
          {
            begin: '00:31:21:06',
            end: '00:31:24:02',
            content: 'a tomar un café, un helado,',
          },
          {
            begin: '00:31:24:02',
            end: '00:31:27:05',
            content: 'lo que quieras,',
          },
          {
            begin: '00:31:24:02',
            end: '00:31:27:05',
            content: 'que te dé el aire, Leti.',
          },
          {
            begin: '00:31:27:05',
            end: '00:31:31:09',
            content: '¿Sabes qué?',
          },
          {
            begin: '00:31:27:05',
            end: '00:31:31:09',
            content: 'No todo es estudiar, ¿eh?',
          },
          {
            begin: '00:31:31:09',
            end: '00:31:34:10',
            content: 'Come.',
          },
          {
            begin: '00:31:31:09',
            end: '00:31:34:10',
            content: 'Leticia: Está bien, mamá.',
          },
          {
            begin: '00:31:34:10',
            end: '00:31:35:09',
            content: '>> Quedó rico.',
          },
          {
            begin: '00:31:40:29',
            end: '00:31:41:28',
            content: '[Llaman a la puerta]',
          },
          {
            begin: '00:31:49:00',
            end: '00:31:51:11',
            content: 'Daniela: Hola.',
          },
          {
            begin: '00:31:49:00',
            end: '00:31:51:11',
            content: 'Tú eres el Perro, ¿no?',
          },
          {
            begin: '00:31:51:11',
            end: '00:31:54:00',
            content: 'Perro: Sí, ¿qué onda?',
          },
          {
            begin: '00:31:51:11',
            end: '00:31:54:00',
            content: '¿Está Fabián?',
          },
          {
            begin: '00:31:54:00',
            end: '00:31:56:27',
            content: 'Daniela: Sí, claro, pasa.',
          },
          {
            begin: '00:31:54:00',
            end: '00:31:56:27',
            content: '¡Fabián!',
          },
          {
            begin: '00:31:56:27',
            end: '00:31:59:25',
            content: 'Fabián: ¡Voy!',
          },
          {
            begin: '00:31:56:27',
            end: '00:31:59:25',
            content: 'Daniela: Fabián.',
          },
          {
            begin: '00:31:59:25',
            end: '00:32:04:11',
            content: 'Fabián: Que no me grites.',
          },
          {
            begin: '00:31:59:25',
            end: '00:32:04:11',
            content: 'Perro: ¿Por qué no contestas',
          },
          {
            begin: '00:32:04:11',
            end: '00:32:07:04',
            content: 'los mensajes y me mandas',
          },
          {
            begin: '00:32:04:11',
            end: '00:32:07:04',
            content: 'al buzón las llamadas, eh?',
          },
          {
            begin: '00:32:07:04',
            end: '00:32:09:12',
            content: 'Fabián: No sé de qué',
          },
          {
            begin: '00:32:07:04',
            end: '00:32:09:12',
            content: 'me estás hablando.',
          },
          {
            begin: '00:32:09:12',
            end: '00:32:11:16',
            content: 'Perro: No te hagas tonto.',
          },
          {
            begin: '00:32:09:12',
            end: '00:32:11:16',
            content: 'Si cambiaste la contraseña',
          },
          {
            begin: '00:32:11:16',
            end: '00:32:13:12',
            content: 'y ahora no puedo ver',
          },
          {
            begin: '00:32:11:16',
            end: '00:32:13:12',
            content: 'lo que te pone.',
          },
          {
            begin: '00:32:13:12',
            end: '00:32:15:01',
            content: 'Fabián: Bueno, es que',
          },
          {
            begin: '00:32:13:12',
            end: '00:32:15:01',
            content: 'tú arruinaste todo.',
          },
          {
            begin: '00:32:15:01',
            end: '00:32:19:25',
            content: 'Te dije que no pusieras nada.',
          },
          {
            begin: '00:32:15:01',
            end: '00:32:19:25',
            content: '[Alerta de texto]',
          },
          {
            begin: '00:32:19:25',
            end: '00:32:24:06',
            content: 'Perro: ¿Qué? ¿Quién es?',
          },
          {
            begin: '00:32:19:25',
            end: '00:32:24:06',
            content: 'Es la mosquita muerta, ¿verdad?',
          },
          {
            begin: '00:32:24:06',
            end: '00:32:27:24',
            content: 'Fabián: Hay pájaros',
          },
          {
            begin: '00:32:24:06',
            end: '00:32:27:24',
            content: 'en el alambre, vamos arriba.',
          },
          {
            begin: '00:32:27:24',
            end: '00:32:44:23',
            content: 'Daniela: Adiós, Perro.',
          },
          {
            begin: '00:32:27:24',
            end: '00:32:44:23',
            content: 'Perro: Adiós.',
          },
          {
            begin: '00:32:44:23',
            end: '00:32:46:10',
            content: 'Eduardo: No puedo creer',
          },
          {
            begin: '00:32:44:23',
            end: '00:32:46:10',
            content: 'que pedir el reembolso',
          },
          {
            begin: '00:32:46:10',
            end: '00:32:48:24',
            content: 'de tus gastos médicos',
          },
          {
            begin: '00:32:46:10',
            end: '00:32:48:24',
            content: 'implique tanto relajo.',
          },
          {
            begin: '00:32:48:24',
            end: '00:32:50:21',
            content: 'Raquel: Pues, hubiera ido',
          },
          {
            begin: '00:32:48:24',
            end: '00:32:50:21',
            content: 'yo sola, pero sabes',
          },
          {
            begin: '00:32:50:21',
            end: '00:32:54:00',
            content: 'que se necesitaba tu firma.',
          },
          {
            begin: '00:32:50:21',
            end: '00:32:54:00',
            content: 'Eduardo: Ya perdí todo el día,',
          },
          {
            begin: '00:32:54:00',
            end: '00:32:58:22',
            content: '¿ya qué?',
          },
          {
            begin: '00:32:54:00',
            end: '00:32:58:22',
            content: '¿Qué vas a hacer de comer?',
          },
          {
            begin: '00:32:58:22',
            end: '00:33:01:23',
            content: 'Raquel: Dani, ¿no te llevó',
          },
          {
            begin: '00:32:58:22',
            end: '00:33:01:23',
            content: 'tu hermano con Marieta?',
          },
          {
            begin: '00:33:01:23',
            end: '00:33:04:05',
            content: 'Daniela: No,',
          },
          {
            begin: '00:33:01:23',
            end: '00:33:04:05',
            content: 'creo que porque vino su amigo.',
          },
          {
            begin: '00:33:04:05',
            end: '00:33:06:25',
            content: 'Eduardo: ¿Su amigo?',
          },
          {
            begin: '00:33:04:05',
            end: '00:33:06:25',
            content: '¿Cuál amigo? ¿Dónde están?',
          },
          {
            begin: '00:33:06:25',
            end: '00:33:15:20',
            content: 'Daniela: Allá arriba,',
          },
          {
            begin: '00:33:06:25',
            end: '00:33:15:20',
            content: 'en la recámara.',
          },
          {
            begin: '00:33:15:20',
            end: '00:33:17:22',
            content: 'Fabián: Pues, todo salió mejor',
          },
          {
            begin: '00:33:15:20',
            end: '00:33:17:22',
            content: 'de lo que esperábamos.',
          },
          {
            begin: '00:33:17:22',
            end: '00:33:20:08',
            content: 'Por un lado, Andrea cayó',
          },
          {
            begin: '00:33:17:22',
            end: '00:33:20:08',
            content: 'rendida a tus encantos',
          },
          {
            begin: '00:33:20:08',
            end: '00:33:21:24',
            content: 'y, por el otro,',
          },
          {
            begin: '00:33:20:08',
            end: '00:33:21:24',
            content: 'la mosquita muerta',
          },
          {
            begin: '00:33:21:24',
            end: '00:33:23:28',
            content: 'anda de rogona de que',
          },
          {
            begin: '00:33:21:24',
            end: '00:33:23:28',
            content: 'no quiere perder a Fabrizio',
          },
          {
            begin: '00:33:23:28',
            end: '00:33:26:05',
            content: 'y que vayan por una malteada.',
          },
          {
            begin: '00:33:23:28',
            end: '00:33:26:05',
            content: 'Perro: Pues, ahora a ver',
          },
          {
            begin: '00:33:26:05',
            end: '00:33:27:29',
            content: 'qué nos inventamos',
          },
          {
            begin: '00:33:26:05',
            end: '00:33:27:29',
            content: 'para la dichosa malteada',
          },
          {
            begin: '00:33:27:29',
            end: '00:33:29:20',
            content: 'el fin de semana.',
          },
          {
            begin: '00:33:27:29',
            end: '00:33:29:20',
            content: 'Fabián: Ya lo tengo',
          },
          {
            begin: '00:33:29:20',
            end: '00:33:31:15',
            content: 'todo planeado, mira.',
          },
          {
            begin: '00:33:29:20',
            end: '00:33:31:15',
            content: 'La citamos en el café',
          },
          {
            begin: '00:33:31:15',
            end: '00:33:34:09',
            content: 'y grabamos cómo su noviecito',
          },
          {
            begin: '00:33:31:15',
            end: '00:33:34:09',
            content: 'imaginario la deja plantada.',
          },
          {
            begin: '00:33:34:09',
            end: '00:33:36:18',
            content: 'Después editamos',
          },
          {
            begin: '00:33:34:09',
            end: '00:33:36:18',
            content: 'y ponemos las conversaciones',
          },
          {
            begin: '00:33:36:18',
            end: '00:33:39:08',
            content: 'y así todo el mundo va a ver',
          },
          {
            begin: '00:33:36:18',
            end: '00:33:39:08',
            content: 'qué tan ridícula es.',
          },
          {
            begin: '00:33:39:08',
            end: '00:33:41:03',
            content: 'Perro: Ya estás, así le hacemos.',
          },
          {
            begin: '00:33:39:08',
            end: '00:33:41:03',
            content: 'Nada más no me vuelvas',
          },
          {
            begin: '00:33:41:03',
            end: '00:33:42:24',
            content: 'a cambiar la contraseña, ¿eh?',
          },
          {
            begin: '00:33:41:03',
            end: '00:33:42:24',
            content: 'Fabián: Te juro que no,',
          },
          {
            begin: '00:33:42:24',
            end: '00:33:44:16',
            content: 'pero ya no vuelvas',
          },
          {
            begin: '00:33:42:24',
            end: '00:33:44:16',
            content: 'a poner nada, Perro,',
          },
          {
            begin: '00:33:44:16',
            end: '00:33:46:02',
            content: 'porque si alguien más',
          },
          {
            begin: '00:33:44:16',
            end: '00:33:46:02',
            content: 'se entera, pues--',
          },
          {
            begin: '00:33:46:02',
            end: '00:33:49:06',
            content: 'Eduardo: Demasiado tarde',
          },
          {
            begin: '00:33:46:02',
            end: '00:33:49:06',
            content: 'porque ya nos enteramos.',
          },
          {
            begin: '00:33:49:06',
            end: '00:33:51:12',
            content: 'Creías que íbamos a llegar',
          },
          {
            begin: '00:33:49:06',
            end: '00:33:51:12',
            content: 'hasta la noche tu mamá y yo,',
          },
          {
            begin: '00:33:51:12',
            end: '00:33:53:19',
            content: '¿verdad?',
          },
          {
            begin: '00:33:51:12',
            end: '00:33:53:19',
            content: 'Creías que tenías la casa',
          },
          {
            begin: '00:33:53:19',
            end: '00:33:55:12',
            content: 'para ti solito.',
          },
          {
            begin: '00:33:53:19',
            end: '00:33:55:12',
            content: 'Fabián: No, papá, yo me vine',
          },
          {
            begin: '00:33:55:12',
            end: '00:33:56:28',
            content: 'directo de la escuela--',
          },
          {
            begin: '00:33:55:12',
            end: '00:33:56:28',
            content: 'Perro: A ver, tranquilo, señor.',
          },
          {
            begin: '00:33:56:28',
            end: '00:33:58:29',
            content: 'Neta, yo nada más vine',
          },
          {
            begin: '00:33:56:28',
            end: '00:33:58:29',
            content: 'por un libro y ya.',
          },
          {
            begin: '00:33:58:29',
            end: '00:34:01:25',
            content: 'Eduardo: Tú cállate.',
          },
          {
            begin: '00:33:58:29',
            end: '00:34:01:25',
            content: 'Fabián: Déjalo, papá.',
          },
          {
            begin: '00:34:01:25',
            end: '00:34:04:14',
            content: 'Eduardo: Mentirosos,',
          },
          {
            begin: '00:34:01:25',
            end: '00:34:04:14',
            content: 'asquerosos.',
          },
          {
            begin: '00:34:04:14',
            end: '00:34:06:10',
            content: 'Ni siquiera',
          },
          {
            begin: '00:34:04:14',
            end: '00:34:06:10',
            content: 'porque mi hija pequeña',
          },
          {
            begin: '00:34:06:10',
            end: '00:34:08:06',
            content: 'está en la sala',
          },
          {
            begin: '00:34:06:10',
            end: '00:34:08:06',
            content: 'les da pena para hacer',
          },
          {
            begin: '00:34:08:06',
            end: '00:34:09:25',
            content: 'sus marranadas.',
          },
          {
            begin: '00:34:08:06',
            end: '00:34:09:25',
            content: 'Fabián: Ya, papá,',
          },
          {
            begin: '00:34:09:25',
            end: '00:34:11:00',
            content: 'por favor, papá.',
          },
          {
            begin: '00:34:16:23',
            end: '00:34:20:22',
            content: '[Música]',
          },
          {
            begin: '00:34:28:02',
            end: '00:34:30:01',
            content: 'Eduardo: Se me largan los dos',
          },
          {
            begin: '00:34:28:02',
            end: '00:34:30:01',
            content: 'de mi casa.',
          },
          {
            begin: '00:34:30:01',
            end: '00:34:32:27',
            content: 'Par de sinvergüenzas, marranos.',
          },
          {
            begin: '00:34:30:01',
            end: '00:34:32:27',
            content: 'Perro: Aquí el único marrano',
          },
          {
            begin: '00:34:32:27',
            end: '00:34:34:22',
            content: 'es usted por pensar cosas',
          },
          {
            begin: '00:34:32:27',
            end: '00:34:34:22',
            content: 'que ni al caso.',
          },
          {
            begin: '00:34:34:22',
            end: '00:34:36:18',
            content: 'Eduardo: Mira, deja tu papelito',
          },
          {
            begin: '00:34:34:22',
            end: '00:34:36:18',
            content: 'de ofendido para alguien',
          },
          {
            begin: '00:34:36:18',
            end: '00:34:39:18',
            content: 'que no conozca los de tu calaña.',
          },
          {
            begin: '00:34:36:18',
            end: '00:34:39:18',
            content: 'Perro: Viejo loco.',
          },
          {
            begin: '00:34:39:18',
            end: '00:34:42:04',
            content: 'Fabián: Mamá, te juro que no es',
          },
          {
            begin: '00:34:39:18',
            end: '00:34:42:04',
            content: 'lo que piensa mi papá.',
          },
          {
            begin: '00:34:42:04',
            end: '00:34:44:26',
            content: 'Pregúntale a Dani.',
          },
          {
            begin: '00:34:42:04',
            end: '00:34:44:26',
            content: 'Si vino mi amigo, fue porque--',
          },
          {
            begin: '00:34:44:26',
            end: '00:34:46:24',
            content: 'Porque estábamos viendo',
          },
          {
            begin: '00:34:44:26',
            end: '00:34:46:24',
            content: 'lo de un video para la gra--',
          },
          {
            begin: '00:34:46:24',
            end: '00:34:49:03',
            content: 'Eduardo: Mejor ponte de acuerdo',
          },
          {
            begin: '00:34:46:24',
            end: '00:34:49:03',
            content: 'con tu amiguito.',
          },
          {
            begin: '00:34:49:03',
            end: '00:34:51:14',
            content: '¿Qué no me acaba de decir',
          },
          {
            begin: '00:34:49:03',
            end: '00:34:51:14',
            content: 'que vino por un libro?',
          },
          {
            begin: '00:34:51:14',
            end: '00:34:53:12',
            content: 'Fabián: Papá, escúchame',
          },
          {
            begin: '00:34:51:14',
            end: '00:34:53:12',
            content: 'por favor, es que no estás--',
          },
          {
            begin: '00:34:53:12',
            end: '00:34:55:29',
            content: 'Eduardo: ¡Te largas de mi casa!',
          },
          {
            begin: '00:34:53:12',
            end: '00:34:55:29',
            content: 'Raquel: Eduardo, por favor.',
          },
          {
            begin: '00:34:55:29',
            end: '00:34:58:20',
            content: 'Eduardo: Y más vale',
          },
          {
            begin: '00:34:55:29',
            end: '00:34:58:20',
            content: 'que no te aparezcas por aquí.',
          },
          {
            begin: '00:34:58:20',
            end: '00:35:15:27',
            content: '¡Tú no eres mi hijo!',
          },
          {
            begin: '00:34:58:20',
            end: '00:35:15:27',
            content: '¡Lárgate!',
          },
          {
            begin: '00:35:15:27',
            end: '00:35:19:16',
            content: 'Raquel: No llores.',
          },
          {
            begin: '00:35:15:27',
            end: '00:35:19:16',
            content: 'Fabián: Perro.',
          },
          {
            begin: '00:35:19:16',
            end: '00:35:21:19',
            content: 'Perro: ¿Qué? ¿Qué quieres?',
          },
          {
            begin: '00:35:19:16',
            end: '00:35:21:19',
            content: '¿Que la gente piense',
          },
          {
            begin: '00:35:21:19',
            end: '00:35:23:16',
            content: 'que estamos teniendo',
          },
          {
            begin: '00:35:21:19',
            end: '00:35:23:16',
            content: 'una pelea marital o qué?',
          },
          {
            begin: '00:35:23:16',
            end: '00:35:25:13',
            content: 'Fabián: No, es que no es eso.',
          },
          {
            begin: '00:35:23:16',
            end: '00:35:25:13',
            content: 'Es que mi papá es muy exagerado,',
          },
          {
            begin: '00:35:25:13',
            end: '00:35:28:06',
            content: 'malinterpretó todo--',
          },
          {
            begin: '00:35:25:13',
            end: '00:35:28:06',
            content: 'Perro: No me expliques nada.',
          },
          {
            begin: '00:35:28:06',
            end: '00:35:30:11',
            content: 'Lo que pasa es que tú quieres',
          },
          {
            begin: '00:35:28:06',
            end: '00:35:30:11',
            content: 'ser como ella.',
          },
          {
            begin: '00:35:30:11',
            end: '00:35:33:09',
            content: 'Fabián: Claro que no.',
          },
          {
            begin: '00:35:30:11',
            end: '00:35:33:09',
            content: 'Además, estamos juntos en esto.',
          },
          {
            begin: '00:35:33:09',
            end: '00:35:35:18',
            content: 'Perro: Yo no quiero nada',
          },
          {
            begin: '00:35:33:09',
            end: '00:35:35:18',
            content: 'que ver contigo.',
          },
          {
            begin: '00:35:35:18',
            end: '00:35:37:03',
            content: 'A partir de mañana',
          },
          {
            begin: '00:35:35:18',
            end: '00:35:37:03',
            content: 'voy a hablar con Leti',
          },
          {
            begin: '00:35:37:03',
            end: '00:35:40:06',
            content: 'para que se entere de todo.',
          },
          {
            begin: '00:35:37:03',
            end: '00:35:40:06',
            content: 'Ahora me cae el 20',
          },
          {
            begin: '00:35:40:06',
            end: '00:35:43:02',
            content: 'de por qué tanto odio',
          },
          {
            begin: '00:35:40:06',
            end: '00:35:43:02',
            content: 'y tu venganza hacia ella.',
          },
          {
            begin: '00:35:43:02',
            end: '00:35:55:23',
            content: 'Y para que sepas',
          },
          {
            begin: '00:35:43:02',
            end: '00:35:55:23',
            content: 'Leti me gusta.',
          },
          {
            begin: '00:35:55:23',
            end: '00:36:01:09',
            content: 'Raquel: [Llora]',
          },
          {
            begin: '00:35:55:23',
            end: '00:36:01:09',
            content: 'Daniela: Ya no llores, mamita.',
          },
          {
            begin: '00:36:01:09',
            end: '00:36:04:28',
            content: 'Raquel: No te preocupes, hija.',
          },
          {
            begin: '00:36:01:09',
            end: '00:36:04:28',
            content: 'Es solo que--',
          },
          {
            begin: '00:36:04:28',
            end: '00:36:06:22',
            content: 'Daniela: ¿A ti también',
          },
          {
            begin: '00:36:04:28',
            end: '00:36:06:22',
            content: 'te da pena mi hermano',
          },
          {
            begin: '00:36:06:22',
            end: '00:36:09:18',
            content: 'como a mi papá?',
          },
          {
            begin: '00:36:06:22',
            end: '00:36:09:18',
            content: 'No entiendo, ¿qué hizo?',
          },
          {
            begin: '00:36:09:18',
            end: '00:36:12:19',
            content: 'Raquel: Dani, no me vuelvas',
          },
          {
            begin: '00:36:09:18',
            end: '00:36:12:19',
            content: 'a decir eso.',
          },
          {
            begin: '00:36:12:19',
            end: '00:36:15:10',
            content: 'Fabián tiene su carácter,',
          },
          {
            begin: '00:36:12:19',
            end: '00:36:15:10',
            content: 'pero yo lo amo',
          },
          {
            begin: '00:36:15:10',
            end: '00:36:19:07',
            content: 'y te amo a ti también.',
          },
          {
            begin: '00:36:15:10',
            end: '00:36:19:07',
            content: '[Suspira]',
          },
          {
            begin: '00:36:19:07',
            end: '00:36:24:15',
            content: 'Es que hay veces',
          },
          {
            begin: '00:36:19:07',
            end: '00:36:24:15',
            content: 'que uno se calla.',
          },
          {
            begin: '00:36:24:15',
            end: '00:36:26:11',
            content: 'Daniela: Yo también',
          },
          {
            begin: '00:36:24:15',
            end: '00:36:26:11',
            content: 'lo quiero mucho.',
          },
          {
            begin: '00:36:26:11',
            end: '00:36:33:08',
            content: 'Sí va a regresar a la casa,',
          },
          {
            begin: '00:36:26:11',
            end: '00:36:33:08',
            content: '¿verdad?',
          },
          {
            begin: '00:36:33:08',
            end: '00:36:35:19',
            content: 'Fabián: Pues, total,',
          },
          {
            begin: '00:36:33:08',
            end: '00:36:35:19',
            content: 'si el maldito del Perro',
          },
          {
            begin: '00:36:35:19',
            end: '00:36:38:22',
            content: 'le va a contar todo a Leticia,',
          },
          {
            begin: '00:36:35:19',
            end: '00:36:38:22',
            content: 'mejor adelanto el plan',
          },
          {
            begin: '00:36:38:22',
            end: '00:36:52:02',
            content: 'y que caiga de una vez',
          },
          {
            begin: '00:36:38:22',
            end: '00:36:52:02',
            content: 'la mosquita muerta.',
          },
          {
            begin: '00:36:52:02',
            end: '00:36:54:22',
            content: 'Marieta: Anímate, Lupita.',
          },
          {
            begin: '00:36:52:02',
            end: '00:36:54:22',
            content: 'Te me vas a quedar aquí dormida',
          },
          {
            begin: '00:36:54:22',
            end: '00:36:56:17',
            content: 'en la barra.',
          },
          {
            begin: '00:36:54:22',
            end: '00:36:56:17',
            content: 'Lupita: Es que ya quiero',
          },
          {
            begin: '00:36:56:17',
            end: '00:36:59:12',
            content: 'que mi mamá llegue.',
          },
          {
            begin: '00:36:56:17',
            end: '00:36:59:12',
            content: 'Marieta: Pues, sí, pero me habló',
          },
          {
            begin: '00:36:59:12',
            end: '00:37:02:05',
            content: 'y me dijo que está atorada',
          },
          {
            begin: '00:36:59:12',
            end: '00:37:02:05',
            content: 'en el tráfico.',
          },
          {
            begin: '00:37:02:05',
            end: '00:37:03:19',
            content: 'Es más, mira,',
          },
          {
            begin: '00:37:02:05',
            end: '00:37:03:19',
            content: 'deberías de aprovechar',
          },
          {
            begin: '00:37:03:19',
            end: '00:37:05:28',
            content: 'y terminar de leer',
          },
          {
            begin: '00:37:03:19',
            end: '00:37:05:28',
            content: 'tu libro de cuentos.',
          },
          {
            begin: '00:37:05:28',
            end: '00:37:09:20',
            content: 'Lupita: Sí, ya me faltan',
          },
          {
            begin: '00:37:05:28',
            end: '00:37:09:20',
            content: 'pocas páginas para acabarlo.',
          },
          {
            begin: '00:37:09:20',
            end: '00:37:11:23',
            content: 'Marieta: ¿Ya ves?',
          },
          {
            begin: '00:37:09:20',
            end: '00:37:11:23',
            content: 'Si tú leyeras',
          },
          {
            begin: '00:37:11:23',
            end: '00:37:14:06',
            content: 'un pedacito cada día,',
          },
          {
            begin: '00:37:11:23',
            end: '00:37:14:06',
            content: 'te darías cuenta',
          },
          {
            begin: '00:37:14:06',
            end: '00:37:17:21',
            content: 'que al final de año',
          },
          {
            begin: '00:37:14:06',
            end: '00:37:17:21',
            content: 'aprendiste muchísimo.',
          },
          {
            begin: '00:37:17:21',
            end: '00:37:19:26',
            content: 'Tomás: ¿Otro cafecito?',
          },
          {
            begin: '00:37:17:21',
            end: '00:37:19:26',
            content: 'Leticia: No, muchas gracias,',
          },
          {
            begin: '00:37:19:26',
            end: '00:37:21:28',
            content: 'don Tomás.',
          },
          {
            begin: '00:37:19:26',
            end: '00:37:21:28',
            content: 'De hecho, creo',
          },
          {
            begin: '00:37:21:28',
            end: '00:37:29:11',
            content: 'que me dejaron plantada.',
          },
          {
            begin: '00:37:21:28',
            end: '00:37:29:11',
            content: 'Marieta: ¿Fabián?',
          },
          {
            begin: '00:37:29:11',
            end: '00:37:32:09',
            content: 'Leticia: ¿Fabián?',
          },
          {
            begin: '00:37:29:11',
            end: '00:37:32:09',
            content: '¿Me estás grabando?',
          },
          {
            begin: '00:37:32:09',
            end: '00:37:36:10',
            content: 'Fabián: Claro que no.',
          },
          {
            begin: '00:37:32:09',
            end: '00:37:36:10',
            content: 'Leticia: Dámelo.',
          },
          {
            begin: '00:37:36:10',
            end: '00:37:40:08',
            content: 'Fabián, Fabrizio.',
          },
          {
            begin: '00:37:36:10',
            end: '00:37:40:08',
            content: 'Tú eres el que me escribía.',
          },
          {
            begin: '00:37:40:08',
            end: '00:37:42:02',
            content: 'Digo, ¿por qué?',
          },
          {
            begin: '00:37:40:08',
            end: '00:37:42:02',
            content: 'Si te gusto, solo--',
          },
          {
            begin: '00:37:42:02',
            end: '00:37:44:14',
            content: 'No tenías que inventar',
          },
          {
            begin: '00:37:42:02',
            end: '00:37:44:14',
            content: 'un perfil falso.',
          },
          {
            begin: '00:37:44:14',
            end: '00:37:47:01',
            content: 'Fabián: ¿Gustarme tú?',
          },
          {
            begin: '00:37:44:14',
            end: '00:37:47:01',
            content: 'Por favor, no te confundas.',
          },
          {
            begin: '00:37:47:01',
            end: '00:37:49:07',
            content: 'Tengo malos ratos,',
          },
          {
            begin: '00:37:47:01',
            end: '00:37:49:07',
            content: 'pero no malos gustos.',
          },
          {
            begin: '00:37:49:07',
            end: '00:37:52:22',
            content: 'Tomás: ¿Malos gustos?',
          },
          {
            begin: '00:37:49:07',
            end: '00:37:52:22',
            content: 'Fabián: Todo fue un plan',
          },
          {
            begin: '00:37:52:22',
            end: '00:37:54:14',
            content: 'para que todo mundo viera',
          },
          {
            begin: '00:37:52:22',
            end: '00:37:54:14',
            content: 'lo tontita que eres.',
          },
          {
            begin: '00:37:54:14',
            end: '00:37:56:01',
            content: '¿Y qué crees?',
          },
          {
            begin: '00:37:54:14',
            end: '00:37:56:01',
            content: 'No me fallaste.',
          },
          {
            begin: '00:37:56:01',
            end: '00:37:58:06',
            content: 'Leticia: Ah, pues, tonta, tonta,',
          },
          {
            begin: '00:37:56:01',
            end: '00:37:58:06',
            content: 'pero me saqué la beca',
          },
          {
            begin: '00:37:58:06',
            end: '00:38:01:04',
            content: 'para la universidad',
          },
          {
            begin: '00:37:58:06',
            end: '00:38:01:04',
            content: 'y no ando de patética',
          },
          {
            begin: '00:38:01:04',
            end: '00:38:03:03',
            content: 'grabando gente',
          },
          {
            begin: '00:38:01:04',
            end: '00:38:03:03',
            content: 'sin su consentimiento.',
          },
          {
            begin: '00:38:03:03',
            end: '00:38:05:14',
            content: 'Fabián: Bueno, por lo menos',
          },
          {
            begin: '00:38:03:03',
            end: '00:38:05:14',
            content: 'mi mejor amiga no se intenta',
          },
          {
            begin: '00:38:05:14',
            end: '00:38:12:12',
            content: 'ligar a mi noviecito imaginario.',
          },
          {
            begin: '00:38:05:14',
            end: '00:38:12:12',
            content: 'Leticia: ¿Andrea?',
          },
          {
            begin: '00:38:12:12',
            end: '00:38:16:17',
            content: 'Eres una basura, Fabián.',
          },
          {
            begin: '00:38:12:12',
            end: '00:38:16:17',
            content: '¿Cómo le pudiste hacer esto?',
          },
          {
            begin: '00:38:16:17',
            end: '00:38:18:21',
            content: 'Mira, mejor ve un psicólogo',
          },
          {
            begin: '00:38:16:17',
            end: '00:38:18:21',
            content: 'o algo porque tienes',
          },
          {
            begin: '00:38:18:21',
            end: '00:38:21:04',
            content: 'problemas mentales.',
          },
          {
            begin: '00:38:18:21',
            end: '00:38:21:04',
            content: 'Y además, ¿sabes qué?',
          },
          {
            begin: '00:38:21:04',
            end: '00:38:26:21',
            content: 'No vales nada.',
          },
          {
            begin: '00:38:21:04',
            end: '00:38:26:21',
            content: 'Tomás: Oye, oye, oye.',
          },
          {
            begin: '00:38:26:21',
            end: '00:38:31:13',
            content: '¿Quién te crees que eres?',
          },
          {
            begin: '00:38:26:21',
            end: '00:38:31:13',
            content: '¿Qué hiciste? ¿Qué haces?',
          },
          {
            begin: '00:38:31:13',
            end: '00:38:43:16',
            content: 'Fabián: Nada, don Tomás.',
          },
          {
            begin: '00:38:31:13',
            end: '00:38:43:16',
            content: 'Tomás: Ah...',
          },
          {
            begin: '00:38:43:16',
            end: '00:38:45:21',
            content: 'Eduardo: Párate.',
          },
          {
            begin: '00:38:43:16',
            end: '00:38:45:21',
            content: '¿No ves que el puerco de tu hijo',
          },
          {
            begin: '00:38:45:21',
            end: '00:38:48:12',
            content: 'y su amiguito estaban aquí?',
          },
          {
            begin: '00:38:45:21',
            end: '00:38:48:12',
            content: 'Raquel: Te recuerdo que también',
          },
          {
            begin: '00:38:48:12',
            end: '00:38:50:13',
            content: 'es tu hijo.',
          },
          {
            begin: '00:38:48:12',
            end: '00:38:50:13',
            content: 'Eduardo: Dejó de serlo',
          },
          {
            begin: '00:38:50:13',
            end: '00:38:52:13',
            content: 'el día que se convirtió',
          },
          {
            begin: '00:38:50:13',
            end: '00:38:52:13',
            content: 'en eso que es.',
          },
          {
            begin: '00:38:52:13',
            end: '00:38:54:20',
            content: 'Raquel: Un ser lleno de odio.',
          },
          {
            begin: '00:38:52:13',
            end: '00:38:54:20',
            content: 'Eduardo: Un blandengue.',
          },
          {
            begin: '00:38:54:20',
            end: '00:38:57:16',
            content: 'Raquel: Ya basta, Eduardo.',
          },
          {
            begin: '00:38:54:20',
            end: '00:38:57:16',
            content: '¿Es en serio',
          },
          {
            begin: '00:38:57:16',
            end: '00:39:00:17',
            content: 'lo que me estás diciendo?',
          },
          {
            begin: '00:38:57:16',
            end: '00:39:00:17',
            content: '¿Y si nunca más',
          },
          {
            begin: '00:39:00:17',
            end: '00:39:04:03',
            content: 'lo volvemos a ver?',
          },
          {
            begin: '00:39:00:17',
            end: '00:39:04:03',
            content: 'Eduardo: Ya está mayorcito.',
          },
          {
            begin: '00:39:04:03',
            end: '00:39:07:11',
            content: 'Daniela: Mamá, mamá,',
          },
          {
            begin: '00:39:04:03',
            end: '00:39:07:11',
            content: 'yo sé dónde está mi hermano.',
          },
          {
            begin: '00:39:07:11',
            end: '00:39:11:05',
            content: 'Lupita me mandó un mensaje',
          },
          {
            begin: '00:39:07:11',
            end: '00:39:11:05',
            content: 'diciendo que está en El Dicho.',
          },
          {
            begin: '00:39:11:05',
            end: '00:39:13:16',
            content: 'Eduardo: No me desobedezcas,',
          },
          {
            begin: '00:39:11:05',
            end: '00:39:13:16',
            content: 'Raquel.',
          },
          {
            begin: '00:39:13:16',
            end: '00:39:18:08',
            content: 'Raquel: No soy tu hija, Eduardo,',
          },
          {
            begin: '00:39:13:16',
            end: '00:39:18:08',
            content: 'soy tu esposa.',
          },
          {
            begin: '00:39:18:08',
            end: '00:39:19:07',
            content: 'Déjame pasar.',
          },
          {
            begin: '00:39:24:27',
            end: '00:39:30:25',
            content: 'Voy a tratar de alcanzar',
          },
          {
            begin: '00:39:24:27',
            end: '00:39:30:25',
            content: 'a tu hijo.',
          },
          {
            begin: '00:39:30:25',
            end: '00:39:33:28',
            content: 'Tomás: Gracias',
          },
          {
            begin: '00:39:30:25',
            end: '00:39:33:28',
            content: 'por tenerme la confianza',
          },
          {
            begin: '00:39:33:28',
            end: '00:39:37:07',
            content: 'y contarme',
          },
          {
            begin: '00:39:33:28',
            end: '00:39:37:07',
            content: 'tu versión de las cosas,',
          },
          {
            begin: '00:39:37:07',
            end: '00:39:38:26',
            content: 'pero lo que le hiciste',
          },
          {
            begin: '00:39:37:07',
            end: '00:39:38:26',
            content: 'a esa jovencita',
          },
          {
            begin: '00:39:38:26',
            end: '00:39:42:19',
            content: 'no estuvo nada bien.',
          },
          {
            begin: '00:39:38:26',
            end: '00:39:42:19',
            content: 'Fabián: Es que a ella le sale',
          },
          {
            begin: '00:39:42:19',
            end: '00:39:45:21',
            content: 'todo bien, don Tomás, todo.',
          },
          {
            begin: '00:39:42:19',
            end: '00:39:45:21',
            content: 'Incluso por su culpa',
          },
          {
            begin: '00:39:45:21',
            end: '00:39:49:05',
            content: 'mi papá ya me corrió de la casa.',
          },
          {
            begin: '00:39:45:21',
            end: '00:39:49:05',
            content: 'Tomás: Mira, añorar',
          },
          {
            begin: '00:39:49:05',
            end: '00:39:53:28',
            content: 'lo que uno más tiene o no tiene',
          },
          {
            begin: '00:39:49:05',
            end: '00:39:53:28',
            content: 'no lleva a nada bueno.',
          },
          {
            begin: '00:39:53:28',
            end: '00:39:57:18',
            content: 'Y sinceramente,',
          },
          {
            begin: '00:39:53:28',
            end: '00:39:57:18',
            content: 'yo no veo cómo Leti',
          },
          {
            begin: '00:39:57:18',
            end: '00:40:00:16',
            content: 'pudo provocar algo así.',
          },
          {
            begin: '00:39:57:18',
            end: '00:40:00:16',
            content: 'Fabián: ¿Ya ve?',
          },
          {
            begin: '00:40:00:16',
            end: '00:40:03:02',
            content: 'Usted tampoco la conoce',
          },
          {
            begin: '00:40:00:16',
            end: '00:40:03:02',
            content: 'y ya la está defendiendo.',
          },
          {
            begin: '00:40:03:02',
            end: '00:40:05:05',
            content: 'Tomás: Yo solo espero',
          },
          {
            begin: '00:40:03:02',
            end: '00:40:05:05',
            content: 'que dejes a un lado',
          },
          {
            begin: '00:40:05:05',
            end: '00:40:08:03',
            content: 'esos sentimientos',
          },
          {
            begin: '00:40:05:05',
            end: '00:40:08:03',
            content: 'que te nublan la vista.',
          },
          {
            begin: '00:40:08:03',
            end: '00:40:10:15',
            content: 'Estoy convencido',
          },
          {
            begin: '00:40:08:03',
            end: '00:40:10:15',
            content: 'de que todos podemos ser',
          },
          {
            begin: '00:40:10:15',
            end: '00:40:15:10',
            content: 'tan buenos como queramos.',
          },
          {
            begin: '00:40:10:15',
            end: '00:40:15:10',
            content: 'Raquel: Fabián, hijo,',
          },
          {
            begin: '00:40:15:10',
            end: '00:40:17:27',
            content: 'pensé que ya no te alcanzaba.',
          },
          {
            begin: '00:40:15:10',
            end: '00:40:17:27',
            content: 'Tomás: Pase, pase, siéntese.',
          },
          {
            begin: '00:40:17:27',
            end: '00:40:19:25',
            content: 'Tome asiento, tome asiento.',
          },
          {
            begin: '00:40:17:27',
            end: '00:40:19:25',
            content: 'Raquel: Buenas noches,',
          },
          {
            begin: '00:40:19:25',
            end: '00:40:22:09',
            content: 'don Tomás.',
          },
          {
            begin: '00:40:19:25',
            end: '00:40:22:09',
            content: 'Fabián: Don Tomás me convenció',
          },
          {
            begin: '00:40:22:09',
            end: '00:40:25:10',
            content: 'de quedarme a tomar un té.',
          },
          {
            begin: '00:40:22:09',
            end: '00:40:25:10',
            content: 'Tomás: Yo solamente',
          },
          {
            begin: '00:40:25:10',
            end: '00:40:29:01',
            content: 'quería evitar más tragedias',
          },
          {
            begin: '00:40:25:10',
            end: '00:40:29:01',
            content: 'innecesarias.',
          },
          {
            begin: '00:40:29:01',
            end: '00:40:31:05',
            content: 'Con permiso.',
          },
          {
            begin: '00:40:29:01',
            end: '00:40:31:05',
            content: 'Raquel: Muchas gracias.',
          },
          {
            begin: '00:40:31:05',
            end: '00:40:34:11',
            content: 'Daniela: Hermanito, no te vayas.',
          },
          {
            begin: '00:40:31:05',
            end: '00:40:34:11',
            content: 'Te queremos.',
          },
          {
            begin: '00:40:34:11',
            end: '00:40:38:08',
            content: 'Raquel: Y mucho, Fabián.',
          },
          {
            begin: '00:40:34:11',
            end: '00:40:38:08',
            content: 'Fabián: ¿Y mi papá?',
          },
          {
            begin: '00:40:38:08',
            end: '00:40:42:06',
            content: 'Raquel: Bueno, eso es algo',
          },
          {
            begin: '00:40:38:08',
            end: '00:40:42:06',
            content: 'que tenemos que arreglar.',
          },
          {
            begin: '00:40:42:06',
            end: '00:40:45:06',
            content: 'Por el momento, quiero que sepas',
          },
          {
            begin: '00:40:42:06',
            end: '00:40:45:06',
            content: 'que no tienes que vivir',
          },
          {
            begin: '00:40:45:06',
            end: '00:40:48:27',
            content: 'escondiéndote, llenándote',
          },
          {
            begin: '00:40:45:06',
            end: '00:40:48:27',
            content: 'de odios, de rencores',
          },
          {
            begin: '00:40:48:27',
            end: '00:40:51:18',
            content: 'ni contra tu hermana',
          },
          {
            begin: '00:40:48:27',
            end: '00:40:51:18',
            content: 'ni contra mí',
          },
          {
            begin: '00:40:51:18',
            end: '00:40:57:09',
            content: 'ni contra nadie, hijo.',
          },
          {
            begin: '00:40:51:18',
            end: '00:40:57:09',
            content: '¿Me entiendes?',
          },
          {
            begin: '00:40:57:09',
            end: '00:41:00:09',
            content: 'Tienes toda una vida',
          },
          {
            begin: '00:40:57:09',
            end: '00:41:00:09',
            content: 'por delante, Fabián.',
          },
          {
            begin: '00:41:00:09',
            end: '00:41:05:24',
            content: 'Si me lo permites,',
          },
          {
            begin: '00:41:00:09',
            end: '00:41:05:24',
            content: 'si nos lo permites,',
          },
          {
            begin: '00:41:05:24',
            end: '00:41:09:20',
            content: 'queremos compartirla a tu lado.',
          },
          {
            begin: '00:41:05:24',
            end: '00:41:09:20',
            content: 'Fabián: [Suspira]',
          },
          {
            begin: '00:41:09:20',
            end: '00:41:13:22',
            content: 'Yo también las quiero y mucho.',
          },
          {
            begin: '00:41:09:20',
            end: '00:41:13:22',
            content: 'Perdónenme',
          },
          {
            begin: '00:41:13:22',
            end: '00:41:16:29',
            content: 'por no haberlo visto antes.',
          },
          {
            begin: '00:41:13:22',
            end: '00:41:16:29',
            content: 'De verdad, perdónenme.',
          },
          {
            begin: '00:41:16:29',
            end: '00:41:20:11',
            content: 'Perdón.',
          },
          {
            begin: '00:41:16:29',
            end: '00:41:20:11',
            content: 'Tomás: Bueno,',
          },
          {
            begin: '00:41:20:11',
            end: '00:41:23:13',
            content: 'aquí están las cartas.',
          },
          {
            begin: '00:41:20:11',
            end: '00:41:23:13',
            content: 'Tenemos un pastel de cho--',
          },
          {
            begin: '00:41:23:13',
            end: '00:41:25:05',
            content: '¿Sabes leer?',
          },
          {
            begin: '00:41:23:13',
            end: '00:41:25:05',
            content: 'Daniela: Sí.',
          },
          {
            begin: '00:41:25:05',
            end: '00:41:27:09',
            content: 'Gracias.',
          },
          {
            begin: '00:41:25:05',
            end: '00:41:27:09',
            content: 'Tomás: Tenemos un pastel',
          },
          {
            begin: '00:41:27:09',
            end: '00:41:29:23',
            content: 'de chocolate buenísimo.',
          },
          {
            begin: '00:41:27:09',
            end: '00:41:29:23',
            content: 'Fabián: Muchas gracias.',
          },
          {
            begin: '00:41:29:23',
            end: '00:41:33:03',
            content: 'Raquel: Gracias, don Tomás.',
          },
          {
            begin: '00:41:29:23',
            end: '00:41:33:03',
            content: 'Te amamos, hijo.',
          },
          {
            begin: '00:41:33:03',
            end: '00:41:35:23',
            content: '¿Verdad?',
          },
          {
            begin: '00:41:33:03',
            end: '00:41:35:23',
            content: 'Daniela: Sí.',
          },
          {
            begin: '00:41:35:23',
            end: '00:41:43:21',
            content: 'Raquel: Bueno, ¿qué vamos',
          },
          {
            begin: '00:41:35:23',
            end: '00:41:43:21',
            content: 'a pedir?',
          },
          {
            begin: '00:41:43:21',
            end: '00:41:47:28',
            content: 'Lara: ♪ Todo lo que nadie ve',
          },
          {
            begin: '00:41:43:21',
            end: '00:41:47:28',
            content: 'Hablando sola',
          },
          {
            begin: '00:41:47:28',
            end: '00:41:51:17',
            content: 'Todo lo que hoy quiera ser',
          },
          {
            begin: '00:41:47:28',
            end: '00:41:51:17',
            content: 'Hablando sola',
          },
        ],
      },
      hideCaption: false,
      pollQuestionOverride: null,
      shortUrl: 'http://uni.vi/XTl1102jenY#feffcbc50000',
      longUrl: 'https://performance.univision.com/local/los-angeles-kmex/revive-los-momentos-con-esta-galerua-multimedia-fotos#feffcbc50000',
    },
  ];

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const slide = getSlideItem('a');
    delete slide.caption;
    ReactDOM.render(<VerticalSlideshow slides={[slide]} primaryTag={{ name: 'foo' }} />, div);
  });

  it('should not render ad after last slide', () => {
    const VCpmnt = (
      <VerticalSlideshow
        slides={[getSlideItem('a'), getSlideItem('b'), getSlideItem('c'), getSlideItem('d')]}
        primaryTag={{ name: 'foo' }}
      />
    );
    const wrapper = mount(VCpmnt);
    expect(
      wrapper
        .find('div.main')
        .childAt(3)
        .find(`div.${Styles.slide}`).length
    ).toBe(1);
  });

  it('tracks ShareBar clicks', () => {
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(
      <VerticalSlideshow
        slides={[getSlideItem('a'), getSlideItem('b'), getSlideItem('c'), getSlideItem('d')]}
        primaryTag={{ name: 'foo' }}
      />
    );
    const slide = wrapper.find('.main > div').first();
    slide.find('ShareBar').simulate('click', 'facebook');
    expect(SocialTracker.track).toBeCalled();
  });

  it('should be with caption and credit', () => {
    const wrapper = shallow(
      <VerticalSlideshow slides={defaultSlide} primaryTag={{ name: 'foo' }} />
    );
    const caption = wrapper.find('Caption');
    expect(caption).toBeDefined();
  });

  it('should not be with caption', () => {
    const slide = { hideCaption: true, ...getSlideItem('a') };
    const wrapper = shallow(
      <VerticalSlideshow slides={[slide]} primaryTag={{ name: 'foo' }} />
    );
    const caption = wrapper.find('Caption');
    expect(caption).toBeDefined();
  });

  it('should render the truncate when device is desktop and the image is vertical', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const verticalSlide = {
      content: 'test',
      image: {
        type: 'image',
        uid: '123',
        credit: 'aaa',
        renditions: {
          original: {
            href: '123',
            width: 400,
            height: 800,
          },
        },
      },
    };
    const wrapper = shallow(
      <VerticalSlideshow slides={[verticalSlide]} primaryTag={{ name: 'foo' }} />
    );
    const truncate = wrapper.find('Truncate');
    expect(truncate).toBeDefined();
  });

  it('should trigger change event', () => {
    const primaryTag = { name: 'foo' };
    const trackSpy = jest.spyOn(SlideshowTracker, 'track');
    const beaconSpy = jest.spyOn(comScoreManager, 'beacon');
    const VCpmnt = (
      <VerticalSlideshow slides={[getSlideItem('a'), getSlideItem('b')]} primaryTag={primaryTag} />
    );
    const wrapper = mount(VCpmnt);
    const visibilitySensor = wrapper.find('VisibilitySensor');
    visibilitySensor.get(0).props.onChange(true);
    expect(trackSpy).toBeCalledWith(SlideshowTracker.events.change, expect.objectContaining({
      activeSlide: expect.any(Object),
      primaryTag,
    }));
    expect(beaconSpy).toBeCalled();
  });

  it('should not track com score twice for the same slide', () => {
    const primaryTag = { name: 'foo' };
    const beaconSpy = jest.spyOn(comScoreManager, 'beacon');
    const VCpmnt = (
      <VerticalSlideshow slides={[getSlideItem('a'), getSlideItem('b')]} primaryTag={primaryTag} />
    );
    const wrapper = mount(VCpmnt);
    const visibilitySensor = wrapper.find('VisibilitySensor');
    visibilitySensor.get(0).props.onChange(true, {}, 1);
    visibilitySensor.get(1).props.onChange(true, {}, 2);
    visibilitySensor.get(0).props.onChange(true, {}, 1);
    expect(beaconSpy).toBeCalledTimes(2);
  });

  it('should return the correct hash', () => {
    jsdom.reconfigure({
      url: 'https://www.univision.com#bbbb123',
    });

    const VCpmnt = (
      <VerticalSlideshow
        slides={[getSlideItem('aaaaa'), getSlideItem('bbbb'), getSlideItem('cccc'), getSlideItem('dddd')]}
        primaryTag={{ name: 'foo' }}
      />
    );
    mount(VCpmnt);
    expect(window.location.hash).toBe('#bbbb123');
  });

  it('should return undefined if slides does not have uid', () => {
    const VCpmnt = (
      <VerticalSlideshow
        slides={[
          {
            caption: 'test',
            content: {
              type: 'image',
              credit: 'aaa',
              renditions: {
                original: { href: '123' },
              },
            },
          },
        ]}
        primaryTag={{ name: 'foo' }}
      />
    );
    const wrapper = mount(VCpmnt);
    expect(
      wrapper
        .find('.main')
        .find('div')
        .first()
        .prop('id')
    ).toBe(undefined);
  });

  it('should not trigger any event if not visible', () => {
    spyOn(SlideshowTracker, 'track');
    spyOn(comScoreManager, 'beacon');
    window.innerHeight = 0;
    const VCpmnt = (
      <VerticalSlideshow slides={[getSlideItem('a'), getSlideItem('b')]} primaryTag={{ name: 'foo' }} />
    );

    mount(VCpmnt);
    expect(SlideshowTracker.track).not.toBeCalled();
    expect(comScoreManager.beacon).not.toBeCalled();
  });

  it('should set proper size for lazyload height', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const wrapper = shallow(
      <VerticalSlideshow slides={[defaultSlide[0]]} primaryTag={{ name: 'foo' }} />
    );

    expect(wrapper.find(LazyLoad).props().height).toBe(850);
  });

  it('should render only the slides with an associated image', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const slide = {
      content: { renditions: {} },
    };
    const wrapper = shallow(<VerticalSlideshow slides={[slide]} primaryTag={{ name: 'foo' }} />);
    expect(wrapper.find(LazyLoad).length).toBe(0);
  });

  it('should render default image when no content', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const slide = {
      image: {
        type: 'image',
        uid: '00000153-f1f1-d20a-a97b-fdf934a70000',
        title: 'Univision Fallback Image',
        caption: null,
        credit: null,
        renditions: {
          original: {
            href: 'https://st1.uvnimg.com/3a/60/ff8a1c114b0cb94b76cf39d1fdaa/newversion.jpg',
            width: 1200,
            height: 630,
          },
          'slideshow-mobile-horizontal': {
            href: 'https://cdn1.performance.univision.com/dims4/default/ee6a039/2147483647/resize/414x550%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F3a%2F60%2Fff8a1c114b0cb94b76cf39d1fdaa%2Fnewversion.jpg',
            width: 414,
            height: 550,
          },
          'slideshow-4x3-vertical': {
            href: 'https://cdn1.performance.univision.com/dims4/default/3da2dcc/2147483647/resize/1093x820%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F3a%2F60%2Fff8a1c114b0cb94b76cf39d1fdaa%2Fnewversion.jpg',
            width: 1093,
            height: 820,
          },
          'horizontal-slideshow-loading': {
            href: 'https://cdn1.performance.univision.com/dims4/default/9bf8399/2147483647/resize/150x50%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F3a%2F60%2Fff8a1c114b0cb94b76cf39d1fdaa%2Fresizes%2F500%2Fnewversion.jpg',
            width: 150,
            height: 50,
          },
          '16x9': {
            href: 'https://cdn1.performance.univision.com/dims4/default/cf2ec7a/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F3a%2F60%2Fff8a1c114b0cb94b76cf39d1fdaa%2Fnewversion.jpg',
            width: 1240,
            height: 698,
          },
          '16x9-mobile': {
            href: 'https://cdn1.performance.univision.com/dims4/default/c788a23/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F3a%2F60%2Fff8a1c114b0cb94b76cf39d1fdaa%2Fnewversion.jpg',
            width: 480,
            height: 270,
          },
          '16x9-tablet': {
            href: 'https://cdn1.performance.univision.com/dims4/default/b36701a/2147483647/thumbnail/1024x576%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F3a%2F60%2Fff8a1c114b0cb94b76cf39d1fdaa%2Fnewversion.jpg',
            width: 1024,
            height: 576,
          },
          'slideshow-horizontal': {
            href: 'https://cdn1.performance.univision.com/dims4/default/a4ca597/2147483647/resize/935x645%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F3a%2F60%2Fff8a1c114b0cb94b76cf39d1fdaa%2Fnewversion.jpg',
            width: 935,
            height: 645,
          },
          '16x9-loading': {
            href: 'https://cdn1.performance.univision.com/dims4/default/beb89eb/2147483647/thumbnail/30x17/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F3a%2F60%2Fff8a1c114b0cb94b76cf39d1fdaa%2Fresizes%2F500%2Fnewversion.jpg',
            width: 30,
            height: 17,
          },
          'slideshow-4x3-vertical-mobile': {
            href: 'https://cdn1.performance.univision.com/dims4/default/296d10f/2147483647/resize/420x620%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F3a%2F60%2Fff8a1c114b0cb94b76cf39d1fdaa%2Fnewversion.jpg',
            width: 420,
            height: 620,
          },
        },
      },
      content: null,
    };
    const wrapper = shallow(<VerticalSlideshow slides={[slide, slide]} primaryTag={{ name: 'foo' }} />);
    expect(wrapper.find('Picture__item')).toBeDefined();
  });

  it('should return null if the slideshow has no slides', () => {
    const wrapper = shallow(<VerticalSlideshow slides={[]} primaryTag={{ name: 'foo' }} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should ignore slides with null renditions', () => {
    const slideNullRendition = getSlideItem('c');
    slideNullRendition.content.renditions = null;
    const slides = [getSlideItem('a'), getSlideItem('b'), slideNullRendition];
    const wrapper = shallow(<VerticalSlideshow slides={slides} primaryTag={{ name: 'foo' }} />);
    expect(wrapper.find('#a123')).toHaveLength(1);
    expect(wrapper.find('#b123')).toHaveLength(1);
    expect(wrapper.find('#c123')).toHaveLength(0);
  });

  it('should track change event with slideshow depth included when VSS is enabled ', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const trackSpy = jest.spyOn(SlideshowTracker, 'track');
    const wrapper = mount(
      <VerticalSlideshow
        depth={3}
        primaryTag={{ name: 'foo' }}
        slides={[getSlideItem('a'), getSlideItem('b')]}
      />
    );
    const visibilitySensor = wrapper.find('VisibilitySensor');

    visibilitySensor.get(1).props.onChange(true);

    expect(trackSpy).toHaveBeenCalledWith(
      SlideshowTracker.events.change,
      expect.objectContaining({
        slideshowDepth: 3,
      })
    );
  });

  it('should track change event without slideshow depth when VSS is disabled ', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const trackSpy = jest.spyOn(SlideshowTracker, 'track');
    const wrapper = mount(
      <VerticalSlideshow
        depth={3}
        primaryTag={{ name: 'foo' }}
        slides={[getSlideItem('a'), getSlideItem('b')]}
      />
    );
    const visibilitySensor = wrapper.find('VisibilitySensor');

    visibilitySensor.get(1).props.onChange(true);

    expect(trackSpy).toHaveBeenCalledWith(
      SlideshowTracker.events.change,
      expect.not.objectContaining({
        slideshowDepth: 3,
      })
    );
  });

  it('should load the image with a cache buster', () => {
    Store.dispatch(setPageData(
      {
        data: {
          addCacheBusterToImageUrls: true,
        },
      }
    ));
    const verticalSlide = {
      caption: 'test',
      content: {
        type: 'image',
        uid: '123',
        credit: 'aaa',
        renditions: {
          original: {
            href: '123',
            width: 400,
            height: 800,
          },
        },
      },
    };
    const wrapper = mount(
      <VerticalSlideshow slides={[verticalSlide]} primaryTag={{ name: 'foo' }} />
    );
    const truncate = wrapper.find('Picture');
    expect(truncate.prop('overrideImageUrl')).toBeDefined();
  });
});
