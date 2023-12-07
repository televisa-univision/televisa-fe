import React from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';

import StyledDropdown from '.';
import mockDataRegular from './__mocks__/regular.json';
import mockDataLarge from './__mocks__/large.json';

storiesOf('StyledDropdown', module)
  .addDecorator(withViewport('iphone8p'))
  .add('light - regular', () => <StyledDropdown {...mockDataRegular} />)
  .add('dark - regular', () => <StyledDropdown {...mockDataRegular} isDark />)
  .add('light - many items', () => <StyledDropdown {...mockDataLarge} />)
  .add('dark - many items', () => <StyledDropdown {...mockDataLarge} isDark />);
