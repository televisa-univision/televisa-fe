import consola from '../consola';

/**
 * @test {consola}
 */
describe('consola test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should console error print properly', () => {
    const mockConsole = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    consola.error('Test error');

    expect(mockConsole).toHaveBeenCalledWith('\x1b[31m', 'Test error');
  });

  it('should console success print properly and call info level', () => {
    const mockConsole = jest.spyOn(console, 'info').mockImplementationOnce(() => {});
    consola.success('Test success');

    expect(mockConsole).toHaveBeenCalledWith('\x1b[32m', 'Test success');
  });
});
