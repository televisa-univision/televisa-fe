import React from 'react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  NETWORK_UNIMAS,
  NETWORK_UNIVISION,
  NETWORK_UDN,
  NETWORK_GALAVISION,
  NETWORK_DIGITAL,
} from '@univision/fe-commons/dist/constants/tvGuide';
import TvGuideNav from '.';

const onPressAction = action('Channel Pressed');
const channelNav = [
  NETWORK_DIGITAL,
  NETWORK_UNIVISION,
  NETWORK_UDN,
  NETWORK_GALAVISION,
  NETWORK_UNIMAS,
];

storiesOf('Base/TvGuideChannelNav', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: global.innerWidth > 767 ? 'desktop' : 'mobile' }));
    return <div>{story()}</div>;
  })
  .add('with DIGITAL active', () => (
    <TvGuideNav channels={channelNav} activeChannel={NETWORK_DIGITAL} onPress={onPressAction} />
  ))
  .add('with UNIVISION active', () => (
    <TvGuideNav channels={channelNav} activeChannel={NETWORK_UNIVISION} onPress={onPressAction} />
  ))
  .add('with UDN active', () => (
    <TvGuideNav channels={channelNav} activeChannel={NETWORK_UDN} onPress={onPressAction} />
  ))
  .add('with GALAVISION active', () => (
    <TvGuideNav channels={channelNav} activeChannel={NETWORK_GALAVISION} onPress={onPressAction} />
  ))
  .add('with UNIMAS active', () => (
    <TvGuideNav channels={channelNav} activeChannel={NETWORK_UNIMAS} onPress={onPressAction} />
  ));
