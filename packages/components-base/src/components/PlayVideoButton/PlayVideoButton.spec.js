import React from 'react';
import { shallow } from 'enzyme';

import PlayVideoButton from '.';

let props;
beforeEach(() => {
  props = {
    onClick: jest.fn(),
  };
});

describe('PlayVideoButton tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<PlayVideoButton {...props} />);
    expect(wrapper.find('.playBtn')).toHaveLength(1);
  });

  it('renders duration if avaialble', () => {
    props.duration = '0:45';
    const wrapper = shallow(<PlayVideoButton {...props} />);
    expect(wrapper.find('span').text()).toContain('0:45');
  });
});
