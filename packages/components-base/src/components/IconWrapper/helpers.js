/**
 * Icons helpers
 * @type {{getContentIconClass: IconHelpers.getContentIconClass}}
 */
const IconHelpers = {
  /**
   * Maps a contentType with it's corresponding icon class
   * @param {string} contentType Content type for which we want to get an icon class
   * @param {string} subType Article type
   * @returns {Object} icon class to use for this promo
   */
  getContentClass: (contentType, subType) => {
    switch (contentType) {
      case 'reactionslideshow':
      case 'slideshow':
        return 'slideshow';
      case 'article':
        return subType === 'recipe' ? subType : 'article';
      default:
        return null;
    }
  },
};

export default IconHelpers;
