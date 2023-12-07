import pickObject from '../pickObject';

/**
 * @test {pickObject}
 */
describe('pickObject test', () => {
  it('should returns same content if not a valid object/array', () => {
    expect(pickObject(null)).toBe(null);
  });

  it('should returns same content if not have valid keys array', () => {
    const contents = { foo: 'bar' };
    expect(pickObject(contents)).toBe(contents);
  });

  it('should returns same content if is array but without objects', () => {
    const contents = ['no object'];
    expect(pickObject(contents, [0])).toEqual(contents);
  });

  it('should returns array content only with keep keys', () => {
    const contents = [
      {
        a: 'keep',
        showNative: true,
      },
      {
        a: 'keep2',
        b: 'ignore',
      },
    ];
    expect(pickObject(contents, ['a'])).toEqual([{ a: 'keep' }, { a: 'keep2' }]);
  });

  it('should returns object only with keep keys', () => {
    const contents = {
      a: 'keep',
      testArray: [],
    };
    expect(pickObject(contents, ['a'])).toEqual({ a: 'keep' });
  });

  it('should returns deep object only with keep keys', () => {
    const contents = {
      a: 'keep',
      testArray: [],
      testObject: {
        a: 'keep2',
        b: 'ignore',
      },
      keepArray: [{
        a: 'keep3',
        b: 'ignore',
      }],
    };
    expect(pickObject(contents, ['a'])).toEqual({
      a: 'keep',
      testObject: {
        a: 'keep2',
      },
      keepArray: [{
        a: 'keep3',
      }],
    });
  });
});
