import {
  getTagHierarchyNames,
  getTagHierarchyUri,
  toMatchUrl,
} from './helpers';

describe('taxonomy helpers', () => {
  describe('getTagHierarchyUri', () => {
    it('should return an empty array if there not tags', () => {
      expect(getTagHierarchyUri(null)).toEqual([]);
    });

    it('should return the tags uris', () => {
      expect(getTagHierarchyUri([{ url: 'http://www.univision.com/test' }])).toEqual(['/test']);
    });

    it('should return the tags uris in bex', () => {
      expect(getTagHierarchyUri([{ uri: 'http://www.univision.com/test' }])).toEqual(['/test']);
    });
  });

  describe('getTagHierarchyNames', () => {
    it('should return an empty array if there not tags', () => {
      expect(getTagHierarchyNames(null)).toEqual([]);
    });

    it('should return the tags names', () => {
      expect(getTagHierarchyNames([{ name: 'Test' }])).toEqual(['Test']);
    });
  });

  describe('toMatchUrl', () => {
    it('should return an empty array if there not valud URL', () => {
      expect(toMatchUrl(null)).toBeNull();
    });

    it('should return and relative URL', () => {
      expect(toMatchUrl('http://www.univision.com/test')).toEqual('/test');
    });

    it('should return relative URL with deportes prefix for TUDN', () => {
      expect(toMatchUrl('http://uat.tudn.com/test')).toEqual('/deportes/test');
    });

    it('should return relative URL with deportes prefix even if root TUDN', () => {
      expect(toMatchUrl('http://uat.tudn.com')).toEqual('/deportes/');
    });
  });
});
