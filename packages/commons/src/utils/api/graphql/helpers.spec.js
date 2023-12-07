import {
  parseContent,
  parseHoroscopesResponse,
} from './helpers';

describe('helpers', () => {
  describe('parseContent', () => {
    it('should return a parsed content when __typename is GenericCmsContent', () => {
      const parsedContent = parseContent({
        __typename: 'GenericCmsContent',
        json: JSON.stringify({ type: 'Article' }),
      });
      expect(parsedContent).toEqual({
        __typename: 'GenericCmsContent',
        type: 'Article',
      });
    });

    it('should return the same content when __typename is not GenericCmsContent', () => {
      const content = {
        __typename: 'Article',
        type: 'Article',
      };
      const parsedContent = parseContent(content);
      expect(parsedContent).toEqual(content);
    });

    it('should return the same content if something fail', () => {
      const content = {
        __typename: 'GenericCmsContent',
        json: 'InvalidJSON',
      };
      const parsedContent = parseContent(content);
      expect(parsedContent).toEqual(content);
    });

    it('should return the same content if it is not GenericCmsContent', () => {
      const content = {
        type: 'Article',
      };
      const parsedContent = parseContent(content);
      expect(parsedContent).toEqual(content);
    });
  });

  describe('parseHoroscopesResponse', () => {
    it('should empty items or ids throws and exception', () => {
      expect(parseHoroscopesResponse({ ids: [], items: [] }))
        .toEqual({ ids: [], items: [] });
      expect(() => {
        parseHoroscopesResponse({ ids: [], items: {} });
      }).toThrow();
      expect(() => {
        parseHoroscopesResponse({ ids: {}, items: [] });
      }).toThrow();
    });
  });
});
