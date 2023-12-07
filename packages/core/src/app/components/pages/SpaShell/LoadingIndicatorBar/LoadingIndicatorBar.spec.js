import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicatorBar from '.';

describe('LoadingIndicatorBar', () => {
  it('should render when loading', () => {
    const wrapper = shallow(<LoadingIndicatorBar loading />);
    expect(wrapper.find('.loader')).toHaveLength(1);
  });
  it('should render null if not loading', () => {
    const wrapper = shallow(<LoadingIndicatorBar loading={false} />);
    expect(wrapper.find('.loader')).toHaveLength(0);
  });
});
