import deepFreeze from 'deep-freeze';
import * as selector from './page-selectors';
import { RADIO } from '../../constants/pageCategories';
import { X_IS_USER_LOC_EU } from '../../constants/requestHeaders';

const breakpoint = {
  size: 'lg',
  width: 1440,
  device: 'desktop',
};

const state = {
  page: {
    data: {
      addCacheBusterToImageUrls: true,
      type: 'section',
      uri: 'https://www.univision.com/local/miami-wltv',
      uid: '0000014c-ba66-d983-a57d-feefe0140000',
      socialNetworks: [
        {
          name: 'Facebook',
          target: '_blank',
          text: null,
          url: 'https://www.facebook.com/UNIVISION23MIAMI/',
        },
      ],
      tvStation: {
        call: 'WLII',
        uri: 'https://univision.com',
        forecast: {
          maxTemp: 40,
        },
      },
      variant: 'dark',
      sectionType: 'show',
      hierarchy: [
        {
          uuid: '0000014c-ba66-d983-a57d-feefe0140000',
          uri: 'https://www.univision.com/horoscopos',
          name: 'horoscopos',
          title: 'Horóscopos',
        },
        {
          uuid: '0000014c-e444-dc8f-ab4d-fce4275a0000',
          uri: 'https://www.univision.com/horoscopos/cancer',
          name: 'cancer',
          title: 'Cáncer',
        },
      ],
      globalWidgets: [
        {
          settings: {
            type: 'allbannermovingbanner',
            uid: '00000170-fb51-da00-ab79-fbf752c70000',
            title: 'Crisis del Coronavirus',
            titleLink: {
              href: 'https://www.google.com',
              target: '_blank',
              text: null,
              uid: '00000171-182c-d213-a77d-9b2efadd0000',
            },
            lazyLoaded: false,
          },
          analyticsData: {
            widget: {
              widget_pos: 1,
              widget_title: 'crisis del coronavirus',
              widget_type: 'all - banner - moving - banner',
            },
          },
          contents: [],
        },
      ],
      adSettings: {
        disable3rdPartyAds: true,
        targeting: {
          vertical: 'global',
        },
      },
      widgets: [
        { type: 'a' },
        { type: 'b' },
        { type: 'c' },
      ],
    },
    pageCategory: 'univision',
    requestParams: {
      test: 'test',
    },
    breakpoint,
    device: 'desktop',
    language: 'en',
    uaDevice: 'pc',
    userAgent: 'Mozilla',
    headers: {
      [X_IS_USER_LOC_EU]: 'true',
    },
    domain: 'https://www.univision.com',
    sites: {
      univision: 'https://www.univision.com',
      tudn: 'https://www.tudn.com',
    },
    config: {
      deploy: {
        env: 'test',
      },
      proxy: 'https://www.univision.com',
    },
    hasAdSkin: 'test',
    navigationCount: 2,
    theme: {
      v2: {
        subNavBackgroundColor: '#000000',
      },
    },
    userLocation: 'MX',
  },
  headerConf: {
    isMarketSelectorOpen: true,
    marketSelectorCurrent: '/local/miami-wltv',
  },
  player: {
    anchorPlayer: {
      abacastId: 1,
    },
  },
  videoPip: {
    placeholderId: 1,
    anchored: false,
  },
  sports: {
    playerProfile: {
      team: 'Barcelona',
    },
  },
};

deepFreeze(state);

describe('page-selectors', () => {
  describe('pageSelector', () => {
    it('should return the corresponding values from state object', () => {
      expect(selector.pageSelector(state)).toEqual(state.page);
    });
    it('should return the corresponding values from store isntance', () => {
      const store = {
        getState: jest.fn(() => state),
      };
      expect(selector.pageSelector(store)).toEqual(state.page);
      expect(store.getState).toHaveBeenCalled();
    });
  });
  describe('headerConfSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.headerConfSelector(state)).toEqual(state.headerConf);
    });
  });
  describe('socialNetworksSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.socialNetworksSelector(state)).toEqual([
        {
          name: 'Facebook',
          target: '_blank',
          text: null,
          url: 'https://www.facebook.com/UNIVISION23MIAMI/',
        },
      ]);
    });
  });
  describe('configSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.configSelector(state)).toEqual(state.page.config);
    });
    it('should return the empty object if not have data available', () => {
      expect(selector.configSelector()).toEqual({});
    });
  });
  describe('appVersionSelector', () => {
    it('should return the corresponding value', () => {
      expect(selector.appVersionSelector({
        page: { appVersion: 2 },
      })).toEqual(2);
    });
    it('should return default value', () => {
      expect(selector.appVersionSelector(state)).toEqual(1);
    });
  });
  describe('domainSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.domainSelector(state)).toEqual('https://www.univision.com');
    });
  });
  describe('navigationCountSelector', () => {
    it('should return the navigationCountSelector values', () => {
      expect(selector.navigationCountSelector(state)).toEqual(2);
    });
  });
  describe('proxySelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.proxySelector(state)).toEqual('https://www.univision.com');
    });
  });
  describe('sitesSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.sitesSelector(state)).toEqual({
        univision: 'https://www.univision.com',
        tudn: 'https://www.tudn.com',
      });
    });
    it('should return the empty object if not have data available', () => {
      expect(selector.sitesSelector()).toEqual({});
    });
  });

  describe('siteSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.siteSelector(state)).toEqual('');
    });
    it('should return the empty object if not have data available', () => {
      expect(selector.sitesSelector()).toEqual({});
    });
  });
  describe('variantSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.variantSelector(state)).toEqual('dark');
    });
  });
  describe('pageUriSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.pageUriSelector(state)).toEqual('https://www.univision.com/local/miami-wltv');
    });
  });
  describe('pageCategorySelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.pageCategorySelector(state)).toEqual('univision');
    });
  });
  describe('isLocalMarketSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.isLocalMarketSelector(state)).toEqual(true);
    });
  });
  describe('localMarketSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.localMarketSelector(state)).toEqual('WLII');
    });
  });
  describe('isTudnSiteSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.isTudnSiteSelector({ page: { isTudn: true } })).toEqual(true);
    });
    it('should return false with empty values', () => {
      expect(selector.isTudnSiteSelector()).toEqual(false);
    });
  });
  describe('isSpaSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.isSpaSelector({ page: { isSpa: true } })).toEqual(true);
    });
    it('should return false with empty values', () => {
      expect(selector.isSpaSelector()).toEqual(false);
    });
  });
  describe('pageWidgetsSelector', () => {
    it('should return the rigth number of widgets', () => {
      expect(selector.pageWidgetsSelector(state)).toHaveLength(3);
    });
  });
  describe('hasAdSkinSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.hasAdSkinSelector(state)).toEqual('test');
    });
  });
  describe('deviceSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.deviceSelector(state)).toEqual('desktop');
    });
  });
  describe('isWebPSupportedSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.isWebPSupportedSelector(state)).toEqual(false);
    });
  });
  describe('uaDeviceSelector', () => {
    it('should return the corresponding user-agent device value', () => {
      expect(selector.uaDeviceSelector(state)).toEqual('pc');
    });
  });
  describe('breakpointSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.breakpointSelector(state)).toEqual(breakpoint);
    });
  });
  describe('userAgentSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.userAgentSelector(state)).toEqual('Mozilla');
    });
  });
  describe('requestHeadersSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.requestHeadersSelector(state)).toEqual({
        [X_IS_USER_LOC_EU]: 'true',
      });
    });
  });
  describe('showHomePageSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.showHomePageSelector(state)).toEqual(true);
    });
  });
  describe('showPageSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.showPageSelector(state)).toEqual(true);
    });

    it('should return true when the page is not found', () => {
      expect(selector.showPageSelector({ page: { data: { status: 404 } } })).toEqual(true);
    });
  });
  describe('isMarketSelectorOpenSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.isMarketSelectorOpenSelector(state)).toEqual(true);
    });
  });
  describe('marketSelectorCurrentSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.marketSelectorCurrentSelector(state)).toEqual('/local/miami-wltv');
    });
  });
  describe('radioAnchorSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.radioAnchorSelector(state)).toEqual({ abacastId: 1 });
    });
  });
  describe('pageTransitionSelector', () => {
    it('should return the corresponding value', () => {
      expect(selector.pageTransitionSelector(state)).toBe(false);
    });
  });
  describe('requestParamsSelector', () => {
    it('should return the corresponding value', () => {
      expect(selector.requestParamsSelector(state)).toEqual({ test: 'test' });
    });
  });
  describe('globalWidgetSelector', () => {
    it('should return the globalWidgets value', () => {
      expect(selector.globalWidgetSelector(state).length).toEqual(1);
    });
  });
  describe('actualHierarchySelector', () => {
    it('should return the corresponding values', () => {
      const list = state.page.data.hierarchy;
      const expected = list[list.length - 1];
      expect(selector.actualHierarchySelector(state)).toEqual(expected);
      expect(selector.actualHierarchySelector({})).not.toBeDefined();
    });
  });
  describe('sharingOptionsSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.sharingOptionsSelector(state)).toEqual({});
    });
  });
  describe('pageUIDSelector', () => {
    it('should return the page UID value', () => {
      expect(selector.pageUIDSelector(state)).toBe('0000014c-ba66-d983-a57d-feefe0140000');
    });
  });
  describe('getCurrentBrowserUrl', () => {
    it('should return null when some missing value ', () => {
      expect(selector.getCurrentBrowserUrl(null)).toEqual(null);
      expect(selector.getCurrentBrowserUrl(state)).toEqual(
        'https://www.univision.com/',
      );
    });
    it('should return just the domain when pathName is iframe.html', () => {
      // Here we would like to do global?.window?.location?.pathname="/iframe.html"
      // but somehow it doesn't work
      jest.spyOn(String.prototype, 'startsWith').mockImplementationOnce(() => true);
      expect(selector.getCurrentBrowserUrl(state)).toEqual(
        'https://www.univision.com',
      );
    });
  });
  describe('searchSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.searchSelector()).toEqual({ dateFilter: 'all', query: '' });
      expect(selector.searchSelector(state)).toEqual({ dateFilter: 'all', query: '' });
    });
  });
  describe('disable3rdPartyAds', () => {
    it('should return true if 3rdPartyAds are disabled', () => {
      expect(selector.disable3rdPartyAds(state)).toEqual(true);
    });
    it('should return false if 3rdPartyAds is not defined', () => {
      const emptyState = {};
      expect(selector.disable3rdPartyAds(emptyState)).toEqual(false);
    });
  });
  describe('imageCacheBusterSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.imageCacheBusterSelector()).toBeFalsy();
      expect(selector.imageCacheBusterSelector(state)).toBeTruthy();
    });
  });
  describe('radioPageSelector', () => {
    it('should return false when is not a radio station.', () => {
      expect(selector.radioPageSelector(state)).toEqual(false);
    });

    it('should return true when the page is a radio station', () => {
      expect(selector.radioPageSelector({ page: { pageCategory: RADIO } })).toEqual(true);
    });
  });
  describe('languageSelector', () => {
    it('should return the corresponding language values', () => {
      expect(selector.languageSelector({})).toEqual('es');
      expect(selector.languageSelector(state)).toEqual('en');
    });
  });

  describe('isAmpPageSelector', () => {
    it('should return the corresponding isAmp values', () => {
      expect(selector.isAmpPageSelector({})).toEqual(false);
      expect(selector.isAmpPageSelector({ page: { isAmp: true } })).toEqual(true);
    });
  });

  describe('sportsDataSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.sportsDataSelector()).toEqual({});
      expect(selector.sportsDataSelector(state)).toEqual({ playerProfile: { team: 'Barcelona' } });
    });
  });

  describe('contentTypeSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.contentTypeSelector()).toEqual(undefined);
      expect(selector.contentTypeSelector(state)).toEqual('section');
    });
  });

  describe('adSettingsTargetingSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.adSettingsTargetingSelector()).toEqual(undefined);
      expect(selector.adSettingsTargetingSelector(state)).toEqual({
        vertical: 'global',
      });
    });
  });

  describe('adSettingsSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.adSettingsSelector()).toEqual(undefined);
      expect(selector.adSettingsSelector(state)).toEqual({
        disable3rdPartyAds: true,
        targeting: {
          vertical: 'global',
        },
      });
    });
  });

  describe('userLocationSelector', () => {
    it('should return the corresponding values', () => {
      expect(selector.userLocationSelector()).toEqual('US');
      expect(selector.userLocationSelector(state)).toEqual('MX');
    });
  });
  describe('isLasEstrellasSiteSelector', () => {
    it('should return the corresponding values', () => {
      const dataMock = {
        page: {
          site: 'lasestrellas',
          parentSite: 'televisa',
        },
      };
      expect(selector.isLasEstrellasSiteSelector(dataMock)).toEqual(true);
      expect(selector.isTelevisaSiteSelector(dataMock)).toEqual(true);
    });
  });
});
