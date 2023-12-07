import React from 'react';
import { shallow } from 'enzyme';

import EmbeddedVideo from './index';

/** @test {EmbeddedVideo} */
describe('EmbeddedVideo Spec', () => {
  const pageData = {
    data: {
      image: {
        renditions: {},
      },
    },
    requestParams: {},
  };
  it('should render a video player', () => {
    const wrapper = shallow(<EmbeddedVideo pageData={pageData} />);
    expect(wrapper.find('VideoPlayer')).toBeDefined();
    expect(wrapper.find('VideoPlayer').props().autoplay).toBe('viewable');
  });

  it('should render a livestream player if embedId and livestreamId exist', () => {
    const props = {
      pageData: {
        data: {
          image: { renditions: {} },
          livestreamId: 1,
          adSettings: { targeting: {} },
        },
        requestParams: {
          eid: '123',
        },
      },
    };
    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find('LiveStream')).toBeDefined();
  });

  it('should render a player without autoplay', () => {
    const props = {
      pageData: {
        ...pageData,
        requestParams: {
          autoplay: 'false',
        },
      },
    };
    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find('VideoPlayer').props().autoplay).toBe(false);
  });
});
