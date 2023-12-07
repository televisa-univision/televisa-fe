import getPropsByKeyList from '../getPropsByKeyList';

/**
 * @test {getPropsByKeyList}
 */
describe('getPropsByKeyList test', () => {
  it('should return an object with the listed keys', () => {
    const props = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 1,
    };
    const result = getPropsByKeyList(props, ['a', 'c', 'e']);

    expect(result).toEqual({ a: 'a', c: 'c', e: 1 });
  });

  it('should return empty object if provided params are invalid', () => {
    const result = getPropsByKeyList('', '');

    expect(result).toEqual({});
  });
});
