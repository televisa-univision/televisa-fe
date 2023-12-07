import { BRIGHT_PURPLE } from '@univision/fe-commons/dist/utils/styled/constants';

const rootPath = 'https://shop.univision.com';
const site = '';
const target = '_blank';

const children = [
  {
    name: 'Fundadores Latinos',
    href: `${rootPath}/pages/fundadoreslatinos`,
    site,
    target,
  },
  {
    name: 'Gangas + Deals',
    href: `${rootPath}/pages/gangasanddeals`,
    site,
    target,
  },
];

export default {
  children,
  href: rootPath,
  name: 'Shop Univision',
  site,
  target,
  theme: {
    primary: BRIGHT_PURPLE,
  },
  crawlable: true,
};
