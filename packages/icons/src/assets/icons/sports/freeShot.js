import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * freeShot component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const freeShot = ({
  fill,
  height,
  width,
  viewBox,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox={viewBox}
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M36.735 212.1l45.255-45.254 7.543 7.543-45.255 45.255zm37.673-7.387l22.628-22.628 7.542 7.543-22.627 22.627zm-30.21-30.187l22.627-22.628 7.543 7.543-22.628 22.627zM218.24 78.507c-14.808-35.475-54.13-53.909-90.87-42.6-36.74 11.31-58.89 48.665-51.186 86.326 7.703 37.66 42.742 63.319 80.971 59.293 38.23-4.026 67.156-36.42 66.845-74.86a74.667 74.667 0 0 0-5.76-28.16zM173.227 47.68a64 64 0 0 1 34.346 32.853 65.067 65.067 0 0 0-12.266-6.506l-2.027-.747-20.267-22.613a26.41 26.41 0 0 0 .214-2.987zm-25.92 6.613c4.48 0 8.96-.96 13.546-1.28 2.77-.175 5.55-.175 8.32 0l20.587 23.04c-.747 2.24-1.387 4.48-2.24 6.614-1.387 3.84-2.987 7.68-4.48 11.413l-29.76 3.2-1.067-1.28-10.666-11.84-4.267-4.267 8.213-24.96 1.814-.64zM95.36 78.507c1.067-2.774 2.027-5.44 3.2-8.214A61.227 61.227 0 0 1 101.44 64l2.24-2.347a64 64 0 0 1 24.853-15.573 51.307 51.307 0 0 1 12.8 6.72l-7.68 23.36-4.8 1.92a136.427 136.427 0 0 0-18.56 10.133l-15.253-8.32c.034-.476.142-.944.32-1.386zm2.667 57.6a47.04 47.04 0 0 1-9.067-7.254 64.533 64.533 0 0 1-2.24-35.946 57.493 57.493 0 0 1 4.373-7.574c0-.746 0-1.493.854-2.133l14.72 9.387a120.427 120.427 0 0 0 3.306 24.746l-11.2 19.2-.746-.426zm19.306 26.773l25.92 4.48h.64a58.773 58.773 0 0 0 8.214 3.413 64 64 0 0 1-34.774-7.893zm27.734-1.493l-1.387 1.706-30.613-5.333a96 96 0 0 1-9.6-13.76c-.747-1.28-1.494-2.453-2.134-3.733l11.947-18.774h.853a198.613 198.613 0 0 0 22.827 4.48h1.707l14.4 24.747-8 10.667zm35.413-15.147a134.827 134.827 0 0 1-24.213 2.453L141.44 123.2l6.827-12.907 4.48-8.746 30.506-3.2a170.666 170.666 0 0 1 10.667 16.96l1.707 3.306-14.294 27.52-.853.107zm14.08 6.08a64 64 0 0 1-7.68 6.613 58.773 58.773 0 0 0-2.347-10.666l15.254-28.587a71.467 71.467 0 0 0 12.053-6.827 5.44 5.44 0 0 0 1.173-1.173 64 64 0 0 1-18.24 40.64h-.213z"
    />
  </Svg>
);

freeShot.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default freeShot;
