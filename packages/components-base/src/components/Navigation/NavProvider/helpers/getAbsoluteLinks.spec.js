import getAbsoluteLinks from './getAbsoluteLinks';

describe('getAbsoluteLinks suite', () => {
  const links = [
    { link: '/test-1' },
    { link: '/test-2' },
  ];

  it('should return an empty array by default', () => {
    const result = getAbsoluteLinks();
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(0);
  });

  it('should return absolute URLs', () => {
    const result = getAbsoluteLinks(links, 'https://domain.com');
    expect(result).toHaveLength(links.length);
    expect(result).toEqual(expect.any(Array));
    expect(result[0].link).toBe('https://domain.com/test-1');
  });
});
