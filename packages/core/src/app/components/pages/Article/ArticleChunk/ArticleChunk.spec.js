import React from 'react';
import { shallow } from 'enzyme';
import Loadable from 'react-loadable';

import DFPAd from '@univision/fe-commons/dist/components/ads/dfp/DFPAd';

import InlineImage from '@univision/fe-components-base/dist/components/enhancements/InlineImage';
import RawHtmlContainer from '@univision/fe-components-base/dist/components/enhancements/RawHtmlContainer';
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';

import ArticleChunk, { getEnhancement } from './ArticleChunk';

jest.mock('react-lazyload', () => jest.fn(props => <div>{props.children}</div>));
jest.mock('@univision/fe-commons/dist/components/LazyLoad', () => jest.fn(props => <div>{props.children()}</div>));
jest.mock('@univision/fe-video/dist', () => jest.fn());
jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getConfig: jest.fn(),
  getTheme: jest.fn(() => ({ primary: 'blue' })),
  getPageData: jest.fn(() => ({})),
  getRequestParams: jest.fn(() => ({})),
  hasFeatureFlag: jest.fn(() => false),
  getSites: jest.fn(() => ([])),
  isSpa: jest.fn(() => true),
}));

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
    const wrapper = shallow(<ArticleChunk {...props} />);
    expect(wrapper.find('div').html()).toContain('hello!');
  });

  it('should default to null for unexpected chunk types', () => {
    props.type = null;
    const wrapper = shallow(<ArticleChunk {...props} />);
    expect(wrapper.getElement()).toEqual(null);
  });

  it('should return DFPAd component in value', () => {
    props = {
      type: 'ad',
      value: <DFPAd />,
    };
    const wrapper = shallow(<ArticleChunk {...props} />);
    expect(wrapper.find('DFPAd')).toBeDefined();
  });

  it('should add a class name to H3 elements', () => {
    props.value = '<h3>Hola!</h3>';
    const wrapper = shallow(<ArticleChunk {...props} />);
    expect(wrapper.props().className).toBe('h3Container');
  });
});

describe('getEnhancement tests', () => {
  let objectData;
  let enhancementData;
  beforeEach(() => {
    objectData = {
      type: 'image',
      renditions: {},
      uri: 'uri',
      title: 'title',
    };
    enhancementData = {};
  });

  it('returns null for unknown types', () => {
    objectData.type = 'something else';
    const component = getEnhancement({ objectData });
    expect(component).toEqual(null);
  });
  it('returns null for unknown types', () => {
    const component = getEnhancement({ });
    expect(component).toEqual(null);
  });

  it('returns an InlineImage', async () => {
    objectData.type = 'image';
    const enhancement = shallow(<div>{getEnhancement({ objectData, enhancementData: { alignment: 'left' } })}</div>);
    await Loadable.preloadAll();
    expect(enhancement
      .children().children().children()
      .dive()
      .type()).toEqual(InlineImage);
  });

  it('should return a Slideshow with server-side lazy loading', async () => {
    objectData.slides = null;
    objectData.type = 'slideshow';
    objectData.primaryTag = {
      foo: 'bar',
    };

    const enhancement = shallow(<div>{getEnhancement({ objectData })}</div>);
    await Loadable.preloadAll();
    expect(enhancement
      .children().dive()
      .children().children()
      .dive()
      .find('SlideshowWrapper')).toHaveLength(1);
  });

  it('should return a Slideshow with client-side lazy loading', async () => {
    objectData.slides = [{ image: {} }];
    objectData.type = 'slideshow';
    objectData.primaryTag = {
      foo: 'bar',
    };

    const enhancement = shallow(<div>{getEnhancement({ objectData })}</div>);
    await Loadable.preloadAll();
    expect(enhancement
      .children().dive()
      .children().children()
      .dive()
      .find('SlideshowWrapper')).toHaveLength(1);
  });

  it('returns a Video', async () => {
    objectData.type = 'video';

    const enhancement = shallow(getEnhancement({ objectData }));
    await Loadable.preloadAll();
    expect(enhancement.children().dive().find('VideoEnhancement')).toHaveLength(1);
  });

  it('should return a LiveStream', async () => {
    objectData.type = 'livestream';

    const enhancement = shallow(getEnhancement({ objectData }));
    await Loadable.preloadAll();
    expect(enhancement.children().dive().find('LiveStreamEnhancement')).toHaveLength(1);
  });

  it('returns a RelatedArticle', async () => {
    objectData.type = 'article';

    const enhancement = shallow(<div>{getEnhancement({ objectData, enhancementData: { alignment: 'left' } })}</div>);
    await Loadable.preloadAll();
    expect(enhancement.children().dive().find('RelatedArticle')).toHaveLength(1);
  });

  it('returns a Quote', async () => {
    objectData.type = 'quoteenhancement';
    enhancementData = {
      text: 'a quote',
      quoteType: {
        name: 'PULLQUOTE',
      },
    };
    const enhancement = shallow(<div>{getEnhancement({ objectData, enhancementData })}</div>);
    await Loadable.preloadAll();
    expect(enhancement.children().dive().find('Quote')).toHaveLength(1);

    enhancementData.quoteType.name = null;
    const enhancement2 = shallow(<div>{getEnhancement({ objectData, enhancementData })}</div>);
    await Loadable.preloadAll();
    expect(enhancement2.children().dive().find('Quote').prop('type')).not.toBeDefined();
  });

  it('returns raw content for rawhtml enhancements', () => {
    objectData.type = 'rawhtml';
    objectData.html = '<div>hello</div>';

    const component = getEnhancement({ objectData });
    expect(component).toEqual(<RawHtmlContainer html={objectData.html} />);

    objectData.html = undefined;
    const component2 = getEnhancement({ objectData });
    expect(component2).toEqual(null);
  });

  it('returns raw content for externalcontent enhancements', () => {
    objectData.type = 'externalcontent';
    objectData.responseData = {
      html: '<div>external</div>',
    };
    const enhancement = getEnhancement({ objectData, enhancementData });
    expect(enhancement).toEqual(<RawHtmlContainer
      html={objectData.responseData.html}
      settingsExternalContent={{ html: objectData.responseData.html }}
    />);

    objectData.responseData = null;
    const enhancement2 = getEnhancement({ objectData, enhancementData });
    expect(enhancement2).toEqual(<RawHtmlContainer html="" settingsExternalContent={{}} />);
  });

  it('does not use Loadable for non-lazy-loaded externalcontent', () => {
    objectData.type = 'externalcontent';
    objectData.lazyLoad = false;
    objectData.responseData = {
      html: '<div>external</div>',
    };
    const enhancement = shallow(<div>{getEnhancement({ objectData, enhancementData })}</div>);
    expect(enhancement.type()).toBe('div');
  });

  it('renders a full-width externalcontent', () => {
    objectData.type = 'externalcontent';
    objectData.lazyLoad = false;
    objectData.responseData = {
      html: '<div>external</div>',
      fullWidth: true,
    };
    const enhancement = shallow(<div>{getEnhancement({ objectData, enhancementData })}</div>);
    expect(enhancement.children().props().breakpoints).toEqual(['xxs', 'xs', 'sm', 'md', 'lg', 'xl']);
  });

  it('should track click on InlineImage', async () => {
    props.type = 'enhancement';
    props.objectData = {
      type: 'image',
      renditions: {},
    };
    props.enhancementData = {};
    const wrapper = shallow(<ArticleChunk {...props} />);
    await Loadable.preloadAll();
    getEnhancement({ objectData, enhancementData });
    spyOn(ArticleTracker, 'track');
    wrapper.children().children().children().dive()
      .simulate('click');
    expect(ArticleTracker.track).toBeCalled();
  });

  it('should track click on RelatedArticle', async () => {
    props.type = 'enhancement';
    props.objectData = {
      type: 'article',
      uri: 'uri',
      title: 'title',
    };
    props.enhancementData = {};

    const wrapper = shallow(<ArticleChunk {...props} />);
    await Loadable.preloadAll();
    getEnhancement({ objectData, enhancementData });
    spyOn(ArticleTracker, 'track');
    wrapper.dive().simulate('click');
    expect(ArticleTracker.track).toBeCalled();
  });

  it('should not track click on Slideshow', async () => {
    props.type = 'enhancement';
    props.objectData = {
      type: 'slideshow',
      primaryTag: {},
    };

    const wrapper = shallow(<ArticleChunk {...props} />);
    await Loadable.preloadAll();
    getEnhancement({ objectData, enhancementData });
    spyOn(ArticleTracker, 'track');
    wrapper
      .children().dive()
      .children().children()
      .dive()
      .simulate('click');
    expect(ArticleTracker.track).not.toBeCalled();
  });
});
