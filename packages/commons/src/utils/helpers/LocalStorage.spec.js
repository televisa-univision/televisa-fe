import localStorage from './LocalStorage';

describe('localStorage with fallback', () => {
  it('set - uses fallback when localStorage is not available', () => {
    delete window.localStorage;
    localStorage.set('foo', 'bar');
    expect(localStorage.getFallback().foo).toBe('bar');
  });
  it('get - uses fallback when localStorage is not available', () => {
    localStorage.getFallback().bar = 'foo';
    expect(localStorage.get('bar')).toBe('foo');
  });
  it('removes the item from the localStorage', () => {
    localStorage.clear();
    localStorage.setObject('foo', { test: true });
    localStorage.remove('foo');
    expect(localStorage.getObject('foo')).toBe(undefined);
  });
});

describe('localStorage', () => {
  beforeAll(() => {
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: key => store[key],
        setItem: (key, value) => {
          if (key === 'fullStorage') {
            throw new Error();
          }
          store[key] = value.toString();
        },
        clear: () => { store = {}; },
        removeItem: (key) => { delete store[key]; }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('sets the value to localStorage', () => {
    localStorage.clear();
    localStorage.set('foo', 'bar');
    expect(localStorage.getFallback().foo).not.toBe('bar');
    expect(localStorage.get('foo')).toBe('bar');
  });

  it('gets the value from the localStorage', () => {
    localStorage.clear();
    localStorage.setObject('foo', { test: true });
    expect(localStorage.getObject('foo')).toEqual({ test: true });
  });

  it('removes the item from the localStorage', () => {
    localStorage.clear();
    localStorage.setObject('foo', { test: true });
    localStorage.remove('foo');
    expect(localStorage.getObject('foo')).toBe(undefined);
  });

  it('getObject - handles invalid objects', () => {
    expect(localStorage.getObject(null)).toBe(undefined);
    expect(localStorage.getObject('random')).toBe(undefined);
  });

  it('set multi value into the localStorage', () => {
    localStorage.clear();
    localStorage.setMultiObject('foo', 'value1', { test: true });
    expect(localStorage.getObject('foo')).toEqual({ value1: { test: true } });
  });
});
