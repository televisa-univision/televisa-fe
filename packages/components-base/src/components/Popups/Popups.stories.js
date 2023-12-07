import React from 'react';
import { storiesOf } from '@storybook/react';

import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import { registerPopups, showPopup } from '@univision/fe-commons/dist/store/actions/popups-actions';
import PopupsWrapper from './PopupsWrapper';
import PopupsConnector from './PopupsConnector';
import PopupsProvider from './PopupsProvider';
import Alert from './Content/Alert';
import PreLoader from './Content/PreLoader';

const SampleStyle = {
  position: 'fixed',
  backgroundColor: '#CCCCCC',
  width: '100%',
  bottom: 0,
  left: 0,
  padding: '30px',
  zIndex: 1,
};

const popups = [
  {
    id: 'test',
    visible: true,
    content: () => (
      <div style={SampleStyle}>
        Simple popup with a sample <a href="https://www.univision.com">LINK</a>
      </div>
    ),
  },
  {
    id: 'alert',
    visible: true,
    useOverlay: true,
    closeWithClick: false,
    content: Alert,
  },
];

storiesOf('Popups/Wrapper', module).add('with two popups', () => <PopupsWrapper popups={popups} />);
storiesOf('Popups/Connector', module).add('using connector and manually registering popups', () => {
  Store.dispatch(registerPopups(popups));
  return (
    <Provider store={Store}>
      <PopupsConnector />
    </Provider>
  );
});
storiesOf('Popups/Provider(recommended)', module)
  .add('with closeWithClick', () => {
    return (
      <Provider store={Store}>
        <div>
          <p>Click outside of the box to close</p>
          <PopupsProvider
            popups={[
              {
                id: 'alert2',
                visible: true,
                useOverlay: true,
                closeWithClick: true,
                onClose: () => { /* eslint-disable no-alert */ alert('Closed'); },
                content: Alert,
              },
            ]}
          />
        </div>
      </Provider>
    );
  })
  .add('dispatching Show popup action', () => {
    const popupsToOpen = [
      {
        id: 'alert3',
        visible: false,
        useOverlay: true,
        closeWithClick: false,
        content: Alert,
      },
    ];
    return (
      <Provider store={Store}>
        <div>
          <button onClick={() => Store.dispatch(showPopup('alert3'))}>Show Popup</button>
          <PopupsProvider popups={popupsToOpen} />
        </div>
      </Provider>
    );
  })
  .add('at the bottom without overlay', () => {
    return (
      <Provider store={Store}>
        <PopupsProvider popups={[popups[0]]} />
      </Provider>
    );
  })
  .add('with Preloader content', () => {
    return (
      <Provider store={Store}>
        <div>
          <p>Pre loader content</p>
          <PopupsProvider
            popups={[
              {
                id: 'preloader',
                visible: true,
                useOverlay: true,
                closeWithClick: false,
                content: PreLoader,
              },
            ]}
          />
        </div>
      </Provider>
    );
  });
