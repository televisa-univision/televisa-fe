import isValidEmail from '../isValidEmail';

/**
 * @test {isValidEmail}
 */
describe('isValidEmail', () => {
  it('is a valid email', () => {
    expect(isValidEmail('test@test.com')).toBe(true);
  });
  it('is not a valid email', () => {
    expect(isValidEmail('test')).toBe(false);
  });
});
