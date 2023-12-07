import React from 'react';
import { shallow } from 'enzyme';

import SlideshowMetadata from '.';

/** @test {SlideshowMetadata} */
describe('SlideshowMetadata Spec', () => {
  it('should render all the metadata with zero slides', () => {
    const props = {
      page: {
        slides: [],
      },
    };
    const wrapper = shallow(<SlideshowMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(2);
  });

  it('should render all the metadata with no slides', () => {
    const props = {
      page: {
      },
    };
    const wrapper = shallow(<SlideshowMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(2);
  });

  it('should render all the metadata with image', () => {
    const props = {
      page: {
        slides: [
          { image: { renditions: { original: {} } } },
        ],
      },
    };
    const wrapper = shallow(<SlideshowMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(7);
  });

  it('should render all the metadata with content', () => {
    const props = {
      page: {
        slides: [
          { content: { renditions: { original: {} } } },
        ],
      },
    };
    const wrapper = shallow(<SlideshowMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(7);
  });

  it('should render all the metadata with video', () => {
    const props = {
      page: {
        slides: [
          { content: { image: { renditions: { original: {} } } } },
        ],
      },
    };
    const wrapper = shallow(<SlideshowMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(7);
  });
});
