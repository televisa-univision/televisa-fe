import React from 'react';
import { shallow, mount } from 'enzyme';

import AmpArticleEnhancement from '.';

let props;
beforeEach(() => {
  props = {
    title: 'article title',
    uri: 'http://google.com',
    image: null,
    sharing: {},
  };
});

describe('AmpArticleEnhancement tests', () => {
  it('renders as expected', () => {
    const wrapper = mount(<AmpArticleEnhancement {...props} />);
    expect(wrapper.find('RelatedArticlestyles__RelatedArticle')).toHaveLength(1);
    expect(wrapper.find('RelatedArticlestyles__Separator')).toHaveLength(1);
  });

  it('renders a Picture if image is provided', () => {
    props.image = {
      renditions: {
        original: 'image.jpg',
      },
    };
    const wrapper = shallow(<AmpArticleEnhancement {...props} />);
    expect(wrapper.find('amp-img')).toHaveLength(1);
  });
});
