import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import Store from '../../../store/store';
import BKPIndicator from '.';

const cmp = (
  <Provider store={Store}>
    <BKPIndicator />
  </Provider>
);

/** @test {BKPIndicator} */
describe('BreakPointIndicator', () => {
  it('should render the main div ', () => {
    const wrapper = mount(cmp);
    expect(wrapper.find('div.indicator')).toBeDefined();
  });

  it('should call ComponentDidMount', () => {
    spyOn(BKPIndicator.WrappedComponent.prototype, 'componentDidMount').and.callThrough();
    mount(cmp);
    expect(BKPIndicator.WrappedComponent.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });

  it('should return the prop value', () => {
    const instance = mount(
      <Provider store={Store}>
        <BKPIndicator value="xl" />
      </Provider>
    ).find('BKPIndicator').instance();
    const val = instance.getValue();
    expect(val).toBe('xl');
  });

  it('Should use className when provided', () => {
    const wrapper = mount(<Provider store={Store}><BKPIndicator className="overrideClass" /></Provider>);
    expect(wrapper.find('div.overrideClass').length).toBe(1);
  });

  it('Should return the right value for mobile device', () => {
    const props = {
      device: null,
      value: null,
    };
    const instance = mount(
      <Provider store={Store}>
        <BKPIndicator {...props} />
      </Provider>
    ).find('BKPIndicator').instance();
    instance.value = null;
    const mobileValue = instance.getValueFromDevice();
    expect(mobileValue).toEqual('xs');
  });

  it('Should return the right value for mobile device', () => {
    const instance = mount(cmp).find('BKPIndicator').instance();
    instance.value = 'xs';
    const mobileValue = instance.getValueFromDevice('');
    expect(mobileValue).toEqual('xs');
  });

  it('Should return the right value for tablet device', () => {
    const instance = mount(cmp).find('BKPIndicator').instance();
    const tabletValue = instance.getValueFromDevice('tablet');
    expect(tabletValue).toEqual('md');
  });

  it('Should return the right value for desktop device', () => {
    const instance = mount(cmp).find('BKPIndicator').instance();
    const desktopValue = instance.getValueFromDevice('desktop');
    expect(desktopValue).toEqual('xl');
  });

  it('should set the breakpoint based on mobile device', () => {
    const instance = mount(
      <Provider store={Store}>
        <BKPIndicator device="mobile" value="xs" />
      </Provider>
    ).find('BKPIndicator').instance();
    expect(instance.getValueFromDevice('mobile')).toBe('xs');
  });

  it('should set the breakpoint based on tablet device', () => {
    const instance = mount(
      <Provider store={Store}>
        <BKPIndicator device="tablet" value="md" />
      </Provider>
    ).find('BKPIndicator').instance();
    expect(instance.getValueFromDevice('tablet')).toBe('md');
  });

  it('should set the breakpoint based on desktop device', () => {
    const instance = mount(
      <Provider store={Store}>
        <BKPIndicator device="desktop" value="xl" />
      </Provider>
    ).find('BKPIndicator').instance();
    expect(instance.getValueFromDevice('desktop')).toBe('xl');
  });
});
