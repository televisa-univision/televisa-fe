import isRelativeUrl from '../isRelativeUrl';

/**
 * @test {isRelativeUrl}
 */
describe('isRelativeUrl test', () => {
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
    const email = 'mailto:test@univision.com';
    const andorid = 'whatsapp://+13179795000';

    expect(isRelativeUrl(email)).toBe(false);
    expect(isRelativeUrl(andorid)).toBe(false);
  });

  it('should return false if not a valid URL', () => {
    const url = null;

    expect(isRelativeUrl(url)).toBe(false);
  });
});
