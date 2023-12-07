import getUniqKey from '../getUniqKey';

/**
 * @test {getUniqKey}
 */
describe('getUniqueKey test', () => {
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
