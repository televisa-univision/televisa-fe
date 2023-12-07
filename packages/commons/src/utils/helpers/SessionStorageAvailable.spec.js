import sessionStorage from './SessionStorage';

describe('sessionStorage', () => {
  beforeAll(() => {
    const sessionStorageMock = (() => {
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
        removeItem: (key) => { delete store[key]; },
      };
    })();
    Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });
  });

  it('sets the value to sessionStorage', () => {
    sessionStorage.clear();
    sessionStorage.set('foo', 'bar');
    expect(sessionStorage.getFallback().foo).not.toBe('bar');
    expect(sessionStorage.get('foo')).toBe('bar');
  });

  it('gets the value from the sessionStorage', () => {
    sessionStorage.clear();
    sessionStorage.setObject('foo', { test: true });
    expect(sessionStorage.getObject('foo')).toEqual({ test: true });
  });

  it('removes the item from the sessionStorage', () => {
    sessionStorage.clear();
    sessionStorage.setObject('foo', { test: true });
    sessionStorage.remove('foo');
    expect(sessionStorage.getObject('foo')).toBe(undefined);
  });

  it('set - handles exception', () => {
    expect(sessionStorage.set('fullStorage', 'true')).toBe(false);
  });

  it('getObject - handles invalid objects', () => {
    expect(sessionStorage.getObject(null)).toBe(undefined);
    expect(sessionStorage.getObject('random')).toBe(undefined);
  });
});
