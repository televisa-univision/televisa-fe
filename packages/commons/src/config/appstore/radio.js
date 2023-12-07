import * as pageCategories from '../../constants/pageCategories';
import localization from '../../utils/localization/LocalizationManager';
import { themes } from '../../utils/themes/themes.json';

export default {
  apps: {
    [pageCategories.RADIO]: {
      prefix: 'uforiaapp',
      title: 'Uforia',
      icon: 'uforiaApp',
      trackingId: 'smart_banner_radio',
      analyticsId: 'smart_banner_radio',
      ios: {
        id: '451268300',
      },
      android: {
        id: 'com.univision.uforia',
        theme: themes.black,
        storeText: localization.get('storeUforia'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://uforia.onelink.me/Oha4/8d7bffcb',
      desktopLink: 'https://www.univision.com/radio/aplicacion-de-radio-univision-movil',
    },
  },
};
