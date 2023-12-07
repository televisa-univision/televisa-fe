import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import * as adTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import widgetDefinitions, { getContentWidgets, attachAdType } from './soccerMatchWidgetDefinitions';
import data from './__mocks__/mockData.json';

const widgetSettings = widgetDefinitions(data);

describe('soccerMatchWidgetDefinitions test', () => {
  it('should return the correct ad settings for top ad', () => {
    const topAd = widgetSettings.TopAdvertisement;
    expect(topAd.settings.isLazyLoaded).toBe(true);
    expect(topAd.settings.type).toBe(adTypes.TOP_AD_SECTIONS);
  });
  it('should return the correct ad settings for Mid ad', () => {
    const topAd = widgetSettings.MidAdvertisement;
    expect(topAd.settings.isLazyLoaded).toBe(true);
    expect(topAd.settings.type).toBe(adTypes.MID_AD_NO_FLEX);
  });
  it('should return a null object when no object data is provided', () => {
    const settings = widgetDefinitions(null);
    expect(settings).toBe(null);
  });

  describe('getContentWidgets test', () => {
    it('should return content widgets', () => {
      const widgets = getContentWidgets(data);
      expect(widgets).toHaveProperty('CarouselWidget', expect.any(Object));
      expect(widgets).toHaveProperty('ListWidget', expect.any(Object));
    });
    it('should return empty content widgets if widget not found', () => {
      const widgets = getContentWidgets();
      expect(widgets).toHaveProperty('ListWidget', undefined);
      expect(widgets).toHaveProperty('CarouselWidget', undefined);
    });
  });

  describe('attachAdType test', () => {
    it('should attach ad type options to widget settings', () => {
      const widgetDefinition = widgetSettings[widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS];
      const widgetDefinitionAttached = attachAdType(
        widgetDefinition,
        adTypes.MID_AD_NO_FLEX
      );
      expect(widgetDefinitionAttached).toHaveProperty('settings.widgetAd', {
        isLazyLoaded: true,
        trackingValue: '2',
        hasBg: true,
        type: 'Middle Ad No Flex',
      });
    });
    it('should return same widget settings if not have valid ad type', () => {
      const widgetDefinition = widgetSettings[widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS];
      const widgetDefinitionNotAttached = attachAdType(
        widgetDefinition,
      );
      expect(widgetDefinitionNotAttached).toBe(widgetDefinition);
      expect(widgetDefinitionNotAttached).not.toHaveProperty('settings.widgetAd');
    });
    it('should return same value if not a valid widget settings', () => {
      const widgetDefinitionWrong = widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS;
      const widgetDefinitionNotAttached = attachAdType(
        widgetDefinitionWrong,
        adTypes.MID_AD_NO_FLEX
      );
      expect(widgetDefinitionWrong).toBe(widgetDefinitionWrong);
      expect(widgetDefinitionNotAttached).not.toHaveProperty('settings.widgetAd');
    });
  });
});
