import React from 'react';
import { render } from 'enzyme';

import RichText from '.';

describe('RichText', () => {
  it('should render properly for a string value', () => {
    const wrapper = render(<RichText html="<p>Test</p>" />);
    expect(wrapper.text()).toBe('Test');
  });

  it('should render properly for a node value', () => {
    const node = (
      <p>
        <b>Test</b>
      </p>
    );
    const wrapper = render(<RichText html={node} />);
    expect(wrapper.text().trim()).toBe('Test');
  });
});
