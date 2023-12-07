import getKey from '@univision/fe-utilities/helpers/object/getKey';

import getRenditionUrl from '../../../images/renditions';
import radioRatios from '../../../images/ratios/radio';

/**
 * Get custom image tags for radio
 * @returns {Object}
 */
const radioTags = {
  custom(pageState) {
    const image = getKey(pageState, 'data.radioStation.image.renditions.original', {});
    const crop = getRenditionUrl(image, radioRatios['1:1']);
    return {
      'og:image': crop,
      'twitter:image': crop,
    };
  },
};

export default radioTags;
