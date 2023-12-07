import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';

const CLICK_TRACK = ArticleTracker.events.enhancementClick;

/**
 * Tracks Enhancement Clicks
 * @param {Object} item current item to get type
 * @param {Object} data extra object data
 * @returns {Function}
 */
const trackEnhancementClick = (item, data) => () => {
  const { objectData = {} } = item;
  const { type } = objectData;
  const shouldTrack = type === 'image' || type === 'article';
  if (shouldTrack) {
    const { uid, title, primaryTag } = data;
    ArticleTracker.track(CLICK_TRACK, {
      enhancementType: type,
      uid,
      title,
      primaryTag,
    });
  }
};

export default trackEnhancementClick;
