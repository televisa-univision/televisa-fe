import isWebPSupported from '../isWebPSupported';

/**
 * @test {isWebPSupported}
 */
describe('helpers/browser/isWebPSupported test', () => {
  it('should be true if browser supports webP format', async () => {
    global.Image = class {
      constructor() {
        this.width = 1;
        setTimeout(() => {
          this.onload();
        }, 100);
      }
    };

    await expect(isWebPSupported()).resolves.toBe(true);
    // calling 2nd time to look in global.window object
    await expect(isWebPSupported()).resolves.toBe(true);
  });

  it('should be false if browser does not support webP format', async () => {
    window.webPSupport = null;
    global.Image = class {
      constructor() {
        setTimeout(() => {
          this.onerror();
        }, 100);
      }
    };

    return isWebPSupported().then((data) => {
      expect(data).toBe(false);
    });
  });

  it('should be false if not in client side', async () => {
    const { window } = global;
    delete global.window;

    return isWebPSupported().then((data) => {
      expect(data).toBe(false);

      global.window = window;
    });
  });
});
