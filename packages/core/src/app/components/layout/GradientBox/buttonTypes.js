/**
 * Object with buttonTypes
 */
export const buttonTypes = {
  article: {
    text: 'leer más',
    icon: '',
  },
  video: {
    text: 'ver video',
    icon: 'playnocircle',
  },
  audio: {
    text: 'escuchar',
    icon: 'volume',
  },
  slideshow: {
    text: 'ver fotos',
    icon: 'slideshow',
  },
  externalcontent: {
    text: 'ver más',
    icon: '',
  },
};

/**
 * Returns the type of button
 * @param {string} type of content
 * @param {boolean} isRadio bool if the page it's a radio station
 * @returns {Object} with buttonType properties
 */
export const getType = (type = 'externalcontent', isRadio = false) => {
  switch (type) {
    case 'article':
      return buttonTypes.article;
    case 'video':
      return buttonTypes.video;
    case 'slideshow':
      return buttonTypes.slideshow;
    case 'externalcontent':
      return isRadio ? buttonTypes.audio : buttonTypes.externalcontent;
    default:
      return buttonTypes.externalcontent;
  }
};
