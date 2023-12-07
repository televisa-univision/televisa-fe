import inline from './inline';

const intervalSettings = {
  articleAdInterval: 15,
  articleAdMinCharacterCount: 700,
  articleAdMaxCharacterCount: 1500,
  articleAdLastMinCharacterCount: 300,
};

const bodyArray = [
  {
    id: 0,
    type: 'enhancement',
    value: {},
  },
  {
    id: 1,
    type: 'text',
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo justo, et feugiat urna gravida ac. Vivamus quam dolor, tristique id facilisis id, viverra pellentesque metus. Integer aliquam enim nibh, id dictum nibh placerat vitae. Integer euismod venenatis tortor quis scelerisque',
  },
  {
    id: 2,
    type: 'text',
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo justo, et feugiat urna gravida ac. Vivamus quam dolor, tristique id facilisis id, viverra pellentesque metus. Integer aliquam enim nibh, id dictum nibh placerat vitae. Integer euismod venenatis tortor quis scelerisque',
  },
  {
    id: 3,
    type: 'enhancement',
    value: {},
  },
  {
    id: 4,
    type: 'text',
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo justo, et feugiat urna gravida ac. Vivamus quam dolor, tristique id facilisis id, viverra pellentesque metus. Integer aliquam enim nibh, id dictum nibh placerat vitae. Integer euismod venenatis tortor quis scelerisque',
  },
  {
    id: 5,
    type: 'text',
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo justo, et feugiat urna gravida ac. Vivamus quam dolor, tristique id facilisis id, viverra pellentesque metus. Integer aliquam enim nibh, id dictum nibh placerat vitae. Integer euismod venenatis tortor quis scelerisque',
  },
  {
    id: 6,
    type: 'text',
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo justo, et feugiat urna gravida ac. Vivamus quam dolor, tristique id facilisis id, viverra pellentesque metus. Integer aliquam enim nibh, id dictum nibh placerat vitae. Integer euismod venenatis tortor quis scelerisque',
  },
  {
    id: 7,
    type: 'text',
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo justo, et feugiat urna gravida ac. Vivamus quam dolor, tristique id facilisis id, viverra pellentesque metus. Integer aliquam enim nibh, id dictum nibh placerat vitae. Integer euismod venenatis tortor quis scelerisque',
  },
  {
    id: 8,
    type: 'text',
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo justo, et feugiat urna gravida ac. Vivamus quam dolor, tristique id facilisis id, viverra pellentesque metus. Integer aliquam enim nibh, id dictum nibh placerat vitae. Integer euismod venenatis tortor quis scelerisque',
  },
  {
    id: 9,
    type: 'text',
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo justo, et feugiat urna gravida ac. Vivamus quam dolor, tristique id facilisis id, viverra pellentesque metus. Integer aliquam enim nibh, id dictum nibh placerat vitae. Integer euismod venenatis tortor quis scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const listItem = {
  objectData: {
    type: 'listitem',
  },
};

const dataList = [
  {
    id: 0,
    type: 'text',
    value: 'Los mejores equipos colombianos de futbol',
  },
  {
    id: 1,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
  {
    id: 2,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
  {
    id: 3,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
  {
    id: 4,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
  {
    id: 5,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
  {
    id: 6,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
  {
    id: 7,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
  {
    id: 8,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
  {
    id: 9,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
  {
    id: 10,
    type: 'enhancement',
    value: {},
    ...listItem,
  },
];

describe('inline isText', () => {
  it('should return true if type is text', () => {
    expect(inline.isText({ type: 'text' })).toBeTruthy();
  });
  it('should return false if type is not text', () => {
    expect(inline.isText({ type: 'enhancement' })).toBeFalsy();
  });
});

describe('inline isLessThan', () => {
  it('should return true if less than minimum', () => {
    expect(inline.isLessThan('Lorem Ipsum is simply', 22)).toBeTruthy();
  });
  it('should return false if more than minimum', () => {
    expect(inline.isLessThan('Lorem Ipsum is simply', 5)).toBeFalsy();
  });
});

describe('inline isMoreThan', () => {
  it('should return true if more than minimum', () => {
    expect(inline.isMoreThan('Lorem Ipsum is simply', 5)).toBeTruthy();
  });
  it('should return false if less than minimum', () => {
    expect(inline.isMoreThan('Lorem Ipsum is simply', 22)).toBeFalsy();
  });
});

describe('inline getIntervalSetting', () => {
  const mobileSettings = {
    articleAdInterval: 15,
    articleAdMinCharacterCount: 700,
    articleAdMaxCharacterCount: 1500,
  };
  const intervalSetting = {
    mobileArticleBodySettings: mobileSettings,
  };
  it('should return valid object if valid settings', () => {
    expect(inline.getIntervalSetting(intervalSetting, 'mobile')).toEqual(mobileSettings);
  });
  it('should return null if wrong settings provided', () => {
    expect(inline.getIntervalSetting({}, 'mobile')).toEqual(null);
  });
});

describe('inline getAd', () => {
  it('should return ad object', () => {
    const ad = inline.getAd();
    expect(ad.type).toBe('ad');
  });
});

describe('inline injectAds', () => {
  it('should call combineAds if right settings', () => {
    const combineAdsSpy = spyOn(inline, 'combineAds').and.callThrough();
    inline.injectAds({ bodyArray, device: 'desktop' });
    expect(combineAdsSpy).toHaveBeenCalledTimes(1);
  });
  it('should return same input if not array ', () => {
    expect(inline.injectAds({ bodyArray: 'test', device: 'desktop' })).toBe('test');
  });
  it('should call combineAds with custom ad if right settings', () => {
    const combineAdsSpy = spyOn(inline, 'combineAds').and.callThrough();
    const advertisement = { type: 'test', value: 'testing' };
    inline.injectAds({ bodyArray, device: 'desktop', advertisement });
    expect(combineAdsSpy).toHaveBeenCalledTimes(1);
  });
  it('should inject taboola mid article 1x1', () => {
    expect(inline.injectTaboolaMidAd({ bodyArray }));
  });
  it('should not inject taboola mid article 1x1', () => {
    expect(inline.injectTaboolaMidAd({ bodyArray: {} }));
  });
});

describe('inline injectAds to list', () => {
  it('should return same input if not array to list', () => {
    expect(inline.injectListAds({ bodyArray: 'test', device: 'desktop' })).toBe('test');
  });
  it('should call combineAdsList if right settings to list', () => {
    const combineAdsSpy = spyOn(inline, 'combineAdsList').and.callThrough();
    inline.injectListAds({ bodyArray: dataList, device: 'desktop' });
    expect(combineAdsSpy).toHaveBeenCalledTimes(1);
  });
  it('should call combineAdsList with custom ad if right settings to list', () => {
    const combineAdsSpy = spyOn(inline, 'combineAdsList').and.callThrough();
    const advertisement = { type: 'test', value: 'testing' };
    inline.injectListAds({ bodyArray: dataList, device: 'desktop', advertisement });
    expect(combineAdsSpy).toHaveBeenCalledTimes(1);
  });
});

describe('inline combineAds to list', () => {
  it('should return same array if wrong settings to list', () => {
    expect(inline.combineAdsList(dataList, {}, inline.getAd()).length)
      .toBe(dataList.length);
  });
  it('should return an array with ads if right settings to list', () => {
    expect(inline.combineAdsList(dataList, intervalSettings, inline.getAd()).length)
      .toBeGreaterThan(dataList.length);
  });
});

describe('inline combineAds', () => {
  it('should return an array with ads if right settings ', () => {
    expect(inline.combineAds(bodyArray, intervalSettings, inline.getAd()).length)
      .toBeGreaterThan(bodyArray.length);
  });
  it('should return same array if wrong settings ', () => {
    expect(inline.combineAds(bodyArray, {}, inline.getAd()).length).toBe(bodyArray.length);
  });
});

describe('addInitialAd', () => {
  it('should return empty arrays if not array provided', () => {
    expect(
      inline.addInitialAd({})
    ).toEqual({ withAdArray: [], remainArray: [] });
  });
  it('should return initial ad unit', () => {
    const lead = { type: 'video' };
    const withAdArray = inline.addInitialAd({ bodyArray, lead });
    expect(withAdArray.withAdArray[2]).toEqual(
      expect.objectContaining({ type: 'ad' })
    );
  });
  it('should return with ad override', () => {
    const initialAdOverride = { type: 'ampAd' };
    const withAdArray = inline.addInitialAd({ bodyArray, initialAdOverride });
    expect(withAdArray.withAdArray[2]).toEqual(
      expect.objectContaining({ type: 'ampAd' })
    );
  });
});

describe('addInitialAd to list', () => {
  it('should return empty arrays if not array provided to list', () => {
    expect(
      inline.addInitialAdList({})
    ).toEqual({ withAdArray: [], remainArray: [] });
  });
  it('should return initial ad unit to List', () => {
    const lead = { type: 'video' };
    const withAdArray = inline.addInitialAdList({ bodyArray: dataList, lead });
    expect(withAdArray.withAdArray[4]).toEqual(
      expect.objectContaining({ type: 'ad' })
    );
  });
});
