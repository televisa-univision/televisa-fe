import PropTypes from 'prop-types';
import React from 'react';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Renders metadata for a slide
 * @param {Object} slide slide object
 * @param {number} index current slide index
 * @returns {JSX}
 */
function renderSlideMetadata(slide, index) {
  const image = getKey(slide, 'content.image', slide.content) || slide.image;

  return (
    <div key={`metadata-${slide.uid}-${index}`} itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
      <meta itemProp="name" content={image?.title} />
      <meta itemProp="caption" content={slide.caption} />
      <meta itemProp="citation" content={image?.credit} />
      <meta itemProp="position" content={index + 1} />
      <meta itemProp="contentUrl" content={getKey(image, 'renditions.original.href', '')} />
    </div>
  );
}

/**
 * Container component representing a Slideshow metadata
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const SlideshowMetadata = (props) => {
  const { page } = props;

  return (
    <div itemScope itemType="http://schema.org/ImageGallery">
      <meta itemProp="name" content={page.shortTitle} />
      <meta itemProp="url" content={page.uri} />
      {Array.isArray(page.slides) && page.slides.map(renderSlideMetadata)}
    </div>
  );
};

/**
 * propTypes
 * @property {Array} widgets - React widgets to be rendered in the page
 */
SlideshowMetadata.propTypes = {
  page: PropTypes.object,
};

export default SlideshowMetadata;
