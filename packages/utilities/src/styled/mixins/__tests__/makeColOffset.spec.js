import makeColOffset from '../makeColOffset';

/**
 * @test {makeColOffset}
 */
describe('makeColOffset test', () => {
  it('should return the expected css rule with size 1', () => {
    expect(makeColOffset(1))
      .toBe('margin-left: 8.333333333333332%;');
  });

  it('should return the expected css rule with size 0', () => {
    expect(makeColOffset(0))
      .toBe('margin-left: 0%;');
  });

  it('should return the expected css rule when rtl option is passed', () => {
    expect(makeColOffset(1, { rtl: true }))
      .toBe('margin-right: 8.333333333333332%;');
  });

  it('should return the expected css rule when breakpoint option is passed', () => {
    expect(makeColOffset(1, { breakpoint: '768px' }).replace(/\s+/gm, ''))
      .toEqual('@media(min-width:768px){margin-left:8.333333333333332%;}');
  });
});
