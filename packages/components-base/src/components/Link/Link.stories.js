import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RouterContext from '@univision/fe-commons/dist/components/RouterContext';
import createHistory from '@univision/fe-commons/dist/utils/helpers/history';

import Styles from './Link.stories.scss';
import Link from '.'; /* eslint-disable-line */

const history = createHistory();

history.push = action('history.push');

storiesOf('Clickable/Link', module)
  .add('with href and className', () => (
    <Link
      href="http://www.univision.com"
      className={Styles.green}
    >
      Hello World!
    </Link>
  ))
  .add('with onClick function', () => (
    <Link
      href="http://www.univision.com"
      onClick={() => { action('Onclick function'); return false; }}
    >
      Hello World!
    </Link>
  ))
  .addDecorator(story => (
    <RouterContext.Provider value={{ history }}>
      {story()}
    </RouterContext.Provider>
  ))
  .add('with browser history API (SPA Mode)', () => (
    <Link
      href="/test/page"
    >
      Hello World!
    </Link>
  ));
