import { mount, shallow } from 'enzyme';
import Loadable from 'react-loadable';
import {
  getPageData,
} from '@univision/fe-commons/dist/store/storeHelpers';
import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import * as pageFactory from './pageFactory';
import pageFactoryComponents from './pageFactoryComponents';

jest.mock('@univision/fe-commons/dist/config/features/content', () => ({
  isSpaEnabled: () => true,
  shouldForceSpa: () => false,
}));

const {
  mapPageTypeToBundleName,
  getCurrentPageType,
  getAssets,
  getPageComponent,
  getInlineCssPath,
} = pageFactory;

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getPageData: jest.fn(() => mockApiData),
  getSharingOptions: jest.fn(),
  getTheme: jest.fn(() => ({
    primary: 123,
  })),
  getDevice: jest.fn(),
  getPageCategory: jest.fn(),
  getRequestParams: jest.fn(() => ({})),
  getNavigationCount: jest.fn(() => 0),
  getBrandable: jest.fn(),
  isTopAdInserted: jest.fn(),
  getPageUrl: jest.fn(),
  getDeviceType: jest.fn(),
  getEntryByKey: jest.fn(),
  getContentType: jest.fn(),
  getSites: jest.fn(() => ({})),
  isVideoSDKReady: jest.fn(),
  isContentTypeAllowed: jest.fn(),
  isPrimaryTagEnabled: jest.fn(),
  isSpa: jest.fn(() => false),
  hasFeatureFlag: jest.fn(() => false),
  isDesktop: jest.fn(() => false),
}));

jest.mock('../../components/pages/Article/Article', () => ({
  __esModule: true,
  default: 'Article',
}));
jest.mock('../../components/pages/EmbeddedVideo/EmbeddedVideo', () => ({
  __esModule: true,
  default: 'EmbeddedVideo',
}));
jest.mock('../../components/pages/Section/Section', () => ({
  __esModule: true,
  default: 'Section',
}));
jest.mock('../../components/pages/HorizontalSlideshow/HorizontalSlideshow', () => ({
  __esModule: true,
  default: 'HorizontalSlideshow',
}));
jest.mock('../../components/pages/VerticalSlideshow/VerticalSlideshow', () => ({
  __esModule: true,
  default: 'VerticalSlideshow',
}));
jest.mock('../../components/pages/LiveBlog/LiveBlog', () => ({
  __esModule: true,
  default: 'LiveBlog',
}));
jest.mock('../../components/pages/LiveStream/LiveStreamPage', () => ({
  __esModule: true,
  default: 'LiveStreamPage',
}));
jest.mock('../../components/pages/ErrorPage/ErrorPage', () => ({
  __esModule: true,
  default: 'ErrorPage',
}));
jest.mock('../../components/pages/Search/Search', () => ({
  __esModule: true,
  default: 'Search',
}));
jest.mock('../../components/pages/SectionRadio/SectionRadio', () => ({
  __esModule: true,
  default: 'SectionRadio',
}));

const environment = process.env;

/** @test {pageFactory} */
describe('mapPageTypeToBundleName', () => {
  afterEach(() => {
    process.env = environment;
  });

  it('should return tag as default', () => {
    expect(mapPageTypeToBundleName({ type: 'test' })).toEqual('tag');
  });

  it('should return company section', () => {
    expect(mapPageTypeToBundleName({ type: 'company' })).toEqual('tag');
  });

  it('should return section', () => {
    const data = {
      type: 'section',
      primaryTopic: 'Entretenimiento',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('section');
  });

  it('should return sectionRadio', () => {
    const data = {
      type: 'section',
      sectionType: 'radiostation',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('sectionRadio');
  });

  it('should return section for category radio when "isNationalRadioShow" is true', () => {
    const data = {
      type: 'section',
      tracking: {
        tealium: {
          data: {
            portal_theme: 'local',
          },
        },
      },
      isNationalRadioShow: true,
      sourceStation: {
        a: 'b',
      },
    };
    expect(mapPageTypeToBundleName(data)).toEqual('section');
  });

  it('should return section', () => {
    const data = {
      type: 'section',
      sourceStation: {
        a: 'b',
      },
      isNationalRadioShow: true,
    };
    expect(mapPageTypeToBundleName(data)).toEqual('section');
  });

  it('should return section if Primary Topic is Deportes', () => {
    const data = {
      type: 'section',
      primaryTopic: 'Deportes',

    };
    expect(mapPageTypeToBundleName(data)).toEqual('section');
  });

  it('should return section for deportes category without "competitionId"', () => {
    const data = {
      type: 'section',
      tracking: {
        tealium: {
          data: {
            portal_theme: 'deportes',
          },
        },
      },
    };
    expect(mapPageTypeToBundleName(data)).toEqual('section');
  });

  it('should return section if type is "soccercompetition"', () => {
    const data = {
      type: 'soccercompetition',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('section');
  });

  it('should return section if type is "soccerteam"', () => {
    const data = {
      type: 'soccerteam',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('section');
  });

  it('should return soccerMatch if type is "soccermatch"', () => {
    const data = {
      type: 'soccermatch',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('soccerMatch');
  });

  it('should return verticalSlideshow', () => {
    const data = {
      type: 'slideshow',
      vertical: true,
    };
    expect(mapPageTypeToBundleName(data)).toEqual('verticalSlideshow');
  });

  it('should return horizontalSlideshow', () => {
    expect(mapPageTypeToBundleName({ type: 'slideshow' }))
      .toEqual('horizontalSlideshow');
  });

  it('should return horizontalSlideshow for reactionslideshow', () => {
    expect(mapPageTypeToBundleName({ type: 'reactionslideshow' }))
      .toEqual('horizontalSlideshow');
  });

  it('should return tag for tagnode', () => {
    expect(mapPageTypeToBundleName({ type: 'tagnode' })).toEqual('tag');
  });

  it('should return tag for person', () => {
    expect(mapPageTypeToBundleName({ type: 'person' })).toEqual('tag');
  });

  it('should return liveStream for Live Stream (livestream)', () => {
    expect(mapPageTypeToBundleName({ type: 'livestream' }))
      .toEqual('liveStream');
  });

  it('should return liveBlog for Live Blog (liveblog)', () => {
    expect(mapPageTypeToBundleName({ type: 'liveblog' })).toEqual('liveBlog');
  });

  it('should return search for portalsearchpage', () => {
    expect(mapPageTypeToBundleName({ type: 'portalsearchpage' }))
      .toEqual('search');
  });

  it('should return article for Article pages', () => {
    expect(mapPageTypeToBundleName({ type: 'article' })).toEqual('article');
  });

  it('should return section radio in bex', () => {
    const data = {
      type: 'competition',
      sectionType: 'radiostation',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('sectionRadio');
  });

  it('should return horizontal slide show in bex', () => {
    const data = {
      type: 'slideshow',
      slideshowType: 'horizontalslideshow',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('horizontalSlideshow');
  });

  it('should return vertical slide show in bex', () => {
    const data = {
      type: 'slideshow',
      slideshowType: 'verticalslideshow',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('verticalSlideshow');
  });

  it('should return reaction slide show in bex', () => {
    const data = {
      type: 'slideshow',
      slideshowType: 'reactionslideshow',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('horizontalSlideshow');
  });

  it('should return default slide show in bex', () => {
    const data = {
      type: 'slideshow',
      slideshowType: 'foo',
    };
    expect(mapPageTypeToBundleName(data)).toEqual('horizontalSlideshow');
  });

  it('should return show when static widget node is available', () => {
    const data = {
      type: 'section',
      staticWidgets: [0, 2, 3],
    };
    expect(mapPageTypeToBundleName(data)).toEqual('show');
  });
});

/** @test {pageFactory} */
describe('getCurrentPageType', () => {
  it('should return errorPage if type is not defined', () => {
    expect(getCurrentPageType({})).toBe('errorPage');
  });

  it('should return errorPage if no arguments are given', () => {
    expect(getCurrentPageType()).toBe('errorPage');
  });

  it('should return transformed page type', () => {
    const data = {
      type: 'slideshow',
    };
    expect(getCurrentPageType(data)).toEqual('horizontalSlideshow');
  });

  it('should return transformed page type', () => {
    const data = {
      type: 'slideshow',
    };
    expect(getCurrentPageType(data)).toEqual('horizontalSlideshow');
  });

  it('should return embedded video type', () => {
    const data = {
      type: 'video',
    };
    expect(getCurrentPageType(data, '/uri/embed')).toEqual('embeddedVideo');
    expect(getCurrentPageType(data, '/uri/embed?eid=123')).toEqual('embeddedVideo');
  });

  it('should return video non-embedded content', () => {
    const data = {
      type: 'video',
    };
    expect(getCurrentPageType(data)).toEqual('video');
  });

  it('should return spa shell', () => {
    const data = {
      type: 'section',
      uri: '/radio/',
    };
    const path = '/radio';
    expect(getCurrentPageType(data, path, { isSpa: true })).toEqual('spaShell');
  });
});

/** @test {pageFactory} */
describe('getAssets', () => {
  // Good test mock
  const testAssets = {
    styles: {
      section: 'section styles',
      components: 'components styles',
      main: 'main styles',
      errorPage: 'error page styles',
    },
    javascript: {
      section: 'section js',
      components: 'components js',
      main: 'main js',
      errorPage: 'error page js',
      vendors: 'vendors.js',
      icons: 'icons.js',
      react: 'react.js',
      moment: 'moment.js',
      uvn: 'uvn.js',
    },
  };
  const jsDependencies = [
    testAssets.javascript.icons,
    testAssets.javascript.moment,
    testAssets.javascript.react,
    testAssets.javascript.vendors,
    testAssets.javascript.uvn,
  ];
  const sectionAssets = {
    styles: 'section styles',
    javascript: 'section js',
    jsDependencies,
  };
  const errorPageAssets = {
    styles: 'error page styles',
    javascript: 'error page js',
    jsDependencies,
  };

  // Bad test mock
  const testIncompleteAssets = {
    styles: {
      main: 'main js',
    },
    javascript: {
      section: 'section js',
      main: 'main js',
      vendors: 'vendors.js',
      icons: 'icons.js',
      react: 'react.js',
      moment: 'moment.js',
      uvn: 'uvn.js',
    },
    jsDependencies,
  };
  const sectionIncompleteAssets = {
    javascript: 'section js',
    jsDependencies,
  };

  const cdnAssets = {
    styles: {
      main: 'http://cdn.example.com/assets/main.css',
    },
    javascript: {
      section: 'section js',
      main: 'http://cdn.example.com/assets/main.js',
    },
    jsDependencies,
  };

  const overrideCdnAssets = {
    styles: {
      main: 'http://cdn1.example.com/assets/main.css',
    },
    javascript: {
      main: 'http://cdn1.example.com/assets/main.js',
    },
    jsDependencies,
  };

  it('should return null if not assets', () => {
    const pageAssets = getAssets('section', null);
    expect(pageAssets).toEqual({});
  });
  it('should return null if assets not object', () => {
    const pageAssets = getAssets('section', 'test');
    expect(pageAssets).toEqual({});
  });
  it('should return null if current page not in assets', () => {
    const assets = {
      a: { b: 'c' },
    };
    const pageAssets = getAssets('section', assets);
    expect(pageAssets).toEqual({});
  });
  it('should return errorPage if current page not in assets', () => {
    const pageAssets = getAssets('article', testAssets);
    expect(pageAssets).toEqual(errorPageAssets);
  });
  it('should return section if current page is section', () => {
    const pageAssets = getAssets('section', testAssets);
    expect(pageAssets).toEqual(sectionAssets);
  });
  it('should swap cdn url for override when env var exists', () => {
    process.env.CDN_URL = 'http://cdn.example.com';
    process.env.CDN_URL_OVERRIDE = 'http://cdn1.example.com';
    const pageAssets = getAssets('main', cdnAssets);
    expect(pageAssets.javascript.indexOf(process.env.CDN_URL_OVERRIDE) > -1).toEqual(true);
  });
  it('should not return section styles if wrong assets', () => {
    const pageAssets = getAssets('section', testIncompleteAssets);
    expect(pageAssets).toEqual(sectionIncompleteAssets);
  });
  it('should return inlineCss relative path', () => {
    process.env.CDN_URL = 'http://cdn.example.com';
    const inlineCssPath = getInlineCssPath(cdnAssets.styles.main);
    expect(inlineCssPath).toBe('./build/assets/main.css');
  });
  it('should return inlineCss relative path with override cdn url', () => {
    process.env.CDN_URL = 'http://cdn.example.com';
    process.env.CDN_URL_OVERRIDE = 'http://cdn1.example.com';
    const inlineCssPath = getInlineCssPath(overrideCdnAssets.styles.main);
    expect(inlineCssPath).toBe('./build/assets/main.css');
  });
  it('should not return an inlineCss when the cdn_url is not defined', () => {
    delete process.env.CDN_URL;
    const inlineCssPath = getInlineCssPath(cdnAssets.styles.main);
    expect(inlineCssPath).toBe(null);
  });
});

/** @test {pageFactory} */
describe('getPageComponent', () => {
  it('should return ErrorPage if data is null', async () => {
    getPageData.mockReturnValueOnce(null);

    const page = mount(getPageComponent('errorPage', {}));
    await Loadable.preloadAll();
    expect(page.find('ErrorPage')).toBeDefined();
  });
  it('should return ErrorPage component by default', async () => {
    const page = mount(getPageComponent('errorPage', {}));
    await Loadable.preloadAll();
    expect(page.find('ErrorPage')).toBeDefined();

    const page2 = mount(getPageComponent('errorPage', {}));
    await Loadable.preloadAll();
    expect(page2.find('ErrorPage')).toBeDefined();
  });
  it('should return a valid component for every content type', async () => {
    Object.keys(pageFactoryComponents).forEach(async (type) => {
      const component = getPageComponent(type);
      await Loadable.preloadAll();
      const wrapper = shallow(component);
      expect(wrapper.find('ErrorPage')).toBeDefined();
    });
  });
});
