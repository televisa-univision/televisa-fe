import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * ripples component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const ripples = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 1024 1024"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M10.9 503.7h0.6c6 0 10.9 4.9 10.9 10.9v0c0 6-4.9 10.9-10.9 10.9h-0.6c-6 0-10.9-4.9-10.9-10.9v0c0-6 4.9-10.9 10.9-10.9z M78 503.7h0.6c6 0 10.9 4.9 10.9 10.9v0c0 6-4.9 10.9-10.9 10.9h-0.6c-6 0-10.9-4.9-10.9-10.9v0c0-6 4.9-10.9 10.9-10.9z M145.2 503.7h0.6c6 0 10.9 4.9 10.9 10.9v0c0 6-4.9 10.9-10.9 10.9h-0.6c-6 0-10.9-4.9-10.9-10.9v0c0-6 4.9-10.9 10.9-10.9z M212.6 491.3v0c6.2 0 11.2 5 11.2 11.2v18.9c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-18.9c0-6.1 5.1-11.2 11.2-11.2z M279.5 503.7h0.6c6 0 10.9 4.9 10.9 10.9v0c0 6-4.9 10.9-10.9 10.9h-0.6c-6 0-10.9-4.9-10.9-10.9v0c0-6 4.9-10.9 10.9-10.9z M341.3 491.3v0c6.2 0 11.2 5 11.2 11.2v18.9c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-18.9c0-6.1 5.1-11.2 11.2-11.2z M408.5 487.2v0c6.2 0 11.2 5 11.2 11.2v27.2c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-27.2c0-6.2 5-11.2 11.2-11.2z M475.6 441.8v0c6.2 0 11.2 5 11.2 11.2v118c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-118c-0-6.2 5-11.2 11.2-11.2z M542.8 478.9v0c6.2 0 11.2 5 11.2 11.2v43.7c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-43.7c0-6.1 5-11.2 11.2-11.2z M609.9 429.4v0c6.2 0 11.2 5 11.2 11.2v142.9c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-142.9c0-6.2 5-11.2 11.2-11.2z M677.1 417v0c6.2 0 11.2 5 11.2 11.2v167.7c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-167.7c0-6.2 5-11.2 11.2-11.2z M744.2 478.9v0c6.2 0 11.2 5 11.2 11.2v43.7c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-43.7c0-6.1 5-11.2 11.2-11.2z M811.4 384.9v0c6.2 0 11.2 5 11.2 11.2v231.7c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-231.7c0-6.1 5-11.2 11.2-11.2z M878.5 462.4v0c6.2 0 11.2 5 11.2 11.2v76.8c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-76.8c0-6.2 5-11.2 11.2-11.2z M945.7 433.5v0c6.2 0 11.2 5 11.2 11.2v134.6c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-134.6c0-6.2 5-11.2 11.2-11.2z M1012.8 495.5v0c6.2 0 11.2 5 11.2 11.2v10.7c0 6.2-5 11.2-11.2 11.2v0c-6.2 0-11.2-5-11.2-11.2v-10.7c0-6.2 5-11.2 11.2-11.2z"
    />
  </Svg>
);

ripples.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default ripples;
