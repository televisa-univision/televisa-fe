import { cleanEnhancementsInBody, cleanSearchQuery } from '.';

describe('cleanEnhancementsInBody', () => {
  it('should remove extra break line before enhancements', () => {
    const body = [
      { value: 'test' },
      { value: '<p><br /></p>' },
      { type: 'enhancement' },
    ];
    expect(cleanEnhancementsInBody(body)).toHaveLength(2);
  });

  it('should not remove expected values', () => {
    const body = [
      { value: 'test' },
      { value: '<p><br />Some Random Text</p>' },
      { type: 'enhancement' },
    ];
    expect(cleanEnhancementsInBody(body)).toHaveLength(3);
  });

  it('should not filter if the body is not an array', () => {
    const body = 'foo';
    expect(cleanEnhancementsInBody(body)).toBe('foo');
  });
});

describe('cleanSearchQuery', () => {
  it('should return clean query', () => {
    expect(cleanSearchQuery('Los beatles la banda de los mejores en su tiempo')).toEqual('beatles banda mejores tiempo');
    expect(cleanSearchQuery('the beatles is the best band of all time')).toEqual('beatles best band time');
    expect(cleanSearchQuery('la nfl')).toEqual('nfl');
    expect(cleanSearchQuery('the nfl')).toEqual('nfl');
    expect(cleanSearchQuery(null)).toEqual('');
  });
});
