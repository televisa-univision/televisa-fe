import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import radioPageMock from '../../../../__mocks__/uvnRadioPageData.json';
import SectionRadio from '.'; /* eslint-disable-line */

const store = configureStore();
const pageData = {
  data: radioPageMock.data,
  device: 'desktop',
  theme: {
    primary: '#D41D31',
    secondary: '#E63E10',
  },
};
storiesOf('Radio Section', module)
  .add('default', () => (
    <Provider store={store}>
      <SectionRadio pageData={pageData} />
    </Provider>
  ));
