/* eslint-disable import/prefer-default-export */
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';

/**
 * Fires an article tracking event
 * @param {Object} articleData the article event data
 */
export const trackNewArticle = (articleData) => {
  ArticleTracker.track(ArticleTracker.events.newArticle, articleData);
};
