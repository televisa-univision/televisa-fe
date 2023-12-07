import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { setThemeData } from '@univision/fe-commons/dist/store/actions/page-actions';
import tudn from '@univision/fe-commons/dist/themes/tudn';
import media from '@univision/fe-utilities/styled/mixins/media';

import LoggedIn from '.';

const store = configureStore();

const Decorator = styled.div`
  margin: 0 auto;
  max-width: 414px;

  ${media.md`
    max-width: 878px;
  `}
`;

const tudnTheme = tudn();

storiesOf('RegistrationForm/LoggedIn', module)
  .addDecorator(fn => <Decorator>{fn()}</Decorator>)
  .add('default', () => {
    store.dispatch(
      setThemeData({})
    );

    return (
      <Provider store={store}>
        <LoggedIn />
      </Provider>
    );
  })
  .add('TUDN', () => {
    store.dispatch(
      setThemeData({
        ...tudnTheme,
      })
    );

    return (
      <Provider store={store}>
        <LoggedIn />
      </Provider>
    );
  });
