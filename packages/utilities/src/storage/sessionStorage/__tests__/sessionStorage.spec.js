import Storage from '../../Storage';
import sessionStorage from '..';

/**
 * @test {sessionStorage}
 */
describe('sessionStorage test', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return sessionStorage wrapper', () => {
    expect(sessionStorage).toBeInstanceOf(Storage);
    expect(sessionStorage.storage).toEqual(window.sessionStorage);
    expect(sessionStorage.isAvailable).toBe(true);
  });

  it('should return fallback if sessionStorage not have access permission', () => {
    const { sessionStorage: sessionStorageOrigin } = window;
    const storageError = new Error('Access denied');
    Object.defineProperties(window, {
      sessionStorage: {
        get: () => {
          throw storageError;
        },
      },
    });
    const consoleLogger = jest.requireActual('../../../utils/consola').default;
    const consoleLoggerSpy = jest.spyOn(consoleLogger, 'warn').mockImplementationOnce(() => {});
    const sessionStorageModule = jest.requireActual('..').default;

    expect(sessionStorageModule.storage).toBeUndefined();
    expect(sessionStorageModule.fallbackStorage).toEqual({});
    expect(sessionStorageModule.isAvailable).toBe(false);
    expect(consoleLoggerSpy).toHaveBeenCalledWith('sessionStorage not available');

    delete window.sessionStorage;
    window.sessionStorage = sessionStorageOrigin;
  });

  it('should return fallback if sessionStorage is unavailable', () => {
    const { window } = global;
    delete global.window;
    const consoleLogger = jest.requireActual('../../../utils/consola').default;
    const consoleLoggerSpy = jest.spyOn(consoleLogger, 'warn');
    const sessionStorageModule = jest.requireActual('..').default;

    expect(sessionStorageModule.storage).toBeUndefined();
    expect(sessionStorageModule.fallbackStorage).toEqual({});
    expect(sessionStorageModule.isAvailable).toBe(false);
    expect(consoleLoggerSpy).not.toHaveBeenCalled();
    global.window = window;
  });
});
