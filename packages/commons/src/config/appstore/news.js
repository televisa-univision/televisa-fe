import * as pageCategories from '../../constants/pageCategories';
import localization from '../../utils/localization/LocalizationManager';
import { themes } from '../../utils/themes/themes.json';

export default {
  apps: {
    [pageCategories.NEWS]: {
      prefix: 'noticiasapp',
      title: 'Univision Noticias',
      icon: 'noticiasApp',
      trackingId: 'smart_banner_noticias',
      analyticsId: 'smart_banner_noticias',
      ios: {
        id: '484569962',
      },
      android: {
        id: 'com.univision.noticias',
        theme: themes.black,
        storeText: localization.get('storeNews'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://go.onelink.me/xFGp/65fd115e',
      skipOn: [
        '^/noticias/coronavirus',
      ],
    },
  },
};
