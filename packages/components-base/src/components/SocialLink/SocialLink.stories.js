import React from 'react';

import { storiesOf } from '@storybook/react';

import SocialLink from '.';

storiesOf('Clickable/SocialLink', module)
  .add('Facebook', () => <SocialLink link={{ url: '#' }} type="facebook" />)
  .add('Twitter', () => <SocialLink link={{ url: '#' }} type="twitter" />)
  .add('Instagram', () => <SocialLink link={{ url: '#' }} type="instagram" />)
  .add('Snapchat', () => <SocialLink link={{ url: '#' }} type="snapchat" />);
