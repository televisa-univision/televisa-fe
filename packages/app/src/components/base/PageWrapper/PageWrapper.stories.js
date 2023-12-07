import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import mockPageData from '../../../../__mocks__/tudnPageData.json';
import PageWrapper from '.';

storiesOf('Layout/PageWrapper', module)
  .addDecorator(withInfo)
  .add('with ad skin and interstitial', () => {
    const sectionData = { ...mockPageData };
    return (
      <Provider store={configureStore()}>
        <PageWrapper pageData={sectionData}>
          <div style={{ margin: '0 auto', width: '500px', textAlign: 'center' }}>
            <p>Skin should load in wide screen or using full screen mode:</p>
            <p>⌘ ⇧ F/  ⌃ ⇧ F - Toggle Fullscreen Mode</p>
          </div>
        </PageWrapper>
      </Provider>
    );
  }, {
    info: {
      text: 'with ad skin and interstitial',
    },
  });
