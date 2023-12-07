import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import SectionsButton from '.';

storiesOf('Layout/GlobalHeaders - SectionsButton', module)
  .add('default', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    return <SectionsButton onClick={action('Click')} />;
  })
  .add('custom label', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    return <SectionsButton label="OMG OPEN ME" onClick={action('Click')} />;
  });
