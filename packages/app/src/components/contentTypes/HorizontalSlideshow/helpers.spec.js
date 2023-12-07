import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import { handleShareBarClick } from './helpers';

describe('SlideshowHelpers', () => {
  describe('handleShareBarClick', () => {
    let name;
    let props;

    beforeEach(() => {
      name = 'facebook';
      props = {
        shareData: { type: 'slideshow' },
        actions: { onShareClick: jest.fn() },
        reaction: null,
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call SocialTracker.track with the correct arguments', () => {
      const trackSpy = jest.spyOn(SocialTracker, 'track');

      handleShareBarClick(name, props);

      expect(trackSpy).toHaveBeenCalledWith(SocialTracker.events.share, {
        name,
        ...props.shareData,
      });
    });

    it('should call SocialTracker.track with reaction type if present', () => {
      const trackSpy = jest.spyOn(SocialTracker, 'track');
      props.reaction = { isReaction: true }; // just a mock object, not actual reaction shape

      handleShareBarClick(name, props);

      expect(trackSpy).toHaveBeenCalledWith(SocialTracker.events.share, {
        name,
        ...props.shareData,
        type: 'slideshow',
      });
    });

    it('should call onShareClick action if present', () => {
      handleShareBarClick(name, props);

      expect(props.actions.onShareClick).toHaveBeenCalledTimes(1);
    });

    it('should default arguments if not present', () => {
      const trackSpy = jest.spyOn(SocialTracker, 'track');
      handleShareBarClick();

      expect(trackSpy).toHaveBeenCalledWith(SocialTracker.events.share, {
        name: '',
        type: undefined,
      });
    });
  });
});
