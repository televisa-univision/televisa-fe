/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import radioTheme from '@univision/fe-commons/dist/themes/radio';
import univisionTheme from '@univision/fe-commons/dist/themes/univision';
import StationLaunch from './StationLaunch';

import Styles from './StationLaunch.stories.scss';

const theme = radioTheme();

storiesOf('Widgets/StationLaunch', module)
  .add('default theme', () => (
    <ApiProvider
      url="http://univision.com/los-angeles/klve"
      render={api => (
        <div className={Styles.wrapper}>
          <StationLaunch abacastId={api.sourceStation.abacast.id} theme={univisionTheme()} />
        </div>
      )}
    />
  ))
  .add('custom theme', () => (
    <ApiProvider
      url="http://univision.com/los-angeles/klve"
      render={api => (
        <div className={Styles.wrapper}>
          <StationLaunch abacastId={api.sourceStation.abacast.id} theme={theme} />
        </div>
      )}
    />
  ));
