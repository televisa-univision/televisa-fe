import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const site = UNIVISION_SITE;
const target = '_self';
const rootPath = '/shows';

/**
 * Since novelas will get swapped in and out all the time, the way to choose which are currently
 * active is by adding the ID of the novela to the active array. The novelas will be displayed in
 * the array order.
 */
const activeNovelas = [21, 23];
const novelas = [
  {
    id: 1,
    name: 'la usurpadora',
    href: `${rootPath}/la-usurpadora`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/64/9a/a50037894e1dbd386096f48651ff/megamenuusurpadora.jpg',
    },
  },
  {
    id: 2,
    name: 'amor eterno',
    href: `${rootPath}/amor-eterno`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/ed/e7/cff2e79042888080a884d2327da9/amoreternox480.jpg',
    },
  },
  {
    id: 3,
    name: 'cuna de lobos',
    href: `${rootPath}/cuna-de-lobos`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/1b/9f/ab6c092442b5bf35821bc8246e18/megamenu-3.jpg',
    },
  },
  {
    id: 4,
    name: 'ringo',
    href: `${rootPath}/ringo`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/92/36/c95209974f56bb2a4350547add2e/ringo-megamenu.jpg',
    },
  },
  {
    id: 5,
    name: 'te doy la vida',
    href: `${rootPath}/te-doy-la-vida`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/27/88/442b390a4096816fdf54555e2f7b/megamenu-3.jpg',
    },
  },
  {
    id: 6,
    name: 'como tu no hay dos',
    href: `${rootPath}/como-tu-no-hay-dos`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/fb/bd/92401fbf4e9fb16b4fcba903b5a3/xxs-como-tu-no-hay-2.jpg',
    },
  },
  {
    id: 7,
    name: 'medicos',
    href: `${rootPath}/shows/medicos-linea-de-vida`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/bb/02/f6051d7e4dc6adb3f6e4cf783456/medicos-mm.jpg',
    },
  },
  {
    id: 8,
    name: 'dulce ambicion',
    href: `${rootPath}/shows/dulce-ambicion`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/d5/5c/1122800940dda19e991d94c88828/megamenu-dulce-ambition.jpg',
    },
  },
  {
    id: 9,
    name: 'imperio de mentiras',
    href: `${rootPath}/imperio-de-mentiras`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/86/94/12d1132a4b138560cc5870a8374f/megamenu-imperio-de-mentiras.jpg',
    },
  },
  {
    id: 10,
    name: 'te acuerdas de mi',
    href: `${rootPath}/te-acuerdas-de-mi`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/f6/b2/8d6ffc894be085c6542026a61491/megamenu-te-acuerdas-de-mi.jpg',
    },
  },
  {
    id: 11,
    name: 'la hija del embajador',
    href: `${rootPath}/la-hija-del-embajador`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/22/b5/cd12a35948fcbb0e131fd5811481/megamenu-la-hija-del-embajador.jpg',
    },
  },
  {
    id: 12,
    name: 'La Herencia',
    href: `${rootPath}/la-herencia`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/0c/30/e9fe714142308731aa3764361268/e2cba664-423f-43a6-867a-0c973261b38f-la-herencia.jpeg',
    },
  },
  {
    id: 13,
    name: 'la desalmada',
    href: `${rootPath}/la-desalmada`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/2d/f9/267cca4947848a981f86d5e60d4a/la-desalmada-mega-menu.jpg',
    },
  },
  {
    id: 14,
    name: 'Mujer de nadie',
    href: `${rootPath}/mujer-de-nadie`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/cb/6c/8e3a59b3400fa80144b3dd2f4f58/b4f9109d-fb66-4cb2-9ca0-9265a172546e-megamenu-mujer-de-nadie.jpeg',
    },
  },
  {
    id: 15,
    name: 'los ricos tambien lloran',
    href: `${rootPath}/los-ricos-tambien-lloran`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/a2/1b/f760045d40b7913cd6fd0165119c/los-ricos.jpeg',
    },
  },
  {
    id: 16,
    name: 'la madrastra 2022',
    href: `${rootPath}/la-madrastra-2022`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/a7/2c/cb829f14418f91085397abd8bccb/megamenu.jpeg',
    },
  },
  {
    id: 17,
    name: 'mi camino es amarte',
    href: `${rootPath}/mi-camino-es-amarte`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/d8/be/d428b74b46339d90ee4233fd6cf4/megamenumcea.jpeg',
    },
  },
  {
    id: 18,
    name: 'cabo',
    href: `${rootPath}/cabo`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/2e/ad/df14de0647df9ae0d96ad748d77e/megamenu.jpg',
    },
  },
  {
    id: 19,
    name: 'perdona nuestros pecados',
    href: `${rootPath}/perdona-nuestros-pecados`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/76/e1/dcbf1fb241d290d7c32d33e4c6db/megamenupnp-1.jpg',
    },
  },
  {
    id: 20,
    name: 'el amor invencible',
    href: `${rootPath}/el-amor-invencible`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/72/c3/85670d0547718ddef40f87d23796/megamenu-8.jpg',
    },
  },
  {
    id: 21,
    name: 'mujer',
    href: `${rootPath}/mujer`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/80/b0/8811a40e42d99677a64248c54c77/megamenu-1.jpg',
    },
  },
  {
    id: 22,
    name: 'tierra de esperanza',
    href: `${rootPath}/tierra-de-esperanza`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/e3/fa/8468451c4ce091faed94aae00c65/megamenutierradeesperanza.jpg',
    },
  },
  {
    id: 23,
    name: 'minas de pasion',
    href: `${rootPath}/minas-de-pasion`,
    site,
    target,
    renditions: {
      xxs: 'https://st1.uvnimg.com/42/d4/d432bf8642bf9b5e4bae0868292b/megamenu.jpg',
    },
  },
];

export default {
  name: LocalizationManager.get('novelas'),
  href: `${rootPath}/novelas`,
  target,
  cta: {
    text: LocalizationManager.get('seeAllNovelas'),
  },
  site,
  children: activeNovelas.map(activeId => novelas.find(novela => activeId === novela.id)),
};
