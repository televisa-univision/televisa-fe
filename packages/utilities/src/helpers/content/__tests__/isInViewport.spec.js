import isInViewport from '../isInViewport';

/**
 * @test {isInViewport}
 */
describe('isInViewport test', () => {
  it('should return true if element is in viewport', () => {
    window.innerHeight = 600;
    const element = {
      getBoundingClientRect: () => ({
        top: 10,
        bottom: 500,
      }),
    };
    expect(isInViewport(element)).toBe(true);
  });

  it('should return false if element is not in viewport', () => {
    window.innerHeight = 600;
    const element = {
      getBoundingClientRect: () => ({
        top: 700,
        bottom: 1000,
      }),
    };
    expect(isInViewport(element)).toBe(false);
  });

  it('should return true if part of the element is in viewport ', () => {
    window.innerHeight = 600;
    const element = {
      getBoundingClientRect: () => ({
        top: 700,
        bottom: 500,
      }),
    };
    expect(isInViewport(element, 300)).toBe(false);
  });

  it('should return false if part of the element is not in viewport ', () => {
    window.innerHeight = 600;
    const element = {
      getBoundingClientRect: () => ({
        top: 700,
        bottom: 500,
      }),
    };
    expect(isInViewport(element, 550)).toBe(false);
  });

  it('should return false if there is not window', () => {
    const oldWindow = global.window;
    delete global.window;
    const element = {
      getBoundingClientRect: () => ({
        top: 10,
        bottom: 500,
      }),
    };
    expect(isInViewport(element)).toBe(false);
    global.window = oldWindow;
  });

  it('should return false if there is no element', () => {
    const element = null;
    expect(isInViewport(element)).toBe(false);
  });
});
