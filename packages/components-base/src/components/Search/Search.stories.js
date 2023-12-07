/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Styles from './Search.stories.scss';
import Search from '.';

const Wrapper = props => <div className={Styles.wrapper}><Search {...props} /></div>;

storiesOf('Widgets/Search', module)
  .add('Default', () => <Wrapper onClick={action} />)
  .add('Open', () => <Wrapper open onClick={action} />)
  .add('Custom placeholder', () => <Wrapper open onClick={action} placeholder="Type to search" />);
