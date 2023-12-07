import React from 'react';
import { shallow } from 'enzyme';

import VideoWithPlaylist from '.';

describe('VideoWithPlaylist placeholder', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<VideoWithPlaylist />);

    expect(wrapper.find('VideoWithPlaylist__Container')).toHaveLength(1);
    expect(wrapper.find('VideoWithPlaylist__TitleBar')).toHaveLength(1);
    expect(wrapper.find('VideoWithPlaylist__TitleContainer')).toHaveLength(1);
    expect(wrapper.find('VideoWithPlaylist__VideoPlaceholder')).toHaveLength(1);
    expect(wrapper.find('PlaylistPlaceholder')).toHaveLength(1);
  });
});
