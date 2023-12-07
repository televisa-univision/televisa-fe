import React from 'react';
import { shallow, mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import WxWidget from './WxWidget';

describe('TWCWidget', () => {
  it('should not render a wx-widget tag if the library is not ready', () => {
    const wrapper = shallow(<WxWidget />);
    expect(wrapper.find('wx-widget')).toHaveLength(0);
  });

  it('should render a TopicBar if a title is provided', () => {
    const wrapper = shallow(<WxWidget titleSettings={{ title: 'Test Title' }} />);
    expect(wrapper.find('TopicBar')).toHaveLength(1);
  });

  it('should set market location based on brandable', async () => {
    Store.dispatch(setPageData({
      data: {
        brandable: {
          tvStation: {
            call: 'WUVG',
          },
        },
      },
    }));
    const wrapper = shallow(<WxWidget />);

    expect(wrapper.instance().state).toEqual({
      latitude: 33.642,
      longitude: -84.433,
      scriptLoaded: false,
    });
  });

  it('should load the library when the component mounts', (done) => {
    spyOn(helpers, 'loadExternalScript');
    const wrapper = mount(<WxWidget />);
    // wait for promises in componentDidMount
    setImmediate(() => {
      expect(helpers.loadExternalScript).toHaveBeenCalledWith({
        id: wrapper.instance().scriptId,
        unique: true,
        onLoad: wrapper.instance().notifyLibraryReady,
        src: 'https://widgets.media.weather.com/wxwidget.loader.js?cid=727838644',
      });
      done();
    });
  });

  it('should not load the library if it is already loaded', (done) => {
    global.window.wxWidgets = jest.fn();
    spyOn(helpers, 'loadExternalScript');
    mount(<WxWidget />);
    // wait for promises in componentDidMount
    setImmediate(() => {
      expect(helpers.loadExternalScript).not.toHaveBeenCalled();
      done();
    });
  });

  it('should be updated only when the library is loaded for first time', () => {
    const wrapper = shallow(<WxWidget />);
    const newState = {
      scriptLoaded: false,
    };
    // returns false is script is not loaded
    expect(wrapper.instance().shouldComponentUpdate({}, newState)).toBe(false);
    newState.scriptLoaded = true;
    wrapper.instance().setState(newState);
    // returns false if the script was already loaded
    expect(wrapper.instance().shouldComponentUpdate({}, newState)).toBe(false);
  });

  it('should parse the widgets when the component is updated', () => {
    const wrapper = shallow(<WxWidget />);
    global.window.wxWidgets = {
      parse: jest.fn(),
    };
    wrapper.instance().onLibraryLoaded();
    wrapper.instance().componentDidUpdate();
    expect(wrapper.instance().lib.parse).toHaveBeenCalled();
  });

  it('should post a message when the library is ready', () => {
    delete global.window.wxWidgets;
    spyOn(window, 'postMessage');
    const wrapper = shallow(<WxWidget />);
    wrapper.instance().notifyLibraryReady();
    expect(global.window.postMessage).toHaveBeenCalled();
  });

  it('should process the posted message to load the library.', (done) => {
    delete global.window.wxWidgets;
    const wrapper = shallow(<WxWidget />);
    spyOn(wrapper.instance(), 'onLibraryLoaded').and.callFake(() => {
      done();
    });
    wrapper.instance().componentDidMount();
    global.window.postMessage('fake-message', global.location.origin);
    wrapper.instance().notifyLibraryReady();
  });

  it('should track the widget load.', () => {
    const wrapper = shallow(<WxWidget tracking={{ onLoad: 'test' }} />);
    spyOn(WidgetTracker, 'track');
    wrapper.instance().componentDidMount();
    expect(WidgetTracker.track).toHaveBeenCalledWith(WidgetTracker.events.engagement, { target: 'test' });
  });
  it('should remove event listeners when unmounted', () => {
    const wrapper = shallow(<WxWidget />);
    const fn = wrapper.instance().onMessage;
    spyOn(global.window, 'removeEventListener');
    wrapper.unmount();
    expect(global.window.removeEventListener).toHaveBeenCalledWith('message', fn);
  });
});
