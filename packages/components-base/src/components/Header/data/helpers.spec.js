import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import Store from '@univision/fe-commons/dist/store/store';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import {
  chooseBgStyle,
  getVerticalNav,
  prioritizeNavColumn,
  getSectionTitle,
  getWhiteLogoBySection,
} from './helpers';
import generic from './generic';
import shows from './programas/shows';

const sportsData = { vertical: 'Deportes', uri: 'https://tudn.com', hierarchy: [{ name: 'deportes' }] };

jest.mock('./generic', () => jest.fn(() => ({})));
jest.mock('./programas/shows', () => jest.fn(() => ({})));
jest.mock('@univision/fe-commons/dist/utils/logging/clientLogging', () => jest.fn());

describe('getVerticalNav', () => {
  it('getVerticalNav returns correct navigation structure', async() => {
    getVerticalNav();
    expect(generic).toBeCalled();
    await expect(getVerticalNav(sportsData, pageCategories.NOTICIERO_EDICION_DIGITAL, true))
      .resolves.toBeDefined();
  });

  it('should call the callback when the chunk is resolved', async() => {
    const onLoad = jest.fn();
    await expect(getVerticalNav(sportsData, pageCategories.NOTICIERO_EDICION_DIGITAL, onLoad)).resolves.toHaveProperty('logoUrl', '/shows');
    expect(onLoad).toBeCalled();
  });

  it('getVerticalNav should return error if pageCategory is not dynamic', async() => {
    shows.mockImplementation(() => {
      throw new Error('User not found');
    });
    console.error = jest.fn(); // eslint-disable-line no-console
    await expect(getVerticalNav(null, pageCategories.SHOW, true)).resolves.toBeUndefined();
    expect(clientLogging).toHaveBeenCalled();
  });
});

describe('prioritizeNavColumn', () => {
  const links = [
    { name: 'abc' },
    { name: 'cde' },
    { name: 'test' },
    { name: 'fgh' },
  ];
  it('returns empty string if no title provided', () => {
    const newArrray = prioritizeNavColumn(links, 'test');
    expect(newArrray[0].name).toBe('test');
  });
});

describe('getSectionTitle', () => {
  let data = {
    title: 'test',
    primaryTag: {
      name: 'Univision Contigo',
    },
  };
  it('should return the primaryTag if it exists', () => {
    expect(getSectionTitle(data)).toBe(data.primaryTag.name);
  });
  it('should return the shortTitle if it exists', () => {
    data = {
      title: 'test',
      shortTitle: 'quiz',
    };
    expect(getSectionTitle(data)).toBe(data.shortTitle);
  });
  it('should not return the primaryTag if it the same as the vertical', () => {
    data.primaryTopic = 'Noticias';
    data.primaryTag = {
      name: 'Noticias',
    };
    expect(getSectionTitle(data)).toBe('');
  });
  it('should return empty if not have valid data', () => {
    expect(getSectionTitle(null)).toBe('');
  });
});

describe('getWhiteLogoBySection', () => {
  it('should return an empty object if pageCategory is not included on the list', () => {
    Store.dispatch(setPageData({
      data: {
        primaryTopic: null,
      },
      pageCategory: 'test',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).toEqual({});
    expect(logoMobile).toEqual({});
  });
  it('should return the whiteLogo if pageCategory exist (without store)', () => {
    Store.dispatch(setPageData({
      data: {
        tagHierarchy: [],
        hierarchy: [],
        primaryTopic: null,
      },
      pageCategory: pageCategories.NOTICIERO_EDICION_DIGITAL,
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo if tvStation exist (using the store)', () => {
    Store.dispatch(setPageData({
      data: {
        brandable: {
          tvStation: {
            localMarket: { title: 'Atlanta' },
            uri: '/atlanta/wuvg',
          },
        },
      },
      navData: { logoUrl: '/atlanta/wuvg' },
      pageCategory: 'local-tv',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo if it is horoscopo page category', () => {
    Store.dispatch(setPageData({
      navData: { logoUrl: '/entretenimiento', sectionTitle: 'Horóscopos' },
      sectionUrl: '/entretenimiento/horoscopos',
      pageCategory: 'horoscopos',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo if it is show page category', () => {
    Store.dispatch(setPageData({
      navData: { logoUrl: '/entretenimiento' },
      sectionUrl: '/entretenimiento/horoscopos',
      pageCategory: 'show',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo if it is serie page category', () => {
    Store.dispatch(setPageData({
      navData: { logoUrl: '/entretenimiento' },
      sectionUrl: '/entretenimiento/horoscopos',
      pageCategory: 'serie',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo if it is novela page category', () => {
    Store.dispatch(setPageData({
      navData: { logoUrl: '/entretenimiento' },
      sectionUrl: '/entretenimiento/horoscopos',
      pageCategory: 'novela',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo if it is famosos page category', () => {
    Store.dispatch(setPageData({
      navData: { logoUrl: '/entretenimiento' },
      sectionUrl: '/entretenimiento/horoscopos',
      pageCategory: 'famosos',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo of the vertical if doesnt match with reserved page category', () => {
    Store.dispatch(setPageData({
      navData: { logoUrl: '/deportes' },
      sectionUrl: '/entretenimiento/horoscopos',
      pageCategory: 'futbol',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo of univision if doesnt match with reserved page category and has the root page', () => {
    Store.dispatch(setPageData({
      navData: { logoUrl: '/' },
      sectionUrl: '/entretenimiento/horoscopos',
      pageCategory: 'futbol',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the univisionWhiteLogo if localMarket does not exist', () => {
    Store.dispatch(setPageData({
      data: {
        brandable: {
          tvStation: {
            localMarket: { title: 'Test' },
            uri: '/test',
          },
        },
      },
      navData: { logoUrl: '/test' },
      pageCategory: 'local-tv',
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo tudn if vertical is deportes', () => {
    Store.dispatch(setPageData({
      navData: { logoUrl: '/' },
      sectionUrl: '/fantasy/',
      pageCategory: pageCategories.SPORTS,
      data: { vertical: 'Deportes', uri: 'https://tudn.com/' },
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
  it('should return the whiteLogo Las Estrellas if vertical is lasestrellas', () => {
    Store.dispatch(setPageData({
      navData: { logoUrl: '/' },
      sectionUrl: '/programas',
      pageCategory: pageCategories.LAS_ESTRELLAS,
      data: { vertical: 'lasestrellas', uri: 'https://lasestrellas.tv/' },
    }));
    const { logoDesktop, logoMobile } = getWhiteLogoBySection();
    expect(logoDesktop).not.toBeNull();
    expect(logoMobile).not.toBeNull();
  });
});

describe('chooseBgStyle', () => {
  it('should return empty style for background', () => {
    const styling = {
      backgroundImage: 'http://image',
    };
    const bgStyle = chooseBgStyle(true, styling);
    expect(bgStyle).toEqual({
      backgroundImage: 'url(http://image)',
    });
  });
  it('should return style for background', () => {
    const styling = {};
    const bgStyle = chooseBgStyle(false, styling);
    expect(bgStyle).toEqual({});
  });
});
