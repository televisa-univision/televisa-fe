import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import CompanyBio from '.';
import props from './__mocks__/CompanyMock.json';

const Store = configureStore();

storiesOf('Article/Ask the Expert/Company Bio', module)
  .add('default', () => {
    return (
      <Provider store={Store}>
        <CompanyBio {...props} />
      </Provider>
    );
  });
