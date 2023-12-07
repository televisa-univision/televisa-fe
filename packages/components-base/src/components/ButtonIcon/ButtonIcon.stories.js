import React from 'react';

import { storiesOf } from '@storybook/react';

import Styles from './ButtonIcon.stories.scss';
import ButtonIcon from '.';

storiesOf('Clickable/ButtonIcon', module)
  .add('with text and className', () => <ButtonIcon text="Hello World!" className={Styles.grey} />)
  .add('with text, className and icon', () => <ButtonIcon text="Escuchar" icon="playnocircle" className={Styles.grey} />);
