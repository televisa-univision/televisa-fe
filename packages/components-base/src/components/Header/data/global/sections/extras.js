import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';

const site = UNIVISION_SITE;

export default [{
  name: 'TV En Vivo',
  href: 'https://smart.link/5c75a80bcee04?site_id=univisioncom&creative_id=nav-hamburger&cp_3=TVE-2019&cp_0=browse&web_page=page/landing&utm_source=univisioncom&utm_medium=nav-hamburger&utm_content=TVE-2019&utm_campaign=TVE-2019',
  theme: themes.black,
  target: '_blank',
}, {
  name: 'Guia TV',
  href: '/shows/univision-guia-programacion-de-television-shows-novelas-y-series',
  site,
}, {
  name: 'Delicioso',
  href: '/delicioso',
  site,
}, {
  name: 'Radio',
  href: '/radio',
  site,
}, {
  name: 'A Bordo',
  href: '/carros',
  site,
}, {
  name: 'Tu Ciudad',
  href: '/local',
  theme: themes.blue,
  site,
  children: [{
    name: 'Atlanta, GA',
    href: '/local/atlanta-wuvg',
    site,
  }, {
    name: 'Austin, TX',
    href: '/local/austin-kakw',
    site,
  }, {
    name: 'Bakersfield, CA',
    href: '/local/bakersfield-kabe',
    site,
  }, {
    name: 'Chicago, IL',
    href: '/local/chicago-wgbo',
    site,
  }, {
    name: 'Dallas, TX',
    href: '/local/dallas-kuvn',
    site,
  }, {
    name: 'Fresno, CA',
    href: '/local/fresno-kftv',
    site,
  }, {
    name: 'Houston, TX',
    href: '/local/houston-kxln',
    site,
  }, {
    name: 'Los Angeles, CA',
    href: '/local/los-angeles-kmex',
    site,
  }, {
    name: 'Miami, FL',
    href: '/local/miami-wltv',
    site,
  }, {
    name: 'Nueva York, NY',
    href: '/local/nueva-york-wxtv',
    site,
  }, {
    name: 'Philadelphia, PA',
    href: '/local/philadelphia-wuvp',
    site,
  }, {
    name: 'Phoenix/Tucson, AZ',
    href: '/local/arizona-ktvw',
    site,
  }, {
    name: 'Puerto Rico',
    href: '/local/puerto-rico-wlii',
    site,
  }, {
    name: 'Raleigh, NC',
    href: '/local/north-carolina-wuvc',
    site,
  }, {
    name: 'San Antonio, TX',
    href: '/local/san-antonio-kwex',
    site,
  }, {
    name: 'San Francisco, CA',
    href: '/local/san-francisco-kdtv',
    site,
  }, {
    name: 'Salt Lake City, UT',
    href: '/local/salt-lake-city-kuth',
    site,
  }, {
    name: 'Sacramento, CA',
    href: '/local/sacramento-kuvs',
    site,
  }],
}, {
  name: 'Galavisión',
  href: '/networks/galavision',
  site,
}, {
  name: 'Unimás',
  href: '/unimas',
  site,
}];
