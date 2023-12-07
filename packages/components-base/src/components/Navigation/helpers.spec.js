import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import {
  SLIDESHOW,
  SLIDESHOW_HORIZONTAL,
  ARTICLE,
} from '@univision/fe-commons/dist/constants/contentTypes.json';

import * as helpers from './helpers';

import links from './GlobalNav/data/links';
import mxLinks from './GlobalNav/data/mx/links';
import televisaLinks from './GlobalNav/data/televisaLinks';

const mockEvent = {
  target: {
    getAttribute: jest.fn(() => 'name'),
  },
};

describe('Navigation helpers suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('trackClickEvent test', () => {
    it('should call traker correctly', () => {
      const trackerSpy = jest.spyOn(NavigationTracker, 'track');
      helpers.default('test', 'name');
      expect(trackerSpy).toHaveBeenCalled();
    });

    it('should call traker correctly and take vaue from JS event', () => {
      const trackerSpy = jest.spyOn(NavigationTracker, 'track');
      helpers.default('test', mockEvent.target);
      expect(trackerSpy).toHaveBeenCalled();
    });

    it('should not call if not have valir values', () => {
      const trackerSpy = jest.spyOn(NavigationTracker, 'track');
      helpers.default('test');
      expect(trackerSpy).not.toHaveBeenCalled();
    });
  });

  describe('isExtendedDarkPage test', () => {
    it('should be false if the page is an Article or Slideshow', () => {
      expect(helpers.isExtendedDarkPage(ARTICLE).isExtended).toBeFalsy();
      expect(helpers.isExtendedDarkPage(SLIDESHOW).isExtended).toBeFalsy();
    });

    it('should be true if the page is an Slideshow of type horizontal', () => {
      expect(helpers.isExtendedDarkPage(SLIDESHOW, SLIDESHOW_HORIZONTAL).isExtended).toBeTruthy();
    });
  });

  describe('getSiteLinks test', () => {
    it('should return televisaLinks when isTelevisaSite is true', () => {
      const result = helpers.getSiteLinks({ isTelevisaSite: true });
      expect(result).toEqual(televisaLinks);
    });

    it('should return mxLinks when isTudnSite is true and userLocation is MX', () => {
      const result = helpers.getSiteLinks({ isTudnSite: true, userLocation: 'MX' });
      expect(result).toEqual(mxLinks);
    });

    it('should return links when isTudnSite is true but userLocation is not MX', () => {
      const result = helpers.getSiteLinks({ isTudnSite: true, userLocation: 'US' });
      expect(result).toEqual(links);
    });
  });

  describe('filterLinks test', () => {
    it('should return false if it is a Univision link and neither isTelevisaSite nor isTudnSite is true', () => {
      const result = helpers.filterLinks({
        index: 0, // to make isUvnLink true
        isTelevisaSite: false,
        isTudnSite: false,
        link: { name: 'Sample Link' },
      });
      expect(result).toBe(false);
    });

    it('should return true if it is not a Univision link and neither isTelevisaSite nor isTudnSite is true', () => {
      const result = helpers.filterLinks({
        index: 1, // to make isUvnLink false
        isTelevisaSite: false,
        isTudnSite: false,
        link: { name: 'Sample Link' },
      });
      expect(result).toBe(true);
    });

    it('should return true if it is a Univision link and isTelevisaSite is true', () => {
      const result = helpers.filterLinks({
        index: 0, // to make isUvnLink true
        isTelevisaSite: true,
        isTudnSite: false,
        link: { name: 'Sample Link' },
      });
      expect(result).toBe(true);
    });

    it('should return true if it is a Univision link and isTudnSite is true', () => {
      const result = helpers.filterLinks({
        index: 0, // to make isUvnLink true
        isTelevisaSite: false,
        isTudnSite: true,
        link: { name: 'Sample Link' },
      });
      expect(result).toBe(true);
    });
  });
});
