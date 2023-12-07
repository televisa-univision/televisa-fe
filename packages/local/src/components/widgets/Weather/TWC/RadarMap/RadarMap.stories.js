import React from 'react';
import { storiesOf } from '@storybook/react';

import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';

import RadarMap from '.';

const device = getDevice();

storiesOf('Widgets/Weather/TWC', module)
  .add('Radar with title', () => {
    Store.dispatch(setPageData({ device }));
    return <RadarMap settings={{ title: 'Radar' }} />;
  })
  .add('Radar with no title', () => {
    Store.dispatch(setPageData({ device }));
    return <RadarMap />;
  });
