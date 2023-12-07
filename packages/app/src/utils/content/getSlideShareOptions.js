import {
  cloneDeep,
  hasKey,
} from '@univision/fe-commons/dist/utils/helpers';

/**
 * Get the values to share
 * @param {Object} sharingOptions social media options
 * @param {Object} slideData data
 * @returns {Object} new sharing values
 */
function getSlideShareOptions (sharingOptions, slideData = {}) {
  // Deep clone of original object
  const clonedObject = cloneDeep(sharingOptions);
  const {
    facebook = {},
    twitter = {},
    whatsapp = {},
    mail = {},
  } = clonedObject;
  // Replace urls
  if (slideData.shortUrl) {
    const { shortUrl } = slideData;
    // Update mail body
    if (hasKey(mail, 'body')) {
      mail.body = mail.body.replace(shortUrl.split('#')[0], shortUrl);
    }
    // Update social media urls
    facebook.redirectUrl = shortUrl;
    facebook.url = shortUrl;
    twitter.url = shortUrl;
    whatsapp.url = shortUrl;
  }
  return clonedObject;
}

export default getSlideShareOptions;
