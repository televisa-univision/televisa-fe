import cleanObject from '../cleanObject';

/**
 * @test {cleanObject}
 */
describe('cleanObject test', () => {
  it('should returns same content if not array', () => {
    expect(cleanObject(null, '')).toBe(null);
  });

  it('should returns same content if is array but without objects', () => {
    const contents = ['no object'];
    expect(cleanObject(contents, [0])).toEqual(contents);
  });

  it('should returns array content without "showNative" key', () => {
    const contents = [
      {
        a: 'test',
        showNative: true,
      },
      {
        b: 'test',
      },
    ];
    expect(cleanObject(contents, ['showNative'])).toEqual([{ a: 'test' }, { b: 'test' }]);
  });

  it('should returns object without "testArray" key', () => {
    const contents = {
      a: 'test',
      testArray: [],
    };
    expect(cleanObject(contents, ['testArray'])).toEqual({ a: 'test' });
  });
});
