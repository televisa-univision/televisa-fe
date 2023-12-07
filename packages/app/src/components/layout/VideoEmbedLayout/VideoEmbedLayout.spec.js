import React from 'react';
import { shallow } from 'enzyme';

import VideoEmbedLayout from '.';

const pageData = {
  data: {},
  theme: {},
};

// Mocks
/**
 * @test {UvnLayout}
 */
describe('VideoEmbedLayout test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <VideoEmbedLayout pageData={pageData} />
    );
    expect(wrapper.find('PageHead')).toBeDefined();
    expect(wrapper.find('EmbeddedVideo')).toBeDefined();
  });
});
