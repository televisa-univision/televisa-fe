import React from 'react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setDate } from '@univision/fe-commons/dist/store/actions/tvguide/all-actions';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import AgendaConnector from './AgendaConnector';

/**
 * Helper to create state before calling the stories
 * @param {Object} date - Date to be used
 */
const createState = (date) => {
  Store.dispatch(setPageData({ device: global.innerWidth > 767 ? 'desktop' : 'mobile', domain: 'https://performance.univision.com' }));
  Store.dispatch(setDate(date));
};
storiesOf('Widgets/Agenda', module)
  .addDecorator((story) => {
    createState(new Date());
    return <Provider store={Store}>{story()}</Provider>;
  })
  .add('default', () => <AgendaConnector />);

const today = new Date();
storiesOf('Widgets/Agenda', module)
  .addDecorator((story) => {
    createState(new Date(today).setDate(new Date(today).getDate() + 2));
    return <Provider store={Store}>{story()}</Provider>;
  })
  .add('another day', () => <AgendaConnector />);

storiesOf('Widgets/Agenda', module)
  .addDecorator((story) => {
    createState(new Date('1900-01-29T09:15:30Z'));
    return <Provider store={Store}>{story()}</Provider>;
  })
  .add('no events', () => <AgendaConnector />);
