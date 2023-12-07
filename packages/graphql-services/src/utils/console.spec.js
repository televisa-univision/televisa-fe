import colorConsole from './console';

describe('console with color', () => {
  it('should console error print properly', () => {
    const mockConsole = jest.spyOn(console, 'log').mockImplementationOnce(() => {});
    colorConsole.error('Test error');

    expect(mockConsole).toHaveBeenCalled();
    expect(mockConsole).toHaveBeenCalledWith('\x1b[31m', 'Test error');
  });
});
