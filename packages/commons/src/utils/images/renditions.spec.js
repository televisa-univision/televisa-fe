import getRenditionUrl from './renditions';
import configureStore from '../../store/configureStore';
import setPageData from '../../store/actions/page-actions';

const store = configureStore();

describe('getRenditionUrl', () => {
  beforeEach(() => {
    const pageData = {
      config: {
        proxy: 'http://www.univision.com',
        syndicator: {
          picture: '/proxy/api/cached/picture',
        },
      }
    };
    store.dispatch(setPageData(pageData));
  });
  it('should not break if not have valid values on generate the renditions', () => {
    expect(getRenditionUrl()).toBeNull();
  });

  it('should use the generate the renditions using DIMS.', () => {
    const original = {
      href: 'original.jpg',
      width: 1024,
      height: 698,
    };
    const expected = {
      width: 480,
      height: 270,
    };
    expect(getRenditionUrl(original, expected)).toContain('?href=original.jpg&width=1024&height=698&ratio_width=480&ratio_height=270');
  });

  it('should set 0 for width and height when these values were not provided', () => {
    const original = {
      href: 'original.jpg',
    };
    const expected = {
      width: 480,
      height: 270,
    };
    expect(getRenditionUrl(original, expected)).toContain('?href=original.jpg&width=0&height=0&ratio_width=480&ratio_height=270');
  });

  it('should generate the image url with png format if passed as an argument', () => {
    const original = {
      href: 'original.jpg',
      width: 1024,
      height: 698,
    };
    const expected = {
      width: 480,
      height: 270,
      format: 'png',
    };
    expect(getRenditionUrl(original, expected)).toContain('png');
  });

  it('should generate the image url with webp if client supports format', () => {
    store.dispatch(setPageData({ isWebPSupported: true }));
    const original = {
      href: 'original.jpg',
      width: 1024,
      height: 698,
    };
    const expected = {
      width: 480,
      height: 270,
    };
    expect(getRenditionUrl(original, expected)).toContain('webp');
  });

  it('should generate the image url without webp if client not supports format', () => {
    store.dispatch(setPageData({ isWebPSupported: false }));
    const original = {
      href: 'original.jpg',
      width: 1024,
      height: 698,
    };
    const expected = {
      width: 480,
      height: 270,
    };
    expect(getRenditionUrl(original, expected)).not.toContain('webp');
  });

  it('should generate the image url with provided focusPoints and resize option', () => {
    store.dispatch(setPageData({ isWebPSupported: false }));
    const original = {
      href: 'original.jpg',
      width: 1024,
      height: 698,
      focusPoint: {
        x: 0.3,
        y: 0.2,
      },
    };
    const resizeOption = 'Crop Image';
    const expected = {
      width: 480,
      height: 270,
      resizeOption,
    };
    expect(getRenditionUrl(original, expected)).toContain('focus_point_x=0.3');
    expect(getRenditionUrl(original, expected)).toContain('focus_point_y=0.2');
    expect(getRenditionUrl(original, expected)).toContain(`resize_option=${encodeURIComponent(resizeOption)}`);
  });

  it('should not crash with empty objects', () => {
    expect(getRenditionUrl({}, {})).toBe(null);
  });
});
