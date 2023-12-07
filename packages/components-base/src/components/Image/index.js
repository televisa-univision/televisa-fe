import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '@univision/fe-commons/dist/assets/images/default-content-image.png';
import { exists } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Wrapper for html image tags where logic can be applied on a global
 * scale (e.g. fallback image)
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const Image = ({
  className, src, alt, onError, onLoad, useMap, width, height,
}) => {
  const classNames = className || '';

  let image = src;
  if (!exists(image)) {
    image = defaultImage;
  }

  return (
    <img
      src={image}
      alt={alt}
      className={classNames}
      onError={onError}
      onLoad={onLoad}
      useMap={useMap}
      width={width}
      height={height}
    />
  );
};

/**
 * propTypes
 * @property {string} className     custom classes to be applied to the image
 * @property {string} alt           the image's 'alt' property
 * @property {function} onError     function to be called if the image cannot be loaded
 * @property {function} onLoad      function to be called when the image loads
 * @property {function} src         image/svg path or svg object
 */
Image.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object, // to svg's
  ]),
  useMap: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

/**
 * Default Prop Values
 */
Image.defaultProps = {};

export default Image;
