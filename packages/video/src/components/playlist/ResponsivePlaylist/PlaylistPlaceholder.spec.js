import React from 'react';
import { shallow } from 'enzyme';

import PlaylistPlaceholder from './PlaylistPlaceholder';

describe('PlaylistPlaceholder', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<PlaylistPlaceholder />);

    expect(wrapper.find('Loading')).toHaveLength(1);
    expect(wrapper.find('PlaylistPlaceholder')).toHaveLength(5);
  });

  it('should set maxHeight in the loading container', () => {
    const wrapper = shallow(<PlaylistPlaceholder maxHeight={10} />);

    expect(wrapper.find('.loading').get(0).props.style).toEqual({ maxHeight: 10 });
  });
});
