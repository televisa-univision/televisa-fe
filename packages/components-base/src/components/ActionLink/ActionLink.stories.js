import React from 'react';

import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Icon from '@univision/fe-icons/dist/components/Icon';
import ActionLink from '.';
import Styles from './ActionLink.scss';

storiesOf('Clickable/ActionLink', module)
  .add('default', () => (
    <ActionLink href="http://www.univision.com">
      Default
    </ActionLink>
  ))
  .add('with href/theme/ClassName', () => (
    <ActionLink
      href="http://www.univision.com"
      theme={{ primary: 'red', secondary: 'pink', direction: 'bottom' }}
      className={Styles.story}
    >
        Hello World!
    </ActionLink>
  ))
  .add('with onClick function with themes.json', () => (
    <ActionLink onClick={(e) => { action()('Onclick function'); e.preventDefault(); }} theme={{ ...themes.purple }}>
      <Icon name="playnocircle" fill="#ffffff" /> Watch video
    </ActionLink>
  ));
