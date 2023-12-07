import getFirstItem from '../getFirstItem';

/**
 * @test {getFirstMatch}
 */
describe('getFirstMatch test', () => {
  it('should return match values from arrays', () => {
    expect(getFirstItem(['deportes', 'nba', 'heat'], ['lakers', 'heat', 'clippers'])).toBe('heat');
    expect(getFirstItem(['deportes', 'nba', 'clippers'], ['lakers', 'heat', 'clippers'])).toBe('clippers');
    expect(getFirstItem(['deportes', 'nba', 'lakers'], ['lakers', 'heat', 'clippers'])).toBe('lakers');
    expect(getFirstItem(['deportes', 'nba', 'lakers'], ['lakers', 'heat', 'deportes'])).toBe('deportes');
  });

  it('should return empty if not found any match', () => {
    expect(getFirstItem(['deportes', 'nba', 'lakers'], ['cocina', 'carnes'])).toBeUndefined();
  });

  it('should return empty if not have a valid values', () => {
    expect(getFirstItem(null, ['test'])).toBeUndefined();
  });
});
