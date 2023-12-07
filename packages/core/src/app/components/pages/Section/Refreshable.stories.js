import React from 'react';

import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import Refreshable from './Refreshable';

storiesOf('Utils/Refreshable', module)
  .add('with refresh button visible', () => (
    <Provider store={Store}>
      <Refreshable displayRefreshButton widgets={[<div>Widget A</div>, <div>Widget B</div>]} />
    </Provider>
  ));
