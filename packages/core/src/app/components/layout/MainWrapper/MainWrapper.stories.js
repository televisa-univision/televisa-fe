import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { pageData } from '@univision/fe-commons/dist/config/storyMocks';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import MainWrapper from '.';

storiesOf('Layout/MainWrapper', module)
  .add(
    'with ad skin and interstitial',
    withInfo('Provide special ads support')(() => {
      const sectionData = Object.assign({}, pageData);
      sectionData.data.type = 'section';
      Store.dispatch(setPageData(sectionData));
      return (
        <MainWrapper state={Store.getState()}>
          <div style={{ margin: '0 auto', width: '500px', textAlign: 'center' }}>
            <p>Skin should load in wide screen or using full screen mode:</p>
            <p>⌘ ⇧ F/  ⌃ ⇧ F - Toggle Fullscreen Mode</p>
          </div>
        </MainWrapper>
      );
    })
  );
