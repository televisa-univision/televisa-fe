import getKey from '../getKey';

/**
 * @test {getKey}
 */
describe('getKey test', () => {
  it('should return undefined if the value is set to null', () => {
    const test = {
      juan: null,
      pedro: {
        perez: null,
      },
    };
    const param = 'pe';
    const testValue = getKey(test, `${param}dro.perez`);
    const testValue2 = getKey(test, 'juan');
    expect(testValue).toBeUndefined();
    expect(testValue2).toBeUndefined();
  });
  it('should return undefined if no arguments is sent', () => {
    const testValue = getKey();
    expect(testValue).toBeUndefined();
  });
  it('should return null if strict is set to true', () => {
    const test = {
      pedro: null,
    };
    const testValue = getKey(test, 'pedro', undefined, true);
    expect(testValue).toBeNull();
  });
  it('should return fallback if strict is set to true and the value is undefined', () => {
    const test = {
      pedro: undefined,
    };
    const testValue = getKey(test, 'pedro', 'foo', true);
    expect(testValue).toEqual('foo');
  });
  it('should return false and zero as valid', () => {
    const test = {
      pedro: 0,
      juan: false,
    };
    const testValue = getKey(test, 'pedro');
    const testValue2 = getKey(test, 'juan');
    expect(testValue).toEqual(0);
    expect(testValue2).toEqual(false);
  });
  it('should return false and zero as valid in strict mode', () => {
    const test = {
      pedro: 0,
      juan: false,
    };
    const testValue = getKey(test, 'pedro', null, true);
    const testValue2 = getKey(test, 'juan', null, true);
    expect(testValue).toEqual(0);
    expect(testValue2).toEqual(false);
  });
  it('should return the fallback value if the result is null or undefined', () => {
    const test = {
      pedro: null,
      juan: {
        perez: undefined,
      },
    };
    const param = 'pe';
    const testValue = getKey(test, `${param}dro.perez`, 'my fallback');
    const testValue2 = getKey(test, 'pedro', 'my fallback');
    expect(testValue).toEqual('my fallback');
    expect(testValue2).toEqual('my fallback');
  });
});
