import React from 'react';
import { shallow, mount } from 'enzyme';

import ArticleMetadata from './ArticleMetadata';

/** @test {ArticleMetadata} */
describe('ArticleMetadata Spec', () => {
  it('should render all the metadata without enhancements', () => {
    const props = {
      page: {
        image: {
          renditions: { original: {} },
        },
      },
    };
    const wrapper = shallow(<ArticleMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(16);
  });

  it('should render all the metadata with video lead', () => {
    const props = {
      page: {
        image: {
          renditions: { original: {} },
        },
        lead: {
          type: 'video',
        },
      },
    };
    const wrapper = shallow(<ArticleMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(17);
  });

  it('should render all the metadata with slideshow lead', () => {
    const props = {
      page: {
        image: {
          renditions: { original: {} },
        },
        lead: {
          type: 'slideshow',
          slides: [],
        },
      },
    };
    const wrapper = shallow(<ArticleMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(16);
  });

  it('should render all the metadata with image lead', () => {
    const props = {
      page: {
        image: {
          renditions: { original: {} },
        },
        lead: {
          type: 'image',
          renditions: { original: {} },
        },
      },
    };
    const wrapper = shallow(<ArticleMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(19);
  });

  it('should ignore image lead without original rendition', () => {
    const props = {
      page: {
        image: {
          renditions: { original: {} },
        },
        lead: {
          type: 'image',
          renditions: {},
        },
      },
    };
    const wrapper = shallow(<ArticleMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(16);
  });

  it('should load taboola meta data without recommendations', () => {
    const props = {
      page: {
        adSettings: { disableTaboolaRecirculate: false },
        image: {
          renditions: { original: {} },
        },
        lead: {
          type: 'image',
          renditions: {},
        },
      },
    };
    const wrapper = shallow(<ArticleMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(16);
  });

  it('should not load taboola meta data without recommendations', () => {
    const props = {
      page: {
        adSettings: { disableTaboolaRecirculate: true },
        image: {
          renditions: { original: {} },
        },
        lead: {
          type: 'image',
          renditions: {},
        },
      },
    };
    const wrapper = shallow(<ArticleMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(17);
  });

  it('should render all the metadata with enhancements', () => {
    const props = {
      page: {
        authors: [{}],
        image: {
          renditions: { original: {} },
        },
        lead: {
          type: 'without-meta',
        },
        body: [
          {
            type: 'text',
          },
          {
            type: 'enhancement',
            objectData: {
              type: 'quote',
            },
          },
          {
            type: 'enhancement',
            objectData: {
              type: 'image',
              renditions: {
                original: {},
              },
            },
          },
          {
            type: 'enhancement',
            objectData: {
              type: 'image',
              renditions: null,
            },
          },
          {
            type: 'enhancement',
            objectData: {
              type: 'image',
              renditions: {},
            },
          },
          {
            type: 'enhancement',
            objectData: {
              type: 'slideshow',
              slides: [],
            },
          },
          {
            type: 'enhancement',
            objectData: {
              type: 'video',
            },
          },
        ],
      },
    };
    const wrapper = mount(<ArticleMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(24);
  });
});
