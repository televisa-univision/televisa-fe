import { shallow } from 'enzyme';

import getRenditionUrl from '../images/renditions';
import features from '../../config/features';

import seoTags from './seoTags';
import * as modifierTags from './modifierTags';

jest.mock('../images/renditions', () => jest.fn());
jest.mock('../../assets/images/tudnlogo.png', () => 'tudn');

const initialStateMock = {
  data: {
    metaTagData: {
      settings: null,
      googlePlus: {},
      openGraph: {
        type: 'uni_og_act:article',
        title: 'Biden nomina para dirigir ICE a Ed González, un duro crítico de la política migratoria de Trump',
        description: 'González, alguacil del condado texano de Harris, retiró a su departamento de un programa federal voluntario que durante años ayudó a detener y deportar inmigrantes. Como jefe de ICE, González ayudaría a supervisar una de las partes más polémicas de la agenda de Biden sobre la ley de inmigración en EEUU.',
        imageUrl: 'https://st1.uvnimg.com/dims4/default/0eb17cb/2147483647/thumbnail/1240x698/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fcc%2F75%2Fbfd4bc5c47f3901278928f8afe51%2Fed-gonzalez.jpg',
        url: 'https://www.univision.com/noticias/inmigracion/biden-nominara-alguacil-ed-gonzalez-dirigir-ice',
        siteName: 'Univision',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'América derrota a Santos 3-2 en un entretenido partido amistoso',
        description: 'Diego Lainez se estrenó como goleador en el primer equipo del América y con golazos de Díaz y Quintero, derrotaron a los Guerreros en Denver.',
        creator: null,
        imageUrl: 'https://cdn3.uvnimg.com/81/61/89ef862c42169aa11a85aa337eef/debc4jsumaawm62.jpg',
      },
      facebook: {
        pages: '259955926518,173155703431,174725429795,130815470261839',
      },
      extras: [],
      additionalSeoKeywords: [],
    },
    seo: {
      title: 'América derrota a Santos 3-2 en un entretenido partido amistoso - Univision',
      description: 'Diego Lainez se estrenó como goleador en el primer equipo del América y con golazos de Díaz y Quintero, derrotaron a los Guerreros en Denver.',
      keywords: [],
      robots: [],
    },
    isNationalRadioShow: true,
    type: 'section',
    primaryTag: {
      name: 'foo',
    },
    sourceStation: {
      value: 'foo',
    },
    brandable: {
      radioStation: {
        deepLink: 'foo',
        uri: 'foo',
      },
    },
  },
};

const overrideMock = {
  sharing: {
    options: {
      facebook: {
        url: 'http://uni.vi/i5WD102IfDw',
        isFeedDialog: false,
        title: 'Biden nomina para dirigir ICE a Ed González, un duro crítico de la política migratoria de Trump',
        description: 'González, alguacil del condado texano de Harris, retiró a su departamento de un programa federal voluntario que durante años ayudó a detener y deportar inmigrantes. Como jefe de ICE, González ayudaría a supervisar una de las partes más polémicas de la agenda de Biden sobre la ley de inmigración en EEUU.',
        imageUrl: 'https://st1.uvnimg.com/e3/f1/9c9a835f4dfe9fca19a99f6b27fd/dcfc33a979da437bb2ed2420d9ec5190',
        appId: '1007833782615811',
      },
      twitter: {
        url: 'http://uni.vi/i5WD102IfDw',
        title: 'Biden nomina para dirigir ICE a Ed González, un duro crítico de la política migratoria de Trump',
        description: 'González, alguacil del condado texano de Harris, retiró a su departamento de un programa federal voluntario que durante años ayudó a detener y deportar inmigrantes. Como jefe de ICE, González ayudaría a supervisar una de las partes más polémicas de la agenda de Biden sobre la ley de inmigración en EEUU.',
        imageUrl: 'https://st1.uvnimg.com/e3/f1/9c9a835f4dfe9fca19a99f6b27fd/dcfc33a979da437bb2ed2420d9ec5190',
        via: 'UniNoticias',
      },
    },
  },
};

/**
 * @test {seoTags}
 */
describe('seoTags test', () => {
  let initialState;
  beforeAll(() => {
    initialState = { ...initialStateMock };
  });

  describe('metatags test', () => {
    it('should return array if valid arguments', () => {
      expect(seoTags.metas(initialState).length).toBeGreaterThan(0);
    });

    it('should return null if no pageData', () => {
      expect(seoTags.metas(null)).toEqual(null);
    });

    it('should return primary topic author as fallback if it exists', () => {
      initialState.data.primaryTopic = 'test';
      const tags = seoTags.metas(initialState);

      expect(tags.find(d => d?.props?.name === 'author')).toHaveProperty('props.content', 'Univision test');
    });

    it('should return author if it exists', () => {
      initialState.data.authors = [{ title: 'test' }];
      const tags = seoTags.metas(initialState);
      expect(tags.find(d => d?.props?.name === 'author')).toHaveProperty('props.content', 'test');
    });

    it('should return fb:pages if it exists', () => {
      const tags = seoTags.metas(initialState);
      expect(tags.find(d => d?.props?.property === 'fb:pages')).toHaveProperty('props.content', '259955926518,173155703431,174725429795,130815470261839');
    });

    it('should include default robots meta content if the array is empty', () => {
      const tags = seoTags.metas(initialState);

      expect(tags.find(d => d?.props?.name === 'robots')).toHaveProperty('props.content', 'max-image-preview:large');
    });

    it('should include a robots meta if the array is not empty', () => {
      initialState.data.seo.robots = ['nofollow', 'noindex'];
      const tags = seoTags.metas(initialState);

      expect(tags.find(d => d?.props?.name === 'robots')).toHaveProperty('props.content', ['nofollow', 'noindex']);
    });

    it('should override with custom tags', () => {
      const { data } = initialState;
      data.sectionType = 'radiostation';
      data.radioStation = {
        image: {
          renditions: {
            original: 'test.com',
          },
        },
      };
      getRenditionUrl.mockReturnValueOnce('cropped-image.jpg');
      const tags = seoTags.metas(initialState);

      expect(tags.find(d => d?.props?.property === 'og:image')).toHaveProperty('props.content', 'cropped-image.jpg');
    });

    it('should return custom description', () => {
      initialState.data.type = 'section';
      initialState.data.sectionType = 'league';
      initialState.data.seo.description = 'Liga MX';
      initialState.pageCategory = 'soccercompetition-resultados';
      const tags = seoTags.metas(initialState);

      expect(tags.find(d => d?.props?.name === 'description')).toHaveProperty('props.content', 'Resultados de Liga MX');
    });

    it('should return metatag values from page values as fallback', () => {
      const pageState = {
        data: {
          ...initialStateMock.data,
          seo: null,
          title: 'page title',
          description: 'page description',
        },
      };
      const tags = seoTags.metas(pageState);
      expect(
        tags.find(d => d?.props?.name === 'description')
      ).toHaveProperty('props.content', pageState.data.description);
      expect(
        tags.find(d => d?.props?.name === 'title')
      ).toHaveProperty('props.content', pageState.data.title);
    });
  });

  describe('title tag test', () => {
    it('should return empty if title not found', () => {
      const title = shallow(seoTags.title());

      expect(title.type()).toBe('title');
      expect(title.text()).toBe('');
    });

    it('should return title from seo data', () => {
      initialState.data.type = 'section';
      initialState.data.sectionType = null;
      const title = shallow(seoTags.title(initialState));

      expect(title.type()).toBe('title');
      expect(title.text()).toBe(initialState.data.seo.title);
    });

    it('should return title from page title as fallback', () => {
      initialState.data.seo.title = null;
      initialState.data.title = 'page title';
      const title = shallow(seoTags.title(initialState));

      expect(title.type()).toBe('title');
      expect(title.text()).toBe('page title');
    });
  });

  describe('canonical link test', () => {
    it('should return empty if not foudn seo data', () => {
      const canonical = shallow(seoTags.canonical());

      expect(canonical.type()).toBe('link');
      expect(canonical.prop('rel')).toBe('canonical');
      expect(canonical.prop('href')).toBeNull();
    });

    it('should return canonical from seo data', () => {
      initialState.data.seo.canonicalUrl = 'https://tudn.com/liga-mx';
      const canonical = shallow(seoTags.canonical(initialState));

      expect(canonical.type()).toBe('link');
      expect(canonical.prop('rel')).toBe('canonical');
      expect(canonical.prop('href')).toBe('https://tudn.com/liga-mx');
    });

    it('should return canonical from page URI as fallback', () => {
      initialState.data.seo.canonicalUrl = null;
      initialState.data.uri = 'https://tudn.com/liga-mx/test';
      const canonical = shallow(seoTags.canonical(initialState));

      expect(canonical.type()).toBe('link');
      expect(canonical.prop('rel')).toBe('canonical');
      expect(canonical.prop('href')).toBe('https://tudn.com/liga-mx/test');
    });

    it('should return custom canonical by content type', () => {
      initialState.data.type = 'portalsearchpage';
      initialState.data.uri = 'https://univision.com/search';
      initialState.requestParams = { q: 'test search' };
      const canonical = shallow(seoTags.canonical(initialState));

      expect(canonical.type()).toBe('link');
      expect(canonical.prop('rel')).toBe('canonical');
      expect(canonical.prop('href')).toBe('https://univision.com/search?q=test%20search');
    });

    it('should return custom canonical from modifier even if site has modifier', () => {
      initialState.site = 'tudn';
      initialState.data.type = 'section';
      initialState.data.sectionType = 'league';
      initialState.data.seo.description = 'Liga MX';
      initialState.pageCategory = 'soccercompetition-resultados';
      initialState.data.seo.canonicalUrl = 'https://tudn.com/liga-mx';
      const canonical = shallow(seoTags.canonical(initialState));

      expect(canonical.type()).toBe('link');
      expect(canonical.prop('rel')).toBe('canonical');
      expect(canonical.prop('href')).toBe('https://tudn.com/liga-mx/resultados');
    });
  });

  describe('language link test', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return null for language if not in tudn', () => {
      initialState.domain = 'https://www.univision.com';
      initialState.site = 'univision';
      const language = seoTags.language(initialState);

      expect(language).toBe(null);
    });

    it('should return correct language for "us" with reference link', () => {
      initialState.domain = 'https://www.tudn.com';
      initialState.site = 'tudn';
      jest.spyOn(modifierTags, 'default').mockReturnValueOnce({
        rel: 'alternate',
        hrefLang: 'es-us',
        href: 'https://www.tudn.com',
      });
      const language = shallow(seoTags.language(initialState));

      expect(language.type()).toBe('link');
      expect(language.prop('rel')).toBe('alternate');
      expect(language.prop('hrefLang')).toBe('es-us');
      expect(language.prop('href')).toBe('https://www.tudn.com');
    });
  });

  describe('amp link test', () => {
    it('should not display amphtml link', () => {
      expect(seoTags.ampHtmlLink()).toBe(null);
    });

    it('should return amphtml link', () => {
      initialState.data.enableForGoogleAmp = true;
      initialState.data.seo.canonicalUrl = 'https://tudn.com/article';
      initialState.data.type = 'article';
      const ampHtmlLink = shallow(seoTags.ampHtmlLink(initialState));

      expect(ampHtmlLink.type()).toBe('link');
      expect(ampHtmlLink.prop('rel')).toBe('amphtml');
      expect(ampHtmlLink.prop('href')).toBe('https://tudn.com/amp/article');
    });

    it('should return amphtml link even without canonical value', () => {
      initialState.data.enableForGoogleAmp = true;
      delete initialState.data.seo.canonicalUrl;
      initialState.data.uri = 'https://tudn.com/article2';
      initialState.data.type = 'article';
      const ampHtmlLink = shallow(seoTags.ampHtmlLink(initialState));

      expect(ampHtmlLink.prop('href')).toBe('https://tudn.com/amp/article2');
    });
  });

  describe('htmlLang test', () => {
    it('should return spanish by default', () => {
      expect(seoTags.htmlLang()).toBe('es');
    });
    it('should return spanish when language value is missing', () => {
      expect(seoTags.htmlLang(initialState)).toBe('es');
    });
    it('should return the value from state', () => {
      initialState.data.seo.language = 'en';
      expect(seoTags.htmlLang(initialState)).toBe('en');
    });
  });

  describe('getOpenGraphImage metadata test', () => {
    it('should return metadata for og:image when ogImage is valid', () => {
      const data = { metaTagData: { openGraph: { imageUrl: 'test' } } };
      const ogImageData = shallow(seoTags.getOpenGraphImage(true, { data }));
      expect(ogImageData.prop('content')).toBe('test');
    });

    it('should set empty og:image when ogImage is not passed', () => {
      const ogImageData = shallow(seoTags.getOpenGraphImage(true, { data: { isTudn: true } }));
      expect(ogImageData.prop('content')).toBe('tudn');
    });

    it('should return metadata for og:image when ogImage is invalid with tudn logo', () => {
      const ogImageData = shallow(seoTags.getOpenGraphImage(false, { isTudn: false }));
      expect(ogImageData.prop('content')).toBeDefined();
    });

    it('should return metadata for og:image when ogImage is invalid with uvn logo', () => {
      const ogImageData = shallow(seoTags.getOpenGraphImage(false, { isTudn: true }));
      expect(ogImageData.prop('content')).toBe('tudn');
    });

    it('should return overrided metadata for og:image when sharing object exists', () => {
      const data = { ...overrideMock, metaTagData: { openGraph: { imageUrl: 'test' } } };
      const { imageUrl } = overrideMock.sharing.options.facebook;
      const ogImageData = shallow(seoTags.getOpenGraphImage(true, { data }));
      expect(ogImageData.prop('content')).toBe(imageUrl);
    });
  });

  describe('override seo meta tags test', () => {
    it('should return metadata overrided for facebook', () => {
      initialState.data = {
        ...initialState.data,
        ...overrideMock,
      };
      const { title, description } = overrideMock.sharing.options.facebook;
      const tags = seoTags.metas(initialState);
      expect(tags.find(d => d?.props?.property === 'og:title')).toHaveProperty('props.content', title);
      expect(tags.find(d => d?.props?.property === 'og:description')).toHaveProperty('props.content', description);
    });

    it('should return metadata overrided for twitter', () => {
      initialState.data = {
        ...initialState.data,
        ...overrideMock,
      };
      const { title, description, imageUrl } = overrideMock.sharing.options.twitter;
      const tags = seoTags.metas(initialState);
      expect(tags.find(d => d?.props?.name === 'twitter:title')).toHaveProperty('props.content', title);
      expect(tags.find(d => d?.props?.name === 'twitter:description')).toHaveProperty('props.content', description);
      expect(tags.find(d => d?.props?.name === 'twitter:image')).toHaveProperty('props.content', imageUrl);
    });
  });

  describe('alternateSection test', () => {
    it('should return null', () => {
      const tags = seoTags.alternateSection(initialState);
      expect(tags).toBe(null);
    });
    it('should return valid tags', () => {
      const pageState = {
        ...initialState,
        data: {
          ...initialState.data,
          uri: 'https://www.tudn.com/test',
          type: 'section',
        },
        domain: 'https://www.tudn.com',
        site: 'tudn',
        requestParams: {
          isWorldCupMVP: 'true',
        },
      };
      jest.spyOn(features.deportes, 'isWorldCupMVP').mockReturnValue(true);
      const tags = seoTags.alternateSection(pageState);
      expect(tags.find(d => d?.props?.hrefLang === 'es-us')).toHaveProperty('props.href', 'https://www.tudn.com/test');
      expect(tags.find(d => d?.props?.hrefLang === 'es-mx')).toHaveProperty('props.href', 'https://www.tudn.com/mx/test');
      expect(tags.find(d => d?.props?.hrefLang === 'x-default')).toHaveProperty('props.href', 'https://www.tudn.com/test');
      jest.resetAllMocks();
    });
  });
});
