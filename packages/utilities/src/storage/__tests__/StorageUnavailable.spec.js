import Storage from '../Storage';

let storageInstance;

/**
 * @test {StorageUnavailable}
 */
describe('Storage unavailable test', () => {
  beforeAll(() => {
    storageInstance = new Storage();
  });

  it('should set and use fallback when Storage is not available', () => {
    storageInstance.set('foo', 'bar');

    expect(storageInstance.fallbackStorage.foo).toBe('bar');
  });

  it('shouñd get and use fallback when Storage is not available', () => {
    storageInstance.fallbackStorage.bar = 'foo';

    expect(storageInstance.get('bar')).toBe('foo');
  });

  it('should removes the item from the Storage', () => {
    storageInstance.clear();
    storageInstance.setObject('foo', { test: true });
    storageInstance.remove('foo');

    expect(storageInstance.getObject('foo')).toBeUndefined();
  });
});
