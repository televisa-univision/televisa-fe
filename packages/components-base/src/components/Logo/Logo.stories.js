import React from 'react';

import { storiesOf } from '@storybook/react';

import Styles from './Logo.stories.scss';
import Logo from '.';

const image = 'https://cdn2.performance.univision.com/dims4/default/5c0ea79/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fc1%2F79%2Fa93d1cc74c64b000a4b41f5300be%2Flos-angeles-107.5%402x.png';

storiesOf('Images/Logo', module)
  .add('without link', () => (
    <Logo src={image} className={Styles.logo} />
  ))
  .add('with link', () => (
    <Logo src={image} uri="http://univision.com" className={Styles.logo} />
  ));
