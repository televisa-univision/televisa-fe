import gtmManager from '../../googleTagManager/gtmManager';
import Tracker from '../Tracker';
import SocialTracker from './SocialTracker';

describe('SocialTracker', () => {
  const dataLayer = gtmManager.getDataLayer();
  const shareData = {
    name: 'facebook',
    uid: '123-456-789',
    title: 'Test',
    type: 'article',
  };
  const utagData = {
    event: 'social_share',
    event_action: 'facebook',
    share_content_id: '123-456-789',
    share_content_title: 'test',
    share_content_type: 'article',
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should handle the "share" event', () => {
    SocialTracker.track(SocialTracker.events.share, { name: 'facebook', uid: '123-456-789' });
    expect(dataLayer[dataLayer.length - 1].event).toBe('social_share');
  });

  it('should not track event if both social network and uid are not provided', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SocialTracker.track(SocialTracker.events.share);
    expect(fireEventSpy).not.toHaveBeenCalled();
  });

  it('should not track event if no social network is provided', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SocialTracker.track(SocialTracker.events.share, { uid: '123-456-789' });
    expect(fireEventSpy).not.toHaveBeenCalled();
  });

  it('should not track event if no uid is provided', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SocialTracker.track(SocialTracker.events.share, { name: 'facebook' });
    expect(fireEventSpy).not.toHaveBeenCalled();
  });

  it('should execute callback if provided after firing event', () => {
    const callback = jest.fn();
    SocialTracker.track(
      SocialTracker.events.share,
      { name: 'facebook', uid: '123-456-789' },
      callback
    );

    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should track share button event on click', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    SocialTracker.track(SocialTracker.events.share, shareData);
    expect(fireEventSpy).toHaveBeenLastCalledWith(utagData);
  });
});
