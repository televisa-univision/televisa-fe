import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import programasNav from '.';
import { getContentSubNavBackgrounds } from './contentSubNavBackgrounds';

let pageData;

beforeEach(() => {
  pageData = {
    primaryTag: {
      name: 'El Chapo',
    },
    hierarchy: [{ name: 'programas' }, { name: 'series' }, { name: 'el chapo' }],
    brandable: {
      uri: 'uri',
      show: {
        headerLogo: {
          original: {
            href: 'image',
          },
        },
        showType: 'series',
      },
    },
    type: 'article',
    device: 'mobile',
    show: {
      headerImages: {
        mobile: {
          renditions: {
            original: {
              href: 'mobile.jpg',
            },
          },
        },
        desktop: {
          renditions: {
            original: {
              href: 'desktop.jpg',
            },
          },
        },
      },
      contentImages: {
        mobile: {
          renditions: {
            original: {
              href: 'mobile.jpg',
            },
          },
        },
        desktop: {
          renditions: {
            original: {
              href: 'desktop.jpg',
            },
          },
        },
      },
    },
  };
  Store.dispatch(setPageData(pageData));
});

describe('contentSubNavBackgrounds suite', () => {
  it('the subnav background responds properly to the dynamic image param', () => {
    const result = Object.entries(getContentSubNavBackgrounds('image.jpg')).reduce((a, b) => {
      return { ...a, [b[0]]: b[1] };
    }, {});
    expect(getContentSubNavBackgrounds('image.jpg')).toStrictEqual(result);
  });

  it('the subnav background responds properly mobile view', () => {
    const result = Object.entries(getContentSubNavBackgrounds()).reduce((a, b) => {
      return { ...a, [b[0]]: b[1] };
    }, {});
    expect(getContentSubNavBackgrounds()).toStrictEqual(result);
  });

  it('the subnav background responds properly desktop view', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const result = Object.entries(getContentSubNavBackgrounds()).reduce((a, b) => {
      return { ...a, [b[0]]: b[1] };
    }, {});
    expect(getContentSubNavBackgrounds()).toStrictEqual(result);
  });

  it('should have the default values', () => {
    const navData = programasNav(pageData);
    expect(navData.subNavBackground).toBeDefined();
    expect(navData.subNavBackground.color).toBe('#000000');
    expect(navData.subNavBackground.image).toBe('mobile.jpg');
  });
  it('should not have the default values', () => {
    pageData.hierarchy = [{ name: 'programas' }, { name: 'series' }, { name: 'al punto' }];
    const navData = programasNav(pageData);
    const testGetContentSubNavBackgrounds = getContentSubNavBackgrounds('mobile.jpg')['al punto'];
    expect(navData.subNavBackground.color).toBe(testGetContentSubNavBackgrounds.color);
    expect(navData.subNavBackground.image).toBe(testGetContentSubNavBackgrounds.image);
  });
  it('should get desktop values', () => {
    pageData.hierarchy = [{ name: 'programas' }, { name: 'series' }, { name: 'al punto' }];
    pageData.device = 'desktop';
    Store.dispatch(setPageData(pageData));
    const navData = programasNav(pageData);
    const testGetContentSubNavBackgrounds = getContentSubNavBackgrounds('desktop.jpg')['al punto'];
    expect(navData.subNavBackground.color).toBe(testGetContentSubNavBackgrounds.color);
    expect(navData.subNavBackground.image).toBe(testGetContentSubNavBackgrounds.image);
  });
  it('should get default values with invalid url', () => {
    pageData.uri = '/test';
    expect(
      programasNav({
        pageData,
        ...{
          show: {
            headerImages: {
              mobile: {},
              desktop: {},
            },
            contentImages: {
              mobile: {},
              desktop: {},
            },
          },
        },
      }).subNavBackground.color
    ).toBe('#000000');
    expect(programasNav(pageData).subNavBackground.image).toBe(null);
  });
});
