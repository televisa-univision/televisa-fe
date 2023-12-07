import Logger, { ServerLogger } from './serverLogger';

/** @test {serverLogger} */
describe('serverLogger', () => {
  it('should return a instance of DerivedLogger', async() => {
    const expectedClassName = 'DerivedLogger';
    expect(Logger.constructor.name).toEqual(expectedClassName);
  });

  it('should setup transports', async() => {
    expect(Logger.transports.length).toBeGreaterThan(0);
  });

  it('should info method called', async () => {
    const spyInfoMethod = jest.spyOn(Logger, 'info');
    await Logger.info('test');
    expect(spyInfoMethod).toHaveBeenCalled();
  });

  it('should debug method called', async () => {
    const spyDebugMethod = jest.spyOn(Logger, 'debug');
    await Logger.debug('test');
    expect(spyDebugMethod).toHaveBeenCalled();
  });

  it('should error method called', async () => {
    const spyErrorMethod = jest.spyOn(Logger, 'error');
    await Logger.error('test');
    expect(spyErrorMethod).toHaveBeenCalled();
  });

  it('should return a instance of ServerLogger', async() => {
    const expectedClassName = 'ServerLogger';
    const serverLogger = new ServerLogger();
    expect(serverLogger.constructor.name).toEqual(expectedClassName);
  });

  it('should have a info method and must be called', async() => {
    const serverLogger = new ServerLogger();
    const spyInfoMethod = jest.spyOn(serverLogger, 'info');
    await serverLogger.info('test');
    expect(serverLogger.info).toBeDefined();
    expect(spyInfoMethod).toHaveBeenCalled();
  });

  it('should have a debug method and must be called', async() => {
    const serverLogger = new ServerLogger();
    const spyDebugMethod = jest.spyOn(serverLogger, 'debug');
    await serverLogger.debug('test');
    expect(serverLogger.debug).toBeDefined();
    expect(spyDebugMethod).toHaveBeenCalled();
  });

  it('should have a error method and must be called', async() => {
    const serverLogger = new ServerLogger();
    const spyErrorMethod = jest.spyOn(serverLogger, 'error');
    await serverLogger.error('test');
    expect(serverLogger.error).toBeDefined();
    expect(spyErrorMethod).toHaveBeenCalled();
  });
});
