import isServerSide from '../isServerSide';

/**
 * @test {isServerSide}
 */
describe('helpers/common/isServerSide test', () => {
  it('should be true if is node / server side', () => {
    expect(isServerSide()).toBe(true);
  });

  it('should be false if not node / server side', () => {
    const { versions } = process;
    delete global.process.versions;
    expect(isServerSide()).toBe(false);
    global.process.versions = versions;
  });
});
