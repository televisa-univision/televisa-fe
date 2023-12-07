import React from 'react';

import { storiesOf } from '@storybook/react';

import Author from '.';

storiesOf('Text/Author', module)
  .add('with Full name', () => <Author fullName="Pedro Perez" />)
  .add('size: small', () => <Author size="small" fullName="Pedro Perez" />)
  .add('size: regular', () => <Author size="regular" fullName="Pedro Perez" />)
  .add('size: large', () => <Author size="large" fullName="Pedro Perez" />)
  .add('with Company', () => <Author company="Univision" />)
  .add('with Company and Link', () => <Author company="Univision" link="http://www.univision.com" />);
