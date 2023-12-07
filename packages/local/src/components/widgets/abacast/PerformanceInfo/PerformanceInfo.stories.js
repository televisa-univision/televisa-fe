/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import getTheme from '@univision/fe-commons/dist/utils/themes/themes';

import PerformanceInfo from './PerformanceInfo';

import Styles from './PerformanceInfo.styles.scss';

const url = 'http://univision.com/los-angeles/klve';

const props = {
  title: 'La Bomba',
  artist: 'Ricky Martin',
  abacastId: '2315',
  stationTitle: 'Los Angeles KLVE',
  theme: getTheme(url),
  device: 'mobile',
};

const Wrapper = p => <div className={Styles.wrapper}><PerformanceInfo {...p} /></div>;

storiesOf('Widgets/PerformanceInfo', module)
  .add('default', () => {
    return <Wrapper {...props} theme={getTheme()} />;
  })
  .add('with theme', () => {
    return <Wrapper {...props} theme={getTheme(url)} />;
  })
  .add('desktop launch', () => {
    return <Wrapper {...props} device="desktop" />;
  });
