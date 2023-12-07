import partitionArray from '../partitionArray';

/**
 * @test {partitionArray}
 */
describe('partitionArray test', () => {
  it('should make partition of a long Array with default count', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const columns = partitionArray(list);

    expect(columns).toHaveLength(2);
    expect(columns[0]).toEqual({ contents: [1, 2, 3], key: 0 });
    expect(columns[1]).toEqual({ contents: [4, 5, 6], key: 1 });
  });

  it('should make partition of a long Array with custom count', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const columns = partitionArray(list, { count: 2 });

    expect(columns).toHaveLength(2);
  });

  it('should make partition of a short Array with default threshold', () => {
    const shorty = [1, 2];

    expect(partitionArray(shorty)).toEqual([{ contents: shorty, key: 0 }]);
  });

  it('should make partition of a short Array with custom threshold', () => {
    const shorty = [1, 2];
    const columns = partitionArray(shorty, { threshold: 1 });

    expect(columns).toHaveLength(2);
    expect(columns[1]).toEqual({ contents: [2], key: 1 });
  });
});
