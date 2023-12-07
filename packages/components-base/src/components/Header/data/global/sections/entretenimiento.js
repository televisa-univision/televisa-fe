import themes from '@univision/fe-commons/dist/utils/themes/themes.json';

export default [{
  name: 'Entretenimiento',
  href: '/entretenimiento',
  theme: themes.themes.black,
  children: [
    {
      name: 'Cultura pop',
      href: 'entretenimiento/cultura-pop',
    },
    {
      name: 'Cine y series',
      href: 'entretenimiento/cine-y-series',
    },
    {
      name: 'Geek',
      href: 'entretenimiento/geek',
    },
  ],
}];
