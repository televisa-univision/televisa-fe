import React from 'react';
import { shallow } from 'enzyme';

import NextSlideshowClue from '.';

/** @test {NextSlideshowClue} */
describe('NextSlideshowClue ', () => {
  const props = {
    className: '',
    title: 'title',
    image: {
      type: 'image type',
      title: 'image title',
      caption: 'image caption',
      renditions: {},
    },
    onClick: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<NextSlideshowClue {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should have onClick prop be null if passed onClick prop is not a valid function', () => {
    const wrapper = shallow(<NextSlideshowClue {...props} onClick={null} />);
    expect(wrapper.props().onClick).toBe(null);
  });
});
