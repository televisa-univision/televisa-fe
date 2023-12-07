import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import mockData from './__mocks__/mockData.json';
import RawHtmlContainer from '.';

const store = configureStore({
  device: 'desktop',
});
let twitterWidgetMock;
let iframeMock;

describe('RawHtmlContainer', () => {
  beforeEach(() => {
    jest.useFakeTimers();

    twitterWidgetMock = {
      style: {
        width: '500px',
      },
    };

    iframeMock = {
      current: {
        contentWindow: {
          document: {
            body: {
              clientHeight: 100,
            },
            getElementsByTagName: jest.fn().mockImplementation(() => [twitterWidgetMock]),
          },
          __twttr: {
            widgets: {
              loaded: true,
            },
          },
        },
      },
    };
  });

  it('should render as expected', () => {
    const wrapper = shallow(<RawHtmlContainer html="<div>Hello</div>" />);
    expect(wrapper.html()).toContain('<div>Hello</div>');
  });

  it('should return null for null html', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<RawHtmlContainer html={null} />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render as expected with full width', () => {
    const settingsExternalContent = {
      fullWidth: true,
    };
    const wrapper = mount(
      <RawHtmlContainer
        html="<div>Hello</div>"
        settingsExternalContent={settingsExternalContent}
      />
    );
    expect(wrapper.find('RawHtmlContainer__RawHtmlStyled')).toHaveLength(1);
    expect(wrapper.find('RawHtmlContainer__RawHtmlStyled')).toHaveStyleRule('max-width', '100%');
  });

  it('should render full width when there is a univision static page', () => {
    const wrapper = mount(
      <RawHtmlContainer
        html="<div>Hello youtube</div>"
        headers={[{ value: 'univision-static' }]}
      />
    );
    expect(wrapper.find('RawHtmlContainer__RawHtmlStyled')).toHaveLength(1);
    expect(wrapper.find('RawHtmlContainer__RawHtmlStyled')).toHaveStyleRule('max-width', '100%');
  });

  it('should render an iframe for Facebook embed', () => {
    const wrapper = mount(<RawHtmlContainer html={mockData[2].facebook} />);
    expect(wrapper.render().find('blockquote').prop('cite')).toEqual('https://graph.facebook.com/univisionnoticias/videos/383299556139964/');
  });

  it('should render an iframe for Youtube embed', () => {
    const wrapper = mount(<RawHtmlContainer html={mockData[2].youtube} />);
    expect(wrapper.render().find('iframe')).toHaveLength(1);
  });

  it('should render an iframe for Youtube embed', () => {
    const wrapper = mount(<RawHtmlContainer html={mockData[2].youtube} />);
    expect(wrapper.render().find('iframe')).toHaveLength(1);
  });

  it('should render an iframe for Twitter embed', () => {
    const wrapper = mount(<RawHtmlContainer html={mockData[2].twitter} />);
    expect(wrapper.find('iframe')).toHaveLength(1);
  });

  it('should render an iframe for Instagram embed', () => {
    const wrapper = mount(<RawHtmlContainer html={mockData[2].instagram} />);
    expect(wrapper.find('iframe')).toHaveLength(1);
  });

  it('should render an iframe for static external content', () => {
    const wrapper = shallow(
      <RawHtmlContainer
        html={mockData[0].objectData.responseData.html}
        settingsExternalContent={mockData[0].objectData.responseData}
      />
    );
    expect(wrapper.instance().state).toBeDefined();
  });

  it('should initialize listener', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    const instance = wrapper.instance();
    const initializeResizeListenerSpy = jest.spyOn(instance, 'initializeResizeListener');
    const changeFrameHeightSpy = jest.spyOn(instance, 'changeFrameHeight');

    instance.componentDidMount();

    expect(initializeResizeListenerSpy).toHaveBeenCalledWith(changeFrameHeightSpy);
  });

  it('should not initialize any iframe listeners if the component is not an iframe', () => {
    const wrapper = shallow(<RawHtmlContainer html="<div>Hello</div>" />);
    const instance = wrapper.instance();
    const executeAfterLoadSpy = jest.spyOn(instance, 'executeAfterLoad');
    const initializeResizeListenerSpy = jest.spyOn(instance, 'initializeResizeListener');

    instance.componentDidMount();

    expect(executeAfterLoadSpy).not.toHaveBeenCalled();
    expect(initializeResizeListenerSpy).not.toHaveBeenCalled();
  });

  it('should clean up timers when component unmounts', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    wrapper.instance().embedLoadedTimeout = 1;
    wrapper.instance().resizeTimeout = 2;
    wrapper.instance().embedSimulatedLoadedTimeout = 3;
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');

    wrapper.instance().componentWillUnmount();

    expect(clearTimeoutSpy).toHaveBeenNthCalledWith(1, 1);
    expect(wrapper.instance().embedLoadedTimeout).toBe(null);
    expect(clearTimeoutSpy).toHaveBeenNthCalledWith(2, 2);
    expect(wrapper.instance().resizeTimeout).toBe(null);
    expect(clearTimeoutSpy).toHaveBeenNthCalledWith(3, 3);
    expect(wrapper.instance().embedSimulatedLoadedTimeout).toBe(null);
    clearTimeoutSpy.mockRestore();
  });

  it('should not try to clean up timers when component unmounts if there are none', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    wrapper.instance().embedLoadedTimeout = null;
    wrapper.instance().resizeTimeout = null;
    wrapper.instance().embedSimulatedLoadedTimeout = null;
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');

    wrapper.instance().componentWillUnmount();

    expect(clearTimeoutSpy).not.toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('should have executeAfterLoad call callbacks after load timeout', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    wrapper.instance().executeAfterLoad(callback1, callback2);
    jest.runAllTimers();

    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  it('should have executeSimulatedOnLoad call callbacks if the onLoad event was not fired', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    wrapper.instance().onLoadFired = false;
    wrapper.instance().executeSimulatedOnLoad(callback1, callback2);
    jest.runAllTimers();

    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  it('should not have executeSimulatedOnLoad call callbacks if the onLoad event was fired', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    wrapper.instance().onLoadFired = true;
    wrapper.instance().executeSimulatedOnLoad(callback1, callback2);
    jest.runAllTimers();

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });

  it('should resize twitter embed if loaded on a mobile device', () => {
    store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = mount(
      <Provider store={store}>
        <RawHtmlContainer html={mockData[2].twitter} />
      </Provider>
    );
    const rawContainer = wrapper.children();

    window.innerWidth = '480px';
    rawContainer.instance().iframe = iframeMock;
    rawContainer.instance().changeMobileTwitterEmbedWidth();

    const expectedWidth = `${window.innerWidth * 0.8}px`;
    expect(twitterWidgetMock.style.width).toBe(expectedWidth);
  });

  it('should not resize twitter embed if device is desktop', () => {
    store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = mount(
      <Provider store={store}>
        <RawHtmlContainer html={mockData[2].twitter} />
      </Provider>
    );
    const rawContainer = wrapper.children();

    window.innerWidth = '480px';
    rawContainer.instance().iframe = iframeMock;
    rawContainer.instance().changeMobileTwitterEmbedWidth();

    expect(twitterWidgetMock.style.width).toBe('500px');
  });

  it('should not resize twitter embed if document object is not found', () => {
    store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = mount(
      <Provider store={store}>
        <RawHtmlContainer html={mockData[2].twitter} />
      </Provider>
    );
    const rawContainer = wrapper.children();

    window.innerWidth = '480px';
    iframeMock.current.contentWindow.document = null;
    rawContainer.instance().iframe = iframeMock;
    rawContainer.instance().changeMobileTwitterEmbedWidth();

    expect(twitterWidgetMock.style.width).toBe('500px');
  });

  it('should change iframe height correctly', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    wrapper.instance().iframe = iframeMock;

    wrapper.instance().changeFrameHeight();

    expect(wrapper.state().iframeHeight).toBe(
      iframeMock.current.contentWindow.document.body.clientHeight + 20
    );
  });

  it('should not change frame height if iframe body object is not found', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    const initialHeight = wrapper.state().iframeHeight;
    iframeMock.current.contentWindow.document.body = null;
    wrapper.instance().iframe = iframeMock;

    wrapper.instance().changeFrameHeight();

    expect(wrapper.state().iframeHeight).toBe(initialHeight);
  });

  it('should initialize resize listener correctly', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    const resizeHandler = jest.fn();
    const instance = wrapper.instance();
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    instance.initializeResizeListener(resizeHandler);
    jest.spyOn(instance, 'createResizeThrottler').mockReturnValue(resizeHandler);

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', instance.resizeThrottler);
  });

  it('should have createResizeThrottler return a new throttled handler', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    const resizeHandler = jest.fn();

    const throttledHandler = wrapper.instance().createResizeThrottler(resizeHandler);

    expect(typeof throttledHandler).toBe('function');
  });

  it('should have createResizeThrottler create a throttled function that calls the handler', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    const resizeHandler = jest.fn();
    const throttledHandler = wrapper.instance().createResizeThrottler(resizeHandler);

    throttledHandler();
    jest.runOnlyPendingTimers();
    expect(resizeHandler).toHaveBeenCalled();
  });

  it('should not call the resizeThrottler if another handler is in the queue', () => {
    const wrapper = shallow(<RawHtmlContainer html={mockData[2].twitter} />);
    const resizeHandler = jest.fn();
    const throttledHandler = wrapper.instance().createResizeThrottler(resizeHandler);

    wrapper.instance().resizeTimeout = '12345'; // mock another timeout in queue
    throttledHandler();
    jest.runAllTimers();
    expect(resizeHandler).not.toHaveBeenCalled();
  });
});
