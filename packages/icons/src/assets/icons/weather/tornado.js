import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { MILANO_RED } from '../../../constants/colors';

/**
 * tornado icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const tornado = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M229.14 31.904H26.024c-2.072 0-4.752-2.017-4.752-5.058s2.68-5.51 4.752-5.51h203.114c2.072 0 5.47 2.243 5.47 5.284 0 3.042-3.398 5.284-5.47 5.284zm-15.366 69.001H69.28c-2.072 0-4.777-2.67-4.777-5.322s2.705-5.322 4.777-5.322h144.494c2.071 0 4.616 2.671 4.616 5.322s-2.545 5.322-4.616 5.322zm-7.637-34.495H47.58c-2.274 0-5.242-2.67-5.242-5.322s2.968-5.322 5.242-5.322h158.556c2.273 0 5.065 2.671 5.065 5.322s-2.792 5.322-5.065 5.322zm-27.048 70.139H66.496c-2.072 0-4.715-2.285-4.715-5.327 0-3.043 2.643-5.328 4.715-5.328h112.593c2.071 0 4.267 2.285 4.267 5.328 0 3.042-2.196 5.327-4.267 5.327zm-53.11 34.014H57.87c-2.298 0-3.7-3.319-3.7-5.282 0-1.962 1.629-5.281 3.7-5.281h68.11c3.439 0 5.097 3.319 5.097 5.281 0 1.963-1.658 5.282-5.097 5.282zm-2.36 31.845H82.335c-2.072 0-4.685-2.238-4.685-5.204 0-2.966 2.613-5.204 4.685-5.204h41.284c2.071 0 4.925 2.238 4.925 5.204 0 2.966-2.854 5.204-4.925 5.204zm-11.307 32.288h-11.26c-2.071 0-5.052-2.306-5.052-5.348S98.981 224 101.053 224h11.259c2.072 0 4.833 2.469 4.833 5.511 0 3.042-2.761 5.185-4.833 5.185z" fill={`${fill || MILANO_RED}`} fillRule="nonzero" />
  </Svg>
);

tornado.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default tornado;
