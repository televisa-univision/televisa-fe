import {
  alphabeticallyByName,
  areInSameUnivisionDomain,
  arrayIncludes,
  camelCase,
  capFirstLetter,
  cleanArray,
  cleanObject,
  cleanUrl,
  cloneDeep,
  deburr,
  deburrToLowerCase,
  decodeHex,
  easeInOutQuad,
  encodeHex,
  exists,
  fetchPageData,
  getBackgroundImage,
  getBreakPointByWidth,
  getCookie,
  getCurrentBreakPoint,
  getCurrentProtocol,
  getFirstMatch,
  getFromMap,
  getFromMapPattern,
  getKey,
  getScrollTop,
  getSiteDomainFromHref,
  getSocialNetworks,
  getTwitterHandle,
  getUniqKey,
  getWidgetType,
  hasKey,
  insertLinksByPosition,
  isAbsoluteUrl,
  isBreakingNews,
  isClientSide,
  isEqual,
  isInArray,
  isInUnivisionDomain,
  isInViewport,
  isLandscape,
  isMailToUrl,
  isRelativeUrl,
  isValidArray,
  isValidFunction,
  isValidNumber,
  isValidObject,
  isValidPromise,
  isValidString,
  isValidValue,
  loadExternalScript,
  locationRedirect,
  openInNewWindow,
  partitionArray,
  phoneFormat,
  pickObject,
  removeLinksByPosition,
  safeClassName,
  sanitizeHtml,
  scrollTo,
  secureImagesInData,
  secureUrl,
  setCookie,
  slugify,
  sortById,
  stripHtml,
  stripPathUrl,
  stripTagsHtml,
  toAbsoluteUrl,
  toHttp,
  toRelativeUrl,
  truncate,
  truncateString,
  decomposeUrl,
} from '.';
import Store from '../../store/store';
import setPageData from '../../store/actions/page-actions';
import * as request from '../api/request';
import features from '../../config/features';

describe('helpers', () => {
  beforeEach(() => {
    features.widgets.truncateText = true;
    // create a mock window
    const mockWindow = {
      location: {
        href: '#',
      },
    };

    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
  });

  afterEach(() => {
    features.widgets.truncateText = false;
    jest.restoreAllMocks();
  });

  describe('string transformations', () => {
    it('should convert a string in camelCase', () => {
      const result = camelCase('string-in-camel-case');
      expect(result).toEqual('stringInCamelCase');
    });
    it('should convert a string with special characters in camelCase', () => {
      const result = camelCase('@string-in@camel-case');
      expect(result).toEqual('stringInCamelCase');
    });
    it('should convert a string in StartCase to camelCase', () => {
      const result = camelCase('StartCase');
      expect(result).toEqual('startCase');
    });
    it('should convert a string in Uppercase to camelCase', () => {
      const result = camelCase('MEXICAN PRIMERA (CLAUSURA)');
      expect(result).toEqual('mexicanPrimeraClausura');
    });
    it('should return empty string if not have valid characters', () => {
      const result = camelCase('?|$');
      expect(result).toEqual('');
    });
    it('should return the same value if a non-string', () => {
      const result = camelCase(10);
      expect(result).toEqual(10);
    });
    it('should return the same value if is null', () => {
      const result = camelCase(10);
      expect(result).toEqual(10);
    });
    it('should capitalise first letter in a given string', () => {
      const str = 'test';
      const expected = str.charAt(0).toUpperCase() + str.substring(1);
      expect(capFirstLetter(str)).toEqual(expected);
    });
  });

  describe('exists function', () => {
    it('should return false if the property is undefined', () => {
      expect(exists()).toBe(false);
    });
    it('should return false if the property is null', () => {
      expect(exists(null)).toBe(false);
    });
    it('should return true if the property carries a value', () => {
      const property = 'test';
      expect(exists(property)).toBe(true);
    });
  });

  describe('has function', () => {
    it('should return true if property exist', () => {
      const obj = {
        a: {
          b: {
            c: 'd',
          },
        },
      };
      expect(hasKey(obj, 'a.b.c')).toBe(true);
    });
    it('should return false if property is null', () => {
      const obj = {
        a: {
          b: null,
        },
      };
      expect(hasKey(obj, 'a.b')).toBe(false);
    });
    it('should return false if property is null', () => {
      const obj = {
        a: {
          b: {
            c: null,
          },
        },
      };
      expect(hasKey(obj, 'a.b.c')).toBe(false);
    });
    it('should return false if property not exist', () => {
      const obj = {
        a: {
          b: {
            c: null,
          },
        },
      };
      expect(hasKey(obj, 'a.b.e')).toBe(false);
    });
    it('should return false if not have a valid key as the parameter', () => {
      const obj = {
        a: {
          b: {
            c: null,
          },
        },
      };
      expect(hasKey(obj, 0)).toBe(false);
    });
  });

  describe('url change functions', () => {
    it('should convert urls to https', () => {
      const httpUrl = 'http://www.univision.com';
      expect(secureUrl(httpUrl)).toEqual(expect.stringMatching(/^https:/));
    });
    it('should not convert https urls', () => {
      const inputUrl = 'https://www.univision.com';
      expect(secureUrl(inputUrl)).toEqual(inputUrl);
    });
    it('should return null when converting null url', () => {
      expect(secureUrl(null)).toBe(null);
    });
    it('should return null when converting undefined url', () => {
      expect(secureUrl()).toBe(null);
    });
    it('should convert urls to http', () => {
      const httpsUrl = 'https://www.univision.com';
      expect(toHttp(httpsUrl)).toEqual(expect.stringMatching(/^http:/));
    });
    it('should not convert http urls', () => {
      const inputUrl = 'http://www.univision.com';
      expect(toHttp(inputUrl)).toEqual(inputUrl);
    });
    it('should return null when converting null url to http', () => {
      expect(toHttp(null)).toBe(null);
    });
    it('should return null when converting undefined url to http', () => {
      expect(toHttp()).toBe(null);
    });
    it('should convert image urls in object to https', () => {
      const promoImages = {
        originalImage: 'http://www.univision.com',
        mobileImage: 'http://www.univision.com',
        desktopImage: 'http://www.univision.com',
      };
      expect(secureImagesInData(promoImages).originalImage).toEqual(expect.stringMatching(/^https:/));
    });
    it('should return null when converting null objects https', () => {
      expect(secureImagesInData(null)).toBe(null);
    });
    it('should return null when converting undefined objects https', () => {
      expect(secureImagesInData()).toBe(null);
    });
    it('should convert absolute url to relative', () => {
      expect(toRelativeUrl('http://www.univision.com/noticias/immigracion')).toBe('/noticias/immigracion');
    });
    it('should convert absolute url to relative even is the root page', () => {
      expect(toRelativeUrl('http://www.univision.com')).toBe('/');
    });
    it('should keep relative url', () => {
      expect(toRelativeUrl('/hola-mundo')).toBe('/hola-mundo');
    });
    it('should return null when converting non existing url to relative', () => {
      expect(toRelativeUrl()).toBe(null);
    });
    it('should return null when converting non existing url to absolute', () => {
      expect(toAbsoluteUrl()).toBe(null);
    });
    it('should return null when converting null url to absolute', () => {
      expect(toAbsoluteUrl(null)).toBe(null);
    });
    it('should convert a relative url to an absolute one', () => {
      const uri = '/noticias/inmigracion/nuevas-reglas-de-inmigracion';
      const domain = 'https://www.univision.com';
      const absoluteUrl = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';
      expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
    });
    it('should keep a the url is already is an absolute one', () => {
      const uri = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';
      const domain = 'https://www.univision.com';
      const absoluteUrl = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';
      expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
    });
    it('should not change a url if its already an absolute one', () => {
      const domain = 'https://www.univision.com';
      const absoluteUrl = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';
      expect(toAbsoluteUrl(absoluteUrl, domain)).toBe(absoluteUrl);
    });
    it('should append a forward slash (/) if uri doesnt start with one', () => {
      const uri = 'noticias/inmigracion/nuevas-reglas-de-inmigracion';
      const domain = 'https://www.univision.com';
      const absoluteUrl = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';
      expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
    });
    it('should root absolute URL if uri is root (/)', () => {
      const uri = '/';
      const domain = 'https://www.univision.com';
      const absoluteUrl = 'https://www.univision.com';
      expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
    });
    it('should same uri URL if is root (/) and domain is empty', () => {
      const uri = '/';
      const domain = '';
      const absoluteUrl = '/';
      expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
    });
    it('should return uri if domain is not defined or non-string', () => {
      const uri = 'noticias/inmigracion/nuevas-reglas-de-inmigracion';
      expect(toAbsoluteUrl(uri, null)).toBe(uri);
      expect(toAbsoluteUrl(uri, {})).toBe(uri);
    });
    it('should return null if trying to operate on non string params', () => {
      expect(toAbsoluteUrl({}, {})).toBe(null);
    });
  });

  describe('get background image function', () => {
    it('should return a background image from the props', () => {
      const props = { image: { renditions: { '16x9-mobile': { href: 'test' } } } };
      const key = 'image.renditions.16x9-mobile.href';
      const result = getBackgroundImage(props, key);
      expect(result.backgroundImage).toEqual('url(test)');

      expect(getBackgroundImage(props, 'foo')).toEqual({});
    });
  });

  describe('getCurrentProtocol', () => {
    it('returns same value as window.location.protocol', () => {
      expect(getCurrentProtocol()).toBe(window.location.protocol);
    });
  });

  describe('decodeHex and encodeHex', () => {
    const encoded = '756e69766973696f6e';
    const decoded = 'univision';

    it('returns the base16-decoded string', () => {
      expect(decodeHex(encoded)).toBe(decoded);
    });
    it('returns the base16-encoded string', () => {
      expect(encodeHex(decoded)).toBe(encoded);
    });
  });

  describe('getCookie', () => {
    it('returns empty string when there are not cookies', () => {
      expect(getCookie('foo')).toBe('');
    });
    it('returns the cookie value when there is only one cookie', () => {
      document.cookie = 'foo=bar';
      expect(getCookie('foo')).toBe('bar');
    });
    it('returns the cookie value when there are multiple cookies', () => {
      document.cookie = 'foo1=bar1';
      document.cookie = 'foo2=bar2';
      document.cookie = 'foo3=bar3';

      expect(getCookie('foo1')).toBe('bar1');
      expect(getCookie('foo2')).toBe('bar2');
      expect(getCookie('foo3')).toBe('bar3');
    });
    it('returns return null if window is not defined', () => {
      delete global.window;
      expect(getCookie('foo')).toBe(null);
    });
  });

  describe('setCookie', () => {
    it('returns empty string when there are not cookies', () => {
      document.cookie = '';
      setCookie('foo', true, 30);
      expect(getCookie('foo')).toBe('true');
    });
    it('returns empty string when there are not cookies and the value is set to null', () => {
      document.cookie = '';
      setCookie('foo', null, 30);
      expect(getCookie('foo')).toBe('');
    });
    it('returns empty string when there are not cookies and the date was not set', () => {
      document.cookie = '';
      setCookie('foo', true);
      expect(getCookie('foo')).toBe('true');
    });
  });

  describe('isInArray', () => {
    it('returns true if the element is in the array', () => {
      const element = 'univision';
      const array = [element];
      expect(isInArray(element, array)).toBe(true);
    });

    it('returns false if the element is in the array', () => {
      const element = 'univision';
      const array = [`non-${element}`];
      expect(isInArray(element, array)).toBe(false);
    });

    it('returns false if the array is undefined', () => {
      const element = 'univision';
      const array = undefined;
      expect(isInArray(element, array)).toBe(false);
    });
  });

  describe('isEqual', () => {
    it('returns true if the values are equal', () => {
      expect(isEqual('testString', 'testString')).toBe(true);
      expect(isEqual('foo' / 2, 'foo' / 2)).toBe(true);
      expect(isEqual(30 / 2, 30 / 2)).toBe(true);
    });

    it('returns false if the values no are equal', () => {
      expect(isEqual('testString', 'test')).toBe(false);
      expect(isEqual(parseInt(2.5, 10), parseInt('', 10))).toBe(false);
      expect(isEqual(30 / 2, 30 / 1)).toBe(false);
    });

    it('returns true if the object have equal values', () => {
      const objA = { foo: 'bar' };
      const objB = { foo: 'bar' };
      expect(isEqual(objA, objB)).toBe(true);
    });

    it('returns true if the object is equal', () => {
      const objA = { foo: 'bar', test: { value: 3 } };
      const objB = Object.assign(objA, { test: { value: 3 } });
      expect(isEqual(objA, objB)).toBe(true);
    });

    it('returns true if a deep object have sames values', () => {
      const objA = { foo: 'bar', test: { value: 3 } };
      const objB = { foo: 'bar', test: { value: 3 } };
      expect(isEqual(objA, objB)).toBe(true);
    });

    it('returns true if a Error have sames values', () => {
      const objA = new Error('test');
      const objB = new Error('test');
      expect(isEqual(objA, objB)).toBe(true);
    });

    it('returns true if a Date have sames values', () => {
      const dateString = 'Thu May 10 2018 23:23:27';
      const objA = new Date(dateString);
      const objB = new Date(dateString);
      expect(isEqual(objA, objB)).toBe(true);
    });

    it('returns true if a diferent types of objects', () => {
      const objA = new Date();
      const objB = Number('2');
      expect(isEqual(objA, objB)).toBe(false);
    });

    it('returns false if a deep object but not have sames values', () => {
      const objA = { foo: 'bar', test: { value: 3 } };
      const objB = { foo: 'bar', test: { value: 4 } };
      expect(isEqual(objA, objB)).toBe(false);
    });

    it('returns false if the object not have the same properties', () => {
      const objA = { foo1: 'bar' };
      const objB = { foo2: 'bar' };
      expect(isEqual(objA, objB)).toBe(false);
    });

    it('returns false if the array have diferent length', () => {
      const objA = [1, {}, 3];
      const objB = [1, {}];
      expect(isEqual(objA, objB)).toBe(false);
    });

    it('returns false if the object is not the same instance and "partial" is true', () => {
      const objA = { foo: 'bar', test: { value: 3 } };
      const objB = { foo: 'bar', test: { value: 3 } };
      expect(isEqual(objA, objB, true)).toBe(false);
    });

    it('returns false if the object is not equal and "partial" is true', () => {
      const objA = { foo: 'bar', test: [1, 2, 3] };
      const objB = { foo: 'bar', test: { value: [1, 2, 4] } };
      expect(isEqual(objA, objB, true)).toBe(false);
    });
  });

  describe('get twitter handle', () => {
    it('should return a string form the url given', () => {
      const props = 'https://twitter.com/nuriapuntonet';
      const result = getTwitterHandle(props);
      expect(result).toEqual('nuriapuntonet');
    });
    it('should return null if no props are passed', () => {
      const props = '';
      const result = getTwitterHandle(props);
      expect(result).toEqual(null);
    });
  });

  describe('get unique key', () => {
    beforeEach(() => {
      Date.now = jest.fn(() => (1536941803615));
    });
    it('should return a unique key with default prefix', () => {
      const key = getUniqKey();
      expect(key.length).toBeGreaterThan(16);
      expect(key).toMatch(/^key1536941803615\w+/);
      expect(getUniqKey()).not.toEqual(key);
    });
    it('should return with custom prefix', () => {
      const key = getUniqKey('id23');
      expect(key).toMatch(/^id231536941803615\w+/);
    });
  });

  describe('scrolling tests (getScrollTop, scrollTo)', () => {
    it('should return scrollTop using document.body.scrollTop', () => {
      document.body.scrollTop = 100;
      expect(getScrollTop()).toEqual(100);
    });

    it('should return scrollTop using window.scrollY', () => {
      document.body.scrollTop = undefined;
      window.scrollY = 200;
      expect(getScrollTop()).toEqual(200);
    });

    it('should return scrollTop using document.documentElement.scrollTop', () => {
      document.body.scrollTop = undefined;
      window.scrollY = undefined;
      document.documentElement.scrollTop = 300;
      expect(getScrollTop()).toEqual(300);
    });

    it('should default to 0', () => {
      document.body.scrollTop = undefined;
      window.scrollY = undefined;
      document.documentElement.scrollTop = undefined;
      expect(getScrollTop()).toEqual(0);
    });

    it('should return 0 if there is not window', () => {
      const oldWindow = global.window;
      delete global.window;
      expect(getScrollTop()).toEqual(0);
      global.window = oldWindow;
    });

    it('should scroll to given element 100px down (not animated)', () => {
      const ele = {
        scrollTop: 0,
      };

      const to = 100;
      const initialScrollTop = ele.scrollTop;

      scrollTo(ele, to, 0);
      expect(ele.scrollTop).toEqual(to - initialScrollTop);
    });

    it('should scroll to given element 100px down (animated)', () => {
      const ele = {
        scrollTop: 0,
      };

      const to = 100;
      const initialScrollTop = ele.scrollTop;
      const duration = 400;

      scrollTo(ele, to, duration);

      setTimeout(() => {
        expect(ele.scrollTop).toEqual(to - initialScrollTop);
      }, duration);
    });

    it('should scroll to given element 100px down (duration less than increment)', () => {
      const ele = {
        scrollTop: 0,
      };

      const to = 100;
      const initialScrollTop = ele.scrollTop;
      const duration = 10;

      scrollTo(ele, to, duration);

      setTimeout(() => {
        expect(ele.scrollTop).toEqual(to - initialScrollTop);
      }, duration);
    });

    it('should use the default value of 400 for duration if it\'s not set)', () => {
      const ele = {
        scrollTop: 0,
      };

      const to = 100;
      const initialScrollTop = ele.scrollTop;

      scrollTo(ele, to);

      setTimeout(() => {
        expect(ele.scrollTop).toEqual(to - initialScrollTop);
      }, 400);
    });

    it('should calculate easing for a given scroll interval (easeInOutQuad)', () => {
      const scroll = {
        val: 50,
        t: 20,
        b: 0,
        c: 100,
        d: 40,
      };

      expect(easeInOutQuad(scroll.t, scroll.b, scroll.c, scroll.d)).toEqual(scroll.val);
    });
  });

  describe('isInViewport', () => {
    it('should return true if element is in viewport', () => {
      window.innerHeight = 600;
      const element = {
        getBoundingClientRect: () => ({
          top: 10,
          bottom: 500,
        }),
      };
      expect(isInViewport(element)).toBeTruthy();
    });

    it('should return false if element is not in viewport', () => {
      window.innerHeight = 600;
      const element = {
        getBoundingClientRect: () => ({
          top: 700,
          bottom: 1000,
        }),
      };
      expect(isInViewport(element)).toBeFalsy();
    });

    it('should return true if part of the element is in viewport ', () => {
      window.innerHeight = 600;
      const element = {
        getBoundingClientRect: () => ({
          top: 700,
          bottom: 500,
        }),
      };
      expect(isInViewport(element, 300)).toBeFalsy();
    });

    it('should return false if part of the element is not in viewport ', () => {
      window.innerHeight = 600;
      const element = {
        getBoundingClientRect: () => ({
          top: 700,
          bottom: 500,
        }),
      };
      expect(isInViewport(element, 550)).toBeFalsy();
    });

    it('should return false if there is not window', () => {
      const oldWindow = global.window;
      delete global.window;
      const element = {
        getBoundingClientRect: () => ({
          top: 10,
          bottom: 500,
        }),
      };
      expect(isInViewport(element)).toBeFalsy();
      global.window = oldWindow;
    });
    it('should return false if there is no element', () => {
      const element = null;
      expect(isInViewport(element)).toBeFalsy();
    });
  });

  describe('truncateString', () => {
    it('should return same string if shorter than char limit', () => {
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncateString(str);
      expect(truncStr).toEqual(str);
    });
    it('should not return a string with a space before the appended character', () => {
      const charLimit = 10;
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncateString(str, charLimit);
      expect(truncStr.charAt(truncStr.length - 1)).not.toEqual(' ');
    });
    it('should return a truncated string if it is longer than char limit', () => {
      const charLimit = 9;
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncateString(str, charLimit, '…', false);
      expect(truncStr).toEqual('The quic…');
    });
    it('should return a truncated string with full words', () => {
      const charLimit = 10;
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncateString(str, charLimit);
      expect(truncStr).toEqual('The quick…');
    });
    it('should return a truncated string that does NOT end in a space', () => {
      const charLimit = 10;
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncateString(str, charLimit, '', false);
      expect(truncStr).toEqual('The quick');
    });
    it('should return the same value if not exist', () => {
      const truncStr = truncateString(null, 10, '', false);
      expect(truncStr).toEqual(null);
    });
  });

  describe('truncate', () => {
    it('should return same string if shorter than char limit', () => {
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncate(str);
      expect(truncStr).toEqual(str);
    });
    it('should not return a string with a space before the appended character', () => {
      const charLimit = 10;
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncate(str, { maxChars: charLimit });
      expect(truncStr.charAt(truncStr.length - 1)).not.toEqual(' ');
    });
    it('should return a truncated string if it is longer than char limit', () => {
      const charLimit = 9;
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncate(str, {
        maxChars: charLimit,
        append: '…',
        onlyFullWords: false,
      });
      expect(truncStr).toEqual('The quic…');
    });
    it('should return a truncated string with full words', () => {
      const charLimit = 10;
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncate(str, {
        maxChars: charLimit,
      });
      expect(truncStr).toEqual('The quick…');
    });
    it('should return a truncated string that does NOT end in a space', () => {
      const charLimit = 10;
      const str = 'The quick brown fox jumps over the lazy dog.';
      const truncStr = truncate(str, {
        maxChars: charLimit,
        append: '',
        onlyFullWords: false,
      });
      expect(truncStr).toEqual('The quick');
    });
    it('should return the same value if not exist', () => {
      const truncStr = truncate(null, {
        maxChars: 10,
        append: '',
        onlyFullWords: false,
      });
      expect(truncStr).toEqual(null);
    });
  });

  describe('isValidArray', () => {
    it('should be true if array and not empty', () => {
      expect(isValidArray(['a', 'b'])).toBe(true);
    });
    it('should be false is argument is not array', () => {
      expect(isValidArray('')).toBe(false);
    });
    it('should be false is empty array', () => {
      expect(isValidArray([])).toBe(false);
    });
  });

  describe('isValidObject', () => {
    it('should return true if its a valid object', () => {
      expect(isValidObject({ a: 'a', b: 'b' })).toBeTruthy();
    });
    it('should be falsy is argument is not Object', () => {
      expect(isValidObject('')).toBeFalsy();
    });
    it('should be falsy is empty Object', () => {
      expect(isValidObject({})).toBeFalsy();
    });
    it('should be falsy if object is null ', () => {
      expect(isValidObject(null)).toBeFalsy();
    });
    it('should be falsy if param is undefined ', () => {
      expect(isValidObject(undefined)).toBeFalsy();
    });
  });

  describe('isValidString', () => {
    it('should return true if passed value is a string', () => {
      expect(isValidString('I am a string')).toBe(true);
    });

    it('should return false if passed value is not a string', () => {
      expect(isValidString([])).toBe(false);
    });

    it('should return false if passed value is undefined', () => {
      expect(isValidString(undefined)).toBe(false);
    });

    it('should return false if passed value is null', () => {
      expect(isValidString(null)).toBe(false);
    });
  });

  describe('isValidValue', () => {
    it('should return false if the given value is undefined', () => {
      expect(isValidValue()).toBe(false);
    });

    it('should return false if the given value is null', () => {
      expect(isValidValue(null)).toBe(false);
    });

    it('should return false if the given value is an empty string', () => {
      expect(isValidValue('')).toBe(false);
    });

    it('should return false if the given value is NaN', () => {
      expect(isValidValue(Number.parseInt('invalid', 10))).toBe(false);
    });

    it('should return true if the given value is a string', () => {
      expect(isValidValue('test')).toBe(true);
    });

    it('should return true if the given value is a boolean of true', () => {
      expect(isValidValue(true)).toBe(true);
    });

    it('should return true if the given value is a boolean of false', () => {
      expect(isValidValue(false)).toBe(true);
    });

    it('should return true if the given value is 0', () => {
      expect(isValidValue(0)).toBe(true);
    });
  });

  describe('getWidgetType', () => {
    it('should get type from generic widget', () => {
      const widget = {
        settings: {
          genericWidget: {
            type: 'widget-a',
          },
        },
      };
      expect(getWidgetType(widget)).toBe('widget-a');
    });

    it('should get type', () => {
      const widget = {
        type: 'widget-b',
      };
      expect(getWidgetType(widget)).toBe('widget-b');
    });

    it('should return null if widget null', () => {
      const widget = null;
      expect(getWidgetType(widget)).toBe(null);
    });
  });

  describe('cloneDeep', () => {
    it('should not mutate the parent value', () => {
      const data = {
        social: {
          value: 'test',
        },
      };
      const clonedData = cloneDeep(data);
      clonedData.social.value = 'test 2';
      expect(data.social.value).toEqual('test');
    });
  });

  describe('getSocialNetworks', () => {
    it('should return an empty array if there is not social networks', () => {
      expect(getSocialNetworks({}, [])).toHaveLength(0);
    });

    it('should return an empty array if there is not matching social networks', () => {
      const content = {
        socialNetworks: {
          facebookUrl: {
            name: 'facebook',
          },
          randomUrl: {
            name: 'random',
          },
        },
      };
      expect(getSocialNetworks(content, [])).toHaveLength(0);
    });

    it('should return the social networks from Object', () => {
      const content = {
        socialNetworks: {
          facebookUrl: {
            name: 'facebook',
          },
          randomUrl: {
            name: 'random',
          },
        },
      };
      expect(getSocialNetworks(content, ['facebook', 'instagram'])).toHaveLength(1);
    });

    it('should return the social networks from Array', () => {
      const content = {
        socialNetworks: [{
          name: 'Facebook',
          href: '#',
        }],
      };

      expect(getSocialNetworks(content)).toEqual(content.socialNetworks);
    });
  });

  describe('getFirstMatch', () => {
    expect(getFirstMatch(['deportes', 'nba', 'heat'], ['lakers', 'heat', 'clippers'])).toBe('heat');
    expect(getFirstMatch(['deportes', 'nba', 'clippers'], ['lakers', 'heat', 'clippers'])).toBe('clippers');
    expect(getFirstMatch(['deportes', 'nba', 'lakers'], ['lakers', 'heat', 'clippers'])).toBe('lakers');
    expect(getFirstMatch(['deportes', 'nba', 'lakers'], ['lakers', 'heat', 'deportes'])).toBe('deportes');
    expect(getFirstMatch(['deportes', 'nba', 'lakers'], ['cocina', 'carnes'])).not.toBeDefined();
    expect(getFirstMatch(null, null)).toBe(null);
  });

  describe('arrayIncludes', () => {
    it('should return true if one array includes the other', () => {
      expect(arrayIncludes(['a', 'b', 'c', 'd', ''], ['a', 'b', ''])).toBe(true);
    });
    it('should return false if one of them is not array', () => {
      expect(arrayIncludes(['a', 'b', 'c', 'd', ''], {})).toBe(false);
    });
    it('should return false if one of them is not included inside the other', () => {
      expect(arrayIncludes(['a', 'b', 'c', 'd', ''], ['x', 'y'])).toBe(false);
    });
  });

  describe('cleanArray', () => {
    const array = ['a', 'b', '', 'c', 'd', '', 'e', 'f', ''];
    const expected = ['a', 'b', 'c', 'd', 'e', 'f'];
    it('should return a cleaned array as expected one', () => {
      expect(cleanArray(array)).toEqual(expected);
    });
  });

  describe('cleanUrl', () => {
    it('should return the same value if is not a string', () => {
      expect(cleanUrl(null)).toBeNull();
    });
    it('should return the sama value if is root URL', () => {
      expect(cleanUrl('/')).toBe('/');
    });
    it('should return the URL without / on the end', () => {
      expect(cleanUrl('https://univison.com/deportes/')).toBe('/deportes');
      expect(cleanUrl('/noticias/shows/')).toBe('/noticias/shows');
    });
    it('should return the URL without * on the end', () => {
      expect(cleanUrl('https://univison.com/deportes/fulbol/liga-mx-clausura*')).toBe('/deportes/fulbol/liga-mx-clausura');
      expect(cleanUrl('/deportes/futbol/*')).toBe('/deportes/futbol');
    });
    it('should return the relative URL', () => {
      expect(cleanUrl('https://univison.com/entretenimeinto/show/gordo-flaca')).toBe('/entretenimeinto/show/gordo-flaca');
      expect(cleanUrl('https://performance.univison.com/entretenimeinto/show/gordo-flaca/')).toBe('/entretenimeinto/show/gordo-flaca');
    });
  });

  describe('partitionArray', () => {
    it('partitionArray runs as expected', () => {
      const list = [1, 2, 3, 4, 5, 6];
      const columns = partitionArray(list);
      expect(columns).toHaveLength(2);
      expect(columns[0]).toEqual({ contents: [1, 2, 3], key: 0 });
      expect(columns[1]).toEqual({ contents: [4, 5, 6], key: 1 });
      const shorty = [1, 2];
      expect(partitionArray(shorty)).toEqual([{ contents: shorty, key: 0 }]);
    });
  });

  describe('sanitizeHtml', () => {
    const htmlText = 'This is a mock <strong>test</strong> description! <a href="#">Link</a>';
    it('should remove the html tags from the text', () => {
      expect(sanitizeHtml(htmlText)).not.toContain('<strong>');
      expect(sanitizeHtml(htmlText)).not.toContain('<a href="#">');
    });
  });

  describe('safeClassName', () => {
    it('should return correct class with acents', () => {
      const str = 'Televisión';
      const classname = safeClassName(str);
      expect(classname).toEqual('television');
    });
    it('should return correct class with spaces', () => {
      const str = 'En Vivo';
      const classname = safeClassName(str);
      expect(classname).toEqual('en-vivo');
    });
    it('should return correct class with caps, numbers & simbols', () => {
      const str = ' CAPS numb3rs$&·#';
      const classname = safeClassName(str);
      expect(classname).toEqual('-caps-numb3rs__0024__0026__00b7__0023');
    });
  });

  describe('insertLinksByPosition', () => {
    it('should add new links', () => {
      const links = [{ name: 'test', link: '' }];
      const linksToInsert = [{ name: 'newLink', link: '', position: 1 }];
      const newLinks = insertLinksByPosition(links, linksToInsert);
      expect(newLinks[1].name).toEqual('newLink');
    });

    it('should add new links even if does not have position', () => {
      const links = [{ name: 'test', link: '' }];
      const linksToInsert = [{ name: 'newLink', link: '' }];
      const newLinks = insertLinksByPosition(links, linksToInsert);
      expect(newLinks[0].name).toEqual('newLink');
    });
  });

  describe('isRelativeUrl', () => {
    it('should return true for relative urls', () => {
      expect(isRelativeUrl('/test-path/1')).toBe(true);
      expect(isRelativeUrl('test-path/1')).toBe(true);
    });
    it('should return false for absolute urls', () => {
      const url = 'http://test.com/test-path/1';
      expect(isRelativeUrl(url)).toBe(false);
    });
    it('should return false for domain without protocol', () => {
      const url = 'performance.test.com/test-path/1';
      expect(isRelativeUrl(url)).toBe(false);
    });
    it('should return false for others protocols like mailto/whatsapp', () => {
      expect(isRelativeUrl('mailto:test@univision.com')).toBe(false);
      expect(isRelativeUrl('whatsapp://+13179795000')).toBe(false);
    });
    it('should return false if not a valid URL', () => {
      const url = null;
      expect(isRelativeUrl(url)).toBe(false);
    });
  });

  describe('isAbsoluteUrl', () => {
    it('should return true for relative urls', () => {
      const url = 'http://test.com/test-path/1';
      expect(isAbsoluteUrl(url)).toBeTruthy();
    });
    it('should return false for relative urls', () => {
      const url = '/test-path/1';
      expect(isAbsoluteUrl(url)).toBeFalsy();
    });
  });

  describe('removeLinksByPosition', () => {
    it('should remove links by position', () => {
      const links = [{ name: 'test', link: '', url: '' }];
      const linksToRemove = [1, 2];
      const newLinks = removeLinksByPosition(links, linksToRemove);
      expect(newLinks).toHaveLength(1);
    });
  });

  describe('loadExternalScript', () => {
    const element = {
      appendChild: jest.fn(),
    };
    it('should not fail without params', () => {
      const params = { id: 'test' };
      loadExternalScript(params);
    });
    it('should add the script with src', () => {
      spyOn(global.document, 'querySelector').and.returnValue(element);
      const params = { id: 'test', src: 'https://www.univision.com' };
      loadExternalScript(params);
      expect(element.appendChild).toHaveBeenCalled();
    });
    it('should add the script with text', () => {
      spyOn(global.document, 'querySelector').and.returnValue(element);
      const params = { id: 'test', text: '!function(d,s,id){var js}' };
      loadExternalScript(params);
      expect(element.appendChild).toHaveBeenCalled();
    });
    it('should set default values to object', () => {
      spyOn(global.document, 'querySelector').and.returnValue(element);
      loadExternalScript();
      expect(element.appendChild).toHaveBeenCalled();
    });
    it('should set the selectior id to params settings', () => {
      spyOn(global.document, 'querySelector').and.returnValue(element);
      loadExternalScript({ elId: 'test' });
      expect(element.appendChild).toHaveBeenCalled();
    });
    it('should not append child if windows does not exist', () => {
      spyOn(global.document, 'querySelector').and.returnValue(element);
      delete global.window;
      loadExternalScript({ elId: 'test' });
      expect(element.appendChild).toHaveBeenCalled();
    });
    it('should avoid loading the same script if unique is true', () => {
      element.appendChild = jest.fn();
      spyOn(global.document, 'getElementById').and.returnValue(true);
      loadExternalScript({ id: 'unique-test', unique: true });
      expect(element.appendChild).not.toHaveBeenCalled();
    });
    it('should avoid loading the same script and call onLoad if the namespace is already defined', () => {
      element.appendChild = jest.fn();
      const onLoad = jest.fn();
      window.test = 'test';
      loadExternalScript({ namespace: 'test', onLoad });
      expect(element.appendChild).not.toHaveBeenCalled();
      expect(onLoad).toHaveBeenCalled();
    });
    it('should set the selector to head if in params', () => {
      spyOn(global.document, 'querySelector').and.returnValue(element);
      loadExternalScript({ head: true });
      expect(element.appendChild).toHaveBeenCalled();
    });
  });

  describe('locationRedirect', () => {
    let windowLocation;

    beforeEach(() => {
      windowLocation = global.window.location;
      delete global.window.location;
      global.window.location = { href: 'https://univision.com' };
    });

    afterEach(() => {
      global.window.location = windowLocation;
    });

    it('should not redirect if is not a valid url', () => {
      const redirect = locationRedirect(null);
      expect(redirect).toEqual(expect.any(Function));
      redirect();
      expect(window.location.href).toEqual('https://univision.com');
    });
    it('should redirect to the provided url', () => {
      const redirect = locationRedirect('https://univision.com/path');
      expect(redirect).toEqual(expect.any(Function));
      redirect();
      expect(window.location.href).toEqual('https://univision.com/path');
    });

    it('should not redirect on SPA mode.', () => {
      // create a mock window
      const mockWindow = {
        location: {
          href: '#',
        },
        dispatchEvent: jest.fn(),
      };
      // mock the global window object
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => mockWindow);
      Store.dispatch(setPageData({
        isSpa: true,
      }));
      const redirect = locationRedirect('https://univision.com/path');
      expect(redirect).toEqual(expect.any(Function));
      redirect();
      expect(window.location.href).not.toEqual('https://univision.com/path');
    });

    it('should redirect on SPA mode if is an external domain/link', () => {
      Store.dispatch(setPageData({
        isSpa: true,
      }));
      const redirect = locationRedirect('https://uvndeportes.onelink.me/TXKR/aaa82dac');
      expect(redirect).toEqual(expect.any(Function));
      redirect();
      expect(window.location.href).toEqual('https://uvndeportes.onelink.me/TXKR/aaa82dac');
    });

    it('should make anchor on spa page if url is a hash', () => {
      // create a mock window
      const pushStateSpy = jest.fn();
      const scrollBySpy = jest.fn();
      const mockWindow = {
        location: {
          href: '#',
        },
        history: {
          pushState: pushStateSpy,
        },
        scrollBy: scrollBySpy,
      };
      // mock the global window object
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => mockWindow);
      Store.dispatch(setPageData({
        isSpa: true,
      }));
      document.querySelector = () => ({
        scrollIntoView: jest.fn(),
        dataset: {},
      });
      locationRedirect('#divId')();
      expect(pushStateSpy).toHaveBeenCalledWith(null, null, '#divId');
      expect(scrollBySpy).toHaveBeenCalledWith(0, -0);
    });

    it('should href if url is a hash but element not exists', () => {
      // create a mock window
      const pushStateSpy = jest.fn();
      const scrollBySpy = jest.fn();
      const mockWindow = {
        location: {
          href: '#',
        },
        history: {
          pushState: pushStateSpy,
        },
        scrollBy: scrollBySpy,
      };
      // mock the global window object
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => mockWindow);
      Store.dispatch(setPageData({
        isSpa: true,
      }));
      document.querySelector = () => null;
      locationRedirect('#divId')();
      expect(pushStateSpy).not.toHaveBeenCalled();
      expect(scrollBySpy).not.toHaveBeenCalledWith();
      expect(window.location.href).toEqual('#divId');
    });

    it('should redirect hashtag anchors on SPA mode.', () => {
      Store.dispatch(setPageData({
        isSpa: true,
      }));
      const redirect = locationRedirect('https://univision.com/path#divId');
      expect(redirect).toEqual(expect.any(Function));
      redirect();
      expect(window.location.href).toEqual('https://univision.com/path#divId');
    });
  });

  describe('locationWindowRedirect', () => {
    it('should redirect to the provided url', () => {
      const test = openInNewWindow(null);
      expect(test).toBeNull();
    });
  });

  describe('isClientSide', () => {
    it('should return true if window is defined', () => {
      expect(isClientSide()).toBe(true);
    });

    it('should return false if window is undefined', () => {
      delete global.window;
      expect(isClientSide()).toBe(false);
    });
  });

  describe('isBreakingNews', () => {
    it('returns true if the leadCardContent have the breakingNews property', () => {
      const leadCardContent = {
        breakingNews: true,
      };
      expect(isBreakingNews(leadCardContent)).toBe(true);
    });
    it('returns true if the ContentCard have the breaking_news value in contentPriority property', () => {
      const leadCardContent = {
        contentPriority: 'breaking_news',
      };
      expect(isBreakingNews(leadCardContent)).toBe(true);
    });
    it('returns true if in the settings of the widget have the showBreakingNewsLabel property', () => {
      const settings = {
        showBreakingNewsLabel: true,
      };
      expect(isBreakingNews(settings)).toBe(true);
    });
  });

  describe('cleanObject', () => {
    it('should returns same content if not array', () => {
      expect(cleanObject(null, '')).toBe(null);
    });
    it('should returns same content if is array but without objects', () => {
      const contents = ['no object'];
      expect(cleanObject(contents, [0])).toEqual(contents);
    });
    it('should returns array content without "showNative" key', () => {
      const contents = [
        {
          a: 'test',
          showNative: true,
        },
        {
          b: 'test',
        },
      ];
      expect(cleanObject(contents, ['showNative'])).toEqual([{ a: 'test' }, { b: 'test' }]);
    });
    it('should returns object without "testArray" key', () => {
      const contents = {
        a: 'test',
        testArray: [],
      };
      expect(cleanObject(contents, ['testArray'])).toEqual({ a: 'test' });
    });
  });

  describe('pickObject', () => {
    it('should returns same content if not a valid object/array', () => {
      expect(pickObject(null)).toBe(null);
    });
    it('should returns same content if not have valid keys array', () => {
      const contents = { foo: 'bar' };
      expect(pickObject(contents)).toBe(contents);
    });
    it('should returns same content if is array but without objects', () => {
      const contents = ['no object'];
      expect(pickObject(contents, [0])).toEqual(contents);
    });
    it('should returns array content only with keep keys', () => {
      const contents = [
        {
          a: 'keep',
          showNative: true,
        },
        {
          a: 'keep2',
          b: 'ignore',
        },
      ];
      expect(pickObject(contents, ['a'])).toEqual([{ a: 'keep' }, { a: 'keep2' }]);
    });
    it('should returns object only with keep keys', () => {
      const contents = {
        a: 'keep',
        testArray: [],
      };
      expect(pickObject(contents, ['a'])).toEqual({ a: 'keep' });
    });
    it('should returns deep object only with keep keys', () => {
      const contents = {
        a: 'keep',
        testArray: [],
        testObject: {
          a: 'keep2',
          b: 'ignore',
        },
        keepArray: [{
          a: 'keep3',
          b: 'ignore',
        }],
      };
      expect(pickObject(contents, ['a'])).toEqual({
        a: 'keep',
        testObject: {
          a: 'keep2',
        },
        keepArray: [{
          a: 'keep3',
        }],
      });
    });
  });

  describe('isValidNumber', () => {
    it('should return truthy when number is valid', () => {
      expect(isValidNumber('0')).toBeTruthy();
      expect(isValidNumber(100)).toBeTruthy();
    });
    it('should be falsy when number is null', () => {
      expect(isValidNumber(null)).toBeFalsy();
    });
    it('should be falsy when number is undefined', () => {
      expect(isValidNumber(undefined)).toBeFalsy();
    });
    it('should be truthy when number is negative', () => {
      expect(isValidNumber(-10)).toBeTruthy();
      expect(isValidNumber('-10')).toBeTruthy();
    });
    it('should be truthy for client', () => {
      expect(isValidNumber('123')).toBeTruthy();
    });
  });

  describe('isValidFunction', () => {
    it('should return true when receiving a function', () => {
      expect(isValidFunction(() => { })).toBe(true);
    });

    it('should return false when not receiving a function', () => {
      expect(isValidFunction('not a function')).toBe(false);
    });

    it('should return false when receiving a null value', () => {
      expect(isValidFunction(null)).toBe(false);
    });

    it('should return false when receiving undefined', () => {
      expect(isValidFunction(undefined)).toBe(false);
    });

    it('should return false when receiving no value', () => {
      expect(isValidFunction()).toBe(false);
    });
  });

  describe('getCurrentBreakPoint', () => {
    it('should get Default breakpoint', () => {
      const [bpSize, bpWidth, bpDevice] = (0, getCurrentBreakPoint)('xs');
      expect(bpSize).toBe('xs');
      expect(bpWidth).toBe(480);
      expect(bpDevice).toBe('mobile');
    });
    it('should get xs breakpoint', () => {
      global.window.innerWidth = 480;
      const [bpSize, bpWidth, bpDevice] = (0, getCurrentBreakPoint)();
      expect(bpSize).toBe('xs');
      expect(bpWidth).toBe(480);
      expect(bpDevice).toBe('mobile');
    });
  });

  describe('getBreakPointByWidth', () => {
    it('should get sm breakpoint', () => {
      const [bpSize, bpWidth, bpDevice] = getBreakPointByWidth(768);
      expect(bpSize).toBe('sm');
      expect(bpWidth).toBe(768);
      expect(bpDevice).toBe('tablet');
    });
    it('should get md breakpoint', () => {
      const [bpSize, bpWidth, bpDevice] = getBreakPointByWidth(1024);
      expect(bpSize).toBe('md');
      expect(bpWidth).toBe(1024);
      expect(bpDevice).toBe('tablet');
    });
    it('should get lg breakpoint', () => {
      const [bpSize, bpWidth, bpDevice] = getBreakPointByWidth(1280);
      expect(bpSize).toBe('lg');
      expect(bpWidth).toBe(1280);
      expect(bpDevice).toBe('desktop');
    });
    it('should get xl breakpoint', () => {
      const [bpSize, bpWidth, bpDevice] = getBreakPointByWidth(1440);
      expect(bpSize).toBe('xl');
      expect(bpWidth).toBe(1440);
      expect(bpDevice).toBe('desktop');
    });
  });

  describe('strip Html Tests', () => {
    it('should return the same string if the length is not greater than the default length', () => {
      const innerHTML = '<b>This is </b>a mock html text';
      document.createElement = jest.fn(element => ({
        tagName: element,
        innerHTML,
        innerText: 'This is a mock html text',
      }));
      const text = stripHtml(innerHTML);
      expect(innerHTML).toEqual(text);
    });

    it('should returns a string without tags htmls', () => {
      const text = stripTagsHtml('<b>This is </b>a mock html text');
      expect(text).toEqual('This is a mock html text');
    });
    it('should returns a string without tags htmls from textContent property', () => {
      const innerHTML = '<b>This is </b>a mock html text';
      document.createElement = jest.fn(element => ({
        tagName: element,
        innerHTML,
        innerText: undefined,
        textContent: 'This is a mock html text',
      }));
      const text = stripTagsHtml(innerHTML);
      expect(text).toEqual('This is a mock html text');
    });
    it('should returns null when document.createElement is not a function in both strip functions', () => {
      document.createElement = undefined;
      const textStrip = stripHtml('');
      const textStripTags = stripTagsHtml('');
      expect(textStrip).toBeNull();
      expect(textStripTags).toBeNull();
    });
  });

  describe('slugify', () => {
    it('should return the correct string', () => {
      const string = 'Géminis: 21 de mayo - 20 de junio';
      const expected = 'geminis-21-de-mayo-20-de-junio';
      const text = slugify(string);
      expect(text).toEqual(expected);
    });
    it('should return null if text is not a string', () => {
      const string = ['bar'];
      const text = slugify(string);
      expect(text).toEqual(null);
    });
    it('should return same string if user agent does not support normilize', () => {
      jest.spyOn(String.prototype, 'normalize').mockReturnValueOnce(null);
      const string = 'Géminis: 21 de mayo - 20 de junio';
      expect(slugify(string)).toBe(string);
    });
  });

  describe('deburr', () => {
    it('should return an empty string if param is not a string', () => {
      expect(deburr(null)).toBe('');
    });

    it('should return a sanitized string without any accents or diacritics [1]', () => {
      expect(deburr('crème brulée')).toBe('creme brulee');
    });

    it('should return a sanitized string without any accents or diacritics [2]', () => {
      expect(deburr('América Latina - Bogotá')).toBe('America Latina - Bogota');
    });

    it('should return a sanitized string without any accents or diacritics [3]', () => {
      expect(deburr('ąśćńżółźćę')).toBe('ascnzołzce');
    });

    it('should return same string if user agent does not support normalize', () => {
      jest.spyOn(String.prototype, 'normalize').mockReturnValueOnce(null);
      const text = 'ąśćńżółźćę';
      expect(deburr(text)).toBe(text);
    });
  });

  describe('deburrToLowerCase', () => {
    it('should return an empty string if param is not a string', () => {
      expect(deburrToLowerCase(null)).toBe('');
    });

    it('should return a sanitized event action label', () => {
      expect(deburrToLowerCase('América Latina - Bogotá ')).toBe('america latina - bogota');
    });
  });

  describe('getKey', () => {
    it('should return undefined if the value is set to null', () => {
      const test = {
        juan: null,
        pedro: {
          perez: null,
        },
      };
      const param = 'pe';
      const testValue = getKey(test, `${param}dro.perez`);
      const testValue2 = getKey(test, 'juan');
      expect(testValue).toBeUndefined();
      expect(testValue2).toBeUndefined();
    });
    it('should return undefined if no arguments is sent', () => {
      const testValue = getKey();
      expect(testValue).toBeUndefined();
    });
    it('should return null if strict is set to true', () => {
      const test = {
        pedro: null,
      };
      const testValue = getKey(test, 'pedro', undefined, true);
      expect(testValue).toBeNull();
    });
    it('should return fallback if strict is set to true and the value is undefined', () => {
      const test = {
        pedro: undefined,
      };
      const testValue = getKey(test, 'pedro', 'foo', true);
      expect(testValue).toEqual('foo');
    });
    it('should return false and zero as valid', () => {
      const test = {
        pedro: 0,
        juan: false,
      };
      const testValue = getKey(test, 'pedro');
      const testValue2 = getKey(test, 'juan');
      expect(testValue).toEqual(0);
      expect(testValue2).toEqual(false);
    });
    it('should return false and zero as valid in strict mode', () => {
      const test = {
        pedro: 0,
        juan: false,
      };
      const testValue = getKey(test, 'pedro', null, true);
      const testValue2 = getKey(test, 'juan', null, true);
      expect(testValue).toEqual(0);
      expect(testValue2).toEqual(false);
    });
    it('should return the fallback value if the result is null or undefined', () => {
      const test = {
        pedro: null,
        juan: {
          perez: undefined,
        },
      };
      const param = 'pe';
      const testValue = getKey(test, `${param}dro.perez`, 'my fallback');
      const testValue2 = getKey(test, 'pedro', 'my fallback');
      expect(testValue).toEqual('my fallback');
      expect(testValue2).toEqual('my fallback');
    });
  });

  describe('isValidPromise suite', () => {
    it('should return false by default', () => {
      expect(isValidPromise()).toBe(false);
    });
    it('should return true when an actual Promise is provided', () => {
      const data = new Promise(resolve => resolve(null));
      expect(isValidPromise(data)).toBe(true);
    });
    it('should return false when something else is provided', () => {
      expect(isValidPromise(true)).toBe(false);
      expect(isValidPromise({})).toBe(false);
      expect(isValidPromise('promise')).toBe(false);
    });
  });

  describe('stripPathUrl', () => {
    it('should return the same value if is not a string', () => {
      expect(stripPathUrl(null, 'x')).toBeNull();
    });
    it('should return the URL without the /x/ path', () => {
      expect(stripPathUrl('https://univison.com/x/deportes/', 'x')).toBe('https://univison.com/deportes/');
      expect(stripPathUrl('https://univison.com/deportes/x/', 'x')).toBe('https://univison.com/deportes/');
      expect(stripPathUrl('/deportes/x/', 'x')).toBe('/deportes/');
      expect(stripPathUrl('/x/deportes/', 'x')).toBe('/deportes/');
      expect(stripPathUrl('/x/', 'x')).toBe('/');
    });
  });

  describe('isLandscape', () => {
    it('should return true when width > height', () => {
      // create a mock window
      const mockWindow = {
        location: {
          href: '#',
        },
        innerHeight: 200,
        innerWidth: 300,
      };
      // mock the global window object
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => mockWindow);
      expect(isLandscape()).toBe(true);
    });
    it('should return false when width < height', () => {
      // create a mock window
      const mockWindow = {
        location: {
          href: '#',
        },
        innerHeight: 300,
        innerWidth: 200,
      };
      // mock the global window object
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => mockWindow);
      expect(isLandscape()).toBe(false);
    });
    it('should return null when no global.window', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => null);
      expect(isLandscape()).toBeNull();
    });
  });

  describe('fetchPageData', () => {
    it('should return appropriate data', async () => {
      // create a mock window
      const mockWindow = {
        location: {
          protocol: 'http:',
        },
      };
      // mock the global window object
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => mockWindow);
      const requestSpy = jest.spyOn(request, 'default').mockReturnValue(Promise.resolve({}));
      Store.dispatch(setPageData({
        config: {
          syndicator: {
            content: 'https://syndicator.univision.com/web-api/content',
          },
        },
      }));

      await fetchPageData('/local/miami-wltv', { pageNumber: 2 });

      expect(requestSpy).toHaveBeenCalledWith({
        params: {
          pageNumber: 2,
          url: 'http://www.univision.com/local/miami-wltv',
        },
        uri: 'https://syndicator.univision.com/web-api/content',
      });
    });

    it('should return a rejected promise when the given URI is not a string', () => {
      expect.assertions(1);
      return fetchPageData(null, { pageNumber: 2 })
        .catch((err) => {
          // This error is expected to come from node-url
          expect(err.constructor.name).toBe('TypeError');
        });
    });
  });

  describe('alphabeticallyByName', () => {
    describe('first object comes before second object', () => {
      it('should return a negative number', () => {
        expect(alphabeticallyByName(
          { name: 'John Snow' },
          { name: 'Khaleesi' },
        ) < 0).toBe(true);
      });
    });

    describe('second object comes before first object', () => {
      it('should return a positive number', () => {
        expect(alphabeticallyByName(
          { name: 'Zebra' },
          { name: 'Lion' },
        ) > 0).toBe(true);
      });
    });

    describe('first object has same order as second object', () => {
      it('should return 0', () => {
        expect(alphabeticallyByName(
          { name: 'Ámerica' },
          { name: 'Ámerica' }
        ) === 0).toBe(true);
      });
    });
  });
});

describe('getFromMap helper', () => {
  it('should return the mapped value', () => {
    const options = getFromMap('field', {
      field: 'value',
    });

    expect(options).toEqual('value');
  });

  it('should execute and return the mapped value', () => {
    const options = getFromMap('field', {
      field: () => 'value',
    });

    expect(options).toEqual('value');
  });

  it('should return the default value', () => {
    const options = getFromMap('field', {
      default: 'default',
    });

    expect(options).toEqual('default');
  });

  it('should return null if no have mapped value and no default', () => {
    let field;
    const options = getFromMap('field', { field });

    expect(options).toEqual(null);
  });

  it('should return null if not a valid map object', () => {
    const options = getFromMap('field', {});

    expect(options).toEqual(null);
  });
});

describe('getFromMapPattern helper', () => {
  it('should return the mapped function value', () => {
    const value = jest.fn();
    const dataFn = getFromMapPattern('/foo/test/bar/', {
      '/test/*': value,
    });

    expect(dataFn).toEqual(value);
  });

  it('should return the mapped function value if strict', () => {
    const value = jest.fn();
    const dataFn = getFromMapPattern('/test/something', {
      '/test/something': value,
    }, jest.fn(), true);

    expect(dataFn).toEqual(value);
  });

  it('should not return the mapped value if is not valid function', () => {
    const dataFn = getFromMapPattern('foo', {
      foo: {},
    });

    expect(dataFn).toEqual(expect.any(Function));
  });

  it('should return the fallback value', () => {
    const fallbackFn = jest.fn();
    const dataFn = getFromMapPattern('field', {}, fallbackFn);

    expect(dataFn).toEqual(fallbackFn);
  });

  it('should return always a function even if not match data', () => {
    const dataFn = getFromMapPattern('field', {});

    expect(dataFn).not.toThrow();
    expect(dataFn).toEqual(expect.any(Function));
  });
});

describe('getSiteDomainFromHref', () => {
  it('should return the URL with univision site domain', () => {
    const sites = {
      univision: 'http://local.fe.univision.com',
      tudn: 'http://local.fe.tudn.com',
    };
    expect(getSiteDomainFromHref('http://univision.com/test', sites)).toBe('http://local.fe.univision.com');
  });

  it('should return the URL with tudn site domain', () => {
    const sites = {
      univision: 'http://local.fe.univision.com',
      tudn: 'http://local.fe.tudn.com',
    };
    expect(getSiteDomainFromHref('http://tudn.com/test', sites)).toBe('http://local.fe.tudn.com');
  });

  it('should return the univision domain if not have valid sites', () => {
    expect(getSiteDomainFromHref('http://univision.com/test')).toBeNull();
  });
});

describe('isInUnivisionDomain', () => {
  it('should return true for univision/tudn URLs', () => {
    expect(isInUnivisionDomain('univision.com/test')).toBe(false);
    expect(isInUnivisionDomain('www.univisionnow.com/channels')).toBe(false);
    expect(isInUnivisionDomain('www.univision.com/test')).toBe(true);
    expect(isInUnivisionDomain('www.tudn.com/test')).toBe(true);
    expect(isInUnivisionDomain('www.tudn.net/test')).toBe(false);
    expect(isInUnivisionDomain('performance.univision.com/test')).toBe(true);
    expect(isInUnivisionDomain('tudn.performance.univision.com/test')).toBe(true);
  });

  it('should return false for not univision/tudn URLs', () => {
    expect(isInUnivisionDomain('www.google.com/test')).toBe(false);
  });
});

describe('isMailTo', () => {
  it('should return true for mail:to URL', () => {
    expect(isMailToUrl('mailto:univision.com/test')).toBe(true);
  });

  it('should return false for not mail:to URL', () => {
    expect(isMailToUrl('tudn.com/test')).toBe(false);
  });
});

describe('areInSameUnivisionDomain', () => {
  it('should return false for null', () => {
    expect(areInSameUnivisionDomain(null, null)).toBe(false);
  });
  it('should return false for different domains', () => {
    const a = 'https://www.univision.com';
    const b = 'https://www.tudn.com';
    expect(areInSameUnivisionDomain(a, b)).toBe(false);
  });
  it('should return false if not exact univision domain', () => {
    const a = 'https://www.univisionnow.com';
    const b = 'https://www.univisionnow.com';
    expect(areInSameUnivisionDomain(a, b)).toBe(false);
  });
  it('should return true for same domains', () => {
    const a = 'https://www.tudn.com/futbol';
    const b = 'https://www.tudn.com/natacion';
    expect(areInSameUnivisionDomain(a, b)).toBe(true);
  });
  it('should return true for relative urls', () => {
    const a = '/futbol';
    const b = '/natacion';
    expect(areInSameUnivisionDomain(a, b)).toBe(true);
  });
  it('should return true if not api gateway domain', () => {
    const a = 'https://ydzgd0hy3d.execute-api.us-east-1.amazonaws.com/';
    const b = 'https://ydzgd0hy3d.execute-api.us-east-1.amazonaws.com/';
    expect(areInSameUnivisionDomain(a, b)).toBeTruthy();
  });
});

describe('sortById', () => {
  describe('first object comes before second object', () => {
    it('should return a negative number', () => {
      expect(sortById(
        { id: 1 },
        { id: 2 },
      ) < 0).toBe(true);
    });
  });

  describe('second object comes before first object', () => {
    it('should return a positive number', () => {
      expect(sortById(
        { id: 2 },
        { id: 1 },
      ) > 0).toBe(true);
    });
  });

  describe('first object has same order as second object', () => {
    it('should return 0', () => {
      expect(sortById(
        { id: 1 },
        { id: 1 }
      ) === 0).toBe(true);
    });
  });
  describe('if no valid object should return null', () => {
    it('should return 0', () => {
      expect(sortById(
        {},
        { id: 1 }
      )).toBe(null);
    });
  });
});

/** @test {phoneHelpers} */
describe('Phone Helpers', () => {
  it('should format a phone number', () => {
    const phoneNumber = '5558880000';
    expect(phoneFormat(phoneNumber)).toBe('555.888.0000');
  });

  it('should format a phone number with separators in it', () => {
    const phoneNumber = '555-888-0000';
    expect(phoneFormat(phoneNumber)).toBe('555.888.0000');
  });

  it('should format a phone number with a custom separator', () => {
    const phoneNumber = '5558880000';
    expect(phoneFormat(phoneNumber, '-')).toBe('555-888-0000');
  });

  it('should return the original parameter it does not match a phone number', () => {
    const phoneNumber = '-55588df0';
    expect(phoneFormat(phoneNumber, '-')).toBe('-55588df0');
  });

  it('should return null if there is no phone number send', () => {
    expect(phoneFormat()).toBeNull();
  });
});

/** @test {decompose Url} */
describe('Url decomposition', () => {
  it('should decompose Url into his individual parts', () => {
    const url = 'https://www.sub.domain.google.com:443/maps/place/Arc+De+Triomphe/@48.8737917,2.2928388,17z?query=1&foo#hash';
    expect(decomposeUrl(url)).toStrictEqual({
      domain: 'www.sub.domain.google.com',
      hash: 'hash',
      path: '/maps/place/Arc+De+Triomphe/@48.8737917,2.2928388,17z',
      port: '443',
      protocol: 'https://',
      query: 'query=1&foo',
      secondLevelDomain: 'sub.domain',
      subdomain: 'www',
      topLevelDomain: 'google.com',
      url: 'https://www.sub.domain.google.com:443/maps/place/Arc+De+Triomphe/@48.8737917,2.2928388,17z?query=1&foo#hash',
    });
  });

  it('should decompose Url into his individual parts for televisa sites', () => {
    const url = 'https://performance-elnu9ve.televisa.com/home-test-nu9ve/proyecbex-migration-cms-articulo-canal-nu9ve-test-5';
    expect(decomposeUrl(url)).toStrictEqual({
      domain: 'performance-elnu9ve.televisa.com',
      hash: undefined,
      path: '/home-test-nu9ve/proyecbex-migration-cms-articulo-canal-nu9ve-test-5',
      port: undefined,
      protocol: 'https://',
      query: undefined,
      secondLevelDomain: 'performance-elnu9ve',
      subdomain: undefined,
      topLevelDomain: 'televisa.com',
      url: 'https://performance-elnu9ve.televisa.com/home-test-nu9ve/proyecbex-migration-cms-articulo-canal-nu9ve-test-5',
    });
  });

  it('should not decompose a path', () => {
    const url = '/home-test-nu9ve/proyecbex-migration-cms-articulo-canal-nu9ve-test-5';
    expect(decomposeUrl(url)).toBe(null);
  });

  it('should return null if sent nothing', () => {
    expect(decomposeUrl()).toBe(null);
  });

  it('should return null if not valid url', () => {
    const url = '#';
    expect(decomposeUrl(url)).toBe(null);
  });
});
