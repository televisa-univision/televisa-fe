import React from 'react';
import { shallow } from 'enzyme';

import LiveBlogMetadata from './LiveBlogMetadata';

/** @test {LiveBlogMetadata} */
describe('LiveBlogMetadata Spec', () => {
  it('should render all the metadata without enhancements', () => {
    const props = {
      page: {
        source: 'uni',
        authors: [{
          name: 'name',
        }],
        posts: [
          {
            image: {
              renditions: { original: {} },
            },
            authors: [{
              name: 'name',
            }],
            body: {
            },
          },
        ],
        image: {
          renditions: { original: {} },
        },
      },
    };
    const wrapper = shallow(<LiveBlogMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(23);
  });

  it('should render all the metadata with a slideshow post', () => {
    const props = {
      page: {
        source: 'uni',
        authors: [{
          name: 'name',
        }],
        posts: [
          {
            body: {
              referentialText: [
                {
                  type: 'enhancement',
                  enhancementData: {},
                  objectData: {
                    type: 'slideshow',
                  },
                },
              ],
            },
          },
        ],
        image: {
          renditions: { original: {} },
        },
      },
    };
    const wrapper = shallow(<LiveBlogMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(21);
  });

  it('should render all the metadata with a image post', () => {
    const props = {
      page: {
        source: 'uni',
        authors: [{
          name: 'name',
        }],
        posts: [
          {
            body: {
              referentialText: [
                {
                  type: 'enhancement',
                  enhancementData: {},
                  objectData: {
                    type: 'image',
                    renditions: { original: {} },
                    title: 'test',
                  },
                },
              ],
            },
          },
        ],
        image: {
          renditions: { original: {} },
        },
      },
    };
    const wrapper = shallow(<LiveBlogMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(26);
  });

  it('should render all the metadata with a image post and no renditions', () => {
    const props = {
      page: {
        source: 'uni',
        authors: [{
          name: 'name',
        }],
        posts: [
          {
            body: {
              referentialText: [
                {
                  type: 'enhancement',
                  enhancementData: {},
                  objectData: {
                    type: 'image',
                  },
                },
              ],
            },
          },
        ],
        image: {
          renditions: { original: {} },
        },
      },
    };
    const wrapper = shallow(<LiveBlogMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(21);
  });

  it('should render all the metadata with a video post', () => {
    const props = {
      page: {
        source: 'uni',
        authors: [{
          name: 'name',
        }],
        posts: [
          {
            body: {
              referentialText: [
                {
                  type: 'enhancement',
                  enhancementData: {},
                  objectData: {
                    type: 'video',
                    title: 1,
                    description: 'desc',
                  },
                },
              ],
            },
          },
        ],
        image: {
          renditions: { original: {} },
        },
      },
    };
    const wrapper = shallow(<LiveBlogMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(21);
  });

  it('should render all the metadata without posts', () => {
    const props = {
      page: {
        source: 'uni',
      },
    };
    const wrapper = shallow(<LiveBlogMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(6);
  });

  it('should render all the metadata with referential text and no enhancemnets', () => {
    const props = {
      page: {
        source: 'uni',
        authors: [{
          name: 'name',
        }],
        posts: [
          {
            image: {
              renditions: { original: {} },
            },
            authors: [{
              name: 'name',
            }],
            body: {
              referentialText: [
                { type: 'text', value: 'a' },
              ],
            },
          },
        ],
        image: {
          renditions: { original: {} },
        },
      },
    };
    const wrapper = shallow(<LiveBlogMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(25);
  });

  it('should render all the metadata with no allowed type of enhancements', () => {
    const props = {
      page: {
        source: 'uni',
        authors: [{
          name: 'name',
        }],
        posts: [
          {
            image: {
              renditions: { original: {} },
            },
            authors: [{
              name: 'name',
            }],
            title: 'Las elecciones de Chicago están a un resultado de volver a hacer historia: puede lograrse un récord de hispanos en el Concilio',
            body: {
              referentialText: [
                {
                  type: 'enhancement',
                  enhancementData: {},
                  objectData: {
                    type: 'text',
                    title: 'Las elecciones de Chicago están a un resultado de volver a hacer historia: puede lograrse un récord de hispanos en el Concilio',
                    description: 'desc',
                  },
                },
              ],
            },
          },
        ],
        image: {
          renditions: { original: {} },
        },
      },
    };
    const wrapper = shallow(<LiveBlogMetadata {...props} />);
    expect(wrapper.find('meta')).toHaveLength(25);
  });
});
