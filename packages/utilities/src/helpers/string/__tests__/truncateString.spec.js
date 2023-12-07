import truncateString from '../truncateString';

/**
 * @test {truncateString}
 */
describe('truncateString test', () => {
  it('should return same string if shorter than char limit', () => {
    const str = 'The quick brown fox jumps over the lazy dog.';
    const truncStr = truncateString(str);

    expect(truncStr).toEqual(str);
  });

  it('should not return a string with a space before the appended character', () => {
    const maxChars = 10;
    const str = 'The quick brown fox jumps over the lazy dog.';
    const truncStr = truncateString(str, { maxChars });

    expect(truncStr.charAt(truncStr.length - 1)).not.toEqual(' ');
  });

  it('should return a truncated string if it is longer than char limit', () => {
    const maxChars = 9;
    const str = 'The quick brown fox jumps over the lazy dog.';
    const truncStr = truncateString(str, { maxChars, append: '…', onlyFullWords: false });

    expect(truncStr).toEqual('The quic…');
  });

  it('should return a truncated string with full words', () => {
    const maxChars = 10;
    const str = 'The quick brown fox jumps over the lazy dog.';
    const truncStr = truncateString(str, { maxChars });

    expect(truncStr).toEqual('The quick…');
  });

  it('should return a truncated string that does NOT end in a space', () => {
    const maxChars = 10;
    const str = 'The quick brown fox jumps over the lazy dog.';
    const truncStr = truncateString(str, { maxChars, append: '', onlyFullWords: false });

    expect(truncStr).toEqual('The quick');
  });

  it('should return empty if not have valid string', () => {
    const truncStr = truncateString(null);

    expect(truncStr).toEqual('');
  });
});
