const mockList = {
  type: 'month-page',
  site: 'univision',
  contents: [
    {
      title: 'Takeesha White Talks Mental Hygiene, Racism And Mental Health Issues + More',
      url: 'https://performance.univision.com/radio/san-antonio-kbbt-fm/takeesha-white-talks-mental-hygiene-racism-and-mental-health-issues-more',
    },
    {
      title: 'Lo liberan de la cárcel y tres días después mata a su esposa embarazada a puñaladas',
      url: 'https://performance.univision.com/local/houston-kxln/lo-liberan-de-la-carcel-y-tres-dias-despues-mata-a-su-esposa-embarazada-a-punaladas',
    },
    {
      title: 'La libertad educacional es elemental para el futuro de nuestros hijos',
      url: 'https://performance.univision.com/noticias/opinion/la-libertad-educacional-es-elemental-para-el-futuro-de-nuestros-hijos',
    },
    {
      title: 'Sospechoso confiesa haber matado a niña de 5 años reportada como desaparecida en Carolina del Sur',
      url: 'https://performance.univision.com/local/north-carolina-wuvc/sospechoso-confiesa-haber-matado-a-nina-de-5-anos-reportada-como-desaparecida-en-carolina-del-sur',
    },
    {
      title: 'Zorro con rabia entra a la casa de una mujer en el condado de Travis y la muerde ',
      url: 'https://performance.univision.com/local/austin-kakw/zorro-con-rabia-entra-a-la-casa-de-una-mujer-en-el-condado-de-travis-y-la-muerde',
    },
    {
      title: 'Escorpión – Números de la suerte 8 de agosto de 2019.',
      url: 'https://performance.univision.com/horoscopos/escorpion/escorpion-numeros-de-la-suerte-8-de-agosto-de-2019',
    },
    {
      title: 'La feria estatal de Texas ofrece una segunda oportunidad a personas con antecedentes penales',
      url: 'https://performance.univision.com/local/dallas-kuvn/la-feria-estatal-de-texas-ofrece-una-segunda-oportunidad-a-personas-con-antecedentes-penales',
    },
    {
      title: 'Fallece madre un mes después de que su hija muriera en un incendio provocado en Queens',
      url: 'https://performance.univision.com/local/nueva-york-wxtv/fallece-madre-un-mes-despues-de-que-su-hija-muriera-en-un-incendio-provocado-en-queens',
    },
    {
      title: 'Ordenan requerimiento de información para garantizar la seguridad de los usuarios de Uber en Puerto Rico',
      url: 'https://performance.univision.com/local/puerto-rico-wlii/ordenan-requerimiento-de-informacion-para-garantizar-la-seguridad-de-los-usuarios-de-uber',
    },
    {
      title: 'Los dirigentes de la Luz del Mundo tienen un rancho en Texas valorado en $4.1 millones, con zoológico y lago artificial',
      url: 'https://performance.univision.com/noticias/justicia/los-dirigentes-de-la-luz-del-mundo-tienen-un-rancho-en-texas-valorado-en-4-1-millones-con-zoologico-y-lago-artificial',
    },
    {
      title: 'Lo que debes saber hoy, miércoles 7 de agosto',
      url: 'https://performance.univision.com/local/dallas-kuvn/lo-que-debes-saber-hoy-miercoles-7-de-agosto',
    },
    {
      title: 'Tras 15 años, sale de la cárcel Cyntoia Brown, víctima de tráfico sexual que mató a un hombre que pagó para tener sexo con ella ',
      url: 'https://performance.univision.com/noticias/estados-unidos/tras-media-vida-en-prision-liberan-a-cyntoia-brown-victima-de-trata-que-a-sus-16-anos-mato-a-un-hombre-que-pago-por-sexo-con-ella',
    },
    {
      title: 'Demandan la política nacional de deportaciones aceleradas de Donald Trump',
      url: 'https://performance.univision.com/noticias/inmigracion/demandan-la-politica-nacional-de-deportaciones-aceleradas-de-donald-trump',
    },
    {
      title: 'Cáncer – Jueves 8 de agosto de 2019: te envuelve la pasión',
      url: 'https://performance.univision.com/horoscopos/cancer/cancer-jueves-8-de-agosto-de-2019-te-envuelve-la-pasion',
    },
    {
      title: 'Carlos Calderón ansía que el "burrito biónico" acelere su regreso a Despierta América',
      url: 'https://performance.univision.com/shows/despierta-america/carlos-calderon-ansia-que-el-burrito-bionico-acelere-su-regreso-a-despierta-america',
    },
    {
      title: 'Libra – Jueves 8 de agosto de 2019: buenas noticias en tu sector económico',
      url: 'https://performance.univision.com/horoscopos/libra/libra-jueves-8-de-agosto-de-2019-buenas-noticias-en-tu-sector-economico',
    },
    {
      title: 'Lo que debes saber hoy, martes 6 de agosto',
      url: 'https://performance.univision.com/local/dallas-kuvn/lo-que-debes-saber-hoy-martes-6-de-agosto',
    },
    {
      title: 'Arrestan a un hombre por amenazar con disparar en un Walmart donde trabaja su madre',
      url: 'https://performance.univision.com/local/miami-wltv/arrestan-a-hombre-por-amenazar-con-disparar-en-un-walmart-de-florida-donde-trabaja-su-madre',
    },
    {
      title: 'Cáncer – Miércoles 7 de agosto de 2019: dejarás atrás el pesimismo',
      url: 'https://performance.univision.com/horoscopos/cancer/cancer-miercoles-7-de-agosto-de-2019-dejaras-atras-el-pesimismo',
    },
    {
      title: 'Leo – Miércoles 7 de agosto de 2019: una explicación que no esperabas',
      url: 'https://performance.univision.com/horoscopos/leo/leo-miercoles-7-de-agosto-de-2019-una-explicacion-que-no-esperabas',
    },
    {
      title: 'Libra – Miércoles 7 de agosto de 2019: un cambio sin precedentes',
      url: 'https://performance.univision.com/horoscopos/libra/libra-miercoles-7-de-agosto-de-2019-un-cambio-sin-precedentes',
    },
    {
      title: 'Escorpión – Miércoles 7 de agosto de 2019: Luna en tu signo, se afina tu capacidad síquica',
      url: 'https://performance.univision.com/horoscopos/escorpion/escorpion-miercoles-7-de-agosto-de-2019-luna-en-tu-signo-se-afina-tu-capacidad-siquica',
    },
    {
      title: 'El Empire State se ilumina de naranja para crear conciencia sobre la violencia armada ',
      url: 'https://performance.univision.com/local/nueva-york-wxtv/el-empire-state-se-ilumina-de-naranja-para-crear-conciencia-sobre-la-violencia-armada',
    },
    {
      title: 'Presentan cargos a trabajadores de la guardería de la niña de 4 años encontrada sola en Brooklyn',
      url: 'https://performance.univision.com/local/nueva-york-wxtv/presentan-cargos-a-trabajadores-de-la-guarderia-donde-debia-ir-la-nina-de-4-anos-encontrada-sola-en-un-parque-de-brooklyn',
    },
    {
      title: 'Sea precavido: lo que publique en redes sociales puede ocasionarle problemas con la policía de Miami-Dade ',
      url: 'https://performance.univision.com/local/miami-wltv/sea-precavido-lo-que-publique-en-redes-sociales-puede-ocasionarle-problemas-con-la-policia-de-miami-dade',
    },

  ],
};

export default Object.freeze(mockList);
