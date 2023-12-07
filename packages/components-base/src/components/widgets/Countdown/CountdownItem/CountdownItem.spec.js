import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import CountdownItem from '.';

let props;
beforeEach(() => {
  props = {
    text: 'Días',
    time: '00',
  };
});

/** @test {CountdownItems} */
describe('CountdownItems ', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CountdownItem {...props} />, div);
  });
  it('should render the sparator', () => {
    const wrapper = shallow(<CountdownItem {...props} />);
    expect(wrapper.find('CountdownItem__Separator').length).toBe(1);
  });
  it('should render the text', () => {
    const wrapper = shallow(<CountdownItem {...props} />);
    expect(wrapper.find('CountdownItem__TimerItem').text()).toEqual('00Días');
  });
  it('should render the prende tv flavour', () => {
    const wrapper = mount(<CountdownItem {...props} isPrendeTV />);
    expect(wrapper.find('CountdownItem').first().prop('isPrendeTV')).toBeTruthy();
  });
});
