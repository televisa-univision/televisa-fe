import React from 'react';
import { mount } from 'enzyme';

import PlaylistPlaceholder from '.';

describe('PlaylistPlaceholder test', () => {
  it('should renders as expected', () => {
    const wrapper = mount(<PlaylistPlaceholder />);

    expect(wrapper.find('Loading')).toHaveLength(1);
    expect(wrapper.find('.item')).toHaveLength(5);
    expect(wrapper.find('PlaylistPlaceholder__LoadingStyled')).toHaveStyleRule('max-height', '190px');
  });

  it('should set maxHeight in the loading container', () => {
    const wrapper = mount(<PlaylistPlaceholder maxHeight={10} />);

    expect(wrapper.find('PlaylistPlaceholder__LoadingStyled')).toHaveStyleRule('max-height', '10px');
  });
});
