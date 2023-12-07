export default {
  noticias: {
    logo: 'https://st1.uvnimg.com/cb/62/40f087384b0988f667aca7cbbebe/logo-noticias-white.svg',
    links: [
      {
        name: 'Inmigración',
        link: '/inmigracion',
      },
      {
        name: 'América Latina',
        link: '/america-latina',
      },
      {
        name: 'Estados Unidos',
        link: '/estados-unidos',
      },
      {
        name: 'Política',
        link: '/politica',
      },
      {
        name: 'Reto 28',
        link: '/reto-28',
      },
      {
        name: 'México',
        link: '/mexico',
      },
      {
        name: 'News in English',
        link: '/news',
      },
    ],
  },
  inmigracion: {
    title: 'Inmigración',
    links: [
      {
        name: 'Encuentra tu Visa',
        link: '/',
      },
      {
        name: 'Preguntas y Respuestas',
        link: '/',
      },
      {
        name: 'Las Nuevas Reglas',
        link: '/',
      },
    ],
  },
  dinero: {
    title: 'Dinero',
  },
  uforia: {
    title: 'Qué Buena 102.9',
    logo: 'https://st1.uvnimg.com/a8/4c/c963ba7248b2bc0c4f4bd0181094/logo-uforia-icono-white.svg',
    links: [
      {
        name: 'Inicio',
        link: '/',
      },
      {
        name: 'El Bueno, la mala y el feo',
        link: '/',
      },
      {
        name: 'Free-Guey Show',
        link: '/',
      },
      {
        name: 'Raúl Brinds',
        link: '/',
      },
    ],
  },
  local: {
    logo: 'https://cdn3.uvnimg.com/73/bb/8749198d4f608b1a7e2ad053f378/miami.svg',
    links: [
      {
        name: 'Inicio',
        link: '/',
      },
      {
        name: 'Noticias',
        link: '/',
      },
      {
        name: 'Video',
        link: '/',
      },
      {
        name: 'Lotería',
        link: '/',
      },
      {
        name: 'Tiempo',
        link: '/',
      },
      {
        name: 'Contáctenos',
        link: '/',
      },
    ],
  },
  horoscopos: {
    title: 'Horoscopos',
    links: [
      {
        name: 'Inicio',
        link: '/horoscopos',
      },
      {
        name: 'Zodiacal',
        link: '/',
      },
      {
        name: 'Horóscopo Chino',
        link: '/',
      },
      {
        name: 'Niño Prodigio',
        link: '/',
      },
      {
        name: 'Mundo Místico',
        link: '/',
      },
      {
        name: 'Mizada',
        link: '/',
      },
      {
        name: 'Tarot',
        link: '/',
      },
    ],
  },
  famosos: {
    logo: 'https://www.univision.com/assets/styles/fonts/logo-famosos.0a8a9948a11b0e1eefe1e0f60261a31e.svg',
  },
  leagues: {
    title: 'Leagues',
    links: [
      {
        name: 'Resultados',
        link: '/resultados',
        category: 'futbol',
      },
    ],
  },
  withIcon: {
    name: 'test',
    links: [
      {
        name: 'custom icon',
        link: '/',
        icon: {
          name: 'univision',
        },
      },
      {
        name: 'live icon',
        link: '/',
        icon: {
          name: 'live',
        },
      },
    ],
  },
  withSelectorMarket: {
    name: 'test',
    links: [
      {
        name: 'Tu ciudad',
        link: '/',
        selectorMarket: true,
      },
      {
        name: 'live icon',
        link: '/',
        icon: {
          name: 'live',
        },
      },
    ],
  },
  withLocalMarketIcon: {
    name: 'test',
    logoMarket: {
      icon: 'arizonaApp',
      uri: '/local/arizona-ktvw',
    },
    logo: 'https://st1.uvnimg.com/e9/26/e648eea94e17aabbda49c210e456/destino2020-logo.svg',
  },
  withLocalMarketCoronavirusIcon: {
    name: 'test',
    logoMarket: {
      icon: 'arizonaApp',
      uri: '/local/arizona-ktvw',
    },
    logo: 'https://st1.uvnimg.com/09/4c/853e49fc4a46ae30d9ae8717a70b/lg-coronavirus.svg',
  },
  withDropDownOptions: {
    name: 'test',
    title: 'Ofertas de trabajo',
    logo: 'https://st1.uvnimg.com/e9/26/e648eea94e17aabbda49c210e456/destino2020-logo.svg',
    links: [
      {
        name: 'Tu ciudad',
        dropDownOptions: [{
          name: 'arizonaApp',
          link: '/local/arizona-ktvw',
        }],
      },
    ],
  },
};
