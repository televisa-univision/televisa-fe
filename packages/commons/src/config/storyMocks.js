/* eslint-disable import/prefer-default-export */
export const pageData = {
  device: 'mobile',
  env: 'test',
  data: {
    type: 'section',
    adSettings: {
      adTagValue: 'section_homepage',
      targeting: {
        client: 'desktop',
        tag: [
          'local',
        ],
      },
      disableAds: false,
      freewheel: {
        sectionId: 'local_losangeles_klove1075_homepage',
        assetId: null,
        adValue: null,
        test: {
          displayAdProfilePath: 'univision_test',
          host: 'https://1b656.v.fwmrm.net',
          linkTag2Profile: '111976:univision_linktag2_test',
          networkCode: '111976',
          profilePath: 'univision_test_HTML5',
        },
        production: {
          displayAdProfilePath: 'univision_test',
          host: 'https://1b656.v.fwmrm.net',
          linkTag2Profile: 'univision_linktag2_live',
          networkCode: '112214',
          profilePath: 'univision_Live_HTML5',
        },
      },
      dfp: {
        adValue: '/local/losangeles/klove1075/homepage',
        production: {
          desktopAdValuePrefix: 'd.',
          mobileAdValuePrefix: 'm.',
          networkCode: '6881',
        },
        test: {
          desktopAdValuePrefix: 'd.',
          mobileAdValuePrefix: 'm.',
          networkCode: '7009',
        },
      },
    },
  },
};
