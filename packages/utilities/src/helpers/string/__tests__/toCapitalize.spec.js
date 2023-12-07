import toCapitalize from '../toCapitalize';

/**
 * @test {toCapitalize}
 */
describe('toCapitalize test', () => {
  it('should capitalise first letter in a given string', () => {
    const str = 'foo bar';
    expect(toCapitalize(str)).toEqual('Foo bar');
  });

  it('should return empty string if not have a valid string', () => {
    const str = null;
    expect(toCapitalize(str)).toEqual('');
  });
});
