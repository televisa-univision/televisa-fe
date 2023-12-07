import React from 'react';
import { mount } from 'enzyme';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { Provider } from 'react-redux';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import mockData from './mockData';
import HelpCenter from '.';

const store = configureStore();

let data;
beforeEach(() => {
  data = mockData.data.widgets[1].contents;
});

describe('HelpCenter', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Provider store={store}><HelpCenter content={data} /></Provider>);
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('Change selected  city', () => {
    const wrapper = mount(
      <Provider store={store}><HelpCenter selectedCity={0} content={data} /></Provider>
    );
    const marketWrapper = wrapper.find('HelpCenterMarket');
    const { setSelectedCity } = marketWrapper.props();
    setSelectedCity(0);
    expect(wrapper.props().selectedCity).toBe(undefined);
  });
  it('should renders with click in HelpCenterItem with context', () => {
    const trackerSpy = jest.spyOn(WidgetTracker, 'track');
    const widgetContext = { title: '' };
    const wrapper = mount(
      <Provider store={configureStore()}>
        <HelpCenter content={data} widgetContext={widgetContext} />
      </Provider>
    );
    wrapper.find('ItemCard')
      .first()
      .simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
  });

  it('should renders with click in HelpCenterItem', () => {
    const trackerSpy = jest.spyOn(WidgetTracker, 'track');
    const wrapper = mount(
      <Provider store={configureStore()}>
        <HelpCenter content={data} />
      </Provider>
    );
    wrapper.find('ItemCard')
      .first()
      .simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
  });
  it('should renders with click in HelpCenterItem with widget context', () => {
    const trackerSpy = jest.spyOn(WidgetTracker, 'track');
    const widgetContext = { title: 'Title' };
    const wrapper = mount(
      <Provider store={configureStore()}>
        <HelpCenter content={data} widgetContext={widgetContext} />
      </Provider>
    );
    wrapper.find('ItemCard')
      .first()
      .simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
  });
  it('should renders with click in HelpCenterItem with Widget context', () => {
    const trackerSpy = jest.spyOn(WidgetTracker, 'track');
    const widgetContext = { };
    const wrapper = mount(
      <Provider store={configureStore()}>
        <HelpCenter content={data} widgetContext={widgetContext} />
      </Provider>
    );
    wrapper.find('ItemCard')
      .first()
      .simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
  });
});
