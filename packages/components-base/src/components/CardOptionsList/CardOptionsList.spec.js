import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';

import CardOptionsList, { CardOptionsWrapper } from '.';

describe('CardOptionsList suite', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardOptionsList />, div);
  });
  it('should render with 2 options', () => {
    const wrapper = mount(
      <CardOptionsList>
        <span>Option 1</span>
        <strong>Option 2</strong>
      </CardOptionsList>
    );
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find(CardOptionsWrapper).props().children).toHaveLength(2);
  });
});
