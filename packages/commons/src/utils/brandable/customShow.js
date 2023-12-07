import * as pageCategories from '../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import deportes from '../../config/features/deportes';

// eslint-disable-next-line require-jsdoc
const CustomShow = () => ({
  [pageCategories.NOTICIERO_EDICION_DIGITAL]: {
    brandable: {
      uri: '/noticias/edicion-digital',
      show: {
        uri: '/noticias/edicion-digital',
        airTimeText: 'Lunes a Viernes, 12PM/11AMC',
        showType: 'show',
        headerLogo: {
          original: {
            href: 'https://cdn1.uvnimg.com/95/3d/1dfde02d43e28423822622c2462b/logo-edicion-digital-header-show-180px56.svg',
          },
        },
        socialNetworks: {
          facebookUrl: {
            target: '_blank',
            url: 'https://www.facebook.com/univisionnoticias',
          },
          twitterUrl: {
            target: '_blank',
            url: 'https://twitter.com/UniNoticias',
          },
          instagramUrl: {
            target: '_blank',
            url: 'http://www.instagram.com/uninoticias/?hl=en',
          },
        },
      },
    },
  },
  [pageCategories.BODAS]: {
    brandable: {
      uri: '/estilo-de-vida/bodas/boda-real-principe-harry-meghan-markle-19-de-mayo-en-windsor-reino-unido',
      show: {
        uri: '/estilo-de-vida/bodas/boda-real-principe-harry-meghan-markle-19-de-mayo-en-windsor-reino-unido',
        showType: 'show',
        headerLogo: {
          original: {
            href: 'https://cdn1.uvnimg.com/40/e6/cbeebf6b4fa2b2c1c6eb760b4703/bodasvg.svg',
          },
        },
      },
    },
  },
  [pageCategories.GALAVISION]: {
    brandable: {
      title: 'Galavisión',
      uri: '/networks/galavision',
      show: {
        uri: '/networks/galavision',
        showType: 'show',
        headerLogo: {
          original: {
            href: 'https://st1.uvnimg.com/4d/51/30f8e82549a5bcad737f67ad64c9/galavision-logo.png',
          },
        },
        socialNetworks: {
          facebookUrl: {
            target: '_blank',
            url: 'https://www.facebook.com/Galavision',
          },
          twitterUrl: {
            target: '_blank',
            url: 'https://www.twitter.com/Galavision',
          },
          instagramUrl: {
            target: '_blank',
            url: 'https://www.instagram.com/galavision',
          },
        },
      },
    },
  },
  [pageCategories.UNIMAS]: {
    brandable: {
      title: 'UniMás',
      uri: '/unimas',
      show: {
        uri: '/unimas',
        showType: 'show',
        headerLogo: {
          original: {
            href: 'https://cdn2.uvnimg.com/fd/81/006907864b748ce8504165cbd300/lg-unimas.svg',
          },
        },
        socialNetworks: {
          facebookUrl: {
            target: '_blank',
            url: 'https://www.facebook.com/UniMas',
          },
          twitterUrl: {
            target: '_blank',
            url: 'https://twitter.com/unimas',
          },
          instagramUrl: {
            target: '_blank',
            url: 'https://www.instagram.com/unimas/',
          },
          youTubeUrl: {
            target: '_blank',
            url: 'https://www.youtube.com/user/UnimasOficial',
          },
        },
      },
    },
  },
  [pageCategories.ELECCIONES_MEXICO_2018]: {
    brandable: {
      uri: '/noticias/elecciones-mexico-2018',
      show: {
        uri: '/noticias/elecciones-mexico-2018',
        airTimeText: '',
        showType: 'show',
        headerLogo: {
          original: {
            href: 'https://cdn2.uvnimg.com/c1/d5/81836e3c4ce7a87df82a88c3c197/elecciones-mexico2018-logo.svg',
          },
        },
      },
    },
  },
  [pageCategories.ENTREVISTAS]: {
    brandable: {
      uri: '/deportes/entrevistas',
      show: {
        uri: '/deportes/entrevistas',
        airTimeText: '',
        showType: 'show',
        headerLogo: {
          original: {
            href: deportes.isTudn() ? 'https://st1.uvnimg.com/f7/d6/9f2a114c4e25af9b308a9f1ad1a0/lg-entrevistas-desktop.svg'
              : 'https://cdn2.uvnimg.com/b6/21/e3b6b2c7409c841726827c45b9eb/logo-180x56.svg',
          },
        },
      },
    },
  },
  [pageCategories.VIDEOS_VIRALES]: {
    brandable: {
      uri: '/deportes/videos-virales',
      show: {
        uri: '/deportes/videos-virales',
        airTimeText: '',
        showType: 'show',
        headerLogo: {
          original: {
            href: deportes.isTudn() ? 'https://st1.uvnimg.com/a6/84/fa5613f6488ba5378199fccab3c0/lg-virales.svg'
              : 'https://cdn4.uvnimg.com/fd/f6/a849ca644cfc8c7b8b99033d8e09/virales-logo.svg',
          },
        },
      },
    },
  },
  [pageCategories.OPINION]: {
    brandable: {
      uri: '/deportes/opinion-deportes',
      show: {
        uri: '/deportes/opinion-deportes',
        airTimeText: '',
        showType: 'show',
        headerLogo: {
          original: {
            href: deportes.isTudn() ? 'https://st1.uvnimg.com/99/42/0e6da0b549fda09ea3ff40581d78/lg-opinion.svg'
              : 'https://cdn3.uvnimg.com/ee/90/c77bf65d49e289807b04d465e4cb/logo-opinion.svg',
          },
        },
      },
    },
  },
  [pageCategories.TURNO7]: {
    brandable: {
      uri: '/musica/turno7',
      show: {
        uri: '/musica/turno7',
        showType: 'show',
        headerLogo: {
          original: {
            href: 'https://cdn2.uvnimg.com/e3/d8/9b234ea642368211a08acaa2d0d3/lg-jackdaniels-new.svg',
          },
        },
      },
    },
  },
  [pageCategories.AUTOS]: {
    brandable: {
      uri: '/carros',
      show: {
        uri: '/carros',
        airTimeText: '',
        showType: 'show',
        headerLogo: {
          original: {
            href: 'https://cdn3.uvnimg.com/49/11/4ebe5fcb4dd3a61c985b0553ec25/abordo-logo.svg',
          },
        },
      },
    },
  },
});

export default CustomShow;
