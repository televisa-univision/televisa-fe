import React from 'react';

import { storiesOf } from '@storybook/react';

import CalReply from '.';
import pageData from './mockData.json';

const { code, href } = pageData.data.externalWidgets.calReply;

storiesOf('CalReply', module)
  .add('default', () => <CalReply code={code} href={href} />);
