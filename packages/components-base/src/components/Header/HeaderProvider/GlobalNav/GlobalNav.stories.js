import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Store from '@univision/fe-commons/dist/store/store';

import Styles from '../GlobalHeaders.stories.scss';

import GlobalNav from '.';

const props = {
  toggleSectionMenu: action('toggleSectionMenu'),
  activePath: '/entretenimiento',
  toggleSearch: action('toggleSearch'),
  searchOpen: false,
};

/**
 * Make a GlobalNav component
 * @param {Object} extraProps - additional props
 * @returns {JSX}
 */
const makeGlobalNav = (extraProps) => {
  return (
    <Provider store={Store}>
      <GlobalNav {...props} {...extraProps} />
    </Provider>
  );
};

storiesOf('Layout/GlobalNav', module)
  .add('default', () => (
    <div className={Styles.wrapper}>
      {makeGlobalNav()}
    </div>
  ))
  .add('default dark mode', () => (
    <div className={Styles.wrapper}>
      {makeGlobalNav({ variant: 'dark' })}
    </div>
  ))
  .add('search open', () => (
    <div className={Styles.wrapper}>
      {makeGlobalNav({ searchOpen: true })}
    </div>
  ));
