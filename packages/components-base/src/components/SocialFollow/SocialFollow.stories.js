import React from 'react';

import { storiesOf } from '@storybook/react';

import SocialFollow from '.';

const props = {
  title: 'Social Follow',
  subtitle: 'Síguenos en nuestras redes sociales',
  theme: {
    primary: '#000',
  },
  socialNetworks: [
    {
      name: 'INSTAGRAM',
      href: 'https://instagram.com',
    },
    {
      name: 'FACEBOOK',
      href: 'https://facebook.com',
    },
    {
      name: 'TWITTER',
      href: 'https://twitter.com',
    },
  ],
};

const noticiasProps = {
  ...props,
  title: 'Noticias',
  theme: {
    primary: '#2358BF',
  },
};

const deportesProps = {
  ...props,
  title: 'Deportes',
  theme: {
    primary: '#00A899',
  },
};

const oneSocialProps = {
  ...props,
  socialNetworks: [
    {
      name: 'facebook',
      href: '#',
    },
  ],
};

const twoSocialProps = {
  ...props,
  socialNetworks: [
    {
      name: 'facebook',
      href: '#',
    },
    {
      name: 'twitter',
      href: '#',
    },
  ],
};

const customSubProps = {
  ...props,
  subtitle: 'Follow us here:',
};

const customHeadProps = {
  ...props,
  title: 'Custom headline',
};

storiesOf('Widgets/SocialFollow', module)
  .add('Default', () => <SocialFollow {...props} />)
  .add('Custom title', () => <SocialFollow {...customHeadProps} />)
  .add('Custom sub title', () => <SocialFollow {...customSubProps} />)
  .add('Noticias theming', () => <SocialFollow {...noticiasProps} />)
  .add('Deportes theming', () => <SocialFollow {...deportesProps} />)
  .add('/w One Social Network', () => <SocialFollow {...oneSocialProps} />)
  .add('/w Two Social Networks', () => <SocialFollow {...twoSocialProps} />);
