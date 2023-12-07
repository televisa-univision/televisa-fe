import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import getMetaOptions from './getMetaOptions';

describe('getMetaOptions', () => {
  it('should return an empty object by default', () => {
    expect(getMetaOptions({})).toEqual({});
  });
  it('should return read time when type is article', () => {
    expect(
      getMetaOptions({
        type: contentTypes.ARTICLE,
        readTime: 2,
      })
    ).toEqual(
      expect.objectContaining({
        content: '2 min de lectura',
      })
    );
  });
  it('should return empty string when read time is empty', () => {
    expect(
      getMetaOptions({
        type: contentTypes.ARTICLE,
      })
    ).toEqual(
      expect.objectContaining({
        content: null,
      })
    );
  });
  it('should return slide count when type is slideshow', () => {
    expect(
      getMetaOptions({
        type: contentTypes.SLIDESHOW,
        slideCount: 3,
      })
    ).toEqual(
      expect.objectContaining({
        content: '3 Contenidos',
      })
    );
  });
  it('should return duration string when type is video', () => {
    expect(
      getMetaOptions({
        type: contentTypes.VIDEO,
        durationString: '1:00',
      })
    ).toEqual(
      expect.objectContaining({
        content: '1:00',
      })
    );
  });
});
