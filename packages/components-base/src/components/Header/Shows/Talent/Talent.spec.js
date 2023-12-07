import React from 'react';
import { shallow } from 'enzyme';

import Talent from '.';
import mockData from './__data__/mock.json';

describe('Talent component suite', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Talent {...mockData.rosariotijeras} />);
    expect(wrapper.find('.wrapper')).toBeDefined();
  });

  it('should not render premio los nuestro buttons since it is inactive', () => {
    const wrapper = shallow(<Talent {...mockData.pln} />);
    expect(wrapper.find('.wrapper')).toBeDefined();
    expect(wrapper.find('ButtonShowEvents')).toHaveLength(0);
  });

  it('should render latin america music awards buttons since it is active', () => {
    const wrapper = shallow(<Talent {...mockData.amas} />);
    expect(wrapper.find('.wrapper')).toBeDefined();
    expect(wrapper.find('ButtonShowEvents')).toHaveLength(1);
  });

  it('should not render a style prop', () => {
    const data = {
      ...mockData.alpunto,
      background: null,
      backgroundColor: null,
    };
    const wrapper = shallow(<Talent {...data} />);
    expect(wrapper.find('.wrapper').prop('style')).toEqual({});
  });
});
