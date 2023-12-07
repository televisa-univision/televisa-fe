import React from 'react';
import { shallow, mount } from 'enzyme';

import Grid from '.';

describe('CardsCarousel placeholder', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<Grid />);

    expect(wrapper.find('Grid__TitleBar')).toHaveLength(1);
    expect(wrapper.find('Grid__TitleContainer')).toHaveLength(1);
    expect(wrapper.find('Grid__Container')).toHaveLength(1);
    expect(wrapper.find('Grid__Card')).toHaveLength(5);
  });

  it('should render square card for the first item and rectangle for the rest', () => {
    const wrapper = shallow(<Grid />);

    expect(wrapper.find('Grid__Card').at(0).props().type).toEqual('square');
    expect(wrapper.find('Grid__Card').at(1).props().type).toEqual('rectangle');
    expect(wrapper.find('Grid__Card').at(2).props().type).toEqual('rectangle');
    expect(wrapper.find('Grid__Card').at(3).props().type).toEqual('rectangle');
    expect(wrapper.find('Grid__Card').at(4).props().type).toEqual('rectangle');
  });

  it('should return the correct position for the first card', () => {
    const wrapper = mount(<Grid />);

    expect(wrapper.find('Grid__Card').first()).toHaveStyleRule(
      'grid-column',
      '1 / 2',
      {
        media: '(min-width:1024px)',
      }
    );
  });
});
