import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * ingredients component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const ingredients = ({
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
      d="M911.148 141.788c34.873 40.059 41.522 109.951 16.875 160.948l-71.392 147.725h-221.551l136.731-282.874c29.294-60.425 95.971-75.461 139.331-25.794zM836.458 197.819l-88.118 182.286h63.037l51.975-107.55c12.959-26.812 9.147-66.897-6.547-84.962-7.175-8.196-11.955-7.104-20.355 10.225z M20.029 472.825c-4.239-45.025 31.672-83.906 77.246-83.906h829.433c45.576 0 81.486 38.875 77.249 83.875-17.559 188.131-143.475 346.498-321.524 409.939-53.971 19.294-111.465 29.265-170.433 29.265s-116.465-9.971-170.424-29.257c-178.074-63.465-303.99-221.824-321.544-409.922zM365.442 816.964c46.327 16.571 95.731 25.125 146.559 25.125 50.824 0 100.225-8.567 146.555-25.125 152.539-54.355 260.192-189.731 275.212-350.629 0.375-3.943-2.91-7.49-7.045-7.49h-829.433c-4.133 0-7.42 3.547-7.039 7.525 15.015 160.873 122.668 296.249 275.206 350.604z"
    />
  </Svg>
);

ingredients.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default ingredients;
