import gtmManager from '../../googleTagManager/gtmManager';
import Store from '../../../../store/store';
import VideoTracker from './VideoTracker';

describe('VideoTracker', () => {
  const dataLayer = gtmManager.getDataLayer();
  it('should handle the anchorVideoClose event when expanded', () => {
    VideoTracker.track(VideoTracker.events.anchorVideoClose, {});
    expect(dataLayer[dataLayer.length - 1].event).toBe('video_click_anchor_close');
  });

  it('should handle the anchorVideoClose event when collapsed', () => {
    VideoTracker.track(VideoTracker.events.anchorVideoClose, {});
    expect(dataLayer[dataLayer.length - 1].event).toBe('video_click_anchor_close');
  });

  it('should handle the anchorVideoCollapse event', () => {
    VideoTracker.track(VideoTracker.events.anchorVideoCollapse);
    expect(dataLayer[dataLayer.length - 1].event).toBe('video_click_anchor_collapse');
  });

  it('should handle the anchorVideoExpand event', () => {
    VideoTracker.track(VideoTracker.events.anchorVideoExpand);
    expect(dataLayer[dataLayer.length - 1].event).toBe('video_click_anchor_expand');
  });

  it('should handle the playlistItemClick event', () => {
    VideoTracker.track(VideoTracker.events.playlistItemClick);
    expect(dataLayer[dataLayer.length - 1].event).toBe('related video');
  });

  it('should ignore unknown events', () => {
    const { length } = dataLayer;
    VideoTracker.track('random event');
    expect(dataLayer.length).toBe(length);
  });

  it('should handle the trackClickOnVideoWidgets event', () => {
    VideoTracker.track(VideoTracker.events.trackClickOnVideoWidgets);
    expect(dataLayer[dataLayer.length - 1].event).toBe('');
  });

  it('should handle the video PiP events', () => {
    VideoTracker.track(VideoTracker.events.pipSearchPlaceholder, { triger: 'autoPlay' });
    expect(dataLayer[dataLayer.length - 1].event).toBe('video_load_0_search_placeholder');
  });

  it('should clean the events if store change the placeholderId', () => {
    const state = Store.getState;
    Store.getState = jest.fn(() => ({ videoPip: { placeholderId: '1234' } }));
    const data = { event_meta: '12345' };
    VideoTracker.track(VideoTracker.events.pipSearchPlaceholder, data);
    expect(VideoTracker.eventIds).toHaveLength(1);
    Store.getState = state;
  });

  it('should not register the same event if already have it', () => {
    const state = Store.getState;
    Store.getState = jest.fn(() => ({ videoPip: { placeholderId: '12345' } }));
    const data = { event_meta: '12345' };
    expect(VideoTracker.eventIds).toHaveLength(1);
    VideoTracker.track(VideoTracker.events.pipSearchPlaceholder, data);
    expect(VideoTracker.eventIds).toHaveLength(1);
    Store.getState = state;
  });

  it('should register one videoId when playlist', () => {
    const state = Store.getState;
    Store.getState = jest.fn(() => ({ videoPip: { placeholderId: '12345' } }));
    const data = {
      event_meta: '1234',
      video_id: [{ mcpId: '123' }],
    };
    VideoTracker.track(VideoTracker.events.pipSearchPlaceholder, data);
    expect(dataLayer[dataLayer.length - 1].video_id).toBe('123');
    Store.getState = state;
  });
});
