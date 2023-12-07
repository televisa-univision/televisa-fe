import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import DFPAd from '@univision/fe-commons/dist/components/ads/dfp/DFPAd';

import Quote from '@univision/fe-components-base/dist/components/enhancements/Quote';
import HorizontalSlideshow from '../../HorizontalSlideshow/Layouts/Inline';
import AmpVideo from '../../../Video';
import AmpInlineImage from '../enhancements/Image';
import AmpArticleEnhancement from '../enhancements/RelatedArticle';

import { VideoCaption, Blockquote, Pullquote } from './ArticleChunk.styles';
import ArticleChunk, { getEnhancement } from '.';

const store = configureStore();

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getTheme: jest.fn(() => ({ primary: 'blue' })),
  getPageData: jest.fn(() => ({})),
}));
jest.mock('../../../Video', () => () => <div>test</div>);
jest.mock('../../HorizontalSlideshow/Layouts/Inline', () => jest.fn());

/**
 * WrapperComponent
 * @prop {children} component children
 * @returns {JSX}
 */
const WrapperComponent = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

WrapperComponent.propTypes = {
  children: PropTypes.node,
};

let props;
beforeEach(() => {
  props = {
    type: 'text',
    value: 'hello!',
    article: {
      uid: '',
      title: '',
      primaryTag: {},
    },
  };
});

describe('ArticleBody tests', () => {
  it('should render a text chunk when available', () => {
    const wrapper = mount(<WrapperComponent><ArticleChunk {...props} /></WrapperComponent>);
    expect(wrapper.find('div').html()).toContain('hello!');
  });

  it('should default to null for unexpected chunk types', () => {
    props.type = null;
    const wrapper = mount(<WrapperComponent><ArticleChunk {...props} /></WrapperComponent>);
    expect(wrapper.find('ArticleChunk').children().length).toEqual(0);
  });
  it('should return DFPAd component in value', () => {
    props = {
      type: 'ad',
      value: <DFPAd />,
    };
    const wrapper = shallow(<WrapperComponent><ArticleChunk {...props} /></WrapperComponent>);
    expect(wrapper.find('DFPAd')).toBeDefined();
  });

  it('should call getEnhancement for "enhancement" image type', () => {
    props.type = 'enhancement';
    props.objectData = {
      type: 'image',
      renditions: {},
    };
    props.enhancementData = {};

    const wrapper = mount(<WrapperComponent><ArticleChunk {...props} /></WrapperComponent>);
    expect(wrapper.find(AmpInlineImage)).toHaveLength(1);
  });

  it('should call getEnhancement for "enhancement" video type', () => {
    props.type = 'enhancement';
    props.objectData = {
      type: 'video',
    };
    props.enhancementData = {};

    const wrapper = mount(<WrapperComponent><ArticleChunk {...props} /></WrapperComponent>);
    expect(wrapper.find(AmpVideo)).toHaveLength(1);
  });

  it('should call getEnhancement for "enhancement" quoteenhancement type', () => {
    props.type = 'enhancement';
    props.objectData = {
      type: 'quoteenhancement',
    };
    props.enhancementData = { quoteType: { name: 'blockquote' } };

    const wrapper = mount(<WrapperComponent><ArticleChunk {...props} /></WrapperComponent>);
    expect(wrapper.find(Quote)).toHaveLength(1);
  });
});

describe('getEnhancement tests', () => {
  let objectData;
  let enhancementData;
  beforeEach(() => {
    objectData = {
      type: 'image',
    };
    enhancementData = {};
  });
  it('returns null for unknown types', () => {
    objectData.type = 'something else';
    const component = getEnhancement({ objectData });
    expect(component).toEqual(null);
  });

  it('returns an InlineImage', () => {
    objectData.type = 'image';
    objectData.renditions = {};
    const component = getEnhancement({ objectData, enhancementData: { alignment: 'left' } });
    expect(component.type).toEqual(AmpInlineImage);
  });

  it('returns a Slideshow', () => {
    objectData.type = 'slideshow';
    const component = getEnhancement({ objectData });
    expect(component.type).toEqual(HorizontalSlideshow);
  });

  it('returns a Video', () => {
    objectData.type = 'video';
    const component = getEnhancement({ objectData });
    expect(component.props.children[0].type).toEqual(AmpVideo);
  });

  it('should return a video with caption', () => {
    objectData.type = 'video';
    objectData.title = 'title';
    const component = getEnhancement({ objectData });
    expect(component.props.children[0].type).toEqual(AmpVideo);
    expect(component.props.children[1].type).toEqual(VideoCaption);
  });

  it('returns a RelatedArticle', () => {
    objectData.type = 'article';
    objectData.uri = '';
    objectData.title = '';
    const component = getEnhancement({ objectData, enhancementData: { alignment: 'left' } }, {}, { primary: 'blue' });
    expect(component).toEqual(<AmpArticleEnhancement {...objectData} theme={{ primary: 'blue' }} />);
  });

  it('returns a Quote', () => {
    objectData.type = 'quoteenhancement';
    enhancementData = {
      text: 'a quote',
      quoteType: {
        name: 'PULLQUOTE',
      },
    };
    let component = getEnhancement({ objectData, enhancementData });
    expect(component.type).toEqual(Pullquote);

    enhancementData.quoteType.name = 'blockquote';
    component = getEnhancement({ objectData, enhancementData });
    mount(component);
    expect(component.type).toEqual(Blockquote);
  });

  it('returns raw content for rawhtml enhancements', () => {
    objectData.type = 'rawhtml';
    objectData.html = '<div>hello</div>';

    const component = getEnhancement({ objectData });
    expect(component.props.html).not.toEqual(null);

    objectData.html = undefined;
    const component2 = getEnhancement({ objectData });
    expect(component2).toEqual(null);
  });

  it('returns raw content for externalcontent enhancements', () => {
    objectData.type = 'externalcontent';
    objectData.responseData = {
      html: '<div>external</div>',
    };
    const component = getEnhancement({ objectData });
    expect(component.props.html).not.toEqual(null);

    objectData.responseData = {};
    const component2 = getEnhancement({ objectData });
    expect(component2).toEqual(null);

    objectData.responseData = {
      _url: 'test',
    };
    const component3 = getEnhancement({ objectData });
    expect(component3.props.html).not.toEqual(null);
  });
});
