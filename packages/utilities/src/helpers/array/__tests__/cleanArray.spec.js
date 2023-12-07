import cleanArray from '../cleanArray';

/**
 * @test {cleanArray}
 */
describe('cleanArray test', () => {
  it('should return a cleaned array as expected one', () => {
    const array = ['a', 'b', '', 'c', 'd', '', 'e', 'f', ''];
    const expected = ['a', 'b', 'c', 'd', 'e', 'f'];

    expect(cleanArray(array)).toEqual(expected);
  });

  it('should return a cleaned array with the additional filter', () => {
    const array = ['a', 'b', '', 'c', 'd', '', 'e', 'f', '', '*'];
    const expected = ['a', 'b', 'c', 'd', 'e', 'f'];
    const filter = '*';

    expect(cleanArray(array, filter)).toEqual(expected);
  });

  it('should return a cleaned array with custom function filter', () => {
    const array = ['a', 'b', '', 'c', 'd', '', 'e', 'f', '', '-'];
    const expected = ['a', 'b', 'c', 'd', 'e', 'f'];
    const filter = item => (!!item && !item.includes('-'));

    expect(cleanArray(array, filter)).toEqual(expected);
  });

  it('should return empty array if not have a valid array', () => {
    expect(cleanArray(null)).toEqual([]);
  });
});
