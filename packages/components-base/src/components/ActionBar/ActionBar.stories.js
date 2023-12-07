import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import {
  BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import {
  setUserState,
} from '@univision/fe-commons/dist/store/slices/user/user-slice';
import {
  setReactions,
} from '@univision/fe-commons/dist/store/slices/reactions/reactions-slice';

import initialState from './__mocks__/ActionBarMock';
import ActionBar from '.';

import Styles from './ActionBar.stories.styles';

const Card = styled.div`${Styles.testCard}`;
const CardFooter = styled.div`${Styles.footer}`;

const sharing = {
  facebook: {
    url: 'http://univision.com/test',
    title: 'The content title',
    imageUrl: 'http://loremflickr.com/320/240',
    isFeedDialog: true,
  },
  twitter: {
    url: 'http://univision.com/test',
    title: 'The content title',
    via: 'Univision',
  },
  mail: {
    url: 'http://univision.com/test',
    title: 'The content title',
    body: 'The content of the email',
    subject: 'The subject of the email',
  },
};
const store = configureStore();
store.dispatch(setReactions(initialState.reactions));
store.dispatch(setUserState(initialState.user));

/**
 * Mock click event handler
 * @param {string} name - click name event
 * @param {Object} e - cliect event javascript
 */
const click = (name, e) => {
  e.preventDefault();
  action('a link was clicked')(name);
};

/**
 * Dummy card wrapper component
 * @param {Object} newProps - react component props
 * @returns {JSX}
 */
const Wrapper = (newProps) => {
  return (
    <Card {...newProps}>
      <CardFooter>
        <Provider store={store}>
          <ActionBar
            {...newProps}
            sharingOptions={newProps.sharingOptions || sharing}
            onShareButtonClick={click}
          />
        </Provider>
      </CardFooter>
    </Card>
  );
};

storiesOf('Clickable/ActionBar/DarkMode', module)
  .add('With share arrow on large card', () => (
    <Wrapper
      style={{ width: 622, height: 522, background: BLACK }}
      device="mobile"
      cardSize="large"
      variant="dark"
    />
  ))
  .add('with share arrow on medium card', () => (
    <Wrapper
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
    />
  ))
  .add('with share arrow on small card', () => (
    <Wrapper
      style={{ width: 300, height: 300, background: BLACK }}
      device="mobile"
      cardSize="small"
      variant="dark"
    />
  ))
  .add('With share and favorite on large card', () => (
    <Wrapper
      style={{ width: 622, height: 522, background: BLACK }}
      device="mobile"
      hasFavorite
      cardSize="large"
      variant="dark"
    />
  ))
  .add('with share and favorite on medium card', () => (
    <Wrapper
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      hasFavorite
      cardSize="medium"
      variant="dark"
    />
  ))
  .add('with share and favorite on small card', () => (
    <Wrapper
      style={{ width: 300, height: 300, background: BLACK }}
      device="mobile"
      hasFavorite
      cardSize="small"
      variant="dark"
    />
  ))
  .add('with reactions tops three', () => (
    <Provider store={store}>
      <Wrapper
        contentId="00000171-a2a9-d200-a77b-f6ed1add0000"
        style={{ width: 376, height: 376, background: BLACK }}
        device="mobile"
        cardSize="medium"
        variant="dark"
      />
    </Provider>
  ))
  .add('with reactions tops two', () => (
    <Wrapper
      contentId="topTwo"
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
    />
  ))
  .add('with reactions tops one', () => (
    <Wrapper
      contentId="topOne"
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
    />
  ))
  .add('with empty list reaction', () => (
    <Wrapper
      contentId="noneReaction"
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
    />
  ))
  .add('with reactions TUDN', () => (
    <Wrapper
      contentId="reactionTUDN"
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
      type="Soccer"
    />
  ))
  .add('with reactions Portrait/Square', () => (
    <Wrapper
      contentId="00000171-a2a9-d200-a77b-f6ed1add0000"
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
    />
  ))
  .add('with reactions Landscape', () => (
    <Wrapper
      contentId="00000171-a2a9-d200-a77b-f6ed1add0000"
      style={{ width: 731, height: 522, background: BLACK }}
      cardSize="large"
      isLandscape
      variant="dark"
    />
  ));

storiesOf('Clickable/ActionBar/LightMode', module)
  .add('With share arrow on large card', () => (
    <Wrapper
      style={{ width: 622, height: 522 }}
      device="mobile"
      cardSize="large"
    />
  ))
  .add('with share arrow on medium card', () => (
    <Wrapper
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
    />
  ))
  .add('with share arrow on small card', () => (
    <Wrapper
      style={{ width: 300, height: 300 }}
      device="mobile"
      cardSize="small"
    />
  ))
  .add('With share and favorite on large card', () => (
    <Wrapper
      style={{ width: 622, height: 522 }}
      device="mobile"
      hasFavorite
      cardSize="large"
    />
  ))
  .add('with share and favorite on medium card', () => (
    <Wrapper
      style={{ width: 376, height: 376 }}
      device="mobile"
      hasFavorite
      cardSize="medium"
    />
  ))
  .add('with share and favorite on small card', () => (
    <Wrapper
      style={{ width: 300, height: 300 }}
      device="mobile"
      hasFavorite
      cardSize="small"
    />
  ))
  .add('with reactions tops three', () => (
    <Wrapper
      contentId="00000171-a2a9-d200-a77b-f6ed1add0000"
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
    />
  ))
  .add('with reactions tops two', () => (
    <Wrapper
      contentId="topTwo"
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
    />
  ))
  .add('with reactions tops one', () => (
    <Wrapper
      contentId="topOne"
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
    />
  ))
  .add('with empty list reaction', () => (
    <Wrapper
      contentId="noneReaction"
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
    />
  ))
  .add('with reactions TUDN', () => (
    <Wrapper
      contentId="reactionTUDN"
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
      type="Soccer"
    />
  ))
  .add('with reactions Portrait/Square', () => (
    <Wrapper
      contentId="00000171-a2a9-d200-a77b-f6ed1add0000"
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
    />
  ))
  .add('with reactions Landscape', () => (
    <Wrapper
      contentId="00000171-a2a9-d200-a77b-f6ed1add0000"
      style={{ width: 731, height: 522 }}
      cardSize="large"
      isLandscape
    />
  ));

storiesOf('Clickable/ActionBar/TUDN Enhancements/DarkMode', module)
  .add('With share arrow on large card', () => (
    <Wrapper
      style={{ width: 622, height: 522, background: BLACK }}
      device="mobile"
      cardSize="large"
      variant="dark"
      type="Soccer"
    />
  ))
  .add('with share arrow on medium card', () => (
    <Wrapper
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
      type="Soccer"
    />
  ))
  .add('with share arrow on small card', () => (
    <Wrapper
      style={{ width: 300, height: 300, background: BLACK }}
      device="mobile"
      cardSize="small"
      variant="dark"
      type="Soccer"
    />
  ))
  .add('With share and favorite on large card', () => (
    <Wrapper
      style={{ width: 622, height: 522, background: BLACK }}
      device="mobile"
      hasFavorite
      cardSize="large"
      variant="dark"
      type="Soccer"
    />
  ))
  .add('with share and favorite on medium card', () => (
    <Wrapper
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      hasFavorite
      cardSize="medium"
      variant="dark"
      type="Soccer"
    />
  ))
  .add('with share and favorite on small card', () => (
    <Wrapper
      style={{ width: 300, height: 300, background: BLACK }}
      device="mobile"
      hasFavorite
      cardSize="small"
      variant="dark"
      type="Soccer"
    />
  ))
  .add('with reactions TUDN, share favorite on large', () => (
    <Wrapper
      contentId="reactionTUDN"
      style={{ width: 622, height: 522, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
      type="Soccer"
    />
  ))
  .add('with reactions TUDN, share favorite on medium', () => (
    <Wrapper
      contentId="reactionTUDN"
      style={{ width: 376, height: 376, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
      type="Soccer"
    />
  ))
  .add('with reactions TUDN, share favorite on small', () => (
    <Wrapper
      style={{ width: 300, height: 300, background: BLACK }}
      device="mobile"
      cardSize="medium"
      variant="dark"
      type="Soccer"
    />
  ));

storiesOf('Clickable/ActionBar/TUDN Enhancements/LightMode', module)
  .add('With share arrow on large card', () => (
    <Wrapper
      style={{ width: 622, height: 522 }}
      device="mobile"
      cardSize="large"
      type="Soccer"
    />
  ))
  .add('with share arrow on medium card', () => (
    <Wrapper
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
      type="Soccer"
    />
  ))
  .add('with share arrow on small card', () => (
    <Wrapper
      style={{ width: 300, height: 300 }}
      device="mobile"
      cardSize="small"
      type="Soccer"
    />
  ))
  .add('With share and favorite on large card', () => (
    <Wrapper
      style={{ width: 622, height: 522 }}
      device="mobile"
      hasFavorite
      cardSize="large"
      type="Soccer"
    />
  ))
  .add('with share and favorite on medium card', () => (
    <Wrapper
      style={{ width: 376, height: 376 }}
      device="mobile"
      hasFavorite
      cardSize="medium"
      type="Soccer"
    />
  ))
  .add('with share and favorite on small card', () => (
    <Wrapper
      style={{ width: 300, height: 300 }}
      device="mobile"
      hasFavorite
      cardSize="small"
      type="Soccer"
    />
  ))
  .add('with reactions TUDN, share favorite on large', () => (
    <Wrapper
      contentId="00000171-a2a9-d200-a77b-f6ed1add0000"
      style={{ width: 622, height: 522 }}
      device="mobile"
      cardSize="medium"
      hasFavorite
      type="Soccer"
    />
  ))
  .add('with reactions TUDN, share favorite on medium', () => (
    <Wrapper
      contentId="00000171-a2a9-d200-a77b-f6ed1add0000"
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
      hasFavorite
      type="Soccer"
    />
  ))
  .add('with reactions TUDN, share favorite on small', () => (
    <Wrapper
      contentId="00000171-a2a9-d200-a77b-f6ed1add0000"
      style={{ width: 300, height: 300 }}
      device="mobile"
      cardSize="medium"
      hasFavorite
      type="Soccer"
    />
  ))
  .add('with no share arrow when sharing options not valid', () => (
    <Wrapper
      style={{ width: 376, height: 376 }}
      device="mobile"
      cardSize="medium"
      hasFavorite
      type="Soccer"
      sharingOptions={{}}
    />
  ));
