import React from 'react';
import { shallow, mount } from 'enzyme';
import FilterTabMenu from '.';

let props;
let emptyProps;
const event = {
  target: { value: '0' },
  preventDefault: jest.fn(),
  nativeEvent: {},
};
event.nativeEvent = event;
const filterTypes = [
  { name: 'Todos', id: '0' },
  { name: 'Novelas', id: '1' },
  { name: 'Series', id: '2' },
  { name: 'Shows', id: '3' },
  { name: 'Partidos', id: '4' },
];
beforeEach(() => {
  props = {
    onChange: jest.fn(),
    filterTypes,
  };
  emptyProps = {
    filterTypes: [],
  };
});

describe('FilterTabMenu tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<FilterTabMenu {...props} />);
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find('.filterList').children()).toHaveLength(5);
    expect(wrapper.find('option')).toHaveLength(5);
  });
  it('should render empty if filter array is empty', () => {
    const wrapper = shallow(<FilterTabMenu {...emptyProps} />);
    expect(wrapper.find('.container')).toHaveLength(0);
  });
  it('calls onChange prop when from handleChange', () => {
    const wrapper = shallow(<FilterTabMenu {...props} />);
    const onChangeSpy = jest.spyOn(props, 'onChange');
    wrapper.find('.key0').simulate('press', event);
    expect(onChangeSpy).toHaveBeenCalledWith(event, filterTypes[0]);
  });
  it('handles onchange on native select and call onChange prop', () => {
    const wrapper = shallow(<FilterTabMenu {...props} />);
    const onChangeSpy = jest.spyOn(props, 'onChange');
    expect(wrapper.find('select').props().value).toBe('0');
    wrapper.find('select').simulate('change', event);
    expect(wrapper.find('select').props().value).toBe('0');
    expect(onChangeSpy).toHaveBeenCalledWith(event, filterTypes[0]);
  });
  it('call onChange prop on native select with default callback', () => {
    const wrapper = mount(<FilterTabMenu filterTypes={filterTypes} />);
    wrapper.find('select').simulate('change', event);
    expect(wrapper.find('select').props().value).toBe('0');
  });
  it('sets activeFilter prop', () => {
    const wrapper = mount(<FilterTabMenu {...props} activeFilter="2" />);
    expect(wrapper.find('select').props().value).toBe('2');
  });
  it('sets activeFilter prop ', () => {
    const wrapper = mount(<FilterTabMenu {...props} activeFilter="10" />);
    expect(wrapper.find('select').props().value).toBe('0');
  });
});
