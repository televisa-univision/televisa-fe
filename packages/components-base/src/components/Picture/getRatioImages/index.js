import { getKey, isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import Store from '@univision/fe-commons/dist/store/store';
import { getConfig } from '@univision/fe-commons/dist/store/storeHelpers';

import aspectRatiosSizes from '../aspectRatios';
import * as sizes from '../imageSizes';

/**
 * extract all of the appropriate sizes based on the given ratio
 * @param   {Object} [renditions={}] the image renditions
 * @param   {Object} [aspectRatio='16x9'] the aspect ratio of the image to be displayed
 * @param   {Object} [overrides={}]  size overrides for the given breakpoint
 * @param   {*} [defaultImage=null }] the image to display if the size/ratio is not in renditions
 * @returns {Object} the breakpoint/value pair of the images to be displayed
 */
export default function getRatioImages ({
  renditions = {},
  aspectRatio = '16x9',
  overrides = {},
  defaultImage = null,
  useRenditionUrl = false,
}) {
  // Creates empty images object to be used by the component
  let images = {};

  // Populates the images object with image renditions based on selected aspect ratio
  Object.keys(sizes).forEach((key) => {
    const ratio = getKey(aspectRatiosSizes, `${aspectRatio}.${sizes[key]}`, {});
    let image = renditions[getKey(ratio, 'name')];
    if (!image || useRenditionUrl) {
      // Let's try to generate the rendition
      const {
        width: ratioWidth,
        height: ratioHeight,
      } = ratio;

      const original = getKey(renditions, 'original', {});

      if (getConfig(Store, 'dims.baseUrl') && ratioWidth > 0 && ratioHeight > 0 && original.href && original.href.indexOf('/dims4/default/') < 0) {
        image = {
          href: getRenditionUrl(original, ratio),
        };
      } else {
        // Fallback to original
        image = renditions.original;
      }
    }
    images[sizes[key]] = image ? image.href : defaultImage;
  });

  if (isValidObject(overrides)) {
    const overrideImages = Object.assign({}, images);

    // Processes size overrides per size passed as props
    Object.keys(overrides).forEach((size) => {
      overrideImages[size] = images[overrides[size]];
    });
    images = overrideImages;
  }

  return images;
}
