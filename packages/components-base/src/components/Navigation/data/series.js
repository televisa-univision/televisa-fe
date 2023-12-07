import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const site = UNIVISION_SITE;
const target = '_self';
const rootPath = '/shows';

/**
 * Since series will get swapped in and out all the time, the way to choose which are currently
 * active is by adding the ID of the series to the active array. The series will be displayed in the
 * array order.
 */
const activeSeries = [4, 6];
const series = [
  {
    id: 1,
    name: 'sin miedo a la verdad',
    href: `${rootPath}/sin-miedo-a-la-verdad`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/cf/79/211e43464861833d38fe25a06f18/megamenu.jpg',
    },
  },
  {
    id: 2,
    name: 'el corazón nunca se equivoca',
    href: `${rootPath}/el-corazon-nunca-se-equivoca`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/6e/e4/fec977c242c095494f1576dc9425/elcorazonx480.jpg',
    },
  },
  {
    id: 3,
    name: 'el dragón',
    href: `${rootPath}/el-dragon`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/ce/a2/6d84b5f0442d88241c4e3b8d66ab/megamenu.jpg',
    },
  },
  {
    id: 4,
    name: 'la rosa de guadalupe',
    href: `${rootPath}/la-rosa-de-guadalupe`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/67/22/1c21930e451eb081f282c64f1771/megamenu.jpg',
    },
  },
  {
    id: 5,
    name: 'rubi',
    href: `${rootPath}/rubi`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/56/d9/f77668514804b6429f94baccb84e/megamenurubi.jpg',
    },
  },
  {
    id: 6,
    name: 'como dice el dicho',
    href: `${rootPath}/como-dice-el-dicho`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/1e/42/13d9495a4aa2bebf2ceea6dbd567/xxs-como-dice-el-dicho.jpg',
    },
  },
];

export default {
  name: LocalizationManager.get('series'),
  href: `${rootPath}/series`,
  target,
  cta: {
    text: LocalizationManager.get('seeAllSeries'),
  },
  site,
  children: activeSeries.map(activeId => series.find(s => activeId === s.id)),
};
