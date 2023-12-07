import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import StickyWrapper from '.';

const shouldApply = jest.fn();

/** @test {StickyWrapper} */
describe('StickyWrapper ', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(<StickyWrapper />, div);
  });
  it('should change the apply state if scrollTop is higher than childrenRef height', () => {
    document.body.scrollTop = 400;
    const wrapper = mount(<StickyWrapper><div style={{ height: '15px' }}>Test</div></StickyWrapper>);
    const instance = wrapper.instance();
    instance.childrenRef.getBoundingClientRect = jest.fn(() => ({ bottom: 0 }));
    instance.onScrollChangeHandler();
    expect(wrapper.state('apply')).toBe(true);
  });

  it('should not change apply state if childrenRef is undefined', () => {
    const wrapper = mount(<StickyWrapper />);
    wrapper.instance().childrenRef = undefined;
    wrapper.instance().onScrollChangeHandler();
    expect(wrapper.state('apply')).toBe(false);
  });

  it('should not change apply state if scrollTop is 0', () => {
    document.body.scrollTop = 0;
    const wrapper = mount(<StickyWrapper />);
    wrapper.instance().onScrollChangeHandler();
    expect(wrapper.state('apply')).toBe(false);
  });

  it('should not change apply state if scrollTop is 0', () => {
    document.body.scrollTop = 0;
    const wrapper = mount(<StickyWrapper />);
    wrapper.instance().onScrollChangeHandler();
    expect(wrapper.state('apply')).toBe(false);
  });

  it('should not change apply state if scrollTop is greater than childrenRef and state exist', () => {
    document.body.scrollTop = 400;
    const wrapper = mount(<StickyWrapper />);
    wrapper.setState({ apply: true });
    const instance = wrapper.instance();
    instance.childrenRef.getBoundingClientRect = jest.fn(() => ({ bottom: 0 }));
    instance.onScrollChangeHandler();
    expect(wrapper.state('apply')).toBe(true);
  });

  it('should not change apply state if scrollTop is lower than childrenRef', () => {
    document.body.scrollTop = 20;
    const wrapper = mount(<StickyWrapper />);
    wrapper.setState({ apply: false });
    const instance = wrapper.instance();
    instance.childrenRef.getBoundingClientRect = jest.fn(() => ({ bottom: 100 }));
    instance.onScrollChangeHandler();
    expect(wrapper.state('apply')).toBe(false);
  });

  it('should use the result of "shouldApply" and set the state to true', () => {
    const wrapper = mount(<StickyWrapper shouldApply={shouldApply.mockReturnValueOnce(true)}><div style={{ height: '15px' }}>Test</div></StickyWrapper>);
    wrapper.instance().onScrollChangeHandler();
    expect(wrapper.state('apply')).toBe(true);
  });

  it('should use the result of "shouldApply" and set the state to false', () => {
    const wrapper = mount(<StickyWrapper shouldApply={shouldApply.mockReturnValueOnce(false)}><div style={{ height: '15px' }}>Test</div></StickyWrapper>);
    wrapper.setState({ apply: true });
    wrapper.instance().onScrollChangeHandler();
    expect(wrapper.state('apply')).toBe(false);
  });

  it('should not change the value if "shouldApply" is equal to the state value', () => {
    const wrapper = mount(<StickyWrapper shouldApply={shouldApply.mockReturnValueOnce(true)}><div style={{ height: '15px' }}>Test</div></StickyWrapper>);
    wrapper.setState({ apply: true });
    wrapper.instance().onScrollChangeHandler();
    expect(wrapper.state('apply')).toBe(true);
  });

  it('should call "onChange" prop when apply change', () => {
    const onChangeSpy = jest.fn();
    const wrapper = mount(<StickyWrapper onChange={onChangeSpy}><div style={{ height: '15px' }}>Test</div></StickyWrapper>);

    document.body.scrollTop = 400;
    const instance = wrapper.instance();
    instance.childrenRef.getBoundingClientRect = jest.fn(() => ({ bottom: 0 }));
    instance.onScrollChangeHandler();
    expect(onChangeSpy).toHaveBeenCalledWith(true);
  });

  it('should remove event scroll listener', () => {
    const wrapper = mount(<StickyWrapper />);
    spyOn(window, 'removeEventListener');
    wrapper.unmount();
    expect(window.removeEventListener).toBeCalled();
  });
});
