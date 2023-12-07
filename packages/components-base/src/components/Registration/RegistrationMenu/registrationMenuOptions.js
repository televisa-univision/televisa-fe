import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { MVPD, GEOLOCATION } from '../RegistrationConfiguration';

export default Object.freeze(
  [{
    description: localization.get('providerDesc'),
    title: localization.get('provider'),
    setPage: MVPD,
  }, {
    description: localization.get('locationDesc'),
    title: localization.get('location'),
    setPage: GEOLOCATION,
  }, {
    description: localization.get('notificationsDesc'),
    title: localization.get('notifications'),
  }, {
    description: localization.get('favoritesDesc'),
    title: localization.get('favorites'),
  }, {
    description: localization.get('myListDesc'),
    title: localization.get('myList'),
  }]
);
