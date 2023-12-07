import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

/**
 * Gets the content meta options depending on the content type
 * @param {string} durationString - video duration string
 * @param {string} readTime - article read time
 * @param {string} slideCount - slideshow number of slides
 * @param {string} type - content type
 * @returns {Object}
 */
function getMetaOptions({
  durationString,
  readTime,
  slideCount,
  type,
}) {
  if (type === contentTypes.ARTICLE) {
    return {
      icon: {
        name: 'articleCta',
        size: [12, 12],
      },
      content: readTime
        ? localization.get('readTime', { locals: { readTime } })
        : null,
    };
  }

  if (type === contentTypes.SLIDESHOW && slideCount) {
    return {
      icon: {
        name: 'slideshow',
        size: [12, 12],
      },
      content: `${slideCount} ${localization.get('contents')}`,
    };
  }

  if (type === contentTypes.VIDEO && durationString) {
    return {
      icon: {
        name: 'playnocircle',
        size: [10, 10],
      },
      content: durationString,
    };
  }

  return {};
}

export default getMetaOptions;
