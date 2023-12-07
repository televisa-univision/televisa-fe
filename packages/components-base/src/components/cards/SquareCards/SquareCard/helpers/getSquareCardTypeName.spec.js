import getSquareCardTypeName from './getSquareCardTypeName';

describe('getSquareCardTypeName', () => {
  it('should return null by default', () => {
    expect(getSquareCardTypeName({})).toBeNull();
  });
  it('should return a normalized name', () => {
    expect(
      getSquareCardTypeName({ squareCardType: 'testCard' })
    ).toBe('test');
  });
});
