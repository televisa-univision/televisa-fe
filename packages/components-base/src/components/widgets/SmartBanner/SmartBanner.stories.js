import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';

import SmartBanner from '.';

const props = {
  icon: 'https://cdn3.uvnimg.com/44/7d/b5d814554256be8dd7ce636bdfa2/unow-logo2x.png',
  actionText: 'Free',
  ios: {
    id: '1049321283',
  },
  android: {
    id: 'com.univision.univisionnow',
    backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
    theme: themes.black,
  },
};

storiesOf('SmartBanner', module)
  .add(
    'smartbanner for iOS',
    withInfo('This show the banner theme for iOS')(() => (
      <div>
        <meta name="apple-itunes-app" content="app-id=com.univision.uforia" />
        <SmartBanner {...props} title="Univision NOW" overwritePlatform="ios" />
      </div>
    ))
  )
  .add(
    'smartbanner for Android',
    withInfo('This show the banner theme for Android')(() => (
      <div>
        <meta name="google-play-app" content="app-id=com.univision.uforia" title="Univision Deportes: Liga MX, MLS, Fútbol En Vivo" />
        <SmartBanner {...props} overwritePlatform="android" />
      </div>
    ))
  );
