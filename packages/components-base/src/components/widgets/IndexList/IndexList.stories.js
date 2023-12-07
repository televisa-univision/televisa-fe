import React from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';

import props from './__mocks__/indexList.json';
import IndexList from '.';

storiesOf('Widgets/Redesign 2021/IndexWidget', module)
  .addDecorator(withViewport('Default'))
  .add('mobile', () => {
    return (
      <IndexList {...props} device="mobile" />
    );
  }, { viewport: 'iphonex' })
  .add('tablet', () => {
    return (
      <IndexList {...props} device="tablet" />
    );
  }, { viewport: 'ipad' })
  .add('desktop', () => {
    return (
      <IndexList {...props} device="desktop" />
    );
  });
