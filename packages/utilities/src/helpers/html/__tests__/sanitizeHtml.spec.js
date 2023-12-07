import sanitizeHtml from '../sanitizeHtml';

/**
 * @test {sanitizeHtml}
 */
describe('sanitizeHtml', () => {
  const htmlText = 'This is a mock <strong>test</strong> description! <a href="#">Link</a>';
  it('should remove the html tags from the text', () => {
    expect(sanitizeHtml(htmlText)).not.toContain('<strong>');
    expect(sanitizeHtml(htmlText)).not.toContain('<a href="#">');
  });

  it('should return null for invalid string', () => {
    expect(sanitizeHtml({})).toBe(null);
  });
});
