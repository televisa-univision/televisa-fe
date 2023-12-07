import * as pageCategories from '../../constants/pageCategories';
import localization from '../../utils/localization/LocalizationManager';
import { themes } from '../../utils/themes/themes.json';
import smartLinks from './smartLinks';

export default {
  apps: {
    [pageCategories.UNIVISION_NOW]: {
      prefix: 'univisionnow',
      title: 'Univision NOW',
      icon: 'unowAppDark',
      trackingId: 'smart_banner_univision_now',
      analyticsId: 'smart_banner_UNow',
      ios: {
        id: '1049321283',
      },
      android: {
        id: 'com.univision.univisionnow',
        theme: themes.black,
        storeText: localization.get('storeUnow'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      smartLinks: {
        '/shows/*': smartLinks('tentpole'),
        '/shows/univision-guia-programacion-de-television-shows-novelas-y-series': smartLinks('guiatv'),
        [pageCategories.NOVELA]: smartLinks('novela'),
        [pageCategories.SHOW]: smartLinks('tentpole'),
        [pageCategories.SERIE]: smartLinks('tentpole'),
        [pageCategories.ESPECIALES]: smartLinks('tentpole'),
      },
    },
  },
  mapping: [
    '^/noticias/inmigracion',
    pageCategories.NOVELA,
    pageCategories.SERIE,
  ].reduce((result, id) => ({ [id]: pageCategories.UNIVISION_NOW, ...result }), {}),
};
