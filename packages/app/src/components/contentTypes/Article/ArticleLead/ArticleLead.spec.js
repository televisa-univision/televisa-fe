import React from 'react';
import { shallow, mount } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import ArticleLead, { getDynamicArticleLead } from '.';
import { InlineImagePlaceholder } from './leadTypes';

jest.mock('react-lazyload', () => jest.fn(props => <div>{props.children}</div>));
jest.mock('@univision/fe-commons/dist/components/LazyLoad', () => jest.fn(props => <div>{props.children()}</div>));
jest.mock('@univision/fe-video/dist', () => ({
  __esModule: true,
  default: <div />,
}));
jest.mock('../../HorizontalSlideshow/SlideshowWrapper');

describe('ArticleLead tests', () => {
  let props;

  beforeAll(async () => {
    await preloadAll();
  });

  beforeEach(() => {
    props = {
      lead: {
        type: 'image',
        renditions: {
          original: {
            href: 'image.jpg',
          },
        },
      },
    };
  });

  it('renders as expected', () => {
    const wrapper = mount(<ArticleLead {...props} />);
    expect(wrapper.find('InlineImage')).toHaveLength(1);
  });

  it('does not render children for unknown lead types', () => {
    props.lead.type = 'unknown';
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.find('[data-lead]')).toHaveLength(0);
  });

  it('handles video leads with autoplay on, when is first article', () => {
    props.lead.type = 'video';
    props.articleDepth = 1;
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.find('[data-lead="video"]').dive()).toHaveLength(1);
    expect(wrapper.find('[data-lead="video"]').prop('autoplay')).toBe(true);
  });

  it('handles video leads with autoplay off, when is not first article', () => {
    props.lead.type = 'video';
    props.articleDepth = 2;
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.find('[data-lead="video"]').prop('autoplay')).toBe(false);
  });

  it('should handles livestream leads', () => {
    props.lead.type = 'livestream';
    props.lead.enhancementData = {};
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.find('[data-lead="livestream"]').dive()).toHaveLength(1);
    expect(wrapper.find('[data-lead="livestream"]').prop('fullWidthSettings')).toEqual(['xxs', 'xs']);
  });

  it('should handles playlist leads', () => {
    const pageData = {
      data: {
        videoLeadRelatedContent: [{ mcpid: 123 }, { mcpid: 345 }],
      },
    };

    props.lead.type = 'video';
    const wrapper = shallow(<ArticleLead {...props} pageData={pageData} />);

    expect(wrapper.find('[data-lead="videoPlaylist"]').dive()).toHaveLength(1);
  });

  it('should handle slideshow leads with client-side lazy loading', () => {
    props.lead.type = 'slideshow';
    props.lead.slides = [{ image: {} }];
    const wrapper = shallow(<ArticleLead {...props} />);

    expect(wrapper.find('[data-lead="slideshow"]').dive()).toHaveLength(1);
    expect(wrapper.find('[data-lead="slideshow"]').prop('autoplay')).toBe(false);
  });

  it('should handle slideshow leads with server-side lazy loading', () => {
    props.lead.type = 'slideshow';
    props.lead.slides = null;
    const wrapper = mount(<ArticleLead {...props} />);

    expect(wrapper.children()).toHaveLength(1);
  });

  it('handles null leads', () => {
    props.lead = null;
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('handles default null leads', () => {
    const lead = getDynamicArticleLead();
    expect(lead).toEqual(null);
  });

  it('should render InlineImagePlaceholder as expected', () => {
    const wrapper = mount(<div><InlineImagePlaceholder /></div>);
    expect(wrapper.find('leadTypes__InlineImagePlaceholder')).toHaveLength(1);
  });
});
