import Storage from '../Storage';

let storageInstance;
let store = {};
const storageMock = {
  getItem: key => store[key],
  setItem: (key, value) => {
    if (key === 'fullStorage') {
      throw new Error();
    }
    store[key] = value.toString();
  },
  clear: () => { store = {}; },
  removeItem: (key) => { delete store[key]; },
};

/**
 * @test {StorageAvailable}
 */
describe('Storage available test', () => {
  beforeAll(() => {
    storageInstance = new Storage(storageMock);
  });

  it('should set the value to Storage', () => {
    storageInstance.clear();
    storageInstance.set('foo', 'bar');

    expect(storageInstance.get('foo')).toBe('bar');
  });

  it('should get the value from the Storage', () => {
    storageInstance.clear();
    storageInstance.setObject('foo', { test: true });

    expect(storageInstance.getObject('foo')).toEqual({ test: true });
  });

  it('should remove the item from the Storage', () => {
    storageInstance.clear();
    storageInstance.setObject('foo', { test: true });
    storageInstance.remove('foo');

    expect(storageInstance.getObject('foo')).toBeUndefined();
  });

  it('should handles exceptions', () => {
    expect(storageInstance.set('fullStorage', 'true')).toBeUndefined();
  });

  it('should getObject and handles invalid objects', () => {
    expect(storageInstance.getObject(null)).toBeUndefined();
    expect(storageInstance.getObject('random')).toBeUndefined();
  });

  it('should set in object value into the Storage', () => {
    storageInstance.clear();
    storageInstance.setInObject('foo', 'value1', { test: true });

    expect(storageInstance.getObject('foo')).toEqual({ value1: { test: true } });
  });

  it('should get in object value into the Storage', () => {
    storageInstance.clear();
    storageInstance.setObject('foo', { value2: { test2: true } });

    expect(storageInstance.getInObject('foo', 'value2')).toEqual({ test2: true });
    expect(storageInstance.getInObject('notFound', 'value')).toBeUndefined();
  });
});
