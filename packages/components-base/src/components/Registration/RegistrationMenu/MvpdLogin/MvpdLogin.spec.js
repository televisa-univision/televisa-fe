import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import MvpdLogin from '.';

describe('MvpdLogin component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MvpdLogin />, div);
  });
  it('should show key when iconName does no exists', () => {
    const wrapper = mount(<MvpdLogin />);
    expect(wrapper.find('Icon').props().name).toBe('key');
  });
  it('should show key when iconName does no exists', () => {
    const wrapper = mount(<MvpdLogin iconName="tvCox" />);
    expect(wrapper.find('Icon').props().name).toBe('tvCox');
  });
});
