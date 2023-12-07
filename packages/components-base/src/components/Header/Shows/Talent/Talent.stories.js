import React from 'react';
import { storiesOf } from '@storybook/react';

import Talent from '.';
import Styles from './Talent.stories.scss';
import data from './__data__/mock.json';

storiesOf('Layout/Header/Shows/Talent', module)
  .add('El gordo y la flaca', () => {
    return (
      <div className={Styles.wrapper}>
        <Talent {...data.gordoflaca} />
      </div>
    );
  })
  .add('Al punto', () => {
    return (
      <div className={Styles.wrapper}>
        <Talent {...data.alpunto} />
      </div>
    );
  })
  .add('Rosario Tijeras', () => {
    return (
      <div className={Styles.wrapper}>
        <Talent {...data.rosariotijeras} />
      </div>
    );
  });
