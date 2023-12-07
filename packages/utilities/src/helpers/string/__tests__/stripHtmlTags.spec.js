import stripHtmlTags from '../stripHtmlTags';

/**
 * @test {stripHtmlTags}
 */
describe('stripHtmlTags test', () => {
  it('should returns a string without html tags', () => {
    const text = stripHtmlTags('<b>This is </b>a mock html text');
    expect(text).toEqual('This is a mock html text');
  });
  it('should returns a string without html tags from textContent property', () => {
    const innerHTML = '<b>This is </b>a mock html text';
    document.createElement = jest.fn(element => ({
      tagName: element,
      innerHTML,
      innerText: undefined,
      textContent: 'This is a mock html text',
    }));
    const text = stripHtmlTags(innerHTML);
    expect(text).toEqual('This is a mock html text');
  });
  it('should returns stripped when document.createElement is not a function in both strip functions for SSR', () => {
    document.createElement = undefined;
    const textStripTags = stripHtmlTags('<b>This is </b>a mock html text');
    expect(textStripTags).toBe('This is a mock html text');
  });
});
