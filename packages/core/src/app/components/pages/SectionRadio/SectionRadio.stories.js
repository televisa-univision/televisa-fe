/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';
import radioTheme from '@univision/fe-commons/dist/themes/radio';

import SectionRadio from './SectionRadio';

const url = 'http://univision.com/los-angeles/klve';

Store.dispatch(setPageData({
  device: 'mobile',
  requestParams: { mode: 'test' },
  theme: radioTheme(),
}));

storiesOf('Layout/SectionRadio', module)
  .add('content page', () => (
    <ApiProvider
      url={url}
      store={Store}
      render={() => {
        return (
          <div className="app-container">
            <SectionRadio widgets={[<div key="1">Im a widget!</div>]} store={Store} />
          </div>
        );
      }}
    />
  ));
