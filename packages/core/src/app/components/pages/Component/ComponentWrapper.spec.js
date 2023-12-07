import { mount } from 'enzyme';
import React from 'react';
import ComponentWrapper from './ComponentWrapper';

describe('ComponentWrapper', () => {
  it('should render as expected', () => {
    jest.useFakeTimers();
    spyOn(window, 'postMessage');
    const wrapper = mount(<ComponentWrapper initialState={{}} />);
    expect(wrapper.find('Provider')).toHaveLength(1);
    expect(wrapper.find('BKPIndicator')).toHaveLength(1);

    expect(window.postMessage).not.toHaveBeenCalled();
    jest.runTimersToTime(550);
    expect(window.postMessage).toHaveBeenCalled();
  });
  it('should not post message if container is not defined', () => {
    jest.useFakeTimers();
    spyOn(window, 'postMessage');
    const wrapper = mount(<ComponentWrapper initialState={{}} />);
    wrapper.instance().container.current = null;
    expect(window.postMessage).not.toHaveBeenCalled();
    jest.runTimersToTime(550);
    expect(window.postMessage).not.toHaveBeenCalled();
  });
  it('should clear the timeout when component unmounts', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const wrapper = mount(<ComponentWrapper initialState={{}} />);
    wrapper.instance().timeout = 1;
    wrapper.instance().componentWillUnmount();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(1);
    clearTimeoutSpy.mockRestore();
  });
});
