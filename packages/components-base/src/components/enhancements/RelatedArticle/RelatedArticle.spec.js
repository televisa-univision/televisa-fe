import React from 'react';
import { shallow } from 'enzyme';

import LazyLoad from 'react-lazyload';

import features from '@univision/fe-commons/dist/config/features';

import Picture from '../../Picture';
import ShareButton from '../../ShareButton';
import Button from '../../Button';

import RelatedArticle from '.';

jest.mock('../../Button', () => jest.fn());
jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());
jest.mock('../../ShareButton', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    title: 'article title',
    uri: 'http://google.com',
    image: null,
    sharing: {},
  };
});

describe('RelatedArticle tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<RelatedArticle {...props} />);
    expect(wrapper.find('.relatedArticle')).toHaveLength(1);
  });

  it('renders a Picture if image is provided', () => {
    props.image = {
      renditions: {
        original: 'image.jpg',
      },
    };
    const wrapper = shallow(<RelatedArticle {...props} />);
    expect(wrapper.find(Picture)).toHaveLength(1);
  });

  it('toggleShare updates state as expected', () => {
    const wrapper = shallow(<RelatedArticle {...props} />);
    wrapper.find(Button).simulate('click');
    expect(wrapper.state('showShare')).toBe(true);
    expect(wrapper.find('.shareActive')).toHaveLength(1);
    expect(wrapper.find(ShareButton)).toHaveLength(3);
  });

  it('adds pull left/right class', () => {
    props.alignment = 'left';
    const wrapper = shallow(<RelatedArticle {...props} />);
    expect(wrapper.find('.pull-left')).toHaveLength(1);
  });

  it('uses lazyload by default', () => {
    props.image = {
      renditions: {
        original: 'image.jpg',
      },
    };
    const wrapper = shallow(<RelatedArticle {...props} />);
    expect(wrapper.find(LazyLoad)).toHaveLength(1);
  });

  it('does not use lazyload', () => {
    props.image = {
      renditions: {
        original: 'image.jpg',
      },
    };
    props.lazyLoad = false;
    const wrapper = shallow(<RelatedArticle {...props} />);
    expect(wrapper.find(LazyLoad)).toHaveLength(0);
  });

  it('toggleShare should take value from props', () => {
    props.showShare = true;
    const wrapper = shallow(<RelatedArticle {...props} />);
    expect(wrapper.state('showShare')).toBe(true);
    expect(wrapper.find('.shareActive')).toHaveLength(1);
    expect(wrapper.find(ShareButton)).toHaveLength(3);
  });
  it('should have isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = shallow(<RelatedArticle {...props} />);
    expect(wrapper.find(ShareButton)).toHaveLength(0);
  });
});
