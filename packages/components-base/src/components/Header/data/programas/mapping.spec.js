import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import features from '@univision/fe-commons/dist/config/features';
import mapping from './mapping';
import programasNav from '.';
import noticiasDigitales from './shows/noticias-digital';
import { getSubNavBackgroundByType } from './subNavBackgrounds';
import showsNav from './shows';
import * as subNavTypes from '../../HeaderProvider/Subnav/subNavTypes';
import { getVerticalNav } from '../helpers';

features.shows.showsRedesign = jest.fn(() => false);

describe('Shows mapping', () => {
  let pageData;

  beforeEach(() => {
    pageData = {
      primaryTag: {
        name: 'shows',
        uri: '/shows',
      },
      tagHierarchy: [{ name: 'shows', title: 'Shows', uri: '/shows' }],
      hierarchy: [{ name: 'shows', title: 'Shows', uri: '/shows' }],
    };
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render properly', () => {
    expect(showsNav(pageData)).toBeDefined();
  });
  it('should be dark the variant when the content type is video', () => {
    features.shows.showsRedesign.mockReturnValueOnce(true);
    expect(showsNav({ ...pageData, type: 'video' }).variant).toBe('dark');
  });
});
describe('Noticias-digital', () => {
  let pageData;

  beforeEach(() => {
    pageData = {
      primaryTag: {
        name: 'shows',
        uri: '/shows',
      },
      tagHierarchy: [{ name: 'shows', title: 'Shows', uri: '/shows' }],
      hierarchy: [{ name: 'shows', title: 'Shows', uri: '/shows' }],
    };
  });

  it('should return the right theming for video', () => {
    pageData = {
      ...pageData,
      type: 'video',
    };
    const { theme } = noticiasDigitales({ ...pageData });
    expect(theme).toEqual(themes.blue);
  });
});

describe('Programas mapping', () => {
  let pageData;

  beforeEach(() => {
    pageData = {
      primaryTag: {
        name: 'shows',
      },
      tagHierarchy: [{ name: 'programas' }, { name: 'shows' }],
      hierarchy: [{ name: 'programas' }, { name: 'shows' }],
      brandable: {
        uri: 'uri',
        show: {
          headerLogo: {
            original: {
              href: 'image',
            },
          },
          showType: 'Show',
        },
      },
    };
  });

  it('the mappings should work properly without brandable', () => {
    [...Object.values(mapping), programasNav]
      .forEach(navMapping => navMapping({ ...pageData, brandable: null }));
  });

  it('the mappings should work properly with sports theming', () => {
    const theme = { theme: 'sports' };
    const pageDataWithTheme = Object.assign({}, pageData, { theme });
    Store.dispatch(setPageData(pageDataWithTheme));
    [...Object.values(mapping), programasNav]
      .forEach(navMapping => navMapping({ ...pageDataWithTheme, brandable: null }));
  });

  it('should get a background by type', () => {
    const solidColor = getSubNavBackgroundByType('hoy');
    expect(solidColor).toEqual({ color: '#0d63bc', image: 'https://st1.uvnimg.com/9a/e4/630a0aec4f7690f678f55262e3aa/showpagehero-mobile.jpg' });
  });

  it('the mappings should work properly with brandable', () => {
    Object.values(mapping).forEach(navMapping => navMapping(pageData));
  });

  it('should not use a BrandedSubNav if the primary tag is shows/novelas/series', () => {
    const config = {
      shows: mapping.show,
      novelas: mapping.novela,
      series: mapping.serie,
    };
    Object.keys(config).forEach((key) => {
      expect(
        config[key]({
          ...pageData,
          type: 'section',
          tagHierarchy: [{ name: 'programas' }, { name: key }],
          hierarchy: [{ name: 'programas' }, { name: key }],
        }).subNavComponent
      ).not.toBeDefined();
      expect(
        config[key]({
          ...pageData,
          type: 'article',
          tagHierarchy: [{ name: 'programas' }, { name: key }],
          hierarchy: [{ name: 'programas' }, { name: key }],
        }).subNavComponent
      ).not.toBeDefined();
    });
  });

  it('should dark variant if data type is video in shows', () => {
    const pageDataWithTheme = Object.assign({}, pageData, { type: 'video' });
    Store.dispatch(setPageData(pageDataWithTheme));

    Object.values(mapping).forEach(navMapping => expect(
      navMapping({ ...pageDataWithTheme, brandable: null }).subNavComponent
    ).not.toBeDefined());
  });

  it('should dark variant if data type is video in series', () => {
    const tagHierarchy = [{ name: 'programas' }, { name: 'series' }];
    const pageDataWithTheme = Object.assign({}, pageData, { type: 'video', tagHierarchy });
    Store.dispatch(setPageData(pageDataWithTheme));

    Object.values(mapping).forEach(navMapping => expect(
      navMapping({ ...pageDataWithTheme, brandable: null }).subNavComponent
    ).not.toBeDefined());
  });

  it('should dark variant if data type is video in novelas', () => {
    const tagHierarchy = [{ name: 'programas' }, { name: 'novelas' }];
    const pageDataWithTheme = Object.assign({}, pageData, { type: 'video', tagHierarchy });
    Store.dispatch(setPageData(pageDataWithTheme));

    Object.values(mapping).forEach(navMapping => expect(
      navMapping({ ...pageDataWithTheme, brandable: null }).subNavComponent
    ).not.toBeDefined());
  });

  it('should use the defaultNav if there is not a brandable object', () => {
    Object
      .values(mapping)
      .forEach(navMapping => expect(navMapping({ ...pageData, brandable: null })
        .subNavComponent).not.toBeDefined());
  });

  it('should use the shows nav with the shortTitle if it is defined', (done) => {
    pageData.brandable.shortTitle = 'test';
    Store.dispatch(setPageData({ data: pageData }));
    const tagHierarchy = [{ name: 'programas' }, { name: 'shows' }, { name: 'test' }];

    Object.keys(mapping).forEach(async (pageCategory) => {
      const { subNavComponent } = await getVerticalNav({
        ...pageData,
        tagHierarchy,
      }, pageCategory);
      if (pageCategory !== pageCategories.ESPECIALES) {
        expect(subNavComponent).toEqual(subNavTypes.SHOWS);
      } else {
        expect(subNavComponent).toEqual(subNavTypes.DEFAULT);
      }
      done();
    });
  });

  it('should use secondaryTags as links for all except especiales', (done) => {
    const secondaryTags = [{ title: 'foo', url: '/' }];
    pageData.secondaryTags = secondaryTags;
    Store.dispatch(setPageData({ data: pageData }));

    Object.keys(mapping).forEach(async (pageCategory) => {
      const { links: { primary } } = await getVerticalNav(pageData, pageCategory);
      if (pageCategory !== pageCategories.ESPECIALES) {
        expect(primary[primary.length - 1].name).toEqual('foo');
      } else {
        expect(primary).toBeUndefined();
      }
      done();
    });
  });
});
