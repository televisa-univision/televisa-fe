import React from 'react';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

import AmpInlineSlideshow from '../../HorizontalSlideshow/Layouts/Inline';
import AmpVideo from '../../../Video';
import AmpInlineImage from '../enhancements/Image';

import ArticleLead from '.';

jest.mock('../../../Video', () => jest.fn());
jest.mock('../enhancements/Image', () => jest.fn());

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
  jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
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
