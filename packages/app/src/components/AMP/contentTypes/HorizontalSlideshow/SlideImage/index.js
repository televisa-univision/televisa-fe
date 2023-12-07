import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import aspectRatios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';

import VerticalImageWrapper from './SlideImage.styles';

/**
 * Renders an amp-image to be used on amp-carousels
 * @param {Object} image for the slide
 * @param {string} renditionName Rendition to use for rendering the amp-image
 * @returns {XML}
 * @constructor
 */
const AmpSlideImage = ({ image, type }) => {
  const src = getRenditionUrl(getKey(image, 'renditions.original', {}), getKey(aspectRatios, `${type}-slideshow.sm`, {}));
  if (!src) {
    return null;
  }
  const isPortraitImage = image.renditions.original.width < image.renditions.original.height;
  const Wrapper = isPortraitImage ? VerticalImageWrapper : Fragment;
  return (
    <Wrapper>
      <amp-img
        src={src}
        layout={!isPortraitImage ? 'responsive' : 'fixed'}
        width={!isPortraitImage ? 4 : 230}
        height={!isPortraitImage ? 3 : 350}
      />
    </Wrapper>
  );
};

AmpSlideImage.propTypes = {
  image: PropTypes.object,
  type: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default AmpSlideImage;
