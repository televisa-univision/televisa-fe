import isMailToUrl from '../isMailToUrl';

describe('isMailToUrl', () => {
  it('should return false by default', () => {
    expect(isMailToUrl()).toBe(false);
  });

  it('should return true when mailto url', () => {
    expect(isMailToUrl('mailto://test@test.com')).toBe(true);
  });

  it('should return false when https url', () => {
    expect(isMailToUrl('https://www.univision.com')).toBe(false);
  });
});
