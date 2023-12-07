import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import tudnTheme from '@univision/fe-commons/dist/themes/tudn';
import features from '@univision/fe-commons/dist/config/features';

import StickyCTA from '.';

/**
 * Clean all cookies just for test
 */
function deleteAllCookies() {
  features.widgets.stickyCTA.forEach((cta) => {
    const name = cta.cookieName;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  });
}

const store = configureStore({
  page: {
    config: {
      syndicator: {
        uri: 'https://syndicator.univision.com',
      },
    },
  },
});
const config = {
  active: true,
  text: 'Hacemos uso de cookies para garantizarte la mejor experiencia en nuestro sitio web.&nbsp;<a href="https://www.univision.com/global/privacy-policy-en" target="_blank">Conoce más</a>. Si continuas en este sitio web, estas de acuerdo.',
  cta: 'ENTENDIDO',
  theme: {
    alphaGradient: 'linear-gradient(to top, rgba(35, 88, 191, 0.95) 0%, rgba(35, 88, 191, 0) 50%)',
    horizontalGradient: 'linear-gradient(to right, #2358bf 0%, #23a2ee 100%)',
    primary: '#2358bf',
    secondary: '#23a2ee',
    solidGradient: 'linear-gradient(to bottom, #2358bf 0%, #23a2ee 100%)',
    theme: 'blue',
    variant: 'light',
  },
};

storiesOf('StickyCTA', module)
  .addDecorator((storyFn) => {
    deleteAllCookies();
    store.dispatch(setPageData({ isTudn: false }));
    return (
      <Provider store={store}>
        {storyFn()}
      </Provider>
    );
  })
  .add('Default', () => (
    <StickyCTA {...config} />
  ))
  .add('From features config', () => (
    <StickyCTA theme={config.theme} />
  ))
  .add('TUDN cta redirect', () => {
    store.dispatch(setPageData({
      config: { deploy: { env: 'test' } },
      requestParams: { countryCode: 'MX' },
      isTudn: true,
    }));
    return (
      <StickyCTA theme={tudnTheme()} />
    );
  });
