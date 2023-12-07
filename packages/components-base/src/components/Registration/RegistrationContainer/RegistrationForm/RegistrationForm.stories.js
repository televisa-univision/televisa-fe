import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { setThemeData } from '@univision/fe-commons/dist/store/actions/page-actions';
import tudn from '@univision/fe-commons/dist/themes/tudn';

import RegistrationForm from '.';

const store = configureStore();
const tudnTheme = tudn();

const GlobalStyles = createGlobalStyle`
  body, html, #root {
    margin: 0;
    padding: 0;
  }
`;

const Decorator = styled.div`
  height: 100vh;
  width: 100%;
`;

storiesOf('Registration/RegistrationForm', module)
  .addDecorator(fn => (
    <>
      <GlobalStyles />
      <Decorator>{fn()}</Decorator>
    </>
  ))
  .add('default', () => {
    store.dispatch(setThemeData({}));

    return (
      <Provider store={store}>
        <RegistrationForm />
      </Provider>
    );
  })
  .add('TUDN', () => {
    store.dispatch(setThemeData(tudnTheme));

    return (
      <Provider store={store}>
        <RegistrationForm />
      </Provider>
    );
  });
