import React from 'react';
import { mount } from 'enzyme';

import InlineImagePlaceholder from '.';

describe('InlineImagePlaceholder tests', () => {
  it('renders as expected', () => {
    const wrapper = mount(<InlineImagePlaceholder />);
    expect(wrapper.find('Picture')).toHaveLength(1);
    expect(wrapper.find('CaptionWrapper')).toHaveLength(1);
  });
});
