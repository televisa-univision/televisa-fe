import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import CallButton from '.';

const Container = styled.div`
  width: 300px
`;

const props = {
  callNumber: '800.555.5555',
};

storiesOf('Clickable/Call Button CTA', module)
  .add('Desktop', () => {
    Store.dispatch(setPageData({ device: 'desktop', data: null }));
    return (
      <Provider store={Store}>
        <Container>
          <CallButton {...props} />
        </Container>
      </Provider>
    );
  })
  .addDecorator(withViewport('iphone8p'))
  .add('Mobile', () => {
    Store.dispatch(setPageData({ device: 'mobile', data: null }));
    return (
      <Provider store={Store}>
        <CallButton {...props} />
      </Provider>
    );
  });
