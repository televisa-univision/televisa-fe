import { getKey, isValidString, isValidArray } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Gets the author from pageData for for Ask Expert
 * @param {Object} pageData Store's page data
 * @returns {Object}
 */
const getAskExpertAuthor = (pageData) => {
  const authors = getKey(pageData, 'data.authors');

  if (isValidArray(authors)) return authors[0];

  return {};
};

/**
 * Gets the phone number for Ask Expert
 * @param {Object} pageData Store's page data
 * @returns {string|null}
 */
const getAskExpertPhoneNumber = (pageData) => {
  const askExpertDataPhoneNumber = getKey(pageData, 'data.askExpertData.phoneNumber');

  if (askExpertDataPhoneNumber) return askExpertDataPhoneNumber;

  const { phoneNumber } = getAskExpertAuthor(pageData);

  if (isValidString(phoneNumber)) return phoneNumber;

  return null;
};

/**
 * Gets the website for Ask Expert
 * @param {Object} pageData Store's page data
 * @returns {string|null}
 */
const getAskExpertWebsite = (pageData) => {
  const askExpertDataWebsite = getKey(pageData, 'data.askExpertData.website');

  if (askExpertDataWebsite) return askExpertDataWebsite;

  const { website } = getAskExpertAuthor(pageData);

  if (isValidString(website)) return website;

  return null;
};

/**
 * Gets the data for Ask Expert Company Bio
 * @param {Object} pageData Store's page data
 * @returns {Object}
 */
const getAskExpertCompanyBioInfo = (pageData) => {
  const {
    address,
    description,
    image,
    fullName,
  } = getAskExpertAuthor(pageData);

  return {
    address: isValidString(address) ? address : null,
    description: isValidString(description) ? description : null,
    image: isValidString(image) ? image : null,
    name: isValidString(fullName) ? fullName : null,
    phone: getAskExpertPhoneNumber(pageData),
    website: getAskExpertWebsite(pageData),
  };
};

const AskExpertHelpers = {
  getAskExpertPhoneNumber,
  getAskExpertCompanyBioInfo,
};

export default AskExpertHelpers;
