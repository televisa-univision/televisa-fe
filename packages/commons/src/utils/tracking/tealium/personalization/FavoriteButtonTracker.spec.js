import FavoriteButtonTracker from './FavoriteButtonTracker';
import Tracker from '../Tracker';

describe('FavoriteButtonTracker', () => {
  let fireEventSpy;

  beforeEach(() => {
    fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle the favorite remove event', () => {
    FavoriteButtonTracker.track(
      FavoriteButtonTracker.events.click,
      {
        personalizationType: 'test',
        id: 'test',
      }
    );
    expect(fireEventSpy).toHaveBeenCalledWith(expect.objectContaining({
      event: 'favorite_remove',
      object_content_id: 'test',
      personalization_category: 'generic',
    }));
  });

  it('should handle the favorite add event', () => {
    FavoriteButtonTracker.track(
      FavoriteButtonTracker.events.click,
      {
        personalizationType: 'test',
        id: 'test',
        favorited: true,
      }
    );
    expect(fireEventSpy).toHaveBeenCalledWith(expect.objectContaining({
      event: 'favorite_add',
      object_content_id: 'test',
      personalization_category: 'generic',
    }));
  });
});
