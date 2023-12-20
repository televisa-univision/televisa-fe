import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const site = UNIVISION_SITE;
const target = '_self';
const rootPath = '/shows';

/**
 * Since shows will get swapped in and out all the time, the way to choose which are currently
 * active is by adding the ID of the show to the active array. The shows will be displayed in the
 * array order.
 */
const activeShows = [1, 14, 4, 23];
const shows = [
  {
    id: 1,
    name: 'despierta américa',
    href: `${rootPath}/despierta-america`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/b5/92/be4d7969412c95a0c1f4d835cec1/despiertaamericax480.jpg',
    },
  },
  {
    id: 2,
    name: 'el retador',
    href: `${rootPath}/el-retador`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/11/58/0f406b8d4eae8b444a793b76f7e3/el-retador.jpg',
    },
  },
  {
    id: 3,
    name: 'Latin Grammy',
    href: `${rootPath}/latin-grammy`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/74/6c/bc6664cf4fb198eacf621215c3cb/megamenulatin.jpg',
    },
  },
  {
    id: 4,
    name: 'primer impacto',
    href: `${rootPath}/primer-impacto`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/91/36/a845e8a648b09bf8c0fa04af0d1b/mega-menu-480x270-px-hd.png',
    },
  },
  {
    id: 5,
    name: 'reto 4 elementos',
    href: `${rootPath}/reto-4-elementos`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/e1/42/5e6fb55342b68d9055202b5a07a9/featuredshows.jpg',
    },
  },
  {
    id: 6,
    name: 'nbl',
    href: `${rootPath}/nuestra-belleza-latina`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/47/31/73bdfcda47a2bc617a0e23b9eba0/megamenu-nbl.jpg',
    },
  },
  {
    id: 7,
    name: 'la reina de la canción',
    href: `${rootPath}/reina-de-la-cancion`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/ef/0b/bfc53d7a4ef4a3d94c66c2cae7cc/megamenu.jpg',
    },
  },
  {
    id: 8,
    name: 'mira quién baila',
    href: `${rootPath}/mira-quien-baila`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/f2/d9/70d4aa114d7996ec01aa2438eca2/megamenu-mqb.jpg',
    },
  },
  {
    id: 9,
    name: 'premio lo nuestro',
    href: `${rootPath}/premio-lo-nuestro`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/90/8a/cfdb95fc47e38e84a3efaca33753/megamenupln-1-1.jpeg',
    },
  },
  {
    id: 10,
    name: 'pequenos gigantes',
    href: `${rootPath}/pequenos-gigantes`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/76/e2/f0e06c0a49e4a80c89f6e68131b1/megamenu.jpg',
    },
  },
  {
    id: 11,
    name: 'sal y pimienta',
    href: `${rootPath}/sal-y-pimienta`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/5c/9d/d84d8b8e44bb902aa981a6124637/megamenu1.jpg',
    },
  },
  {
    id: 12,
    name: 'quien es la mascara',
    href: `${rootPath}/quien-es-la-mascara`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/54/43/705d1afa40279fde4109bf407c67/megamenu-5.jpg',
    },
  },
  {
    id: 13,
    name: 'premios juventud',
    href: `${rootPath}/premios-juventud`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/5a/db/204122a54f32bb90dd48609f6d4a/megamenu-11.jpg',
    },
  },
  {
    id: 14,
    name: 'el gordo y la flaca',
    href: `${rootPath}/el-gordo-y-la-flaca`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/f4/06/94cc11a540729d4944d3eb835bb7/gordoflacax480.jpg',
    },
  },
  {
    id: 15,
    name: 'latin grammy celebra ellas y su musica',
    href: `${rootPath}/latin-grammy-celebra-ellas-y-su-musica`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/01/ce/fcaef177451e958eb8dcceccd858/megamenu-latin-gramy-celebra-ellas.jpg',
    },
  },
  {
    id: 16,
    name: 'de noche pero sin sueño',
    href: `${rootPath}/de-noche-pero-sin-sueno`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/c3/b4/67f36ae94480a32f5a7751b5f4eb/megamenu-7.jpg',
    },
  },
  {
    id: 17,
    name: 'latin grammy 2022',
    href: `${rootPath}/latin-grammy`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/ee/9c/c3501e8a48bf9b8f77a11aba4b38/megamenu.jpeg',
    },
  },
  {
    id: 18,
    name: 'quien es la mascara',
    href: `${rootPath}/quien-es-la-mascara`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/f3/f8/aade1ebf40cfab187b5c512857c8/megamenu-talento.jpg',
    },
  },
  {
    id: 19,
    name: 'mi famoso y yo',
    href: `${rootPath}/mi-famoso-y-yo`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/50/b4/a98b9fe54c24810bd81bc8d42388/megamenu-9.jpg',
    },
  },
  {
    id: 20,
    name: 'Latin American Music Awards',
    href: `${rootPath}/latin-american-music-awards`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/91/8c/39a36d7a4d358b4b8b9dabd0c315/megamenu-10.jpg',
    },
  },
  {
    id: 21,
    name: 'Enamorándonos',
    href: `${rootPath}/enamorandonos`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/fb/65/548a61754ccc891129b46299e061/megamenu-enamorandonos.jpg',
    },
  },
  {
    id: 22,
    name: 'Veo Cómo Cantas',
    href: `${rootPath}/veo-como-cantas`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/36/e2/7f40dd74489c96cbd21f3d261336/megamenu.jpg',
    },
  },
  {
    id: 23,
    name: 'Al punto',
    href: `${rootPath}/al-punto`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/e8/ba/6f8a7af2437ba4c247f84fc2b4ce/al-punto-con-jr-2021-fb-pic.png',
    },
  },
  {
    id: 24,
    name: 'Teleton USA',
    href: `${rootPath}/teleton-usa`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/4f/51/cb8bcfed4373acc6e8e9b8fbfa24/megamenu-1-1.jpg',
    },
  },
];

export default {
  name: LocalizationManager.get('tvShows'),
  href: rootPath,
  target,
  cta: {
    text: LocalizationManager.get('seeAllShows'),
  },
  site,
  children: activeShows.map(activeId => shows.find(show => activeId === show.id)),
};
