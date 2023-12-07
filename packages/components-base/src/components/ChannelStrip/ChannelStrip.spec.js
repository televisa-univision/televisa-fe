import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';

import {
  PRENDETV_24_7,
  EPG_TUDN_MX_URL,
  BACKGROUND_24_7,
  TUDN_STRIP_BG_MOBILE,
  EPG_TUDN_US_URL,
} from '@univision/fe-commons/dist/constants/urls';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import LiveStream from '@univision/fe-video/dist/components/LiveStream';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import data from './__mocks__/channelStrip.json';

import Picture from '../Picture';
import ChannelStrip from './ChannelStrip';

jest.mock('react-lazyload', () => jest.fn(props => <div>{props.children}</div>));
jest.mock('../Image', () => jest.fn());

const store = configureStore();
/**
 * WrapperComponent
 * @prop {children} component children
 * @returns {JSX}
 */
const WrapperComponent = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

WrapperComponent.propTypes = {
  children: PropTypes.node,
};

/** @test {ChannelStrip} */
describe('ChannelStrip', () => {
  let props;

  beforeEach(() => {
    props = {
      data: data.widgets[0].contents[0],
      title: 'First program',
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    jest.restoreAllMocks();
  });

  it('should render as expected', () => {
    const wrapper = mount(
      <WrapperComponent>
        <ChannelStrip {...props} />
      </WrapperComponent>
    );

    expect(wrapper.find('ChannelStrip__ShortTitle').text()).toMatch(/First|Second program/);
    expect(wrapper.find('ChannelStrip__ContentLink').props('children').href).toEqual(`${PRENDETV_24_7}247_banner`);
  });

  it('renders livestream component', () => {
    props.data.auth = false;
    props.data.active = true;
    const wrapper = mount(
      <WrapperComponent>
        <ChannelStrip {...props} />
      </WrapperComponent>
    );
    expect(wrapper.find(LiveStream)).toHaveLength(1);
  });

  it('renders ChannelStrip without livestream component', () => {
    props.data.active = false;
    const wrapper = mount(
      <WrapperComponent>
        <ChannelStrip {...props} />
      </WrapperComponent>
    );
    expect(wrapper.find(Picture)).toHaveLength(1);
  });

  it('doesnt render ChannelStrip if no program is live', () => {
    const wrapper = mount(
      <WrapperComponent>
        <ChannelStrip {...props} title={null} />
      </WrapperComponent>
    );
    expect(wrapper.find('ChannelStrip__ShortTitle')).toHaveLength(0);
  });

  it('should call the widget tracking when the CTA is clicked', () => {
    const { type, uid } = props.data;
    const expectedCall = {
      target: 'prendetv_cta_external',
      contentTitle: props.title,
      contentUid: uid,
      contentType: type,
      extraData: {
        destination_url: `${PRENDETV_24_7}247_banner`,
      },
      eventLabel: '24/7_Banner',
    };
    spyOn(WidgetTracker, 'track');
    const wrapper = mount(
      <WrapperComponent>
        <ChannelStrip {...props} />
      </WrapperComponent>
    );
    const cta = wrapper.find('ChannelStrip__ContentLink').first();
    cta.simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), expectedCall);
  });

  it('renders univision vixplayer component', () => {
    props.data = { ...data.widgets[0].contents[1] };
    const wrapper = mount(
      <WrapperComponent>
        <ChannelStrip {...{ ...props, isTudn: false }} />
      </WrapperComponent>
    );
    expect(wrapper.find('iframe')).toHaveLength(1);
    expect(wrapper.find('Icon').first().props().name).toBe('live247');
    const container = wrapper.find('ChannelStrip__Container').getDOMNode();
    expect(
      getComputedStyle(container).getPropertyValue('background')
    ).toBe(`url(${BACKGROUND_24_7}) no-repeat`);
  });

  it('renders TUDN vixplayer component and MX CTA', () => {
    const userLocationSpy = jest.spyOn(pageSelectors, 'userLocationSelector');
    userLocationSpy.mockReturnValue('MX');
    props.data = { ...data.widgets[0].contents[1] };
    const wrapper = mount(
      <WrapperComponent>
        <ChannelStrip {...{ ...props, isTudn: true }} />
      </WrapperComponent>
    );
    const container = wrapper.find('ChannelStrip__Container').getDOMNode();

    expect(wrapper.find('iframe')).toHaveLength(1);
    expect(wrapper.find('Icon').first().props().name).toBe('tudn');
    expect(wrapper.find('Link').props().href).toBe(EPG_TUDN_MX_URL);
    expect(
      getComputedStyle(container).getPropertyValue('background')
    ).toBe(`url(${TUDN_STRIP_BG_MOBILE}) no-repeat`);
  });

  it('renders TUDN vixplayer component and US CTA', () => {
    const userLocationSpy = jest.spyOn(pageSelectors, 'userLocationSelector');
    userLocationSpy.mockReturnValue('US');
    props.data = { ...data.widgets[0].contents[1] };
    const wrapper = mount(
      <WrapperComponent>
        <ChannelStrip {...{ ...props, isTudn: true }} />
      </WrapperComponent>
    );

    expect(wrapper.find('Link').props().href).toBe(EPG_TUDN_US_URL);
  });

  it('renders TUDN vixplayer component and MX CTA', () => {
    const userLocationSpy = jest.spyOn(pageSelectors, 'userLocationSelector');
    userLocationSpy.mockReturnValue('MX');
    props.data = { ...data.widgets[0].contents[1] };
    const wrapper = mount(
      <WrapperComponent>
        <ChannelStrip {...{ ...props, isTudn: true }} />
      </WrapperComponent>
    );
    const container = wrapper.find('ChannelStrip__Container').getDOMNode();

    expect(wrapper.find('iframe')).toHaveLength(1);
    expect(wrapper.find('Icon').first().props().name).toBe('tudn');
    expect(wrapper.find('Link').props().href).toBe(EPG_TUDN_MX_URL);
    expect(
      getComputedStyle(container).getPropertyValue('background')
    ).toBe(`url(${TUDN_STRIP_BG_MOBILE}) no-repeat`);
  });
});
