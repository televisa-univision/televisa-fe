import React from 'react';

import { storiesOf } from '@storybook/react';
import LiveIcon from '.';
import Styles from './LiveIcon.stories.scss';

storiesOf('Widgets/LiveIcon', module)
  .add('default', () => <div className={Styles.content}><LiveIcon /></div>)
  .add('without blink', () => <div className={Styles.content}><LiveIcon blink={false} /></div>)
  .add('with className', () => <div className={Styles.content}><LiveIcon className={Styles.green} /></div>)
  .add('with diferent color', () => <div className={Styles.content}><LiveIcon fill="#ff0000" /></div>)
  .add('with diferent size', () => <div className={Styles.content}><LiveIcon size="large" /></div>)
  .add('with icons package', () => <div className={Styles.content}><LiveIcon name="key" /></div>);
