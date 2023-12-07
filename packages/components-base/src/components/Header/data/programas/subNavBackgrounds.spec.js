import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import programasNav from '.';
import { getSubNavBackgrounds, getSubNavObject } from './subNavBackgrounds';

const pageData = {
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
  type: 'section',
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

describe('Programas subNavBackgrounds', () => {
  it('the subnav background responds properly to the dynamic image param', () => {
    const result = Object.entries(getSubNavBackgrounds('image.jpg')).reduce((a, b) => {
      return { ...a, [b[0]]: b[1] };
    }, {});
    expect(getSubNavBackgrounds('image.jpg')).toStrictEqual(result);
  });

  it('the subnav background responds properly mobile view', () => {
    const result = Object.entries(getSubNavBackgrounds()).reduce((a, b) => {
      return { ...a, [b[0]]: b[1] };
    }, {});
    expect(getSubNavBackgrounds()).toStrictEqual(result);
  });

  it('the subnav background responds properly desktop view', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const result = Object.entries(getSubNavBackgrounds()).reduce((a, b) => {
      return { ...a, [b[0]]: b[1] };
    }, {});
    expect(getSubNavBackgrounds()).toStrictEqual(result);
  });

  it('the subNavBackground header should have the default values: #000000 and image null', () => {
    expect(programasNav(pageData).subNavBackground.color).toBe('#000000');
    expect(programasNav(pageData).subNavBackground.image).toBe('desktop.jpg');
  });

  it('the subNavBackground header should have the default values: #000000 and image null using the uri', () => {
    pageData.uri = '/test';
    expect(programasNav(pageData).subNavBackground.color).toBe('#000000');
    expect(programasNav(pageData).subNavBackground.image).toBe('desktop.jpg');
    delete pageData.uri;
  });

  it('the subNavBackground header should have different color than default color: #000000', () => {
    pageData.hierarchy = [{ name: 'programas' }, { name: 'especiales' }, { name: 'premios juventud' }];
    expect(programasNav(pageData).subNavBackground.color).not.toBe('#000000');
  });

  it('the subNavBackground header should have the image for desktop version', () => {
    pageData.hierarchy = [{ name: 'programas' }, { name: 'especiales' }, { name: 'premios juventud' }];
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    expect(programasNav(pageData).subNavBackground.image).toBe('desktop.jpg');
  });

  it('the subNavBackground header should have the image for mobile version', () => {
    pageData.hierarchy = [{ name: 'programas' }, { name: 'especiales' }, { name: 'premios juventud' }];
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    expect(programasNav(pageData).subNavBackground.image).toBe('mobile.jpg');
  });

  it('the getSubNavObject returns proper value depending on the passed params', () => {
    const testSubNavObject = getSubNavObject('#ffffff', 'mobile.jpg');
    expect(testSubNavObject.color).toBe('#ffffff');
    expect(testSubNavObject.image).toBe('mobile.jpg');
  });

  it('the getSubNavObject returns proper value with no params', () => {
    expect(getSubNavObject().image).toBe(null);
    expect(getSubNavObject().color).toBe('#000000');
  });
});
