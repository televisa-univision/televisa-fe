import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';

/**
 * Fires an article tracking event
 * @param {Object} articleData the article event data
 */
// eslint-disable-next-line
export const trackNewArticle = (articleData) => {
  ArticleTracker.track(ArticleTracker.events.newArticle, articleData);
};
