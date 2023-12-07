/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SlideArrow from '.';

/*
direction,
disabled,
offset,
onClick,
theme,
className,
autoHide,
afterClick,
modifierClass,
 */
storiesOf('Slidable/SlideArrow', module)
  .add('default ', () => (
    <div>
      <SlideArrow direction="prev" />
      <SlideArrow direction="next" />
    </div>
  ))
  .add('light theme ', () => (
    <div>
      <SlideArrow direction="prev" theme="light" />
      <SlideArrow direction="next" theme="light" />
    </div>
  ))
  .add('with onClick ', () => (
    <div>
      <SlideArrow direction="prev" theme="light" onClick={action('previous')} />
      <SlideArrow direction="next" theme="light" onClick={action('next')} />
    </div>
  ))
  .add('disabled/hidden', () => (
    <div>
      <SlideArrow disabled direction="prev" />
      <SlideArrow disabled direction="next" />
    </div>
  ));
