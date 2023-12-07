/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import UserBadge from '.';

const stylesNormal = {
  height: 24, width: 100,
};
const Wrapper = ({ children, styles }) => {
  // eslint-disable-next-line react/prop-types
  return (
    <Provider store={Store}>
      <div style={styles}>
        {children}
      </div>
    </Provider>
  );
};

storiesOf('UserBadge/LightVersion', module)
  .add('Default', () => (
    <Wrapper styles={stylesNormal}>
      <UserBadge />
    </Wrapper>
  ))
  .add('User is logged in', () => (
    <Wrapper styles={stylesNormal}>
      <UserBadge isLoggedIn userName="manuela" />
    </Wrapper>
  ));

storiesOf('UserBadge/DarkVersion', module)
  .add('Default', () => (
    <Wrapper styles={{ ...stylesNormal, backgroundColor: 'black' }}>
      <UserBadge isDark />
    </Wrapper>
  ))
  .add('User is logged in', () => (
    <Wrapper styles={{ ...stylesNormal, backgroundColor: 'black' }}>
      <UserBadge isLoggedIn isDark userName="manuela" />
    </Wrapper>
  ));
