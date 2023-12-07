import getSiteDomainFromHref from '../getSiteDomainFromHref';

const sites = {
  tudn: 'tudn.com',
};

/**
 * @test {getSiteDomainFromHref}
 */
describe('getSiteDomainFromHref', () => {
  it('should return null by default', () => {
    expect(getSiteDomainFromHref()).toBe(null);
  });
  it('should return null with empty sites list', () => {
    expect(getSiteDomainFromHref('test.com', null)).toBe(null);
  });
  it('should return null with empty url', () => {
    expect(getSiteDomainFromHref(null, sites)).toBe(null);
  });
  it('should return null with invalid url', () => {
    const href = 'test.com';
    expect(getSiteDomainFromHref(href, sites)).toBe(null);
  });
  it('should return site domain with valid url', () => {
    const href = 'uat.tudn.com';
    expect(getSiteDomainFromHref(href, sites)).toBe(sites.tudn);
  });
});
