/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import TitleBack from '.';

describe('TitleBack component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TitleBack />, div);
  });
  it('should show default TitleBack', () => {
    const wrapper = mount(<TitleBack />);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
  it('should show default TitleBack TUDN', () => {
    const wrapper = mount(<TitleBack isTudnVersion />);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
  it('should ee function correctly', () => {
    const fn = jest.fn();
    const wrapper = mount(<TitleBack onClick={fn} />);
    act(() => {
      wrapper.simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });
});
