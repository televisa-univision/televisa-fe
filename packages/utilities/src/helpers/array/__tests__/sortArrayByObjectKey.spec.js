import sortArrayByObjectKey from '../sortArrayByObjectKey';

/**
 * @test {sortArrayByObjectKey}
 */
describe('sortArrayByObjectKey test', () => {
  it('should return the array correctly sorted', () => {
    const key = 'test';
    const array = [{ test: 'foo' }, { test: 'bar' }, 3];
    expect(sortArrayByObjectKey(array, key)[0]).toEqual({ test: 'bar' });
  });

  it('should return the given array when the key is not set', () => {
    const key = 1;
    const array = ['test'];
    expect(sortArrayByObjectKey(array, key)).toEqual(array);
  });

  it('should return an empty array when the array is not valid', () => {
    const key = 'test';
    const array = undefined;
    expect(sortArrayByObjectKey(array, key)).toEqual([]);
  });
});
