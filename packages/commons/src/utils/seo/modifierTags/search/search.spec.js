import searchModifier from '.';

const initialState = {
  requestParams: {
    q: 'search test',
  },
};

describe('search seo tags test', () => {
  it('should return meta description unmodified', () => {
    const metaData = {
      name: 'description',
      property: null,
      content: null,
      contentKey: 'seo.description',
    };
    const metas = searchModifier.metas({}, metaData);
    const otherMetas = searchModifier.metas(initialState, {
      name: 'author',
    });

    expect(metas.content).toEqual('Últimas noticias sobre . Actualidad y tendencia sobre ');
    expect(otherMetas.content).toBeUndefined();
  });

  it('should return meta description modified', () => {
    const metaData = {
      name: 'description',
      property: null,
      content: null,
      contentKey: 'seo.description',
    };
    const metas = searchModifier.metas(initialState, metaData);

    expect(metas.content).toEqual('Últimas noticias sobre search test. Actualidad y tendencia sobre search test');
  });

  it('should return title string with query string', () => {
    const title = searchModifier.title(initialState);

    expect(title).toEqual('Search test: Últimas noticias para Search test. | Univision');
  });

  it('should return default title without query search', () => {
    const title = searchModifier.title();

    expect(title).toEqual('Últimos articulos, noticias, galerias y videos | Univision');
  });

  it('should return canonical URL with query string', () => {
    const canonicalUrl = 'https://univision.com/search';
    const canonical = searchModifier.canonical(initialState, canonicalUrl);

    expect(canonical).toEqual('https://univision.com/search?q=search%20test');
  });

  it('should return canonical URL without query search', () => {
    const canonical = searchModifier.canonical({}, '/search');

    expect(canonical).toEqual('/search');
  });
});
