import React from 'react';

import { storiesOf } from '@storybook/react';

import Styles from './Caption.stories.scss';
import Caption from '.';

storiesOf('Enhancement/Caption', module)
  .add('with credit and content', () => (
    <Caption credit="by univision" content="Image from park" />))
  .add('with credit, content and slideshowVertical type', () => (
    <Caption type="slideshowVertical" credit="by univision" content="Image from park" />))
  .add('with credit, content and className', () => (
    <Caption credit="by univision" content="Image from park" className={Styles.grey} />));
