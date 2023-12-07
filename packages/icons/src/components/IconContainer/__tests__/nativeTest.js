import React from 'react';
import { render } from '@testing-library/react';

import IconContainer from '..';

module.exports = () => {
  it('should return the icon loader', () => {
    const wrapper = render(<IconContainer iconName="phone" />);

    expect(wrapper.container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('should return null if not found icon', () => {
    const wrapper = render(<IconContainer iconName="phoneNotFound" />);

    expect(wrapper.container.querySelectorAll('svg')).toHaveLength(0);
  });
};
