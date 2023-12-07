/* eslint-disable global-require */

describe('SsoIFrameLocalStorage', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should init only when have a valid iFrameWindow and iFrameOrigin', () => {
    const { getInstance, init } = require('./SsoIFrameLocalStorage');
    init(null);
    expect(getInstance()).toBeNull();
    init({}, null);
    expect(getInstance()).toBeNull();
    init({}, 'http://test.com');
    expect(getInstance()).not.toBeNull();
  });

  it('should not create the instance again if it already exist', () => {
    const { getInstance, init } = require('./SsoIFrameLocalStorage');
    init({}, 'http://test.com');
    const actualInstance = getInstance();
    expect(actualInstance).not.toBeNull();
    init({}, 'http://test.com');
    expect(getInstance()).toEqual(actualInstance);
  });
});
