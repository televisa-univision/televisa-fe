import * as pageCategories from '../../constants/pageCategories';
import localization from '../../utils/localization/LocalizationManager';
import { themes } from '../../utils/themes/themes.json';

export default {
  apps: {
    [pageCategories.ENTERTAINMENT]: {
      prefix: 'univisionapp',
      title: 'Univision',
      icon: 'univisionApp',
      trackingId: 'smart_banner_ent',
      analyticsId: 'smart_banner_ent',
      ios: {
        id: '425226754',
      },
      android: {
        id: 'com.univision.android',
        theme: themes.black,
        storeText: localization.get('storeEntertainment'),
        backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
      },
      storeLink: 'https://smart.link/5dcd72a478659',
      skipOn: [
        '^/shows/conecta-promos',
        '^/conecta',
      ],
    },
  },
  mapping: [
    '^/famosos',
    '^/shows',
    pageCategories.SHOW,
    [pageCategories.ENTERTAINMENT],
  ].reduce((result, id) => ({ [id]: pageCategories.ENTERTAINMENT, ...result }), {}),
};
