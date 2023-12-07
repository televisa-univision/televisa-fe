import types from '@univision/fe-commons/dist/constants/labelTypes';

/**
* CMS possible values
* @returns {string} formatted Time.
*/
const CMS_STORYTELLING = 'DESTACADO';
const CMS_BREAKING_NEWS = 'ÚLTIMA HORA';
const CMS_LIVE = 'EN VIVO';

/**
 * Get the right type depending in the CMS cardValue.
 * @param {string} cmsValue value of the date coming from the CMS
 * @returns {string} type
 */
export const getType = (cmsValue) => {
  switch (cmsValue) {
    case CMS_STORYTELLING:
      return types.STORYTELLING;
    case CMS_BREAKING_NEWS:
      return types.BREAKING_NEWS;
    case CMS_LIVE:
      return types.LIVE;
    default:
      return '';
  }
};

export default getType;
