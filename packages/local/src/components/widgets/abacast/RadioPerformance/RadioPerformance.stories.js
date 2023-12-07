/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import getTheme from '@univision/fe-commons/dist/utils/themes/themes';

import RadioPerformance from './RadioPerformance';

const url = 'http://univision.com/los-angeles/klve';
const largeimage = 'http://cdn.newsapi.com.au/image/v1/68d72be74a97bf895fa80dbe2df773c2';
const props = {
  performance: {
    id: '223',
    title: 'La Bomba',
    artist: 'Ricky Martin',
  },
  abacastId: '2315',
  stationTitle: 'Los Angeles KLVE',
  theme: getTheme(url),
  device: 'mobile',
};

storiesOf('Widgets/AbacastPerformance', module)
  .add('default', () => {
    props.performance.largeimage = largeimage;
    return <RadioPerformance {...props} />;
  })
  .add('no image', () => {
    props.performance.largeimage = null;
    return <RadioPerformance {...props} />;
  })
  .add('desktop launch', () => {
    props.performance.largeimage = largeimage;
    return <RadioPerformance {...props} device="desktop" />;
  });
