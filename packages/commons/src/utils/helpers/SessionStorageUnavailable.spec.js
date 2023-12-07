import sessionStorage from './SessionStorage';

describe('sessionStorage with fallback', () => {
  beforeAll(() => {
    delete window.sessionStorage;
  });
  it('set - uses fallback when sessionStorage is not available', () => {
    sessionStorage.set('foo', 'bar');
    expect(sessionStorage.getFallback().foo).toBe('bar');
  });
  it('get - uses fallback when sessionStorage is not available', () => {
    sessionStorage.getFallback().bar = 'foo';
    expect(sessionStorage.get('bar')).toBe('foo');
  });
  it('removes the item from the sessionStorage', () => {
    sessionStorage.clear();
    sessionStorage.setObject('foo', { test: true });
    sessionStorage.remove('foo');
    expect(sessionStorage.getObject('foo')).toBe(undefined);
  });
});
