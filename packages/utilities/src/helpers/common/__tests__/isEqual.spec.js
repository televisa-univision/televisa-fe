import isEqual from '../isEqual';

/**
 * @test {isEqual}
 */
describe('isEqual test', () => {
  it('returns true if the values are equal', () => {
    expect(isEqual('testString', 'testString')).toBe(true);
    expect(isEqual('foo' / 2, 'foo' / 2)).toBe(true);
    expect(isEqual(30 / 2, 30 / 2)).toBe(true);
  });

  it('returns false if the values no are equal', () => {
    expect(isEqual('testString', 'test')).toBe(false);
    expect(isEqual(parseInt(2.5, 10), parseInt('', 10))).toBe(false);
    expect(isEqual(30 / 2, 30 / 1)).toBe(false);
  });

  it('returns true if the object have equal values', () => {
    const objA = { foo: 'bar' };
    const objB = { foo: 'bar' };
    expect(isEqual(objA, objB)).toBe(true);
  });

  it('returns true if the object is equal', () => {
    const objA = { foo: 'bar', test: { value: 3 } };
    const objB = Object.assign(objA, { test: { value: 3 } });
    expect(isEqual(objA, objB)).toBe(true);
  });

  it('returns true if a deep object have sames values', () => {
    const objA = { foo: 'bar', test: { value: 3 } };
    const objB = { foo: 'bar', test: { value: 3 } };
    expect(isEqual(objA, objB)).toBe(true);
  });

  it('returns true if a Error have sames values', () => {
    const objA = new Error('test');
    const objB = new Error('test');
    expect(isEqual(objA, objB)).toBe(true);
  });

  it('returns true if a Date have sames values', () => {
    const dateString = 'Thu May 10 2018 23:23:27';
    const objA = new Date(dateString);
    const objB = new Date(dateString);
    expect(isEqual(objA, objB)).toBe(true);
  });

  it('returns true if a diferent types of objects', () => {
    const objA = new Date();
    const objB = Number('2');
    expect(isEqual(objA, objB)).toBe(false);
  });

  it('returns false if a deep object but not have sames values', () => {
    const objA = { foo: 'bar', test: { value: 3 } };
    const objB = { foo: 'bar', test: { value: 4 } };
    expect(isEqual(objA, objB)).toBe(false);
  });

  it('returns false if the object not have the same properties', () => {
    const objA = { foo1: 'bar' };
    const objB = { foo2: 'bar' };
    expect(isEqual(objA, objB)).toBe(false);
  });

  it('returns false if the array have diferent length', () => {
    const objA = [1, {}, 3];
    const objB = [1, {}];
    expect(isEqual(objA, objB)).toBe(false);
  });

  it('returns false if the object is not the same instance and "partial" is true', () => {
    const objA = { foo: 'bar', test: { value: 3 } };
    const objB = { foo: 'bar', test: { value: 3 } };
    expect(isEqual(objA, objB, true)).toBe(false);
  });

  it('returns false if the object is not equal and "partial" is true', () => {
    const objA = { foo: 'bar', test: [1, 2, 3] };
    const objB = { foo: 'bar', test: { value: [1, 2, 4] } };
    expect(isEqual(objA, objB, true)).toBe(false);
  });
});
