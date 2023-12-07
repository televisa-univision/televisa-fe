import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';

import contentTypes from '../../../../../constants/contentTypes.json';
import { SECTION_SUBNAV, CONTENT_SUBNAV } from '../../../../../constants/subNavTypes';
import genericTudnData from '../generic';
import getTeamsLinks from '../links/team';

const subNavTypes = {
  [contentTypes.SECTION]: SECTION_SUBNAV,
  [contentTypes.SOCCER_TEAM]: SECTION_SUBNAV,
  default: CONTENT_SUBNAV,
};

/**
 * Get teams header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default function getTeamsData(data = {}) {
  const defaultNav = genericTudnData(data);
  const links = getTeamsLinks(data);

  return {
    ...defaultNav,
    links,
    subNavType: getFromMap(data.type, subNavTypes),
  };
}
