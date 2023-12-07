import isClientSide from '../isClientSide';

/**
 * @test {isClientSide}
 */
describe('helpers/common/isClientSide test', () => {
  it('should be true if is browser / client side', () => {
    expect(isClientSide()).toBe(true);
  });

  it('should be false if not browser / client side', () => {
    const { window } = global;
    delete global.window;
    expect(isClientSide()).toBe(false);
    global.window = window;
  });
});
