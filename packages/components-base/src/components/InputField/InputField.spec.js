import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import InputField from '.';

/** @test {InputField} */
describe('InputField', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InputField id="test" />, div);
  });
  it('should set the message error', () => {
    const wrapper = mount(
      <InputField label="test" error="test" id="test" />
    );

    expect(wrapper.find('InputField__Message').text()).toBe('test');
  });
  it('should show search icon', () => {
    const wrapper = mount(
      <InputField type="search" />
    );

    expect(wrapper.find('Icon').props().name).toBe('search');
  });
  it('should call the method provided for onKeyUp', () => {
    const handleKeyUp = jest.fn();
    const wrapper = mount(
      <InputField onKeyUp={handleKeyUp} id="test" />
    );

    act(() => {
      wrapper.find('InputField__Input').prop('onKeyUp')();
    });

    wrapper.update();

    expect(handleKeyUp).toHaveBeenCalled();
  });
  it('should trigger icon click', () => {
    const iconClickHandler = jest.fn();

    const wrapper = mount(
      <InputField label="test" error="test" id="test" iconClickHandler={iconClickHandler} />
    );

    act(() => {
      wrapper.find('InputField__IconWrapper').simulate('click');
    });

    wrapper.update();

    expect(iconClickHandler).toHaveBeenCalled();
  });
});
