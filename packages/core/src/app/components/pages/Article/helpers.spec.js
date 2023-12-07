import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import { trackNewArticle } from './helpers';

describe('Article helpers', () => {
  describe('trackNewArticle', () => {
    it('fires the correct tracking event with proper tracking data', () => {
      const trackSpy = jest.spyOn(ArticleTracker, 'track');
      const trackingData = { exampleTrackingDataProp: 'tracking', depth: 1 };

      trackNewArticle(trackingData);

      expect(trackSpy).toHaveBeenCalledWith(
        ArticleTracker.events.newArticle,
        trackingData,
      );
    });
  });
});
