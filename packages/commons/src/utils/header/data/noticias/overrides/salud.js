import links from '../links/salud';

// Uris for salud pages
const uris = {
  temas_salud: '/temas/salud',
  salud: '/noticias/salud',
  temas_adultos_mayores: '/temas/adultos-mayores',
  adultos_mayores: '/noticias/adultos-mayores',
  salud_adultos_mayores: '/noticias/salud/adultos-mayores',
  temas_fuertes_juntos: '/temas/fuertes-juntos',
  fuertes_juntos: '/noticias/salud/fuertes-juntos',
  salud_es_vida: '/noticias/salud/salud-es-vida',
  temas_salud_es_vida: '/temas/salud-es-vida',
  salud_para_todos: '/noticias/salud-para-todos',
  temas_salud_para_todos: '/temas/salud-para-todos',
  salud_y_mujer: '/noticias/salud/salud-y-mujer',
  temas_salud_y_mujer: '/temas/salud-y-mujer',
};

// Salud overrides for titles and links
export default {
  [uris.temas_salud]: {
    links,
    title: {
      name: 'Salud',
      logo: null,
    },
  },
  [uris.salud]: {
    links,
    title: {
      name: 'Salud',
      logo: null,
    },
  },
  [uris.adultos_mayores]: {
    links,
    title: {
      name: null,
      logo: 'https://st1.uvnimg.com/94/04/7cdac1f046beb80576dbce6050d8/logo-adultos-mayores-exposed-nav.svg',
    },
  },
  [uris.temas_adultos_mayores]: {
    links,
    title: {
      name: null,
      logo: 'https://st1.uvnimg.com/94/04/7cdac1f046beb80576dbce6050d8/logo-adultos-mayores-exposed-nav.svg',
      link: '/noticias/salud/adultos-mayores',
    },
  },
  [uris.salud_adultos_mayores]: {
    links,
    title: {
      name: null,
      logo: 'https://st1.uvnimg.com/94/04/7cdac1f046beb80576dbce6050d8/logo-adultos-mayores-exposed-nav.svg',
      link: '/noticias/salud/adultos-mayores',
    },
  },
  [uris.fuertes_juntos]: {
    links,
    title: {
      name: null,
      logo: 'https://st1.uvnimg.com/5d/cf/5d8022bf4a3cbcf92a238bbb6b98/logo-fuertes-juntos-exposed-nav.svg',
    },
  },
  [uris.temas_fuertes_juntos]: {
    links,
    title: {
      name: null,
      logo: 'https://st1.uvnimg.com/5d/cf/5d8022bf4a3cbcf92a238bbb6b98/logo-fuertes-juntos-exposed-nav.svg',
    },
  },
  [uris.salud_es_vida]: {
    links,
    title: {
      name: null,
      logo: 'https://st1.uvnimg.com/50/3f/c705fa1a42dba58615019f2df04b/logo-salud-es-vida-exposed-nav.svg',
      link: '/noticias/salud-es-vida',
    },
  },
  [uris.temas_salud_es_vida]: {
    links,
    title: {
      name: null,
      logo: 'https://st1.uvnimg.com/50/3f/c705fa1a42dba58615019f2df04b/logo-salud-es-vida-exposed-nav.svg',
      link: '/noticias/salud-es-vida',
    },
  },
  [uris.salud_y_mujer]: {
    links,
    title: {
      name: 'Salud',
      logo: null,
    },
  },
  [uris.temas_salud_y_mujer]: {
    links,
    title: {
      name: 'Salud',
      logo: null,
    },
  },
};
