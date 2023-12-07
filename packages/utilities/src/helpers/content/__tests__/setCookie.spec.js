import setCookie from '../setCookie';

/**
 * Clean all cookies just for test
 */
function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  cookies.forEach((cookie) => {
    const name = cookie.split('=')[0];
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  });
}

/**
 * @test {setCookie}
 */
describe('setCookie test', () => {
  beforeEach(() => {
    deleteAllCookies();
  });

  it('should return the expected cookie', () => {
    setCookie('foo', 'bar', 30);
    expect(document.cookie).toBe('foo=bar');
  });

  it('should return empty string when is not a valid name', () => {
    setCookie(null, 'foo', 30);
    expect(document.cookie).toBe('');
  });

  it('should returns the expected cookies even if not have date', () => {
    setCookie('foo', true);
    expect(document.cookie).toBe('foo=true');
  });

  it('should returns the expected cookies even if the value if false/null', () => {
    setCookie('foo', false, 30);
    expect(document.cookie).toBe('foo=');
  });

  it('should not set cookie if window is not defined', () => {
    delete global.window;
    setCookie('foo', true);
    expect(document.cookie).toBe('');
  });
});
