import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';

import CompanyBio from '.';
import props from './CompanyBio.mock';

storiesOf('Article/Ask the Expert/Company Bio', module)
  .add('default', () => {
    return (
      <Provider store={Store}>
        <CompanyBio {...props} />
      </Provider>
    );
  });
