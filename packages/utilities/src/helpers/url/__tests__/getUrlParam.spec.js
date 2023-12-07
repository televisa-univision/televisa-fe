import getUrlParam from '../getUrlParam';

/**
 * @test {getUrlParam}
 */
describe('getUrlParam', () => {
  it('gets correct param', () => {
    const mock = jest.spyOn(URLSearchParams.prototype, 'get').mockImplementationOnce(() => 'en');
    const lang = getUrlParam('lang');
    expect(lang).toEqual('en');
    mock.mockRestore();
  });
  it('throws exception when no param is found', () => {
    const mock = jest.spyOn(URLSearchParams.prototype, 'get').mockImplementationOnce(() => {
      throw new Error();
    });
    const lang = getUrlParam();
    expect(lang).toEqual(null);
    mock.mockRestore();
  });
});
