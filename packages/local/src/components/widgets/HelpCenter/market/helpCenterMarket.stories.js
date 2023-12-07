import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpCenterMarket from '.';

storiesOf('Widgets/HelpCenter', module)
  .add('default market', () => {
    return (
      <HelpCenterMarket />
    );
  });
