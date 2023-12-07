import React from 'react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import {
  NETWORK_UNIMAS,
  NETWORK_UNIVISION,
  NETWORK_UDN,
  NETWORK_GALAVISION,
  NETWORK_DIGITAL,
} from '@univision/fe-commons/dist/constants/tvGuide';

import TvGuideConnector from './TvGuideConnector';

storiesOf('Widgets/TvGuide', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: global.innerWidth > 767 ? 'desktop' : 'mobile', domain: 'https://performance.univision.com' }));
    return <Provider store={Store}>{story()}</Provider>;
  })
  .add('for UNIMAS', () => <TvGuideConnector channel={NETWORK_UNIMAS} />)
  .add('for UNIVISION', () => <TvGuideConnector channel={NETWORK_UNIVISION} />)
  .add('for UDN', () => <TvGuideConnector channel={NETWORK_UDN} />)
  .add('for GALAVISION', () => <TvGuideConnector channel={NETWORK_GALAVISION} />)
  .add('for DIGITAL', () => <TvGuideConnector channel={NETWORK_DIGITAL} />);

storiesOf('Widgets/TvGuide/Univision', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: global.innerWidth > 767 ? 'desktop' : 'mobile', domain: 'https://performance.univision.com' }));
    return <Provider store={Store}>{story()}</Provider>;
  })
  .add('for Univision with series filter', () => (
    <TvGuideConnector channel={NETWORK_UNIVISION} content="series" />
  ))
  .add('for Univision with shows filter', () => (
    <TvGuideConnector channel={NETWORK_UNIVISION} content="shows" />
  ))
  .add('for Univision with matches filter', () => (
    <TvGuideConnector channel={NETWORK_UNIVISION} content="matches" />
  ));

storiesOf('Widgets/TvGuide/Galavision', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: global.innerWidth > 767 ? 'desktop' : 'mobile' }));
    return <Provider store={Store}>{story()}</Provider>;
  })
  .add('for Univision with series filter', () => (
    <TvGuideConnector channel={NETWORK_GALAVISION} content="series" />
  ))
  .add('for Univision with shows filter', () => (
    <TvGuideConnector channel={NETWORK_GALAVISION} content="shows" />
  ))
  .add('for Univision with matches filter', () => (
    <TvGuideConnector channel={NETWORK_GALAVISION} content="matches" />
  ));

storiesOf('Widgets/TvGuide/Unimas', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: global.innerWidth > 767 ? 'desktop' : 'mobile' }));
    return <Provider store={Store}>{story()}</Provider>;
  })
  .add('for Unimas with series filter', () => (
    <TvGuideConnector channel={NETWORK_UNIMAS} content="series" />
  ))
  .add('for Unimas with shows filter', () => (
    <TvGuideConnector channel={NETWORK_UNIMAS} content="shows" />
  ))
  .add('for Unimas with matches filter', () => (
    <TvGuideConnector channel={NETWORK_UNIMAS} content="matches" />
  ));
