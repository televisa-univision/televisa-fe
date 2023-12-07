export const SEX_ASSAULT_URL = 'que-hacer-despues-de-una-agresion-sexual';
export default {
  // Sets whether the sticky banner (eg: GDPR) should be shown
  stickyCTA: [{
    active: () => false,
    onClick: () => window.location.replace('https://www.tudn.mx'),
    priority: 1,
    allowClose: true,
    countryCodes: ['MX'],
    cta: 'IR A TUDN.MX',
    text: '<b>Algunos contenidos no están disponibles en tu área. Visita TUDN.MX para una mejor experiencia.<b>',
    trackingId: 'banner_tudn_mx',
  },
  {
    active: page => !!page?.uri?.includes(SEX_ASSAULT_URL),
    onClick: () => window.location.replace('https://www.univision.com/local/nueva-york-wxtv'),
    listener: {
      type: 'keyup',
      callBack: (event) => {
        if (event.keyCode === 27) {
          window.location.replace('https://www.univision.com/local/nueva-york-wxtv');
        }
      },
    },
    priority: 2,
    allowClose: true,
    cta: 'SALIR',
    text: '<b>SALIR DEL SITIO <br>Haga clic para salir del sitio o presione la tecla - esta página redirigirá a Univision Nueva York y se eliminará la entrada del historial de navegación.<b>',
    trackingId: '',
    backgroundColor: '#D24719',
  }],
  // Determines whether the title and descriptions of widgets
  // will be truncated to their config default limits
  truncateText: false,
  listWidget: {
    contentLimit: () => 6,
  },
  isVixEnabled: () => true,
};
