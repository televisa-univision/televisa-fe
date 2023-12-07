import buildMockServer from './buildMockServer';
import cconsole from '../dist/utils/console';

describe('buildMockServer', () => {
  it('should print and error when invalid query to mock server', async () => {
    expect.assertions(1);
    const mockServer = { query: () => Promise.resolve({ errors: [new Error('Test message')] }) };
    const mockConsole = jest.spyOn(cconsole, 'error').mockImplementationOnce(() => {});
    await buildMockServer(mockServer).query();
    expect(mockConsole).toHaveBeenCalled();
  });
});
