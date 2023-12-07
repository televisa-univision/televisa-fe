import * as pageCategories from '../../constants/pageCategories';
import localization from '../../utils/localization/LocalizationManager';
import deportes from '../features/deportes';
import { themes } from '../../utils/themes/themes.json';

export default {
  apps: {
    [pageCategories.SPORTS]: () => {
      const isTudn = deportes.isTudn();
      const legacy = {
        title: 'Univision Deportes',
        icon: 'deportesApp',
      };
      return {
        prefix: 'deportesapp',
        title: 'TUDN',
        icon: 'tudnApp',
        trackingId: 'smart_banner_deportes',
        analyticsId: 'smart_banner_deportes',
        ios: {
          id: '353665650',
        },
        android: {
          id: 'com.july.univision',
          theme: themes.black,
          storeText: localization.get('storeSports'),
          backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
        },
        storeLink: 'https://uvndeportes.onelink.me/TXKR/aaa82dac',
        ...(!isTudn && legacy),
      };
    },
  },
  mapping: {
    [pageCategories.SPORTS]: pageCategories.SPORTS,
  },
};
