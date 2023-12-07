import React from 'react';
import { shallow } from 'enzyme';

import Quote from '.';

let props;
beforeEach(() => {
  props = {
    text: 'this is a quote',
    type: 'blockquote',
  };
});

describe('Quote tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Quote {...props} />);
    expect(wrapper.find('.blockquote')).toHaveLength(1);
  });
});
