import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import { trackLogoContentClick } from './helpers';

describe('ExposedNav helpers', () => {
  describe('trackLogoContentClick', () => {
    it('should track logo content click event', () => {
      const trackerSpy = jest.spyOn(NavigationTracker, 'track');

      trackLogoContentClick('shows');

      expect(trackerSpy).toHaveBeenCalledWith(
        NavigationTracker.events.click,
        expect.objectContaining({
          eventAction: 'subnav-logo-shows',
        })
      );
    });
  });
});
