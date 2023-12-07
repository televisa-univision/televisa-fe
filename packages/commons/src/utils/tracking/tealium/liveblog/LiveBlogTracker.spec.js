import gtmManager from '../../googleTagManager/gtmManager';
import LiveBlogTracker from './LiveBlogTracker';

let data;
beforeEach(() => {
  data = {
    title: 'Live Blog Test',
    scrollingCount: 0,
  };
});

describe('LiveBlogTracker', () => {
  const dataLayer = gtmManager.getDataLayer();
  it('ignores unknown events', () => {
    const { length } = dataLayer;
    LiveBlogTracker.track('unknown', data);
    expect(dataLayer.length).toBe(length);
  });

  it('tracks "start" events', () => {
    data.scrollingCount = 1;
    LiveBlogTracker.track(LiveBlogTracker.events.start, data);
    expect(dataLayer[dataLayer.length - 1].event).toBe('slide advance start');
  });

  it('tracks "advance" events', () => {
    data.scrollingCount = 2;
    LiveBlogTracker.track(LiveBlogTracker.events.advance, data);
    expect(dataLayer[dataLayer.length - 1].event).toBe('slide advance');
  });

  it('tracks "nextPage" events', () => {
    LiveBlogTracker.track(LiveBlogTracker.events.nextPage, data);
    expect(dataLayer[dataLayer.length - 1].event).toBe('slideshow_engagement');
    expect(dataLayer[dataLayer.length - 1].slideshow_action).toBe('pagination forward');
  });

  it('tracks "prevPage" events', () => {
    LiveBlogTracker.track(LiveBlogTracker.events.prevPage, data);
    expect(dataLayer[dataLayer.length - 1].event).toBe('slideshow_engagement');
    expect(dataLayer[dataLayer.length - 1].slideshow_action).toBe('pagination back');
  });

  it('tracks "refresh" events', () => {
    LiveBlogTracker.track(LiveBlogTracker.events.refresh, data);
    expect(dataLayer[dataLayer.length - 1].event).toBe('slideshow_engagement');
    expect(dataLayer[dataLayer.length - 1].slideshow_action).toBe('autorefresh');
  });

  it('tracks "newPage" events', () => {
    spyOn(gtmManager, 'pageView');
    LiveBlogTracker.track(LiveBlogTracker.events.newPage, data);
    expect(gtmManager.pageView).toBeCalled();
  });
});
