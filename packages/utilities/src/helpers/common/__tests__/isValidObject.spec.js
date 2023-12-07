import isValidObject from '../isValidObject';

/**
 * @test {isValidObject}
 */
describe('helpers/common/isValidObject test', () => {
  it('should return true if its a valid object', () => {
    expect(isValidObject({ a: 'a', b: 'b' })).toBe(true);
  });

  it('should be falsy is argument is not Object', () => {
    expect(isValidObject('')).toBe(false);
  });

  it('should be falsy is empty Object', () => {
    expect(isValidObject({})).toBe(false);
  });

  it('should be falsy if object is null ', () => {
    expect(isValidObject(null)).toBe(false);
  });

  it('should be falsy if param is undefined ', () => {
    expect(isValidObject(undefined)).toBe(false);
  });
});
