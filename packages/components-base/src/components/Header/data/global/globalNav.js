import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import { getTudnTheme } from '@univision/fe-commons/dist/utils/themes/themes';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import { UNIVISION_SITE, TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import features from '@univision/fe-commons/dist/config/features';

export default () => {
  const isDesktop = getDevice(Store) === 'desktop';
  const showUniNow = features.header.buttonUniNow();
  return [
    {
      name: 'Portada',
      href: '/',
      theme: themes.black,
      display: true,
      site: UNIVISION_SITE,
    }, {
      name: 'TV Shows',
      href: '/shows',
      theme: themes.black,
      display: true,
      site: UNIVISION_SITE,
    }, {
      name: 'Famosos',
      href: '/famosos',
      theme: themes.pink,
      display: true,
      site: UNIVISION_SITE,
    }, {
      name: 'Entretenimiento',
      href: '/entretenimiento',
      theme: themes.pink,
      display: true,
    }, {
      name: 'Noticias',
      href: '/noticias',
      theme: themes.blue,
      display: true,
      site: UNIVISION_SITE,
    }, {
      name: 'Inmigración',
      href: '/noticias/inmigracion',
      theme: themes.blue,
      display: isDesktop,
      site: UNIVISION_SITE,
    }, {
      name: 'Deportes',
      href: '/',
      theme: getTudnTheme(),
      display: true,
      site: TUDN_SITE,
    }, {
      name: 'Liga MX',
      href: '/futbol/liga-mx',
      theme: getTudnTheme(),
      display: isDesktop,
      site: TUDN_SITE,
    }, {
      name: 'TV',
      href: 'https://www.univisionnow.com/channels?utm_source=univisioncom&utm_medium=nav-topnav&utm_campaign=tve-2019&utm_content=tve-2019',
      theme: themes.black,
      target: '_blank',
      display: showUniNow === null,
    },
  ];
};
