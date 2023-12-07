import getFromMap from '../getFromMap';

/**
 * @test {getFromMap}
 */
describe('getFromMap test', () => {
  it('should return the mapped value', () => {
    const result = getFromMap('field', {
      field: 'value',
    });

    expect(result).toEqual('value');
  });

  it('should execute and return the mapped value', () => {
    const result = getFromMap('field', {
      field: () => 'value',
    });

    expect(result).toEqual('value');
  });

  it('should return the default value', () => {
    const result = getFromMap('field', {
      default: 'default',
    });

    expect(result).toEqual('default');
  });

  it('should return undefined if no have mapped value and no default', () => {
    let field;
    const result = getFromMap('field', { field });

    expect(result).toBeUndefined();
  });

  it('should return undefined if not a valid map object', () => {
    const result = getFromMap('field', {});

    expect(result).toBeUndefined();
  });

  it('should return undefined if the value is not valid', () => {
    const field = null;
    const result = getFromMap('field', { field });

    expect(result).toBeUndefined();
  });

  it('should return the value if is valid', () => {
    const number = 0;
    const result = getFromMap('number', { number });

    expect(result).toEqual(0);
  });

  it('should return data from the mapped with pattern', () => {
    const valueFn = jest.fn(() => ({ foo: 'bar' }));
    const result = getFromMap('/foo/test/bar/', {
      '/test/*': valueFn,
    }, {
      usePattern: true,
      data: 'test',
    });

    expect(valueFn).toHaveBeenCalledWith('test');
    expect(result).toEqual(valueFn());
  });
});
