import localization from '../../utils/localization/LocalizationManager';
import { themes } from '../../utils/themes/themes.json';

export default {
  apps: {
    'local-san-francisco-kdtv': {
      prefix: 'localsanfranciscoapp',
      title: 'Univision 14 San Francisco',
      icon: 'bayAreaApp',
      trackingId: 'smart_banner_local_kdtv',
      analyticsId: 'smart_banner_local_kdtv',
      ios: {
        id: '1439497525',
      },
      android: {
        id: 'com.univision.local.sanfrancisco',
        theme: themes.black,
        storeText: localization.get('storeSanFrancisco'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision14bayarea.onelink.me/R2Ce/ecf2dab8',
    },
    'local-miami-wltv': {
      prefix: 'localmiamiapp',
      title: 'Univision 23 Miami',
      icon: 'miamiApp',
      trackingId: 'smart_banner_local_wltv',
      analyticsId: 'smart_banner_local_wltv',
      ios: {
        id: '1349989512',
      },
      android: {
        id: 'com.wltv.android.weather',
        theme: themes.black,
        storeText: localization.get('storeMiami'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision23miami.onelink.me/JUAK/c0561b03',
    },
    'local-houston-kxln': {
      prefix: 'localhoustonapp',
      title: 'Univision 45 Houston',
      icon: 'houstonApp',
      trackingId: 'smart_banner_local_kxln',
      analyticsId: 'smart_banner_local_kxln',
      ios: {
        id: '1351909432',
      },
      android: {
        id: 'com.kxln.android.weather',
        theme: themes.black,
        storeText: localization.get('storeHouston'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision45houston.onelink.me/nSTi/e7fe91d7',
    },
    'local-dallas-kuvn': {
      prefix: 'localdallasapp',
      title: 'Univision 23 Dallas',
      icon: 'dallasApp',
      trackingId: 'smart_banner_local_kuvn',
      analyticsId: 'smart_banner_local_kuvn',
      ios: {
        id: '1445214658',
      },
      android: {
        id: 'com.univision.local.dallas',
        theme: themes.black,
        storeText: localization.get('storeDallas'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision23dallas.onelink.me/YDI9/35c93b3',
    },
    'local-chicago-wgbo': {
      prefix: 'localchicagoapp',
      title: 'Univision Chicago',
      icon: 'chicagoApp',
      trackingId: 'smart_banner_local_wgbo',
      analyticsId: 'smart_banner_local_wgbo',
      ios: {
        id: '1444890789',
      },
      android: {
        id: 'com.univision.local.chicago',
        theme: themes.black,
        storeText: localization.get('storeChicago'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univisionchicago.onelink.me/l8d6/a1bd31da',
    },
    'local-nueva-york-wxtv': {
      prefix: 'localnewyorkapp',
      title: 'Univision 41 Nueva York',
      icon: 'newYorkApp',
      trackingId: 'smart_banner_local_wxtv',
      analyticsId: 'smart_banner_local_wxtv',
      ios: {
        id: '1438231386',
      },
      android: {
        id: 'com.univision.local.newyork',
        theme: themes.black,
        storeText: localization.get('storeNewYork'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision41ny.onelink.me/jpBJ/1cbce40e',
    },
    'local-los-angeles-kmex': {
      prefix: 'locallosangelesapp',
      title: 'Univision 34 Los Angeles',
      icon: 'losAngelesApp',
      trackingId: 'smart_banner_local_kmex',
      analyticsId: 'smart_banner_local_kmex',
      ios: {
        id: '1445188510',
      },
      android: {
        id: 'com.univision.local.losangeles',
        theme: themes.black,
        storeText: localization.get('storeLosAngeles'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision34la.onelink.me/Cux5/6f1de891',
    },
    'local-san-antonio-kwex': {
      prefix: 'localsanantonioapp',
      title: 'Univision 41 San Antonio',
      icon: 'sanAntonioApp',
      trackingId: 'smart_banner_local_kwex',
      analyticsId: 'smart_banner_local_kwex',
      ios: {
        id: '1448760014',
      },
      android: {
        id: 'com.univision.local.sanantonio',
        theme: themes.black,
        storeText: localization.get('storeSanAntonio'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univisionsanantonio.onelink.me/95Qa/5afecb88',
    },
    'local-austin-kakw': {
      prefix: 'localaustinapp',
      title: 'Univision 62 Austin',
      icon: 'austinApp',
      trackingId: 'smart_banner_local_kakw',
      analyticsId: 'smart_banner_local_kakw',
      ios: {
        id: '1448760331',
      },
      android: {
        id: 'com.univision.local.austin',
        theme: themes.black,
        storeText: localization.get('storeAustin'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision62.onelink.me/U6K8/336ef291',
    },
    'local-bakersfield-kabe': {
      prefix: 'localbakersfieldapp',
      title: 'Univision 39 Bakersfield',
      icon: 'bakersfieldApp',
      trackingId: 'smart_banner_local_kabe',
      analyticsId: 'smart_banner_local_kabe',
      ios: {
        id: '1500452564',
      },
      android: {
        id: 'com.univision.local.bakersfield',
        theme: themes.black,
        storeText: localization.get('storeBakersfield'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision62.onelink.me/U6K8/336ef291', // TODO: New storeLink for Bakersfield
    },
    'local-saltlakecity-kuth': {
      prefix: 'localsaltlakecityapp',
      title: 'Univision 32 Salt Lake City',
      icon: 'saltLakeCityApp',
      trackingId: 'smart_banner_local_kuth',
      analyticsId: 'smart_banner_local_kuth',
      ios: {
        id: '1502642496',
      },
      android: {
        id: 'com.univision.local.saltlakecity',
        theme: themes.black,
        storeText: localization.get('storeSaltLakeCity'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision62.onelink.me/U6K8/336ef291', // TODO: New storeLink for Salt Lake City
    },
    'local-arizona-ktvw': {
      prefix: 'localarizonaapp',
      title: 'Univision Arizona',
      icon: 'arizonaApp',
      trackingId: 'smart_banner_local_ktvw',
      analyticsId: 'smart_banner_local_ktvw',
      ios: {
        id: '1351909432',
      },
      android: {
        id: 'com.kxln.android.weather',
        theme: themes.black,
        storeText: localization.get('storeArizona'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univisionarizona.onelink.me/yLPJ/b054e5cf',
    },
    'local-atlanta-wuvg': {
      prefix: 'localatlantaapp',
      title: 'Univision 34 Atlanta',
      icon: 'atlantaApp',
      trackingId: 'smart_banner_local_wuvg',
      analyticsId: 'smart_banner_local_wuvg',
      ios: {
        id: '1450004705',
      },
      android: {
        id: 'com.univision.local.atlanta',
        theme: themes.black,
        storeText: localization.get('storeAtlanta'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univisionatlanta.onelink.me/uLk0/3cbea705',
    },
    'local-north-carolina-wuvc': {
      prefix: 'localnorthcarolinaapp',
      title: 'Univision North Carolina',
      icon: 'northCarolinaApp',
      trackingId: 'smart_banner_local_wuvc',
      analyticsId: 'smart_banner_local_wuvc',
      ios: {
        id: '1444890789',
      },
      android: {
        id: 'com.univision.local.northcarolina',
        theme: themes.black,
        storeText: localization.get('storeNorthCarolina'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univisionnc.onelink.me/MgDz/6a7eb612',
    },
    'local-fresno-kftv': {
      prefix: 'localfresnoapp',
      title: 'Univision Fresno',
      icon: 'fresnoApp',
      trackingId: 'smart_banner_local_kftv',
      analyticsId: 'smart_banner_local_kftv',
      ios: {
        id: '1449764089',
      },
      android: {
        id: 'com.univision.local.fresno',
        theme: themes.black,
        storeText: localization.get('storeFresno'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision21fresno.onelink.me/UeAd/7cb8d817',
    },
    'local-philadelphia-wuvp': {
      prefix: 'localphiladelphiaapp',
      title: 'Univision Philadelphia',
      icon: 'philadelphiaApp',
      trackingId: 'smart_banner_local_wuvp',
      analyticsId: 'smart_banner_local_wuvp',
      ios: {
        id: '1449854157',
      },
      android: {
        id: 'com.univision.local.philadelphia',
        theme: themes.black,
        storeText: localization.get('storePhiladelphia'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://univision65philadelphia.onelink.me/SNTu/a34ad8d',
    },
    'local-puerto-rico-wlii': {
      prefix: 'localpuertoricoapp',
      title: 'Univision Puerto Rico',
      icon: 'puertoRicoApp',
      trackingId: 'smart_banner_local_wlii',
      analyticsId: 'smart_banner_local_wlii',
      ios: {
        id: '1452304429',
      },
      android: {
        id: 'com.univision.local.puertorico',
        theme: themes.black,
        storeText: localization.get('storePuertoRico'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://go.onelink.me/tD1f/4dc0996d',
    },
    'local-sacramento-kuvs': {
      prefix: 'localsacramentoapp',
      title: 'Univision Sacramento',
      icon: 'sacramentoApp',
      trackingId: 'smart_banner_local_kuvs', // TODO: confirm if correct
      analyticsId: 'smart_banner_local_kuvs', // TODO: confirm if correct
      ios: {
        id: '1449753514',
      },
      android: {
        id: 'com.univision.local.sacramento',
        theme: themes.black,
        storeText: localization.get('storeSacramento'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://go.onelink.me/LTR5/ed238321',
    },
  },
  mapping: {
    // Locales apps
    '^/local/san-francisco-kdtv': 'local-san-francisco-kdtv',
    '^/local/miami-wltv': 'local-miami-wltv',
    '^/local/houston-kxln': 'local-houston-kxln',
    '^/local/dallas-kuvn': 'local-dallas-kuvn',
    '^/local/chicago-wgbo': 'local-chicago-wgbo',
    '^/local/nueva-york-wxtv': 'local-nueva-york-wxtv',
    '^/local/los-angeles-kmex': 'local-los-angeles-kmex',
    '^/local/san-antonio-kwex': 'local-san-antonio-kwex',
    '^/local/austin-kakw': 'local-austin-kakw',
    '^/local/arizona-ktvw': 'local-arizona-ktvw',
    '^/local/atlanta-wuvg': 'local-atlanta-wuvg',
    '^/local/north-carolina-wuvc': 'local-north-carolina-wuvc',
    '^/local/fresno-kftv': 'local-fresno-kftv',
    '^/local/philadelphia-wuvp': 'local-philadelphia-wuvp',
    '^/local/puerto-rico-wlii': 'local-puerto-rico-wlii',
    '^/local/sacramento-kuvs': 'local-sacramento-kuvs',
  },
};
