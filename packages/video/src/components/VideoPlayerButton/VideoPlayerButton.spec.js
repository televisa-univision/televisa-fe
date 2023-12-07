import React from 'react';
import { shallow } from 'enzyme';
import Button from '@univision/fe-components-base/dist/components/Button';
import Icon from '@univision/fe-icons/dist/components/Icon';

import VideoPlayerButton from '.';

describe('VideoPlayerButton', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<VideoPlayerButton />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Icon)).toHaveLength(1);
  });
});
