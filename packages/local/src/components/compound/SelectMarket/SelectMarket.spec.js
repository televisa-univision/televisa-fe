import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import gtmManager from '@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager';

import SelectMarket from '.';

describe('SelectMarket', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    console.error = jest.fn(); // eslint-disable-line no-console
    const el = (
      <Provider store={Store}>
        <SelectMarket />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    const wrapper = mount(
      <SelectMarket localMarket="KAKW">
        Some Title
      </SelectMarket>
    );

    expect(wrapper.find('SelectMarket__SelectMarketWrapper')).toHaveLength(1);
  });

  it('should display the modal background', () => {
    const wrapper = mount(
      <SelectMarket localMarket="KAKW">
        Some Title
      </SelectMarket>
    );
    expect(wrapper.find('PresenceChild')).toHaveLength(0);

    act(() => {
      wrapper.find('SelectMarket__TextWrapper').first().props().onClick();
    });
    wrapper.update();
    expect(wrapper.find('PresenceChild')).toHaveLength(1);

    act(() => {
      wrapper.find('AnimatedModalBackground').first().props().onClick();
    });
    wrapper.update();

    expect(wrapper.find('AnimatedModalBackground').first().prop('isVisible')).toBeFalsy();
  });

  it('should open the modal', () => {
    global.innerWidth = 320;

    const wrapper = mount(
      <SelectMarket>
        Some Title
      </SelectMarket>
    );
    act(() => {
      wrapper.find('SelectMarket__TextWrapper').first().props().onClick();
    });
    wrapper.update();

    expect(wrapper.find('SelectMarket__SelectMarketWrapper').first().prop('isOpen')).toBeTruthy();
  });

  it('should fire the onclick event', () => {
    global.innerWidth = 320;

    const onChange = jest.fn(obj => obj.isOpen);
    const wrapper = mount(
      <SelectMarket onChange={onChange}>
        Some Title
      </SelectMarket>
    );
    act(() => {
      wrapper.find('SelectMarket__TextWrapper').first().props().onClick();
    });
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should track the arrow click event', () => {
    global.innerWidth = 320;
    const dataLayer = gtmManager.getDataLayer();

    const wrapper = mount(
      <SelectMarket>
        Some Title
      </SelectMarket>
    );
    act(() => {
      wrapper.find('SelectMarket__ArrowIconWrapper').first().props().onClick();
    });
    wrapper.update();
    expect(dataLayer[dataLayer.length - 1].event_action).toBe('subnav-local-list');
  });

  it('should fire the onSelect event', () => {
    global.innerWidth = 320;

    const onSelect = jest.fn(obj => obj.isOpen);
    const wrapper = mount(
      <SelectMarket onSelect={onSelect}>
        Some Title
      </SelectMarket>
    );
    act(() => {
      wrapper.find('SelectMarket__TextWrapper').first().props().onClick();
    });
    wrapper.update();

    act(() => {
      wrapper.find('SelectMarket__Market').first().props().onClick();
    });
    wrapper.update();
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('should fire the onSelect event and redirect to local market when is not specified an event handler', () => {
    const wrapper = mount(
      <SelectMarket relativePath="/">
        Some Title
      </SelectMarket>
    );
    act(() => {
      wrapper.find('SelectMarket__TextWrapper').first().props().onClick();
    });
    wrapper.update();

    act(() => {
      wrapper.find('SelectMarket__Market').first().props().onClick();
    });
    wrapper.update();

    expect(window.location.href).toEqual('http://localhost/');
  });
  it('should fire the onSelect event and redirect to the local market homepage when the relativePath is not specified', () => {
    global.innerWidth = 320;
    const wrapper = mount(
      <SelectMarket>
        Some Title
      </SelectMarket>
    );
    act(() => {
      wrapper.find('SelectMarket__TextWrapper').first().props().onClick();
    });
    wrapper.update();

    act(() => {
      wrapper.find('SelectMarket__Market').first().props().onClick();
    });
    wrapper.update();

    expect(window.location.href).toEqual('http://localhost/');
  });
});
