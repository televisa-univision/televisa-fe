import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import { trackMainLogoClick } from './helpers';

describe('BrandedHeader helpers', () => {
  describe('trackMainLogoClick', () => {
    it('should track logo click event', () => {
      const trackerSpy = jest.spyOn(NavigationTracker, 'track');

      trackMainLogoClick('tudn');

      expect(trackerSpy).toHaveBeenCalledWith(
        NavigationTracker.events.click,
        expect.objectContaining({
          eventAction: 'topnav-logo-tudn',
        })
      );
    });
  });
});
