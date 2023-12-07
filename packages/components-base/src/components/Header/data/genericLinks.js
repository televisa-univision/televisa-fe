import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';

export default {
  primary: [],
  secondary: [
    {
      name: 'Entretenimiento',
      link: '/entretenimiento',
      contents: [
        {
          name: 'Estilo de vida',
          link: '/estilo-de-vida',
        },
        {
          name: 'Radio',
          link: '/musica/uforia-music/radio',
        },
        {
          name: 'Musica',
          link: '/musica',
        },
        {
          name: 'Podcasts',
          link: '/musica/podcast-uforia-on-demand',
        },
      ],
    },
    {
      name: 'Televisión',
      link: '/',
      contents: [
        {
          name: 'Programas',
          link: '/programas/shows/shows-programas-y-noticiero',
        },
        {
          name: 'Shows',
          link: '/shows',
        },
        {
          name: 'Novelas',
          link: '/novelas',
        },
        {
          name: 'Series',
          link: '/series',
        },
        {
          name: 'Guía de TV',
          link: '/entretenimiento/longform/univision-guia-programacion-de-television-shows-novelas-y-series',
        },
        {
          name: 'TV en vivo',
          link: '/entretenimiento/longform/senal-en-vivo-univision-tv-en-vivo',
        },
      ],
    },
    {
      name: 'Noticias',
      link: '/noticias',
      contents: [
        {
          name: 'Política',
          link: '/noticias/politica',
        },
        {
          name: 'Inmigración',
          link: '/noticias/inmigracion',
        },
        {
          name: 'América Latina',
          link: '/noticias/america-latina',
        },
        {
          name: 'México',
          link: '/noticias/mexico',
        },
        {
          name: 'Salud',
          link: '/noticias/salud',
        },
        {
          name: 'Educación',
          link: '/noticias/educacion',
        },
        {
          name: 'Dinero',
          link: '/noticias/dinero',
        },
        {
          name: 'Planeta',
          link: '/noticias/medio-ambiente',
        },
        {
          name: 'Trending',
          link: '/noticias/trending',
        },
        {
          name: 'Detector de mentiras',
          link: '/noticias/detector-de-mentiras',
        },
        {
          name: 'Tu Ciudad',
          link: '/sitios-locales',
        },
      ],
    },
    {
      name: 'Deportes',
      link: '/',
      site: TUDN_SITE,
      contents: [
        {
          name: 'Liga MX',
          link: '/futbol/liga-mx',
          site: TUDN_SITE,
        },
        {
          name: 'Mundial Rusia 2018',
          link: '/mundial-rusia-2018',
          site: TUDN_SITE,
        },
        {
          name: 'Fútbol',
          link: '/futbol',
          site: TUDN_SITE,
        },
        {
          name: 'Ligas y torneos',
          link: '/futbol/ligas-y-torneos',
          site: TUDN_SITE,
        },
        {
          name: 'NBA',
          link: '/nba',
          site: TUDN_SITE,
        },
        {
          name: 'NFL',
          link: '/futbol-americano/national-football-league',
          site: TUDN_SITE,
        },
        {
          name: 'MLS',
          link: '/futbol/mls',
          site: TUDN_SITE,
        },
        {
          name: 'UDN Radio',
          link: '/univision-deportes-radio',
          site: TUDN_SITE,
        },
        {
          name: 'Boxeo',
          link: '/boxeo',
          site: TUDN_SITE,
        },
        {
          name: 'Fórmula 1',
          link: '/formula-1',
          site: TUDN_SITE,
        },
      ],
    },
  ],
};
