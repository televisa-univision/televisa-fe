import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';

import mockData from './_mockData_/mock_data.json';
import AskTheExpertQA from './AskExpertQA';

storiesOf('Enhancement/AskTheExpert QA', module)
  .add('Default',
    () => (
      <Provider store={Store}>
        <AskTheExpertQA {...mockData} />
      </Provider>
    ));
