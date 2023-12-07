import Store from '../../../../store/store';
import {
  getCurrentHorizontalSlideshowIndex,
  getRequestParams,
  getContentType,
  getContentSpecificTracking,
} from '../../../../store/storeHelpers';
import { isValidValue } from '../../../helpers';
import Tracker from '../Tracker';
import Feature from '../../../../config/features';
import contentTypes from '../../../../constants/contentTypes.json';

/**
 * Tracks slideshow events
 */
class SlideshowTracker extends Tracker {
  /**
   * Sets the events for this tracker
   */
  constructor() {
    super({
      start: SlideshowTracker.trackStart,
      endCard: SlideshowTracker.trackEndCard,
      adCard: SlideshowTracker.trackAdCard,
      halfway: SlideshowTracker.trackHalfway,
      change: SlideshowTracker.trackSlideChange,
      replay: SlideshowTracker.trackReplayButton,
      relatedGallery: SlideshowTracker.trackRelatedGallery,
      playButtonClick: SlideshowTracker.trackPlayButton,
      slideshowPageView: SlideshowTracker.trackSlideshowPageView,
    });
  }

  /**
   * Returns the base data for slideshow tracking
   * @param {string} eventName GA event
   * @param {number} uid Slideshow ID
   * @param {boolean} isVertical true if the slideshow is vertical
   * @param {string} title Slideshow title
   * @param {Object} primaryTag Slideshow primary tag
   * @param {number} slidesLength How many slides
   * @param {Object} activeSlide Current slide
   * @param {number} activeSlideNumber Number of the current slide, starting in 1
   * @returns {Object}
   */
  static buildEventData(eventName, {
    activeSlide,
    activeSlideNumber,
    contentSpecificTracking,
    overrides = {},
    shouldTrackImagePosition = true,
    slideshowDepth,
    slidesLength,
    vertical: isVertical,
  }) {
    let actualContentSpecificTracking = contentSpecificTracking || {};
    if (!contentSpecificTracking && getContentType(Store) === contentTypes.SLIDESHOW) {
      actualContentSpecificTracking = getContentSpecificTracking(Store);
    }
    const eventData = {
      event: eventName,
      slide_st_cm: '0',
      slide_adv_cm: '0',
      ...actualContentSpecificTracking,
      ...overrides,
    };

    if (slidesLength) {
      eventData.slide_count = slidesLength;
    }

    const content = activeSlide?.content || activeSlide?.image;

    if (content?.type === 'image') {
      eventData.slideshow_image_id = content.uid;
    }

    if (content?.type === 'video') {
      eventData.slideshow_video_id = content.mcpid;
    }

    if (shouldTrackImagePosition && isValidValue(activeSlideNumber)) {
      eventData.slideshow_image_position = activeSlideNumber;
    }

    if (!isVertical && Feature.slideshows.horizontal.stitchingEnabled()) {
      eventData.slideshow_depth = getCurrentHorizontalSlideshowIndex(Store) + 1;
    }

    if (isValidValue(slideshowDepth)) {
      eventData.slideshow_depth = slideshowDepth;
    }

    return eventData;
  }

  /**
   * Tracks the start of the Slideshow.
   * @param {Object} data Context data
   */
  static trackStart(data) {
    const requestParams = getRequestParams(Store);
    const eventData = {
      ...SlideshowTracker.buildEventData('slide advance start', data),
      slide_st_cm: '1',
      slide_adv_cm: '1',
    };

    if ('auto' in requestParams && requestParams.auto !== 'false') {
      eventData.play_type = 'auto';
    }

    if ('related' in requestParams && requestParams.auto !== 'false') {
      eventData.play_type = 'related';
    }

    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks each time the slide is changed.
   * @param {Object} data Context data
   */
  static trackSlideChange(data) {
    const eventName = data.type === 'video' ? 'slide_advance_video' : 'slide_advance';

    const eventData = {
      ...SlideshowTracker.buildEventData(eventName, data),
    };

    delete eventData.slide_st_cm;
    delete eventData.slide_adv_cm;
    delete eventData.slideshow_image_id;

    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks when an user reaches the 50% of the slideshow
   * @param {Object} data Context data
   */
  static trackHalfway(data) {
    const eventData = {
      ...SlideshowTracker.buildEventData('slideshow_50_percent', data),
      slideshow_interact: data.interaction || 'autoplay',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks the end card of the Slideshow.
   * @param {Object} data Context data
   */
  static trackEndCard(data) {
    const eventData = {
      ...SlideshowTracker.buildEventData('slide advance end', data),
      slideshow_interact: data.interaction || 'autoplay',
      slide_end_cm: '1',
      slideshow_image_position: '0',
      slideshow_image_id: 'End Card',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks an advertisement in the slideshow
   * @param {Object} data Context data
   */
  static trackAdCard(data) {
    const eventData = {
      ...SlideshowTracker.buildEventData('slide advance', data),
      slideshow_interact: data.interaction || 'autoplay',
      slide_adv_cm: '1',
      slideshow_image_id: 'AD Card',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks interactions with the play/pause button.
   * @param {Object} data Context data
   */
  static trackPlayButton(data) {
    const eventData = {
      ...SlideshowTracker.buildEventData('slideshow_engagement', data),
      slideshow_action: data.isPlaying ? 'slideshow_autoplay' : 'slideshow_pause',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks interactions with the replay button.
   * @param {Object} data Context data
   */
  static trackReplayButton(data) {
    const eventData = {
      ...SlideshowTracker.buildEventData('slideshow_engagement', data),
      slideshow_action: 'slideshow_replay',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks click on related gallery
   * @param {Object} data Context data
   */
  static trackRelatedGallery(data) {
    const eventData = {
      ...SlideshowTracker.buildEventData('slideshow_engagement', data),
      slideshow_action: 'slideshow_related_click',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks a virtual page view for when horizontal slideshows are stitched together
   * @param {Object} data Context data
   */
  static trackSlideshowPageView(data) {
    Tracker.pageView(SlideshowTracker.buildEventData('view_slideshow', data));
  }
}

export default new SlideshowTracker();
