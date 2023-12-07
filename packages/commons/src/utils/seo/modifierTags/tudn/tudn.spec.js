import features from '../../../../config/features';

import tudnModifier from '.';

describe('tudn seo tags test', () => {
  describe('metas', () => {
    it('should not modify any metas with provided values', () => {
      const metaData = {
        property: 'og:image',
        content: 'test',
      };
      const custom = tudnModifier.metas({}, metaData);
      expect(custom).toEqual(metaData);
    });

    it('should return fb:app_id', () => {
      const metaData = {
        property: 'fb:app_id',
        content: 'test',
      };
      const custom = tudnModifier.metas({}, metaData);
      expect(custom).toEqual({
        property: 'fb:app_id',
        content: '447901525311921',
      });
    });
  });
  describe('alternateSection', () => {
    let isWorldCupMVPSpy;
    const pageState = {
      domain: 'https://www.tudn.com',
      data: {
        type: 'section',
        uri: 'https://www.tudn.com/futbol',
      },
    };

    beforeEach(() => {
      isWorldCupMVPSpy = jest.spyOn(features.deportes, 'isWorldCupMVP').mockReturnValue(false);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return empty array when feature flag is off', () => {
      const alternateSection = tudnModifier.alternateSection(pageState);
      expect(alternateSection).toEqual([]);
    });
    it('should return empty array when content type is not section', () => {
      isWorldCupMVPSpy.mockReturnValue(true);
      const modifiedPageState = {
        domain: 'https://www.tudn.com',
        data: {
          type: 'article',
        },
      };
      const alternateSection = tudnModifier.alternateSection(modifiedPageState);
      expect(alternateSection).toEqual([]);
    });
    it('should return correct values when feature flag is on and content type is section', () => {
      isWorldCupMVPSpy.mockReturnValue(true);
      const alternateSection = tudnModifier.alternateSection(pageState);
      expect(alternateSection[0]).toEqual(
        expect.objectContaining({ hrefLang: 'es-us' })
      );
    });
    it('should default to www.tudn.com domain', () => {
      const modifiedState = {
        ...pageState,
        domain: undefined,
      };
      isWorldCupMVPSpy.mockReturnValue(true);
      const alternateSection = tudnModifier.alternateSection(modifiedState);
      expect(alternateSection[0]).toEqual({
        hrefLang: 'es-us',
        href: 'https://www.tudn.com/futbol',
      });
    });
    it('should return correct link with /mx path', () => {
      const modifiedPageState = {
        domain: 'https://www.tudn.com',
        data: {
          type: 'section',
          uri: 'https://www.tudn.com/mx/futbol',
        },
      };
      isWorldCupMVPSpy.mockReturnValue(true);
      const alternateSection = tudnModifier.alternateSection(modifiedPageState);
      expect(alternateSection[0]).toEqual({
        hrefLang: 'es-us',
        href: 'https://www.tudn.com/futbol',
      });
      expect(alternateSection[1]).toEqual({
        hrefLang: 'es-mx',
        href: 'https://www.tudn.com/mx/futbol',
      });
      expect(alternateSection[2]).toEqual({
        hrefLang: 'x-default',
        href: 'https://www.tudn.com/futbol',
      });
    });
  });
});
