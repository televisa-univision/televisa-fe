import numberOfLines from '../numberOfLines';

/**
 * @test {numberOfLines}
 */
describe('numberOfLines test', () => {
  it('should return the expected css rule for numberOfLines', () => {
    const expected = `
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
    `.replace(/\s+/gm, '');

    expect(numberOfLines(1).replace(/\s+/gm, '')).toEqual(expected);
  });
});
