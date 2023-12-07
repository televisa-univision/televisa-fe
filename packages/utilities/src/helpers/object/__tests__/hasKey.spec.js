import hasKey from '../hasKey';

/**
 * @test {hasKey}
 */
describe('hasKey test', () => {
  it('should return true if property exist', () => {
    const obj = {
      a: {
        b: {
          c: 'd',
        },
      },
    };
    expect(hasKey(obj, 'a.b.c')).toBe(true);
  });

  it('should return true if path is a inherited property of object', () => {
    expect(hasKey(window, 'navigator.userAgent')).toBe(true);
  });

  it('should return true if path is a direct property of object', () => {
    Object.defineProperty(window.navigator, 'userAgent', { value: '', writable: true });
    expect(hasKey(window, 'navigator.userAgent')).toBe(true);
  });

  it('should return true even if value of the property is null', () => {
    const obj = {
      a: {
        b: null,
      },
    };
    expect(hasKey(obj, 'a.b')).toBe(true);
  });

  it('should return true if property exist from array path', () => {
    const obj = {
      a: {
        b: {
          c: null,
        },
      },
    };
    expect(hasKey(obj, ['a', 'b', 'c'])).toBe(true);
  });

  it('should return false if property not exist', () => {
    const obj = {
      a: {
        b: {
          c: 'c value',
        },
      },
    };
    expect(hasKey(obj, 'a.b.e')).toBe(false);
  });

  it('should return false if property not exist from array path', () => {
    const obj = {
      a: {
        b: {
          c: 'c value',
        },
      },
    };
    expect(hasKey(obj, ['a', 'b', 'e'])).toBe(false);
  });

  it('should return false if not have a valid path as the parameter', () => {
    const obj = {
      a: {
        b: {
          c: null,
        },
      },
    };
    expect(hasKey(obj, 0)).toBe(false);
  });

  it('should return false if not have a valid object', () => {
    const obj = {};
    expect(hasKey(obj, 'a.b')).toBe(false);
    expect(hasKey(0, 'a.b')).toBe(false);
  });

  it('should return false if have an empty path as the parameter', () => {
    const obj = {
      a: {
        b: {
          c: 'c value',
        },
      },
    };
    expect(hasKey(obj, [])).toBe(false);
    expect(hasKey(obj, '')).toBe(false);
  });
});
