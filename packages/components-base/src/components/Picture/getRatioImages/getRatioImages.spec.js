import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import getRatioImages from '.';

describe('getRatioImages', () => {
  beforeEach(() => {
    Store.dispatch(setPageData({
      config: {
        dims: {
          baseUrl: 'test',
          sharedSecret: 'test',
        },
        proxy: 'http://www.univision.com',
        syndicator: {
          picture: '/proxy/api/cached/picture',
        },
      },
    }));
  });
  it('provides defaults and runs as expected', () => {
    const images = getRatioImages({});
    expect(images).toEqual({
      lg: null,
      md: null,
      sm: null,
      xl: null,
      xsm: null,
      xxsm: null,
      xxxsm: null,
    });
  });
  it('assigns overrides', () => {
    const renditions = { original: { href: 'original.jpg' }, '16x9-mobile': { href: 'mobile.png' } };
    const overrides = { sm: 'sm' };
    const images = getRatioImages({ renditions, overrides });
    expect(images.sm).toEqual('mobile.png');
  });
  it('should use the generate the renditions using DIMS.', () => {
    const renditions = {
      original: {
        href: 'original.jpg',
        width: 1024,
        height: 698,
      },
    };
    const images = getRatioImages({ renditions });
    expect(images.sm).toContain('/picture?href=original.jpg&width=1024&height=698&ratio_width=480&ratio_height=270');
  });
  it('should fallback to the original href if the original is using a DIMS image.', () => {
    const renditions = {
      original: {
        href: 'https://domain.com/dims4/default/image.jpg',
        width: 1024,
        height: 698,
      },
    };
    const images = getRatioImages({ renditions });
    expect(images.sm).toContain('https://domain.com/dims4/default/image.jpg');
  });
});
