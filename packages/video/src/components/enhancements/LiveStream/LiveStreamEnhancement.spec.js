import React from 'react';
import { shallow } from 'enzyme';

import LiveStreamEnhancement from '.';

jest.mock('@univision/fe-video/dist/components/LiveStream', () => jest.fn());

describe('LiveStreamEnhancement', () => {
  it('should render a full-width LiveStream with caption', () => {
    const wrapper = shallow(<LiveStreamEnhancement isFullWidth title="test" />);
    expect(wrapper.find('FullWidth')).toHaveLength(1);
    expect(wrapper.find('Caption')).toHaveLength(1);
  });

  it('should render non-full-width LiveStream without caption', () => {
    const wrapper = shallow(<LiveStreamEnhancement />);
    expect(wrapper.find('FullWidth')).toHaveLength(0);
    expect(wrapper.find('Caption')).toHaveLength(0);
  });
});
