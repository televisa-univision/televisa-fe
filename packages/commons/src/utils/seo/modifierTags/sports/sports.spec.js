import sportsModifier from '.';

const initialState = {
  pageCategory: 'soccerteam-estadisticas',
  data: {
    title: 'Monterrey',
    uri: 'https://tudn.com/futbol/monterrey',
    type: 'soccerteam',
    seo: {
      title: 'Monterrey title seo',
      description: 'Liga MX description seo',
      canonicalUrl: 'https://tudn.com/futbol/monterrey',
    },
  },
};

describe('sports seo tags test', () => {
  it('should return meta description modified', () => {
    const metaData = {
      name: 'description',
      property: null,
      content: null,
      contentKey: 'seo.description',
    };
    const metas = sportsModifier.metas(initialState, metaData);

    expect(metas.content).toEqual('Estadisticas de Liga MX description seo');
  });

  it('should return meta title modified', () => {
    const metaData = {
      name: 'title',
      property: null,
      content: null,
      contentKey: 'seo.title',
    };
    const metas = sportsModifier.metas(initialState, metaData);

    expect(metas.content).toEqual('Estadisticas de Monterrey title seo');
  });

  it('should return same meta title if title not found', () => {
    const metaData = {
      name: 'title',
      property: null,
      content: null,
      contentKey: 'seo.title',
    };
    const metas = sportsModifier.metas({}, metaData);

    expect(metas).toEqual(metaData);
  });

  it('should return meta title modified with sub-section', () => {
    const metaData = {
      name: 'title',
      property: null,
      content: null,
      contentKey: 'seo.title',
    };
    const metas = sportsModifier.metas(initialState, metaData);

    expect(metas.content).toEqual('Estadisticas de Monterrey title seo');
  });

  it('should return meta title modified without sub-section', () => {
    const initialStateCopy = { ...initialState };
    initialStateCopy.pageCategory = 'soccercompetition';
    const metaData = {
      name: 'title',
      property: null,
      content: null,
      contentKey: 'seo.title',
    };
    const metas = sportsModifier.metas(initialStateCopy, metaData);

    expect(metas.content).toEqual('Monterrey title seo');
  });

  it('should return title string', () => {
    const title = sportsModifier.title(initialState, initialState.data.seo.title);

    expect(title).toEqual('Estadisticas de Monterrey title seo');
  });

  it('should return canonical URL with query string', () => {
    const canonicalUrl = 'https://tudn.com/futbol/monterrey/';
    const canonical = sportsModifier.canonical(initialState, canonicalUrl);

    expect(canonical).toEqual('https://tudn.com/futbol/monterrey/estadisticas');
  });

  it('should return canonical URL without sub-section', () => {
    initialState.pageCategory = 'soccerteam';
    const canonicalUrl = 'https://tudn.com/futbol/monterrey';
    const canonical = sportsModifier.canonical(initialState, canonicalUrl);

    expect(canonical).toEqual('https://tudn.com/futbol/monterrey');
  });
});
