/**
 * call encodeURIComponent on string if it is not falsey
 * @param   {string} text the string to encode
 * @returns {string}        the encoded string
 */
function encodeData(text) {
  if (!text) return '';
  return encodeURIComponent(text);
}

const shareProps = {
  facebook: (data) => {
    if (data?.isFeedDialog) {
      return {
        href:
          'https://www.facebook.com/dialog/feed?'
          + `app_id=${data.appId}`
          + '&display=popup'
          + `&link=${encodeData(data.url)}`
          + `&picture=${encodeData(data.imageUrl)}`
          + `&name=${encodeData(data.title)}`
          + `&description=${encodeData(data.description)}`,
        target: '_blank',
      };
    }
    return {
      href: `https://www.facebook.com/sharer/sharer.php?u=${data.url}`,
      target: '_blank',
    };
  },
  twitter: ({ title, url, via }) => ({
    href:
      'https://twitter.com/intent/tweet'
      + `?text=${encodeData(title)}`
      + `&url=${encodeData(url)}`
      + `&via=${via}`,
    target: '_blank',
  }),
  whatsapp: ({ message }) => {
    return {
      href:
        'https://api.whatsapp.com/send'
        + `?text=${encodeData(message)}`,
      dataActionAttr: 'share/whatsapp/share',
      target: '_blank',
    };
  },
  mail: ({ subject, body }) => ({
    href: `mailto:?to=&subject=${encodeData(subject)}&body=${encodeData(body)}`,
    target: '_blank',
  }),
};

/**
 * Get the necessary props for sharing
 * @param {string} name The name of the social network to access from the data
 * @param {Object} sharingOptions Object containing the data to use for sharing,
 *                 will fallback to the web-api data.
 * @returns {Object}
 */
function shareButtonDataHelper(name, sharingOptions) {
  if (!name || !sharingOptions?.[name]) {
    return null;
  }

  const options = {
    ...sharingOptions[name],
  };

  return shareProps[name](options);
}

export default shareButtonDataHelper;
