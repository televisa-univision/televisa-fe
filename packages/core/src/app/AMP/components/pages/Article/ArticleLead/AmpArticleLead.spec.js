import React from 'react';
import { shallow } from 'enzyme';

import AmpInlineSlideshow from '../../HorizontalSlideshow/Layouts/Inline/AmpInlineSlideshow';
import AmpVideo from '../../../widgets/Video/AmpVideo';
import AmpInlineImage from '../../../enhancements/image/AmpInlineImage';

import ArticleLead from './AmpArticleLead';

jest.mock('../../../widgets/Video/AmpVideo', () => jest.fn());
jest.mock('../../../enhancements/image/AmpInlineImage', () => jest.fn());

let props;
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

describe('ArticleBody tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.find(AmpInlineImage)).toHaveLength(1);
  });

  it('does not render children for unknown lead types', () => {
    props.lead.type = null;
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('handles video leads', () => {
    props.lead.type = 'video';
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.find(AmpVideo)).toHaveLength(1);
  });

  it('handles slideshow leads', () => {
    props.lead.type = 'slideshow';
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.find(AmpInlineSlideshow)).toHaveLength(1);
  });
});
