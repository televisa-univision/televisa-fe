import getCookie from '../getCookie';

describe('getCookie', () => {
  it('should return empty string when there are not cookies', () => {
    expect(getCookie('foo')).toBe('');
  });

  it('should return the cookie value when there is only one cookie', () => {
    document.cookie = 'foo=bar';
    expect(getCookie('foo')).toBe('bar');
  });

  it('should return the cookie value when there are multiple cookies', () => {
    document.cookie = 'foo1=bar1';
    document.cookie = 'foo2=bar2';
    document.cookie = 'foo3=bar3';

    expect(getCookie('foo1')).toBe('bar1');
    expect(getCookie('foo2')).toBe('bar2');
    expect(getCookie('foo3')).toBe('bar3');
  });

  it('should return return null if window is not defined', () => {
    delete global.window;
    expect(getCookie('foo')).toBe(null);
  });
});
