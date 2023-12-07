import toStartCase from '../toStartCase';

/**
 * @test {toStartCase}
 */
describe('toStartCase test', () => {
  it('should return start case format in a given string', () => {
    const str = 'foo bar';
    expect(toStartCase(str)).toEqual('Foo Bar');
  });

  it('should return empty string if not have a valid string', () => {
    const str = null;
    expect(toStartCase(str)).toEqual('');
  });
});
