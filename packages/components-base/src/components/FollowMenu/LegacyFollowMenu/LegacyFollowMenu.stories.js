import React from 'react';

import { storiesOf } from '@storybook/react';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';

import Styles from './LegacyFollowMenu.stories.scss';
import LegacyFollowMenu from '.';

const props = {
  networks: [{
    name: 'facebookLegacy',
    href: '#',
  }],
  contact: {
    aboutStation: '#',
    phoneNumber: '555.555.5555',
  },
};

storiesOf('Widgets/LegacyFollowMenu', module)
  .add('with className, networks and contact', () => {
    localization.setLanguage(languages.ES);
    return (
      <div>
        <p>Resize window to see mobile behavior</p>
        <LegacyFollowMenu showContact className={Styles.box} {...props} />
      </div>
    );
  });
