import setPageData from '../../../../store/actions/page-actions';
import { setCurrentSlideshow } from '../../../../store/actions/slideshow/horizontal-slideshow-actions';
import Store from '../../../../store/store';
import Feature from '../../../../config/features';
import Tracker from '../Tracker';

import gtmManager from '../../googleTagManager/gtmManager';
import SlideshowTracker from './SlideshowTracker';

let events;
const data = {
  page: {
    uid: 'uid',
    type: 'slideshow',
  },
};

beforeEach(() => {
  events = [];
  spyOn(gtmManager, 'triggerEvent').and.callFake((event) => {
    events.push(event);
  });
});

describe('SlideshowTracker', () => {
  it('trackStart', () => {
    SlideshowTracker.track(SlideshowTracker.events.start, data);
    expect(events[0].event).toBe('slide advance start');
  });

  it('trackStart - auto', () => {
    Store.dispatch(setPageData({ requestParams: { auto: true } }));
    SlideshowTracker.track(SlideshowTracker.events.start, data);
    expect(events[0].event).toBe('slide advance start');
    expect(events[0].play_type).toBe('auto');
  });

  it('trackStart - related', () => {
    Store.dispatch(setPageData({ requestParams: { related: true } }));
    SlideshowTracker.track(SlideshowTracker.events.start, data);
    expect(events[0].event).toBe('slide advance start');
    expect(events[0].play_type).toBe('related');
  });

  it('trackHalfway', () => {
    SlideshowTracker.track(SlideshowTracker.events.halfway, data);
    expect(events[0].event).toBe('slideshow_50_percent');
  });

  it('trackHalfway - swipe', () => {
    SlideshowTracker.track(SlideshowTracker.events.halfway, { ...data, interaction: 'swipe' });
    expect(events[0].event).toBe('slideshow_50_percent');
    expect(events[0].slideshow_interact).toBe('swipe');
  });

  it('trackSlideChange', () => {
    SlideshowTracker.track(SlideshowTracker.events.change, data);
    expect(events[0].event).toBe('slide_advance');
  });

  it('trackSlideChange with video', () => {
    const mockedData = { ...data, type: 'video' };
    SlideshowTracker.track(SlideshowTracker.events.change, mockedData);
    expect(events[0].event).toBe('slide_advance_video');
  });

  it('trackEndCard', () => {
    SlideshowTracker.track(SlideshowTracker.events.endCard, data);
    expect(events[0].event).toBe('slide advance end');
    expect(events[0].slideshow_image_id).toBe('End Card');
  });

  it('trackEndCard - arrow', () => {
    SlideshowTracker.track(SlideshowTracker.events.endCard, { ...data, interaction: 'arrow' });
    expect(events[0].event).toBe('slide advance end');
    expect(events[0].slideshow_interact).toBe('arrow');
    expect(events[0].slideshow_image_id).toBe('End Card');
  });

  it('trackAdCard', () => {
    SlideshowTracker.track(SlideshowTracker.events.adCard, data);
    expect(events[0].event).toBe('slide advance');
    expect(events[0].slideshow_image_id).toBe('AD Card');
  });

  it('trackAdCard - arrow', () => {
    SlideshowTracker.track(SlideshowTracker.events.adCard, { ...data, interaction: 'arrow' });
    expect(events[0].event).toBe('slide advance');
    expect(events[0].slideshow_interact).toBe('arrow');
    expect(events[0].slideshow_image_id).toBe('AD Card');
  });

  it('trackPlayButton - play', () => {
    SlideshowTracker.track(SlideshowTracker.events.playButtonClick, { ...data, isPlaying: true });
    expect(events[0].event).toBe('slideshow_engagement');
    expect(events[0].slideshow_action).toBe('slideshow_autoplay');
  });

  it('trackPlayButton - pause', () => {
    SlideshowTracker.track(SlideshowTracker.events.playButtonClick, { ...data, isPlaying: false });
    expect(events[0].event).toBe('slideshow_engagement');
    expect(events[0].slideshow_action).toBe('slideshow_pause');
  });

  it('trackRelatedGallery', () => {
    SlideshowTracker.track(SlideshowTracker.events.relatedGallery, data);
    expect(events[0].event).toBe('slideshow_engagement');
    expect(events[0].slideshow_action).toBe('slideshow_related_click');
  });

  it('trackReplayButton', () => {
    SlideshowTracker.track(SlideshowTracker.events.replay, data);
    expect(events[0].event).toBe('slideshow_engagement');
    expect(events[0].slideshow_action).toBe('slideshow_replay');
  });

  it('buildEvent - with optional params including image fallback', () => {
    SlideshowTracker.track(SlideshowTracker.events.start, {
      ...data,
      isInline: true,
      vertical: true,
      activeSlide: {
        content: null,
        image: {
          type: 'image',
          uid: 'foo',
        },
      },
      activeSlideNumber: 5,
      primaryTag: {
        name: 'bar',
      },
      slidesLength: 10,
      contentSpecificTracking: {
        slideshow_type: 'vertical_slideshow',
        slide_count: 10,
      },
    });

    expect(events[0].slideshow_type).toBe('vertical_slideshow');
    expect(events[0].slide_count).toBe(10);
    expect(events[0].slideshow_image_id).toBe('foo');
    expect(events[0].slideshow_video_id).not.toBeDefined();
    expect(events[0].slideshow_image_position).toBe(5);
  });

  it('buildEvent - with optional params including content type video', () => {
    SlideshowTracker.track(SlideshowTracker.events.start, {
      ...data,
      isInline: true,
      vertical: true,
      activeSlide: {
        content: {
          type: 'video',
          mcpid: 'foo',
        },
      },
      activeSlideNumber: 5,
      primaryTag: {
        name: 'bar',
      },
      slidesLength: 10,
      contentSpecificTracking: {
        slideshow_type: 'vertical_slideshow',
        slide_count: 10,
      },
    });

    expect(events[0].slideshow_type).toBe('vertical_slideshow');
    expect(events[0].slide_count).toBe(10);
    expect(events[0].slideshow_image_id).not.toBeDefined();
    expect(events[0].slideshow_video_id).toBe('foo');
    expect(events[0].slideshow_image_position).toBe(5);
  });

  it('buildEvent - with optional params including content type image', () => {
    SlideshowTracker.track(SlideshowTracker.events.start, {
      ...data,
      isInline: true,
      vertical: true,
      activeSlide: {
        content: {
          type: 'image',
          uid: 'foo',
        },
      },
      activeSlideNumber: 5,
      primaryTag: {
        name: 'bar',
      },
      slidesLength: 10,
      contentSpecificTracking: {
        slideshow_type: 'vertical_slideshow',
        slide_count: 10,
      },
    });

    expect(events[0].slideshow_type).toBe('vertical_slideshow');
    expect(events[0].slide_count).toBe(10);
    expect(events[0].slideshow_image_id).toBe('foo');
    expect(events[0].slideshow_video_id).not.toBeDefined();
    expect(events[0].slideshow_image_position).toBe(5);
  });

  it('sets slide_count for reaction slideshows', () => {
    Store.dispatch(setPageData({ data: { type: 'reactionslideshow' } }));
    SlideshowTracker.track(SlideshowTracker.events.start, { ...data, slidesLength: 999 });
    expect(events[0].slide_count).toBe(999);
  });

  it('sets slideshow_depth if horizontal slideshow stitching is enabled', () => {
    Store.dispatch(setCurrentSlideshow(3));

    jest.spyOn(Feature.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    SlideshowTracker.track(SlideshowTracker.events.start, { ...data });
    expect(events[0].slideshow_depth).toBe(4);
  });

  it('sets slideshow_depth if slideshowDepth is passed in the data object', () => {
    SlideshowTracker.track(SlideshowTracker.events.start, { slideshowDepth: 5 });
    expect(events[0].slideshow_depth).toBe(5);
  });

  it('calls Tracker.PageView when trackSlideshowPageView is called', () => {
    const pageViewSpy = jest.spyOn(Tracker, 'pageView').mockImplementation(() => {});

    SlideshowTracker.track(SlideshowTracker.events.slideshowPageView, {
      title: 'my title',
      uid: '123456',
      contentSpecificTracking: {
        slideshow_id: '123456',
        slideshow_title: 'my title',
        slideshow_type: 'horizontal_slideshow',
      },
    });

    expect(pageViewSpy).toHaveBeenCalledWith({
      event: 'view_slideshow',
      slideshow_depth: 4,
      slideshow_id: '123456',
      slideshow_title: 'my title',
      slideshow_type: 'horizontal_slideshow',
      slide_adv_cm: '0',
      slide_st_cm: '0',
    });
  });

  it('should take the content specific tracking from the store', () => {
    Store.dispatch(setPageData({
      data: {
        type: 'slideshow',
        analyticsData: {
          web: {
            contentSpecific: {
              slideshow_type: 'horizontal_slideshow',
              slide_count: 10,
            },
          },
        },
      },
    }));
    SlideshowTracker.track(SlideshowTracker.events.start, {
      ...data,
    });

    expect(events[0].slideshow_type).toBe('horizontal_slideshow');
    expect(events[0].slide_count).toBe(10);
  });
});
