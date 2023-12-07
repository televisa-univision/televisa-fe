import React from 'react';
import { shallow } from 'enzyme';
import ContentListPlaceholder from './ContentListPlaceholder';

describe('ContentListPlaceholder', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<ContentListPlaceholder label="Test" />);
    expect(wrapper.find('.preloader').length).toBe(1);
  });
});
