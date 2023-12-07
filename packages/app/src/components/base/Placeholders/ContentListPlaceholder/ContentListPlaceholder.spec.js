import React from 'react';
import { shallow } from 'enzyme';

import { Placeholder, mapStateToProps } from '.';

describe('Placeholder', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Placeholder label="Test" theme={{}} />);
    expect(wrapper.find('.preloader').length).toBe(1);
  });
});

describe('mapStateProps', () => {
  it('should return the expected theme', () => {
    const props = mapStateToProps({ page: { theme: {} } });
    expect(props.theme).toEqual({});
  });
});
