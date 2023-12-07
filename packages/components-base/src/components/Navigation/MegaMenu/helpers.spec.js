import {
  VIX_BANNER_PATH,
  VIX_BANNER_DOMAIN,
  VIX_SMART_BANNER_PATH,
  VIX_BANNER_FOOTER_PATH,
} from '@univision/fe-commons/dist/constants/vixSitesData';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import {
  enhanceNetworksWithTracking,
  enhanceSectionLinksWithTracking,
  enhanceChildrenLinksWithParentInfo,
  trackNavigationClick,
  tracksVIXLink,
} from './helpers';

describe('MegaMenu helpers', () => {
  let navTrackerSpy;

  beforeEach(() => {
    navTrackerSpy = jest.spyOn(NavigationTracker, 'track');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('trackNavigationClick', () => {
    it('should track a link header click event with correct event action', () => {
      trackNavigationClick('noticias');
      expect(navTrackerSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
        eventAction: 'hamburger-noticias',
      });
    });

    it('should track a link click event with correct event action', () => {
      trackNavigationClick('noticias', 'politica');
      expect(navTrackerSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
        eventAction: 'hamburger-noticias-politica',
      });
    });
  });

  describe('enhanceChildrenLinksWithParentInfo', () => {
    it('returns an empty array if section data is not an object', () => {
      expect(enhanceChildrenLinksWithParentInfo()).toEqual([]);
    });

    it('returns an empty array if section data children is not an array', () => {
      expect(enhanceChildrenLinksWithParentInfo({ children: null })).toEqual([]);
    });

    it('returns links enhanced with parent name', () => {
      const sectionData = {
        name: 'parent',
        children: [
          {
            name: 'link1',
          },
          {
            name: 'link2',
          },
        ],
      };

      expect(enhanceChildrenLinksWithParentInfo(sectionData)).toEqual([
        {
          name: 'link1',
          parent: 'parent',
        },
        {
          name: 'link2',
          parent: 'parent',
        },
      ]);
    });
  });

  describe('enhanceNetworksWithTracking', () => {
    it('should return the list of networks when they come as an object', () => {
      const networks = { facebook: { name: 'facebook' }, instagram: { name: 'instagram' } };

      expect(enhanceNetworksWithTracking(networks).length).toBe(2);
    });

    it('should return the list of networks when they come as an array', () => {
      const networks = [{ name: 'facebook' }, { name: 'instagram' }];

      expect(enhanceNetworksWithTracking(networks).length).toBe(2);
    });

    it('should filter out networks when they are null or undefined', () => {
      const networks = [null, undefined];

      expect(enhanceNetworksWithTracking(networks)).toEqual([]);
    });

    it('should return [] when no valid args', () => {
      expect(enhanceNetworksWithTracking(undefined)).toEqual([]);
    });

    it('should filter out networks when they have invalid values', () => {
      const networks = { facebook: 'invalid', instagram: 'invalid' };

      expect(enhanceNetworksWithTracking(networks)).toEqual([]);
    });

    it('should correctly enhance networks with tracking', () => {
      const networks = [{ name: 'facebook' }];

      const [networkWithTracking] = enhanceNetworksWithTracking(networks);
      networkWithTracking.onClick();

      expect(navTrackerSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
        eventAction: 'hamburger-brand social icons-facebook',
      });
    });
  });

  describe('enhanceSectionLinksWithTracking', () => {
    it('should return an empty array if children is not a valid array', () => {
      expect(enhanceSectionLinksWithTracking()).toEqual([]);
    });

    it('should corrently enhance links with tracking', () => {
      const sectionData = {
        name: 'sectionData',
        children: [
          {
            name: 'example',
            href: 'example.com',
          },
        ],
      };

      const [linkWithTracking] = enhanceSectionLinksWithTracking(sectionData);
      linkWithTracking.onClick();

      expect(navTrackerSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
        eventAction: 'hamburger-sectionData-example',
      });
    });
  });
});

describe('tracksVIXLink', () => {
  let originalDataLayer = null;
  const expectedLinkDomain = VIX_BANNER_DOMAIN;
  const expectedVixSmartBannerPath = VIX_SMART_BANNER_PATH;
  const expectedSmartBannerUrl = `${expectedLinkDomain}${expectedVixSmartBannerPath}`;

  beforeEach(() => {
    originalDataLayer = window.dataLayer;
    window.dataLayer = [];
  });

  afterEach(() => {
    window.dataLayer = originalDataLayer;
  });

  it('sets the expected properties when isSmartBanner is true', () => {
    const isFooter = false;
    const isSmartBanner = true;
    const expectedEvent = 'vix_smart_banner';

    tracksVIXLink(isFooter, isSmartBanner);

    expect(window.dataLayer).toEqual([{
      event: expectedEvent,
      link_text: 'ViX',
      link_domain: expectedLinkDomain,
      link_url: expectedSmartBannerUrl,
      outbound: true,
    }]);
  });

  it('sets the expected properties when isSmartBanner is false and isFooter is false', () => {
    const isFooter = false;
    const isSmartBanner = false;
    const expectedLinkUrl = VIX_BANNER_PATH;
    const expectedEvent = 'vix_hamburger_menu';

    tracksVIXLink(isFooter, isSmartBanner);

    expect(window.dataLayer).toEqual([{
      event: expectedEvent,
      link_text: 'ViX',
      link_domain: expectedLinkDomain,
      link_url: expectedLinkUrl,
      outbound: true,
    }]);
  });

  it('sets the expected properties when isSmartBanner is false and isFooter is true', () => {
    const isFooter = true;
    const isSmartBanner = false;
    const expectedEvent = 'vix_footer_banner';
    const expectedLinkUrl = VIX_BANNER_FOOTER_PATH;

    tracksVIXLink(isFooter, isSmartBanner);

    expect(window.dataLayer).toEqual([{
      event: expectedEvent,
      link_text: 'ViX',
      link_domain: expectedLinkDomain,
      link_url: expectedLinkUrl,
      outbound: true,
    }]);
  });

  it('sets the expected properties on window.dataLayer when no params provided', () => {
    window.dataLayer = undefined;
    tracksVIXLink();
    expect(window.dataLayer).toEqual([{
      event: 'vix_smart_banner',
      link_text: 'ViX',
      link_domain: expectedLinkDomain,
      link_url: expectedSmartBannerUrl,
      outbound: true,
    }]);
    expect(window.dataLayer).toBeDefined();
  });

  it('sets the expected properties on window.dataLayer closeSmartBanner is provided', () => {
    const isFooter = false;
    const isSmartBanner = true;
    const closeSmartBanner = true;
    const expectedEvent = 'vix_smart_banner_discard';
    window.dataLayer = undefined;
    tracksVIXLink(isFooter, isSmartBanner, closeSmartBanner);
    expect(window.dataLayer).toEqual([{
      event: expectedEvent,
      link_text: 'x',
      link_domain: expectedLinkDomain,
      link_url: expectedSmartBannerUrl,
      outbound: true,
    }]);
    expect(window.dataLayer).toBeDefined();
  });
});
