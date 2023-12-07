import Storage from '../../Storage';
import localStorage from '..';

/**
 * @test {localStorage}
 */
describe('localStorage test', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return localStorage wrapper', () => {
    expect(localStorage).toBeInstanceOf(Storage);
    expect(localStorage.storage).toEqual(window.sessionStorage);
    expect(localStorage.isAvailable).toBe(true);
  });

  it('should return fallback if localStorage not have access permission', () => {
    const { localStorage: localStorageOrigin } = window;
    const storageError = new Error('Access denied');
    Object.defineProperties(window, {
      localStorage: {
        get: () => {
          throw storageError;
        },
      },
    });
    const consoleLogger = jest.requireActual('../../../utils/consola').default;
    const consoleLoggerSpy = jest.spyOn(consoleLogger, 'warn').mockImplementationOnce(() => {});
    const localStorageModule = jest.requireActual('..').default;

    expect(localStorageModule.storage).toBeUndefined();
    expect(localStorageModule.fallbackStorage).toEqual({});
    expect(localStorageModule.isAvailable).toBe(false);
    expect(consoleLoggerSpy).toHaveBeenCalledWith('localStorage not available');

    delete window.localStorage;
    window.localStorage = localStorageOrigin;
  });

  it('should return fallback if localStorage is unavailable', () => {
    const { window } = global;
    delete global.window;
    const consoleLogger = jest.requireActual('../../../utils/consola').default;
    const consoleLoggerSpy = jest.spyOn(consoleLogger, 'warn');
    const localStorageModule = jest.requireActual('..').default;

    expect(localStorageModule.storage).toBeUndefined();
    expect(localStorageModule.fallbackStorage).toEqual({});
    expect(localStorageModule.isAvailable).toBe(false);
    expect(consoleLoggerSpy).not.toHaveBeenCalled();
    global.window = window;
  });
});
