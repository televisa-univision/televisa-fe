import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';

import AskExpertBody from '.';
import props from './__mocks__/AskExpertBody.mock';

storiesOf('Article/Ask the Expert/Ask Expert Body', module)
  .add('default', () => (
    <Provider store={Store}>
      <div className="col-sm-12 col-md-10 col-lg-8">
        <AskExpertBody {...props} />
      </div>
    </Provider>
  ));
