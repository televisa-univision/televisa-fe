import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { showPopup } from '@univision/fe-commons/dist/store/actions/popups-actions';
import { TUDN_MVPD_POPUP, TUDN_MVPD_POPUP_FORM } from '../../../constants';
import TudnMvpdWrapper from '.';

const store = configureStore();

storiesOf('TudnMvpdWrapper', module)
  .add('default', () => {
    return (
      <Provider store={store}>
        <button onClick={() => store.dispatch(showPopup(TUDN_MVPD_POPUP))}>Show Popup</button>
        <TudnMvpdWrapper />
      </Provider>
    );
  })
  .add('form', () => {
    return (
      <Provider store={store}>
        <button onClick={() => store.dispatch(showPopup(TUDN_MVPD_POPUP_FORM))}>Show Form</button>
        <TudnMvpdWrapper />
      </Provider>
    );
  });
