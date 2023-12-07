import React from 'react';
import { mount } from 'enzyme';

import PreMatchTitle from '.';

let props;
beforeEach(() => {
  props = {
    title: 'Test title'
  };
});

describe('PreMatchTitle tests', () => {
  it('renders as expected', () => {
    const wrapper = mount(<PreMatchTitle {...props} />);
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
    expect(wrapper.find('TitleWrapper')).toHaveLength(1);
  });
});
