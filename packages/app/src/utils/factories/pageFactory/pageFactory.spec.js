import React from 'react';
import { shallow, mount } from 'enzyme';
import preloadAll from 'jest-next-dynamic';
import { Provider } from 'react-redux';

import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as pageFactory from '.';

const store = configureStore();
const {
  mapPageTypeToBundleName,
  getContentTypeComponent,
  getLayoutComponent,
  getPageComponents,
} = pageFactory;

jest.mock('../../../components/contentTypes/SlideshowWrapper', () => 'SlideshowWrapper');

const environment = process.env;

/** @test {pageFactory} */
describe('pageFactory test', () => {
  describe('mapPageTypeToBundleName', () => {
    afterEach(() => {
      process.env = environment;
    });

    it('should return null if not have type data', () => {
      expect(mapPageTypeToBundleName()).toBeNull();
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

    it('should return show for section with staticWidgets', () => {
      const data = {
        type: 'section',
        staticWidgets: [{
          contents: [],
          type: 'LongFormVideoList',
        }],
      };
      expect(mapPageTypeToBundleName(data)).toEqual('show');
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

    it('should return section if type is "competition"', () => {
      const data = {
        type: 'competition',
      };
      expect(mapPageTypeToBundleName(data)).toEqual('section');
    });

    it('should return section if type is "league"', () => {
      const data = {
        type: 'league',
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
      expect(mapPageTypeToBundleName(data)).toEqual('soccermatch');
    });

    it('should return a slideshow', () => {
      const data = {
        type: 'slideshow',
        vertical: true,
      };
      expect(mapPageTypeToBundleName(data)).toEqual('slideshow');
    });

    it('should return slideshow for reactionslideshow', () => {
      const data = {
        type: 'reactionslideshow',
        vertical: true,
      };
      expect(mapPageTypeToBundleName(data)).toEqual('slideshow');
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

    it('should return sectionRadio', () => {
      const data = {
        type: 'section',
        sectionType: 'radiostation',
      };
      expect(mapPageTypeToBundleName(data)).toEqual('sectionRadio');
    });

    it('should return video', () => {
      const data = {
        type: 'video',
      };
      expect(mapPageTypeToBundleName(data)).toEqual('video');
    });
    it('should return soccer person', () => {
      const data = {
        type: 'soccerperson',
      };
      expect(mapPageTypeToBundleName(data)).toEqual('soccerperson');
    });
  });

  /**
   * @test {getContentTypeComponent}
   */
  describe('getContentTypeComponent', () => {
    beforeAll(async () => {
      await preloadAll();
    });

    it('should return undefined if data is empty', () => {
      const Component = getContentTypeComponent({});
      expect(Component).toBeUndefined();
    });

    it('should return Article component', () => {
      const Article = getContentTypeComponent({ uri: '/', type: 'article' });
      const page = shallow(<Article />);
      expect(page.find('Article')).toHaveLength(1);
    });

    it('should return Article component', () => {
      const pageData = { uri: '/', type: 'soccermatch' };
      const SoccerMatch = getContentTypeComponent(pageData);
      const page = shallow(<SoccerMatch pageData={pageData} />);
      expect(page.find('SoccerMatch')).toHaveLength(1);
    });

    it('should return RawHtml component', () => {
      const pageData = { html: '', type: 'rawhtml' };
      const RawHtml = getContentTypeComponent(pageData);
      const page = shallow(<RawHtml pageData={pageData} />);
      expect(page.find('RawHtml')).toHaveLength(1);
    });

    it('should return Section component', () => {
      const pageData = { uri: '/', type: 'section' };
      const Section = getContentTypeComponent(pageData);
      const page = shallow(<Section pageData={pageData} />);
      expect(page.find('Section')).toHaveLength(1);
    });

    it('should return Show component', () => {
      const Show = getContentTypeComponent({
        uri: '/',
        type: 'section',
        staticWidgets: [{ type: 'LongFormVideoList', contents: [] }],
      });
      const page = shallow(<Show />);
      expect(page.find('Show')).toHaveLength(1);
    });

    it('should return slideshow component', () => {
      const Slideshow = getContentTypeComponent({
        uri: '/',
        type: 'slideshow',
        vertical: true,
      });
      const page = shallow(<Slideshow />);
      expect(page.find('SlideshowWrapper')).toHaveLength(1);
    });
  });

  /**
   * @test {getContentTypeComponent}
   */
  describe('getLayoutComponent', () => {
    it('should return SoccerMatch layout component', () => {
      const pageData = {
        uri: 'https://tudn.com',
        type: 'soccermatch',
      };
      const site = TUDN_SITE;
      const ComponentLayout = getLayoutComponent(pageData, site);
      const wrapper = mount(
        <Provider store={store}>
          <ComponentLayout />
        </Provider>
      );
      expect(wrapper.find('TudnMvpdWrapper')).toHaveLength(1);
    });

    it('should return default TUDN layout if contentType not have custom layout', () => {
      const pageData = {
        uri: 'https://tudn.com',
        type: 'section',
      };
      const site = TUDN_SITE;
      const ComponentLayout = getLayoutComponent(pageData, site);
      const wrapper = shallow(<ComponentLayout />);

      expect(wrapper.find('PageWrapper')).toHaveLength(1);
    });
  });

  /**
   * @test {getPageComponents}
   */
  describe('getPageComponents', () => {
    beforeAll(async () => {
      await preloadAll();
    });

    it('should return Layout and ContentType components by type and site', () => {
      const pageData = {
        uri: 'https://tudn.com',
        type: 'article',
      };
      const site = TUDN_SITE;
      const result = getPageComponents(pageData, site);
      const { Layout, ContentType } = result;
      const wrapper = shallow(<Layout />);
      expect(wrapper.find('PageWrapper')).toHaveLength(1);

      const contentType = shallow(<ContentType />);
      expect(contentType.find('Article')).toHaveLength(1);
    });

    it('should empty or fallback Layout/ContentType if not match type/site', () => {
      const site = TUDN_SITE;
      const result = getPageComponents({}, site);
      const { Layout, ContentType } = result;
      const wrapper = shallow(<Layout />);
      expect(wrapper.find('PageWrapper')).toHaveLength(1);
      expect(ContentType).not.toBeDefined();
    });
  });
});
