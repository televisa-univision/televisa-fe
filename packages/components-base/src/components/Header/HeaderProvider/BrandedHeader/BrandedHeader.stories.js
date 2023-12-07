import React from 'react';

import logo from '@univision/fe-commons/dist/assets/images/logo-entretenimiento-color-v.svg';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import { action } from '@storybook/addon-actions';

import { storiesOf } from '@storybook/react';

import Styles from '../GlobalHeaders.stories.scss';

import BrandedHeader from '.';

const props = {
  logoUrl: '/entretenimiento',
  logoDesktop: logo,
  logoMobile: logo,
  toggleSectionMenu: action('toggleSectionMenu'),
  toggleSearch: action('toggleSearch'),
};

storiesOf('Layout/BrandedHeader', module)
  .add('default', () => (
    <div className={Styles.wrapper}>
      <BKPIndicator />
      <BrandedHeader {...props} />
    </div>
  ))
  .add('search open', () => (
    <div className={Styles.wrapper}>
      <BKPIndicator />
      <BrandedHeader {...props} isSearchOpen />
    </div>
  ));
