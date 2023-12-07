import React from 'react';
import { shallow } from 'enzyme';

import Icon from '@univision/fe-icons/dist/components/Icon';

import Dropdown from '.';

jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    options: [{
      name: 'first',
      value: 1,
    }, {
      name: 'second',
      value: '2',
    }, {
      name: 'third',
      value: 'third',
    }],
    name: 'dd',
    onChange: jest.fn(),
  };
});

/** @test {Dropdown} */
describe('Dropdown ', () => {
  it('should render the component as expected', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('.dropdownWrapper')).toHaveLength(1);
    expect(wrapper.find('select')).toHaveLength(1);
    expect(wrapper.find(Icon).prop('name')).toBe('arrowDown');
    expect(wrapper.find('option')).toHaveLength(props.options.length);
  });

  it('should render the component with placeholder', () => {
    const wrapper = shallow(<Dropdown {...props} placeholder="default" />);
    expect(wrapper.find('.dropdownWrapper')).toHaveLength(1);
    expect(wrapper.find('select')).toHaveLength(1);
    expect(wrapper.find(Icon).prop('name')).toBe('arrowDown');
    expect(wrapper.find('option')).toHaveLength(props.options.length + 1);
  });

  it('calls onchange prop', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    wrapper.find('select').simulate('change');
    expect(props.onChange).toBeCalled();
  });
});
