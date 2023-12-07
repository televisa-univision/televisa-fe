import React from 'react';
import { mount } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import pageFactory from './ampPageFactory';

storeHelpers.getPageData = jest.fn(() => mockApiData);
storeHelpers.getRequestParams = jest.fn();

describe('pageFactory', () => {
  describe('isAmpPage', () => {
    it('returns true if for AMP paths', () => {
      expect(pageFactory.isAmpPage('/amp/uri', 'article')).toBe(true);
    });

    it('returns false if for non-AMP paths', () => {
      expect(pageFactory.isAmpPage('/uri', 'section')).toBe(false);
    });

    it('returns false if for non-AMP content type', () => {
      expect(pageFactory.isAmpPage('/amp/uri', 'section')).toBe(false);
    });
  });
  describe('getPageComponent', () => {
    it('should return null if data is null', () => {
      storeHelpers.getPageData.mockReturnValueOnce(null);
      expect(pageFactory.getPageComponent('article', {})).toBe(null);
    });
    it('returns Article', () => {
      const page = mount(pageFactory.getPageComponent('article', {}));
      expect(page.find('Article')).toBeDefined();
    });
    it('returns ull by default', () => {
      expect(pageFactory.getPageComponent('invalid', {})).toBe(null);
    });
  });

  describe('getHtmlAndCss', () => {
    it('returns a valid ampTransformation', () => {
      const ampTransformation = pageFactory.getHtmlAndCss(<div />);
      expect(ampTransformation).toBe('<div></div>');
    });
  });

  describe('getAssets', () => {
    const testAssets = {
      styles: {
        AMParticle: 'amp article styles',
      },
      javascript: {
        AMParticle: 'amp article js',
      },
    };
    it('returns AMP assets', () => {
      const assets = pageFactory.getAssets('article', testAssets);
      expect(assets.javascript).toBe(testAssets.javascript.AMParticle);
      expect(assets.styles).toBe(testAssets.styles.AMParticle);
    });
  });
});
