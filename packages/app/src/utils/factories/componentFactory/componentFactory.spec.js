import React from 'react';
import { shallow } from 'enzyme';

import getComponent from '.';

describe('getComponent', () => {
  it('should return null if not have type data', () => {
    expect(getComponent()).toBeNull();
  });

  it('should return null if invalid data', () => {
    expect(getComponent({ type: 'test' })).toBeNull();
  });

  it('should return Article if valid data', () => {
    const Component = getComponent({ component: 'Header', props: {} });

    const wrapper = shallow(
      <div>
        {Component}
      </div>,
    );

    expect(wrapper.find('Navigation')).toBeDefined();
  });
});
