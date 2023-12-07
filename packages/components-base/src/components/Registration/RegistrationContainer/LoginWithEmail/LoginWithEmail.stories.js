import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { setThemeData } from '@univision/fe-commons/dist/store/actions/page-actions';
import { TROPICAL_RAIN_FOREST, TUDN_GRADIENT } from '@univision/fe-utilities/styled/constants';

import LoginWithEmail from '.';

const Store = configureStore();

const Decorator = styled.div`
  margin: 0 auto;
  max-width: 480px;
`;

storiesOf('RegistrationForm/LoginWithEmail', module)
  .addDecorator(fn => (<Decorator>{fn()}</Decorator>))
  .add('default', () => {
    Store.dispatch(setThemeData({}));
    return (
      <Provider store={Store}>
        <LoginWithEmail />
      </Provider>
    );
  })
  .add('TUDN', () => {
    Store.dispatch(setThemeData({
      registration: {
        primary: TROPICAL_RAIN_FOREST,
        gradient: TUDN_GRADIENT,
      },
    }));
    return (
      <Provider store={Store}>
        <LoginWithEmail />
      </Provider>
    );
  });
