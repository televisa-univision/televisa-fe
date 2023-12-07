// eslint-disable-next-line import/no-cycle
import { getRequestParams, getSectionUrlPathname } from '../../store/storeHelpers';
// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import { getKey } from '../../utils/helpers';
import verticalStitchingLocations from '../data/slideshow/verticalStitchingLocations.json';

const FORCE_HORIZONTAL_STITCHING = true;
const FORCE_VERTICAL_STITCHING = true;
const HORIZONTAL_END_CARD_AUTOPLAY_PARAM = 'HsEndCardAutoplay';
const HORIZONTAL_STITCHING_PARAM = 'HSS';
const VERTICAL_STITCHING_PARAM = 'VSS';

export default {
  horizontal: {
    stitchingEnabled: () => {
      if (getKey(getRequestParams(Store), HORIZONTAL_STITCHING_PARAM) === 'false') return false;

      return (
        FORCE_HORIZONTAL_STITCHING
        || getKey(getRequestParams(Store), HORIZONTAL_STITCHING_PARAM) === 'true'
      );
    },
    endCardAutoplayEnabled: () => getKey(
      getRequestParams(Store),
      HORIZONTAL_END_CARD_AUTOPLAY_PARAM
    ) !== 'false',
    limit: 5,
  },
  vertical: {
    stitchingEnabled: () => {
      if (getKey(getRequestParams(Store), VERTICAL_STITCHING_PARAM) === 'false') return false;

      if (
        FORCE_VERTICAL_STITCHING
        || getKey(getRequestParams(Store), VERTICAL_STITCHING_PARAM) === 'true'
      ) {
        return true;
      }

      const sectionUrl = getSectionUrlPathname(Store);

      return verticalStitchingLocations.some(
        enabledLocation => sectionUrl && sectionUrl.startsWith(enabledLocation)
      );
    },
    isMultimediaSlideshow: () => (getKey(getRequestParams(Store), 'isMultimediaSlideshow', false)),
    limit: 5,
  },
};
