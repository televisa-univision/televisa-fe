import React from 'react';
import { storiesOf } from '@storybook/react';

import Breadcrumb from '.';
import Styles from './Breadcrumb.stories.scss';
import data from './__data__/mock.json';

storiesOf('Layout/Header/Shows/Breadcrumb', module)
  .add('Dark variant', () => {
    return (
      <div className={Styles.wrapper}>
        <Breadcrumb variant="dark" links={data} />
      </div>
    );
  })
  .add('Light variant', () => {
    return (
      <div className={Styles.wrapper}>
        <Breadcrumb variant="light" links={data} />
      </div>
    );
  });
